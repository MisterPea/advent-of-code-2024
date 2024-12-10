/*
With a number sequence like 2333133121414131402
2 means - 2 blocks of data and 3 means 3 blocks of free space.
For each block of data there is an index starting at 0.
2,3 is index 0, 3, 3 is index 1, 1, 3 is index 2 and so on.
We can notate this configuration by repeating the index n time to represent the data
and a '.' to represent free space. 
We get something like: 00...111...2...333.44.5555.6666.777.888899
We then want to consolidate all the number to the left.
From: 0..111....22222
To: 022111222......
*/

import { dataTest, data } from "./day09_01_data.mjs";

function convertRawToFileId( data ) {
  let index = 0;
  let currData = '';
  let freeSpace = '';
  let output = [];
  for ( let i = 0; i < data.length; i += 2 ) {
    currData = +data[i];
    freeSpace = +data[i + 1];
    if ( currData > 0 ) {
      output.push( ...new Array( currData ).fill( String( index ) ) );
    }
    if ( freeSpace > 0 ) {
      output.push( ...new Array( freeSpace ).fill( '.' ) );
    }
    index += 1;
  }

  return output;
}

function shiftDigits( encodedString ) {
  let lastIndex = encodedString.length - 1;
  let i = 0;
  while ( i < encodedString.length && i < lastIndex ) {
    if ( encodedString[i] === '.' ) {
      while ( encodedString[lastIndex] === '.' ) {
        lastIndex -= 1;
      }
      if ( i < lastIndex ) {
        let temp = encodedString[i];
        encodedString[i] = encodedString[lastIndex];
        encodedString[lastIndex] = temp;
      }
    }
    i += 1;
  }
  return encodedString.filter( ( n ) => n !== '.' );
}

function calculateChecksum( data ) {
  const output = convertRawToFileId( data );
  const shifted = shiftDigits( output );
  const sum = shifted.reduce( ( acc, curr, i ) => acc += +curr * i, 0 );
  return sum;
}
