/* 
For each pair of nodes on a 2d plain, find the places that are in-line 
and equidistant from the others
consider:
..........
...#......
#.........
....a.....
........a.
.....a....
..#.......
......A...
..........
..........
There are 4 antinode (equidistant nodes) when counting the one on top of 'A'
*/

import { dataTest, dataWhole } from "./day08_01_data.mjs";

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

/* find antinodes of the pair - @returns antinode pair*/
const findAntinodes = ( uniquePairs, width, height ) => {
  const checkBounds = ( antinode ) => {
    const [x, y] = antinode;
    if ( x < 0 || x > width-1 ) {
      return null;
    }
    if ( y < 0 || y > height-1 ) {
      return null;
    }
    return antinode;
  };


  const antinodePairs = [];
  for ( let i = 0; i < uniquePairs.length; i += 1 ) {
    const [x1, y1] = uniquePairs[i][0];
    const [x2, y2] = uniquePairs[i][1];

    const xDiff = Math.abs( x1 - x2 );
    const yDiff = Math.abs( y1 - y2 );
    let antinode1 = [];
    let antinode2 = [];
    if ( x1 < x2 ) {
      antinode1 = [x1 - xDiff, null];
      antinode2 = [x2 + xDiff, null];
    } else if ( x2 < x1 ) {
      antinode2 = [x2 - xDiff, null];
      antinode1 = [x1 + xDiff, null];
    } else { // x axis are inline w/each other
      antinode1 = [x1, null];
      antinode2 = [x2, null];
    }

    if ( y1 < y2 ) {
      antinode1 = [antinode1[0], y1 - yDiff];
      antinode2 = [antinode2[0], y2 + yDiff];
    } else if ( y2 < y1 ) {
      antinode2 = [antinode2[0], y2 - yDiff];
      antinode1 = [antinode1[0], y1 + yDiff];
    } else { // y axis are inline w/each other
      antinode1 = [antinode1[0], y1];
      antinode2 = [antinode2[1], y2];
    }

    antinodePairs.push( checkBounds( antinode1 ), checkBounds( antinode2 ) );
  }
  return antinodePairs;
};

String.prototype.replaceAt = function ( index, replacement ) {
  return this.substring( 0, index ) + replacement + this.substring( index + replacement.length );
};


function calculateAntinodes( data ) {
  const allAntinodes = [];
  const allAntinodesStr = [];
  const { width, height, nodes } = findAllNodes( data );
  const uniqueAntennas = Object.keys( nodes );
  for ( let antenna of uniqueAntennas ) {
    const uniquePairs = createNodePairs( nodes[antenna] );
    const antinodes = findAntinodes( uniquePairs, width, height ).filter( Boolean );
    // convert to string for comparison
    const antinodeString = antinodes.map( ( coordinate ) => `${coordinate[0]}-${coordinate[1]}` );
    allAntinodesStr.push( ...antinodeString );
    allAntinodes.push( ...antinodes );
  }

  // for ( let i = 0; i < allAntinodes.length; i += 1 ) {
  //   const [x, y] = allAntinodes[i];
  //   data[y] = data[y].replaceAt( x, '#' );
  // }

  const uniqueCoordinates = [...new Set(allAntinodesStr)]
  console.log(uniqueCoordinates.length)

}


calculateAntinodes( dataWhole );