'use client'
import { FC, ReactNode } from "react";
import { Header, Footer } from "../components/Header";
// import './styles/globals.css';
// import { Footer } from "./components/Footer";
import { ChakraProvider } from '@chakra-ui/react'
import Head from "next/head";
import { Providers } from "./providers";
// import { CacheProvider } from '@chakra-ui/next-js'




interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({children}) => {
  return (
    // <CacheProvider>
    <html lang="en">
      <body>
        <Providers>
          <Header /> 
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
  {/* </CacheProvider> */}
}

export default Layout;