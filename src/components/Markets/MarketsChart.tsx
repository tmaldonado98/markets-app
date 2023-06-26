import { Tabs, TabList, TabPanels, Tab, TabPanel, Heading } from '@chakra-ui/react'
import {Chart} from './Chart';
import '../../styles/globals.css';
import { MyContext } from '../Context';
import { useContext, useState, useEffect } from 'react';

export default function MarketsChart(){
    document.title = "Stock Markets"
    const markets = [
        [['Singapore Exchange', 'SGX'], ['FTSE Straits Times Index (FTSE STI)']], 
        [['Shanghai Stock Exchange', 'SSE'], ['Shanghai Stock Exchange Composite Index', 'CSI 300 Index']], 
        [['Hong Kong Stock Exchange', 'HKEX'], ['Hang Seng Index', 'Hang Seng China Enterprises Index']],
        [['Tokyo Stock Exchange', 'TSE'], ['Nikkei 225', 'TOPIX']], 
        [['New York Stock Exchange', 'NYSE'], ['S&P 500', 'Nasdaq Composite', 'Dow Jones Industrial Average (DJIA)']], 
        [['London Stock Exchange', 'LSE'], ['FTSE 100']], 
        [['Frankfurt Stock Exchange', 'FSE'], ['DAX']]
    ]

///save tab indexes to sessionstorage. no context needed. 

    const {indexIndex, changeIndexIndex, } = useContext(MyContext)!;

    const [indIndFromStorage, setIndIndFromStorage] = useState(Number(sessionStorage.getItem('indexIndex')))

    const handleTabChange = (stockIndex:string) => {
        window?.scrollTo({ top: 350, left: 0, behavior: 'smooth' });

        let newIndex = 0;
        if (stockIndex === 'FTSE Straits Times Index (FTSE STI)') {
            newIndex = 0
        }
        else if (stockIndex === 'Shanghai Stock Exchange Composite Index') {
            newIndex = 1
        }
        else if (stockIndex === 'CSI 300 Index') {
            newIndex = 2
        }
        else if (stockIndex === 'Hang Seng Index'){
            newIndex = 3
        }
        else if (stockIndex === 'Hang Seng China Enterprises Index'){
            newIndex = 4
        }
        else if (stockIndex === 'Nikkei 225') {
            newIndex = 5
        }
        else if (stockIndex === 'TOPIX') {
            newIndex = 6
        }
        else if (stockIndex === 'S&P 500') {
            newIndex = 7
        }
        else if (stockIndex === 'Nasdaq Composite') {
            newIndex = 8
        }
        else if (stockIndex === 'Dow Jones Industrial Average (DJIA)') {
            newIndex = 9
        }
        else if (stockIndex === 'FTSE 100') {
            newIndex = 10
        }
        else if (stockIndex === 'DAX') {
            newIndex = 11
        }
        
        changeIndexIndex(newIndex)  ///sets newIndex as context variable
        sessionStorage.setItem('indexIndex', newIndex.toString())
        setIndIndFromStorage(newIndex)
    }

    //For when route is mounted from locale redirection
    useEffect(() => {
        window.scrollTo({top:250, left:0, behavior: 'smooth'})
          
    }, []);

    return (
        <>
            <div id="container-chart-tabs">
                <main className="min-h-screen">
                    <section>
                        <Tabs index={indIndFromStorage} isLazy orientation='vertical' variant='soft-rounded' colorScheme='purple' style={{display: 'flex'}}>
                            <TabList style={{border:'3px black solid', justifyContent:'space-evenly'}}>
                            {/* style={{flexDirection:'column'}} */}
                            {/* border:'1px black solid', */}
                            {markets.map(each => <div style={{padding:'5px 8px',  display:'flex', flexDirection:'column' ,justifyContent:'center'}} key={markets.indexOf(each)}><p style={{fontWeight:'700', fontSize:'20px', textAlign:'center'}}>{each[0][0] + ' - ' + each[0][1]}</p>
                            
                                {each[1].map(index => <Tab onClick={() => handleTabChange(index)} _hover={{background: 'purple.100'}} style={{textAlign:'center'}} className='georgia' key={each[1].indexOf(index)}>
                                        {index}
                                    </Tab>)}
                            
                            </div>
                            )}
                            </TabList>    
                            <TabPanels>
                                {markets.map(each => each[1].map((index) => (
                                        <TabPanel key={each[1].indexOf(index)}>
                                            <Heading as='h2' className='georgia' style={{textAlign:'center', padding:'0 0 15px 0'}}>
                                                {index}
                                            </Heading>  
                                            <Chart key={index}  market={index}/>
                                        </TabPanel>

                                ))
                                
                                )
                                }
                                
                            </TabPanels>
                        </Tabs>                        
                    </section>
                </main>

                
            </div>
        </>
    )
}