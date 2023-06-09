import {useState, useEffect} from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../Loading';
import StockData from './StockData';
import Fundamentals from './Fundamentals';
// import { Heading } from '@chakra-ui/react';
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
        <section id='container-chart+fund' style={{marginTop: '15px'}}>
            <div id="chart-options" style={{marginBottom:'8px'}}>
                <Menu isLazy>
                    {/* rightIcon={'>'} */}
                    <MenuButton as={Button} 
                        _focus={{ boxShadow: 'outline' }}
                        _hover={{ bg: 'gray.400' }}
                    >
                        Range
                    </MenuButton>
                    <MenuList>
                        <MenuOptionGroup defaultValue='asc' type='radio'>
                            <MenuItemOption value='asc' _hover={{ bg: 'gray.200' }}>1D</MenuItemOption ><MenuDivider/>
                            <MenuItemOption _hover={{ bg: 'gray.200' }}>5D</MenuItemOption><MenuDivider />
                            <MenuItemOption _hover={{ bg: 'gray.200' }}>10D</MenuItemOption><MenuDivider />
                            <MenuItemOption _hover={{ bg: 'gray.200' }}>1mo</MenuItemOption><MenuDivider />
                            <MenuItemOption _hover={{ bg: 'gray.200' }}>3mo</MenuItemOption><MenuDivider />
                            <MenuItemOption _hover={{ bg: 'gray.200' }}>6mo</MenuItemOption><MenuDivider />
                            <MenuItemOption _hover={{ bg: 'gray.200' }}>1y</MenuItemOption><MenuDivider />
                            <MenuItemOption _hover={{ bg: 'gray.200' }}>YTD</MenuItemOption><MenuDivider />
                            <MenuItemOption _hover={{ bg: 'gray.200' }}>Max.</MenuItemOption>
                        </MenuOptionGroup>
                    </MenuList>
                </Menu>

                <Menu isLazy>
                {/* rightIcon={'>'} */}
                <MenuButton as={Button} 
                    _focus={{ boxShadow: 'outline' }}
                    _hover={{ bg: 'gray.400' }}
                >
                    Display
                </MenuButton>
                <MenuList>
                    <MenuOptionGroup defaultValue='Highs' type='radio'>
                        <MenuItemOption value='Highs' _hover={{ bg: 'gray.200' }}>Highs</MenuItemOption ><MenuDivider/>
                        <MenuItemOption _hover={{ bg: 'gray.200' }}>Lows</MenuItemOption><MenuDivider />
                        <MenuItemOption _hover={{ bg: 'gray.200' }}>Open</MenuItemOption><MenuDivider />
                        <MenuItemOption _hover={{ bg: 'gray.200' }}>Close</MenuItemOption><MenuDivider />
                        <MenuItemOption _hover={{ bg: 'gray.200' }}>Volume</MenuItemOption>
                    </MenuOptionGroup>
                </MenuList>
                </Menu>
            </div>
            {/* props to pass: display={displayState} range={rangeState} */}
                <StockData dataPoints={data.chart.result[0]} />
            <div className="fundamentals-container" style={{padding: '20px'}}>
                <h2 className='georgia' style={{fontSize:'30px', textAlign:'center'}}>Index Fundamentals</h2>
                <Fundamentals fundamentals={data.chart.result[0]}/>
            </div>
        </section>
    )
}