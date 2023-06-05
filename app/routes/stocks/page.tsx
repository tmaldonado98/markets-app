'use client';
import Link from "next/link"
import Head from "next/head"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Trends from "../../../components/Trends";
import Loading from "../../../components/Loading";

export default function Stocks(){


    return(
        <>
        <head>
            <title>Stock Market Data</title>
        </head>
        <header>
            {/* <Link href='/'>
                Home
            </Link> */}
            <h1>Stock Data here</h1>
        </header>
        <main className="min-h-screen">
        <Tabs variant='soft-rounded' colorScheme='green'>
            <TabList>
                <Tab>Stock Markets</Tab>
                <Tab>Search Stocks</Tab>
                <Tab>Pinned Tickers</Tab>
                <Tab>Latest Trends</Tab>

            </TabList>
            {/* Instead of making a tab for pinned, just make it into a component put to the left side */}
            <TabPanels>
                <TabPanel>
                    <p>Your Pinned Tickers</p>
                </TabPanel>
                <TabPanel>
                    <p>one!</p>
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>

                <TabPanel>
                    <div className='news-cont'>
                        <h1>Latest Trends</h1>
                    </div>
                </TabPanel>
            </TabPanels>
        </Tabs>
        </main>
        </>

    )
}