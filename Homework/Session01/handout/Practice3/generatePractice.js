'use strict'

function createInput(length){
  let input = [];
  for(let i = 0; i < length; i ++){
    input.push(-500 + i);
  }
  
  return input;
}

function search(input, target) {
  var low  = 0 , high = input.length -1 ,mid ;      
  while (low <= high){
      mid = Math.floor((low+high)/2);     
      if(input[mid]==target) return mid ; 
      else if (input[mid]<target) low = mid+1;
      else high = mid-1;          
  }
  return -1 ;
}

function generate(testLengthArray){
 // #region 
  // return Array.from({length : testLengthArray.length})
  //   .map(item => ({
  //     input: Array.from({length: item}).map(item => []),
  //     target: 0,
  //     output: -1
  //   })
  // ); // Remove this line and change to your own algorithm

  let objArr = [];

  for(let i = 0; i < testLengthArray.length; i ++) {
    let arr= createInput(testLengthArray[i]);
    let tar;
    switch( i % 3){
      case 0:
        tar = arr[arr.length - 1];
        break;
      case 1:
        tar = 0;
        break;
      case 2:
        tar = arr[0];
        break;
    }
    let res = search(arr, tar);
    let obj = {
      input: arr,
      target: tar,
      output: res
    }
    objArr.push(obj);
  }

  return objArr;
}

module.exports = generate