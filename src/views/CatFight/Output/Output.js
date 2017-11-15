import React, {Component} from 'react';

class Output extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        console.log(window)
    }


    render() {
        return (
            <div>
                output
            </div>
        )
    }
}

export default Output;