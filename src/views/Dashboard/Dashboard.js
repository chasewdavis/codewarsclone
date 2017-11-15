import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className='dashboard'>
                <Navbar/>
                dashboard
            </div>
        )
    }
}