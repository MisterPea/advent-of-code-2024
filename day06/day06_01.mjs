/* 
Given a 2d map, move the guard denoted by a carat (^). Forward till it 
comes to an obstacle, denoted by number sign (#). When it runs into an obstacle, 
turn right by 90° and continue straight. Do this till the guard is able to exit the area
*/

import { dataTest, data } from "./day06_01_data.mjs";



String.prototype.replaceAt = function ( index, replacement ) {
  return this.substring( 0, index ) + replacement + this.substring( index + replacement.length );
};

const findGuard = ( data ) => {
  for ( let y = 0; y < data.length; y += 1 ) {
    for ( let x = 0; x < data[0].length; x += 1 ) {
      if ( data[y][x] === '^' ) {
        data[y] = data[y].replaceAt( x, "X" );
        return [x, y];
      }
    }
  }
  return [-1, -1];
};



const checkForBoundary = ( data, nextX, nextY, width, height ) => {
  if ( nextX > width - 1 || nextY > height - 1 ) {
    return false;
  }
  return data[nextY][nextX];
};

function findEdge( data ) {
  const width = data[0].length;
  const height = data.length;
  const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // in x, y format

  let coordinates = findGuard( data );
  let currDirection = 0;
  let atEdge = false;
  let distinctMoves = 1;
  while ( !atEdge ) {
    let nextX = coordinates[0] + directions[currDirection][0];
    let nextY = coordinates[1] + directions[currDirection][1];
    let nextSpot = checkForBoundary( data, nextX, nextY, width, height );
    if ( !nextSpot ) {
      atEdge = true;
    }
    else if ( nextSpot === "#" ) {
      // turn guard
      currDirection === 3 ? currDirection = 0 : currDirection += 1;
    } else {
      if ( data[nextY][nextX] === "." ) distinctMoves += 1;
      data[nextY] = data[nextY].replaceAt( nextX, "X" );
      coordinates = [nextX, nextY];
    }
  }
  return distinctMoves
}
