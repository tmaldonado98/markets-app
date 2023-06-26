import { Link as ChakraLink, Heading, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
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
        <nav style={{borderBottom: 'solid 4px black', display:'flex', flexDirection:'column', justifyContent:'space-evenly', padding:'16px 42px', color:'blue.500', backgroundColor:'#2d2d2d', }}>
          <div>
            {/* <div style={{display:'flex', justifyContent:'center', gap: '10px'}}> */}
              <Heading size="lg" as={'h1'} style={{textAlign:'center', color:'ivory', fontSize:'35px'}} className='georgia'>Markets App</Heading>
              <Heading size='md' as={'h2'} style={{textAlign:'center', color:'ivory', fontSize:'24px'}} className='georgia'>Your Online Source For Financial Information</Heading>
            {/* </div> */}
            {/* <img src='../../assets/Markets App Logo.png' /> */}
            {/* ***** PUT LOGO ON FIREBASE AND FETCH FROM STORAGE URL */}
          </div>
          <Tabs index={Number(tabIndex)} variant='soft-rounded' colorScheme='blue' style={{margin:"20px auto 0"}}>
              <TabList>
                  <ChakraLink as={RouterLink} to='/'>
                    <Tab onClick={() => handleTabChange('0')} color='blue.500' style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                        Home
                    </Tab>
                  </ChakraLink>

                  <ChakraLink as={RouterLink} to='/routes/markets'>
                    <Tab onClick={() => handleTabChange('1')} color='blue.500' style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                      Stock Markets
                    </Tab>
                  </ChakraLink>

                  <ChakraLink as={RouterLink} to='/routes/currencies'>
                    <Tab onClick={() => handleTabChange('2')} color='blue.500' style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                      Foreign Exchanges
                    </Tab>
                  </ChakraLink>

                  <ChakraLink as={RouterLink} to='/routes/commodities'>
                    <Tab onClick={() => handleTabChange('3')} color='blue.500' style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                      Global Commodities
                    </Tab>
                  </ChakraLink>

                  <ChakraLink as={RouterLink} to='/routes/futures'>
                    <Tab onClick={() => handleTabChange('4')} color='blue.500' style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                      Futures
                    </Tab>
                  </ChakraLink>

                  <ChakraLink as={RouterLink} to='/routes/macroData'>
                    <Tab onClick={() => handleTabChange('5')} color='blue.500' style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                      U.S. Macro Data
                    </Tab>
                  </ChakraLink>

                  {/* <ChakraLink as={RouterLink} to='/routes/commodities'>
                    <Tab onClick={() => handleTabChange('5')} color='blue.500' style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                      Macro Trends
                    </Tab>
                  </ChakraLink>

                  <ChakraLink as={RouterLink} to='/routes/commodities'>
                    <Tab onClick={() => handleTabChange('6')} color='blue.500' style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                      Education Center
                    </Tab>
                  </ChakraLink> */}

              </TabList>

          </Tabs>
          {
            window.location.href.includes('/routes/markets') ?
            ''
            :
          <InputGroup style={{width: '33%', margin:'25px auto 15px auto'}}>
                <Input _focus={{bg: 'ivory'}} variant='filled' placeholder='Search for a stock' value={searchInput} onChange={handleSearchInput} onKeyDown={handleKeyDown}/> 
                  {
                    searchInput ?
                <ChakraLink as={RouterLink} to='/routes/markets'>
                  <InputRightAddon children={<BsSearch/>} style={{cursor:'pointer'}} onClick={() => transferToSearch(searchInput)} />
                </ChakraLink>
                  :
                  <InputRightAddon children={<BsSearch/>} style={{cursor:'pointer'}} />
                  }
            </InputGroup>
          }

        </nav>
    )
}

export const Footer:React.FC = () => {
    return <footer className="py-4 underline" style={{backgroundColor:'#2d2d2d', color:'antiquewhite'}}>Footer</footer>
}