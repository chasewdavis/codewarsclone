import React, { Component } from 'react';
import './Profile.css';
import {connect} from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import { Diff } from '../../components/Buttons/Buttons';
import calls from '../../utilities/data/data';
import {Bar} from 'react-chartjs-2';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfAllies: 0,
            rank: 0,
            data: [5,0,0,0,1,2,2]
        }
    }

    componentDidMount() {
        calls.getNumberOfAllies(this.props.user.clan, this.props.user.cats_id).then(resp => {
            console.log(resp)
            let newData = [resp.data.resp3[0].count, resp.data.resp4[0].count, 0, 0, 1, 2, 2];

            this.setState({
                numberOfAllies: resp.data.resp1[0].count,
                rank: resp.data.resp2[0].position,
                data: newData
            }, () => console.log(this.state))
        })
    }


    render() {

        const data = {
            labels: ["Completed Kata", "Authored Kata" , "Comments", "Up Votes", "Referrals", "Achievements"],
            datasets: [{
                label: "Number",
                data: this.state.data,
                backgroundColor: ['rgba(255,99,132,0.2)','rgba(255,99,132,0.2)','rgba(255,99,132,0.2)','rgba(255,99,132,0.2)','rgba(255,99,132,0.2)','rgba(255,99,132,0.2)'],
                borderColor: ['rgba(255,99,132,1)','rgba(255,99,132,1)','rgba(255,99,132,1)','rgba(255,99,132,1)','rgba(255,99,132,1)','rgba(255,99,132,1)'],
                borderWidth: 1
            }]
        }

        return (
            <div className="profile_super">
                <Navbar username={this.props.user.username} image_url={this.props.user.image_url} honor={this.props.user.honor}/>
                <div className="profile_main-wrapper">
                    
                    <div className="profile_first-div">
                        <div className="profile_flexbox-1">
                        <img src={this.props.user.image_url} />
                            <div className="profile_flex-container">
                                <div>{this.props.user.username} - {this.props.user.honor} </div>
                                <div>Name: Unknown</div>
                                <div>Clan: {this.props.user.clan}</div>
                                <button>View Profile Badges</button>
                            </div>

                            <div className="profile_flex-container">
                                <div>Member Since: {this.props.user.created_at}</div>
                                <div>Last Seen: {this.props.user.last_seen_at}</div>
                                <div>Profiles: </div>
                            </div>

                            <div id="last_div" className="profile_flex-container">
                                <div>Following: {this.state.numberOfAllies}</div>
                                <div>Followers: {this.state.numberOfAllies}</div>
                                <div>Allies: {this.state.numberOfAllies}</div>
                            </div>

                        </div>
                    </div>

                    <div className="profile_progress-div">

                        <div className="profile_progress-div1">
                            <img />
                            <div className="profile_stats-container">
                                <h2 id="progress">Progress</h2>
                                <div className="profile_stats-row">

                                    <div clasName="profile_stat-box1">
                                        <div>Rank: 5 kyu</div>
                                        <div>Honor: {this.props.user.honor}</div>
                                        <div>Leaderboard Position: #{this.state.rank}</div>
                                        <div>Honor Percentile: 92nd</div>
                                        <div>Total Completed Kata: 39</div>
                                    </div>

                                    <div clasName="profile_stat-box">
                                        <h2><i class="fa fa-code" aria-hidden="true"></i> Languages: </h2>
                                        <div>Total Languages Trained: 1</div>
                                        <div>Highest Trained: JavaScript (5 kyu)</div>
                                        <div>Most Recent: JavaScript</div>
                                    </div>

                                    <div clasName="profile_stat-box">
                                        <h2><i class="fa fa-caret-up" aria-hidden="true"></i> Up Votes: </h2>
                                        <div>Upgrade To Red</div>
                                    </div>

                                </div>
                            </div>  
                        </div>

                        <div className="profile_progress-div2">
                            <h2>Honor Breakdown</h2>
                            <Bar 
                            data={data}
                            width={1000}
                            height={300}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                },
                                legend: {
                                    display: false
                                }
                            }}
                            />
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

function mapStateToProps({user}) {
    return {
        user
    }
}

export default connect(mapStateToProps)(Profile)