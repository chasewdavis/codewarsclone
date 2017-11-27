import React, { Component } from 'react';
import './Tags.css';
import axios from 'axios';

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

    convert_case(str) {
        var lower = str.toLowerCase();
        return lower.replace(/(^| )(\w)/g, function(x) {
          return x.toUpperCase();
        });
    }

    render() {
        console.log(this.state.tags)

        let tags = this.state.tags.map((tag,i )=> {

            return (
                <div key={i} className='tags_list'><span>{this.convert_case(tag.tag_name)} ({tag.count})</span></div>
            )
        })

        return (
            <div className='tags'>
                <div>Tags:</div>
                {tags}
                <div className='bottom-border'></div>
            </div>
        )
    }
}


export default Tags;