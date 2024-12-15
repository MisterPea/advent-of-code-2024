import { dataTest, data } from "./day14_01_data.mjs";
/* 
p=2,4 v=2,-3 p=initial position, v=velocity/vector
...........  ...........  ...........  ...........  ...........  ...........
...........  ....1......  ...........  ...........  ...........  ...........
...........  ...........  ...........  ........1..  ...........  ...........
...........  ...........  ...........  ...........  ...........  .1.........
..1........  ...........  ...........  ...........  ...........  ...........
...........  ...........  ......1....  ...........  ...........  ...........
...........  ...........  ...........  ...........  ..........1  ...........
*/

function moveRobot( position, velocity, boundary ) {
  let [px, py] = position;
  const [vx, vy] = velocity;
  const [bx, by] = boundary;

  px += vx;
  py += vy;

  px = ( ( px % bx ) + bx ) % bx;
  py = ( ( py % by ) + by ) % by;

  position = [px, py];
  return position;
}

String.prototype.replaceAt = function ( index, replacement ) {
  return this.substring( 0, index ) + replacement + this.substring( index + replacement.length );
};


const createGrid = ( width, height ) => {
  const arrayWidth = "  ".repeat( width );
  const grid = new Array( height ).fill( arrayWidth );
  return grid;
};

function scrollRobots( data ) {
  const boundary = [101, 103];

  const positionMap = new Map();
  data.forEach( ( [p, v], i ) => positionMap.set( i, [p, v] ) );

  for ( let i = 0; i < 6243; i += 1 ) {
    const grid = createGrid( boundary[0], boundary[1] );
    // loop through robots
    for ( let r = 0; r < positionMap.size; r += 1 ) {
      const [position, velocity] = positionMap.get( r );
      const newPosition = moveRobot( position, velocity, boundary );
      grid[newPosition[1]] = grid[newPosition[1]].replaceAt( newPosition[0], "*" );
      positionMap.set( r, [newPosition, velocity] );
    }

    if ( i > 6240 ) { // already figured out the location
      console.log( JSON.stringify( grid, undefined, 1 ) );
    }
  }
}
