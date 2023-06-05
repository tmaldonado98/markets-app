// import Link from "next/link"
import { Link } from '@chakra-ui/next-js';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export const Header:React.FC = () => {
    return (
        <nav style={{borderBottom: 'solid 4px black', flexWrap:'wrap', gap:'8px', backgroundColor:'#2d2d2d'}} className='flex justify-evenly p-6'>
          <Tabs variant='soft-rounded' colorScheme='blue'>
              <TabList>
                  <Tab style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                    <Link color='blue.500' _hover={{ color: 'blue.500' }} href='/' scroll={true}>
                      Home
                    </Link>
                  </Tab>

                  <Tab style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                    <Link color='blue.500' _hover={{ color: 'blue.500' }} href='/routes/stocks' scroll={true}>
                      Global Markets
                    </Link>
                  </Tab>

                  <Tab style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                    <Link color='blue.500' _hover={{ color: 'blue.500' }} href='/routes/currencies' scroll={true}>
                      Global Currencies
                    </Link>
                  </Tab>

                  <Tab style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                    <Link color='blue.500' _hover={{ color: 'blue.500' }} href='/routes/commodities' scroll={true}>
                      Global Commodities
                    </Link>
                  </Tab>

                  <Tab style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
                    <Link color='blue.500' _hover={{ color: 'blue.500' }} href='/routes/commodities' scroll={true}>
                      Macro Trends
                    </Link>
                  </Tab>

                  <Tab style={{fontSize:'18px'}} _hover={{bg: 'blue.100', color:'blue.600'}}>
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