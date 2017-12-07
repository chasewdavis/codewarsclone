import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Editor from '../../components/TabContainer/Editor/Editor';
import Output from './Output/Output';
import calls from '../../utilities/data/data';
import Btn from '../../components/Buttons/Buttons';
import './CatFight.css';
import axios from 'axios';
import Tests from './Tests/Tests.js';
import { connect } from 'react-redux';
import Headers from '../../components/Headers/Headers';

class CatFight extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cat: {},
            click: null,
            code: '',
            testResults: [],
            fight: {},
            tab: 1,
            //1 means all tests were passed. 2 means some tests failed. 3 is the default condition before any tests have been checked
            testsPassed: 3,
            hiddenTests: false,
            username: ''
        }
        this.baseState = this.state
        this.onChange = this.onChange.bind(this)
        this.handleReceivedMessage = this.handleReceivedMessage.bind(this)
        this.handleOutputTabChange = this.handleOutputTabChange.bind(this)
    }

    // get a fight by id
    //set the event listener on the main window
    componentDidMount() {
        console.log(this.props.user)
        calls.getFightById(this.props.match.params.id).then(fight => {this.setState({ fight: fight, code: fight.placeholder}), console.log(this.state)})
        calls.getCat(this.props.user.cats_id).then(cat => {
         this.setState({
             cat: cat.data[0]
         }, () => {
             const {cats_id} = this.state.cat;
             const cat_fight_id = this.props.match.params.id
            calls.postFightInProgress({cats_id, cat_fight_id})
         })   
        })
        
        window.addEventListener('message', this.handleReceivedMessage)
    }

    handleReceivedMessage(e) {
        this.setState({
            testResults: e.data.tests,
            click: null
        }, ()=> {
            if(e.data.source) {
            } else {
            let testFlag = true;
            let hiddenTests = false
            this.state.testResults.map(test => {
                if(test.passed === false) {
                    testFlag = false;
                }
                if(test.hidden === true) {
                    hiddenTests = true;
                }
            })
            if(testFlag === true && hiddenTests === true) {
                this.setState({
                    testsPassed: 1,
                    testResults: e.data.tests,
                    hiddenTests: true
                })
            }  else if(testFlag ===true) {
                this.setState({
                    testsPassed: 1,
                    testResults: e.data.tests
                })
            } else {
                this.setState({
                    testsPassed: 2,
                    testResults: e.data.tests
                })
            }
        }
        })
    }

    //will toggle click state property and send a message
    handleClick() {
        this.setState({
            click: 2,
            tab: 2
        })
    }

    handleResetClick() {
        this.setState({
            tab: 1,
            testResults: [],
            testsPassed: 3,
            hiddenTests: false
        })
    }

    handleSaveClick() {
        const catId = this.state.cat.cats_id;
        const catFightId = this.props.match.params.id;
        const userSolution = this.state.code;
        const completed = false;
        calls.putFightInProgress({catId, catFightId, userSolution, completed})
    }

    handleSampleClick() {
        this.setState({
            click: 1,
            tab: 2
        })
    }

    handleSkipClick() {
        calls.getRandomFight().then(res => {
            this.setState({
                click: null,
                code: res.placeholder,
                testResults: [],
                fight: res,
                tab: 1,
                testsPassed: 3
            })
        })

    }

    handleSubmitClick() {
        this.setState({
            click: 2,
            tab: 2
        }, () => {
            if(this.state.testsPassed === 1) {
                //axios call to send data to the database
                let body = {
                    //change this to the user on Redux ****************************************************
                    catId: this.props.user.cats_id,
                    catFightId: this.state.fight.cat_fight_id,
                    completed: true,
                    userSolution: this.state.code,
                    // Change this too so that it accounts for the difficult of the kata ********************
                    honor: this.state.fight.fight_honor
                }
                calls.postCompletedFightInProgress(body).then( resp => {
                    this.props.history.push('/fightdetails/' + this.state.fight.cat_fight_id)
                })
            }
        })
    }

    //keeps track of what the user is entering in ace
    onChange(value) {
        this.setState({
            code: value
        })
    }

    handleOutputTabChange(num) {
        this.setState({
            tab: num
        })
    }


    render() {
        return (
            <div>
                <Navbar username={this.props.user.username} image_url={this.props.user.image_url} honor={this.props.user.honor}/>
                <div className="catfight_wrapper">
                    <div className='catfight_top-header'>
                        <div className="catfight_top-header-left"> <Headers difficulty={this.state.fight.difficulty} name={this.state.fight.name} author={this.state.fight.username}/></div>
                        <div className='catfight_top-header-right'>
                            <ul>
                                <li>
                                    <i class="fa fa-sun-o" aria-hidden="true"></i>
                                </li>
                                <li>
                                    <i class="fa fa-moon-o" aria-hidden="true"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Output description={this.state.fight.description} testsPassed={this.state.testsPassed} handleTabChange={this.handleOutputTabChange} tab={this.state.tab} results={this.state.testResults} />
                    <div className='catfight_editor'>
                        <div className="catfight_editor-header">Solution: <i className="fa fa-arrows-alt" aria-hidden="true"></i></div>
                        <Editor fight={this.state.fight} click={this.state.click} onChange={this.onChange} code={this.state.code} />
                        <div className="catfight_tests">
                            <div className='catfight_tests-div'>
                                <div className="catfight_tests-header"><div>Sample Tests:</div>
                                <div><i className="fa fa-arrows-alt" aria-hidden="true"></i><i className="fa fa-question-circle" aria-hidden="true"></i></div>
                                
                            </div>
                            <div className="tests-wrapper">
                                <Tests 
                                tests={this.state.fight ? this.state.fight.tests : null}
                                change={() => console.log('')}
                                addTest={() => console.log('')}
                                creating={false}
                                args={[]}
                                />
                            </div>
                        </div>
                            <div className="catfight_button-container">
                                <div>
                                    <button className='catfight_skip-button' onClick={() => this.handleSkipClick()}><i className="fa fa-forward" aria-hidden="true"></i>SKIP</button>
                                    <button className='catfight_skip-button' onClick={() => this.handleSaveClick()}>SAVE</button>
                                </div>
                                <div>
                                    <button className='catfight_reset-button' onClick={() => this.handleResetClick()}>RESET</button>
                                    <button className='catfight_sample-button' onClick={() => this.handleSampleClick()}>RUN SAMPLE TESTS</button>
                                    {
                                    this.state.testsPassed === 1 && this.state.hiddenTests ? 
                                    <button className="catfight_submit-button" onClick={() => this.handleSubmitClick()}>SUBMIT FINAL</button>
                                    :
                                    <button className='catfight_attempt-button' onClick={() => this.handleClick()}><i className="fa fa-caret-right" aria-hidden="true"></i>ATTEMPT</button>
                                    }
                                </div>
                            </div>
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

export default connect(mapStateToProps)(CatFight);