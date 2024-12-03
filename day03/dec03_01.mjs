/* 
Given a corrupted string find elements where:
the string is `mul(num, num)` only. With these elements we multiply
the two numbers and add the sum
*/
import { dayThreeData } from "./dec03_01_data.mjs";

function findValidMultiples() {
  const expression = /mul\(\d*,\d*\)/gm;
  const foundFuncs = dayThreeData.match( expression );
  return foundFuncs;
}

function multiplyFoundPairs() {
  let sum = 0;
  const pairsArray = findValidMultiples();
  for ( let i = 0; i < pairsArray.length; i += 1 ) {
    const numbers = pairsArray[i].match( /\d*,\d*/gm )[0].split( ',' );
    const product = numbers.reduce( ( acc, curr ) => acc * +curr, 1 );
    sum += product;
  }
  return sum
}

console.log(multiplyFoundPairs());