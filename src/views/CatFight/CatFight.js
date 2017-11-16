import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Editor from '../../components/TabContainer/Editor/Editor';
import Output from './Output/Output';
import calls from '../../utilities/data/data';
import Btn from '../../components/Buttons/Buttons';
import './CatFight.css';

export default class CatFight extends Component {
    constructor(props) {
        super(props)
        this.state = {
            click: true,
            code: '',
            testResults: [],
            fight: {}
        }
        this.onChange = this.onChange.bind(this)
        this.handleReceivedMessage = this.handleReceivedMessage.bind(this)
    }

    //set the event listener on the main window the callback will set a variable on the window called userFunction
    componentDidMount() {
        calls.getFightById(this.props.match.params.id).then(fight => this.setState({fight: fight, code: fight[0].placeholder}, () => console.log(fight)))
        window.addEventListener('message', this.handleReceivedMessage)
    }

    handleReceivedMessage(e) {
        console.log("e.data",e.data)
        this.setState({
            testResults: e.data
        }, () => console.log(this.state)) 
    }
    
    //will toggle click state property and send a message
    handleClick() {
        this.setState({
            click: !this.state.click
        })
    }

    //keeps track of what the user is entering in ace
    onChange(value) {
		this.setState({
			code: value
		})
    }


    render() {
        console.log(this.state.fight)
        return (
            <div>
                <Navbar/>
                <div className="catfight_wrapper">
                    <Output results={this.state.testResults}/>
                    <div className='catfight_editor'>
                        <Editor fight={this.state.fight} click={this.state.click} onChange={this.onChange} code={this.state.code}/>
                        <div className="catfight_tests">
                            <div className='catfight_tests-div'>

                            </div>
                            <div className="catfight_button-container">
                                <button className='catfight_button'onClick={() => this.handleClick()}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}