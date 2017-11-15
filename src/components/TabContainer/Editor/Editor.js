import React, { Component } from 'react';
import AceEditor from 'react-ace';


import 'brace/mode/javascript';
import 'brace/theme/monokai';

class Editor extends Component {
    constructor(props) {
        super(props)
    }

    //this will wait for a new value of click to arrive and then will fire off the handleClick method
    componentWillReceiveProps(newProps) {
        if(newProps.click !== this.props.click) {
            this.handleClick()
        }
    }

    //this keeps track of what the user is putting into ace
    onChange(value) {
		this.props.onChange(value)
    }

    //post a message tothe iframe with the content being what the user entered into ace
    handleClick() {
        this.ifr.contentWindow.postMessage(this.props.code, "*")
    }                                                                                                                                                                
    

    render() {
        return (
            <div>
                <iframe style={{display: "none"}} title='sandbox' src="http://localhost:3000/iframe.html" sandbox="allow-scripts" ref={(f) => {this.ifr = f}}/>
                <AceEditor
				value={this.props.code}
				mode="javascript"
				theme="monokai"
				onChange={(e) => this.onChange(e)}
				name="UNIQUE_ID_OF_DIV"
				editorProps={{$blockScrolling: true}}
				/>
            </div>
        )
    }
}

export default Editor;