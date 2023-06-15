import { Link as ChakraLink, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useState, useContext, useEffect } from 'react';
import { MyContext } from './Context';
import '../styles/globals.css';
import {BsSearch} from 'react-icons/bs';


export const Header:React.FC = () => {
  const navigate = useNavigate();
  const {tabIndex, changeTabIndex, changeTermFromHeader, changeMarketsIndex} = useContext(MyContext)!;

  const [searchInput, setSearchInput] = useState('')
 
  function handleSearchInput(e:any){
    setSearchInput(e.target.value);
  }

  function transferToSearch(term:string){
    changeTermFromHeader(term);
    sessionStorage.setItem('tabIndex', '1')
    sessionStorage.setItem('marketsIndex', '1')
    handleTabChange('1')
    changeMarketsIndex('1')
    setSearchInput('');    
    navigate('/routes/markets');
  }



  function handleKeyDown(e: any) {
    if (e.keyCode === 13) {
        transferToSearch(searchInput);
    }
    else {
        return false;

    }
  }

  const [indexFromStorage, setIndexFromStorage] = useState<string>(tabIndex)

  const handleTabChange = (newIndex:string) => {
    changeTabIndex(newIndex)
    sessionStorage.setItem('tabIndex', newIndex.toString())
    setIndexFromStorage(newIndex)
  }

  useEffect(() => {
    if(sessionStorage.getItem('tabIndex') === null || sessionStorage.getItem('tabIndex') === '0'){
      sessionStorage.setItem('tabIndex', '0');
      changeTabIndex('0')
      setIndexFromStorage('0')
      navigate('/')
    }
  }, [])

    return (
        <nav style={{borderBottom: 'solid 4px black', display:'flex', flexWrap:'wrap', justifyContent:'space-evenly', padding:'16px 42px', color:'blue.500', backgroundColor:'#2d2d2d', }}>
          <Tabs index={Number(tabIndex)} variant='soft-rounded' colorScheme='blue'>
              <TabList>
                  <ChakraLink as={RouterLink} to='/'>
                    <Tab onClick={() => handleTabChange('0')} color='blue.500' style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                        Home
                    </Tab>
                  </ChakraLink>

                  <ChakraLink as={RouterLink} to='/routes/markets'>
                    <Tab onClick={() => handleTabChange('1')} color='blue.500' style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                      Global Markets
                    </Tab>
                  </ChakraLink>

                  <ChakraLink as={RouterLink} to='/routes/currencies'>
                    <Tab onClick={() => handleTabChange('2')} color='blue.500' style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                      Global Currencies
                    </Tab>
                  </ChakraLink>

                  <ChakraLink as={RouterLink} to='/routes/commodities'>
                    <Tab onClick={() => handleTabChange('3')} color='blue.500' style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                      Global Commodities
                    </Tab>
                  </ChakraLink>

                  <ChakraLink as={RouterLink} to='/routes/commodities'>
                    <Tab onClick={() => handleTabChange('4')} color='blue.500' style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                      Futures
                    </Tab>
                  </ChakraLink>

                  <ChakraLink as={RouterLink} to='/routes/commodities'>
                    <Tab onClick={() => handleTabChange('5')} color='blue.500' style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                      Macro Trends
                    </Tab>
                  </ChakraLink>

                  <ChakraLink as={RouterLink} to='/routes/commodities'>
                    <Tab onClick={() => handleTabChange('6')} color='blue.500' style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                      Education Center
                    </Tab>
                  </ChakraLink>

              </TabList>

          </Tabs>
          {
            window.location.href.includes('/routes/markets') ?
            ''
            :
          <InputGroup style={{width: '75%', margin:'8px auto'}}>
                <Input _focus={{bg: 'ivory'}} variant='filled' placeholder='Search for a stock' value={searchInput} onChange={handleSearchInput} onKeyDown={handleKeyDown}/> 
                <ChakraLink as={RouterLink} to='/routes/markets'>
                  {
                    searchInput ?
                  <InputRightAddon children={<BsSearch/>} style={{cursor:'pointer'}} onClick={() => transferToSearch(searchInput)} />
                  :
                  ''
                  }
                </ChakraLink>
            </InputGroup>
          }

        </nav>
    )
}

export const Footer:React.FC = () => {
    return <footer className="py-4 underline" style={{backgroundColor:'#2d2d2d', color:'antiquewhite'}}>Footer</footer>
}