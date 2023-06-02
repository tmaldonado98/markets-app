'use client'
import { FC, ReactNode } from "react";
import { Header, Footer } from "../components/Header";
import '../styles/globals.css';
import Head from "next/head";
import { Providers } from "./providers";




interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({children}) => {
  return (
    <html lang="en">
      <head>
        <title>Markets App</title>
      </head>
      <body>
        <Providers>
          <Header /> 
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export default Layout;