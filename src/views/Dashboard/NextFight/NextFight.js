import React, { Component } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import './NextFight.css';

import Button, { Skip } from '../../../components/Buttons/Buttons';

export default class NextFight extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
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