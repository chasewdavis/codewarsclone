import React, { Component } from 'react';
import './Navbar.css';
import lion from '../svgs/lion.svg';

export default class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hover:null
        }
    }
    render() {
        return (
            <div className='navbar-parent'>

                <div className='navbar'>
                    <div className='navbar-hover' onMouseOver={()=>this.setState({hover:'downwards'})}>
                        <div className='lion-box'>
                            <img src={lion} alt='lion'></img>
                        </div>
                    </div>
                </div>
            
                <div onMouseLeave={()=>this.setState({hover:'upwards'})} className={this.state.hover? this.state.hover==='downwards'? 'pull-down-menu':'pull-up-menu' :'hide-pull-down'}>
                    <button>one</button>
                    <button>two</button>
                    <button>three</button>
                </div>
           
            </div>
        )
    }
}