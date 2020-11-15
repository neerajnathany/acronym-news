import React, { Component } from 'react';
import Notification from './components/Notification';
import NewsView from './components/NewsView';
import ItemView from './components/ItemView';
import axios from 'axios';

//const KEY = 'e167eaf2fd324056960ac74edd169f05'
const KEY = '829c4e68-c5a7-43fa-8a81-ed2e567dc96a'

class App extends Component {
    state = { articles:[], title:'Headlines', selectedItem: null }

    componentDidMount(){
        this.getNews();
    }

    getNews = async () => {
        const response = await axios.create({
            baseURL: 'https://content.guardianapis.com',
        }).get('/search',{
            params:{
                "api-key": KEY,
                "page-size":30,
                "show-fields": "body,thumbnail,wordcount",
            }
        });
        this.setState({articles:response.data.response.results});
        // this.getSections();
    }

    showSection = async (e) => {
        const response = await axios.create({
            baseURL: 'https://content.guardianapis.com',
        }).get('/'+e.currentTarget.value,{
            params:{
                "api-key": KEY,
                "page-size":30,
                "show-fields": "body,thumbnail,wordcount",
            }
        });
        this.setState({articles:response.data.response.results, title:response.data.response.section.webTitle});
    }

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
                <main className="main">
                    <aside className="panel">
                        <div className="panel-box">
                            <div className="panel-box-group">
                                <h6 className="panel-box-title">Categories</h6>
                                <button className="panel-button" onClick={this.showSection} value={'business'} data-filter="section">
                                    <span>Business</span>
                                </button>
                                <button className="panel-button" onClick={this.showSection} value={'technology'} data-filter="section">
                                    <span>Technology</span>
                                </button>
                                <button className="panel-button" onClick={this.showSection} value={'politics'} data-filter="section">
                                    <span>Politics</span>
                                </button>
                                <button className="panel-button" onClick={this.showSection} value={'sport'} data-filter="section">
                                    <span>Sport</span>
                                </button>                                
                                
                            </div>
                            {/* {cats.map((each,num) => {
                                return (
                                    <div className="panel-box-group" key={num}><h6 className="panel-box-title">{each}</h6>
                                    {this.state.clothes.filter(i=>{
                                        return i.category === each;
                                    }).map(c=>{
                                        return c.form
                                    }).filter((f, index, self)=>{
                                        return self.indexOf(f) === index;
                                    }).map((u,order) => {
                                        return (
                                            <button className={"panel-button "+ (this.state.formFilter === u)} key={order} onClick={this.onStdFilter} value={u} data-filter="form">
                                                <span>{u}</span>
                                            </button>
                                        )
                                    })}</div>
                                )
                            })
                            } */}
                        </div>
                    </aside>
                    <NewsView showItem={this.showArticle} articles={this.state.articles} title={this.state.title}/>    
                    {this.state.selectedItem ? <ItemView item={this.state.selectedItem} clearItem={this.clearArticle}/> : <ItemView class="inactive"/>}                                  
                </main>
            </div>
         )
    }
}
 
export default App;
