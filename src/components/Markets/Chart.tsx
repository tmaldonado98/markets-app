'use client'
import {useState, useEffect, useContext} from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../Loading';
import StockData from './StockData';
import Fundamentals from './Fundamentals';
import { MyContext } from '../Context';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    // ChevronDownIcon
  } from '@chakra-ui/react'

  import {IoIosArrowDown} from 'react-icons/io';

export function Chart(props:any) {
    const {range, setRange, param, setParam} = useContext(MyContext)!;

    // const [currentChart, setCurrentChart] = useState<any>(props.market)

    function handleChartRequest(){
        // console.log(range)
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
        else if(props.market === 'Hang Seng Index'){
            const indexTicker = '^HSI';
            return fetchMarketData(indexTicker)
        }
        else if(props.market === 'Hang Seng China Enterprises Index'){
            const indexTicker = '^HSCE';
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

    // useEffect(() => {
    //     console.log(range.toLowerCase())
    // }, [range])

    function fetchMarketData(ticker:string): Promise<any>{
        // setRange(rangeStr)
        console.log(process.env.REACT_APP_marketsServer,  process.env.REACT_APP_localServer)
        return new Promise((resolve, reject) => {
            // console.log(ticker, range.toLowerCase());
            axios.get(`${process.env.REACT_APP_marketsServer}/routes/markets`, {
                // REACT_APP_localServer   REACT_APP_marketsServer
                params: {
                  ticker: ticker,
                  range: range.toLowerCase(),
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

    
    const { data, isLoading, isError, error, refetch } = useQuery([props.market], handleChartRequest, {
        refetchOnWindowFocus: false,
        staleTime: 6 * 60 * 60 * 1000,
      })

    function handleRange(string:string){
        if (range === string) {
            return false;
        } 
        else{
            setRange(string);
            setTimeout(() => {
                refetch();
                
            }, 1000);

        }
    }

    // interface ChartResult {
    //   meta: string;
    //   // Add other properties as needed
    // }

    if(isLoading){
        return <div><Loading/></div>
    }

    if(isError){
        return <div style={{textAlign:'center'}}><p>Please Try Again In A Minute</p><Loading/></div>
    }

    const staticFundamentals = data.chart.result[0];

    return (
        <section id='container-chart+fund' style={{marginTop: '15px'}}>
            <>
            <div id="chart-options" style={{marginBottom:'8px', display:'flex', gap:'1rem'}}>
                <Menu colorScheme='blue' isLazy>
                    <MenuButton rightIcon={<IoIosArrowDown/>} variant='outline' as={Button} 
                        _focus={{ boxShadow: 'filled' }}
                        _hover={{ bg: 'blue.300' }}
                    >
                        {range}
                    </MenuButton>
                    <MenuList>
                        <MenuOptionGroup defaultValue={range} type='radio'>
                            <MenuItemOption value='5D' onClick={() => handleRange('5D')}   _hover={{ bg: 'blue.200' }}>5D</MenuItemOption><MenuDivider />
                            <MenuItemOption value='10D' onClick={() => handleRange('10D')} _hover={{ bg: 'blue.200' }}>10D</MenuItemOption><MenuDivider />
                            <MenuItemOption value='1mo' onClick={() => handleRange('1mo')} _hover={{ bg: 'blue.200' }}>1mo</MenuItemOption><MenuDivider />
                            <MenuItemOption value='3mo' onClick={() => handleRange('3mo')} _hover={{ bg: 'blue.200' }}>3mo</MenuItemOption><MenuDivider />
                            <MenuItemOption value='6mo' onClick={() => handleRange('6mo')} _hover={{ bg: 'blue.200' }}>6mo</MenuItemOption><MenuDivider />
                            <MenuItemOption value='1y' onClick={() => handleRange('1y')}   _hover={{ bg: 'blue.200' }}>1y</MenuItemOption><MenuDivider />
                            <MenuItemOption value='YTD' onClick={() => handleRange('YTD')} _hover={{ bg: 'blue.200' }}>YTD</MenuItemOption><MenuDivider />
                            <MenuItemOption value='Max' onClick={() => handleRange('Max')} _hover={{ bg: 'blue.200' }}>Max</MenuItemOption>
                        </MenuOptionGroup>
                    </MenuList>
                </Menu>

                <Menu colorScheme='blue' isLazy>
                    <MenuButton rightIcon={<IoIosArrowDown/>} variant='outline' as={Button} 
                        _focus={{ boxShadow: 'filled' }}
                        _hover={{ bg: 'blue.300' }}
                    >
                        {param}
                    </MenuButton>
                    <MenuList>
                        <MenuOptionGroup defaultValue={param} type='radio'>
                            <MenuItemOption value='Close' onClick={() => setParam('Close')} _hover={{ bg: 'blue.200' }}>Close</MenuItemOption><MenuDivider />
                            <MenuItemOption value='Open' onClick={() => setParam('Open')} _hover={{ bg: 'blue.200' }}>Open</MenuItemOption><MenuDivider />
                            <MenuItemOption value='Highs' onClick={() => setParam('Highs')} _hover={{ bg: 'blue.200' }}>Highs</MenuItemOption ><MenuDivider/>
                            <MenuItemOption value='Lows' onClick={() => setParam('Lows')} _hover={{ bg: 'blue.200' }}>Lows</MenuItemOption><MenuDivider />
                            <MenuItemOption value='Volume' onClick={() => setParam('Volume')} _hover={{ bg: 'blue.200' }}>Volume</MenuItemOption>
                        </MenuOptionGroup>
                    </MenuList>
                </Menu>
            </div>

                <StockData dataPoints={data.chart.result[0]} param={param}/>
                <div className='ad'>Insert ad here</div>
            <div className="fundamentals-container" style={{padding: '20px'}}>
                <h2 className='georgia' style={{fontSize:'30px', textAlign:'center'}}>Index Fundamentals</h2>
                <Fundamentals fundamentals={staticFundamentals}/>
            </div>
            </>
        </section>
    )
}