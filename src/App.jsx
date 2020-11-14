import React, { Component } from 'react';
import Notification from './components/Notification';
import NewsView from './components/NewsView';
import ItemView from './components/ItemView';
import axios from 'axios';

//const KEY = 'e167eaf2fd324056960ac74edd169f05'
const KEY = '829c4e68-c5a7-43fa-8a81-ed2e567dc96a'

class App extends Component {
    state = { articles:[], selectedItem: null }

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
        console.log(response.data.response.results[0].fields.thumbnail);
    }

    showItem = (item) => {
        this.setState({selectedItem:item});
    }

    clearItem = () => {
        this.setState({selectedItem:null});
    }

    render() { 
        return (
            <div>
                <header className="header">
                    <span className="header-title">Acronym</span>
                    <Notification  />
                    <span className="header-user">Neeraj Nathany</span>
                </header>  
                <main className="main">
                    <aside className="panel">
                    </aside>
                    <NewsView showItem={this.showItem} articles={this.state.articles}/>    
                    {this.state.selectedItem ? <ItemView item={this.state.selectedItem} clearItem={this.clearItem}/> : <ItemView class="inactive"/>}                                  
                </main>
            </div>
         )
    }
}
 
export default App;
