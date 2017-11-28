import React, { Component } from 'react';
import './SearchInput.css';
import axios from 'axios';
import { transferSearchResults } from '../../../../ducks/reducer';
import { connect } from 'react-redux';

class SearchInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInput:''
        }
    }

    handleChange(val){
        this.setState({userInput:val})
    }

    searchByInput(){
        //may want to use redux here so that this component's uncle can display these results
        axios.get(`/api/searchByInput/${this.state.userInput}`).then(fights=>{
            this.props.transferSearchResults(fights.data)
        })
    }
    
    render() {
        return (
            <div className='searchInput'>
                <div className='parent'>
                    <input onChange={(e)=>this.handleChange(e.target.value)} placeholder='Search'></input>
                    <button onClick={()=>this.searchByInput()}>
                        <i className='fa fa-search'></i>
                    </button>
                </div>
                <div className='bottom-border'></div>
            </div>
        )
    }
}

export default connect(null,{transferSearchResults})(SearchInput);