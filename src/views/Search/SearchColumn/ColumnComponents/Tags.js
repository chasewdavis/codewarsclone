import React, { Component } from 'react';
import './Tags.css';
import axios from 'axios';
import { transferSearchResults } from '../../../../ducks/reducer';
import { connect } from 'react-redux';

class Tags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: []
        }
    }
    componentDidMount(){
        // go grab all the tags use the group by sql file
        axios.get(`/api/fightTagsByDifficulty`).then(tags=>{
            this.setState({tags:tags.data})
        })
    }

    searchByTagName(tag){
        console.log(tag)
        axios.get(`/api/SearchByTagName/${tag}`).then(fights=>{
            this.props.transferSearchResults(fights.data)
        })
    }

    convert_case(str) {
        var lower = str.toLowerCase();
        return lower.replace(/(^| )(\w)/g, function(x) {
          return x.toUpperCase();
        });
    }

    render() {

        let tags = this.state.tags.map((tag,i )=> {

            return (
                <div key={i} className='tags_list'><span onClick={()=>this.searchByTagName(tag.tag_name)}>{this.convert_case(tag.tag_name)} ({tag.count})</span></div>
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