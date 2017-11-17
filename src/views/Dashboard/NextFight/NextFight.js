import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

import Navbar from '../../../components/Navbar/Navbar';
import './NextFight.css';

import { Solid, Hollow } from '../../../components/Buttons/Buttons';
import { unescape } from 'querystring';

class NextFight extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fights: [1,2]
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
                    <div className='nextfight_description-scroll'>What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham 
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