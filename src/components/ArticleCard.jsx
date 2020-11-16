import React, { Component } from 'react';
import moment from 'moment';

class ArticleCard extends Component {

    render() {
        var article = this.props.article;
        var date = moment(article.webPublicationDate).fromNow();
		return (
			<div className={"item "+this.props.type} onClick = {() => this.props.showItem(article)}>
				<div className="item-tile">
					{article.fields.thumbnail ? <img src={article.fields.thumbnail} alt={article.webTitle}></img> : null}
					<span className="item-section">{article.sectionName}</span>
				</div>
				<div className="item-detail">
					<h5 className="item-title">{article.webTitle}</h5>
                    <span className="item-date">{date.charAt(0).toUpperCase() + date.slice(1)}</span>
                    {this.props.type === 'large' ? 
                        <div>
                            <span className="item-author">By {article.fields.byline}</span>
                            <p className="item-intro">{article.fields.trailText}.</p>
                        </div>
                     : null}
				</div>
			</div>
		)
	}
}
 
export default ArticleCard;