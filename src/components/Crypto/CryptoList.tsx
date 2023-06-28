


import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import Loading from "../Loading";
import { Card, CardHeader, CardBody, CardFooter, Heading, Box, Text } from '@chakra-ui/react'
import { MyContext } from "../Context";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import CryptoData from '../../components/Crypto/CryptoData';
  
export default function CryptoList(){
    // const {server} = useContext(MyContext)!;

    //USD as base
    const cryptocurrencies:string[][] = [
        ["BTC", "Bitcoin"],
        ["ETH", "Ethereum"],

    ]

    // return (
    //     <div style={{flex:'1', padding:'0 65px', display:'flex', flexDirection:'column', gap:'5px'}}>
    //         <Heading size={'md'} style={{textAlign:'center'}}>Currency Exchange Rates</Heading>
    //         <p><b>Base USD</b></p>
    //         {cryptocurrencies.map(each => {
    //             return (
    //                 <Tabs orientation="vertical">
    //                     <TabList>
    //                         <Tab>
    //                             <CryptoCard key={cryptocurrencies.indexOf(each)} cardData={each}/> 
    //                         </Tab>
    //                     </TabList>

    //                     <TabPanels>
    //                         <TabPanel>
    //                             <CryptoData cryptoData={each}/>
    //                         </TabPanel>
    //                     </TabPanels>

    //                 </Tabs>
    //             )

    //         })}
    //     </div>
    //     );
}

export function CryptoCard (props:any){
    const entry = props.cardData;
    return (
        <Card>
            <CardBody>
                <Box style={{textAlign:'center'}}>

                    <Heading size='xs' textTransform='uppercase'>
                    {entry[0]}
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