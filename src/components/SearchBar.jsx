import React, { Component } from 'react';

class SearchBar extends Component {
    state = { term: this.props.term || '' };

    onChange = (e) => {
        this.setState({term: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();
        window.history.pushState({}, '', ('search?q='+ this.state.term));
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }


    render() { 
        return ( 
        <form className="panel-search" onSubmit={this.onSubmit}>
            <input className="panel-input" type="text" value={this.state.term} onChange={this.onChange} placeholder="Search for articles, categories, etc."/>
        </form> );
    }
}
 
export default SearchBar;