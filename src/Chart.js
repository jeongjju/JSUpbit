import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
import priceData from './assets/btcdata.json'
import moment from 'moment'
import { connection, getTradePrice } from './upbit_lib';

import Button from '@material-ui/core/Button';
import CodeDialog from './components/codeDialog';

export default class App extends Component {
  constructor(props){
    super(props);

    // this.handleCodeSelectClicked = this.handleCodeSelectClicked.bind(this);
    this.state={
      codeDialogOpen : false
    }
  }
  handleCodeSelectClicked = () => {
    console.log('handleCodeSelectClicked')
    console.log('this.state.codeDialogOpen',this.state.codeDialogOpen)
    this.setState({
      codeDialogOpen : !this.state.codeDialogOpen
    })
  }
  render() {
    const options = { style: 'currency', currency: 'USD' };
    const numberFormat = new Intl.NumberFormat('en-US', options);
    connection("[\"KRW-BTC\",\"KRW-XRP\",\"KRW-KMD\",\"KRW-ENJ\",\"KRW-POLY\"]");
    const code1 = 'KRW-BTC', code2 = 'KRW-XRP';
    const configPrice = {
      chart: {
        events: {
          load: function () {
            let series = this.series[0];
            let series2 = this.series[1];
            let preTrade_price = "";
            setInterval(function () {

              let x = (new Date()).getTime(), // current time
                // y = getTradePrice(code1),
                // y2 = getTradePrice(code2)
                y=Math.round(Math.random() * 100),
                y2=Math.round(Math.random() * 1000);
                series.addPoint([x, y], true, true);
                series2.addPoint([x, y2], true, true);

            }, 1000);
          }
        }, zoomType: 'y'
      },
      time: {
        useUTC: false
      },

      rangeSelector: {
        buttons: [{
          count: 1,
          type: 'minute',
          text: '1M'
        }, {
          count: 5,
          type: 'minute',
          text: '5M'
        }, {
          type: 'all',
          text: 'All'
        }],
        inputEnabled: false,
        selected: 0
      },


      exporting: {
        enabled: false
      },
      series: [{
        name: code1,
        data: (function () {
          // generate an array of random data
          let data = [],
            time = (new Date()).getTime(),
            i;
          for (i = -999; i <= 0; i += 1) {
            data.push([
              time + i * 1000,
              0
            ]);
          }
          return data;
        }())
      }, {
        name: code2,
        data: (function () {
          // generate an array of random data
          let data = [],
            time = (new Date()).getTime(),
            i;
          for (i = -999; i <= 0; i += 1) {
            data.push([
              time + i * 1000,
              0
            ]);
          }
          return data;
        }())
      }
      ],
      legend: {
        enabled: true
      }
    };
    return (
      <div>
        <ReactHighcharts config={configPrice}  ref="chart"></ReactHighcharts>

      </div>
    )
  }
}
