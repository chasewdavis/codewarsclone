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
                <Navbar username={this.props.user.username} image_url={this.props.user.image_url} honor={this.props.user.honor}/>
                <div className='dashboard'>
                    <NextFight />

                    <div className="dashboard_codewars-red">
                        <div className="dashboard_codewars-icon"><i class="fa fa-diamond" aria-hidden="true"></i></div>
                            <div className="dashboard_codewars-red-inner-container">
                                <h5>Upgrade To Cat Fights Red!</h5>
                                <div>Support Cat Fights and get some fancy upgrades like Pro Stats, Head-to-head comparisions, No ads, Streaming Output and more.</div>
                                <button className="dashboard_codewars-button">LEARN ABOUT RED</button>
                            </div>
                    </div>

                    <div className="dashboard_allies-container">
                        <h4 className="dashboard_allies-header"><i class="fa fa-users" aria-hidden="true"></i> Allies</h4>
                        <p>You are automatically given an allegiance with anyone who is in the same clan as you. You can also become allies with other warriors by following each other or inviting new warriors to join.</p>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Position</th>
                                    <th className="dashboard_table-large">User</th>
                                    <th className="dashboard_table-large">Clan</th>
                                    <th>Honor</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="dashboard_more-honor">
                    <div className="dashboard_codewars-icon"><i class="fa fa-user-plus" aria-hidden="true"></i></div>
                            <div className="dashboard_codewars-red-inner-container">
                                <h5>Earn extra honor and gain new allies!</h5>
                                <div>Honor is earned for each new codewarrior who joins</div>
                                <button className="dashboard_codewars-button">LEARN MORE</button>
                            </div>
                    </div>

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