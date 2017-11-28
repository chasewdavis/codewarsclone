import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Diff, Hollow } from '../../../components/Buttons/Buttons';
import axios from 'axios';
import './SearchResults.css';

class SearchResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: []
        }
        this.train = this.train.bind(this);
    }

    ComponentDidMount(){
        // can grab fights that are within the user's ability
        
    }

    train(id){
        this.props.history.push(`/fightdetails/${id}`)
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
                <div key={challenge.cat_fight_id} className='searchResults_each'>
                    <div className='searchResults_header'>
                        <Diff isButton={false} rating={challenge.difficulty}/>
                        {challenge.name}
                    </div>
                    <div className='searchResults_stats'>
                        <i className='fa fa-user'  aria-hidden="true"/>
                        {challenge.username}
                    </div>
                    <div className='searchResults_tags'>
                        <i className='fa fa-tag' aria-hidden="true"/>
                        {this.styleTags(challenge.tags)}
                    </div>
                    {/* <button className='searchResults_train_btn'>train</button> */}
                    <div className='searchResults_btn'><Hollow clicked={() => this.train(challenge.cat_fight_id)} name='TRAIN'/></div>
                    <div className='bottom-border'></div>
                </div>
            )
        })

        return (
            <div className='searchResults'>
                <div className='searchResults_count'>{results.length} Challenges Found</div>
                <div className='bottom-border'></div>
                {results}
            </div>
        )
    }
}

function mapStateToProps({ searchResults }){
    return { searchResults }
}

export default withRouter(connect(mapStateToProps)(SearchResults));