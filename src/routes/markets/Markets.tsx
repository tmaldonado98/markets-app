import './stocks.css';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import SearchStocks from "../../components/Markets/search/Search";
import MarketsChart from "../../components/Markets/MarketsChart";
import { MyContext } from "../../components/Context";
import {useContext} from 'react';

export default function Stocks(){
    document.title = "Stock Markets";
    const {changeMarketsIndex} = useContext(MyContext)!;


    const storageIndex = sessionStorage.getItem('marketsIndex');

    function handleTabClick(newIndex:string){
        changeMarketsIndex(newIndex);    
    }

    return(
        <>
            <aside>
                <div className="ad">
                    Ad section here
                </div>
            </aside>
            <nav>
                <Tabs index={Number(storageIndex)} variant='soft-rounded' colorScheme='green'>
                    <TabList style={{borderBottom:'5px solid black', justifyContent:'center', padding:'1rem', fontFamily:'Georgia'}} className='georgia'>
                        <Tab _hover={{bg: 'green.100', color:'green.600'}} onClick={() => handleTabClick('0')}>
                            Global Stock Markets
                        </Tab>
                        <Tab _hover={{bg: 'green.100', color:'green.600'}} onClick={() => handleTabClick('1')}>
                                Search Stocks
                        </Tab>
                        {/* <Tab _hover={{bg: 'green.100', color:'green.600'}} onClick={() => handleTabClick('2')}>
                                Pinned Tickers
                        </Tab> */}
                        {/* <Tab _hover={{bg: 'green.100', color:'green.600'}}>
                                Latest Trends
                        </Tab> */}
                    </TabList>
                    
                    <TabPanels>
                        <TabPanel>
                            <MarketsChart/>
                        </TabPanel>
                        <TabPanel>
                            <SearchStocks/>
                        </TabPanel>
                        {/* <TabPanel>
                            <Pinned/>
                        </TabPanel> */}
                        {/* <TabPanel>
                            <Trends/>
                        </TabPanel> */}
                    </TabPanels>

                </Tabs>
            </nav>
            <aside>
                <div className="ad">
                    Ad section here
                </div>
            </aside>
        </>

    )
}