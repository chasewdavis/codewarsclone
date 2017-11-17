import React, { Component } from 'react';
import './Tests.css';

function Test(props) {
    // console.log(props.parameters)
    // console.log(props.types)
    return (
        <div className='Test'>
            TEST # {props.id + 1}
            <div className='parameter-box'>
                Parameters: (separate parameters by comma)
            {
                    props.parameters.length ?
                        props.parameters.map((param, i) => {
                            return (
                                <div className='input-line' >
                                    <div>Parameter {i + 1}:</div>
                                    <input key={i} onChange={e => props.change(props.id, 'params', e.target.value, i)} value={param} />
                                </div>
                            )
                        })
                        :
                        <div className='test-input-placeholder' />
                }
            </div>
            <div className='types-box'>
                Parameter Types: (separate parameters by comma)
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
            </div>
            <div className='expected-result-box'>
                <div className='input-line'>
                    Expected Result: <input onChange={e => props.change(props.id, 'result', e.target.value)} value={props.result} />
                </div>
            </div>
        </div>
    )
}

export default class Tests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            createTests: [
                'test1', 'test2'
            ]
        }
    }
    render() {
        return (
            <div className='Tests'>
                {/* Finish Writing your function before you write your tests */}
                {
                    this.props.tests ?
                        this.props.tests.map((test, i) => {
                            return <Test id={i} key={i} change={this.props.change} parameters={test.parameters} types={test.paramTypes} result={test.expected_result} />
                        })
                        :
                        this.state.createTests.map((test, i) => {
                            return <Test key={i} change={this.props.change} />
                        })
                }
                <div onClick={this.props.addTest} className='add-test'>+ ADD TEST</div>
            </div>
        )
    }
}

/*

Each input needs to know which test it belongs to and if it is for parameters, parameter type, or result

*/
