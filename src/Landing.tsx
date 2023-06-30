import { Button, Heading, Text } from '@chakra-ui/react';
import './styles/landing.css';
import Locales from './components/Locales';
import { useEffect, useState, useContext } from 'react';
import { MyContext } from './components/Context';
import News from './components/News';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { TiDelete } from 'react-icons/ti';

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
                          <Card style={{width:'25%'}}>
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
                </section>
              :
              ''  
              }

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