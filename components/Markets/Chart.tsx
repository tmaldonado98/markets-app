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
        else if(props.market === 'CSI 300 Index'){
            const indexTicker = '000300.SS';
            return fetchMarketData(indexTicker)
        }
        else if(props.market === 'Nikkei 225'){
            const indexTicker = '^N225';
            return fetchMarketData(indexTicker)
        }
        else if(props.market === 'TOPIX'){
            const indexTicker = 'TPX';
            return fetchMarketData(indexTicker)
        }
        else if(props.market === 'S&P 500'){
            const indexTicker = '^SPX';
            return fetchMarketData(indexTicker)
        }
        else if(props.market === 'Nasdaq Composite'){
            const indexTicker = '^IXIC';
            return fetchMarketData(indexTicker)
        }
        else if(props.market === 'Dow Jones Industrial Average (DJIA)'){
            const indexTicker = '^DJI';
            return fetchMarketData(indexTicker)
        }
        else if(props.market === 'FTSE 100'){
            const indexTicker = '^FTSE';
            return fetchMarketData(indexTicker)
        }
        else if(props.market === 'DAX'){
            const indexTicker = '^GDAXI';
            return fetchMarketData(indexTicker)
        }
    }


    function fetchMarketData(ticker:string): Promise<any>{
        return new Promise((resolve, reject) => {
            console.log(ticker);

            axios.get('http://localhost:3001/routes/markets', {
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
                {/* <p>Time Zone: {data.chart.result[0].meta.exchangeTimezoneName}</p> */}
                <p>
                    {/* Currency: {data.chart.result[0].meta.currency} */}
                    {/* {console.log(data)} */}
                </p>
            </div>
            <div id="chart">
                {/* {data?.['Meta Data']['1: Symbol']} */}
                {/* {data.chart.result[0]} */}
                {/* <ChartGraphic dataPoints={data.chart.results[0]} /> */}
                <StockData dataPoints={data.chart.result[0]}/>
            </div>

            <div className="fundamentals-container">

            </div>
        </section>
    )
}