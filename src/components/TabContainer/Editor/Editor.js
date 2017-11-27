import React, { Component } from 'react';
import AceEditor from 'react-ace';
import './Editor.css'


import 'brace/mode/javascript';
import 'brace/theme/merbivore';

class Editor extends Component {
    constructor(props) {
        super(props)
        this.ctrl = false
        this.metaKey = false
    }

    //this will wait for a new value of click to arrive and then will fire off the handleClick method
    componentWillReceiveProps(newProps) {
        console.log(newProps)
        if (newProps.click === 1) {
            this.handleTestClick()
        } else if (newProps.click === 2) {
            this.handleAttemptClick()
        }
    }

    //this keeps track of what the user is putting into ace
    onChange(value) {
        this.props.onChange(value)
    }

    //post a message tothe iframe with the content being what the user entered into ace
    handleAttemptClick() {
        let fight = this.props.fight
        let code = this.props.code
        if (this.props.title === 'placeholder') {
            code = this.props.solution
        }
        let message = { code, fight }
        this.ifr.contentWindow.postMessage(message, "*")
    }

    handleTestClick() {
        let tests = this.props.fight.tests.filter(test => test.hidden === false)
        tests = { tests: tests }
        let message = { code: this.props.code, fight: tests }
        this.ifr.contentWindow.postMessage(message, "*")
    }

    onKeyDown = (event, change) => {
        //     if (event.key === 'Control') {
        //         this.ctrl = true
        //     }
        //     if (event.metaKey) {
        //         this.metaKey = true
        //     }
        //     console.log(this.ctrl, this.metaKey)
        //     if ((this.ctrl || this.metaKey) && event.key === 'Enter') {
        //         event.preventDefault()
        //         this.props.create ?
        //             this.handleAttemptClick()
        //             :
        //             this.handleTestClick()
        //     }
    }

    onKeyUp = (event, change) => {
        //     if (event.key === 'Control') {
        //         this.ctrl = false
        //     }
        //     if (event.metaKey) {
        //         this.metaKey = false
        //     }
    }


    render() {
        return (
            <div className='ace-editor' onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp}>
                <iframe style={{ display: "none" }} title='sandbox' src="http://localhost:3000/iframe.html" sandbox="allow-scripts" ref={(f) => { this.ifr = f }} />
                <AceEditor
                    value={this.props.code}
                    mode="javascript"
                    onChange={(e) => this.onChange(e)}
                    name="ace1"
                    editorProps={{ $blockScrolling: true }}
                    //new properties look here if things get buggy
                    theme={this.props.hasOwnProperty("theme") ? this.props.theme : "merbivore"}
                    showGutter={this.props.hasOwnProperty('gutter') ? this.props.gutter : true} //keeping default as true
                    fontSize={this.props.hasOwnProperty('fontSize') ? this.props.fontSize : '18px'} //default font size
                    readOnly={this.props.hasOwnProperty('readOnly') ? this.props.readOnly : false} //default is false
                    height={this.props.hasOwnProperty('height') ? this.props.height : '500px'} //default is still 500px
                    showPrintMargin={false}
                    highlightActiveLine={false}
                    maxLines={this.props.hasOwnProperty('maxLines') ? this.props.minLines : null}
                    className={this.props.className}
                />
            </div>
        )
    }
}

export default Editor;