import React, { Component } from 'react';
import './Tests.css';

let dataTypes = [
    'boolean',
    'null',
    'undefined',
    'number',
    'string',
    'symbol',
    'object',
    'array'
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
                    <div className='test-delete'>X</div>
                </div>
                {
                    this.state.open ?
                        <div className='open-test'>
                            <div className='parameter-box'>
                                {
                                    props.parameters.length ?
                                        props.parameters.map((param, i) => {
                                            return (
                                                <div key={i} className='input-line' >
                                                    <div>Parameter {i + 1}:</div>
                                                    <input
                                                        onChange={e => props.change(props.id, 'params', e.target.value, i)}
                                                        value={param}
                                                        placeholder={props.args.length ? props.args[i]: null}
                                                    />
                                                    <select
                                                        onChange={e => props.change(props.id, 'types', e.target.value, i)}

                                                        defaultValue={props.parameter_types[i] || "Data Type"}
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

export default class Tests extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        // console.log(this.props)
        // console.log(this.props.tests)
        return (
            <div className='Tests'>
                {/* Finish Writing your function before you write your tests */}
                {
                    this.props.tests ?
                        this.props.tests.map((test, i) => {
                            return (
                                <div key={i} className={test.hasOwnProperty('result') ? test.passed ? 'test-border passed' : 'test-border failed' : 'test-border'}>

                                    <Test
                                        id={i}
                                        args={this.props.args}
                                        change={this.props.change}
                                        parameters={test.parameters}
                                        parameter_types={test.parameter_types}
                                        types={test.paramTypes}
                                        expected_result={test.expected_result}
                                        expected_result_type={test.expected_result_type}
                                        result={test.result}
                                        passed={!test.hasOwnProperty('result') || test.passed}
                                    />
                                </div>
                            )
                        })
                        :
                        null
                }
                <div className='test-border'>
                    <div onClick={this.props.addTest} className='Test closed'>+ ADD TEST</div>
                </div>
            </div>
        )
    }
}

/*

Each input needs to know which test it belongs to and if it is for parameters, parameter type, or result

*/
