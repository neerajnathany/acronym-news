import React, { Component } from 'react';
import Notification from './components/Notification';
import NewsView from './components/NewsView';
import ArticleModal from './components/ArticleModal';
import ArticleView from './components/ArticleView';
import Link from './components/Link';
import {categories,KEY,PARAMS} from './constants';
import axios from 'axios';

class App extends Component {
    state = { popItem: null, sections: [], articles: [], article: {}, title: '', location: window.location.pathname }

    componentDidMount(){
        this.getSections();
        const onLocationChange = () => {
            this.setState({location: window.location.pathname});
        };
        window.addEventListener('popstate', onLocationChange);
        return () => {
            window.removeEventListener('popstate', onLocationChange);
        };
    }

    getSections = async () => {
        const response = await axios.create({
            baseURL: 'https://content.guardianapis.com',
        }).get('/sections', {
            params:{
                'api-key':KEY,
                'q':categories
            }
        });
        this.setState({sections: response.data.response.results.filter(e => {
            return categories.includes(e.id);
        })});
    }
    
    getNews = async () => {
        var path = this.state.location === '/' ? '/search' : this.state.location;
        const response = await axios.create({
            baseURL: 'https://content.guardianapis.com',
        }).get(path, {
            params:PARAMS
        });
        if (response.data.response.results){
            this.setState({articles: response.data.response.results, title: response.data.response.section ? response.data.response.section.webTitle : 'Headlines', article:{}});            
        }
        else if (response.data.response.content){
            this.setState({article:response.data.response.content, articles:[], title: ''});
        }
    }
    
    showArticle = (item) => {
        this.setState({popItem:item});
    }
    
    clearArticle = () => {
        this.setState({popItem:null});
    }
    
    getView = () => {        
        this.getNews();
        if (this.state.articles.length){
            return <NewsView key={this.state.title} showItem={this.showArticle} articles={this.state.articles} title={this.state.title}/>                                 
        }
        else if (Object.keys(this.state.article).length){
            return <ArticleView article={this.state.article}/>
        }                    
    }

    render() { 
        return (
            <div>
                <header className="header">
                    <span className="header-title">Acronym</span>
                    <Notification  />
                    <span className="header-user">{new Date().toDateString()}</span>
                </header>
                <main className="main">
                    <aside className="panel">
                        <div className="panel-box">
                            <div className="panel-box-group">
                                <h6 className="panel-box-title">Categories</h6>
                                <Link className={"panel-button "+(this.state.location === '/' ? "true" : "false")} href="/">
                                    <span>All headlines</span>
                                </Link>
                                {this.state.sections.map(each => {
                                    return (
                                        <Link className={"panel-button "+(this.state.location === '/'+each.id ? "true" : "false")} href={"/"+each.id}>
                                            <span>{each.webTitle}</span>
                                        </Link>
                                    )
                                })}                                                                                 
                            </div>
                        </div>
                    </aside>
                    {this.getView()}
                    {this.state.popItem ? <ArticleModal article={this.state.popItem} clearItem={this.clearArticle}/> : <ArticleModal class="inactive"/>}
                </main>
            </div>
         )
    }
}
 
export default App;
