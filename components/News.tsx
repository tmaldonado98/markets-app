import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image, Stack, Heading, Text, Button, Card, CardHeader, CardBody, CardFooter, SimpleGrid } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'


export default function News(){  
    
    const newsCategories = ['blockchain', 'earnings', 'ipo', 'mergers_and_acquisitions', 'financial_markets', 'economy_fiscal', 'economy_monetary', 'economy_macro', 'energy_transportation', 'finance', 'life_sciences', 'manufacturing', 'real_estate', 'retail_wholesale', 'technology']

    function capitalizeWord(word:string) {
        return word.replace(/\b\w/g, (match:string) => match.toUpperCase());
      }



    return (
        <>
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
                        <TabPanel key={newsCategories.indexOf(each)}>
                            <Articles />
                        </TabPanel>
                    )
                })}
            </TabPanels>
        </Tabs>

    </>
    )
}


export function Articles () {

    const [articles, setArticles] = useState<any>(null)

    useEffect(() => {   
        console.log(process.env.avKey);
/// make this fetch conditional, on whether the localStorage is more or less than 24hrs old
        if (localStorage.getItem('al-newsData') === null) {
            try {
                const today = new Date();
                axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&time_from=${today.getFullYear() + String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0') + 'T0130'}&apikey=${process.env.avKey}`,
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
                    localStorage.setItem('al-newsData', JSON.stringify(response.data))
                    setArticles(response.data)
                    console.log(today.getFullYear() + String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0'))
                })
            } catch (error) {
                console.error(error);
            }            
        }
        else {
            const jsonArticles = localStorage.getItem('al-newsData');
            const parsedArt = jsonArticles ? JSON.parse(jsonArticles) : '';
            setArticles(parsedArt);
            console.log('data fetched from localStorage.')
        }
    
    }, [])

    return (
        
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
        {Array.isArray(articles) === true ? articles.map((each:any) =>{ 
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
                            <a target='_blank' rel='noopener noreferrer' href={each.Href} title='Click to open article in new tab'>{each.Title}</a>
                        </Heading>
                        {/* <Heading size='sm'>
                            {each.AuthorName}
                        </Heading> */}

                        <Text py='2'>{new Date(each.PublicationTime).toLocaleString('en-US')}</Text>
                    </CardBody>

                    {/* <CardFooter>
                    <Button variant='solid' colorScheme='blue'>
                        Buy Latte
                    </Button>
                    </CardFooter> */}
                </Stack>
            </Card>
            )
        })
        :
        'hi'
        }
    </SimpleGrid>
    )
}