import React, { Component } from 'react';
import Link from './Link';
import moment from 'moment';

class ArticleModal extends Component {
    render() {
        var article = this.props.article;
        return (
            <div className="pop-modal">
                <Link href={"/"+article.sectionId} className="pop-section">{article.sectionName}</Link>
                <button className="pop-share" onClick={() => this.props.copyLink(article.id)}>Share</button>
                <h1 className="pop-title">{article.fields.headline}</h1>
                <div className="pop-meta">
                    <div>
                        <span>{moment(article.webPublicationDate).fromNow()}</span>•
                        <span>By {article.fields.byline}</span>•
                        <span>{Math.round((article.fields.wordcount / 10)*0.0769)} mins</span>
                    </div>                        
                </div>
                <div className="pop-detail" dangerouslySetInnerHTML={{__html: article.fields.body}} />
                <h6 className="pop-end">_____</h6>
                <button className="pop-close" onClick={this.props.clearArticle}></button>
            </div>
        )
    }
}

ArticleModal.defaultProps = {
	class : ''
}
 
export default ArticleModal;