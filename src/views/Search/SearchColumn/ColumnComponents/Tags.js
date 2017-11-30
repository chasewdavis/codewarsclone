import React, { Component } from 'react';
import './Tags.css';
import axios from 'axios';
import { transferSearchResults } from '../../../../ducks/reducer';
import { connect } from 'react-redux';
import { convertCase } from '../../../../utilities/functions/functions';
import { mergeTagsByIgnoringCase, mergeTagsByIgnoringLetterS } from '../../../../utilities/functions/functions';

class Tags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: []
        }
    }
    componentDidMount(){
        axios.get(`/api/fightTagsByDifficulty`).then(tags=>{
            console.log('original tags are...', tags.data.slice())
            let newTags = mergeTagsByIgnoringCase(tags.data.slice())
            console.log('tags after func', newTags)
            newTags = mergeTagsByIgnoringLetterS(newTags)
            this.setState({tags:newTags})
        })
    }

    searchByTagName(tag){
        return axios.get(`/api/SearchByTagName/${tag}`).then(fights=>{
            this.props.transferSearchResults(fights.data)
        })
    }

    render() {

        let tags = this.state.tags.map((tag,i )=> {

            return (
                <div key={i} className='tags_list'><span onClick={()=>this.searchByTagName(tag.tag_name)}>{convertCase(tag.tag_name)} ({tag.count})</span></div>
            )
        })

        return (
            <div className='tags'>
                <div>Tags:</div>
                {tags}
                {/* <div className='bottom-border'></div> */}
            </div>
        )
    }
}


export default connect(null,{transferSearchResults})(Tags);