import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { MyContext } from '../Context';
import {useContext} from 'react';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function StockData(props){	

		const curr = props.dataPoints.meta.currency;	
		const range = props.dataPoints.meta.range;

		const loopedDataPoints = [[], {highs: []}];
		props.dataPoints.timestamp.map(each=> (loopedDataPoints[0].push(each)))

		// add conditional for different quote display option
		props.dataPoints.indicators.quote[0].high.map(each=> loopedDataPoints[1].highs.push(each))


		// console.log(loopedDataPoints)

		const options = {
			animationEnabled: true,
			title:{
				text: new Date(props.dataPoints.timestamp[0]*1000).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}) + ' - ' + new Date(props.dataPoints.timestamp[props.dataPoints.timestamp.length-1]*1000).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
			},
			axisX: {
				// valueFormatString: "DD"
			},
			axisY: {
				title: "Highs (in "+ curr +")",
				// prefix: "$"
			},
			data: [{
				// yValueFormatString: "#,###",
				xValueType: "dateTime",
				// xValueFormatString: "DD",
				// type: "spline",
				type: "splineArea",
				// dataPoints: [
				// 	{ x: new Date(2017, 0), y: 25060 },
				// 	{ x: new Date(2017, 1), y: 27980 },
				// 	{ x: new Date(2017, 2), y: 42800 },
				// 	{ x: new Date(2017, 3), y: 32400 },
				// 	{ x: new Date(2017, 4), y: 35260 },
				// 	{ x: new Date(2017, 5), y: 33900 },
				// 	{ x: new Date(2017, 6), y: 40000 },
				// 	{ x: new Date(2017, 7), y: 52500 },
				// 	{ x: new Date(2017, 8), y: 32300 },
				// 	{ x: new Date(2017, 9), y: 42000 },
				// 	{ x: new Date(2017, 10), y: 37160 },
				// 	{ x: new Date(2017, 11), y: 38400 }
				// ],

				dataPoints: []
			}]
		}

		if (props.dataPoints.meta.currency === 'SGD') {
			options.axisY.prefix = '$'
			options.data[0].yValueFormatString = "$#,###"
		}
		else if (props.dataPoints.meta.currency === 'CNY') {
			options.axisY.prefix = '¥'
			options.data[0].yValueFormatString = "¥#,###"

		}
		else if (props.dataPoints.meta.currency === 'USD') {
			options.axisY.prefix = '$'
			options.data[0].yValueFormatString = "$#,###"
		}
		else if (props.dataPoints.meta.currency === 'GBP') {
			options.axisY.prefix = '£'
			options.data[0].yValueFormatString = "£#,###"
		}
		else if (props.dataPoints.meta.currency === 'EUR') {
			options.axisY.prefix = '€'
			options.data[0].yValueFormatString = "€#,###"
		}
		else if (props.dataPoints.meta.currency === 'JPY') {
			options.axisY.prefix = '¥'
			options.data[0].yValueFormatString = "¥#,###"
		}
		
		for(const each of loopedDataPoints[0]){
			options.data[0].dataPoints.push({x: each*1000})
			
		}

		for(let i=0; i<options.data[0].dataPoints.length; i++){
			options.data[0].dataPoints[i].y = loopedDataPoints[1].highs[i]
		}

		// console.log(options.data[0].dataPoints)

		return (
		<div style={{borderBottom:'black 5px solid'}}>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
// }
// export default StockData;                              






// function handleChartRequest(){
//     if (props.market === 'Straits Times Index (STI)') {
//         const indexTicker = '^STI';
//         return fetchMarketData(indexTicker)
//     }
// }

// // 
// function fetchMarketData(ticker:string): Promise<any>{
//     return new Promise((resolve, reject) => {
//         axios.get(`https://www.alphavantage.co/query?function=SMA&symbol=${ticker}&interval=5min&time_period=60&series_type=open&apikey=${process.env.avKey}`,
//         {headers: {
//             'Content-Type': 'application/json'
//         }}
//         )
//         .then(response =>{
//             console.log(response.data);
//             resolve(response.data)
//         })
//         .catch(error => {
//             console.error(error)
//             reject(error);
//         })
//     })

// }


// const { data, isLoading, isError, error } = useQuery([props.market], handleChartRequest, {
//     refetchOnWindowFocus: false,
//   })

// if (isLoading) {
//     return <div><Loading/></div>
// }

// if (isError) {
//     return <div style={{textAlign:'center'}}>Please Try Again In A Minute <Loading/></div>
// }


// return (
//     <section id='container-chart+fund'>
//         <div>
//             <p>Last Refreshed: {data?.['Meta Data']['3: Last Refreshed']}</p>
//             <p>Time Zone: {data?.['Meta Data']['7: Time Zone']}</p>
//             <p>
//                 {data?.['Meta Data']['2: Indicator']}
//             </p>
//         </div>
//         <div id="chart">
//             {data?.['Meta Data']['1: Symbol']}
//         </div>

//         <div className="fundamentals-container">

//         </div>
//     </section>
// )
// }