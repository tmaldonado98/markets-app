'use client';
import { FC, useEffect, useState } from "react";
import { Heading, Text, Button, Card, CardHeader, CardBody, CardFooter, SimpleGrid, SimpleGridProps } from '@chakra-ui/react'
// import Link from "next/link";
import { Link } from '@chakra-ui/next-js';
// import Clock from 'react-clock';

//initial time as rendered on the server to avoid rehydratione errors

// const date = new Date();

export default function Locales () {

    // const locales = ['America/New_York', 'Europe/London','Europe/Berlin', 'Asia/Singapore', 'Asia/Shanghai', 'Asia/Tokyo']

    const localesMap = new Map();
    const localesPairs = [['Asia/Singapore', 'SGX'], ['Asia/Shanghai', 'SSE'], ['Asia/Tokyo', 'TSE'], ['America/New_York', 'NYSE'], ['Europe/London', 'LSE'], ['Europe/Berlin', 'FWB']]
    localesPairs.forEach(([key, value]) => {
        localesMap.set(key, value);

    })
    // console.log(localesMap);
    
    const localesArr = Array.from(localesMap);
    // console.log(localesArr);
    
    const [time, setTime] = useState(new Date());
    // const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        
        // setIsClient(true);
        
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)
        
        return () => clearInterval(timer);
        //unmount operation

      }, [])



    return (
        <>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
            {localesArr.map(each => (
                <Card key={localesArr.indexOf(each)}  style={{textAlign:'center'}}>
                    <CardHeader>
                        <Heading size='md'>
                            {each[0].slice(each[0].indexOf('/')+1).trim().replace(/_/g, ' ')}
                        </Heading>
                        <Heading size='md'>
                            {(time.toLocaleString(undefined, {timeZone: each[0],
                                hour12: false,
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric',
                                }))}         
                        </Heading>

                    </CardHeader>

                    <CardHeader style={{padding:'0'}}>
                        <Text>
                            <Link title={each[0].slice(each[0].indexOf('/')+1).trim().replace(/_/g, ' ') + " Stock Exchange"} href='/' color='blue.600' _hover={{ color: 'blue.900' }}>
                                <b>{each[1]}</b>
                            </Link>
                        </Text>
                        {/* Make them into Link components with props to mount appropriate market tab upon routing */}
                    </CardHeader>

                    <CardBody>
                        <Text>It is {time.toLocaleString('en-US', {timeZone: each[0], 
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                            })} in <b>{each[0].slice(each[0].indexOf('/')+1).trim().replace(/_/g, ' ')}</b>
                        </Text>
                    </CardBody>

                    {/* <p key={locales.indexOf(each)}>
                        

                    </p> */}
                </Card>

            ))}
            </SimpleGrid>

        </>
    )
}