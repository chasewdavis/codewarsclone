import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NextFight from './NextFight/NextFight';
import './Dashboard.css';

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className='dashboard'>
                    <NextFight />
                </div>
            </div>
        )
    }
}