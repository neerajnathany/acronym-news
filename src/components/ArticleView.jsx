import React, { Component } from 'react';
import Link from './Link';
import moment from 'moment';
import {PARAMS} from '../constants';
import axios from 'axios';
import ArticleCard from './ArticleCard';

class ArticleView extends Component {

    state = {articles: []};

    componentDidMount(){
        this.getRelated();
    }

    getRelated = async () => {
        const response = await axios.create({
            baseURL: 'https://content.guardianapis.com',
        }).get('/'+this.props.article.sectionId, {
            params:{...PARAMS,'page-size':8}
        });
        this.setState({articles: response.data.response.results});
    }

    render() {
        var article = this.props.article;
        return (
            <div>
                <div className="article-view">
                    <Link href={"/"+article.sectionId} className="article-section">{article.sectionName}</Link>
                    <button className="article-share" onClick={() => this.props.copyLink(article.id)}>Share</button>
                    <h1 className="article-title">{article.fields.headline}</h1>
                    <div className="article-meta">                        
                        <span>{moment(article.webPublicationDate).fromNow()}</span>•
                        <span>By {article.fields.byline}</span>•
                        <span>{Math.round((article.fields.wordcount / 10)*0.0769)} mins</span>
                    </div>
                    <div className="article-detail" dangerouslySetInnerHTML={{__html: article.fields.body}} />
                    <h6 className="article-end">_____</h6>
                </div>
                <div className="article-related">
                    <h4 className="article-related-title">More from <Link className="article-related-section" href={"/"+article.sectionId}>{article.sectionName}</Link></h4>
                    {this.state.articles.filter(i => {
                        return i.id !== article.id
                    }).slice(0,7).map((e,index) => {
                        return (
                            <ArticleCard 
                                article={e}
                                type='small'
                                key={index}
                                showArticle = {this.props.showArticle} />
                        )
                    })}
                </div>
            </div>
        )
    }
}
 
export default ArticleView;