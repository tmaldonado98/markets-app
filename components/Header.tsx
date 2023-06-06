// import Link from "next/link"
import { Link } from '@chakra-ui/next-js';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useState, useContext, useEffect } from 'react';
import { MyContext } from './Context';

export const Header:React.FC = () => {
  
  const {tabIndex, changeTabIndex} = useContext(MyContext)!;

  const [indexFromStorage, setIndexFromStorage] = useState(Number(sessionStorage.getItem('tabIndex')))

  const handleTabChange = (newIndex:number) => {
    changeTabIndex(newIndex)
    sessionStorage.setItem('tabIndex', newIndex.toString())
    setIndexFromStorage(newIndex)
  }

    return (
        <nav style={{borderBottom: 'solid 4px black', flexWrap:'wrap', gap:'8px', backgroundColor:'#2d2d2d'}} className='flex justify-evenly p-6'>
          <Tabs index={indexFromStorage} variant='soft-rounded' colorScheme='blue'>
              <TabList>
                  <Tab onClick={() => handleTabChange(0)} style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                    <Link color='blue.500' _hover={{ color: 'blue.500' }} href='/' scroll={true}>
                      Home
                    </Link>
                  </Tab>

                  <Tab onClick={() => handleTabChange(1)} style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                    <Link color='blue.500' _hover={{ color: 'blue.500' }} href='/routes/markets' scroll={true}>
                      Global Markets
                    </Link>
                  </Tab>

                  <Tab onClick={() => handleTabChange(2)} style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                    <Link color='blue.500' _hover={{ color: 'blue.500' }} href='/routes/currencies' scroll={true}>
                      Global Currencies
                    </Link>
                  </Tab>

                  <Tab onClick={() => handleTabChange(3)} style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                    <Link color='blue.500' _hover={{ color: 'blue.500' }} href='/routes/commodities' scroll={true}>
                      Global Commodities
                    </Link>
                  </Tab>

                  <Tab onClick={() => handleTabChange(4)} style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                    <Link color='blue.500' _hover={{ color: 'blue.500' }} href='/routes/commodities' scroll={true}>
                      Macro Trends
                    </Link>
                  </Tab>

                  <Tab onClick={() => handleTabChange(5)} style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                    <Link color='blue.500' _hover={{ color: 'blue.500' }} href='/routes/commodities' scroll={true}>
                      Education Center
                    </Link>
                  </Tab>

              </TabList>

          </Tabs>
            
        </nav>
    )
}

export const Footer:React.FC = () => {
    return <footer className="py-4 underline" style={{backgroundColor:'#2d2d2d', color:'antiquewhite'}}>Footer</footer>
}