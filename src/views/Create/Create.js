import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import SolutionHelp from '../../components/Help/SolutionHelp';
import SolutionDesc from '../../components/Help/SolutionDesc';
import SolutionTest from '../../components/Help/SolutionTest';
import './Create.css';
import axios from 'axios';
import { connect } from 'react-redux';

import Instructions from '../../components/TabContainer/Instructions/Instructions';
import Editor from '../../components/TabContainer/Editor/Editor';
import html from '../../components/TabContainer/Instructions/html-rules';

import Tests from '../CatFight/Tests/Tests';
import f from '../../utilities/functions/functions';

let initialState = {
    redirect: false,
    redirectUrl: '',
    unfinished: [],
    leftAceActive: 1,
    solution: '// type your solution here', // 'function (a) {return Number(a)}',
    placeholder: '// type your initial code here',
    rightAceActive: 1,
    rightAceCode: '',
    rightSlateActive: 1,
    description: html.deserialize('<h1>Type your instructions here</h1>'),
    name: '',
    rank: '',
    tags: [''],
    argsCount: 0,
    args: [],
    function_error: '',
    tests: [
        // {
        //     parameters: [''],
        //     parameter_types: [''],
        //     expected_result: '',
        //     passed: false,
        //     hidden: false
        // }
    ],
    hiddenTests: [],
    // testResults: [
    // {
    //     parameters: [''],
    //     parameter_types: [''],
    //     expected_result: '',
    //     passed: false
    // }
    // ],
    click: null,
    // passed: false,
    publishing: false,
    publishFailed: false
}

class Create extends Component {
    constructor(props) {
        super(props)
        this.state = Object.assign({}, initialState)
        this.ctrl = false
        this.metaKey = false
    }

    publish = () => {
        this.setState({
            unfinished: []
        })
        let { name, solution, placeholder, tests, hiddenTests, tags, description, rank } = this.state
        let unfinished = []
        if (!name) {
            unfinished.push('name')
        }
        if (solution === initialState.solution) {
            unfinished.push('solution')
        }
        if (placeholder === initialState.placeholder) {
            unfinished.push('placeholder')
        }
        if (tests.length < 3) {
            unfinished.push('tests')
        }
        if (hiddenTests.length < 3) {
            unfinished.push('hiddenTests')
        }
        if (!tags[0]) {
            unfinished.push('tags')
        }
        if (description.startText.text === 'Type your instructions here') {
            unfinished.push('description')
        }
        if (!rank) {
            unfinished.push('rank')
        }

        if (unfinished.length) {
            this.setState({
                unfinished
            })
            return
        }

        this.setState({
            publishing: true,
            passed: false
        }, () => this.runTests())
    }

    reset = () => {
        this.state = Object.assign({}, initialState)
        delete this.state.passed
        this.setState(initialState)
    }

    cancel = () => {
        this.state = Object.assign({}, initialState)
        delete this.state.passed
        this.setState(initialState)
    }

    componentDidMount() {
        window.addEventListener('message', this.handleReceivedMessage)
        this.handleChange('solution', this.state.solution)
    }

    handleReceivedMessage = e => {
        console.log(e.data)
        if (e.data.source) {
            return
        }
        if (!e.data.tests || !e.data.hiddenTests) {
            return
        }
        let { function_error, tests, hiddenTests } = e.data
        // console.log(tests)
        // console.log(hiddenTests)
        let passed = [...tests, ...hiddenTests]
            .reduce((t1, t2) => {
                return (t1 && t2.passed)
            }, true)
        // console.log(passed)
        if (function_error) {
            passed = false
        }
        this.setState({
            // testResults: e.data,
            function_error,
            tests,
            hiddenTests,
            click: null,
            passed
        })
        if (this.state.publishing && passed) {
            let description = html.serialize(this.state.description)
            let fight = Object.assign({}, this.state, { description })
            // console.log(fight)
            axios.post(`/api/createfight`, fight).then(response => {
                // console.log(response.data)
                this.setState({
                    redirect: true,
                    redirectUrl: `/fightdetails/${response.data.cat_fight_id}`
                })
            })
        }
        else if (this.state.publishing && !passed) {
            this.setState({
                publishing: false,
                publishFailed: true
            })
        }
    }

    runTests = () => {
        let { tests, hiddenTests } = Object.assign({}, this.state)
        let reset = test => {
            delete test.typed_parameters
            delete test.parameter_errors
            delete test.typed_expected_result
            delete test.expected_result_error
            delete test.result
            delete test.result_error
            delete test.result_type
            return test
        }
        tests = tests.map(reset)
        hiddenTests = hiddenTests.map(reset)
        let newClick
        this.setState({
            click: 2,
            publishFailed: false
        })
    }

