/* 
Given an A Button and B Button that both move a point on a 2d grid
a determinant, but different amount along the x,y axis find the number of times A and B
have to be pressed to reach a destination (Prize)
For:
A: [94, 34],
B: [22, 67],
Prize: [8400, 5400],
We press 'A' 80 times and '40' times
*/
import { dataTest, data } from "./day13_01_data.mjs";

function testPrevious( currA, currB, prev ) {
  for ( let press of prev ) {
    if ( press.a === currA && press.b === currB ) {
      return true;
    }
  }
  return false;
}

/* Ditched greedy solution for linear alg */
function findSolution( v1, v2, target ) {
  const [x1, y1] = v1;
  const [x2, y2] = v2;
  const [X, Y] = target;

  const denominator = ( y2 * x1 - y1 * x2 );
  if ( denominator === 0 ) {
    return null;
  }
  const b = ( Y * x1 - y1 * X ) / denominator;
  const a = ( X - x2 * b ) / x1;
  if ( Number.isInteger( a ) && Number.isInteger( b ) ) {
    return { a, b };
  }
  return null;
}

function findNumButtonPresses( data ) {
  const adj = 10000000000000;
  let sums = 0;
  for ( let nums of data ) {
    const { A, B, Prize } = nums;

    const solution = findSolution( A, B, [Prize[0] + adj, Prize[1] + adj] );
    if ( solution ) {
      const { a, b } = solution;
      const aCost = a * 3;
      sums += aCost + b;
    }
  }
  return sums;
}
