import { Tabs, TabList, TabPanels, Tab, TabPanel, Heading } from '@chakra-ui/react'
import CommPanels from '../../components/Commodities/CommPanels';
import {useEffect} from 'react';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import Loading from '../../components/Loading';
import {useState} from 'react';

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
        "Global Commodities Index",
    ]


// getCommodities(Array.isArray(each) ? "WTI" : each)}>{commodities.indexOf(each) === 0 ? "Crude Oil (WTI)" : each
    return(
        <>
            <h1>Global Commodities Prices</h1>
            <main className='min-h-screen'>
                <Tabs isLazy style={{display:'flex', flexWrap:"wrap"}} variant='enclosed-colored' >
                    {commodities.map(each =>(
                        <TabList  style={{flexWrap:'wrap'}}>    
                            <Tab key={commodities.indexOf(each)}>{commodities.indexOf(each) === 0 ? "Crude Oil (WTI)" : each}</Tab>
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
            </main>
        </>

    )
}