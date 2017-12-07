import React, { Component } from 'react';
import SearchColumn from './SearchColumn/SearchColumn';
import SearchResults from './SearchResults/SearchResults';
import Navbar from '../../components/Navbar/Navbar';
import './Search.css';
import {connect} from 'react-redux';

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    
    render() {
        return (
            <div className='search'>
                <Navbar username={this.props.user.username} image_url={this.props.user.image_url} honor={this.props.user.honor}/>
                <div className='container'>
                    <div className='column'><SearchColumn/></div>
                    <div className='results'><SearchResults/></div>
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


export default connect(mapStateToProps)(Search);