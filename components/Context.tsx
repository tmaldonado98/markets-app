import React, { createContext, useState, ReactNode } from 'react';

type MyContextValue = {
  tabIndex: number;
  changeTabIndex:any;
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
  const [tabIndex, setTabIndex] = useState(0);

  function changeTabIndex (newIndex:number){
    setTabIndex(newIndex);
  }

  const [range, setRange] = useState('1mo');

  function changeRange (string:string){
    setRange(string);
  }

  const [param, setParam] = useState('High');

  function changeParam (string:string){
    setParam(string);
  }

  const contextValue: MyContextValue = {
    tabIndex,
    changeTabIndex,
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