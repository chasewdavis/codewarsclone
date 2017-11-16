import React, { Component } from 'react';
import Prism from 'prismjs'
import { Editor } from 'slate-react';
import html, { initialValue } from './html-rules';
import './Instructions.css';

function CodeLine(props) {
    console.log('code line')
    // console.log(props)
    return <code {...props.attributes}>{props.children}</code>
}

function CodeBlock(props) {
    console.log('code block')
    // console.log(props)
    return (
        <div class="code-block" >
            <pre>
                <code {...props.attributes}>
                    {props.children}
                </code>
            </pre>
        </div>
    )
}

function BoldMark(props) {
    console.log('bold mark')
    // console.log(props)
    return <b>{props.children}</b>
}

export default class Instructions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: html.deserialize('<h1>Hello!</h1>') // initialValue,
            // schema: schema
        }
        this.ctrl = false
    }
    handleChange = ({ value }) => {
        this.setState({
            value
        })
    }
    onKeyDown = (event, change) => {
        // console.log(change)
        if (event.key == 'Control' || event.metaKey) {
            console.log(event.key)
            this.ctrl = true
            return
        }
        else if (!this.ctrl) {

            if (event.key != 'Enter' || change.value.startBlock.type !== 'codeblock') return
            if (change.value.isExpanded) {
                change.delete()
            }
            change.insertText('\n')
            return true
        }
        else if (this.ctrl && event.key == 'Enter') {
            change.insertBlock('paragraph')
            return true;
        }
        switch (event.key) {
            case '`':
                console.log('codeblock')
                let isCode = change.value.blocks.some(block => block.type == 'codeblock')
                event.preventDefault();
                change.setBlock(isCode ? 'paragraph' : 'codeblock')
                return true;
            case 'q':
                console.log('codeline')
                event.preventDefault()
                change.toggleMark('code')
                return true
            case 'b':
                console.log('bold')
                event.preventDefault();
                change.toggleMark('bold');
                return true;
            default:
                return;
        }
    }
    onKeyUp = event => {
        if (event.key == 'Control' || event.metaKey) {
            this.ctrl = false
        }
    }

    renderNode = props => {
        // console.log('render node')
        // console.log(props.node.type)
        switch (props.node.type) {
            case 'codeblock': return <CodeBlock {...props} />
            default:
                return
        }
    }

    renderMark = props => {
        switch (props.mark.type) {
            case 'code': return <CodeLine {...props} />
            case 'bold': return <BoldMark {...props} />
            default:
                return
        }
    }

    render() {
        // console.log(this.state.value)
        return (
            <div className="Instructions">

                <Editor
                    readOnly={this.props.help}
                    value={this.props.help ? this.props.help : this.state.value}
                    onChange={this.handleChange}
                    renderNode={this.renderNode}
                    renderMark={this.renderMark}
                    onKeyDown={this.onKeyDown}
                    onKeyUp={this.onKeyUp}
                /* decorateNode={this.decorateNode} */
                /* schema={this.state.schema} */
                />

            </div>
        )
    }
}
