/* 
Arrange towels by color.
Colors are:
(w)hite, bl(u)e, (b)lack, (r)ed, (g)reen
Given a list of colors and color combinations and a list of needed patterns 
figure out how many color combinations are viable.
*/
import { dataTest, data } from "./day19_01_data.mjs";

function canMakeWord( word, colors ) {
  const queue = [word];
  const visited = new Set();

  while ( queue.length > 0 ) {
    const current = queue.shift();

    if ( visited.has( current ) ) continue;
    visited.add( current );

    if ( current === '' ) return true;

    for ( let c of colors ) {
      if ( current.startsWith( c ) ) {
        queue.push( current.slice( c.length ) );
      }
    }
  }
  return false;
}

function countValidWords( data ) {
  const { colors, sets } = data;
  let sum = 0;

  for ( let word of sets ) {
    if ( canMakeWord( word, colors ) ) {
      sum += 1;
    }
  }
  return sum;
}
console.log(countValidWords(data))




