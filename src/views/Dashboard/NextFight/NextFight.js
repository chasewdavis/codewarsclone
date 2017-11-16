import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar/Navbar';
import './NextFight.css';

import Button, { Skip } from '../../../components/Buttons/Buttons';

export default class NextFight extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount(){

        axios.get(`api/catfight/${1}`).then(res=>{console.log('cat fight is', res)})

        axios.get(`/api/randomCatFight`).then(res=>{
            console.log('random cat fight is', res.data)
        })
    }

    render() {
        return (
            <div className='nextfight'>
                <div className='nextfight-challenge'>
                    Your Next Challenge...

                    <Button name='train'/>
                    <Skip name='skip'/>

                </div>

                <div className='nextfight-description'>
                    description
                </div>
            </div>
        )
    }
}