/* 
Given a sequence key [num1, num2],[num1a, num2a] where num1 needs to come before num2
We are also given a list of page numbers to validate against the sequence keys. 
If the sequence is *not* valid - reorder to make valid then find the mid-point and
sum the mid points of the now correct sequences.
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

function reorderIfInvalid( pageArray, keyObj ) {
  let hasChanged = false;
  for ( let i = 0; i < pageArray.length - 1; i += 1 ) {
    const first = pageArray[i];
    const second = pageArray[i + 1];
    const secondArray = keyObj[second] ?? [];
    if ( secondArray.includes( first ) ) {
      // Swap elements
      [pageArray[i], pageArray[i + 1]] = [pageArray[i + 1], pageArray[i]];
      hasChanged = true;
    }
  }
  return hasChanged;
}

// Because reorderings my upset previous order we double check until we are sure
// that everything is ordered. This is too brute-forcey, the other option would be to trail
// the changes by 1, ignoring index 0.
function doubleCheck( pageArray, keyObj ) {
  let hasChanged = true;
  while ( hasChanged ) {
    hasChanged = reorderIfInvalid( pageArray, keyObj );
  }
  return pageArray;
}

function validateSequence( pageArray, keyObj ) {
  if ( reorderIfInvalid( pageArray, keyObj ) ) {
    const healedArray = doubleCheck( pageArray, keyObj );
    return healedArray;
  }
  return [];
}

function validatePageSequences( pages, keys ) {
  let sum = 0;
  const keyObj = validSequenceObject( keys );
  for ( let i = 0; i < pages.length; i += 1 ) {
    const newSequence = validateSequence( pages[i], keyObj );
    if ( newSequence.length ) {
      const mid = Math.floor( newSequence.length / 2 );
      sum += newSequence[mid];
    }
  }
  return sum;
}
