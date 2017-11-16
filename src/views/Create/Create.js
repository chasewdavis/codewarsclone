import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Create.css'

export default class Create extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leftAceActive: 1,
            rightAceActive: 1,
            name: '',
            rank: '',
            tags: ''
        }
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
        this.setState({
            tags: tags
        }, () => console.log(this.state))
    }

    //this allows you to change tabs on the left ace editor
    handleLeftAceClick(tab) {
        this.setState({
            leftAceActive: tab
        })
    }

    handleRightAceClick(tab) {
        this.setState({
            leftAceActive: tab
        })
    }


    render() {
        return (
            <div>
                <Navbar/>
                <div className='create_main-wrapper'>
                    <div className="create_main-header">
                        <div className="create_main-header-blue"><i class="fa fa-database" aria-hidden="true"></i>Save</div>
                        <div className="create_main-header-blue"><i class="fa fa-repeat" aria-hidden="true"></i>Reset</div>
                        <div className="create_main-header-blue"><i class="fa fa-paper-plane" aria-hidden="true"></i>Publish</div>
                        <div className="create_main-header-red"><i class="fa fa-trash" aria-hidden="true"></i>Delete</div>
                    </div>
                    <div className="create_left-inputs">
                        <div className="create_name-input-container">
                            <h3>Name:</h3>
                            <input className="create_name-input"type="text" placeholder="Give your kata a name" onChange={(e) => this.handleNameChange(e.target.value)}/>
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
                            <input className="create_name-input" type="text" onChange={(e) => this.handleTagChange(e.target.value)}/>
                        </div>
                    </div>
                    <div className='create_left-ace'>
                        <div className="create_left-ace-header">
                            <div onClick={() => this.handleLeftAceClick(1)}className={ this.state.leftAceActive === 1 ? "create_complete create_active" : "create_complete "}>Complete Solution</div>
                            <div onClick={() => this.handleLeftAceClick(2)}className={this.state.leftAceActive === 2 ? "create_initial create_active" : "create_initial "}>Initial Solution</div>
                            <div onClick={() => this.handleLeftAceClick(3)}className={this.state.leftAceActive === 3 ? "create_preloaded create_active" : "create_preloaded"}>Preloaded</div>
                            <div onClick={() => this.handleLeftAceClick(4)}className={this.state.leftAceActive === 4 ? "create_help create_active" : "create_help "}><i class="fa fa-question-circle" aria-hidden="true"></i> Help</div>
                        </div>
                    </div>
                    <div className='create_right-ace'>
                        <div className="create_left-ace-header">
                            <div onClick={() => this.handleRightAceClick(1)}className={ this.state.leftAceActive === 1 ? "create_complete create_active" : "create_complete "}>Test Cases</div>
                            <div onClick={() => this.handleRightAceClick(2)}className={this.state.leftAceActive === 2 ? "create_initial create_active" : "create_initial "}>Example Test Cases</div>
                            <div onClick={() => this.handleRightAceClick(3)}className={this.state.leftAceActive === 3 ? "create_help create_active" : "create_help"}><i class="fa fa-question-circle" aria-hidden="true"></i> Help</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}