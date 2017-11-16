import React, { Component } from 'react';
import { Editor } from 'slate-react';
import html, { schema, initialValue } from './html-rules';
import './Instructions.css';

function CodeLine(props) {
    console.log('code line')
    console.log(props)
    return <div {...props.attributes}>{props.children}</div>
}

function CodeBlock(props) {
    console.log('code block')
    console.log(props)
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
    console.log(props)
    return <b>{props.children}</b>
}

export default class Instructions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: initialValue,
            schema: schema
        }
        this.ctrl = false
    }
    handleChange = ({ value }) => {
        this.setState({
            value
        })
    }
    onKeyDown = (event, change) => {
        console.log(change.value.startBlock)
        if (event.key == 'Control' || event.metaKey) {
            console.log(event.key)
            this.ctrl = true
            return
        }
        else if (!this.ctrl) return
        else if (change.value.startBlock.type == 'codeblock' && change.value.isExpanded) {
            change.delete()
        }
        change.insertText('\n')
        console.log()
        switch (event.key) {
            case '`':
                console.log('code')
                console.log(change)
                let isCode = change.value.blocks.some(block => block.type == 'codeblock')
                event.preventDefault();
                change.setBlock(isCode ? 'paragraph' : 'codeblock')
                return true;
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
            case 'code': return <CodeLine {...props} />
            case 'bold': return <BoldMark {...props} />
        }
    }

    decorateNode = node => {
        let texts = node.getTexts().toArray()
        let string = texts.map(t => t.text).join('\n')
        console.log(texts)
        console.log(string)
    }

    render() {
        return (
            <div className="Instructions">

                <Editor
                    value={this.state.value}
                    onChange={this.handleChange}
                    renderNode={this.renderNode}
                    onKeyDown={this.onKeyDown}
                    onKeyUp={this.onKeyUp}
                    decorateNode={this.decorateNode}
                /* schema={this.state.schema} */
                />

            </div>
        )
    }
}
