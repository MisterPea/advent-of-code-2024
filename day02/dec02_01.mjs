/* 
For each level - determine if the data is safe or unsafe.
For the level to be considered safe the following needs to be true:
- The levels are either all increasing or all decreasing.
- Any two adjacent levels differ by at least one and at most three.
7 6 4 2 1 // Safe 
1 2 7 8 9 // Unsafe - 2 -> 7 increase by 5
9 7 6 2 1 // Unsafe - 6 -> 2 decrease by 4
1 3 2 4 5 // Unsafe - 1 -> 3 increases and 3 -> 2 decreases
8 6 4 4 1 // Unsafe - 4 -> 4 neither increases or decreases
1 3 6 7 9 // Safe
*/

import { adventData } from "./dec02_01_data.mjs";

function checkLevel( level ) {
  let isDecreasing = undefined; // neg or pos
  for ( let i = 0; i < level.length - 1; i += 1 ) {
    const left = level[i];
    const right = level[i + 1];
    const difference = left - right;
    if ( Math.abs( difference ) < 1 || Math.abs( difference ) > 3 ) {
      return false;
    }
    else if ( isDecreasing === undefined ) {
      isDecreasing = left > right;
    }
    else if ( isDecreasing === true && right > left ) {
      return false;
    }
    else if ( isDecreasing === false && left > right ) {
      return false;
    }
  }
  return true;
}

function parseLevels() {
  let numSafe = 0;
  const spotCheck = [];
  for ( let i = 0; i < adventData.length; i += 1 ) {
    if ( checkLevel( adventData[i] ) ) {
      numSafe += 1;
    }
  }
  return numSafe
}
console.log(parseLevels())