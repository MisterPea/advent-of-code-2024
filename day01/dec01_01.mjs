/* 
Given 2 randomly ordered numeric lists, find the absolute difference between the corresponding indexes of the sorted lists. 
Then sum and return the distance
*/

import { numDistances } from "./dec01_01_data.mjs";

// Version 1
function separateAndOrderNums() {
  const leftNums = [];
  const rightNums = [];
  for ( let i = 0; i < numDistances.length; i += 1 ) {
    const left = numDistances[i][0];
    const right = numDistances[i][1];
    leftNums.push( left );
    rightNums.push( right );
  }
  const left = leftNums.sort( ( a, b ) => a - b );
  const right = rightNums.sort( ( a, b ) => a - b );
  return { left, right };
}

function findDistanceBetweenLists() {
  let sumDistance = 0;
  const { left, right } = separateAndOrderNums();
  for ( let i = 0; i < left.length; i += 1 ) {
    const amt = Math.abs( left[i] - right[i] );
    sumDistance += amt;
  }
  return sumDistance;
};

// Version 2
function findDistanceBetweenListsTwo() {
  const left = numDistances.map( ( [left] ) => left ).sort( ( a, b ) => a - b );
  const right = numDistances.map( ( [_, right] ) => right ).sort( ( a, b ) => a - b );
  const sumDistance = left.reduce( ( sum, leftNum, i ) => sum + Math.abs( leftNum - right[i] ), 0 );
  return sumDistance;
}

findDistanceBetweenListsTwo();