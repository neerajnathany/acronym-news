import React, { Component } from 'react';

class Group extends Component {
		
	render() {
		var article = this.props.article;
		return (
			<div className={"item big"} onClick = {() => this.props.showItem(article)}>
				<div className="item-tile">
					{article.fields.thumbnail ? <img src={article.fields.thumbnail} alt={article.webTitle}></img> : null}
					<span className="item-section">{article.sectionName}</span>
				</div>
				<div className="item-detail">
					<h5 className="item-title">{article.webTitle}</h5>
					<span className="item-date">{article.webPublicationDate}</span>
				</div>
			</div>
		)
	}
}

Group.defaultProps = {
	class : ''
}

export default Group;