/* 
Given a program where (by 2s) the first number is the opcode selector and the second is the number to apply to the opcode.
Run the program till is stops, the output is the solution.
*/

const register = {
  A: 2024,
  B: 0,
  C: 0,
};

const program = [2, 4, 1, 7, 7, 5, 4, 1, 1, 4, 5, 5, 0, 3, 3, 0];

Number.prototype.calc = function () {
  const num = this;
  if ( num >= 0 && num <= 3 ) return num;
  if ( num === 4 ) return register.A;
  if ( num === 5 ) return register.B;
  if ( num === 6 ) return register.C;
};

const out = [];

const opcode = [
  // adv
  ( combo, i ) => {
    const result = register.A / Math.pow( 2, combo.calc() );
    register.A = Math.trunc( result );
    return i + 2;
  },

  // bxl
  ( literal, i ) => {
    const result = BigInt( register.B ) ^ BigInt( literal );
    register.B = Number( result );
    return i + 2;
  },

  // bst
  ( combo, i ) => {
    const result = BigInt( combo.calc() ) % 8n;
    register.B = Number( result );
    return i + 2;
  },

  // jnz
  ( literal, i ) => {
    if ( register.A !== 0 ) {
      return literal;
    }
    return i + 2;
  },

  // bxc
  ( _, i ) => {
    const result = BigInt( register.B ) ^ BigInt( register.C );
    register.B = Number( result );
    return i + 2;
  },

  // out
  ( combo, i ) => {
    const result = BigInt( combo.calc() ) % 8n;
    out.push( Number( result ) );
    return i + 2;
  },

  // bdv
  ( combo, i ) => {
    const result = register.A / Math.pow( 2, combo.calc() );
    register.B = Math.trunc( result );
    return i + 2;
  },

  // cdv
  ( combo, i ) => {
    const result = register.A / Math.pow( 2, combo.calc() );
    register.C = Math.trunc( result );
    return i + 2;
  }
];

function runProgram( program ) {
  let i = 0;
  while ( i < program.length ) {
    const func = opcode[program[i]];
    const index = func( program[i + 1], i );
    i = index;
  }
  return String( out );
}
