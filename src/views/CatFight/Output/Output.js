import React, {Component} from 'react';

class Output extends Component {
    constructor() {
        super()

        this.state = {
            active: true
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps !== this.props) {
            
        }
    }

    handleClick() {
        this.setState({
            active: !this.state.active
        })
    }

    render() {
        return (
            <div className="catfight_output">
                <div className="catfight_output-header">
                        <div className={this.state.active ? "catfight_output-active" : "catfight_output-plain"} onClick={() => this.handleClick()}>Instructions</div>
                        <div className={this.state.active ? "catfight_output-plain" : 'catfight_output-active'} onClick={() => this.handleClick()}>Output</div>
                </div>
            </div>
        )
    }
}

export default Output;