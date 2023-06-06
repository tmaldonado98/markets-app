import { Tabs, TabList, TabPanels, Tab, TabPanel, Heading } from '@chakra-ui/react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
  } from '@chakra-ui/react'

import {Chart, ChartGraphic} from './Chart';


export default function MarketsChart(){
    const markets = [
        [['Singapore', 'SGX'], ['FTSE Straits Times Index (FTSE STI)']], 
        [['Shanghai Stock Exchange', 'SSE'], ['Shanghai Stock Exchange Composite Index', 'CSI 300 Index']], 
        [['Tokyo Stock Exchange', 'TSE'], ['Nikkei 225', 'TOPIX']], 
        [['New York Stock Exchange', 'NYSE'], ['S&P 500', 'Dow Jones Industrial Average (DJIA)']], 
        [['London Stock Exchange', 'LSE'], ['FTSE 100']], 
        [['Frankfurt Stock Exchange', 'FSE'], ['DAX']]
    ]

///save tab indexes to sessionstorage. no context needed. 

    return (
        // <Accordion style={{maxWidth:'35%'}}>
        //                     {markets.map(each => {
        //                         return (
        //                             <AccordionItem style={{display:'flex', flexWrap:'wrap'}} key={markets.indexOf(each)}>
        //                                 <h2>
        //                                     <AccordionButton>
        //                                         {/* as="span" */}
        //                                         <Box  flex='1' width='100%' textAlign='left'>
        //                                         {each[0][0] + ' - ' + each[0][1]}
        //                                         </Box>
        //                                         <AccordionIcon />
        //                                     </AccordionButton>
        //                                 </h2>
        //                                 <AccordionPanel pb={4}>
        //                                     {/* {each[1].map(index => {
        //                                         return (
        //                                             <Tabs key={each[1].indexOf(index)}>
        //                                                 <TabList>
        //                                                     <Tab>{index}</Tab>
        //                                                 </TabList>
        //                                             </Tabs>
        //                                         )
        //                                     })} */}
        //                                 </AccordionPanel>
        //                             </AccordionItem>
        //                         )
        //                     })}
        //                 </Accordion>
        <>
            <div id="container-chart-tabs">
                <main className="min-h-screen">
                    <section>
                        <Tabs isLazy orientation='vertical' variant='soft-rounded' colorScheme='purple' style={{display: 'flex'}}>
                            <TabList style={{border:'3px black solid'}}>
                            {/* style={{flexDirection:'column'}} */}
                            {markets.map(each => <div style={{padding:'8px', border:'1px black solid', display:'flex', flexDirection:'column' ,justifyContent:'center'}} key={markets.indexOf(each)}><p style={{fontWeight:'700', fontSize:'20px', textAlign:'center'}}>{each[0][0] + ' - ' + each[0][1]}</p>
                            
                                {each[1].map(index => <Tab _hover={{background: 'purple.100'}} style={{textAlign:'center'}} key={each[1].indexOf(index)}>{index}</Tab>)}
                            
                            </div>
                            )}
                            </TabList>    
                            <TabPanels>
                                {markets.map(each => each[1].map((index) => (
                                        <TabPanel key={each[1].indexOf(index)}>
                                            <Heading as='h2'>
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

                    <section>

                        {/* market chart here */}
                    </section>

                </main>

                
            </div>
        </>
    )
}