import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import Loading from "../Loading";

interface ExchangeData {
    key: string;
    rate: number;
    timestamp: number;
  }
  
export default function CurrList(){
    
    // const supportedPairs:any = ["AUDUSD","EURGBP","EURUSD","GBPUSD","NZDUSD","USDAED","USDAFN","USDALL","USDAMD","USDANG","USDAOA","USDARS","USDATS","USDAUD","USDAWG","USDAZM","USDAZN","USDBAM","USDBBD","USDBDT","USDBEF","USDBGN","USDBHD","USDBIF","USDBMD","USDBND","USDBOB","USDBRL","USDBSD","USDBTN","USDBWP","USDBYN","USDBYR","USDBZD","USDCAD","USDCDF","USDCHF","USDCLP","USDCNH","USDCNY","USDCOP","USDCRC","USDCUC","USDCUP","USDCVE","USDCYP","USDCZK","USDDEM","USDDJF","USDDKK","USDDOP","USDDZD","USDEEK","USDEGP","USDERN","USDESP","USDETB","USDEUR","USDFIM","USDFJD","USDFKP","USDFRF","USDGBP","USDGEL","USDGGP","USDGHC","USDGHS","USDGIP","USDGMD","USDGNF","USDGRD","USDGTQ","USDGYD","USDHKD","USDHNL","USDHRK","USDHTG","USDHUF","USDIDR","USDIEP","USDILS","USDIMP","USDINR","USDIQD","USDIRR","USDISK","USDITL","USDJEP","USDJMD","USDJOD","USDJPY","USDKES","USDKGS","USDKHR","USDKMF","USDKPW","USDKRW","USDKWD","USDKYD","USDKZT","USDLAK","USDLBP","USDLKR","USDLRD","USDLSL","USDLTL","USDLUF","USDLVL","USDLYD","USDMAD","USDMDL","USDMGA","USDMGF","USDMKD","USDMMK","USDMNT","USDMOP","USDMRO","USDMRU","USDMTL","USDMUR","USDMVR","USDMWK","USDMXN","USDMYR","USDMZM","USDMZN","USDNAD","USDNGN","USDNIO","USDNLG","USDNOK","USDNPR","USDNZD","USDOMR","USDPAB","USDPEN","USDPGK","USDPHP","USDPKR","USDPLN","USDPTE","USDPYG","USDQAR","USDROL","USDRON","USDRSD","USDRUB","USDRWF","USDSAR","USDSBD","USDSCR","USDSDD","USDSDG","USDSEK","USDSGD","USDSHP","USDSIT","USDSKK","USDSLL","USDSOS","USDSPL","USDSRD","USDSRG","USDSTD","USDSTN","USDSVC","USDSYP","USDSZL","USDTHB","USDTJS","USDTMM","USDTMT","USDTND","USDTOP","USDTRL","USDTRY","USDTTD","USDTVD","USDTWD","USDTZS","USDUAH","USDUGX","USDUSD","USDUYU","USDUZS","USDVAL","USDVEB","USDVEF","USDVES","USDVND","USDVUV","USDWST","USDXAF","USDXAG","USDXAU","USDXBT","USDXCD","USDXDR","USDXOF","USDXPD","USDXPF","USDXPT","USDYER","USDZAR","USDZMK","USDZMW","USDZWD"]
    
//shortened
    const supportedPairs:string[] = [
        "EURUSD",
        "EURGBP",
        "GBPUSD",
        "USDJPY",
        "AUDUSD",
        "USDCHF",
        "NZDUSD",
        "USDCAD",
        "USDZAR"
    ]

    const [exch, setExch] = useState<ExchangeData[]>([]);
    const [exchangeData, setExchangeData] = useState(['', ['', '', '']]);

    // setTimeout(() => {
    //     setExch([''])
    //     refetch();
    //     // retrieveExch();
    // }, 600000);

    useEffect(() => {
        retrieveExch();
    }, [])

    async function retrieveExch (){
        const responseData = [];

        for(const each of supportedPairs){
                // REACT_APP_localServer   REACT_APP_marketsServer
            const response = await axios.get(`${process.env.REACT_APP_localServer}/routes/currencies`, {
                params: {
                    pairs: each
                }

            })

            responseData.push(response.data)


            // .then(async response => {
            //     await setExch([...exch, response.data])
            //     console.log(response.data);
            // })
            // .catch(error => {
            //     console.error(error)
            //     // reject(error);
            // })
        }
        setExch(responseData);
        // let rate:string;
        // let timestamp:string;

        exch.forEach((obj:any) => {
            const set = [];
            for (const key in obj) {
              const rate:string = obj[key].rate;
              const timestamp:string = obj[key].timestamp;
            //   setExchangeData([...exch, [obj, rate, timestamp]])
            set.push([obj, rate, timestamp])
            }
            setExchangeData(set);
        });
    }
   
    useEffect(() => {
        console.log(Object.entries(exch))
        console.log(exch)
    }, [exch])

    // const { data, isLoading, isError, error, refetch } = useQuery(['pairs'], retrieveExch, {
    //     refetchOnWindowFocus: false,
    //     staleTime: 600000,
    //   })

    //   if(isLoading){
    //     <div><Loading/></div>
    //   }

    return (
        <div>
          {exch ? exch.slice(1).map(each => {
          const { rate, timestamp } = Object.values(each)[0];
          const formattedTimestamp = new Date(timestamp * 1000);
          return (
            <p key={exch.indexOf(each)}>{Object.keys(each)[0]} {rate} {formattedTimestamp.toLocaleString(undefined, {timeStyle: 'short'})}</p>
          )
        }
        )
          :
          <Loading/>
          } 
          {/* {each.rate} {each.timestamp} */}


{/* + Object.keys(each).rate */}

{/* <button onClick={retrieveExch}>test</button> */}
            {/* <div>
                {exch.map((each:any) => {
                    <p>
                        {each}
                    </p>
                })}
            </div>  */}
        </div>
    );
}