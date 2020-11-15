import React, { Component } from 'react';
import NewsView from './NewsView';
import {PARAMS} from '../constants';
import axios from 'axios';

class PageView extends Component {
    state = { articles:[], title:'', location: window.location.pathname }

    componentDidMount(){
        const onLocationChange = () => {
            this.setState({location: window.location.pathname});
        };
        window.addEventListener('popstate', onLocationChange);
        return () => {
            window.removeEventListener('popstate', onLocationChange);
        };
    }

    getNews = async () => {
        var path = this.state.location === '/' ? '/search' : this.state.location;
        const response = await axios.create({
            baseURL: 'https://content.guardianapis.com',
        }).get(path, {
            params:PARAMS
        });
        this.setState({articles:response.data.response.results, title:response.data.response.section ? response.data.response.section.webTitle : 'Headlines'});
    }

    render() { 
        this.getNews();
        return ( 
            <NewsView key={this.state.title} showItem={this.props.showArticle} articles={this.state.articles} title={this.state.title}/>    
         );
    }
}
 
export default PageView;