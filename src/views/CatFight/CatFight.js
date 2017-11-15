import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Editor from '../../components/TabContainer/Editor/Editor';
import Output from './Output/Output';
import axios from 'axios';

export default class CatFight extends Component {
    constructor(props) {
        super(props)
        this.state = {
            click: true,
            code: '',
            testResults: ''
        }
        this.onChange = this.onChange.bind(this)
        this.handleReceivedMessage = this.handleReceivedMessage.bind(this)
    }

    //set the event listener on the main window the callback will set a variable on the window called userFunction
    componentDidMount() {
        window.addEventListener('message', this.handleReceivedMessage)
    }

    handleReceivedMessage(e) {
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
        return (
            <div className='catfight'>
                <Navbar/>
                catfight
                <Editor click={this.state.click} onChange={this.onChange} code={this.state.code}/>
                <button onClick={() => this.handleClick()}>Submit</button>
                <Output />
            </div>
        )
    }
}