import React, { Component } from 'react';
import './Headers.css';

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        console.log(this.props)
        return (
            <div className='header'>
                <top>{this.props.difficulty} {this.props.name}</top>
                <bottom>{this.props.author}</bottom>
            </div>
        )
    }
}