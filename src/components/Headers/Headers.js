import React, { Component } from 'react';
import './Headers.css';

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className='header'>
                {this.props.id}
            </div>
        )
    }
}