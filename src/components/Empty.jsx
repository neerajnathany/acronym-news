import React, { Component } from 'react';

class Empty extends Component {
    render() { 
        return (
            <div className="empty">
                <div className="empty-box">
                    <div className="loader">Loading...</div>
                    {/* <svg className="empty-icon" id="Capa_1" enable-background="new 0 0 512 512" width="100px" height="100px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><path d="m497 121h-114v-89c0-8.284-6.716-15-15-15h-353c-8.284 0-15 6.716-15 15v388c0 41.355 33.645 75 75 75h362c41.355 0 75-33.645 75-75v-284c0-8.284-6.716-15-15-15zm-422 344c-24.813 0-45-20.187-45-45v-373h323c0 396.466-.189 374.424.344 380.077 1.304 13.906 6.49 27.019 14.691 37.923zm407-45c0 24.813-20.187 45-45 45-3.366 0-5.695 0-9 0-24.813 0-45-20.187-45-45v-269h99z"/><path d="m304 89h-224c-8.284 0-15 6.716-15 15s6.716 15 15 15h224c8.284 0 15-6.716 15-15s-6.716-15-15-15z"/><path d="m304 153h-224c-8.284 0-15 6.716-15 15s6.716 15 15 15h224c8.284 0 15-6.716 15-15s-6.716-15-15-15z"/><path d="m304 393h-224c-8.284 0-15 6.716-15 15s6.716 15 15 15h224c8.284 0 15-6.716 15-15s-6.716-15-15-15z"/><path d="m304 217h-112c-8.284 0-15 6.716-15 15v112c0 8.284 6.716 15 15 15h112c8.284 0 15-6.716 15-15v-112c0-8.284-6.716-15-15-15zm-15 112h-82v-82h82z"/><path d="m80 271h48c8.284 0 15-6.716 15-15s-6.716-15-15-15h-48c-8.284 0-15 6.716-15 15s6.716 15 15 15z"/><path d="m80 335h48c8.284 0 15-6.716 15-15s-6.716-15-15-15h-48c-8.284 0-15 6.716-15 15s6.716 15 15 15z"/></g></svg> */}
                    <h4 className="empty-text">Either the page is loading or <br/>no search results were found.</h4>
                </div>
            </div>
          );
    }
}
 
export default Empty;