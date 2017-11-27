import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Diff } from '../../../components/Buttons/Buttons';
import './SearchResults.css';

class SearchResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: []
        }
    }

    styleTags(arr){
        console.log(arr)
        return arr.map((tag,i) => {
            console.log(tag);
            return (
                <div key={i}>
                    {tag.toUpperCase()}
                </div>
            )
        })
    }
    
    render() {

        console.log('from search results...', this.props.searchResults)

        let results = this.props.searchResults.map(challenge => {
            return (
                <div>
                    <div>
                        <Diff isButton={false} rating={challenge.difficulty}/>
                        {challenge.name}
                    </div>
                    <div>
                        {challenge.username}
                    </div>
                    <div className='searchResults_tags'>
                        {this.styleTags(challenge.tags)}
                    </div>
                    <div className='bottom-border'></div>
                </div>
            )
        })

        return (
            <div className='searchResults'>
                {results}
            </div>
        )
    }
}

function mapStateToProps({ searchResults }){
    return { searchResults }
}

export default connect(mapStateToProps)(SearchResults);