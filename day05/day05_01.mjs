/* 
Given a sequence key [num1, num2],[num1a, num2a] where num1 needs to come before num2
We are also given a list of page numbers to validate against the sequence keys. If the sequence is valid
we will find the mid-point and then add up all the mid points of the correct sequences.
*/

import { keys, pages, keysTest, pagesTest } from "./day05_01_data.mjs";

const validSequenceObject = ( keyArray ) => {
  const keyObj = {};
  for ( let i = 0; i < keyArray.length; i += 1 ) {
    const startPage = keyArray[i][0];
    const endPage = keyArray[i][1];
    if ( startPage in keyObj ) {
      keyObj[startPage].push( endPage );
    } else {
      keyObj[startPage] = [endPage];
    }
  }
  return keyObj;
};

const checkValidRun = ( i, keyObj, pageArray ) => {
  const first = pageArray[i];
  const second = pageArray[i + 1];
  const firstArray = keyObj[first] ?? [];
  const secondArray = keyObj[second] ?? [];
  if ( secondArray.includes( first ) ) {
    return false;
  }
  return true;
};

function validateSequence( pageArray, keyObj ) {
  for ( let i = 0; i < pageArray.length - 1; i += 1 ) {
    if ( !checkValidRun( i, keyObj, pageArray ) ) {
      return false;
    }
  }
  return true;
}

function validatePageSequences( pages, keys ) {
  let sum = 0;
  const keyObj = validSequenceObject( keys );
  for ( let i = 0; i < pages.length; i += 1 ) {
    if ( validateSequence( pages[i], keyObj ) ) {
      const mid = Math.floor( pages[i].length / 2 );
      sum += pages[i][mid];
    }
  }
  return sum
}
