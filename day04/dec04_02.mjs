import { data, dataTest } from "./dec04_01_01_data.mjs";

/* 
Find X-MAS within a string matrix:
M • M   S • S   M • S
• A •   • A •   • A •
S • S   M • M   M • S
*/

const findDiag = ( x, y, matrix ) => {
  const diagFoundLR = matrix[y][x] + matrix[y + 1][x + 1] + matrix[y + 2][x + 2];
  const diagFoundRL = matrix[y][x + 2] + matrix[y + 1][x + 1] + matrix[y + 2][x];
  const validLR = diagFoundLR === "MAS" || diagFoundLR === "SAM";
  const validRL = diagFoundRL === "MAS" || diagFoundRL === "SAM";
  if ( validLR && validRL ) {
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
      if ( ( y < yLength - 2 ) && ( x < xLength - 2 ) ) {
        sumOfXmas += findDiag( x, y, matrix );
      }
    }
  }
  return sumOfXmas;
}

console.log( findXmas( data ) );