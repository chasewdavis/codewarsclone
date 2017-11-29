import React, { Component } from 'react';
import './Navbar.css';
import lion from '../svgs/lion.svg';
import { NavLink } from 'react-router-dom';
import { Diff } from '../Buttons/Buttons';
import background from '../svgs/background.png';


class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hover:null,
            level: 8
        }
    }

    componentWillReceiveProps(newProps) {
        if(newProps != this.state.props) {
            if(newProps.honor <= 150) {
                this.setState({
                level:  8
                })
            } else if(newProps.honor <= 420) {
                this.setState({
                level: 7
                })
            } else if(newProps.honor <= 906) {
                this.setState({
                level: 6
                })
            } else if(newProps.honor <= 1780) {
                this.setState({
                level: 5
                })
            } else if(newProps.honor <= 3355) {
                this.setState({
                level: 4
                })
            } else if(newProps.honor <=6189) {
                this.setState({
                level: 3
                })
            } else if(newProps.honor <=11291) {
                this.setState({
                level: 2
                })
            } else if(newProps.honor > 11291){
                this.setState({
                level: 1 
                })
            }
        }
    }

    componentDidMount() {
    
        if(this.props.honor <= 150) {
            this.setState({
            level:  8
            })
        } else if(this.props.honor <= 420) {
            this.setState({
            level: 7
            })
        } else if(this.props.honor <= 906) {
            this.setState({
            level: 6
            })
        } else if(this.props.honor <= 1780) {
            this.setState({
            level: 5
            })
        } else if(this.props.honor <= 3355) {
            this.setState({
            level: 4
            })
        } else if(this.props.honor <=6189) {
            this.setState({
            level: 3
            })
        } else if(this.props.honor <=11291) {
            this.setState({
            level: 2
            })
        } else if(this.props.honor > 11291){
            this.setState({
            level: 1 
            })
        }
    }

    render() {

        var imageStyle = {
            backgroundImage: 'url(' + background +  ')'    
        }

        return (
            <div className='navbar-parent'>

                <div className='navbar'>
                    <div className='navbar-hover' onMouseOver={()=>this.setState({hover:'downwards'})}>
                        <div className='lion-box'>
                            <img style={imageStyle} src={lion} alt='lion'></img>
                        </div>
                    </div>

                    <div className="navbar_right">
                        <div className="navbar_edges">{this.props.username}</div>
                        <img src={this.props.image_url} />
                        <div><Diff isButton={false} rating={this.state.level}/></div>
                        <div className="navbar_edges">{this.props.honor}</div>
                    </div>

                </div>
            
                <div onMouseLeave={()=>this.setState({hover:'upwards'})} className={this.state.hover? this.state.hover==='downwards'? 'pull-down-menu':'pull-up-menu' :'hide-pull-down'}>
                    <NavLink to='/'><button><i className="fa fa-home" aria-hidden="true"></i> Home</button></NavLink>
                    {/* <NavLink to={`/fightdetails/`}><button>Random Fight</button></NavLink> */}
                    <NavLink to='/profile'><button><i className="fa fa-user" aria-hidden="true"></i> Profile</button></NavLink>
                    <NavLink to='/search'><button><i className="fa fa-circle-o-notch" aria-hidden="true"></i> Search</button></NavLink>
                    <NavLink to='/create'><button><i className="fa fa-plus-square" aria-hidden="true"></i> Create</button></NavLink>
                    
                </div>
           
            </div>
        )
    }
}

export default Navbar