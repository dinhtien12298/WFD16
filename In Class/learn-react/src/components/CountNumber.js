import React from 'react'

export default function countNum(props) {
  return (
    <div>
        <div>Count: {props.countNum}</div>
        <button onClick={props.updateCount}>Add 1</button>
    </div>
  )
}
