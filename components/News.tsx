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
    const [trends, setTrends] = useState<any>(null)

    
    const newsCategories = ['blockchain', 'earnings', 'ipo', 'mergers_and_acquisitions', 'financial_markets', 'economy_fiscal', 'economy_monetary', 'economy_macro', 'energy_transportation', 'finance', 'life_sciences', 'manufacturing', 'real_estate', 'retail_wholesale', 'technology']

    function capitalizeWord(word:string) {
        return word.replace(/\b\w/g, (match:string) => match.toUpperCase());
      }

      
      function saveArticles(topics:string){
          /// make this fetch conditional, on whether the localStorage is more or less than 24hrs old
        // const today = props.dateObj;
        // const monthDay = String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0');
    
        try {
            // ${today.getFullYear() + String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0') + 'T0130'}
            if (localStorage.getItem('al-newsData' + topics) === null) {
                axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=${topics}&time_from20230602=&limit=20&apikey=${process.env.avKey}`,
                    {headers: {
                        'Content-Type': 'application/json'
                    //      {
                    //     'X-RapidAPI-Key': process.env.msFinKey,
                    //     'X-RapidAPI-Host': process.env.msFinUrl
                    }
                    }
                )
                .then(response => {
                    console.log('Data not found in localStorage. Fetched from api')
                    console.log(response.data)
                    localStorage.setItem('al-newsData' + topics, JSON.stringify(response.data.feed))
                    setArticles(response.data.feed)
                    // console.log(today.getFullYear() + String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0'))
                })
        
            }
            else {
                const jsonArticles = localStorage.getItem('al-newsData' + topics);
                const parsedArt = jsonArticles ? JSON.parse(jsonArticles) : '';
                setArticles(parsedArt);
                console.log('articles fetched from localStorage.')
                console.log(parsedArt)
            }
        } catch (error) {
            console.error(error);
        }    
    }

    function saveTrend(type:string){
        const options = {
            method: 'GET',
            url: 'https://real-time-finance-data.p.rapidapi.com/market-trends',
            params: {
              trend_type: type,
              country: 'us',
              language: 'en'
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAKey,
                'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
            }
        };

        try {
            if(localStorage.getItem('trends'+ type) === null){
                axios.request(options)
                .then(response => {
                    console.log(response.data.data.trends)
                    localStorage.setItem('trends' + options.params.trend_type, JSON.stringify(response.data.data.trends))
                    setTrends(response.data.data.trends)
                })
            } else {
                const jsonTrends = localStorage.getItem('trends' + type);
                const parsedTrends = jsonTrends ? JSON.parse(jsonTrends) : '';
                setTrends(parsedTrends);
                console.log('trends fetched from localStorage.')
                console.log(parsedTrends)
            }
        } catch (error) {
            console.error(error)
        }
    }
////Move this function to a new component, to be mounted on global markets route parent comp.

    //call this app upon component mount to show blockchain tab panel by default
    useEffect(() => {
        saveArticles('blockchain');
        saveTrend('MARKET_INDEXES')        

    }, [])

    return (
        <>
        <Heading as='h2'>
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

// Function to delete the cache of a specific query
// const deleteQueryCache = () => {
//     queryCache.removeQueries('your-query-key');
//   };
  
//   // Schedule the cache deletion at 6:00 AM
//   const scheduleCacheDeletion = () => {
//     const now = new Date();
//     const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0);
  
//     const timeUntilDeletion = scheduledTime.getTime() - now.getTime();
//     setTimeout(() => {
//       deleteQueryCache();
//       scheduleCacheDeletion(); // Schedule the next cache deletion
//     }, timeUntilDeletion);
//   };
  
//   // Call the scheduling function to start deleting the cache
//   scheduleCacheDeletion();


