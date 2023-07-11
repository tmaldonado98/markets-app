import { Tabs, TabList, TabPanels, Tab, TabPanel, Heading } from '@chakra-ui/react'
import CommPanels from '../../components/Commodities/CommPanels';
import {useContext, useEffect} from 'react';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import Loading from '../../components/Loading';
import {useState} from 'react';
import '../../styles/globals.css';
import { MyContext } from '../../components/Context';

export default function Commodities(){
    document.title = "Global Commodities";

    const {changeCommIndex, update, handlePin, sendDelete} = useContext(MyContext)!;

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
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [])

    const storageIndex = sessionStorage.getItem('commIndex') ? sessionStorage.getItem('commIndex') : '0';
    
    function handleSaveTab(tab:string){
        window?.scrollTo({ top: 250, left: 0, behavior: 'smooth' });
        changeCommIndex(tab);
    }
// , justifyContent:'center'   , flexWrap:"wrap"
    return(
        <main className='min-h-screen'>
            {/* <Heading size={'lg'} style={{textAlign:'center', padding:'14px 14px 0 14px'}} className='georgia'>Global Commodity Prices</Heading> */}
            <Tabs index={Number(storageIndex)} isLazy style={{display:'flex', margin:'8px auto', width:'95%'}}  variant='soft-rounded' className='py-6' orientation='vertical'>
                <div>
                {commodities.map(each => (
                    <TabList style={{margin:'5px 0'}}>    
                        <Tab onClick={() => handleSaveTab(commodities.indexOf(each).toString())} style={{fontSize:'20px'}} _selected={{ color: 'white', bg: 'blue.400', fontWeight:'700'}} _hover={{ fontWeight:'700' , bg: 'blue.100', }} key={commodities.indexOf(each)}>{commodities.indexOf(each) === 0 ? "Crude Oil (WTI)" : each}</Tab>
                    </TabList>
                ))}
                </div>

                <TabPanels style={{margin:'0 18px', borderLeft:'black 1px solid'}}>
                    {commodities.map(each =>(
                        <TabPanel key={commodities.indexOf(each)}>
                            {<CommPanels commodity={each} />}
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        
            {/* <div className='ad'></div> */}
        </main>

    )
}