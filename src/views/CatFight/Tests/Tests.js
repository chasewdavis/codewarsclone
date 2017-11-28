import React, { Component } from 'react';
import './Tests.css';

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

class Test extends Component {
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
                                            console.log(props.parameter_errors ? props.parameter_errors[i] : null)
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

                                                            defaultValue={props.parameter_types ? props.parameter_types.length ? props.parameter_types[i] : "Data Type" : "Data Type"}
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

function FunctionError(props) {
    if (!props.error) return null
    return (
        <div className='test-border failed'>
            <div className='FunctionError Test'>
                <div className='open-test'>
                    <div className='test-title'>
                        There was something wrong with your function
                </div>
                    <div className='parameter-box'>
                        <div className='input-line'>
                            {props.error}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default class Tests extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        // console.log(this.props)
        // console.log(this.props.tests)
        // console.log(typeof this.props.function_error)
        // console.log(this.props.function_error)
        return (
            <div className='Tests'>
                {/* Finish Writing your function before you write your tests */}
                <FunctionError error={this.props.function_error} />
                {
                    this.props.tests ?
                        this.props.tests.map((test, i) => {
                            console.log(test.result_error)
                            console.log(test.parameter_errors)
                            return (
                                <div key={i} className={test.hasOwnProperty('result') ? test.passed ? 'test-border passed' : 'test-border failed' : 'test-border'}>

                                    <Test
                                        id={i}
                                        args={this.props.args || []}
                                        change={this.props.change}
                                        parameters={test.parameters}
                                        parameter_types={test.parameter_types}
                                        parameter_errors={test.parameter_errors}
                                        types={test.paramTypes}
                                        expected_result={test.expected_result}
                                        expected_result_type={test.expected_result_type}
                                        result={test.result}
                                        expected_result_error={test.expected_result_error}
                                        passed={!test.hasOwnProperty('result') || test.passed}
                                        removeTest={() => this.props.removeTest(i)}
                                    />
                                </div>
                            )
                        })
                        :
                        null
                }
                {
                    this.props.parent === 'create' ?
                        <div className='test-border'>
                            <div onClick={this.props.addTest} className='Test closed'>+ ADD&nbsp;{this.props.hidden ? ' HIDDEN ' : ''}&nbsp;TEST</div>
                        </div>
                        :
                        null
                }
                
            </div>
        )
    }
}

/*

Each input needs to know which test it belongs to and if it is for parameters, parameter type, or result

*/
