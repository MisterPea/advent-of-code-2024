import { data, dataTest } from "./dec04_01_01_data.mjs";

/* 
Find XMAS within a string matrix be it forwards backwards or diagonal
*/

const findHorizontal = ( x, y, matrix ) => {
  const horzFound = matrix[y][x] + matrix[y][x + 1] + matrix[y][x + 2] + matrix[y][x + 3];
  if ( horzFound === "XMAS" || horzFound === "SAMX" ) {
    return 1;
  }
  return 0;
};

const findVertical = ( x, y, matrix ) => {
  const vertFound = matrix[y][x] + matrix[y + 1][x] + matrix[y + 2][x] + matrix[y + 3][x];
  if ( vertFound === "XMAS" || vertFound === "SAMX" ) {
    return 1;
  }
  return 0;
};

const findPosDiag = ( x, y, matrix ) => {
  const posDiagFound = matrix[y][x] + matrix[y + 1][x + 1] + matrix[y + 2][x + 2] + matrix[y + 3][x + 3];
  if ( posDiagFound === "XMAS" || posDiagFound === "SAMX" ) {
    return 1;
  }
  return 0;
};

const findNegDiag = ( x, y, matrix ) => {
  const negDiagFound = matrix[y][x] + matrix[y - 1][x + 1] + matrix[y - 2][x + 2] + matrix[y - 3][x + 3];
  if ( negDiagFound === "XMAS" || negDiagFound === "SAMX" ) {
    return 1;
  }
  return 0;
};

function findXmas( matrix ) {
  const yLength = matrix.length;
  const xLength = matrix[0].length;
  let sumOfXmas = 0;
  for ( let y = 0; y < yLength; y += 1 ) {
    for ( let x = 0; x < xLength; x += 1 ) {
      if ( x < xLength - 3 ) {
        // horizontal
        sumOfXmas += findHorizontal( x, y, matrix );
      }
      if ( y < yLength - 3 ) {
        // vertical
        sumOfXmas += findVertical( x, y, matrix );
      }
      if ( ( y < yLength - 3 ) && ( x < xLength - 3 ) ) {
        // upper left to lower righy
        sumOfXmas += findPosDiag( x, y, matrix );
      }
      if ( ( y >= 3 ) && ( x < xLength - 3 ) ) {
        // lower left to upper right
        sumOfXmas += findNegDiag( x, y, matrix );
      }
    }
  }
  return sumOfXmas;
}

console.log( findXmas( data ) );