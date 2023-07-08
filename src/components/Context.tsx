import React, { createContext, useState, ReactNode, useEffect } from 'react';

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

  cryptoIndex:string;
  changeCryptoIndex:any;

  commIndex:string;
  changeCommIndex:any;

  category:string;
  changePinnedArr:any;
  removePinnedItem:any;

  update:boolean;
  provokeUpdate:any;
  handlePin:any;
  sendDelete:any;

};

// Create the context
export const MyContext = createContext<MyContextValue | undefined>(undefined);

type MyContextProviderProps = {
  children: ReactNode;
};

export const MyContextProvider = ({ children }: MyContextProviderProps) => {
    // REACT_APP_localServer   REACT_APP_marketsServer
  const server = process.env.REACT_APP_localServer;

  //header tabs index
  // const storageIndex = sessionStorage.getItem('tabIndex')!
  const [tabIndex, setTabIndex] = useState('0');

  function changeTabIndex (newIndex:string){
    setTabIndex(newIndex);
    sessionStorage.setItem('tabIndex', newIndex)

  }

  //markets tab indexes
  const [indexIndex, setIndexIndex] = useState('0')
  function changeIndexIndex (newIndex:string){
    setIndexIndex(newIndex);
    sessionStorage.setItem('indexIndex', newIndex.toString())
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
  // const storedMarketsInd = sessionStorage.getItem('marketsIndex')!;
  const [marketsIndex, setMarketsIndex] = useState('0')

  function changeMarketsIndex(newIndex:string){
    setMarketsIndex(newIndex);
    sessionStorage.setItem('marketsIndex', newIndex)

  }


  ///execute search function
  const [termFromHeader, setTermFromHeader] = useState('');
  function changeTermFromHeader(term:string){
    setTermFromHeader(term);
  }
  
    ////comm route indexes
    const [commIndex, setCommIndex] = useState('0')
    function changeCommIndex (newIndex:string){
      setCommIndex(newIndex);
      sessionStorage.setItem('commIndex', newIndex.toString())
    }
  

    ////crypto route indexes
    const [cryptoIndex, setCryptoIndex] = useState('0')
    function changeCryptoIndex (newIndex:string){
      setCryptoIndex(newIndex);
      sessionStorage.setItem('cryptoIndex', newIndex.toString())
    }

    //State to track whether pinned item is of type market index, news item, commodity, 
    // define state
    
    const [category, setCategory] = useState('');
  
    function changePinnedArr(newItem:string, indices:number[], category:string) {
      setCategory(category);
      // pass state variable as string into getItem method

      if (localStorage.getItem(category) === null) {
        //if pinned list doesn't exist
        const arrToSave = [];
        // .split('@#')[0].trim()  <-- if add this, then name of item will be clean in session storage.
        arrToSave.push(newItem + '^' + indices);
        localStorage.setItem(category, JSON.stringify(arrToSave));
        console.log(arrToSave);

      } 
      else {
        // if pinned list exists
        const arrToParse = localStorage.getItem(category)!;
        const parsed = localStorage.getItem(category) ? JSON.parse(arrToParse) : '';
        console.log(parsed)
        if(parsed.includes(newItem)){
          // .split('@#')[0].trim()
          //to avoid duplicate items
          console.log('Item already exists')
          return false;
        }
        else if(parsed === ''){
          // In case of malfunction
          return false;
        }
        else {
          //new items here
          // .split('@#')[0].trim()
          parsed.push(newItem + '^' + indices);
          console.log(parsed)
          localStorage.setItem(category, JSON.stringify(parsed));

        }
      }
    }


    function removePinnedItem(newItem:string, category:string){
      const trimmedIndex = newItem;
      // .split('@#')[0].trim()
      console.log(trimmedIndex);

      const arrToParse = localStorage.getItem(category)!;
      if (arrToParse !== null) {
        //// Executing deletion only if this storage item exists.
        const parsed = JSON.parse(arrToParse);
        
        const toPullOut = parsed.indexOf(trimmedIndex);

        //pull out index being sent by delete function from parsed array
        parsed.splice(toPullOut, 1);

        // console.log(toPullOut, parsed, trimmedIndex);

        //set filtered array as the new localStorage item
        localStorage.setItem(category, JSON.stringify(parsed));
      }
      else {
        return false;
      }

    }

  const [update, provokeUpdate] = useState(true);

    //for adding a pin
  function handlePin(item:string, indices:number[], category:string){

      provokeUpdate(!update);

      changePinnedArr(item, indices, category);
  }

  function sendDelete(item:string, category:string){
      provokeUpdate(!update);

      removePinnedItem(item, category)
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
    cryptoIndex, 
    changeCryptoIndex,
    commIndex,
    changeCommIndex,
    category,
    changePinnedArr,
    removePinnedItem,
    update,
    provokeUpdate,
    handlePin,
    sendDelete
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};