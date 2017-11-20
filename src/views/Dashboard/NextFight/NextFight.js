import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

import Navbar from '../../../components/Navbar/Navbar';
import './NextFight.css';

import { Solid, Hollow } from '../../../components/Buttons/Buttons';
import { unescape } from 'querystring';

import Instructions from '../../../components/TabContainer/Instructions/Instructions';
import html from '../../../components/TabContainer/Instructions/html-rules';

class NextFight extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fights: [{description:''},{}]
        }

        this.skipChallenge = this.skipChallenge.bind(this);
        this.trainChallenge = this.trainChallenge.bind(this);
    }

    componentDidMount(){
        axios.get(`/api/randomCatFight`).then(res=>{
            this.setState({fights:res.data})
        })
    }

    skipChallenge(){
        if(this.state.fights[1]){
        let nextFight = this.state.fights.slice(1)
        this.setState({fights: nextFight })
        
            axios.get(`/api/randomCatFight`).then(res=>{

                console.log('res.data from api call is...', res.data)

                let temp = this.state.fights
                
                let array = [...temp, ...res.data]

                for(let i = array.length - 1; i > 0; i--){
                    for(let j = 0; j < i; j++){
                        if(array[i].cat_fight_id === array[j].cat_fight_id){
                            array.splice(i,1)
                            break
                        }
                    }
                }

                this.setState({fights:array})
                
            })

            
        }
    }

    trainChallenge(){
        this.props.history.push(`/fightdetails/${this.state.fights[0].cat_fight_id}`)
    }

    render() {

        console.log('the state of fights is...', this.state.fights)

        let tags = "";

        if(this.state.fights[0].tagsArray){
            tags = this.state.fights[0].tagsArray.map((tag,i)=>{
                return <div key={i}>{tag.tag_name}</div>
            })
        }

        return (
            <div className='nextfight'>
                <div className='nextfight-challenge'>
                    <header>
                    Your Next Challenge...
                    </header>

                    <footer>
                        <Solid name='TRAIN' clicked={() => this.trainChallenge()}/>
                        <Hollow name='SKIP' clicked={() => this.skipChallenge()}/>
                    </footer>

                </div>

                <div className='nextfight-description'>
                    <header>{this.state.fights[0].difficulty} {this.state.fights[0].name}</header>
                    <div className='nextfight_description-scroll'>
                    <div><Instructions description={html.deserialize(this.state.fights[0].description)} change={()=>{}}/></div>
                    </div> 
                    <footer className='nextfight_tags'>
                        <div className='nextfight_gradient'></div> 
                        {tags}
                    </footer>
                </div>
            </div>
        )
    }
}

export default withRouter(NextFight)