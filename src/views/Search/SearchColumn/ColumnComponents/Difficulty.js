import React, { Component } from 'react';
import './Difficulty.css';
import { Diff } from '../../../../components/Buttons/Buttons';

class Difficulty extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.searchByDifficulty = this.searchByDifficulty.bind(this);
    }

    searchByDifficulty(difficulty){
        console.log(difficulty)
    }

    render() {

        let buttons = [];

        for(let i = 8; i > 0; i--){
            buttons.push(<Diff clicked={()=>this.searchByDifficulty(i)} key={i} isButton={true} rating={i}/>)
        }

        return (
            <div className='difficulty'>
                <div>Difficulty:</div>
                <div className='rowOne'>
                    {buttons.slice(0,4)}
                </div>
                <div className='rowTwo'>
                    {buttons.slice(4)}
                </div>
                <div className='bottom-border'></div>
            </div>
        )
    }
}

export default Difficulty;