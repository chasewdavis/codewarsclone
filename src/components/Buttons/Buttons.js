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

export function Diff(props){
    
    function determineColor(rating, hover) {
        if(rating >= 7){
            if(hover){
                return 'white';
            }else{
                return 'whiteNoHover'
            }
        }else if(rating >= 5){
            if(hover){
                return 'gold';
            }else{
                return 'goldNoHover';
            }
        }else if(rating >= 3){
            if(hover){
                return 'blue';
            }else{
                return 'blueNoHover';
            }
        }else {
            if(hover){
                return 'purple';
            }else{
                return 'purpleNoHover';
            }
        }
    }

    return (
        <button className={props.isButton?'button_difficulty difficulty_hover':'button_difficulty difficulty_readOnly'} id={determineColor(props.rating, props.isButton)} onClick={props.isButton?()=>props.clicked():()=>{}}>
            <div className='skew-left'></div>
            <div className='skew-right'></div>
            <div className='skew-bottom-left'></div>
            <div className='skew-bottom-right'></div>
            <div className='rating'><div>{props.rating}</div><div>kyu</div></div>
        </button>
    )
}