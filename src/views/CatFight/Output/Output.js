import React, {Component} from 'react';

class Output extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    handleClick(num) {
        this.setState({
            active: num
        })
    }

    render() {
        let testsPassed = 0;
        let testsFailed = 0;
        let sampleTestsToDisplay = this.props.results.length ? this.props.results.map(result => {
            if(result.passed) {
                testsPassed++
            } else {
                testsFailed++
            }
            return <div key={result.test_id} className={result.passed ? "output_passed output_general" : "output_failed output_general"}>Expected answer was {result.expected_result} we recieved {result.result}</div>
        }) : null
        
        return (
            <div className="catfight_output">
            
                <div className="catfight_output-header">
                        <div className={this.props.tab == 1 ? "catfight_output-active" : "catfight_output-plain"} onClick={() => this.props.handleTabChange(1)}>Instructions</div>
                        <div className={this.props.tab == 2 ? "catfight_output-active" : 'catfight_output-plain'} onClick={() => this.props.handleTabChange(2)}>Output</div>
                </div>
               {
                 this.props.tab == 1 ? <div>Instructions</div>
                 :
                 this.props.tab == 2 && sampleTestsToDisplay ? 
                 <div>
                 <div className="output_summary-container">
                     <div className="output_summary">
                        <span>Passed: {testsPassed}</span>
                        <span>Failed: {testsFailed}</span>
                     </div>
                 </div>
                 {sampleTestsToDisplay}
                 </div>
                 : 
                 <div>Output</div>
               } 
               
            </div>
        )
    }
}

export default Output;