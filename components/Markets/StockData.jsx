import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
// class StockData extends Component {
// 	render() {

	export default function StockData(props){	
		const curr = props.dataPoints.meta.currency;	
		
		const loopedDataPoints = [[], {highs: []}];

		props.dataPoints.timestamp.map(each=> (loopedDataPoints[0].push(each)))
		props.dataPoints.indicators.quote[0].high.map(each=> loopedDataPoints[1].highs.push(each))


		console.log(loopedDataPoints)

		const options = {
			animationEnabled: true,
			title:{
				text: new Date(props.dataPoints.timestamp[0]*1000).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}) + ' - ' + new Date(props.dataPoints.timestamp[props.dataPoints.timestamp.length-1]*1000).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
			},
			axisX: {
				valueFormatString: "MMM"
			},
			axisY: {
				title: "Highs (in "+ curr +")",
				// prefix: "$"
			},
			data: [{
				yValueFormatString: "#,###",
				xValueFormatString: "MMMM",
				type: "spline",
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

				dataPoints: [
					
					loopedDataPoints[0].map(each => (
						{x: new Date(each*1000).getDate(), y: loopedDataPoints[1].highs[each]}
					))
					// props.dataPoints.map(each => (
					// 	{x: new Date(each.timestamp*1000).getDate(), y: each.indicators.quote[0].high[each.indexOf(each.timestamp)]}
					// ))
					//return variable here holding looped object
				]
			}]
		}
		console.log(options.data[0].dataPoints)

		return (
		<div>
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