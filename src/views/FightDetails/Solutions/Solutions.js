import React, { Component } from 'react';
import './Solutions.css';
// import Instructions from '../../../components/TabContainer/Instructions/Instructions.js';
import Editor from '../../../components/TabContainer/Editor/Editor.js';
import html from '../../../components/TabContainer/Instructions/html-rules';

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        console.log(this.props)
        let solutions = this.props.solutions.map((e,i)=>{
            console.log(html.deserialize(e.user_solution))
            return (
                <div className='solutions_solution' key={i}>
                    <div>{e.username}</div>
                    <div className='solutions_editor_parent'>
                    {/* {e.user_solution} */}
                    {/* <Instructions code={e.user_solution} description={html.deserialize(e.user_solution)} change={()=>{}}/> */}
                        <div className='solutions_padding'>
                            <Editor 
                                gutter={false} 
                                code={e.user_solution} 
                                readOnly={true}
                                height={'62px'}
                                maxLines={1}
                                showPrintMargin={false}
                                highlightActiveLine={false}
                                className='solutions_editor'
                                wrapEnabled={true}
                                // theme={'monokai'}
                            />
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className='solutions'>
                {solutions}
            </div>
        )
    }
}