'use client';
import Link from "next/link"
import Head from "next/head"
import Trends from "../../../components/Trends";
import Loading from "../../../components/Loading";
import './stocks.css';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Pinned from "../../../components/Pinned";
import SearchStocks from "../../../components/Search";
import MarketsChart from "../../../components/Markets/MarketsChart";


export default function Stocks(){

///save tab indexes to sessionstorage. no context needed. 

    return(
        <>
            <head>
                <title>Global Markets</title>
            </head>
            <aside>
                <div className="ad">
                    Ad section here
                </div>
            </aside>
            <nav>
                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList style={{borderBottom:'5px solid black', justifyContent:'center', padding:'1rem'}}>
                        <Tab>
                            Global Stock Markets
                        </Tab>
                        <Tab>
                                Search Stocks
                        </Tab>
                        <Tab>
                                Pinned Tickers
                        </Tab>
                        <Tab>
                                Latest Trends
                        </Tab>
                    </TabList>
                    
                    <TabPanels>
                        <TabPanel>
                            <MarketsChart/>
                        </TabPanel>
                        <TabPanel>
                            <SearchStocks/>
                        </TabPanel>
                        <TabPanel>
                            <Pinned/>
                        </TabPanel>
                        <TabPanel>
                            <Trends/>
                        </TabPanel>
                    </TabPanels>

                </Tabs>
            </nav>
            <aside>
                <div className="ad">
                    Ad section here
                </div>
            </aside>
        </>

    )
}