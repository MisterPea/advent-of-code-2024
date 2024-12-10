/* 
Part 1: Find number of paths 9s that 
connect to a 0 start (going from 0 - 9)
This, for instance, has 2:
...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9

Part 2: Find the number of unique paths from 0 - 9
.....0.    .....0.   .....0.   .....0.
..4321.    ..4321.   .....1.   .....1.
..5..2.    ..5....   .....2.   .....2.
..6543. -> ..6....   ..6543.   .....3.
..7..4.    ..7....   ..7....   .....4.
..8765.    ..8....   ..8....   ..8765.
..9....    ..9....   ..9....   ..9....
*/

import { dataTest, data } from "./day10_01_data.mjs";

function crawlPath( data, x, y, width, height, currNum, visited ) {

  if ( currNum === 9 ) {
    return 1;
  }

  const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];
  let pathCount = 0;

  for ( const [dx, dy] of directions ) {
    const nx = x + dx;
    const ny = y + dy;

    // check if valid directions & if not visited
    if ( nx >= 0 && nx < width && ny >= 0 && ny < height && !visited.has( `${nx},${ny}` ) && +data[ny][nx] === +currNum + 1 ) {
      visited.add( `${nx},${ny}` );
      pathCount += crawlPath( data, nx, ny, width, height, +currNum + 1, visited );
      // below is added to complete part 2 - w/o we keep 1 start [x,y] per '9' [x,y] position
      visited.delete( `${nx},${ny}` );
    }
  }
  return pathCount;
}

function findPaths( data ) {
  const height = data.length;
  const width = data[0].length;
  let totalPaths = 0;
  for ( let y = 0; y < height; y += 1 ) {
    for ( let x = 0; x < height; x += 1 ) {
      if ( data[y][x] === '0' ) {
        const visited = new Set();
        visited.add( `${x},${y}` );
        totalPaths += crawlPath( data, x, y, width, height, 0, visited );
      }
    }
  }
  return totalPaths;
}


