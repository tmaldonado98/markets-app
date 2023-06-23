import React, { createContext, useState, ReactNode } from 'react';

type MyContextValue = {
  tabIndex: string;
  changeTabIndex:any;
  setTabIndex:any;

  indexIndex:string;
  changeIndexIndex:any;
  setIndexIndex:any;

  range:string;
  setRange:any;
  changeRange:any;
  param:string;
  setParam:any;
  changeParam:any;

  recent:any;
  setRecent:any;
  changeRecent:any;

  marketsIndex: string;
  setMarketsIndex:any;
  changeMarketsIndex:any;

  termFromHeader:string;
  setTermFromHeader:any;
  changeTermFromHeader:any;

  server:any;
};

// Create the context
export const MyContext = createContext<MyContextValue | undefined>(undefined);

type MyContextProviderProps = {
  children: ReactNode;
};

export const MyContextProvider = ({ children }: MyContextProviderProps) => {
    // REACT_APP_localServer   REACT_APP_marketsServer
  const server = process.env.REACT_APP_marketsServer;

  //header tabs index
  const storageIndex = sessionStorage.getItem('tabIndex')!
  const [tabIndex, setTabIndex] = useState(storageIndex);

  function changeTabIndex (newIndex:string){
    setTabIndex(newIndex);
  }

  //markets tab indexes
  const [indexIndex, setIndexIndex] = useState('0')
  function changeIndexIndex (newIndex:string){
    setIndexIndex(newIndex);
  }

  const [range, setRange] = useState('1mo');

  function changeRange (string:string){
    setRange(string);
  }

  const [param, setParam] = useState('Close');

  function changeParam (string:string){
    setParam(string);
  }



  //context state for recently viewed tickers
  const recentLocal = localStorage.getItem('recent') === null ? '' : JSON.parse(localStorage.getItem('recent')!);
  const [recent, setRecent] = useState(recentLocal);

  function changeRecent(string:string){
    if (recent.includes(string)) {
      recent.splice(recent.indexOf(string), 1)
    }
    setRecent([...recent, string])
    
  }


  ////markets route indexes
  const storedMarketsInd = sessionStorage.getItem('marketsIndex')!;
  const [marketsIndex, setMarketsIndex] = useState(storedMarketsInd)
  function changeMarketsIndex(newIndex:string){
    setMarketsIndex(newIndex);
  }


  ///execute search function
  const [termFromHeader, setTermFromHeader] = useState('');
  function changeTermFromHeader(term:string){
    setTermFromHeader(term);
  }

  const contextValue: MyContextValue = {
    tabIndex,
    changeTabIndex,
    setTabIndex,
    indexIndex,
    changeIndexIndex,
    setIndexIndex,
    range,
    setRange,
    changeRange,
    param,
    setParam,
    changeParam,
    recent,
    setRecent,
    changeRecent,
    marketsIndex,
    setMarketsIndex,
    changeMarketsIndex,
    termFromHeader,
    setTermFromHeader,
    changeTermFromHeader,
    server,
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};