import React, { Component } from 'react';
// import './Solutions.css';

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        console.log(this.props)
        let solutions = this.props.solutions.map((e,i)=>{
            return (
                <div key={i}>
                    {e.user_solution}
                </div>
            )
        })
        return (
            <div className='solutions'>
                {solutions}
            </div>
        )
    }
}