import React, { Component } from 'react';
import Link from './Link';

class ArticleModal extends Component {
    render() {
        var article = this.props.article;
        return (
            article ?
            <div className={"pop-layer " + this.props.class} onClick={this.props.clearItem}>
                <div className="pop-modal">
                    <Link href={"/"+article.sectionId} className="pop-item-section">{article.sectionName}</Link>
                    <h1 className="pop-item-title">{article.webTitle}</h1>
                    <div className="pop-item-meta">                        
                        <span>{article.webPublicationDate}</span>•
                        <span>{Math.round((article.fields.wordcount / 10)*0.0769)} mins</span>
                    </div>
                    <div className="pop-item-detail" dangerouslySetInnerHTML={{__html: article.fields.body}} />
                </div>
            </div> : null
        )
    }
}

ArticleModal.defaultProps = {
	class : ''
}
 
export default ArticleModal;