import React, { Component } from 'react';
import SearchColumn from './SearchColumn/SearchColumn';
import SearchResults from './SearchResults/SearchResults';
import Navbar from '../../components/Navbar/Navbar';
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    
    render() {
        return (
            <div className='search'>
                <Navbar/>
                <div className='container'>
                    <div className='column'><SearchColumn/></div>
                    <div className='results'><SearchResults/></div>
                </div>
            </div>
        )
    }
}


export default Search;