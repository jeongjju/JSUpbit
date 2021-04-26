import React, { Component } from 'react'
// import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
// import priceData from './assets/btcdata.json'
// import moment from 'moment'
// import { connection, getTradePrice } from './upbit_lib';

import Button from '@material-ui/core/Button';
import CodeDialog from './components/codeDialog';
import Chart from './Chart';
import Modal from '@material-ui/core/Modal';

export default class App extends Component {
  constructor(props){
    super(props);

    this.handleCodeSelectClicked = this.handleCodeSelectClicked.bind(this);
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
	render()
	{
		return (
			<div>
			  <Chart></Chart>
        {/* <div> */}
          {/* <Button variant="contained" color="primary" style={{marginLeft : '20px'}} onClick={(e)=>{this.handleCodeSelectClicked()}}> */}
            {/* Code Select */}
          {/* </Button> */}
          {/* <CodeDialog open={this.state.codeDialogOpen}></CodeDialog> */}
          {/* <Modal open={this.state.codeDialogOpen}></Modal> */}
        {/* </div> */}
			</div>
		  )
	}
}



// render()
// {
// 	return (
// 		<div>
// 		 {/* <ReactHighcharts config={configPrice}  ref="chart"></ReactHighcharts> */}
// 		  <Chart></Chart>
// 		   <div>
// 			 <Button variant="contained" color="primary" style={{marginLeft : '20px'}} onClick={this.handleCodeSelectClicked.bind(this)}>
// 			   Code Select
// 			 </Button>
// 			 {/* <CodeDialog open={this.state.codeDialogOpen}></CodeDialog> */}
// 		   </div>
// 		</div>
// 	  )
// }