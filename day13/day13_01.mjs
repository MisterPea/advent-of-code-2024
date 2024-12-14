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

function findSolutions( A, B, target, previous = null ) {
  let p = null;
  if ( previous ) p = [...previous];

  const solutions = [];
  for ( let i = 0; ; i += 1 ) {
    const aMult = A * i;
    const b = ( target - aMult ) / B;
    if ( p && b >= 0 && Number.isInteger( b ) ) {
      const isMatch = testPrevious( i, b, p );
      if ( isMatch ) solutions.push( ( i * 3 ) + ( b ) );
    }
    else if ( b >= 0 && Number.isInteger( b ) ) {
      solutions.push( { a: i, b: b } );
    } else if ( b < 0 ) {
      break;
    }
  }
  return solutions;
}

function findNumButtonPresses( data ) {
  let sums = 0;
  for ( let nums of data ) {
    const { A, B, Prize } = nums;
    const btnsX = findSolutions( A[0], B[0], Prize[0] );
    const matches = findSolutions( A[1], B[1], Prize[1], btnsX ) ;
    if(matches.length){
      sums += matches[0]
    }
  }
  return sums;
}
