import React from 'react'

export default function CountNumber(props) {
    console.log("propsss", props);
    return (
        <div>
            Count: {props.countNum}
        </div>
    );
}
