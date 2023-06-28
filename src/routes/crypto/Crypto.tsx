import ExchangeTool from "components/Currencies/ExchangeTool";
import { Card, CardHeader, CardBody, CardFooter, Heading, Box, Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'
import CryptoData from '../../components/Crypto/CryptoData';
import { MyContext } from "../../components/Context";
import {useEffect, useState, useContext} from 'react';

    //USD as base
    const cryptocurrencies:string[][] = [
        ["BTC-USD", "Bitcoin"],
        ["ETH-USD", "Ethereum"],
        ["BNB-USD", "Binance Coin"],
        ["DOGE-USD", "Dogecoin"],
        ["LTC-USD", "Litecoin"],
        ["XRP-USD", "XRP"],
        ["DOT-USD", "Polkadot"],
        ["BCH-USD", "Bitcoin Cash"],
        ["LINK-USD", "Chainlink"],
        ["XLM-USD", "Stellar"],
        ["FIL-USD", "Filecoin"],
        ["ADA-USD", "Cardano"],

    ]


export default function Crypto() {
    document.title = "Cryptocurrencies"

    const {cryptoIndex, changeCryptoIndex } = useContext(MyContext)!;

    // const { isOpen, onToggle } = useDisclosure()
    const storageIndex = sessionStorage.getItem('cryptoIndex') ? sessionStorage.getItem('cryptoIndex') : '0';

    function handleSaveTab(tab:string){
        window?.scrollTo({ top: 250, left: 0, behavior: 'smooth' });
        changeCryptoIndex(tab);
    }

    return (
        <>
            <main>
                <div style={{padding:'22px'}}>
                    <Tabs index={Number(storageIndex)} isLazy orientation='vertical'>
                        <TabList border={'none'}>
                        {cryptocurrencies.map(each => {
                            return (
                                <Tab onClick={() => handleSaveTab(cryptocurrencies.indexOf(each).toString())} _hover={{background: 'orange.100'}}  _selected={{background: 'orange.200'}}>
                                    <CryptoCard key={cryptocurrencies.indexOf(each)} cardData={each}/> 
                                </Tab>
                        )

                        })}
                        </TabList>

                        <TabPanels style={{margin:'0 18px', borderLeft:'black 1px solid'}}>
                            {cryptocurrencies.map(each => (
                                <TabPanel>
                                    <CryptoData cryptoData={each}/>
                                </TabPanel>

                            ))}

                        </TabPanels>
                    </Tabs>
                </div>
            </main>
            <div className="ad"></div>
        </>
    )
}

export function CryptoCard (props:any){
    const entry = props.cardData;
    return (
        <Card style={{width:'100%'}}>
            <CardBody>
                <Box style={{textAlign:'center'}}>

                    <Heading size='xs' textTransform='uppercase'>
                    {entry[0].split('-')[0].trim()}
                    </Heading>
                    <Text pt='2' fontSize='lg'>
                    {entry[1]}
                    {/* <p style={{fontSize:'11px', fontStyle:'italic'}}>Last Updated: {props.timestamp}</p> */}
                    </Text>
                    
                </Box>
            </CardBody>

        </Card>
    )
}