'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image, Stack, Heading, Text, Button, Card, CardHeader, CardBody, CardFooter, SimpleGrid } from '@chakra-ui/react'
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { afterEach } from 'node:test';
import { arrayBuffer } from 'stream/consumers';
import Loading from './Loading';


export default function News(props:any){  
    const [articles, setArticles] = useState<any>(null)
    const [artLimit, setArtLimit] = useState(false);
    
    const newsCategories = ['blockchain', 'earnings', 'ipo', 'mergers_and_acquisitions', 'financial_markets', 'economy_fiscal', 'economy_monetary', 'economy_macro', 'energy_transportation', 'finance', 'life_sciences', 'manufacturing', 'real_estate', 'retail_wholesale', 'technology']

    function capitalizeWord(word:string) {
        return word.replace(/\b\w/g, (match:string) => match.toUpperCase());
      }

      

      function saveArticles(topics:string){

        // const monthDay = String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0');
        
        /////Pending TEST!!
        // const yearMonthDay = today.getFullYear() + String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0') + 'T0130';
        const key = 'al-newsData' + topics;
        const timestamp = Date.now();
        const timestampKey = `${timestamp}_${key}`;

            if(localStorage.getItem(key) !== null){
                const currentDate = new Date();
                const sixAMToday = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  currentDate.getDate(),
                  6,
                  0,
                  0
                );
                const sixPMToday = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate(),
                    18,
                    0,
                    0
                  );
                  const midnight = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate(),
                    0,
                    0,
                    0
                  );
        

                for (let i = 0; i < localStorage.length; i++) {
                    const storageItem:string | null = localStorage.key(i);
                    
                    if (storageItem && storageItem.includes('_')) {
                        const parsedTimestamp = parseInt(localStorage.getItem(storageItem)!, 10);
                        
                        if (parsedTimestamp < sixAMToday.getTime()) {
                            localStorage.removeItem(storageItem);
                            storageItem.includes('_') && localStorage.removeItem(storageItem);
                            fetchArticles(topics, key, timestamp, timestampKey);
                        } 
                        ////if cache timestamp is not before 6AM today, then
                        else if (currentDate.getTime() >= sixPMToday.getTime() && parsedTimestamp < sixPMToday.getTime() && currentDate.getTime() < midnight.getTime()) {    
                            localStorage.removeItem(storageItem);
                            storageItem.includes('_') && localStorage.removeItem(storageItem);
                            fetchArticles(topics, key, timestamp, timestampKey);
                        }
                        else {
                            const jsonArticles = localStorage.getItem(key);
                            const parsedArt = jsonArticles ? JSON.parse(jsonArticles) : '';
                            setArticles(parsedArt);
                            console.log('articles fetched from localStorage.')
                            console.log(parsedArt)
                        }
                    }
                }
            }
                    ///if localStorage item's timestamp is from before 6AM today, articles from that category will be deleted and re-fetched once. 
                    ///If it is 6PM or later today, and before midnight, then articles from that category will be deleted and re-fetched once. 

            else if (localStorage.getItem(key) === null) {
                fetchArticles(topics, key, timestamp, timestampKey);
        
            }  
        }

    function fetchArticles(data:string, key:string, timestamp:number, timestampKey:string){
        //change timestamp for apicall time_from
        const currentDate = new Date();
        const sixAMToday = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          6,
          0,
          0
        );
        const midnight = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            0,
            0,
            0
          );

        if(timestamp >= midnight.getTime() && timestamp < sixAMToday.getTime()){
            return false;
        }
        else {
            axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=${data}&time_from20230602=&limit=20&apikey=${process.env.avKey}`,
                        {headers: {
                            'Content-Type': 'application/json'
                        }}
                    )
                    .then(response => {
                        console.log('Articles not found in localStorage. Fetched from api and stored at ' + timestamp)
                        console.log(response.data)
                        ///Checks that api returns feed. If doesn't return array, then leave previously stored data.
                        if (Array.isArray(response.data.feed)) {
                            localStorage.setItem(key, JSON.stringify(response.data.feed))
                            localStorage.setItem(timestampKey, timestamp.toString())
                            setArticles(response.data.feed)
                        }
                        else if(!response.data.feed){
                            setArtLimit(true);
                            setArticles(null)
                        }
                        // console.log(today.getFullYear() + String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0'))
                    })
            }
      }


    //call this app upon component mount to show blockchain tab panel by default
    useEffect(() => {
        saveArticles('blockchain');
        // saveTrend('MARKET_INDEXES')        

    }, [])

    return (
        <>
        <Heading as='h2' className='georgia'>
            News Categories
        </Heading>
        <Tabs isLazy variant='enclosed' className='py-6'>
            <TabList mb='1em' style={{flexWrap:'wrap'}}>
                {newsCategories.map((each:string) => {
                    return (
                        <Tab onClick={() => saveArticles(each)} style={{flex:'2'}} _selected={{ color: 'white', bg: 'blue.400', fontWeight:'700'}} _hover={{ fontWeight:'700' , bg: 'blue.100', }} key={newsCategories.indexOf(each)}>
                                                        
                            {each === 'ipo' ? each.toUpperCase() : each.includes('economy') ? each.trim().replace(/_/g, ': ').replace(/\b\w+\b/g, capitalizeWord) : each.trim().replace(/_/g, ' ').replace(/\b\w+\b/g, capitalizeWord)}
                        </Tab>
                    )
                })}
            </TabList>
            <TabPanels>
                {newsCategories.map((each:string) => {
                    return (
                        <TabPanel key={newsCategories.indexOf(each)}>
                            {articles !== null ? <Articles articles={articles}/> : <Loading/> }
                            {artLimit === true && articles === null && (
                                <>
                                    {/* <Loading/> */}
                                    <Heading as='h2'>Please Try Again In A Minute</Heading>
                                </>
                            )}
                        </TabPanel>
                    )
                })}
            </TabPanels>
        </Tabs>

    </>
    )
}


export function Articles (props:any) {


    return (
        // <Box>
            <Tabs>
                <TabList style={{width:'fit-content'}}>
                    <Tab>1-10</Tab>
                    <Tab>11-20</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <SimpleGrid spacing={5} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
                            {props.articles.length > 0 ? props.articles.slice(0, 9).map((each:any) =>{ 
                                return (       
                                    <Card
                                        key={props.articles.indexOf(each)}
                                        direction={{ base: 'column', sm: 'row' }}
                                        overflow='hidden'
                                        variant='outline'
                                        >
                                        <Image
                                            objectFit='cover'
                                            maxW={{ base: '100%', sm: '200px' }}
                                            src={each.banner_image !== '' ? each.banner_image : 'https://birminghamchristian.com/wp-content/uploads/2016/03/stock-market-graph.jpg'}
                                            alt={each.title}
                                        />
                                
                                        <Stack>
                                            <CardBody>
                                                <Heading size='md' _hover={{ color: 'blue.600'}}>
                                                    <a target='_blank' rel='noopener noreferrer' href={each.url} title={each.url}>{each.title}</a>
                                                </Heading>
                                
                                                <Text><a href={each.url} title={each.url}>{each.summary}</a></Text>
                                                
                                                <Text><a href={each.source_domain} title={each.source_domain} target='_blank' rel='noopener noreferrer'><b>{each.source}</b></a></Text>
                                                {/* <Text py='2'>{(each.PublicationTime).toLocaleString('en-US')}</Text> */}
                                            </CardBody>
                                        </Stack>
                                    </Card>
                                    )
                                })
                            :
                            ''
                            }
                        </SimpleGrid>
                    </TabPanel>

                    <TabPanel>
                        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
                            {props.articles.length > 0 ? props.articles.slice(10, 19).map((each:any) =>{ 
                            return (       
                                <Card
                                    key={props.articles.indexOf(each)}
                                    direction={{ base: 'column', sm: 'row' }}
                                    overflow='hidden'
                                    variant='outline'
                                    >
                                    <Image
                                        objectFit='cover'
                                        maxW={{ base: '100%', sm: '200px' }}
                                        src={each.banner_image !== '' ? each.banner_image : 'https://birminghamchristian.com/wp-content/uploads/2016/03/stock-market-graph.jpg'}
                                        alt={each.title}
                                    />
                            
                                    <Stack>
                                        <CardBody>
                                            <Heading size='md' _hover={{ color: 'blue.600'}}>
                                                <a target='_blank' rel='noopener noreferrer' href={each.url} title={each.url}>{each.title}</a>
                                            </Heading>
                            
                                            <Text><a href={each.url} title={each.url}>{each.summary}</a></Text>
                                            
                                            <Text><a href={each.source_domain} title={each.source_domain} target='_blank' rel='noopener noreferrer'><b>{each.source}</b></a></Text>
                                            {/* <Text py='2'>{(each.PublicationTime).toLocaleString('en-US')}</Text> */}
                                        </CardBody>
                                    </Stack>
                                </Card>
                                )
                            })
                            :
                            ''
                            }
                        </SimpleGrid>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        // </Box>

        
    )
}

