import React, { createContext, useState, ReactNode } from 'react';

type MyContextValue = {
  tabIndex: number;
  changeTabIndex:any
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

  const contextValue: MyContextValue = {
    tabIndex,
    changeTabIndex
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};