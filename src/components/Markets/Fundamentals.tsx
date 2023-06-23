'use client'
import {QueryClient, useQuery} from '@tanstack/react-query';
import {useContext, useState} from 'react';
import Loading from '../Loading';
import axios from 'axios';
import '../../styles/fundamentals.css';
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    Divider,
    Center,
    Box,
    Slider,
    SliderMark,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
  } from '@chakra-ui/react'
import { MyContext } from 'components/Context';


export default function Fundamentals(props:any){

    const {server} = useContext(MyContext)!;

    function fetchFundamentals(ticker:string): Promise<any>{
        return new Promise((resolve, reject) => {
            axios.get(`${server}/routes/markets/fundamentals`, 
            // REACT_APP_localServer   REACT_APP_marketsServer
            {params: {
                ticker: ticker,
                modules: 'summaryDetail,price',
                } 
            } 
            )
            .then(response => {
                // console.log(response.data)
                resolve(response.data)
            })
            .catch(error => {
                console.error(error)
                reject(error);
            })
        })
    }

    const {data, isLoading, isError, error} = useQuery(['fundamentalsData', props.fundamentals.meta.symbol ], 
        () => fetchFundamentals(props.fundamentals.meta.symbol), {
        refetchOnWindowFocus: false,
        staleTime: 6 * 60 * 60 * 1000,
      })


    if(isLoading){
        return <div><Loading/></div>
    }

    if(isError){
        return <div>We have encountered an error. Please try again in a minute. <br/><Loading/></div>
    }

    // {console.log(process.env.REACT_APP_marketsServer)}

    const currSym = data.quoteSummary.result[0].price.currencySymbol;
    const priceSection = data.quoteSummary.result[0].price;
           
    // 52 week range state
    const labelStyles = {
     mt: '2',
     ml: '-2.5',
     fontSize: 'sm',
    }
      

    return (
        <section id='quote-summary'>
            <>
            {/* <p>Data {priceSection.regularMarketSource.toLowerCase()} by {priceSection.exchangeDataDelayedBy} minutes.</p> */}
            <div style={{gap:'15px'}} className='flex-container'>
                <p><b>{priceSection.shortName}</b><br/>({priceSection.symbol})</p>
                <Center height='50px'><Divider orientation='vertical' /></Center>
                <p><u>Currency</u><br/><b>{currSym +' '+ priceSection.currency}</b></p>
                {/* <Center height='50px'><Divider orientation='vertical' /></Center> */}
            </div>
            <div style={{gap:'15px', marginBottom:'8px'}} className='flex-container'>
                <p><u>Previous close</u><br/><b>{currSym + data.quoteSummary.result[0].summaryDetail.previousClose.fmt}</b></p>
                <Center height='50px'><Divider orientation='vertical' /></Center>
                <p><u>Open</u><br/><b>{currSym + data.quoteSummary.result[0].summaryDetail.open.fmt}</b></p>
                <Center height='50px'><Divider orientation='vertical' /></Center>
                <p><u>Day low</u><br/><b>{currSym + data.quoteSummary.result[0].summaryDetail.dayLow.fmt}</b></p>
                <Center height='50px'><Divider orientation='vertical' /></Center>
                <p><u>Day high</u><br/><b>{currSym + data.quoteSummary.result[0].summaryDetail.dayHigh.fmt}</b></p>
            </div>

            {/* <Divider/> */}
{/* 52 week range */}
            <div style={{display:'flex', flexDirection:'column'}}>
                <h3 style={{textAlign:'center', fontSize:'20px', textDecoration:'underline'}} className='georgia'>52 week range</h3>
                <p style={{textAlign:'center', marginBottom:'2rem'}}>Regular Market Price</p>
                <Box style={{margin:'auto'}} width='80%'>
                    <Slider colorScheme='pink' style={{opacity:'1'}} isDisabled={true} aria-label='slider-ex-6' defaultValue={(priceSection.regularMarketPrice.raw - data.quoteSummary.result[0].summaryDetail.fiftyTwoWeekLow.raw)/(data.quoteSummary.result[0].summaryDetail.fiftyTwoWeekHigh.raw - data.quoteSummary.result[0].summaryDetail.fiftyTwoWeekLow.raw)*100}>
                        <SliderMark value={0} {...labelStyles}>
                            <b>{currSym + data.quoteSummary.result[0].summaryDetail.fiftyTwoWeekLow.fmt}</b>
                        </SliderMark>
                        <SliderMark value={100} {...labelStyles}>
                            <b>{currSym + data.quoteSummary.result[0].summaryDetail.fiftyTwoWeekHigh.fmt}</b>
                        </SliderMark>
                        <SliderMark style={{opacity:'1'}}
                        value={(priceSection.regularMarketPrice.raw - data.quoteSummary.result[0].summaryDetail.fiftyTwoWeekLow.raw)/(data.quoteSummary.result[0].summaryDetail.fiftyTwoWeekHigh.raw - data.quoteSummary.result[0].summaryDetail.fiftyTwoWeekLow.raw)*100}
                        textAlign='center'
                        bg='pink.500'
                        color='white'
                        mt='-10'
                        ml='-5'
                        w='30'
                        >
                        {currSym + Number(priceSection.regularMarketPrice.raw.toFixed(2)).toLocaleString('en-US')}
                        </SliderMark>   
                            <SliderTrack style={{opacity:'1'}}>
                                <SliderFilledTrack />
                            </SliderTrack>
                        {/* <SliderThumb /> */}
                    </Slider>
                </Box>
            </div>

            <div className='flex-container'>
                <StatGroup>
                    <Stat width='fit-content'>
                        <StatLabel>Regular Market Change</StatLabel>
                        <StatNumber>{priceSection.regularMarketChange.fmt}</StatNumber>
                        <StatHelpText>
                            <StatArrow type={priceSection.regularMarketChangePercent.raw >= 0 ? 'increase' : 'decrease'}/>
                            {priceSection.regularMarketChangePercent.fmt}
                        </StatHelpText>
                    
                    </Stat>
                </StatGroup>
            </div>

            <div style={{gap:'15px', marginBottom:'8px'}} className='flex-container'>
                {data.quoteSummary.result[0].summaryDetail.volume.fmt !== null && <p><u>Today&apos;s Volume</u><br/><b>{data.quoteSummary.result[0].summaryDetail.volume.fmt}</b></p>}
                {data.quoteSummary.result[0].summaryDetail.volume.fmt !== null && <Center height='50px'><Divider orientation='vertical' /></Center>}
                <p><u>10-day Daily Avg. Volume</u><br/><b>{priceSection.averageDailyVolume10Day.fmt}</b></p>
                <Center height='50px'><Divider orientation='vertical' /></Center>
                <p><u>3-month Daily Avg. Volume</u><br/><b>{priceSection.averageDailyVolume3Month.fmt}</b></p>
            </div>
            <div style={{gap:'15px', marginBottom:'8px'}} className='flex-container'>
                <p><u>50-day Price Avg.</u><br/><b>{data.quoteSummary.result[0].summaryDetail.fiftyDayAverage.fmt}</b></p>
                <Center height='50px'><Divider orientation='vertical' /></Center>
                <p><u>200-day Price Avg.</u><br/><b>{data.quoteSummary.result[0].summaryDetail.twoHundredDayAverage.fmt}</b></p>
            </div>
            </>
        </section>
    )
}