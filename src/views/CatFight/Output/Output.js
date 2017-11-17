import React, {Component} from 'react';

class Output extends Component {
    constructor(props) {
        super(props)

        this.state = {
            active: 1
        }
    }

    handleClick(num) {
        this.setState({
            active: num
        })
    }

    render() {
        
        let testsToDisplay = this.props.results.length ? this.props.results.map(result => {
            return <div className={result.passed ? "output_passed" : "output_failed"}>Expected answer was {result.expected_result} we recieved {result.result}</div>
        }) : null

        return (
            <div className="catfight_output">
            
                <div className="catfight_output-header">
                        <div className={this.state.active === 1 ? "catfight_output-active" : "catfight_output-plain"} onClick={() => this.handleClick(1)}>Instructions</div>
                        <div className={this.state.active === 2 ? "catfight_output-active" : 'catfight_output-plain'} onClick={() => this.handleClick(2)}>Output</div>
                </div>

                {testsToDisplay}
            </div>
        )
    }
}

export default Output;