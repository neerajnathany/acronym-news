import React, { Component } from 'react';
import Notification from './components/Notification';
import NewsView from './components/NewsView';
import ArticleView from './components/ArticleView';
import Link from './components/Link';
import categories from './constants';
import axios from 'axios';
//import Link from 'react';

const KEY = '829c4e68-c5a7-43fa-8a81-ed2e567dc96a'
const PARAMS = {"api-key": KEY, "page-size":30, "show-fields": "body,thumbnail,wordcount"}

class App extends Component {
    state = { articles:[], title:'', selectedItem: null, location: window.location.pathname, sections:[] }

    componentDidMount(){
        const onLocationChange = () => {
            this.setState({location: window.location.pathname});
        };
        window.addEventListener('popstate', onLocationChange);
        this.getNews();
        this.getSections();
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
        //this.getSections();
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

    getView = () => {
        this.getNews();
        return (
            <main className="main">
                <aside className="panel">
                    <div className="panel-box">
                        <div className="panel-box-group">
                            <h6 className="panel-box-title">Popular categories</h6>
                            {this.state.sections.map(each => {
                                return (
                                    <Link className="panel-button" href={"/"+each.id}>
                                        <span>{each.webTitle}</span>
                                    </Link>
                                )
                            })}                                                                                 
                        </div>
                    </div>
                </aside>
                <NewsView key={this.state.title} showItem={this.showArticle} articles={this.state.articles} title={this.state.title}/>    
                {this.state.selectedItem ? <ArticleView item={this.state.selectedItem} clearItem={this.clearArticle}/> : <ArticleView class="inactive"/>}
            </main>
        )                
    }

    // showSection = async (e) => {
    //     const response = await axios.create({
    //         baseURL: 'https://content.guardianapis.com',
    //     }).get('/'+e.currentTarget.value,{
    //         params:{
    //             "api-key": KEY,
    //             "page-size":30,
    //             "show-fields": "body,thumbnail,wordcount",
    //         }
    //     });
    //     this.setState({articles:response.data.response.results, title:response.data.response.section.webTitle});
    // }

    showArticle = (item) => {
        this.setState({selectedItem:item});
    }

    clearArticle = () => {
        this.setState({selectedItem:null});
    }

    render() { 
        return (
            <div>
                <header className="header">
                    <span className="header-title">Acronym</span>
                    <Notification  />
                    <span className="header-user">{new Date().toDateString()}</span>
                </header>  
                {this.getView()}
            </div>
         )
    }
}
 
export default App;
