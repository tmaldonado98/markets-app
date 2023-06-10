'use client'
import { FC, ReactNode, useState } from "react";
import { Header, Footer } from "../components/Header";
import '../styles/globals.css';
import Head from "next/head";
import { Providers } from "./providers";
import { MyContextProvider } from "../components/Context";

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({children}) => {
  
  // const contextValue = {
  //   tabIndex: 1
  // };
  const [tabIndex, setTabIndex] = useState(0);

  const changeTabIndex = (newIndex:number) => {
    setTabIndex(newIndex);
  };

  // tabIndex={tabIndex} setTabIndex={changeTabIndex}

  //I think Header should already have access to context, by being wrapped in provider.

  return (
    <html lang="en">
      <head>
        <title>Markets App</title>
      </head>
      <body>
        <Providers>
          <MyContextProvider>
            <Header /> 
            {children}
            <Footer />
          </MyContextProvider>
        </Providers>
      </body>
    </html>
  )
}

export default Layout;