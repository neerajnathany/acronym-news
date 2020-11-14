import React, { Component } from 'react';
import Group from './Group';

class NewsView extends Component {
    state = { }

    render() { 
        return ( 
            <div className="main-content">
                <div className="main-head">
                    <h2 className="main-title">{this.props.title}</h2>
                    <span className="main-extra">{this.props.articles.length} result(s)</span>
                </div>
                <div>
                    {this.props.articles.length ? (this.props.articles.map( (each, index) => {
                        return (
                            <Group 
                                article={each}
                                key={index}
                                showItem = {this.props.showItem}
                                //view = {this.props.view}
                            />
                        )
                    })) : <h5 className="group-title">Loading...</h5>}      
                </div>
            </div>

         );
    }
}

NewsView.defaultProps = {
	title : 'Latest News'
}
 
export default NewsView;