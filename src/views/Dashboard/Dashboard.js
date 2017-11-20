import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NextFight from './NextFight/NextFight';
import './Dashboard.css';
import {getUserInfo} from '../../ducks/reducer';
import {connect} from 'react-redux';


class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getUserInfo();
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

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {getUserInfo})(Dashboard);