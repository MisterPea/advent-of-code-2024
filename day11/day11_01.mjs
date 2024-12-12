/* 
Given an array of stones
-the stones change every time you blink
according to the first applicable rule:
1. If the stone has number 0, it is replaced by with the number 1.
2. If the stone has an even number of digits, it is replaced by two stones. 
   The left half of the digits are placed on the new left stone, 
   and the right half of the digits are placed on the new right stone. 
   (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
3. If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.
*/

import { dataTest, data } from "./day11_01-data.mjs";

function Stone( value = '', next = null ) {
  this.next = next;
  this.value = value;
}

function makeStoneRow( rowString ) {
  let currString = '';
  let root = undefined;
  let nextStone = root;
  for ( let i = 0; i < rowString.length; i += 1 ) {
    if ( rowString[i] !== " " ) currString += rowString[i];
    if ( rowString[i] === ' ' || i === rowString.length - 1 ) {
      if ( !root ) {
        root = new Stone( currString );
        nextStone = root;
      } else {
        nextStone.next = new Stone( currString );
        nextStone = nextStone.next;
      }
      currString = "";
    }
  }
  return root;
}

function showStoneRow( root, printResult = false, showCount = false ) {
  let currRoot = root;
  const output = [];
  let count = 0;
  while ( currRoot ) {
    output.push( currRoot.value );
    currRoot = currRoot.next;
    count += 1;
  }
  console.log( printResult ? output.join( ' → ' ) : "", showCount ? `${count} Stones` : "" );
}

function blink( root ) {
  let prevStone = undefined;
  let currStone = root;
  while ( currStone ) {
    // rules:
    // 1.
    if ( currStone.value === '0' ) {
      currStone.value = '1';
      // 2.
    } else if ( currStone.value.length % 2 === 0 ) {
      const rightVal = currStone.value.slice( currStone.value.length / 2 );
      const leftVal = currStone.value.slice( 0, currStone.value.length / 2 );

      currStone.value = `${+rightVal}`;
      const left = new Stone( `${+leftVal}`, currStone );
      if ( !prevStone ) {
        root = left;
      } else {
        prevStone.next = left;
      }
      // 3.
    } else {
      currStone.value = `${+currStone.value * 2024}`;
    }
    prevStone = currStone;
    currStone = currStone.next;
  }
  return root;
}

function blinkNumTimes( data, numBlinks, printResult = false, showCount = false ) {
  const root = makeStoneRow( data );
  let currRoot = root;
  for ( let i = 0; i < numBlinks; i += 1 ) {
    const currBlink = blink( currRoot );
    showStoneRow( currBlink, printResult, showCount );
    currRoot = currBlink;
  }
}

blinkNumTimes( dataTest, 6, true );
