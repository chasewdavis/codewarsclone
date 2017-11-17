import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Headers/Headers';
import './FightDetails.css';
import {Solid, Hollow} from '../../components/Buttons/Buttons';

export default class FightDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            option_selected: 'details'
        }
    }

    componentDidMount(){
        
    }

    showDetails(){
        this.setState({option_selected:'details'})
    }

    showSolutions(){
        this.setState({option_selected:'solutions'})
    }
    
    render() {
        return (
            <div className='fightdetails'>
                <Navbar/>

                <div className='fightdetails_body'>
                    <div className='fightdetails_full-header'>
                        <Header id={this.props.match.params.id}/>
                        <div className='fightdetails_full-header-buttons'>
                            <Solid name='TRAIN'/>
                            <Hollow name='NEXT KATA'/>
                        </div>
                    </div>
                    <div className='fightdetails_options'>
                        <button id={this.state.option_selected==='details'?'fightdetails_selected':''} onClick={()=>this.showDetails()}>Details</button>
                        <button id={this.state.option_selected==='solutions'?'fightdetails_selected':''} onClick={()=>this.showSolutions()}>Solutions</button>
                    </div>
                    <div className='fightdetails_container'>
                        {this.state.option_selected === 'details' ? 'details component here': ''}
                        {this.state.option_selected === 'solutions' ? 'solutions component here': ''}
                    </div>
                </div>

            </div>
        )
    }
}