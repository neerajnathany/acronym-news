import React, { Component } from 'react';

class FinWidget extends Component {
    constructor(props) {
        super(props);
        this._ref = React.createRef();
        this._ref2 = React.createRef();
    }
    componentDidMount() {
        const script = document.createElement('script');
        const script2 = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
        script2.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
        script.async = true;
        script2.async = true;
        script.innerHTML = JSON.stringify({
            "symbol": "OANDA:USDINR",
            "width": "100%",
            "height": "100%",
            "locale": "in",
            "dateRange": "12M",
            "colorTheme": "dark",
            "trendLineColor": "#ffae00",
            "underLineColor": "rgba(255, 174, 0, 0.25)",
            "isTransparent": true,
            "autosize": true,
            "largeChartUrl": ""
    })
        script2.innerHTML = JSON.stringify({
            "symbol": "CURRENCYCOM:US500",
            "width": "100%",
            "height": "100%",
            "locale": "in",
            "dateRange": "12M",
            "colorTheme": "dark",
            "trendLineColor": "#ffae00",
            "underLineColor": "rgba(255,174,0, 0.25)",
            "isTransparent": true,
            "autosize": true,
            "largeChartUrl": ""
        })
        this._ref.current.appendChild(script);
        this._ref2.current.appendChild(script2);
    }
    render() {
        return(
            <div>
                <div class="panel-widget" ref={this._ref2}></div>
                <div class="panel-widget" ref={this._ref}></div>
            </div>
        );
    }
}
 
export default FinWidget;