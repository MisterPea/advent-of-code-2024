/* 
For each pair of nodes on a 2d plain, find the places that are in-line 
and equidistant from the others
consider:
T....#....
...T......
.T....#...
.........#
..#.......
..........
...#......
..........
....#.....
..........
There are 6 antinode (equidistant nodes) when counting.
*/

import { dataTest, dataWhole, dataTestTwo } from "./day08_01_data.mjs";

/* Find all the individual nodes on the 2D plane */
const findAllNodes = ( data ) => {
  const height = data.length;
  const width = data[0].length;
  const nodes = {};
  for ( let y = 0; y < height; y += 1 ) {
    for ( let x = 0; x < width; x += 1 ) {
      const currElem = data[y][x];
      if ( currElem !== "." ) {
        if ( currElem in nodes ) {
          nodes[currElem].push( [x, y] );
        } else {
          nodes[currElem] = [[x, y]];
        }
      }
    }
  }
  return { width, height, nodes };
};

/* Create unique pairs of each node */
const createNodePairs = ( nodes ) => {
  const uniquePairs = [];
  for ( let i = 0; i < nodes.length; i += 1 ) {
    for ( let j = i + 1; j < nodes.length; j += 1 ) {
      uniquePairs.push( [nodes[i], nodes[j]] );
    }
  }
  return uniquePairs;
};

/* Check if in bounds */
const checkIfInBounds = ( coordinatePair, height, width ) => {
  const [x, y] = coordinatePair;
  if ( x < 0 || x > width - 1 ) {
    return false;
  }
  if ( y < 0 || y > height - 1 ) {
    return false;
  }
  return true;
};

/* find antinodes of the pair - @returns antinode pairs*/
const findAntinodes = ( uniquePairs, width, height ) => {
  const antinodePairs = [];
  for ( let i = 0; i < uniquePairs.length; i += 1 ) {
    const orderedPairs = uniquePairs[i].sort( ( a, b ) => a[0] - b[0] );
    const [x1, y1] = orderedPairs[0];
    const [x2, y2] = orderedPairs[1];
    const xDiff = Math.abs( x1 - x2 );
    const yDiff = Math.abs( y1 - y2 );
    let left = [];
    let right = [];
    // vert || horz
    if ( x1 === x2 || y1 === y2 ) {
      left = generateNodes( x1, y1, -xDiff, -yDiff, width, height ); // [x,y start], [run, rise]
      right = generateNodes( x2, y2, xDiff, yDiff, width, height );
    }
    // neg slope
    else if ( y1 < y2 ) {
      left = generateNodes( x1, y1, -xDiff, -yDiff, width, height );
      right = generateNodes( x2, y2, xDiff, yDiff, width, height );
    }
    // neg slope
    else {
      left = generateNodes( x1, y1, -xDiff, yDiff, width, height );
      right = generateNodes( x2, y2, xDiff, -yDiff, width, height );
    }
    const filteredLeft = left.filter( ( pair ) => checkIfInBounds( pair, height, width ) );
    const filteredRight = right.filter( ( pair ) => checkIfInBounds( pair, height, width ) );
    antinodePairs.push( ...filteredLeft, ...filteredRight );
  }
  return antinodePairs;
};

function generateNodes( x, y, xDiff, yDiff, width, height ) {
  const antinodePairs = [];
  while ( !( x < 0 || x > width - 1 ) && !( y < 0 || y > height - 1 ) ) {
    const newX = x + xDiff;
    const newY = y + yDiff;
    antinodePairs.push( [newX, newY] );
    x = newX;
    y = newY;
  }
  return antinodePairs;
}

function drawAntinodes( antinodes, data ) {
  String.prototype.replaceAt = function ( index, replacement ) {
    return this.substring( 0, index ) + replacement + this.substring( index + replacement.length );
  };

  let count = 0;

  for ( let i = 0; i < antinodes.length; i += 1 ) {
    const [x, y] = antinodes[i];
    data[y] = data[y].replaceAt( x, '#' );
  }

  for ( let y = 0; y < data.length; y += 1 ) {
    for ( let x = 0; x < data[0].length; x += 1 ) {
      if ( data[y][x] !== '.' ) {
        count += 1;
      }
    }
  }
  console.log( JSON.stringify( data, undefined, 1 ) );
}

function calculateAntinodes( data ) {
  const allAntinodes = []; // for drawing
  const allAntinodesStr = []; // for comparison
  const originalNodes = [];
  const { width, height, nodes } = findAllNodes( data );
  const uniqueAntennas = Object.keys( nodes );
  for ( let antenna of uniqueAntennas ) {
    const uniquePairs = createNodePairs( nodes[antenna] );
    const antinodes = findAntinodes( uniquePairs, width, height );
    const antinodeString = antinodes.map( ( coordinate ) => `${coordinate[0]}-${coordinate[1]}` );
    const originalNodesStr = nodes[antenna].map( ( coordinate ) => `${coordinate[0]}-${coordinate[1]}` );
    allAntinodesStr.push( ...antinodeString );
    allAntinodes.push( ...antinodes );
    originalNodes.push( ...originalNodesStr );
  }
  const uniqueCoordinates = [...new Set( [...allAntinodesStr, ...originalNodes] )];
  return { numCoordinates: uniqueCoordinates.length, allAntinodes };
}

const { numCoordinates, allAntinodes } = calculateAntinodes( dataTest );
drawAntinodes( allAntinodes, dataTest );