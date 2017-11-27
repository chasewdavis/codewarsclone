import React, { Component } from 'react';
import './Headers.css';
import { Diff } from '../../components/Buttons/Buttons'

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
                            
                <top><Diff isButton={false} rating={this.props.difficulty}/> {this.props.name}</top>
                <bottom>
                    <div><i className="fa fa-user"></i> {this.props.author}</div>
                    <div><i class="fa fa-bullseye" aria-hidden="true"></i> Completion Count</div>
                </bottom>
            </div>
        )
    }
}