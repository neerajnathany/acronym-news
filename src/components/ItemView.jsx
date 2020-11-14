import React, { Component } from 'react';

class ItemView extends Component {
    render() {
        var item = this.props.item;
        return (
            item ? <div className={"pop-layer " + this.props.class} onClick={this.props.clearItem}>
                <div className="pop-modal">
                    <h1 className="pop-item-title">{item.webTitle}</h1>
                    <div className="pop-item-meta">
                        <span>{item.sectionName}</span>•
                        <span>{item.webPublicationDate}</span>•
                        <span>{Math.round((item.fields.wordcount / 10)*0.0769)} mins</span>
                    </div>
                    <div className="pop-item-detail" dangerouslySetInnerHTML={{__html: item.fields.body}} />
                </div>
            </div> : null
        )
    }
}

ItemView.defaultProps = {
	class : ''
}
 
export default ItemView;