import React from 'react';

export default function(props){

    return ( 
    <button onClick={() => props.click()}>
        {props.name}
    </button>
    )
}

export function Skip(props){
    return (
        <button>
            {props.name}
        </button>
    )
}