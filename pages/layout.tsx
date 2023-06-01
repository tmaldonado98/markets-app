import { FC, ReactNode } from "react";
import { Header, Footer } from "./components/Header";
// import './globals.css';
// import { Footer } from "./components/Footer";

interface LayoutProps {
  children: ReactNode
}

const layout: FC<LayoutProps> = ({children}) => {
  return (
    <html lang="en">
      <head>
        <title>Markets App</title>
        
      </head>
      <div>
        <Header /> 
        {children}
        <Footer />
      </div>
    </html>
  )
}

export default layout;