import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Headers/Headers';
import './FightDetails.css';
import {Solid, Hollow} from '../../components/Buttons/Buttons';
import Instructions from '../../components/TabContainer/Instructions/Instructions';
import Solutions from './Solutions/Solutions.js';
import html from '../../components/TabContainer/Instructions/html-rules';
import axios from 'axios';
import { withRouter } from 'react-router';
import {connect} from 'react-redux';

class FightDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            option_selected: 'details',
            fight: {description:''}
        }
        this.trainKata = this.trainKata.bind(this)
        this.nextKata = this.nextKata.bind(this)
    }

    componentDidMount(){
        axios.get(`/api/getCatFight/${this.props.match.params.id}`)
        .then(res=>{console.log('direct res is...', res.data),this.setState({fight:res.data})})
    }

    showDetails(){
        this.setState({option_selected:'details'})
    }

    showSolutions(){
        this.setState({option_selected:'solutions'})
    }

    showTags(){

        console.log('show tags...', this.state.fight.tags)
        let tags = "";

        if(this.state.fight.tags){
            tags = this.state.fight.tags.map((tag,i)=>{
                return <div key={i}>{tag.tag_name}</div>
            })
        }
        return tags
    }

    trainKata(){
        this.props.history.push(`/catfight/${this.props.match.params.id}`)
    }

    nextKata(){
        //push to next kata
        this.props.history.push(`/fightdetails/${this.props.match.params.id * 1 + 1}`)
        axios.get(`/api/getCatFight/${this.props.match.params.id * 1 + 1}`)
        .then(res=>this.setState({fight:res.data}))
    }
    
    render() {
        
        console.log('fight is now..', this.state.fight)

        return (
            <div className='fightdetails'>
                <Navbar username={this.props.user.username} image_url={this.props.user.image_url} honor={this.props.user.honor}/>

                <div className='fightdetails_body'>
                    <div className='fightdetails_full-header'>
                        <Header name={this.state.fight.name} difficulty={this.state.fight.difficulty} author={this.state.fight.username}/>
                        <div className='fightdetails_full-header-buttons'>
                            <Solid name='TRAIN' clicked={() => this.trainKata()}/>
                            <Hollow name='NEXT KATA' clicked={() => this.nextKata()}/>
                        </div>
                    </div>
                    <div className='fightdetails_options'>
                        <button id={this.state.option_selected==='details'?'fightdetails_selected':''} onClick={()=>this.showDetails()}>Details</button>
                        <button id={this.state.option_selected==='solutions'?'fightdetails_selected':''} onClick={()=>this.showSolutions()}>Solutions</button>
                    </div>
                    <div className='fightdetails_dark-container'>
                        <div className='fightdetails_container'>
                            {this.state.option_selected === 'details' ? <div><Instructions description={html.deserialize(this.state.fight.description)} change={()=>{}}/></div>: ''}
                            {this.state.option_selected === 'solutions' ? <div><Solutions solutions={this.state.fight.solutions}/></div>: ''}
                        </div>
                        {this.state.option_selected==='details'
                        ? 
                        <div className='fightdetails_tags'>
                            {this.showTags()}
                        </div>
                        :
                        ''
                        }
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps({user}) {
    return {
        user
    }
}

export default withRouter(connect(mapStateToProps)(FightDetails))