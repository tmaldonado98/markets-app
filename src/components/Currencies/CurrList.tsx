import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import Loading from "../Loading";
import { Card, CardHeader, CardBody, CardFooter, Heading, Box, Text } from '@chakra-ui/react'
import { MyContext } from "../Context";
import '../../styles/globals.css';

  
export default function CurrList(){
    const {server} = useContext(MyContext)!;
    // const supportedPairs:any = ["AUDUSD","EURGBP","EURUSD","GBPUSD","NZDUSD","USDAED","USDAFN","USDALL","USDAMD","USDANG","USDAOA","USDARS","USDATS","USDAUD","USDAWG","USDAZM","USDAZN","USDBAM","USDBBD","USDBDT","USDBEF","USDBGN","USDBHD","USDBIF","USDBMD","USDBND","USDBOB","USDBRL","USDBSD","USDBTN","USDBWP","USDBYN","USDBYR","USDBZD","USDCAD","USDCDF","USDCHF","USDCLP","USDCNH","USDCNY","USDCOP","USDCRC","USDCUC","USDCUP","USDCVE","USDCYP","USDCZK","USDDEM","USDDJF","USDDKK","USDDOP","USDDZD","USDEEK","USDEGP","USDERN","USDESP","USDETB","USDEUR","USDFIM","USDFJD","USDFKP","USDFRF","USDGBP","USDGEL","USDGGP","USDGHC","USDGHS","USDGIP","USDGMD","USDGNF","USDGRD","USDGTQ","USDGYD","USDHKD","USDHNL","USDHRK","USDHTG","USDHUF","USDIDR","USDIEP","USDILS","USDIMP","USDINR","USDIQD","USDIRR","USDISK","USDITL","USDJEP","USDJMD","USDJOD","USDJPY","USDKES","USDKGS","USDKHR","USDKMF","USDKPW","USDKRW","USDKWD","USDKYD","USDKZT","USDLAK","USDLBP","USDLKR","USDLRD","USDLSL","USDLTL","USDLUF","USDLVL","USDLYD","USDMAD","USDMDL","USDMGA","USDMGF","USDMKD","USDMMK","USDMNT","USDMOP","USDMRO","USDMRU","USDMTL","USDMUR","USDMVR","USDMWK","USDMXN","USDMYR","USDMZM","USDMZN","USDNAD","USDNGN","USDNIO","USDNLG","USDNOK","USDNPR","USDNZD","USDOMR","USDPAB","USDPEN","USDPGK","USDPHP","USDPKR","USDPLN","USDPTE","USDPYG","USDQAR","USDROL","USDRON","USDRSD","USDRUB","USDRWF","USDSAR","USDSBD","USDSCR","USDSDD","USDSDG","USDSEK","USDSGD","USDSHP","USDSIT","USDSKK","USDSLL","USDSOS","USDSPL","USDSRD","USDSRG","USDSTD","USDSTN","USDSVC","USDSYP","USDSZL","USDTHB","USDTJS","USDTMM","USDTMT","USDTND","USDTOP","USDTRL","USDTRY","USDTTD","USDTVD","USDTWD","USDTZS","USDUAH","USDUGX","USDUSD","USDUYU","USDUZS","USDVAL","USDVEB","USDVEF","USDVES","USDVND","USDVUV","USDWST","USDXAF","USDXAG","USDXAU","USDXBT","USDXCD","USDXDR","USDXOF","USDXPD","USDXPF","USDXPT","USDYER","USDZAR","USDZMK","USDZMW","USDZWD"]
    
//shortened
    const supportedPairs:string[][] = [
        ["Chinese Yuan", "USDCNY"],
        ["Euro", "USDEUR"],
        ["Singapore Dollar", "USDSGD"],
        ["Japanese Yen", "USDJPY"],
        ["Great British Pound", "USDGBP"],
        ["Hong Kong Dollar", "USDHKD"],
        ["Indian Rupee", "USDINR"],
        ["Russian Ruble", "USDRUB"],
        ["Brazilian Real", "USDBRL"],
        ["Mexican Peso", "USDMXN"],
        ["Australian Dollar", "USDAUD"],
        ["Swiss Franc", "USDCHF"],
        ["New Zealand Dollar", "USDNZD"],
        ["Canadian Dollar", "USDCAD"],
        ["South African Rand", "USDZAR"],
    ]

    const [exch, setExch] = useState([]); //<ExchangeData[]>

    ///////********** UNCOMMENT FOR PRODUCTION
    setTimeout(() => {
        refetch();
    }, 300000);


    const [timestampState, setTimestampState] = useState<any>('')

    async function retrieveExch (){
        const responseData:any = [];
        for(const each of supportedPairs){
                // REACT_APP_localServer   REACT_APP_marketsServer
                // console.log(each[0], each[1])
            const response = await axios.get(`${server}/routes/currencies`, {
                params: {
                    pairs: each[1]
                }
            })
            responseData.push([each[0], response.data])
        }
        setExch(responseData);       
        return responseData;
    }
   
    useEffect(() => {
        // console.log(Object.entries(exch))
        // console.log(exch)
        if (exch.length > 10) {
            const {timestamp} = exch[0][1]['USDCNY']
            const formattedTimestamp = new Date(timestamp * 1000);

            setTimestampState(formattedTimestamp.toLocaleString(undefined, {timeStyle: 'short'}))
            // console.log(formattedTimestamp.toLocaleString(undefined, {timeStyle: 'short'}))
        }
    }, [exch])

    const { data, isLoading, isError, error, refetch } = useQuery(['pairs'], retrieveExch, {
        refetchOnWindowFocus: false,
        staleTime: 300000,
      })
//staletime 5 minutes

      if(isLoading){
        <div><Loading/></div>
      }

      if(isError){
        <div><p>We have encountered an error. Please try again in a minute and check your network connectivity.</p></div>
      }

// useEffect(() => {
//     console.log(timestampState)
// }, [timestampState])

    return (
        <div style={{flex:'1', padding:'0 65px', display:'flex', flexDirection:'column', gap:'5px'}}>
            <Heading size={'md'} style={{ textAlign: 'center' }} className="georgia">
                Currency Exchange Rates
            </Heading>
            <p><b>Base USD</b></p>
            <p  className="georgia" style={{fontSize:'13px', fontStyle:'italic'}}>Last Updated: {timestampState}</p>
        {data?.length > 10 ? data.map((each:{ [key: string]: any }) => {
          const exchange = each[0];
          const { rate, timestamp } = Object.values(each[1])[0] as {
            rate: string;
            timestamp: any;
          };
          const formattedTimestamp = new Date(timestamp * 1000);
        //   console.log(exchange, rate, timestamp)
          return (
            <ExchangeCard exchange={exchange} rate={rate} timestamp={formattedTimestamp.toLocaleString(undefined, {timeStyle: 'short'})}/> 
          )
        }
        )
          :
          <Loading/>
          } 
            <a href="https://www.freeforexapi.com">
                <img alt="Free Forex API" src="https://www.freeforexapi.com/Images/link.png" height="20" />
            </a>          
        </div>
    );
}

export function ExchangeCard (props:any){

    return (
        <Card>
            <CardBody>
                <Box style={{textAlign:'center'}}>
                    <Heading size='xs' textTransform='uppercase'>
                        {props.exchange}
                    </Heading>
                    <Text pt='2' fontSize='lg' className="numbers">
                        {props.rate}
                    {/* <p style={{fontSize:'11px', fontStyle:'italic'}}>Last Updated: {props.timestamp}</p> */}
                    </Text>
                    
                </Box>
            </CardBody>

        </Card>
    )
}