'use client';
import { FC, useEffect, useState } from "react";
import { Heading, Text, Button, Card, CardHeader, CardBody, CardFooter, SimpleGrid, SimpleGridProps } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js';
import { GetServerSideProps } from 'next';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import Loading from "./Loading";

//initial time as rendered on the server to avoid rehydratione errors

// const date = new Date();

interface MyComponentProps {
    currentTime: Date;
  }


export default function Locales ({currentTime} : MyComponentProps) {

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
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        
        
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)
        
        setIsClient(true);

        return () => {
            clearInterval(timer); 
            setIsClient(false);
        };
        //unmount operation

      }, [])



    return (
        <>
            <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'12px', }}>
            {localesArr.map(each => (
                <Card key={localesArr.indexOf(each)}  style={{textAlign:'center', maxWidth:'250px'}}>
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
                        <div id="clock-container" style={{textAlign:'center', padding:'5px 0', display:'flex', justifyContent:'center'}}>
                        {isClient === true ? 
                            <Clock value={time.toLocaleString(undefined, {timeZone: each[0], hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric'})}/>
                        
                            :
                            <Loading />
                        }
                        </div>
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
                        
            </div>

        </>
    )
}

export const getServerSideProps: GetServerSideProps<MyComponentProps> = async () => {
    const currentTime = new Date(); // Get the current time
  
    return {
      props: {
        currentTime,
      },
    };
  }  