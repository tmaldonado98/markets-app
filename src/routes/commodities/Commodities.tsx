import { Tabs, TabList, TabPanels, Tab, TabPanel, Heading } from '@chakra-ui/react'
import CommPanels from '../../components/Commodities/CommPanels';
import {useEffect} from 'react';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import Loading from '../../components/Loading';
import {useState} from 'react';
import '../../styles/globals.css';

export default function Commodities(){
    document.title = "Global Commodities";
    const commodities = [
        "Crude Oil (WTI)",
        "Crude Oil (Brent)",
        "Natural Gas",
        "Copper",
        "Aluminum",
        "Wheat",
        "Corn",
        "Cotton",
        "Sugar",
        "Coffee",
    ]

    useEffect(() => {
        window.scrollTo({ top: 220, left: 0, behavior: 'smooth' });
    }, [])

// getCommodities(Array.isArray(each) ? "WTI" : each)}>{commodities.indexOf(each) === 0 ? "Crude Oil (WTI)" : each
    return(
            <main className='min-h-screen'>
                <Heading size={'lg'} style={{textAlign:'center', padding:'14px 14px 0 14px'}} className='georgia'>Global Commodity Prices</Heading>
                <Tabs isLazy style={{display:'flex', flexWrap:"wrap", margin:'8px auto', width:'95%'}}  variant='soft-rounded' className='py-6' >
                    {commodities.map(each =>(
                        <TabList  style={{flexWrap:'wrap'}}>    
                            <Tab style={{fontSize:'20px'}} _selected={{ color: 'white', bg: 'blue.400', fontWeight:'700'}} _hover={{ fontWeight:'700' , bg: 'blue.100', }} key={commodities.indexOf(each)}>{commodities.indexOf(each) === 0 ? "Crude Oil (WTI)" : each}</Tab>
                        </TabList>
                    ))}
{/*      onClick={() => getCommodities(each)}*/}

                    <TabPanels>
                        {commodities.map(each =>(
                            <TabPanel key={commodities.indexOf(each)}>
                                {<CommPanels commodity={each} />}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
                <div className='ad'>ad here</div>
            </main>

    )
}