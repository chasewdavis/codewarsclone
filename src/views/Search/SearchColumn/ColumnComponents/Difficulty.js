import React, { Component } from 'react';
import './Difficulty.css';
import { Diff } from '../../../../components/Buttons/Buttons';
import axios from 'axios';
import { transferSearchResults } from '../../../../ducks/reducer';
import { connect } from 'react-redux';

class Difficulty extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.searchByDifficulty = this.searchByDifficulty.bind(this);
    }

    searchByDifficulty(difficulty){
        console.log(difficulty)
        axios.get(`/api/SearchByDifficulty/${difficulty}`).then(fights=>{
            this.props.transferSearchResults(fights.data)
        })
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

export default connect(null,{transferSearchResults})(Difficulty);