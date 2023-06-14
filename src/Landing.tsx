import { Heading } from '@chakra-ui/react';
import './styles/landing.css';
import Locales from './components/Locales';
import { useEffect, useState } from 'react';
import News from './components/News';
import Loading from './components/Loading';


export default function Landing() {

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
  return (
    <section id='landing-container'>

      <main className='min-h-screen' style={{maxWidth:'85%'}}>
          

          <header>
            <h1 className='landing-h mx-auto w-4/5 georgia'>Welcome to Markets App</h1>
            <h2 className='mx-auto w-4/5 georgia'>Your online source for Financial Education</h2>
          </header>
          
          <div id='first-box' className='min-h-16 border-red-600 border-solid border-4'>
              {/* Create section for recently viewed sections within my website: asian market, oil prices, etc.  --- put in cards */}
              <h2 className='date-h georgia'>Today is {dayOfWeek} {month} {dayOfMonth}, {dateObj.getFullYear()}</h2>
              <section id='locales'>
                <Locales currentTime={dateObj}/>
                {/* <Loading /> */}
              </section>

              {/* render recent-pages section conditionally */}
              <section id='recent-pages'>
                <p>Recently viewed pages</p> 

              </section>

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