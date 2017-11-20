import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Create.css';
import axios from 'axios';

import Instructions from '../../components/TabContainer/Instructions/Instructions';
import Editor from '../../components/TabContainer/Editor/Editor';
import html from '../../components/TabContainer/Instructions/html-rules';

import Tests from '../CatFight/Tests/Tests';
import f from '../../utilities/functions/functions';

export default class Create extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leftAceActive: 1,
            solution: 'function add(a, b, c) { return a + b + c }',
            placeholder: '',
            rightAceActive: 1,
            rightAceCode: '',
            rightSlateActive: 1,
            description: html.deserialize('<h1>Instructions</h1>'),
            name: '',
            rank: '',
            tags: [''],
            argsCount: 0,
            tests: [
                {
                    parameters: [''],
                    paramTypes: [''],
                    expected_result: '',
                    passed: false
                }
            ],
            testResults: [
                {
                    parameters: [''],
                    paramTypes: [''],
                    expected_result: '',
                    passed: false
                }
            ],
            click: null,
            // passed: false
        }
    }

    componentDidMount() {
        window.addEventListener('message', this.handleReceivedMessage)
        this.handleChange('solution', this.state.solution)
    }

    handleReceivedMessage = e => {
        console.log(e.data)
        if (e.data.source) {
            // console.log(e.data)
            return
        }
        let passed = e.data.reduce((t1, t2) => (t1 && t2.passed), true)
        console.log(passed)
        this.setState({
            testResults: e.data,
            click: null,
            passed
        })
    }

    runTests = () => {
        let newClick
        this.setState({
            click: 2
        })
    }

    save = () => {
        let description = html.serialize(this.state.description)
        let fight = Object.assign({}, this.state, { description })
        // console.log(fight)
        // axios.post(`/api/createfight`, fight).then(response => {
        //     console.log(response.data)
        // })
    }

    handleTestChange = (i, str, value, j) => {
        console.log(i, str, value)
        let tests = this.state.tests.slice()
        let testResults = this.state.testResults.slice()
        // let newTest = Object.assign({}, tests[i])
        // console.log(tests)
        switch (str) {
            case 'params':
                tests[i].parameters[j] = value
                testResults[i].parameters[j] = value
                break
            case 'types':
                tests[i].paramTypes[j] = value
                testResults[i].paramTypes[j] = value
                break
            case 'result':
                tests[i].expected_result = value
                testResults[i].expected_result = value
                break
            case 'result_type':
                tests[i].expected_result_type = value
                testResults[i].expected_result_type = value                
            default:
                break
        }
        this.setState({
            tests,
            testResults
        })
    }

    addTest = () => {
        let tests = this.state.tests.slice()
        let testResults = this.state.testResults.slice()
        let parameters = Array(this.state.argsCount).fill('')
        let paramTypes = Array(this.state.argsCount).fill('')
        tests.push({
            parameters,
            paramTypes,
            expected_result: '',
            passed: false
        })
        testResults.push({
            parameters,
            paramTypes,
            expected_result: '',
            passed: false
        })
        this.setState({
            tests,
            testResults
        })
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
            tags: tags.split(',').map(tag => tag.trim())
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
        switch (target) {
            case 'placeholder':
                this.setState({
                    [target]: value,
                    argsCount: f.args(value).length < this.state.argsCount ? this.state.argsCount : f.args(value).length
                })
                break
            case 'solution':
                this.setState({
                    [target]: value,
                    argsCount: f.args(value).length
                })
                break
        }
        let tests = this.state.tests.slice()
        tests = tests.map(test => {
            // console.log(test)
            for (let i = test.parameters.length; i < this.state.argsCount; i++) {
                test.parameters.push('')
            }
            for (let i = test.paramTypes.length; i < this.state.argsCount; i++) {
                // console.log(test.paramTypes)
                test.paramTypes.push('')
            }
            return test
        })
        this.setState({
            tests
        })
        // console.log(this.state.argsCount)
    }

    render() {
        console.log(this.state.testResults)
        console.log(this.state.testResults.length)
        return (
            <div>
                <Navbar />
                <div className='create_main-wrapper'>
                    <div className="create_main-header">
                        <div onClick={this.save} className="create_main-header-blue"><i class="fa fa-database" aria-hidden="true"></i>Save</div>
                        <div className="create_main-header-blue"><i class="fa fa-repeat" aria-hidden="true"></i>Reset</div>
                        <div className="create_main-header-blue"><i class="fa fa-paper-plane" aria-hidden="true"></i>Publish</div>
                        <div className="create_main-header-red"><i class="fa fa-trash" aria-hidden="true"></i>Delete</div>
                    </div>
                    <div className="create_left-inputs">
                        <div className="create_name-input-container">
                            <h3>Name:</h3>
                            <input className="create_name-input" type="text" placeholder="Give your kata a name" onChange={(e) => this.handleNameChange(e.target.value)} />
                        </div>
                        <div className="create_rank-container">
                            <h3><i class="fa fa-question-circle" aria-hidden="true"></i>Estimated Rank:</h3>
                            <select className="create_rank-selector" onChange={(e) => this.handleRankChange(e.target.value)}>
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
                            <h3>Tags (Comma separated):</h3>
                            <input className="create_name-input" type="text" onChange={(e) => this.handleTagChange(e.target.value)} />
                        </div>
                    </div>
                    <div className='create_right-slate'>
                        <div className="create_left-ace-header">
                            <div onClick={() => this.handleRightSlateClick(1)} className={this.state.rightSlateActive === 1 ? "create_test create_active" : "create_test "}>Description</div>
                            <div onClick={() => this.handleRightSlateClick(2)} className={this.state.rightSlateActive === 2 ? "create_preview create_active" : "create_preview"}><i class="fa fa-eye" aria-hidden="true"></i> Preview</div>
                            <div onClick={() => this.handleRightSlateClick(3)} className={this.state.rightSlateActive === 3 ? "create_help create_active" : "create_help"}><i class="fa fa-question-circle" aria-hidden="true"></i> Help</div>
                        </div>
                        <div className="create_editor-wrapper">
                            {
                                this.state.rightSlateActive === 1 ?
                                    <Instructions change={this.handleSlateChange} description={this.state.description} />
                                    :
                                    null
                                // <InstructionsHelp/>
                            }
                        </div>
                        <div className="create_right-ace-buttons" onClick={this.runTests} >
                            <button><i class="fa fa-check" aria-hidden="true"></i> VALIDATE SOLUTION</button>
                            <div className="">
                                {
                                    this.state.hasOwnProperty('passed') ?
                                        this.state.passed ?
                                            'Passed All Tests'
                                            :
                                            'Failed'
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                    <div className='create_left-ace'>
                        <div className="create_left-ace-header">
                            <div onClick={() => this.handleLeftAceClick(1)} className={this.state.leftAceActive === 1 ? "create_complete create_active" : "create_complete "}>Complete Solution</div>
                            <div onClick={() => this.handleLeftAceClick(2)} className={this.state.leftAceActive === 2 ? "create_initial create_active" : "create_initial "}>Initial Solution</div>
                            {/* <div onClick={() => this.handleLeftAceClick(3)} className={this.state.leftAceActive === 3 ? "create_preloaded create_active" : "create_preloaded"}>Preloaded</div> */}
                            <div onClick={() => this.handleLeftAceClick(4)} className={this.state.leftAceActive === 4 ? "create_help create_active" : "create_help "}><i class="fa fa-question-circle" aria-hidden="true"></i> Help</div>
                        </div>
                        <div className="create_editor-wrapper">
                            {
                                this.state.leftAceActive === 1 ?
                                    <Editor click={this.state.click} title="solution" code={this.state.solution} fight={Object.assign({}, this.state, { description: null })} onChange={e => this.handleChange('solution', e)} />
                                    :
                                    this.state.leftAceActive === 2 ?
                                        <Editor title="placeholder" code={this.state.placeholder} onChange={e => this.handleChange('placeholder', e)} />
                                        :
                                        null
                                // <SolutionHelp />
                            }
                        </div>
                    </div>
                    <div className='create_right-ace'>
                        <div className="create_left-ace-header">
                            <div onClick={() => this.handleRightAceClick(1)} className={this.state.rightAceActive === 1 ? "create_test create_active" : "create_test "}>Test Cases</div>
                            <div onClick={() => this.handleRightAceClick(2)} className={this.state.rightAceActive === 2 ? "create_example create_active" : "create_example"}>Example Test Cases</div>
                            <div onClick={() => this.handleRightAceClick(3)} className={this.state.rightAceActive === 3 ? "create_help create_active" : "create_help"}><i class="fa fa-question-circle" aria-hidden="true"></i> Help</div>
                        </div>
                        <div className="create_editor-wrapper">
                            {
                                // this.state.rightAceActive === 1 ?
                                <Tests tests={this.state.testResults[0].hasOwnProperty('result') ? this.state.testResults : this.state.tests} change={this.handleTestChange} addTest={this.addTest} />
                                // :
                                // this.state.rightAceActive === 2 ?
                                //     <Tests />
                                //     :
                                //     null
                                // <TestsHelp />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}