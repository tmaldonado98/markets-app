import ExchangeTool from "components/Currencies/ExchangeTool";
import { Card, CardHeader, CardBody, CardFooter, Heading, Box, Text, Button } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'
import CryptoData from '../../components/Crypto/CryptoData';
import { MyContext } from "../../components/Context";
import {useEffect, useState, useContext} from 'react';
import { MdOutlineDone } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { BsPinFill } from "react-icons/bs";
import '../../styles/globals.css';
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

    const {cryptoIndex, changeCryptoIndex, update, provokeUpdate } = useContext(MyContext)!;

    // const { isOpen, onToggle } = useDisclosure()
    const storageIndex = sessionStorage.getItem('cryptoIndex') ? sessionStorage.getItem('cryptoIndex') : '0';

    function handleSaveTab(tab:string){
        window?.scrollTo({ top: 250, left: 0, behavior: 'smooth' });
        changeCryptoIndex(tab);
    }

    useEffect(() => {
        window?.scrollTo({
            top: 0,
            left: 0,
            behavior:'smooth'
        })
    }, [])

    return (
        <>
            <main>
                <div style={{padding:'22px'}}>
                    <Tabs index={Number(storageIndex)} isLazy orientation='vertical'>
                        <TabList border={'none'}>
                        {cryptocurrencies.map(each => {
                            return (
                                <Tab key={cryptocurrencies.indexOf(each)} onClick={() => handleSaveTab(cryptocurrencies.indexOf(each).toString())}
                                    _hover={{ background: 'orange.100' }} _selected={{ background: 'orange.200' }}
                                    style={{margin:"5px 0"}}
                                >
                                    <CryptoCard cardData={each} /> 
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
                                    {/* **FOR LATER RELEASE: CHART SHOWING HISTORICAL CURRENCY DATA */}
                        </TabPanels>
                    </Tabs>
                </div>
            </main>
            {/* <div className="ad"></div> */}
        </>
    )
}

export function CryptoCard (props:any){
    const entry = props.cardData;

    const { update, provokeUpdate, cryptoIndex, changeCryptoIndex, handlePin, sendDelete } = useContext(MyContext)!;
    
    const pinnedCryptoItems = localStorage.getItem('pinnedCryptoItems') ? localStorage.getItem('pinnedCryptoItems')! : '';
    const parsedPinnedCrypto = pinnedCryptoItems !== '' ? JSON.parse(pinnedCryptoItems) : '';   
    // console.log(parsedPinnedCrypto)

    const [del, setDel] = useState(false);

    useEffect(() => {
        const pinnedCryptoItems = localStorage.getItem('pinnedCryptoItems') ? localStorage.getItem('pinnedCryptoItems')! : '';
        const parsedPinnedCrypto = pinnedCryptoItems !== '' ? JSON.parse(pinnedCryptoItems) : '';   
        // console.log(parsedPinnedCrypto)
    }, [update])

    return (
        <Card style={{width:'100%'}} className="georgia">
            <CardBody>
                <Box style={{textAlign:'center', gap:'12px', display:"flex", alignItems:"center", justifyContent:"space-evenly", width:'100%'}}>
                    <div style={{display:'flex', flexDirection:"column", width:"100%"}} className="georgia">
                        <Heading size='xs' textTransform='uppercase'>
                            {entry[0].split('-')[0].trim()}
                        </Heading>
                        <Text pt='2' fontSize='lg'>
                            {entry[1]}
                        {/* <p style={{fontSize:'11px', fontStyle:'italic'}}>Last Updated: {props.timestamp}</p> */}
                        </Text>
                    </div>
                        
                    <div style={{display:'flex', justifyContent:"center"}}>
                        {parsedPinnedCrypto.includes(entry[0].split('-')[0].trim() + ' ' + entry[1] + '@#pinnedCryptoItems^3,' + entry[1]) ?
                            <span style={{display:'flex', flexDirection:'column', width:'fit-content', textAlign:'center'}}>
                                <Button onMouseEnter={() => setDel(true)}  onMouseLeave={() => setDel(false)} style={{width:'fit-content', margin:'0 auto'}} variant='ghost' onClick={() => sendDelete(entry[0].split('-')[0].trim() + ' ' + entry[1] + '@#pinnedCryptoItems^3,' + entry[1], 'pinnedCryptoItems')}>{del === false ? <MdOutlineDone/> : <TiDelete/>}</Button>
                                {/* Pinned To Home */}
                            </span>
                            :
                            <span style={{display:'flex', flexDirection:'column', width:'fit-content', textAlign:'center'}}>
                                <Button style={{width:'fit-content', margin:'0 auto'}} variant='ghost' onClick={() => handlePin(entry[0].split('-')[0].trim() + ' ' + entry[1] + '@#pinnedCryptoItems', [3, entry[1]], 'pinnedCryptoItems')}><BsPinFill/></Button>
                                {/* Pin */}
                            </span>
                        }
                    </div>

                    
                </Box>
            </CardBody>

        </Card>
    )
}