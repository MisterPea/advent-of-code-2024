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
import { dataTest, data } from "./day14_01_data.mjs";

function moveRobotXTimes( position, velocity, boundary, i, totI ) {
  let [px, py] = position;
  const [vx, vy] = velocity;
  const [bx, by] = boundary;

  px += vx;
  py += vy;

  px = ( ( px % bx ) + bx ) % bx;
  py = ( ( py % by ) + by ) % by;

  position = [px, py];

  if ( i < totI ) {
    return moveRobotXTimes( position, velocity, boundary, i + 1, totI );
  }
  // On complete, return the final position
  return position;

}

function parseRobots( data ) {
  const boundary = [101, 103];

  let quads = [0, 0, 0, 0];
  for ( let d of data ) {
    const position = d[0];
    const velocity = d[1];

    // Define quadrants
    const quadDivide = [Math.floor( boundary[0] / 2 ), Math.floor( boundary[1] / 2 )];

    const newPosition = moveRobotXTimes( position, velocity, boundary, 1, 100 );

    // categorize quadrant
    if ( newPosition[0] < quadDivide[0] && newPosition[1] < quadDivide[1] ) {
      // quad 1
      quads[0] += 1;
    } else if ( newPosition[0] < quadDivide[0] && newPosition[1] > quadDivide[1] ) {
      // quad 3
      quads[2] += 1;
    } else if ( newPosition[0] > quadDivide[0] && newPosition[1] < quadDivide[1] ) {
      // quad 2
      quads[1] += 1;
    } else if ( newPosition[0] > quadDivide[0] && newPosition[1] > quadDivide[1] ) {
      // quad 4
      quads[3] += 1;
    }
  }
  return quads.reduce( ( acc, curr ) => acc * curr );
}
console.log( parseRobots( data ) );