'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image, Stack, Heading, Text, Button, Card, CardHeader, CardBody, CardFooter, SimpleGrid } from '@chakra-ui/react'
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { afterEach } from 'node:test';


export default function News(){  
    const [articles, setArticles] = useState<any>(null)
    
    const newsCategories = ['blockchain', 'earnings', 'ipo', 'mergers_and_acquisitions', 'financial_markets', 'economy_fiscal', 'economy_monetary', 'economy_macro', 'energy_transportation', 'finance', 'life_sciences', 'manufacturing', 'real_estate', 'retail_wholesale', 'technology']

    function capitalizeWord(word:string) {
        return word.replace(/\b\w/g, (match:string) => match.toUpperCase());
      }

      
      function saveArticles(topics:string){
          /// make this fetch conditional, on whether the localStorage is more or less than 24hrs old
        const today = new Date();
        // const monthDay = String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0');
    
        try {
            
            if (localStorage.getItem('al-newsData' + topics) === null) {
                axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=${topics}&time_from=${today.getFullYear() + String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0') + 'T0130'}&limit=20&apikey=${process.env.avKey}`,
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
                console.log('data fetched from localStorage.')
                console.log(jsonArticles)
            }
        } catch (error) {
            console.error(error);
        }    
    }


    return (
        <>
        <Heading as='h2'>
            News Categories
        </Heading>
        <Tabs isLazy variant='enclosed' className='py-6'>
            <TabList mb='1em' style={{flexWrap:'wrap'}}>
                {newsCategories.map((each:string) => {
                    return (
                        <Tab style={{flex:'2'}} _selected={{ color: 'white', bg: 'blue.400' }} key={newsCategories.indexOf(each)}>
                            
                            {each === 'ipo' ? each.toUpperCase() : each.trim().replace(/_/g, ' ').replace(/\b\w+\b/g, capitalizeWord)}
                        </Tab>
                    )
                })}
            </TabList>
            <TabPanels>
                {newsCategories.map((each:string) => {
                    return (
                        <TabPanel key={newsCategories.indexOf(each)} onClick={() => saveArticles(each)}>
                            {articles !== null && <Articles props={articles}/>}
                        </TabPanel>
                    )
                })}
            </TabPanels>
        </Tabs>

    </>
    )
}


export function Articles (articles:any) {


    return (
        <Box>
            <Tabs>
                <Tab>1-10</Tab>
                <Tab>11-20</Tab>

                <TabPanels>
                    <TabPanel>
                        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
                            {Array.isArray(articles) === true ? articles.slice(0, 9).map((each:any) =>{ 
                                return (       
                                <Card
                                    key={articles.indexOf(each)}
                                    direction={{ base: 'column', sm: 'row' }}
                                    overflow='hidden'
                                    variant='outline'
                                    >
                                    <Image
                                        objectFit='cover'
                                        maxW={{ base: '100%', sm: '200px' }}
                                        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                                        alt='Caffe Latte'
                                    />

                                    <Stack>
                                        <CardBody>
                                            <Heading size='md'>
                                                <a target='_blank' rel='noopener noreferrer' href={each.url} title='Click to open article in new tab'>{each.Title}</a>
                                            </Heading>
                                            
                                            <Text><a href={each.source_domain} target='_blank' rel='noopener noreferrer'>{each.source}</a></Text>
                                            <Text py='2'>{(each.PublicationTime).toLocaleString('en-US')}</Text>
                                        </CardBody>
                                    </Stack>
                                </Card>
                                )
                            })
                            :
                            'hi'
                            }
                        </SimpleGrid>
                    </TabPanel>

                    <TabPanel>
                        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
                            {Array.isArray(articles) === true ? articles.slice(10, 19).map((each:any) =>{ 
                            return (       
                                <Card
                                    key={articles.indexOf(each)}
                                    direction={{ base: 'column', sm: 'row' }}
                                    overflow='hidden'
                                    variant='outline'
                                    >
                                    <Image
                                        objectFit='cover'
                                        maxW={{ base: '100%', sm: '200px' }}
                                        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                                        alt='Caffe Latte'
                                    />

                                    <Stack>
                                        <CardBody>
                                            <Heading size='md'>
                                                <a target='_blank' rel='noopener noreferrer' href={each.url} title='Click to open article in new tab'>{each.Title}</a>
                                            </Heading>
                                            
                                            <Text><a href={each.source_domain} target='_blank' rel='noopener noreferrer'>{each.source}</a></Text>
                                            <Text py='2'>{(each.PublicationTime).toLocaleString('en-US')}</Text>
                                        </CardBody>
                                    </Stack>
                                </Card>
                                )                            })
                            :
                            'hi'
                            }
                        </SimpleGrid>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>

        
    )
}