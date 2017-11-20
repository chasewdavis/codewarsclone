import React, { Component } from 'react';
import AceEditor from 'react-ace';
import './Editor.css'


import 'brace/mode/javascript';
import 'brace/theme/merbivore';

class Editor extends Component {
    constructor(props) {
        super(props)
    }

    //this will wait for a new value of click to arrive and then will fire off the handleClick method
    componentWillReceiveProps(newProps) {
        console.log(newProps.fight)
        if(newProps.click === 1) {
            this.handleTestClick()
        } else if(newProps.click === 2) {
            this.handleAttemptClick()
        }
    }

    //this keeps track of what the user is putting into ace
    onChange(value) {
		this.props.onChange(value)
    }

    //post a message tothe iframe with the content being what the user entered into ace
    handleAttemptClick() {
        let message = { code: this.props.code, fight: this.props.fight }
        console.log(message)
        this.ifr.contentWindow.postMessage(message, "*")
    }        
    
    handleTestClick() {
        let tests = this.props.fight.tests.filter(test => test.hidden === false)
        tests = {tests: tests}
        let message = {code: this.props.code, fight: tests}
        this.ifr.contentWindow.postMessage(message, "*")
    }
    

    render() {
        return (
            <div className='ace-editor'>
                <iframe style={{display: "none"}} title='sandbox' src="http://localhost:3000/iframe.html" sandbox="allow-scripts" ref={(f) => {this.ifr = f}}/>
                <AceEditor
				value={this.props.code}
				mode="javascript"
				theme="merbivore"
				onChange={(e) => this.onChange(e)}
				name="ace1"
				editorProps={{$blockScrolling: true}}
				/>
            </div>
        )
    }
}

export default Editor;