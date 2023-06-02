// import Link from "next/link"
import { Link } from '@chakra-ui/next-js';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import './headerfooter.css';

export const Header:React.FC = () => {
    return (
        <nav style={{borderBottom: 'solid 4px black', flexWrap:'wrap'}} className='flex justify-evenly p-6'>
          <Tabs variant='soft-rounded' colorScheme='blue'>
              <TabList>
                  <Tab>
                    <Link color='blue.400' _hover={{ color: 'blue.500' }} href='/'>
                      Home
                    </Link>
                  </Tab>

                  <Tab>
                    <Link color='blue.400' _hover={{ color: 'blue.500' }} href='/routes/stocks'>
                      Global Markets Data
                    </Link>
                  </Tab>

                  <Tab>
                    <Link color='blue.400' _hover={{ color: 'blue.500' }} href='/routes/currencies'>
                      Global Currencies Data
                    </Link>
                  </Tab>

                  <Tab>
                  <Link color='blue.400' _hover={{ color: 'blue.500' }} href='/routes/commodities'>
                    Global Commodities Prices
                  </Link>
                  </Tab>

              </TabList>

          </Tabs>
            
        </nav>
    )
}

export const Footer:React.FC = () => {
    return <footer className="py-4 underline">Footer</footer>
}