import { Button, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import './styles/landing.css';
import Locales from './components/Locales';
import { useEffect, useState, useContext } from 'react';
import { MyContext } from './components/Context';
import News from './components/News';
import { Card, CardBody, CardFooter } from '@chakra-ui/react'
import { TiDelete } from 'react-icons/ti';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom';
import ToTop from './components/ToTop';
import AdSense from 'react-adsense';
import axios from 'axios';
import { AnimatePresence, motion } from "framer-motion"

export default function Landing() {
  const {changeTermFromHeader} = useContext(MyContext)!;
  
  const navigate = useNavigate();

  const [update, provokeUpdate] = useState(true);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top:0, 
      left:0,
      behavior: 'smooth'
    })
    document.title = "Markets App";
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    // (window.adsbygoogle = window.adsbygoogle || []).push({});

  }, [])

    const dateObj = new Date();
    // console.log(dateObj)
    
    const dayOfMonth = dateObj.getDate();

    const dayOfWeek: string = dateObj.toLocaleString('en-US', { weekday: 'long' })
    // .getDay();
    const month: string = dateObj.toLocaleString('en-US', { month: 'long' })

  
//writing down name of variables, not of category names in order to loop a conditional later
  const arrayOfCategories = [];

  const allCategories: string[] = []; 

  const pinnedMarketItems = localStorage.getItem('pinnedMarketItems') ? localStorage.getItem('pinnedMarketItems')! : '';
  const parsedMarketItems = pinnedMarketItems !== '' ? JSON.parse(pinnedMarketItems) : '';
  arrayOfCategories.push(parsedMarketItems);

  const pinnedNewsItems = localStorage.getItem('pinnedNewsItems') ? localStorage.getItem('pinnedNewsItems')! : '';
  const parsedNewsItems = pinnedNewsItems !== '' ? JSON.parse(pinnedNewsItems) : '';
  arrayOfCategories.push(parsedNewsItems);
  
  const pinnedStockItems = localStorage.getItem('pinnedStockItems') ? localStorage.getItem('pinnedStockItems')! : '';
  const parsedStockItems = pinnedStockItems !== '' ? JSON.parse(pinnedStockItems) : '';
  arrayOfCategories.push(parsedStockItems);

  const pinnedCryptoItems = localStorage.getItem('pinnedCryptoItems') ? localStorage.getItem('pinnedCryptoItems')! : '';
  const parsedPinnedCrypto = pinnedCryptoItems !== '' ? JSON.parse(pinnedCryptoItems) : '';   
  arrayOfCategories.push(parsedPinnedCrypto);

  const pinnedCommItems = localStorage.getItem('pinnedCommItems') ? localStorage.getItem('pinnedCommItems')! : '';
  const parsedPinnedComm = pinnedCommItems !== '' ? JSON.parse(pinnedCommItems) : '';   
  arrayOfCategories.push(parsedPinnedComm);


  for (const each of arrayOfCategories) {
    if (each !== '') {
      allCategories.push(each);
    }
  }

  // console.log(allCategories.flat());  



  function handleDelete(item:string, category: string) {
    provokeUpdate(!update);

    // const cat = item.split('@#')[1]
    // console.log(category);
    // console.log(item);

    const arrToParse = localStorage.getItem(category)!;
    if (arrToParse !== null) {
      //// Executing deletion only if this storage item exists.
      const parsed = JSON.parse(arrToParse);
      
      const toPullOut = parsed.indexOf(item);

      //pull out index being sent by delete function from parsed array
      parsed.splice(toPullOut, 1);

      console.log(toPullOut, parsed);

      //set filtered array as the new localStorage item
      localStorage.setItem(category, JSON.stringify(parsed));
    }
    else {
      return false;
    }

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function clearPinned(){
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!;
    
      if (key.includes('pinned')) {
        await localStorage.removeItem(key)

      }
    }
    provokeUpdate(!update);
    setTimeout(() => {
      handleClose();
    }, 500);
  }

  function redirect(category:string, item: string) {
    const redirRoute = category.split('^')[0].trim();
    // console.log(redirRoute)

    const formattedItem = item.split(',');

    console.log(item, formattedItem);

    if (redirRoute === 'pinnedMarketItems') {
      navigate('/routes/markets');
      const headerPos = '1';
      // Index for header tabs
      sessionStorage.setItem('tabIndex', headerPos)
      sessionStorage.setItem('marketsIndex', '0')

      const marketsArr = ['FTSE Straits Times Index (FTSE STI)', 'Shanghai Stock Exchange Composite Index',
        'CSI 300 Index', 'Hang Seng Index', 'Hang Seng China Enterprises Index', 'Nikkei 225', 'TOPIX',
      'S&P 500', 'Nasdaq Composite', 'Dow Jones Industrial Average (DJIA)', 'FTSE 100', 'DAX']

      for (const each of marketsArr) {
        // navigation index for markets
        if (formattedItem[1] === each) {
          sessionStorage.setItem('indexIndex', marketsArr.indexOf(each).toString());
      
        }        
      }

    }

    else if (redirRoute === 'pinnedStockItems') {
      navigate('/routes/markets');
      // Index for header tabs
      sessionStorage.setItem('tabIndex', '1')
      sessionStorage.setItem('marketsIndex', '1')

      changeTermFromHeader(formattedItem[1])
    }
      
    else if (redirRoute === 'pinnedCryptoItems') {
      navigate('/routes/crypto');

      sessionStorage.setItem('tabIndex', '3');
      console.log(formattedItem[1])

      const cryptoArr = ['Bitcoin', 'Ethereum', 'Binance Coin', 'Dogecoin', 'Litecoin',
        'XRP', 'Polkadot', 'Bitcoin Cash', 'Chainlink', 'Stellar', 'Filecoin', 'Cardano'];

      for (const each of cryptoArr) {
        if (formattedItem[1] === each) {
          console.log(each);
          sessionStorage.setItem('cryptoIndex', cryptoArr.indexOf(each).toString());

        }
      }

    }
      
    else if (redirRoute === 'pinnedCommItems') {
      navigate('/routes/commodities');

      sessionStorage.setItem('tabIndex', '4');
      console.log(formattedItem[1])

    const commoditiesArr = [
        "Crude Oil (WTI)",
        "Crude Oil (Brent)",
        "Natural Gas",
        "Copper",
        "Aluminum",
        "Wheat",
        "Corn",
        "Cotton",
        "Sugar",
        "Coffee",
    ]

      for (const each of commoditiesArr) {
        if (formattedItem[1] === each) {
          console.log(each);
          sessionStorage.setItem('commIndex', commoditiesArr.indexOf(each).toString());

        }
      }

    }

  }

