import React, { Component } from 'react';
import './Navbar.css';
import lion from '../svgs/lion.svg';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
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

                    <div className="navbar_right">
                        {this.props.username}
                        <img src={this.props.image_url} />
                        {this.props.honor}
                    </div>

                </div>
            
                <div onMouseLeave={()=>this.setState({hover:'upwards'})} className={this.state.hover? this.state.hover==='downwards'? 'pull-down-menu':'pull-up-menu' :'hide-pull-down'}>
                    <NavLink to='/'><button><i class="fa fa-home" aria-hidden="true"></i> Home</button></NavLink>
                    {/* <NavLink to={`/fightdetails/`}><button>Random Fight</button></NavLink> */}
                    <NavLink to='/search'><button><i class="fa fa-circle-o-notch" aria-hidden="true"></i> Search</button></NavLink>
                    <NavLink to='/create'><button><i class="fa fa-plus-square" aria-hidden="true"></i> Create</button></NavLink>
                    
                </div>
           
            </div>
        )
    }
}

export default Navbar