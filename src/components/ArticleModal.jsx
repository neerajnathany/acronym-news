import React, { Component } from 'react';
import Link from './Link';
import moment from 'moment';

class ArticleModal extends Component {
    render() {
        var article = this.props.article;
        return (
            article ?
            <div className={"pop-layer " + this.props.class} onClick={this.props.clearItem}>
                <div className="pop-modal">
                    <Link href={"/"+article.sectionId} className="pop-section">{article.sectionName}</Link>
                    <h1 className="pop-title">{article.fields.headline}</h1>
                    <div className="pop-meta">                        
                        <span>{moment(article.webPublicationDate).fromNow()}</span>•
                        <span>By {article.fields.byline}</span>•
                        <span>{Math.round((article.fields.wordcount / 10)*0.0769)} mins</span>
                    </div>
                    <div className="pop-detail" dangerouslySetInnerHTML={{__html: article.fields.body}} />
                    <h6 className="pop-end">_____</h6>
                </div>
            </div> : null
        )
    }
}

ArticleModal.defaultProps = {
	class : ''
}
 
export default ArticleModal;