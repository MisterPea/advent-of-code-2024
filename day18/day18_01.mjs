/* 
Given coordinates that represent barrier in a 2d matrix find the shortest path from
0, 0 to 70, 70 (the test case is 6, 6)
*/

import { data } from "./day18_01_data.mjs";
const { widthHeight, coordinates } = data;

String.prototype.replaceAt = function ( index, replacement ) {
  return this.substring( 0, index ) + replacement + this.substring( index + replacement.length );
};

const createGrid = ( wh ) => {
  const grid = new Array();
  for ( let i = 0; i <= wh; i += 1 ) {
    grid.push( '.'.repeat( wh + 1 ) );
  }
  return grid;
};

/**
 * Function to populate grid with obstacles
 * @param {[number, number][]} coordinates Coordinates of obstacles, [x,y] format
 * @param {string[]} grid Array of strings representing the grid
 * @param {number?} limit Number representing the amount of obstacles to add
 * @return {string[]} populated grid grid
 */
const populateCoordinates = ( coordinates, grid, limit = null ) => {
  coordinates.forEach( ( [x, y], i ) => {
    if ( !limit || i < limit ) {
      grid[y] = grid[y].replaceAt( x, '#' );
    } else {
      return grid;
    }
  } );
  return grid;
};


const grid = createGrid( widthHeight );
populateCoordinates( coordinates, grid, 1024 );
const start = [0, 0];
const target = [widthHeight, widthHeight];

function bfs( grid, start, target ) {
  const [targetX, targetY] = target;
  const predecessor = {};
  const queue = [start];
  const discovered = new Set();
  discovered.add( `${start[0]}-${start[1]}` );

  while ( queue.length > 0 ) {
    const [uX, uY] = queue.shift();

    // If at target;
    if ( uX === targetX && uY === targetY ) {
      const path = [];
      let current = `${uX}-${uY}`;
      while ( current ) {
        const [x, y] = current.split( '-' ).map( Number );
        path.unshift( [x, y] );
        current = predecessor[current];
      }
      return { path, steps: path.length - 1 };
    }

    const adjList = [[1, 0], [-1, 0], [0, -1], [0, 1]];
    for ( let [x, y] of adjList ) {
      const nX = uX + x;
      const nY = uY + y;
      if ( nX >= 0 && nY >= 0 && nX < grid[0].length && nY < grid.length && grid[nY][nX] !== '#' && !discovered.has( `${nX}-${nY}` ) ) {
        queue.push( [nX, nY] );
        discovered.add( `${nX}-${nY}` );
        predecessor[`${nX}-${nY}`] = `${uX}-${uY}`;
      }
    }
  }
  return { path: [], steps: -1 };
}

console.log( bfs( grid, start, target ) );
