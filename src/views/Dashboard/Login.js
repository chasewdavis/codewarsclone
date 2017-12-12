import React, { Component } from 'react';
import './Dashboard.css';
import lion from '../../components/svgs/lion.svg';
import background from '../../components/svgs/background.png';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

   
    
    render() {

        var imageStyle = {
            backgroundImage: 'url(' + background +  ')'    
        }

        return (
            <div className='Login'>
                <div className="login_wrapper">
                    <div className='login_helper'></div>
                    <img style={imageStyle} src={lion} />
                    <h1>Cat Fights</h1>
                    <div className='subtitle-box'>
                        <a href={process.env.REACT_APP_LOGIN}>Login / Register</a>
                    </div>
                    <div className='login_footer'>

                    </div>
                </div>
            </div>
        )
    }
}


export default Login;