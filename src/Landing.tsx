import { Button, Heading, Text } from '@chakra-ui/react';
import './styles/landing.css';
import Locales from './components/Locales';
import { useEffect, useState, useContext } from 'react';
import { MyContext } from './components/Context';
import News from './components/News';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { TiDelete } from 'react-icons/ti';
import {BiHelpCircle} from 'react-icons/bi';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function Landing() {

  const {category, removePinnedItem} = useContext(MyContext)!;


  useEffect(() => {
    window.scrollTo({
      top:0, 
      left:0,
      behavior: 'smooth'
    })
    document.title = "Markets App";
    
  }, [])

    const dateObj = new Date();
    // console.log(dateObj)
    
    const dayOfMonth = dateObj.getDate();

    const dayOfWeek: string = dateObj.toLocaleString('en-US', { weekday: 'long' })
    // .getDay();
    const month: string = dateObj.toLocaleString('en-US', { month: 'long' })
    // .getMonth();

//     const options = { weekday: 'long' };
// const dayOfWeek = date.toLocaleString('en-US', options);

  const arrayOfCategories = ['pinnedMarketItems'];
  //set to execute upon comp mount
  // function setArrays(){
  //   for (let i = 0; i < arrayOfCategories.length; i++) {

      
  //   }
  // }
  const allCategories = []; 

  const pinnedMarketItems = sessionStorage.getItem('pinnedMarketItems') ? sessionStorage.getItem('pinnedMarketItems')! : '';
  const parsedMarketItems = pinnedMarketItems !== '' ? JSON.parse(pinnedMarketItems) : '';
 
  // const pinnedStockItems = sessionStorage.getItem('pinnedStockInd') ? sessionStorage.getItem('pinnedStockInd')! : '';
  // const parsedStockItems = pinnedStockItems !== '' ? JSON.parse(pinnedStockItems) : '';

  allCategories.push(parsedMarketItems);

  console.log(allCategories.flat());  

  const [update, provokeUpdate] = useState(true);
// , category:string
  function handleDelete(item:string){
    provokeUpdate(!update);
    // removePinnedItem(item)

    const cat = item.split('-')[1]
    console.log(cat);

    const arrToParse = sessionStorage.getItem(cat)!;
    if (arrToParse !== null) {
      //// Executing deletion only if this storage item exists.
      const parsed = JSON.parse(arrToParse);
      
      const toPullOut = parsed.indexOf(item);

      //pull out index being sent by delete function from parsed array
      parsed.splice(toPullOut, 1);

      console.log(toPullOut, parsed, item);

      //set filtered array as the new sessionStorage item
      sessionStorage.setItem(category, JSON.stringify(parsed));
    }
    else {
      return false;
    }

    ///CREATE ARRAYS, ONE PER ROUTE WHICH CONTAINS EACH INDEX TO LOCATE. LOOP OVER THEM TO FIND A MATCH BETWEEN "ITEM" AND EACH INDEX IN AN ARRAY
    ///CONDITIONALS TO SAVE INDEX OF ROUTE, AND INDEX OF POSITION WITHIN ROUTE.

    //Markets route
    const marketsTab = [0, 1];  ///Tabs: market indices and search tab
    const markets = ['']
    

    //Crypto route


    //Commodity route


    //Macro data route

    //remember to make links for news items

  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function clearPinned(){
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)!;
    
      if (key.includes('pinned')) {
        sessionStorage.removeItem(key)

      }
    }
    provokeUpdate(!update);
    setTimeout(() => {
      handleClose();
    }, 500);
  }

  return (
    <section id='landing-container'>

      <main className='min-h-screen' style={{maxWidth:'85%'}}>
          

            {/* <h1 className='landing-h mx-auto w-4/5 georgia'>Welcome to the Markets App</h1> */}
            {/* <h2 className='mx-auto w-4/5 georgia'>Your online source for Financial Education</h2> */}
          
          <div id='first-box' className='min-h-16 '>
              {/* border-red-600 border-solid border-4*/}
              <h2 className='date-h georgia' style={{textAlign:'center'}}>Today is {dayOfWeek} {month} {dayOfMonth}, {dateObj.getFullYear()}</h2>
              <section id='locales'>
                <Locales currentTime={dateObj}/>
              </section>

              {/* render recent-pages section conditionally */}
              {allCategories.flat().length > 0 ?
                <section id='recent-pages'>
                  {allCategories.flat().length > 0 &&
                  <>
                    <Heading size={'lg'}>Pinned items:</Heading> 
                    <div style={{display:'flex', gap:'12px', flexWrap:'wrap', justifyContent:'center', paddingTop:'16px'}}>
                      {allCategories.flat().map((each:string) => (
                          <Card style={{width:'25%'}} _hover={{transform: 'scale(1.05)', transition: 'ease-in-out 200ms'}} _active={{transform: 'scale(0.9)'}}>
                            <CardBody style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                              
                              <span style={{cursor:'pointer', alignSelf:'end'}} title='Unpin Item'>
                                <TiDelete onClick={() => handleDelete(each)}/>
                              </span>

                              <span>{each.split('-')[0].trim()}</span>
                            </CardBody>
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
                        {/* <BiHelpCircle /> */}
                </section>
              :
              <div style={{display:'flex', justifyContent:'center', padding: '8px 0 44px', borderTop:'1px black solid', marginTop:'8px', height:'100px', alignItems:'center'}}>
                <Heading size='md' style={{textAlign:'center'}}>
                  You can pin your favorite items here. <br/>
                  Click on the 'Pin' button on the items you want to save!
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
          <aside id='ad2'>
            <p>Ad section here</p>
          </aside>
          <section id='news-section'>
            <div className='news-cont'>
              <News props={dateObj}/>
            </div>
          </section>
          <div id='ad4' className='news-cont' style={{border:'solid'}}>
            <p>Ad section here</p>
          </div>            
      </main>
          <aside id='side-ad-section'>
            <div id='ad1'>
              <p>Ad section here</p>
            </div>            
            <div id='ad3'>
              <p>Ad section here</p>
            </div>
          </aside>
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