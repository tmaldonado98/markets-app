import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { MyContext } from '../Context';
import {useContext} from 'react';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function StockData(props){	

		const curr = props.dataPoints.meta.currency;	
		const range = props.dataPoints.meta.range;

		const loopedDataPoints = [[], {param: []}];
		props.dataPoints.timestamp.map(each=> (loopedDataPoints[0].push(each)))
		
		let title = ''
		if(props.param === 'Highs'){
			props.dataPoints.indicators.quote[0].high.map(each=> loopedDataPoints[1].param.push(each))
			title = props.param + " (in "+ curr +")"
		}
		else if(props.param === 'Lows'){
			props.dataPoints.indicators.quote[0].low.map(each=> loopedDataPoints[1].param.push(each))
			title = props.param + " (in "+ curr +")"
		}
		else if(props.param === 'Open'){
			props.dataPoints.indicators.quote[0].open.map(each=> loopedDataPoints[1].param.push(each))
			title = props.param + " (in "+ curr +")"
		}
		else if(props.param === 'Close'){
			props.dataPoints.indicators.quote[0].close.map(each=> loopedDataPoints[1].param.push(each))
			title = props.param + " (in "+ curr +")"
		}
		else if(props.param === 'Volume'){
			props.dataPoints.indicators.quote[0].volume.map(each=> loopedDataPoints[1].param.push(each))
			title = props.param
		}

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
				title: title,
				// prefix: "$"
			},
			data: [{
				// yValueFormatString: "#,###",
				xValueType: "dateTime",
				// xValueFormatString: "DD",
				// type: "spline",
				type: "splineArea",
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

		if(props.param === 'Volume'){
			options.data[0].yValueFormatString = "#,###"
			options.axisY.prefix = ''
		}
		
		for(const each of loopedDataPoints[0]){
			options.data[0].dataPoints.push({x: each*1000})
			
		}

		for(let i=0; i<options.data[0].dataPoints.length; i++){
			options.data[0].dataPoints[i].y = loopedDataPoints[1].param[i]
		}

		// console.log(options.data[0].dataPoints)

		return (
		<div style={{borderBottom:'black 5px solid'}}>
			<CanvasJSChart options = {options}/>
		</div>
		);
	}