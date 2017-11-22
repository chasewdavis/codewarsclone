import React, { Component } from 'react';
import './Tags.css';

class Tags extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount(){
        // go grab all the tags use the group by sql file
    }

    render() {
        return (
            <div className='tags'>
                <div>Tags:</div>
                <div className='bottom-border'></div>
            </div>
        )
    }
}


export default Tags;