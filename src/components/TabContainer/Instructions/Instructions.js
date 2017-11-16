import React, { Component } from 'react';
import { Editor } from 'slate-react';
import html, { schema, initialValue } from './html-rules';

export default class Instructions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            state: {
                value: initialValue
            }
        }
        this.ctrl = false
    }
    handleChange = ({ value }) => {
        this.setState({
            state: {
                value
            }
        })
    }
    onKeyDown = (event, change) => {
        if (event.key == 'Control') {
            this.ctrl = true
        }
        else if (!this.ctrl) return
        else switch (event.key) {
            case '`':
                let isCode = change.state.blocks.some(block => block.type == 'code')
                event.preventDefault()
                change.setBlock(isCode ? 'paragraph' : 'code')
        }
    }
    onKeyUp = event => {
        if (event.key == 'Control') {
            this.ctrl = true
        }
    }
    render() {
        return (
            <div className="Instructions">
                
                <Editor
                    value={this.state.state.value}
                    onChange={this.handleChange}
                />

            </div>
        )
    }
}