    handleTestChange = (i, str, value, j) => {
        // console.log(i, str, value)
        let tests = this.state.tests.slice()
        if (this.state.rightAceActive === 2) {
            tests = this.state.hiddenTests.slice()
        }
        // // let testResults = this.state.testResults.slice()
        // let newTest = Object.assign({}, tests[i])
        // console.log(tests)
        switch (str) {
            case 'params':
                tests[i].parameters[j] = value
                // testResults[i].parameters[j] = value
                break
            case 'types':
                tests[i].parameter_types[j] = value
                // testResults[i].parameter_types[j] = value
                break
            case 'result':
                tests[i].expected_result = value
                // testResults[i].expected_result = value
                break
            case 'result_type':
                tests[i].expected_result_type = value
            // testResults[i].expected_result_type = value
            default:
                break
        }
        if (this.state.rightAceActive === 1) {
            this.setState({
                tests,
                // testResults
            })
        }
        else {
            this.setState({
                hiddenTests: tests,
                // testResults
            })
        }
    }

    addTest = () => {
        let tests = this.state.tests.slice()
        if (this.state.rightAceActive === 2) {
            tests = this.state.hiddenTests.slice()
        }
        // // let testResults = this.state.testResults.slice()
        let parameters = Array(this.state.argsCount).fill('')
        let parameter_types = Array(this.state.argsCount).fill('')
        tests.push({
            parameters,
            parameter_types,
            expected_result: '',
            passed: false
        })
        // testResults.push({
        //     parameters,
        //     parameter_types,
        //     expected_result: '',
        //     passed: false
        // })
        if (this.state.rightAceActive === 1) {
            this.setState({
                tests,
                // testResults
            })
        }
        else {
            this.setState({
                hiddenTests: tests,
                // testResults
            })
        }
    }

    removeTest = index => {
        let tests = this.state.tests.slice()
        if (this.state.rightAceActive === 2) {
            tests = this.state.hiddenTests.slice()
        }
        tests = tests.filter((test, i) => i !== index)
        if (this.state.rightAceActive === 1) {
            this.setState({
                tests
            })
        }
        else {
            this.setState({
                hiddenTests: tests
            })
        }
    }

    handleSlateChange = ({ value }) => {
        this.setState({
            description: value
        })
    }

    handleNameChange(name) {
        this.setState({
            name: name
        })
    }

    handleRankChange(rank) {
        this.setState({
            rank: rank
        })
    }

    handleTagChange(tags) {
        // console.log()
        this.setState({
            tags: tags.split(',').map(tag => tag.trim().toUpperCase())
        })
    }

    //this allows you to change tabs on the left ace editor
    handleLeftAceClick(tab) {
        this.setState({
            leftAceActive: tab
        })
    }

    handleRightAceClick(tab) {
        this.setState({
            rightAceActive: tab
        })
    }

    handleRightSlateClick(tab) {
        this.setState({
            rightSlateActive: tab
        })
    }

    handleChange(target, value) {
        let tests = this.state.tests.slice()
        let hiddenTests = this.state.hiddenTests.slice()
        switch (target) {
            case 'placeholder':
                this.setState({
                    argsCount: f.args(value).length < this.state.argsCount ? this.state.argsCount : f.args(value).length,
                })
                break
            case 'solution':
                this.setState({
                    args: f.args(value),
                    argsCount: f.args(value).length,
                })
                tests = tests.map(test => {
                    for (let i = test.parameters.length; i < this.state.argsCount; i++) {
                        test.parameters.push('')
                    }
                    for (let i = test.parameter_types.length; i < this.state.argsCount; i++) {
                        test.parameter_types.push('')
                    }
                    return test
                })
                hiddenTests = hiddenTests.map(test => {
                    for (let i = test.parameters.length; i < this.state.argsCount; i++) {
                        test.parameters.push('')
                    }
                    for (let i = test.parameter_types.length; i < this.state.argsCount; i++) {
                        test.parameter_types.push('')
                    }
                    return test
                })
                break
        }
        this.setState({
            [target]: value,
            tests,
            hiddenTests
        }, () => console.log(this.state))
    }

    resetTests = () => {
        let argsCount = f.args(this.state.solution).length
        // console.log(argsCount)
        let tests = this.state.tests.slice()
        // console.log(tests)
        tests = tests.map((test, i) => {
            while (test.parameters.length > argsCount) {
                test.parameters.pop()
            }
            while (test.parameter_types > argsCount) {
                test.parameter_types.pop()
            }
            return test
        })
        let hiddenTests = this.state.hiddenTests.slice()
        // console.log(hiddenTests)
        hiddenTests = hiddenTests.map((test, i) => {
            while (test.parameters.length > argsCount) {
                test.parameters.pop()
            }
            while (test.parameter_types.length > argsCount) {
                test.parameter_types.pop()
            }
            return test
        })
        // console.log(argsCount)
        // console.log(tests)
        // console.log(hiddenTests)
        this.setState({
            argsCount,
            tests,
            hiddenTests
        })
    }

