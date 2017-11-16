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
                output
            </div>
        )
    }
}

export default Output;