import { FC, ReactNode, useState } from "react";
import { Header, Footer } from "./components/Header";
import './styles/globals.css';

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({children}) => {
  return (
    <>
        <Header /> 
          {children}
        <Footer />
    </>
  )
}

export default Layout;