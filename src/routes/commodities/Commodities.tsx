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
        ["Crude Oil (WTI)", "West Texas Intermediate"],
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

    const [prepare, setPrepare] = useState('');

    const [commodity, setCommodity] = useState('WTI');

    // useEffect(() => {
    //     refetch();
    // }, [commodity])

    async function getCommodities(){
            const response = await axios.get(`https://www.alphavantage.co/query?function=${commodity}&interval=monthly&apikey=${process.env.avKey}`)
            return response.data;

        }

    const {data, isLoading, isError, error, refetch} = useQuery(['commodities' ], getCommodities, {
            refetchOnWindowFocus: false,
            staleTime: 6 * 60 * 60 * 1000,
    })


    function handleSettingComm(commodity:string){
        if (commodity === "Crude Oil (Brent)") {
            setCommodity("BRENT")
        }
        else if (commodity === "Natural Gas") {
            setCommodity("NATURAL_GAS")
        }
        else {
            setCommodity(commodity.toUpperCase())
        }

        refetch();
    }


    if(isLoading){
        return <div><Loading/></div>
    }

    if(isError){
        return <div><p>An error has occurred. Please try again.</p><Loading/></div>
    }

// getCommodities(Array.isArray(each) ? "WTI" : each)}>{commodities.indexOf(each) === 0 ? "Crude Oil (WTI)" : each
    return(
        <>
            <h1>Global Commodities Prices</h1>
            <main className='min-h-screen'>
                <Tabs style={{flexWrap:"wrap"}}>
                    <TabList>
                        {commodities.map(each =>(
                            
                            <Tab onClick={() => handleSettingComm(Array.isArray(each) ? "WTI" : each)}>{commodities.indexOf(each) === 0 ? "Crude Oil (WTI)" : each}</Tab>
                        ))}
                    </TabList>


                    <TabPanels>
                        {commodities.map((each) =>(
                        <TabPanel key={commodities.indexOf(each)}>
                            {data !== undefined ? <CommPanels tabData={data} />  : <Loading/> }
                        </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </main>
        </>

    )
}