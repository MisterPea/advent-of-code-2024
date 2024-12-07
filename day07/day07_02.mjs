/* 
Given a set like `190: 10 19` or `3267: 81 40 27` find if the 
operators + or * applied or if the numbers are supposed to be 
concatenated (8140 or 4027) — to the right-hand numbers can create the left-hand number
*/

import { dataTest, data } from "./day07_01_data.mjs";

const multiply = ( val1, val2 ) => val1 * val2;
const add = ( val1, val2 ) => val1 + val2;
const concat = ( val1, val2 ) => +`${val1}${val2}`;

function findIfValidTarget( nums, target, currIndex = 0, currVal = nums[0] ) {

  // At end, test if we hit the target
  if ( currIndex === nums.length - 1 ) {
    return currVal === target;
  }

  const nextIndex = currIndex + 1;
  const nextNumber = nums[nextIndex];

  // mult
  const newMult = multiply( currVal, nextNumber );
  if ( findIfValidTarget( nums, target, nextIndex, newMult ) ) {
    return true;
  }

  // add
  const newAdd = add( currVal, nextNumber );
  if ( findIfValidTarget( nums, target, nextIndex, newAdd ) ) {
    return true;
  }

  // concatenate
  const newConcat = concat( currVal, nextNumber );
  if ( findIfValidTarget( nums, target, nextIndex, newConcat ) ) {
    return true;
  }


  return false;
}

function loopSets( data ) {
  let sum = 0;
  for ( let i = 0; i < data.length; i += 1 ) {
    const isValid = findIfValidTarget( data[i][1], data[i][0] );
    if ( isValid ) {
      sum += data[i][0];
    }
  }
  return sum;
}
