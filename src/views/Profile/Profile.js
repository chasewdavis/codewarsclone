import React, { Component } from 'react';
import './Profile.css';
import {connect} from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import { Diff } from '../../components/Buttons/Buttons';
import calls from '../../utilities/data/data';
import {Bar, Pie} from 'react-chartjs-2';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfAllies: 0,
            rank: 0,
            data: [5,0,0,0,1,2,2],
            pieData: [10, 90],
            level: 8,
            clan: ''
        }
    }

    componentDidMount() {
        calls.getNumberOfAllies(this.props.user.clan, this.props.user.cats_id).then(resp => {
            console.log(resp)
            let newData = [resp.data.resp3[0].count, resp.data.resp4[0].count, 0, 0, 1, 2, 2];

            this.setState({
                numberOfAllies: resp.data.resp1[0].count,
                rank: resp.data.resp2[0].position,
                data: newData,
                clan: this.props.user.clan
            }, () => {
                if(this.props.user.honor <= 150) {
                    this.setState({
                    level:  8,
                    pieData: [this.props.user.honor, 150 - this.props.user.honor]
                    })
                } else if(this.props.user.honor <= 420) {
                    this.setState({
                    level: 7,
                    pieData: [this.props.user.honor, 420 - this.props.user.honor]
                    })
                } else if(this.props.user.honor <= 906) {
                    this.setState({
                    level: 6,
                    pieData: [this.props.user.honor, 906 - this.props.user.honor]
                    })
                } else if(this.props.user.honor <= 1780) {
                    this.setState({
                    level: 5,
                    pieData: [this.props.user.honor, 1780 - this.props.user.honor]
                    })
                } else if(this.props.user.honor <= 3355) {
                    this.setState({
                    level: 4,
                    pieData: [this.props.user.honor, 3355 - this.props.user.honor]
                    })
                } else if(this.props.user.honor <=6189) {
                    this.setState({
                    level: 3,
                    pieData: [this.props.user.honor, 6189 - this.props.user.honor]
                    })
                } else if(this.props.user.honor <=11291) {
                    this.setState({
                    level: 2,
                    pieData: [this.props.user.honor, 11291 - this.props.user.honor]
                    })
                } else if(this.props.user.honor > 11291){
                    this.setState({
                    level: 1,
                    pieData: [this.props.user.honor, 20471 - this.props.user.honor]
                    })
                }
            })
        })
    }

    handleClanChange(clan) {
        this.setState({
            clan: clan
        })
    }

    updateClan() {
        let bod = {clan: this.state.clan,
                    catsId: this.props.user.cats_id
                    }
        calls.updateClan(bod).then(resp => {
            this.setState({
                clan: resp.data[0].clan
            }, ()=> console.log(this.state))
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

        const pieData = {
            labels:["Current Honor", "Honor Needed To Level Up"],
            datasets: [{
                data: this.state.pieData,
                backgroundColor: ["#307BBE", '#404143'],
                borderColor: "#404143"
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
                                <div className="profile_stats profile_username-header">  <Diff isButton={false} rating={this.state.level}/> <span className="profile_main-username">{this.props.user.username}</span> </div>
                                <div> Name: Unknown</div>
                                <div> Clan: <input className="clan-input" type="text" value={this.state.clan} onChange={(e) => this.handleClanChange(e.target.value)}/><button className="profile_button" onClick={() => this.updateClan()}>Update</button></div>
                                <button className="profile_button">View Profile Badges</button>
                            </div>

                            <div className="profile_flex-container">
                                <div className="profile_stats">Member Since: {this.props.user.created_at}</div>
                                <div className="profile_stats">Last Seen: {this.props.user.last_seen_at}</div>
                                <div className="profile_stats">Profiles: <i className="fa fa-github" aria-hidden="true"></i> <i className="fa fa-twitter" aria-hidden="true"></i> </div>
                            </div>

                            <div id="last_div" className="profile_flex-container">
                                <div className="profile_stats">Following: {this.state.numberOfAllies}</div>
                                <div className="profile_stats">Followers: {this.state.numberOfAllies}</div>
                                <div className="profile_stats">Allies: {this.state.numberOfAllies}</div>
                            </div>

                        </div>
                    </div>

                    <div className="profile_progress-div">

                        <div className="profile_progress-div1">
                            <img />
                            <div className="profile_stats-container">
                                <h2 id="progress">Progress</h2>
                                <div className="profile_stats-row">

                                    <div clasName="profile_stat-box profile_stat-box1">
                                        <div>Rank: {this.state.level}</div>
                                        <div>Honor: {this.props.user.honor}</div>
                                        <div>Leaderboard Position: #{this.state.rank}</div>
                                        <div>Honor Percentile: 92nd</div>
                                        <div>Total Completed Kata: {this.state.data[0]}</div>
                                    </div>

                                    <div clasName="profile_stat-box">
                                        <h2><i class="fa fa-code" aria-hidden="true"></i> Languages: </h2>
                                        <div>Total Languages Trained: 1</div>
                                        <div>Highest Trained: JavaScript ({this.state.data[0]})</div>
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
                            <h2><i className="fa fa-bar-chart" aria-hidden="true"></i> Stats</h2>
                            <Bar 
                            data={data}
                            width={1000}
                            height={100}
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

                        <div className="profile_progress-div2">
                            <h2><i class="fa fa-trophy" aria-hidden="true"></i> Rank Breakdown</h2>
                            <Pie 
                            data={pieData}
                            options={{
                                cutoutPercentage: 70,
                                legend: {
                                    display: false
                                },
                                maintainAspectRatio: false
                            }}
                            />
                        </div>
                    </div>

                    <div className="profile_footer">
                            <div><a href="#"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a></div>
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