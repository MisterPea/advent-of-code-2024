/* 
Given a corrupted string find elements:
`do()` and `don't()`. 
`don't()` deactivates the multiplication until a `do()` appears.
The string is `mul(num, num)` only. With these elements we multiply
the two numbers and add the sum.
Given: 'xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))'
we only multiply mul(2,4) and mul(8,5) as `don't` precedes mul(5,5) and mul(11,8)
*/
import { dayThreeData } from "./dec03_01_data.mjs";

function findValidValues() {
  const multExpression = /mul\(\d*,\d*\)|don't\(\)|do\(\)/gm;
  const foundFuncs = dayThreeData.match( multExpression );
  return foundFuncs;
}

function multiplyFoundPairs() {
  let enabled = -1;
  let sum = 0;
  const validValues = findValidValues();
  for ( let i = 0; i < validValues.length; i += 1 ) {
    const currElement = validValues[i];

    if ( currElement === "don't()" || currElement === "do()" ) {
      enabled = currElement.localeCompare( "don't()" );
    } else {
      if ( enabled === -1 ) {
        const numbers = validValues[i].match( /\d*,\d*/gm )[0].split( ',' );
        const product = numbers.reduce( ( acc, curr ) => acc * +curr, 1 );
        sum += product;
      }
    }

  }
  return sum;
}
