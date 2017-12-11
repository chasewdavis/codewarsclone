import React, { Component } from 'react';
import SearchInput from './ColumnComponents/SearchInput';
import Difficulty from './ColumnComponents/Difficulty';
import Tags from './ColumnComponents/Tags';

// import './SearchColumn.css';

class SearchColumn extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    
    render() {
        return (
            <div className='searchColumn'>
                <SearchInput/>
                <Difficulty/>
                <Tags/>
            </div>
        )
    }
}


export default SearchColumn;