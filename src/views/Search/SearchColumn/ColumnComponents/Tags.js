import React, { Component } from 'react';
import './Tags.css';
import axios from 'axios';
import { transferSearchResults } from '../../../../ducks/reducer';
import { connect } from 'react-redux';
import { convertCase } from '../../../../utilities/functions/functions';

class Tags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: []
        }
    }
    componentDidMount(){
        axios.get(`/api/fightTagsByDifficulty`).then(tags=>{
            this.setState({tags:this.mergeTagsByIgnoringCase(tags.data)})
        })
    }

    searchByTagName(tag){
        return axios.get(`/api/SearchByTagName/${tag}`).then(fights=>{
            this.props.transferSearchResults(fights.data)
        })
    }

    // mergeTagsByIgnoringLetterS(array){
    //     console.log('ignoring s', array)
    // }

    mergeTagsByIgnoringCase(array){
        let newObjects = [];
        for(let i = array.length - 1; i > 0; i--){
            for(let j = 0; j < i; j++){
                if(array[i].tag_name.toLowerCase() === array[j].tag_name.toLowerCase()){
                    let newCount = ( array[i].count * 1 ) + ( array[j].count * 1 )
                    let newObj = {};
                    newObj.count = newCount.toString()
                    newObj.tag_name = array[i].tag_name.toUpperCase()
                    newObjects.push(newObj)
                    array[i].destroy = true;
                    array[j].destroy = true;
                }
            }
        }
        for(let i = array.length - 1; i > 0; i--){
            if(array[i].destroy){
                array.splice(i,1)
            }
        }
        array = [...array, ...newObjects]
        array.sort((a,b) => {
            return b.count - a.count
        })
        return array;
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