import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchResults extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    
    render() {

        console.log('from search results...', this.props.searchResults)

        return (
            <div className='searchResults'>
                
            </div>
        )
    }
}

function mapStateToProps({ searchResults }){
    return { searchResults }
}

export default connect(mapStateToProps)(SearchResults);