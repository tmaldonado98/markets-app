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

  const {removePinnedItem} = useContext(MyContext)!;


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

  const pinnedItems = sessionStorage.getItem('pinned') ? sessionStorage.getItem('pinned')! : '';
 
  const parsedPinnedItems = pinnedItems !== '' ? JSON.parse(pinnedItems) : '';
  console.log(parsedPinnedItems);  
  
  const [update, provokeUpdate] = useState(true);

  function handleDelete(item:string){
    provokeUpdate(!update);
    removePinnedItem(item)
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
              {parsedPinnedItems !== '' ?
                <section id='recent-pages'>
                  {parsedPinnedItems.length > 0 ?
                  <>
                    <Heading size={'lg'}>Pinned items:</Heading> 
                    <div style={{display:'flex', gap:'12px', flexWrap:'wrap', justifyContent:'center'}}>
                      {parsedPinnedItems.map((each:string) => (
                          <Card style={{width:'25%'}} _hover={{transform: 'scale(1.05)', transition: 'ease-in-out 200ms'}} _active={{transform: 'scale(0.9)'}}>
                            <CardBody style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                              
                              <span style={{cursor:'pointer', alignSelf:'end'}} title='Unpin Item'>
                                <TiDelete onClick={() => handleDelete(each)}/>
                              </span>

                              <span>{each}</span>
                            </CardBody>
                          </Card>
                      ))}
                    </div>
                  </>
                  :
                    <Heading size='md'>
                      You can pin your favorite items here. 
                    </Heading>
                  }
                        {/* <BiHelpCircle /> */}
                  <div>
                    <Button onClick={handleClickOpen} _active={{transform: 'scale(0.9)'}}>
                      Clear List
                    </Button>

                  </div>
                </section>
              :
              ''  
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