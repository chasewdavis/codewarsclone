import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Headers/Headers';

export default class FightDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className='fightdetails'>
                <Navbar/>
                <Header/>
            </div>
        )
    }
}