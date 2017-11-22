import React, { Component } from 'react';
import './SearchInput.css';

class SearchInput extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    
    render() {
        return (
            <div className='searchInput'>
                <div className='parent'>
                    <input placeholder='Search'></input>
                    <button>
                        <i className='fa fa-search'></i>
                    </button>
                </div>
                <div className='bottom-border'></div>
            </div>
        )
    }
}

export default SearchInput;