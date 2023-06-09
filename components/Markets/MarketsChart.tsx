import { Tabs, TabList, TabPanels, Tab, TabPanel, Heading } from '@chakra-ui/react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
  } from '@chakra-ui/react'

import {Chart} from './Chart';
import '../../styles/globals.css';

export default function MarketsChart(){
    const markets = [
        [['Singapore Exchange', 'SGX'], ['FTSE Straits Times Index (FTSE STI)']], 
        [['Shanghai Stock Exchange', 'SSE'], ['Shanghai Stock Exchange Composite Index', 'CSI 300 Index']], 
        [['Tokyo Stock Exchange', 'TSE'], ['Nikkei 225', 'TOPIX']], 
        [['New York Stock Exchange', 'NYSE'], ['S&P 500', 'Nasdaq Composite', 'Dow Jones Industrial Average (DJIA)']], 
        [['London Stock Exchange', 'LSE'], ['FTSE 100']], 
        [['Frankfurt Stock Exchange', 'FSE'], ['DAX']]
    ]

///save tab indexes to sessionstorage. no context needed. 

    return (
        <>
            <div id="container-chart-tabs">
                <main className="min-h-screen">
                    <section>
                        <Tabs isLazy orientation='vertical' variant='soft-rounded' colorScheme='purple' style={{display: 'flex'}}>
                            <TabList style={{border:'3px black solid', justifyContent:'space-evenly'}}>
                            {/* style={{flexDirection:'column'}} */}
                            {/* border:'1px black solid', */}
                            {markets.map(each => <div style={{padding:'5px 8px',  display:'flex', flexDirection:'column' ,justifyContent:'center'}} key={markets.indexOf(each)}><p style={{fontWeight:'700', fontSize:'20px', textAlign:'center'}}>{each[0][0] + ' - ' + each[0][1]}</p>
                            
                                {each[1].map(index => <Tab _hover={{background: 'purple.100'}} style={{textAlign:'center'}} className='georgia' key={each[1].indexOf(index)} onClick={() => window.scrollTo({top:350, left:0, behavior: 'smooth'})}>
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