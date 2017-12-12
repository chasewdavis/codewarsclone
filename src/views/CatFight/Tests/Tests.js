import React, { Component } from 'react';
import Test from './Test/Test';
import FunctionError from './FunctionError/FunctionError';
import './Tests.css';

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
                        this.props.tests.length ?
                            this.props.tests.map((test, i) => {
                                return <FunctionError error={test.result_error} />
                            }).filter(a => a)[0]
                            :
                            null
                        :
                        null
                }
                {
                    this.props.tests ?
                        this.props.tests.map((test, i) => {
                            test.result_error ? console.log(test.result_error) : null
                            test.parameter_errors ? test.parameter_errors.join('') ? console.log(test.parameter_errors) : null : null
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
                            <div onClick={this.props.addTest} className='Test closed'>+ ADD&nbsp;&nbsp;{this.props.hidden ? ' HIDDEN ' : ''}&nbsp;TEST</div>
                        </div>
                        :
                        null
                }

            </div>
        )
    }
}
