/* 
For each level - determine if the data is safe or unsafe.
For the level to be considered safe the following needs to be true:
- The levels are either all increasing or all decreasing.
- Any two adjacent levels differ by at least one and at most three.
- We're allowed to remove one step if it makes it safe
7 6 4 2 1 // Safe 
1 2 7 8 9 // Unsafe - 2 -> 7 increase by 5
9 7 6 2 1 // Unsafe - 6 -> 2 decrease by 4
1 3 2 4 5 // Unsafe - 1 -> 3 increases and 3 -> 2 decreases
8 6 4 4 1 // Unsafe - 4 -> 4 neither increases or decreases
1 3 6 7 9 // Safe
*/

import { adventData } from "./dec02_01_data.mjs";

const isOrdered = ( arr ) => {
  const ascending = arr.every( ( val, i, a ) => i === 0 || val > a[i - 1] );
  const descending = arr.every( ( val, i, a ) => i === 0 || val < a[i - 1] );
  return ascending || descending;
};

const hasValidSkips = ( arr ) => {
  const isValid = arr.every( ( val, i, a ) => i === 0 || ( Math.abs( val - a[i - 1] ) >= 1 && Math.abs( val - a[i - 1] ) <= 3 ) );
  return isValid;
};

const isValidArray = ( arr ) => isOrdered( arr ) && hasValidSkips( arr );

const testThenFixArray = ( arr ) => {
  if ( isValidArray( arr ) ) {
    return true;
  }

  for ( let i = 0; i < arr.length; i += 1 ) {
    const modifiedArray = [...arr.slice( 0, i ), ...arr.slice( i + 1 )];
    if ( isValidArray( modifiedArray ) ) {
      return true;
    }
  }
  return false;
};

function parseLevels() {
  let numSafe = 0;
  const spotCheck = [];
  for ( let j = 0; j < adventData.length; j += 1 ) {
    if ( testThenFixArray( adventData[j] ) ) {
      numSafe += 1;
    }
  }
  return numSafe;
}


console.log( parseLevels() );