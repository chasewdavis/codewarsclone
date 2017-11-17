import React, {Component} from 'react';

class Output extends Component {
    constructor() {
        super()

        this.state = {
            active: 1
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(JSON.stringify(nextProps.results[0]))
        console.log(this.props.results)
    }

    handleClick(num) {
        this.setState({
            active: num
        }, () => console.log(this.state))
    }

    render() {
        return (
            <div className="catfight_output">
                <div className="catfight_output-header">
                        <div className={this.state.active === 1 ? "catfight_output-active" : "catfight_output-plain"} onClick={() => this.handleClick(1)}>
                        Instructions{this.props.results ? JSON.stringify(this.props.results[0]) : null}
                        </div>
                        <div className={this.state.active === 2 ? "catfight_output-active" : 'catfight_output-plain'} onClick={() => this.handleClick(2)}>Output</div>
                </div>
            </div>
        )
    }
}

export default Output;