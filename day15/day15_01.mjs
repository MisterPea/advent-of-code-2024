import { dataMap, dataDirections } from "./day15_01_data.mjs";

const findRobot = ( map ) => {
  for ( let y = 0; y < map.length; y += 1 ) {
    for ( let x = 0; x < map[0].length; x += 1 ) {
      if ( map[y][x] === '@' ) {
        return [x, y];
      }
    }
  }
  return [-1, -1];
};

function draw( map, coordinate, item ) {
  String.prototype.replaceAt = function ( index, replacement ) {
    return this.substring( 0, index ) + replacement + this.substring( index + replacement.length );
  };
  map[coordinate[1]] = map[coordinate[1]].replaceAt( coordinate[0], item );
}

function boxSubroutine( map, possibleLocation, direction ) {
  // We found a O in our spot
  const [x, y] = possibleLocation;
  const nX = x + direction[0];
  const nY = y + direction[1];
  if ( map[nY][nX] === '#' ) {
    return false;
  } else if ( map[nY][nX] === '.' ) {
    // move 
    draw( map, [nX, nY], 'O' );
    return true;
  } else {
    // if no space or wall we hunt till we have a space
    return boxSubroutine( map, [nX, nY], direction );
  }
}

function moveRobot( map, directions ) {
  const move = { "<": [-1, 0], ">": [1, 0], "^": [0, -1], "v": [0, 1] };
  let robot = findRobot( map );
  for ( let dir of directions ) {
    let nX = robot[0] + move[dir][0];
    let nY = robot[1] + move[dir][1];

    if ( map[nY][nX] === "." ) {
      draw( map, robot, "." ); // replace where robot was
      robot = [nX, nY]; // new robot position
      draw( map, [nX, nY], '@' ); // draw where robot is
    } else if ( map[nY][nX] === 'O' ) {
      if ( boxSubroutine( map, [nX, nY], move[dir] ) ) {
        draw( map, robot, "." ); // replace where robot was
        robot = [nX, nY]; // new robot position
        draw( map, [nX, nY], '@' ); // draw where robot is
      }
    }

  }
  return map;
}



function calculateBoxCoordinates( map, directions ) {
  let sum = 0;
  const mapOut = moveRobot( map, directions );
  for ( let y = 0; y < mapOut.length; y += 1 ) {
    for ( let x = 0; x < mapOut[0].length; x += 1 ) {
      if ( mapOut[y][x] === "O" ) {
        sum += ( 100 * y ) + x;
      }
    }
  }
  console.log( sum );
}
calculateBoxCoordinates( dataMap, dataDirections );