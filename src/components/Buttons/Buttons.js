import React from 'react';
import './Buttons.css';

export default function(props){

    return ( 
    <button onClick={() => props.clicked()}>
        {props.name}
    </button>
    )
}

export function Hollow(props){
    return (
        <button className='button_hollow' onClick={() => props.clicked()}>
            {props.name}
        </button>
    )
}

export function Solid(props){
    return (
        <button className='button_solid' onClick={() => props.clicked()}>
            {props.name}
        </button>
    )
}