// import './App.css';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import Landing from './Landing.tsx';
import Layout from './Layout.tsx';
import Stocks from './routes/markets/Markets.tsx';
import Currencies from './routes/currencies/page.tsx';
import Commodities from './routes/commodities/page.tsx';
import { useEffect } from 'react';

function App() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route exact path='/' element={<Landing />}/>
      <Route path='/routes/markets' element={<Stocks />}/>
      <Route path='/routes/currencies' element={<Currencies />}/>
      <Route path='/routes/commodities' element={<Commodities />}/>
    </Routes>

    // <body className="App">
    //   <head>
    //     <title>Markets App</title>
    //   </head>
    //   <main>
    //     <Layout> 
    //       <Landing />
    //     </Layout>
    //   </main>

    // </body>
  );
}

export default App;
