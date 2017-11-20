import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Editor from '../../components/TabContainer/Editor/Editor';
import Output from './Output/Output';
import calls from '../../utilities/data/data';
import Btn from '../../components/Buttons/Buttons';
import './CatFight.css';
import axios from 'axios';


export default class CatFight extends Component {
    constructor(props) {
        super(props)
        this.state = {
            click: null,
            code: '',
            testResults: [],
            fight: {},
            tab: 1,
            //1 means all tests were passed. 2 means some tests failed. 3 is the default condition before any tests have been checked
            testsPassed: 3
        }
        this.baseState = this.state
        this.onChange = this.onChange.bind(this)
        this.handleReceivedMessage = this.handleReceivedMessage.bind(this)
        this.handleOutputTabChange = this.handleOutputTabChange.bind(this)
    }

    // get a fight by id
    //set the event listener on the main window
    componentDidMount() {
        calls.getFightById(this.props.match.params.id).then(fight => {this.setState({ fight: fight, code: fight.placeholder }), console.log(this.state)})
        window.addEventListener('message', this.handleReceivedMessage)
    }

    handleReceivedMessage(e) {
        this.setState({
            testResults: e.data,
            click: null
        }, ()=> {
            if(this.state.testResults.source) {
                console.log(this.state.testResults)
            } else {
            console.log(this.state.testResults)
            let testFlag = true;
            this.state.testResults.map(test => {
                
                if(test.passed === false) {
                    testFlag = false;
                }
            })
            if(testFlag === true) {
                this.setState({
                    testsPassed: 1
                },()=>console.log(this.state))
            } else {
                this.setState({
                    testsPassed: 2
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
            testsPassed: 3
        })
    }

    handleSampleClick() {
        this.setState({
            click: 1,
            tab: 2
        })
    }

    handleSkipClick() {
        calls.getRandomFight().then(res => {
            console.log(res)
            this.setState({
                click: null,
                code: res.placeholder,
                testResults: [],
                fight: res,
                tab: 1,
                testsPassed: 3
            }, () => console.log(this.state))
        })

    }

    handleSubmitClick() {
        console.log("submit")
        this.setState({
            click: 2,
            tab: 2
        }, () => {
            if(this.state.testsPassed === 1) {
                //axios call to send data to the database
                let body = {
                    cat_fight_id: this.state.fight.cat_fight_id,
                    completed: true,
                    user_solution: this.state.code,
                }
                calls.postFightInProgress(body)
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
                <Navbar />
                <div className="catfight_wrapper">
                    <Output description={this.state.fight.description} testsPassed={this.state.testsPassed} handleTabChange={this.handleOutputTabChange} tab={this.state.tab} results={this.state.testResults} />
                    <div className='catfight_editor'>
                        <div className="catfight_editor-header">Solution: <i className="fa fa-arrows-alt" aria-hidden="true"></i></div>
                        <Editor fight={this.state.fight} click={this.state.click} onChange={this.onChange} code={this.state.code} />
                        <div className="catfight_tests">
                            <div className='catfight_tests-div'>
                                <div className="catfight_tests-header"><div>Sample Tests:</div>
                                <div><i className="fa fa-arrows-alt" aria-hidden="true"></i><i className="fa fa-question-circle" aria-hidden="true"></i></div>
                            </div>
                        </div>
                            <div className="catfight_button-container">
                                <div>
                                    <button className='catfight_skip-button' onClick={() => this.handleSkipClick()}><i className="fa fa-forward" aria-hidden="true"></i>SKIP</button>
                                </div>
                                <div>
                                    <button className='catfight_reset-button' onClick={() => this.handleResetClick()}>RESET</button>
                                    <button className='catfight_sample-button' onClick={() => this.handleSampleClick()}>RUN SAMPLE TESTS</button>
                                    {
                                    this.state.testsPassed === 1 ? 
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