import { Tabs, TabList, TabPanels, Tab, TabPanel, Heading, Button } from '@chakra-ui/react'
import {Chart} from './Chart';
import '../../styles/globals.css';
import { MyContext } from '../Context';
import { useContext, useState, useEffect } from 'react';
import { BsPinFill } from 'react-icons/bs';
import {MdOutlineDone} from 'react-icons/md';
import {TiDelete} from 'react-icons/ti';

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

///save tab indexes to localStorage. no context needed. 

    const {changeIndexIndex, category, changePinnedArr, removePinnedItem, update, provokeUpdate, handlePin, sendDelete} = useContext(MyContext)!;

    // const [indIndFromStorage, setIndIndFromStorage] = useState(Number(localStorage.getItem('indexIndex')))

    const storageIndex = sessionStorage.getItem('indexIndex') ? sessionStorage.getItem('indexIndex') : '0';

    const handleTabChange = (stockIndex:string) => {
        // window?.scrollTo({ top: 350, left: 0, behavior: 'smooth' });

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
        // setIndIndFromStorage(newIndex)
    }

    //For when route is mounted from locale redirection
    // useEffect(() => {
    //     window.scrollTo({top:250, left:0, behavior: 'smooth'})
          
    // }, []);

    // use context variable that represents pinned category in localStorage

    const pinnedIndItems = localStorage.getItem(category) ? localStorage.getItem(category)! : '';
    const parsedPinnedItems = pinnedIndItems !== '' ? JSON.parse(pinnedIndItems) : '';   
        // console.log(parsedPinnedItems)

    // const [update, provokeUpdate] = useState(true);

    useEffect(() => {
        const pinnedIndItems = localStorage.getItem(category) ? localStorage.getItem(category)! : '';
        const parsedPinnedItems = pinnedIndItems !== '' ? JSON.parse(pinnedIndItems) : '';       
        // console.log(parsedPinnedItems)
    }, [update])


    const [del, setDel] = useState(false);


    return (
        <>
            <div id="container-chart-tabs">
                <main className="min-h-screen">
                    <section>
                        <Tabs index={Number(storageIndex)} isLazy orientation='vertical' variant='soft-rounded' colorScheme='purple' style={{display: 'flex'}}>
                            <TabList style={{ justifyContent:'space-evenly'}}>
                            {/* style={{flexDirection:'column'}} */}
                            {/* border:'1px black solid', border:'3px black solid',*/}
                                {markets.map(each =>
                                    <div style={{ padding: '5px 8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom:"2px solid black" }} key={markets.indexOf(each)}>
                                        <p style={{ fontWeight: '700', fontSize: '20px', textAlign: 'start', textDecoration:'underline'}}>
                                            {each[0][0] + ' - ' + each[0][1]}
                                        </p>
                            
                                        {each[1].map(index =>
                                            <Tab onClick={() => handleTabChange(index)} _hover={{ background: 'purple.100' }} style={{ textAlign: 'center', margin:"5px 0"}} className='georgia' key={each[1].indexOf(index)}>
                                                {index}
                                            </Tab>)}
                            
                            </div>
                            )}
                            </TabList>    
                            <TabPanels style={{margin:'0 18px', borderLeft:'black 1px solid'}}>
                                {markets.map(each => each[1].map((index) => (
                                        <TabPanel key={each[1].indexOf(index)}>
                                            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                                <Heading as='h2' className='georgia' style={{textAlign:'center', padding:'0 0 15px 0', width:'80%'}}>
                                                    {index}
                                                </Heading>
                                                {/* <span>{update.toString()}</span> */}
                                                {/* <p>{parsedPinnedItems.map((each:string) => each)}</p> */}

                                            {/* .split('-')[0].trim()  .split(',')[0] */}
                                                {parsedPinnedItems.includes(index.toString() + '@#pinnedMarketItems^1,'+index.toString()) ?
                                                    <span style={{display:'flex', flexDirection:'column', width:'fit-content', textAlign:'center'}}>
                                                        <Button onMouseEnter={() => setDel(true)}  onMouseLeave={() => setDel(false)} style={{width:'fit-content', margin:'0 auto'}} variant='ghost' onClick={() => sendDelete(index.toString() + '@#pinnedMarketItems^1,'+index.toString(), 'pinnedMarketItems')}>{del === false ? <MdOutlineDone/> : <TiDelete/>}</Button>
                                                        Pinned To Home
                                                    </span>

                                                    :
                                                    <span style={{display:'flex', flexDirection:'column', width:'fit-content', textAlign:'center'}}>
                                                        <Button style={{width:'fit-content', margin:'0 auto'}} variant='ghost' onClick={() => handlePin(index.toString() + '@#pinnedMarketItems', [1, index.toString()], 'pinnedMarketItems')}><BsPinFill/></Button>
                                                        Pin Shortcut
                                                    </span>
                                                }
                                            </div>


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