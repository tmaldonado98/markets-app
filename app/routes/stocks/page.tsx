'use client';
import Link from "next/link"
import Head from "next/head"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

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
                <Tab>Pinned</Tab>
                <Tab>Tab 1</Tab>
                <Tab>Tab 2</Tab>
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
            </TabPanels>
        </Tabs>
        </main>
        </>

    )
}