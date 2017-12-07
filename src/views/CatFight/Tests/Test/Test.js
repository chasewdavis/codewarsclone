import React, { Component } from 'react';

let dataTypes = [
    'string',
    'number',
    'array',
    'boolean',
    'null',
    'undefined',
    // 'symbol',
    // 'object',
]

export default class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }
    toggle = () => {
        this.setState({
            open: !this.state.open
        })
    }
    render() {
        let props = this.props
        // console.log(props)
        return (
            <div className={this.state.open ? 'Test' : 'Test closed'} onClick={this.state.open ? null : this.toggle} >
                <div className='test-title' onClick={this.toggle}>
                    <div>TEST #{props.id + 1}</div>
                    <div>
                        {
                            props.passed ?
                                `(${props.parameters.length ? props.parameters.join(', ') : null}) => ${props.expected_result}`
                                :
                                <div>expected &nbsp; <em>{props.expected_result}</em> &nbsp; returned &nbsp;<em>{props.result}</em></div>
                        }
                    </div>
                    <div className='test-delete' onClick={props.removeTest}>X</div>
                </div>
                {
                    this.state.open ?
                        <div className='open-test'>
                            <div className='parameter-box'>
                                {
                                    props.parameters.length ?
                                        props.parameters.map((param, i) => {
                                            props.parameter_errors ? console.log(props.parameter_errors[i]) : null
                                            return (
                                                <div key={i}>
                                                    <div className='input-line' >
                                                        <div>Parameter {i + 1}:</div>
                                                        <input
                                                            onChange={e => props.change(props.id, 'params', e.target.value, i)}
                                                            value={param}
                                                            placeholder={props.args ? props.args.length ? props.args[i] : null : null}
                                                        />
                                                        <select
                                                            onChange={e => props.change(props.id, 'types', e.target.value, i)}
                                                            defaultValue={"Data Type"}
                                                        >
                                                            <option value="Data Type" disabled>Data Type</option>
                                                            {
                                                                dataTypes.map((type, i) => {
                                                                    return (
                                                                        <option key={i} value={type}>
                                                                            {type}
                                                                        </option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    {
                                                        props.parameter_errors ?
                                                            props.parameter_errors[i] ?
                                                                <div className='input-line'>
                                                                    &nbsp;---&nbsp;{props.parameter_errors[i]}
                                                                </div>
                                                                :
                                                                null
                                                            :
                                                            null
                                                    }
                                                </div>
                                            )
                                        })
                                        :
                                        <div className='test-input-placeholder' />
                                }
                            </div>
                            {/* <div className='types-box'>
                                Parameter Types: (separate by comma)
                                {
                                    props.types.length ?
                                        props.types.map((type, i) => {
                                            return (
                                                <div className='input-line' >
                                                    <div>Type of Parameter {i + 1}:</div>
                                                    <input key={i} onChange={e => props.change(props.id, 'types', e.target.value, i)} value={type} />
                                                </div>
                                            )
                                        })
                                        :
                                        <div className='test-input-placeholder' />
                                }
                            </div> */}
                            <div className='expected-result-box'>
                                <div className='input-line'>
                                    <div> Expected Result:</div>
                                    <input onChange={e => props.change(props.id, 'result', e.target.value)} value={props.expected_result} />
                                    <select
                                        onChange={e => props.change(props.id, 'result_type', e.target.value)}

                                        defaultValue={props.expected_result_type || "Data Type"}
                                    >
                                        <option disabled>Data Type</option>
                                        {
                                            dataTypes.map((type, i) => {
                                                return (
                                                    <option key={i} value={type}>
                                                        {type}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                {
                                    props.expected_result_error ?
                                        <div className="input-line">
                                            &nbsp;---&nbsp;{props.expected_result_error}
                                        </div>
                                        :
                                        null
                                }
                            </div>
                            <div onClick={this.toggle} className="done-button">
                                Done
                            </div>
                        </div>
                        :
                        null
                    // <div className="test-preview">
                    //     (
                    //     {
                    //         props.parameters.length ?
                    //             props.parameters.join(', ')
                    //             :
                    //             null
                    //     }
                    //     ) => {props.result}
                    // </div>
                }
            </div>
        )
    }
}