/* 
Given 2 randomly ordered numeric lists, find the number of times each number appears in list 2 (right).
While traversing the left list multiply the num times by each number found in the left.
[3, 4], // 3 is seen 3 time in the right (3 * 3) = 9
[4, 3], // 4 is seen 1 time in the right (4 * 1) = 4
[2, 5], // 2 is not seen in the right (2 * 0) = 0
[1, 3], // 1 is not seen in the right (1 * 0) = 0
[3, 9], // 3 is seen 3 time in the right (3 * 3) = 9
[3, 3], // 3 is seen 3 time in the right (3 * 3) = 9
(9 + 4 + 0 + 0 + 9 + 9) = 31
*/

import { numDistances } from "./dec01_01_data.mjs";

// Version 1
function findRightSimilarityMultiple() {
  const rightMultiples = {};
  for ( let i = 0; i < numDistances.length; i += 1 ) {
    const rightNum = numDistances[i][1];
    if ( rightNum in rightMultiples ) {
      rightMultiples[rightNum] += 1;
    } else {
      rightMultiples[rightNum] = 1;
    }
  }

  let sum = 0;
  for ( let i = 0; i < numDistances.length; i += 1 ) {
    const leftNum = numDistances[i][0];
    if ( leftNum in rightMultiples ) {
      const timesSeen = rightMultiples[leftNum];
      const multiple = leftNum * timesSeen;
      sum += multiple;
    }
  }
  return sum;
}

// Version 2
function findRightSimilarityMultipleTwo() {
  const rightMultiples = numDistances.reduce( ( accumulator, [_, right] ) => {
    accumulator[right] = ( accumulator[right] ?? 0 ) + 1;
    return accumulator;
  }, {} );

  const sum = numDistances.reduce( ( total, [left] ) => {
    const timesSeen = rightMultiples[left] ?? 0;
    return total + ( left * timesSeen );
  }, 0 );
}
