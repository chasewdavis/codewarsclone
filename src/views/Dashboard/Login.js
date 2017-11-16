import React, { Component } from 'react';
import {getUserInfo} from '../../ducks/reducer';
import {connect} from 'react-redux';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    // componentDidMount() {
    //     this.props.getUserInfo();
    // }

    render() {
        return (
            <div className='Login'>
                <div className='subtitle-box'>
                    <a href={process.env.REACT_APP_LOGIN}>LOGIN</a>
                </div>
                <div className='subtitle-box'>
                    <a href='/home'>Continue without logging in</a>
                </div>
                <div className='login-container'>
                </div>
            </div>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//         user: state.user
//     }
// }

// export default connect(mapStateToProps, {getUserInfo})(Login);