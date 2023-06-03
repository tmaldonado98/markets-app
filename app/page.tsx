'use client';
import { Heading } from '@chakra-ui/react';
import '../styles/landing.css';
import Head from 'next/head';
import Locales from '../components/Locales';
import { useEffect, useState } from 'react';
import News from '../components/News';
import Loading from '../components/Loading';

// interface MyPageProps {
//   initialTime: Date;
// }



// {initialTime} : MyPageProps
export default function Page() {

  useEffect(() => {
    window.scrollTo({
      top:0, 
      left:0,
      behavior: 'smooth'
    })
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

      <main className='min-h-screen border-solid border-2 border-orange-500'>
          

          <h1 className='landing-h mx-auto w-4/5'>Welcome to the Markets App, your online source for ...</h1>
          <div id='first-box' className='min-h-16 border-red-600 border-solid border-4'>
              {/* Create section for recently viewed sections within my website: asian market, oil prices, etc.  --- put in cards */}
              <h2 className='date-h'>Today is {dayOfWeek} {month} {dayOfMonth}, {dateObj.getFullYear()}</h2>
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
            <div className='news-cont'>
              <h1>Latest trends</h1>
            </div>
          </section>
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