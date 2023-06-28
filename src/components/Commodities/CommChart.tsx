import React, { Component } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function CommChart(props:any){	
        const dataPoints = props.commData.data;
        
		const formattedDataPoints:any = [[], []];
		dataPoints.map((each:any) => (
            
            formattedDataPoints[1].push(each.date),
            formattedDataPoints[0].push(each.value)
            
            ))

		// console.log(formattedDataPoints)

        const dates = formattedDataPoints[1];
        // console.log(dates[0], dates[dates.length - 1]);

		const options:any = {
			animationEnabled: true,
			title:{
				text: new Date(dates[dates.length - 1]).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}) + ' - ' + new Date(dates[0]).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
			},
			axisX: {
				// valueFormatString: "DD"
			},
			axisY: {
				title: 'Values (in USD)',
				prefix: "$"
			},
			data: [{
				yValueFormatString: "$##,###.##",
				xValueType: "dateTime",
				// xValueFormatString: "DD",
				// type: "spline",
				type: "splineArea",
				dataPoints: []
			}]
		}
		
		for(const each of dates){
            const date = new Date(each);
            const ms = date.getTime();
			options.data[0].dataPoints.push({x: ms})
			
		}

		for(let i=0; i<options.data[0].dataPoints.length; i++){
			options.data[0].dataPoints[i].y = Number(formattedDataPoints[0][i])
		}

		// console.log(options.data[0].dataPoints)

		return (
		<div style={{borderBottom:'black 5px solid'}}>
			<CanvasJSChart options = {options}/>
		</div>
		);
	}