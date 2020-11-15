import React, { Component } from 'react';
import Notification from './components/Notification';
import PageView from './components/PageView';
import ArticleView from './components/ArticleView';
import Link from './components/Link';
import {categories,KEY} from './constants';
import axios from 'axios';

class App extends Component {
    state = { selectedItem: null, sections:[] }

    componentDidMount(){
        this.getSections();
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

    showArticle = (item) => {
        this.setState({selectedItem:item});
    }
    
    clearArticle = () => {
        this.setState({selectedItem:null});
    }
    
    getView = () => {
        return (
            <main className="main">
                <aside className="panel">
                    <div className="panel-box">
                        <div className="panel-box-group">
                            <h6 className="panel-box-title">Categories</h6>
                            <Link className={"panel-button "+(window.location.pathname === '/' ? "true" : "false")} href="/">
                                <span>All headlines</span>
                            </Link>
                            {this.state.sections.map(each => {
                                return (
                                    <Link className={"panel-button "+(window.location.pathname === '/'+each.id ? "true" : "false")} href={"/"+each.id}>
                                        <span>{each.webTitle}</span>
                                    </Link>
                                )
                            })}                                                                                 
                        </div>
                    </div>
                </aside>
                <PageView showArticle={this.showArticle}/>                
                {this.state.selectedItem ? <ArticleView item={this.state.selectedItem} clearItem={this.clearArticle}/> : <ArticleView class="inactive"/>}
            </main>
        )                
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
