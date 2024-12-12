/* 
Given a 2d matrix that represents a plot of land. Find the contiguous parts as represented by the same letter.
Then calculate how much fence is needed to surround each plot. Shared borders each get a fence (no shared fence).
The idea behind the fence / perimeter calculation is that each square has a potential of 4 fences if they 
share 2 squares of like kind are next to each other they don't need a fence between then so we -1 to remove the fence.
*/
import { data, dataTest } from "./day12_01_data.mjs";

const notSeen = ( x, y, data, seen ) => {
  const region = data[y][x];
  if ( region in seen && seen[region].includes( `${x}-${y}` ) ) {
    // has seen
    return false;
  }
  return true;
};

function recursiveCall( data, x, y, width, height, seen, currRegion, currRegionCells ) {
  const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];

  if ( !( currRegion in seen ) ) {
    seen[currRegion] = [];
  }

  seen[currRegion].push( `${x}-${y}` );
  let perimeter = 4;

  directions.forEach( ( [dx, dy] ) => {
    const nx = x + dx;
    const ny = y + dy;
    if ( nx >= 0 && nx < width && ny >= 0 && ny < height && data[ny][nx] === currRegion ) {
      perimeter -= 1;
      if ( notSeen( nx, ny, data, seen ) ) {
        recursiveCall( data, nx, ny, width, height, seen, currRegion, currRegionCells );
      }
    }
  } );
  currRegionCells.push( perimeter );
}

function findAll( data ) {
  let seen = {};
  const height = data.length;
  const width = data[0].length;
  const regions = [];
  for ( let y = 0; y < data.length; y += 1 ) {
    for ( let x = 0; x < data.length; x += 1 ) {
      const region = data[y][x];
      if ( notSeen( x, y, data, seen ) ) {
        const currRegionCells = [];
        recursiveCall( data, x, y, width, height, seen, region, currRegionCells );
        regions.push( currRegionCells );
      }
    }
  }
  return regions;
}

function calculatePrice( data ) {
  const allRegions = findAll( data );
  const products = allRegions.map( ( region ) => {
    const size = region.length;
    const perimeter = region.reduce( ( acc, curr ) => curr + acc, 0 );
    return size * perimeter;
  } );
  return products.reduce( ( acc, curr ) => acc + curr, 0 );
}
