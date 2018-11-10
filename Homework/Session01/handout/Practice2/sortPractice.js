'use strict'

function sort(input) {
  for(let i = 0; i < input.length; i++) {
    for(let j = 0; j < input.length - i - 1; j ++) {
      if(input[j] > input[j+1]){
        let tmp = input[j];
        input[j] = input[j+1];
        input[j+1] = tmp;
      }
    }
  }

  return input;
}

module.exports = sort
