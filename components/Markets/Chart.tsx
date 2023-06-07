import {useState, useEffect} from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../Loading';
import StockData from './StockData';

export function Chart(props:any) {

    // const [currentChart, setCurrentChart] = useState<any>(props.market)

    function handleChartRequest(){

        if (props.market === `FTSE Straits Times Index (FTSE STI)`) {
            const indexTicker = '^STI';
            return fetchMarketData(indexTicker)
        }
        else if(props.market === 'Shanghai Stock Exchange Composite Index'){
            const indexTicker = '000001.SS';
            return fetchMarketData(indexTicker)
        }
        // else if(props.market === ''){
        //     const indexTicker = '^';
        //     return fetchMarketData(indexTicker)
        // }
        // else if(props.market === ''){
        //     const indexTicker = '^';
        //     return fetchMarketData(indexTicker)
        // }
        // else if(props.market === ''){
        //     const indexTicker = '^';
        //     return fetchMarketData(indexTicker)
        // }
        // else if(props.market === ''){
        //     const indexTicker = '^';
        //     return fetchMarketData(indexTicker)
        // }
        // else if(props.market === ''){
        //     const indexTicker = '^';
        //     return fetchMarketData(indexTicker)
        // }
        // else if(props.market === ''){
        //     const indexTicker = '^';
        //     return fetchMarketData(indexTicker)
        // }
        // else if(props.market === ''){
        //     const indexTicker = '^';
        //     return fetchMarketData(indexTicker)
        // }
        // else if(props.market === ''){
        //     const indexTicker = '^';
        //     return fetchMarketData(indexTicker)
        // }
    }


    function fetchMarketData(ticker:string): Promise<any>{
        return new Promise((resolve, reject) => {
            console.log(ticker);

            axios.get('http://localhost:3001/routes/markets', {
                // headers: {
                //   'Access-Control-Allow-Origin': '*'
                // },
                params: {
                  ticker: ticker,
                },
            })
            .then(response => {
                console.log(response.data);
                resolve(response.data)
            })
            .catch(error => {
                console.error(error)
                reject(error);
            })


            // axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`,
            //     {headers: {
            //         'Content-Type': 'application/json',
            //         'Access-Control-Allow-Origin': '*'

            //     }}            
            // )
            // .then(response => {
            //     console.log(response.data);
            //     resolve(response.data)
            // })
            // .catch(error => {
            //     console.error(error)
            //     reject(error);
            // })
        })

    }

    
    const { data, isLoading, isError, error } = useQuery([props.market], handleChartRequest, {
        refetchOnWindowFocus: false,
      })

    interface ChartResult {
      meta: string;
      // Add other properties as needed
    }

    if(isLoading){
        return <div><Loading/></div>
    }

    if(isError){
        return <div style={{textAlign:'center'}}><p>Please Try Again In A Minute</p><Loading/></div>
    }


    return (
        <section id='container-chart+fund'>
            <div>
                {/* <p>Last Refreshed: {data?.['Meta Data']['3: Last Refreshed']}</p> */}
                <p>Time Zone: {data.chart.result[0].meta.exchangeTimezoneName}</p>
                <p>
                    Currency: {data.chart.result[0].meta.currency}
                    {/* {console.log(data)} */}
                </p>
            </div>
            <div id="chart">
                {/* {data?.['Meta Data']['1: Symbol']} */}
                {/* {data.chart.result[0]} */}
                {/* <ChartGraphic dataPoints={data.chart.results[0]} /> */}
                <StockData dataPoints={data.chart.result[0]} timestampArr={data.chart.result[0].timestamp} quoteArr={data.chart.result[0].indicators.quote}/>
            </div>

            <div className="fundamentals-container">

            </div>
        </section>
    )
}