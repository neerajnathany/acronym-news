import React, { Component } from 'react';
import Link from './Link';

class ArticleView extends Component {
    render() {
        var article = this.props.article;
        return (
            <div className="article">
                <Link href={"/"+article.sectionId} className="article-section">{article.sectionName}</Link>
                <h1 className="article-title">{article.webTitle}</h1>
                <div className="article-meta">                        
                    <span>{article.webPublicationDate}</span>•
                    <span>{Math.round((article.fields.wordcount / 10)*0.0769)} mins</span>
                </div>
                {/* <div className="article-detail" dangerouslySetInnerHTML={{__html: article.fields.body}} /> */}
            </div>
        )
    }
}
 
export default ArticleView;