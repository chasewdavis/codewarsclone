import React, {Component} from 'react';

class Output extends Component {
    constructor() {
        super()
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps !== this.props) {
            
        }
    }

    render() {
        return (
            <div className="catfight_output">
                <div className="catfight_output-header"></div>
            </div>
        )
    }
}

export default Output;