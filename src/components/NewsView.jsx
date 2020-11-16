import React, { Component } from 'react';
import ArticleCard from './ArticleCard';
import Link from './Link';

class NewsView extends Component {
    state = { }

    render() { 
        return ( 
            <div>
                <div className="main-head">
                    <h2 className="main-title"><span>{this.props.title}</span></h2>
                    <span className="main-extra">{this.props.articles.length} result(s)</span>
                </div>
            {Boolean(this.props.sections.length) &&
                <div className="sections">
                    <span>Categories:</span>
                    {this.props.sections.map(each => {
                        return (
                            <Link className="panel-button" href={"/"+ each.id}>
                                <span>{each.webTitle}</span>
                            </Link>
                        )
                    })}
                </div>
            }
            {this.props.articles.length ? 
                <div className="articles">
                    <ArticleCard type='large' article={this.props.articles[0]} showItem = {this.props.showItem} />
                    <div>{(this.props.articles.slice(1).map( (each, index) => {
                        return (
                            <ArticleCard
                                type="big"
                                article={each}
                                key={index}
                                showItem = {this.props.showItem}
                            />
                        )
                    }))} </div>    
                </div> : <h5 className="group-title">Loading...</h5>}
            </div>

         );
    }
}

NewsView.defaultProps = {
	title : 'Headlines'
}
 
export default NewsView;