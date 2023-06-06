import {useState, useEffect} from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../Loading';

export function Chart(props:any) {

    // const [currentChart, setCurrentChart] = useState<any>(props.market)

    function handleChartRequest(){

        if (props.market === 'Straits Times Index (STI)') {
            const indexTicker = '^STI';
            return fetchMarketData(indexTicker)
        }
        else if(props.market === 'Shanghai Stock Exchange Composite'){
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
            axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`,
                {headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'

                }}            
            )
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


    return (
        <section id='container-chart+fund'>
            <div>
                {/* <p>Last Refreshed: {data?.['Meta Data']['3: Last Refreshed']}</p>
                <p>Time Zone: {data?.['Meta Data']['7: Time Zone']}</p>
                <p>
                    {data?.['Meta Data']['2: Indicator']}
                </p> */}
            </div>
            <div id="chart">
                {/* {data?.['Meta Data']['1: Symbol']} */}
            </div>

            <div className="fundamentals-container">

            </div>
        </section>
    )
}

export function ChartGraphic(){
    // return (

    // )
}