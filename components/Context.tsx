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

};

// Create the context
export const MyContext = createContext<MyContextValue | undefined>(undefined);

type MyContextProviderProps = {
  children: ReactNode;
};

export const MyContextProvider = ({ children }: MyContextProviderProps) => {
  //header tabs index
  const [tabIndex, setTabIndex] = useState('0');

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

  const [param, setParam] = useState('Highs');

  function changeParam (string:string){
    setParam(string);
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
    changeParam
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};