// this block will fetch winners,losers,movers data and store it in localStorage once per day. If component reloads, it will just fetch it from storage - API call made once per day.
const [stateMovers, setMovers] = useState<any>('');
  
  
  async function fetchMovers() {
    const timestamp = Date.now()
    if (localStorage.getItem('movers') === null) {
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.avKey}`)
        localStorage.setItem('movers', JSON.stringify(response.data));
        localStorage.setItem('movers_timestamp', timestamp.toString());
        setMovers(response.data);
      } catch (error) {
        console.log(error)
      }
      
    } else {
      return false;
    }

  }

///////////////
  
  function saveMovers() {

    if (localStorage.getItem('movers') !== null) {
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
            
            if (storageItem && storageItem === 'movers_timestamp') {
                const parsedTimestamp = parseInt(localStorage.getItem(storageItem)!, 10);
                
              if (parsedTimestamp < sixAMToday.getTime()) {
                  localStorage.removeItem(storageItem);
                  storageItem === 'movers_timestamp' && localStorage.removeItem(storageItem);
                  fetchMovers();
              } 
              ////if cache timestamp is not before 6AM today, then
              else if (currentDate.getTime() >= sixPMToday.getTime() && parsedTimestamp < sixPMToday.getTime() && currentDate.getTime() < midnight.getTime()) {    
                  localStorage.removeItem(storageItem);
                  storageItem === 'movers_timestamp' && localStorage.removeItem(storageItem);
                  fetchMovers();
              }
              else {
                const jsonMovers = localStorage.getItem('movers');
                const parsedMovers = jsonMovers ? JSON.parse(jsonMovers) : '';
                console.log('Movers fetched from storage.')
                setMovers(parsedMovers);
                
              }
            }
      }
    }
   ///if localStorage item's timestamp is from before 6AM today, articles from that category will be deleted and re-fetched once. 
  ///If it is 6PM or later today, and before midnight, then articles from that category will be deleted and re-fetched once. 

    else if (localStorage.getItem('movers') === null) {
        fetchMovers();
    }  

  }

  useEffect(() => {
      saveMovers();
  }, [])

  // useEffect(() => {
  //       console.log(stateMovers)

  // }, [stateMovers])

  // console.log(process.env.REACT_APP_ADCLIENTID)
  return (
    <section id='landing-container'>
      <ToTop/>
        <section id='locales'>
         {/* <h2 className='date-h georgia' style={{textAlign:'center', width:"min-content"}}>Today is {dayOfWeek} {month} {dayOfMonth}, {dateObj.getFullYear()}</h2> */}
          <Locales currentTime={dateObj}/>
        </section>
      <main className='min-h-screen' style={{maxWidth:'85%'}}>
            {/* <h1 className='landing-h mx-auto w-4/5 georgia'>Welcome to the Markets App</h1> */}
            {/* <h2 className='mx-auto w-4/5 georgia'>Your online source for Financial Education</h2> */}
        
        
        <div style={{ margin: '1rem auto', textAlign: 'center', display: "flex", flexDirection: "column", alignItems: "center", borderBottom:"1px solid black" }}>            
          <Heading size="lg" as={'h1'} style={{  fontSize: '40px', textDecoration:"underline" }} className='georgia'>
            Markets App
          </Heading>
        
          <Heading size='md' as={'h2'} style={{ fontSize: '25px', fontStyle:'italic' }}>
            Your Online Source For Financial Information
          </Heading>
          
          <Text noOfLines={[1, 2, 3]} style={{ fontSize: '23px', width:'75%' }}>
            Invest in yourself - get educated with the latest news, trends, market information,
            currency rates, and more!
          </Text>
        </div>

        
          {stateMovers !== '' &&
            <section id='movers-section'>
              <h2 style={{textAlign:'center', fontSize:"20px", fontWeight:"700"}} className='georgia'>Yesterday's Trends For US Stocks</h2>
              <h3 style={{textAlign:'center', fontSize:"19px"}}>Last Updated: {stateMovers.last_updated}</h3>
              
            <AnimatePresence mode='wait'>
              <h3 className='activity-h3'>Yesterday's Top Losers</h3>
              <motion.div className='scroll'
                initial={{ x:1250 }}
                animate={{ x: -3000 }}
                // exit={{ x: -5500 }}
                transition={{ duration: 35, 
                repeat: Infinity, 
                  // repeatType: 'loop'
                }}
              >
                  {stateMovers.top_losers.map((each:any) => {
                    return (
                      <div className='losers-card'>
                        <div style={{display:"flex", gap:'8px'}}>
                          <span>{each.ticker}</span>
                          <span><b>Change %:</b> {each.change_percentage}</span>
                        </div>

                        <div style={{display:"flex", gap:'8px'}}>
                          <span><b>Current Price:</b> {each.price}</span>
                          <span><b>Price Change:</b> {each.change_amount}</span>
                        </div>
                      </div>
                    )
                    
                  })}
              
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode='wait'>
              <h3 className='activity-h3'>Top Gainers</h3>
              <motion.div className='scroll'
                initial={{ x:1250 }}
                animate={{ x: -3000 }}
                // exit={{ x: -5500 }}
                transition={{ duration: 35, 
                repeat: Infinity, 
                  // repeatType: 'loop'
                }}
              >
                  {stateMovers.top_gainers.map((each:any) => {
                    return (
                      <div className='losers-card'>
                        <div style={{display:"flex", gap:'8px'}}>
                          <span>{each.ticker}</span>
                          <span><b>Change %:</b> {each.change_percentage}</span>
                        </div>

                        <div style={{display:"flex", gap:'8px'}}>
                          <span><b>Current Price:</b> {each.price}</span>
                          <span><b>Price Change:</b> {each.change_amount}</span>
                        </div>
                      </div>
                    )
                    
                  })}
              
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode='wait'>
              <h3 className='activity-h3'>Most Active Stocks</h3>
              <motion.div className='scroll'
                initial={{ x:1250 }}
                animate={{ x: -3000 }}
                // exit={{ x: -5500 }}
                transition={{ duration: 35, 
                repeat: Infinity, 
                  // repeatType: 'loop'
                }}
              >
                  {stateMovers.most_actively_traded.map((each:any) => {
                    return (
                      <div className='losers-card'>
                        <div style={{display:"flex", gap:'8px'}}>
                          <span>{each.ticker}</span>
                          <span><b>Change %:</b> {each.change_percentage}</span>
                        </div>

                        <div style={{display:"flex", gap:'8px'}}>
                          <span><b>Current Price:</b> {each.price}</span>
                          <span><b>Price Change:</b> {each.change_amount}</span>
                        </div>
                      </div>
                    )
                    
                  })}
              
              </motion.div>
            </AnimatePresence>
              {/* <Grid templateColumns='repeat(5, 1fr)' gap={6}> */}
                {/* <GridItem w='100%' > */}
              
                {/* </GridItem> */}


                {/* <GridItem w='100%' >
                  {stateMovers.top_gainers.map((each:any) => {
                    return (
                      <div className='losers-card'>
                        <div style={{display:"flex", gap:'8px'}}>
                          <span>{each.ticker}</span>
                          <span><b>Change %:</b> {each.change_percentage}</span>
                        </div>

                        <div style={{display:"flex", gap:'8px'}}>
                          <span><b>Current Price:</b> {each.price}</span>
                          <span><b>Price Change:</b> {each.change_amount}</span>
                        </div>
                      </div>
                    )
                    
                    })}

                </GridItem> */}

                {/* <GridItem w='100%' >
                  {stateMovers.most_actively_traded.map((each:any) => {
                    return (
                      <div className='losers-card'>
                        <div style={{display:"flex", gap:'8px'}}>
                          <span>{each.ticker}</span>
                          <span><b>Change %:</b> {each.change_percentage}</span>
                        </div>

                        <div style={{display:"flex", gap:'8px'}}>
                          <span><b>Current Price:</b> {each.price}</span>
                          <span><b>Price Change:</b> {each.change_amount}</span>
                        </div>
                      </div>
                    )
                    
                    })}

                </GridItem>
                
              </Grid> */}
            </section>
          }

        
          <div id='first-box' className='min-h-16 '>
            {allCategories.flat().length > 0 && allCategories[0] !== "" ?
                <section id='recent-pages'>
                  {allCategories.flat().length > 0 &&
                  <>
                    <Heading size={'lg'}>Pinned items:</Heading> 
                    <div style={{display:'flex', gap:'12px', flexWrap:'wrap', justifyContent:'center', paddingTop:'16px'}}>
                      {allCategories.flat().map((each:string) => (
                          <Card style={{width:'25%'}} _hover={{transform: 'scale(1.05)', transition: 'ease-in-out 200ms'}} _active={{transform: 'scale(0.9)'}}>
                            <CardBody style={{display:'flex', flexDirection:'column', justifyContent:'center', padding:"6px"}}>
                              
                            <span id='cardX' style={{ cursor: 'pointer', alignSelf: 'end', transition:'350ms'}} title='Unpin Item'>
                                <TiDelete onClick={() => handleDelete(each, each.split('@#')[1].split('^')[0])} />
                              </span>

                            <span title='Click to be redirected.' className='pinnedCard'
                              onClick={() => redirect(each.split('@#')[1].trim(), each.split('^')[1].trim())}
                            >
                              
                              {each.split('@#')[1].split('^')[0].trim() === 'pinnedNewsItems' || each.split('@#')[2] && each.split('@#')[2].split('^')[0].trim() === 'pinnedNewsItems'
                                ?
                                <a target='_blank' href={each.split('^')[1].trim()}>{each.split('@#')[0].trim()}
                                </a>
                                :
                                each.split('@#')[0].trim()}
                            </span>                            
                          </CardBody>
                          
                            <CardFooter style={{ padding:"6px"}}>
                              {/* the condition below says that if the parsedPinnedItems includes an item from the -pinnedNewsItems category then ... 
                                And if I added a condition after the || to account for cases where the news article title itself has a -, so as to search for the category after the -.
                                I am using - to find the category name inside the pinnedParsedItems array.
                              */}

                              {each.split('@#')[1].split('^')[0].trim() === 'pinnedNewsItems' || each.split('@#')[2] && each.split('@#')[2].split('^')[0].trim() === 'pinnedNewsItems'
                                ?
                                <p style={{textAlign:'center', width:'100%'}}><sub>
                                  News Article
                                </sub></p>
                                
                                :
                                
                                each.split('@#')[1].split('^')[0].trim() === 'pinnedMarketItems'
                                ?
                                <p style={{textAlign:'center', width:'100%'}}><sub>
                                  Market Index
                                </sub></p>

                                :

                                each.split('@#')[1].split('^')[0].trim() === 'pinnedStockItems'
                                ?
                                <p style={{textAlign:'center', width:'100%'}}><sub>
                                  Stock
                                </sub></p>
                                
                                :
                                
                                each.split('@#')[1].split('^')[0].trim() === 'pinnedCryptoItems'
                                ?
                                <p style={{textAlign:'center', width:'100%'}}><sub>
                                  Cryptocurrency
                                </sub></p>
                              
                                    :
                                    
                                each.split('@#')[1].split('^')[0].trim() === 'pinnedCommItems'
                                ?
                                <p style={{textAlign:'center', width:'100%'}}><sub>
                                  Commodity
                                </sub></p>
                              
                                    :
                                    
                                    ''
                              
                              }
                            </CardFooter>
                          </Card>
                      ))}
                    </div>
                    <div style={{marginTop:'24px'}}>
                      <Button onClick={handleClickOpen} _active={{transform: 'scale(0.9)'}}>
                        Clear List
                      </Button>

                    </div>
                  </>
                  }
                </section>
              :
              <div style={{display:'flex', justifyContent:'center', padding: '8px 0 44px', borderTop:'1px black solid', marginTop:'8px', height:'100px', alignItems:'center'}}>
                <Heading size='md' style={{textAlign:'center'}}>
                  You can pin your favorite items here. <br/>
                  Click on the 'Pin' button on the items you want to save.
                </Heading>
              </div>
              }
                <Modal isOpen={open} onClose={handleClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Are You Sure?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      This action cannot be undone.
                    </ModalBody>

                    <ModalFooter style={{justifyContent:'center'}}>
                      <Button colorScheme='blue' variant='ghost' mr={3} onClick={handleClose}>
                        Close
                      </Button>
                      <Button colorScheme='red' variant='ghost' onClick={clearPinned}>Confirm</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

          </div>
        {/* <aside id='ad2'></aside> */}
        {/* <AdSense.Google
          client="ca-pub-3168526593832486"
          slot="7609314826"
          style={{ display: 'block' }}
          format="autorelaxed"
          responsive="true"
        /> */}

        {/* <ins className="adsbygoogle"
          style={{display:"block"}}
          data-ad-format="autorelaxed"
          data-ad-client="ca-pub-3168526593832486"
          data-ad-slot="7609314826">
        </ins>
         */}
        
          <section id='news-section'>
            <div className='news-cont'>
              <News props={dateObj}/>
            </div>
          </section>
          {/* <div id='ad4' className='news-cont' style={{border:'solid'}}>
          </div>             */}
      </main>
      {/* <aside id='side-ad-section'>
        
        <div id='ad1'>
          <ins className="adsbygoogle"
            style={{display:"block"}}
            data-ad-client="ca-pub-3168526593832486"
            data-ad-slot="7358636029"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </div>            
            <div id='ad3'></div>
          </aside> */}
    </section>
  
  );
}

// export async function getServerSideProps() {
//   const initialTime = new Date();
//   return {
//     props: {
//       initialTime,
//     },
//   };
// }