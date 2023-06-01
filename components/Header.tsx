// import Link from "next/link"
import { Link } from '@chakra-ui/next-js'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'


export const Header:React.FC = () => {
    return (
        <nav className='flex justify-evenly'>
          <Tabs variant='soft-rounded' colorScheme='red'>
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
              {/* <TabPanels>
                  <TabPanel>
                  <p>one!</p>
                  </TabPanel>
                  <TabPanel>
                  <p>two!</p>
                  </TabPanel>
              </TabPanels> */}
          </Tabs>


            
            
            
        </nav>
    )
}

export const Footer:React.FC = () => {
    return <footer className="bg-gray-200 py-4 underline">Footer</footer>
}