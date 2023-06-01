'use client';
import Link from "next/link"
import Head from "next/head"
// import './index.module.css';

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
                <Tab>Tab 1</Tab>
                <Tab>Tab 2</Tab>
            </TabList>
            <TabPanels>
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