import React, { Component } from 'react';
import Notification from './components/Notification';
import NewsView from './components/NewsView';
import ArticleModal from './components/ArticleModal';
import ArticleView from './components/ArticleView';
import SearchBar from './components/SearchBar';
import Link from './components/Link';
import FinWidget from './components/FinWidget';
import Empty from './components/Empty';
import {categories,KEY,PARAMS} from './constants';
import axios from 'axios';
import moment from 'moment';

class App extends Component {
    state = { popItem: null, sections: [], articles: [], searchSections: [], article: {}, title: '', location: window.location.pathname, query: new URL(window.location.href).searchParams.get('q')}

    componentDidMount(){
        const onLocationChange = () => {
            this.setState({location: window.location.pathname, query: new URL(window.location.href).searchParams.get('q')});
        };
        window.addEventListener('popstate', onLocationChange);
        this.getSections(categories, false);  
        this.getNews();
        return () => {
            window.removeEventListener('popstate', onLocationChange);
        };
    }

    getSections = async (query, search) => {
        const response = await axios.create({
            baseURL: 'https://content.guardianapis.com',
        }).get('/sections', {
            params:{
                'api-key':KEY,
                'q':query
            }
        });
        search ? this.setState({searchSections: response.data.response.results}) : this.setState({sections: response.data.response.results.filter(e => {
            return categories.includes(e.id);
        })});
    }
    
    getNews = async () => {        
        var path = this.state.location, parameters = PARAMS;
        //this.setState({searchSections:[]});

        if (this.state.location === '/'){
            path = '/search';
        }
        else if (this.state.location === '/search' && this.state.query){
            parameters = {...PARAMS,'q':this.state.query};
            this.getSections(this.state.query,true);
        }
        const response = await axios.create({
            baseURL: 'https://content.guardianapis.com',
        }).get(path, {
            params:parameters
        });
        if (response.data.response.results){
            this.setState({articles: response.data.response.results, title: response.data.response.section ? response.data.response.section.webTitle : (this.state.query ? 'Search results':'Headlines'), article:{}});            
        }
        else if (response.data.response.content){
            this.setState({article:response.data.response.content, articles:[], title: ''});
        }
    }
    
    getView = () => {        
        if (this.state.articles.length){
            return (
                <NewsView sections={this.state.searchSections} showArticle={this.showArticle} articles={this.state.articles} title={this.state.title}/>
            )                
        }
        else if (Object.keys(this.state.article).length){
            return <ArticleView article={this.state.article} copyLink={this.copyLink} showArticle={this.showArticle}/>
        }  
        else {
            return <Empty/>
        }                  
    }

    showArticle = item => {this.setState({popItem:item});}
    clearArticle = () => {this.setState({popItem:null});}
    copyLink = path => {navigator.clipboard.writeText(window.location.origin+'/'+path);}

    render() { 
        return (
            <div>
                <header className="header">
                    <a href="/" className="header-title">Acronym</a>
                    <Notification  />
                    <span className="header-user">{moment().format("ddd, MMM Do YYYY")}</span>
                </header>
                <main className="main">
                    <aside className="panel">
                        <SearchBar term={this.state.query}/>
                        <div className="panel-box">
                            <h4 className="panel-box-title">Popular Categories</h4>
                            <div className="panel-box-group">
                                    <Link className={"panel-button "+ (this.state.location === '/' ? "true" : '')} href="/">
                                        <span>All Headlines</span>
                                    </Link>
                                {this.state.sections.map(each => {
                                    return (
                                        <Link className={"panel-button "+(this.state.location === '/'+ each.id ? "true" : '')} href={"/"+ each.id}>
                                            <span>{each.webTitle}</span>
                                        </Link>
                                    )
                                })}                                                                                 
                            </div>
                        </div>
                        <FinWidget />
                    </aside>
                    <div className="main-content">
                        {this.getView()}
                    </div>
                    {this.state.popItem ? 
                        <div>
                            <div className="pop-layer" onClick={this.clearArticle}></div>
                            <ArticleModal article={this.state.popItem} clearArticle={this.clearArticle} copyLink={this.copyLink}/>
                        </div> : null}
                </main>
            </div>
         )
    }
}
 
export default App;
