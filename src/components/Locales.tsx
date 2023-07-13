import { FC, useEffect, useState, useContext } from "react";
import { Heading, Text, Button, Card, CardHeader, CardBody, CardFooter, SimpleGrid, SimpleGridProps } from '@chakra-ui/react'
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import Loading from "./Loading";
import { MyContext } from "./Context";
import {useNavigate} from 'react-router-dom';

//initial time as rendered on the server to avoid rehydratione errors

// const date = new Date();

interface MyComponentProps {
    currentTime: Date;
  }


export default function Locales ({currentTime} : MyComponentProps) {
    const navigate = useNavigate();
  const {tabIndex, changeTabIndex, indexIndex, changeIndexIndex} = useContext(MyContext)!;
    
    const localesMap = new Map();
    const localesPairs = [['Asia/Singapore', 'SGX'], ['Asia/Shanghai', 'SSE'], ['Asia/Hong_Kong', 'HKEX'] ,['Asia/Tokyo', 'TSE'], ['America/New_York', 'NYSE'], ['Europe/London', 'LSE'], ['Europe/Berlin', 'FWB']]
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

    function redirect(locale:any){
        if(locale === 'SGX'){
            changeTabIndex(1)
            localStorage.setItem('tabIndex', '1')

            changeIndexIndex(0)
            localStorage.setItem('indexIndex', '0')

            navigate('/routes/markets')
        }
        else if(locale === 'SSE'){
            changeTabIndex(1)
            localStorage.setItem('tabIndex', '1')

            changeIndexIndex(1)
            localStorage.setItem('indexIndex', '1')

            navigate('/routes/markets')
        }
        else if(locale === 'HKEX'){
            changeTabIndex(1)
            localStorage.setItem('tabIndex', '1')

            changeIndexIndex(3)
            localStorage.setItem('indexIndex', '3')

            navigate('/routes/markets')
        }
        else if(locale === 'TSE'){
            changeTabIndex(1)
            localStorage.setItem('tabIndex', '1')

            changeIndexIndex(5)
            localStorage.setItem('indexIndex', '5')

            navigate('/routes/markets')
        }
        else if(locale === 'NYSE'){
            changeTabIndex(1)
            localStorage.setItem('tabIndex', '1')

            changeIndexIndex(7)
            localStorage.setItem('indexIndex', '7')

            navigate('/routes/markets')
        }
        else if(locale === 'LSE'){
            changeTabIndex(1)
            localStorage.setItem('tabIndex', '1')

            changeIndexIndex(8)
            localStorage.setItem('indexIndex', '8')

            navigate('/routes/markets')
        }
        else if(locale === 'FSE'){
            changeTabIndex(1)
            localStorage.setItem('tabIndex', '1')

            changeIndexIndex(10)
            localStorage.setItem('indexIndex', '10')

            navigate('/routes/markets')
        }
    }

    const dateObj = new Date();
    // console.log(dateObj)
    
    const dayOfMonth = dateObj.getDate();

    const dayOfWeek: string = dateObj.toLocaleString('en-US', { weekday: 'long' })
    // .getDay();
    const month: string = dateObj.toLocaleString('en-US', { month: 'long' })

    const cardStyles = {backgroundColor:"rgba(255, 255, 244, 0.58)", boxShadow:" 0px 0px 7px 1px", maxWidth:'250px'}

    return (
        <>
            {/* <h2 className='date-h georgia' style={{flex:'3'}}>Today is {dayOfWeek} {month} {dayOfMonth}, {dateObj.getFullYear()}</h2> */}
            <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'18px', }}>
            {localesArr.slice(0,6).map(each => (
                <Card key={localesArr.indexOf(each)} style={cardStyles}>
                    <CardHeader textAlign='center'>
                        <Heading title={each[0].slice(each[0].indexOf('/')+1).trim().replace(/_/g, ' ') + " Stock Exchange"} onClick={() => redirect(each[1])} style={{cursor:'pointer'}} size='md' className="georgia">
                            {each[0].slice(each[0].indexOf('/')+1).trim().replace(/_/g, ' ')}
                        </Heading>
                        <p className='numbers'>
                            {(time.toLocaleString(undefined, {timeZone: each[0],
                                hour12: false,
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric',
                                }))}         
                        </p>
{/* 
                        {each[1] === 'TSE' &&
                            <p>
                            {(time.toLocaleString(undefined, {
                                    timeZone: each[0],
                                hour12: false,
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric',
                            })) < '9:00'
                                    ||

                               time.toLocaleString(undefined, {
                                    timeZone: each[0],
                                hour12: false,
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric',
                               }) > '15:00'
                                    
                            ?
                                "Closed"
                                :
                                'Open'
                            
                            }  
                        </p>} */}
                    </CardHeader>

                    <CardHeader  padding='0'>
                        <Text onClick={() => redirect(each[1])} title={each[0].slice(each[0].indexOf('/')+1).trim().replace(/_/g, ' ') + " Stock Exchange"} color='blue.600' _hover={{ color: 'blue.900' }} style={{cursor:'pointer', fontSize:'18px', width:'fit-content', margin:'auto'}}>
                                <b>{each[1]}</b>
                        </Text>
                    </CardHeader>
                    

                    <CardBody>
                        {/* <div id="clock-container" style={{textAlign:'center', padding:'5px 0', display:'flex', justifyContent:'center'}}>
                        {isClient === true ? 
                            <Clock value={time.toLocaleString(undefined, {timeZone: each[0], hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric'})}/>
                        
                            :
                            <Loading />
                        }
                        </div> */}
                        <Text style={{fontSize:"18px"}}>It is {time.toLocaleString('en-US', {timeZone: each[0], 
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