    onKeyDown = (event, change) => {
        if (event.key === 'Control') {
            this.ctrl = true
        }
        if (event.metaKey) {
            this.metaKey = true
        }
        // console.log(this.ctrl, this.metaKey)
        if ((this.ctrl || this.metaKey) && event.key === 'Enter') {
            event.preventDefault()
            this.runTests()
        }
    }

    onKeyUp = (event, change) => {
        if (event.key === 'Control') {
            this.ctrl = false
        }
        if (event.metaKey) {
            this.metaKey = false
        }
    }

    render() {
        // console.log(this.state)
        // console.log(this.state.testResults)
        let { unfinished } = this.state
        return (
            <div onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp}>
                {
                    this.state.redirect ?
                        <Redirect to={this.state.redirectUrl} />
                        :
                        null
                }
                <Navbar username={this.props.user.username} image_url={this.props.user.image_url} honor={this.props.user.honor}/>
                <div className='create_main-wrapper'>
                    <div className="create_main-header">
                        {/* <div onClick={this.save} className="create_main-header-blue"><i class="fa fa-database" aria-hidden="true"></i>Save</div> */}
                        <div onClick={this.publish} className="create_main-header-blue"><i class="fa fa-paper-plane" aria-hidden="true"></i>Publish</div>
                        <div onClick={this.reset} className="create_main-header-blue"><i class="fa fa-repeat" aria-hidden="true"></i>Reset</div>
                        <Link to="/" className="create_main-header-red"><div className="link"><i class="fa fa-trash" aria-hidden="true"></i>Cancel</div></Link>
                    </div>
                    <div className="create_left-inputs">
                        <div className="create_name-input-container">
                            <h3 className={unfinished.includes('name') ? 'unfinished' : null} >Name:</h3>
                            <input className="create_name-input" type="text" placeholder="Give your kata a name" onChange={(e) => this.handleNameChange(e.target.value)} />
                        </div>
                        <div className="create_rank-container">
                            <h3 className={unfinished.includes('rank') ? 'unfinished' : null} ><i class="fa fa-question-circle" aria-hidden="true"></i>Estimated Rank:</h3>
                            <select className="create_rank-selector" onChange={(e) => this.handleRankChange(e.target.value)} defaultValue="Select Rank">
                                <option value="Select Rank" disabled>Select Rank</option>
                                <option value="8">8 kyu (white)</option>
                                <option value="7">7 kyu (white)</option>
                                <option value="6">6 kyu (yellow)</option>
                                <option value="5">5 kyu (yellow)</option>
                                <option value="4">4 kyu (blue)</option>
                                <option value="3">3 kyu (blue)</option>
                                <option value="2">2 kyu (purple)</option>
                                <option value="1">1 kyu (purple)</option>
                            </select>
                        </div>
                        <div className="create_tags-input-container">
                            <h3 className={unfinished.includes('tags') ? 'unfinished' : null} >Tags (Comma separated):</h3>
                            <input className="create_name-input" type="text" onChange={(e) => this.handleTagChange(e.target.value)} />
                        </div>
                    </div>
                    <div className='create_right-slate'>
                        <div className="create_left-ace-header">
                            <div className={unfinished.includes('description') ? 'unfinished' : null}>
                                <div onClick={() => this.handleRightSlateClick(1)} className={this.state.rightSlateActive === 1 ? "create_test create_active" : "create_test "}>Description</div>
                            </div>
                            {/* <div onClick={() => this.handleRightSlateClick(2)} className={this.state.rightSlateActive === 2 ? "create_preview create_active" : "create_preview"}><i class="fa fa-eye" aria-hidden="true"></i> Preview</div> */}
                            <div onClick={() => this.handleRightSlateClick(3)} className={this.state.rightSlateActive === 3 ? "create_help create_active" : "create_help"}><i class="fa fa-question-circle" aria-hidden="true"></i> Help</div>
                        </div>
                        <div className="create_editor-wrapper">
                            {
                                this.state.rightSlateActive === 1 ?
                                    <Instructions change={this.handleSlateChange} description={this.state.description} />
                                    :
                                    this.state.rightSlateActive === 2 ? null
                                        :
                                        <SolutionDesc />
                                // <InstructionsHelp/>
                            }
                        </div>
                        <div className="create_right-ace-buttons" >
                            <button onClick={this.runTests}><i class="fa fa-check" aria-hidden="true"></i> VALIDATE SOLUTION</button>
                            <div className={this.state.publishFailed ? 'failed-box' : this.state.hasOwnProperty('passed') ? this.state.passed ? 'passed' : 'failed' : 'unstarted'}>
                                {/*console.log(this.state.hasOwnProperty('passed'))*/}
                                {
                                    this.state.hasOwnProperty('passed') ?
                                        this.state.passed ?
                                            'Passed All Tests'
                                            :
                                            'Failed'
                                        :
                                        'Output'
                                }
                            </div>
                        </div>
                    </div>
                    <div className='create_left-ace'>
                        <div className="create_left-ace-header">
                            <div className={unfinished.includes('solution') ? 'unfinished' : null}>
                                <div onClick={() => this.handleLeftAceClick(1)} className={this.state.leftAceActive === 1 ? "create_complete create_active" : "create_complete "}>Complete Solution</div>
                            </div>
                            <div className={unfinished.includes('placeholder') ? 'unfinished' : null}>
                                <div onClick={() => this.handleLeftAceClick(2)} className={this.state.leftAceActive === 2 ? "create_initial create_active" : "create_initial "}>Initial Solution</div>
                            </div>
                            {/* <div onClick={() => this.handleLeftAceClick(3)} className={this.state.leftAceActive === 3 ? "create_preloaded create_active" : "create_preloaded"}>Preloaded</div> */}
                            <div onClick={() => this.handleLeftAceClick(4)} className={this.state.leftAceActive === 4 ? "create_help create_active" : "create_help "}><i class="fa fa-question-circle" aria-hidden="true"></i> Help</div>
                        </div>
                        <div className="create_editor-wrapper">
                            {
                                this.state.leftAceActive === 1 ?
                                    <Editor
                                        click={this.state.click}
                                        title="solution"
                                        code={this.state.solution}
                                        fight={Object.assign({}, this.state, { description: null })}
                                        onChange={e => this.handleChange('solution', e)}
                                        fontSize='1.25rem'
                                        create={true}
                                        height='458px'
                                    />
                                    :
                                    this.state.leftAceActive === 2 ?
                                        <Editor
                                            click={this.state.click}
                                            title="placeholder"
                                            code={this.state.placeholder}
                                            fight={Object.assign({}, this.state, { description: null })}
                                            onChange={e => this.handleChange('placeholder', e)}
                                            fontSize='1.25rem'
                                            solution={this.state.solution}
                                            height='458px'
                                        />
                                        :
                                        <SolutionHelp />
                                // <SolutionHelp />
                            }
                        </div>
                    </div>
                    <div className={'create_right-ace'}>
                        <div className="create_left-ace-header">
                            <div className={unfinished.includes('tests') ? 'unfinished' : null}>
                                <div onClick={() => this.handleRightAceClick(1)} className={this.state.rightAceActive === 1 ? "create_test create_active" : "create_test "}>Test Cases</div>
                            </div>
                            <div className={unfinished.includes('hiddenTests') ? 'unfinished' : null}>
                                <div onClick={() => this.handleRightAceClick(2)} className={this.state.rightAceActive === 2 ? "create_example create_active" : "create_example"}>Hidden Tests</div>
                            </div>
                            <div onClick={() => this.handleRightAceClick(3)} className={this.state.rightAceActive === 3 ? "create_help create_active" : "create_help"}><i class="fa fa-question-circle" aria-hidden="true"></i> Help</div>
                            <div onClick={this.resetTests} className="create_test"><i class="fa fa-repeat" aria-hidden="true"></i>&nbsp; Reset</div>
                        </div>
                        <div className="create_editor-wrapper">
                            {
                                this.state.rightAceActive === 1 ?
                                    <Tests
                                        function_error={this.state.function_error}
                                        tests={this.state.tests}
                                        args={this.state.args}
                                        change={this.handleTestChange}
                                        addTest={this.addTest}
                                        removeTest={this.removeTest}
                                        parent='create'
                                    />
                                    :
                                    this.state.rightAceActive === 2 ?
                                        <Tests
                                            hidden={true}
                                            function_error={this.state.function_error}
                                            tests={this.state.hiddenTests}
                                            args={this.state.args}
                                            change={this.handleTestChange}
                                            addTest={this.addTest}
                                            removeTest={this.removeTest}
                                            parent='create'
                                        />
                                        :
                                        <SolutionTest />
                                // <TestsHelp />
                            }
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const outActions = {

}

export default connect(mapStateToProps, outActions)(Create)
