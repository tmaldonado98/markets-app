import axios from "axios";
import Loading from "../../components/Loading";
import {useEffect, useState, useContext} from 'react';
import { useQuery } from "@tanstack/react-query";

export default function CommPanels(props:any){   
    const commodity = props.commodity;
    
    const [prepare, setPrepare] = useState('');

    const [commData, setCommData] = useState<any>('');

    // useEffect(() => {
    //     setCommodity('WTI')

    // }, [])

    async function getCommodities(comm:string){
        let toSend;
        if (comm === "Crude Oil (WTI)") {
            toSend = "WTI"
            // return getCommodities(toSend);

        }
        else if (comm === "Crude Oil (Brent)") {
            toSend = "BRENT"
            // return getCommodities(toSend);

        }
        else if (comm === "Natural Gas") {
            toSend = "NATURAL_GAS"
            // return getCommodities(toSend);
        }
        else {
            toSend = comm.toUpperCase()
            // return getCommodities(toSend);    
        }

            const response = await axios.get(`https://www.alphavantage.co/query?function=${toSend}&interval=monthly&apikey=${process.env.avKey}`)
            // setCommData(response.data);
            return response.data;
        }

    // function handleSettingComm(){
    //     let toSend;
    //     if (commodity === "Crude Oil (WTI)") {
    //         toSend = "WTI"
    //         return getCommodities(toSend);

    //     }
    //     else if (commodity === "Crude Oil (Brent)") {
    //         toSend = "BRENT"
    //         return getCommodities(toSend);

    //     }
    //     else if (commodity === "Natural Gas") {
    //         toSend = "NATURAL_GAS"
    //         return getCommodities(toSend);
    //     }
    //     else {
    //         toSend = commodity.toUpperCase()
    //         return getCommodities(toSend);    
    //     }

    // }

    const {data, isLoading, isError, error, refetch} = useQuery([commodity], () => getCommodities(commodity), {
        refetchOnWindowFocus: false,
        staleTime: 6 * 60 * 60 * 1000,
    })

    if(isLoading){
        return <div><Loading/></div>
    }

    if(isError){
        return <div style={{textAlign:'center'}}><p>Please Try Again In A Minute</p><Loading/></div>
    }

    console.log(data);
    return (
        <>
            <p>{data.name === "Crude Oil Prices WTI" ? data.name + ' - West Texas Intermediate' : data.name}</p>
            {/* <p>{commodity}</p> */}
            {/* {tabData.map((each:any) => (
                <p>{each.value}{each.date}</p>
            ))} */}
        </>
    )
}
