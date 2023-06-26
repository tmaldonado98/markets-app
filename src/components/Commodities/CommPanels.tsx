import axios from "axios";
import Loading from "../../components/Loading";
import {useEffect, useState, useContext} from 'react';
import { useQuery } from "@tanstack/react-query";
import { Heading } from "@chakra-ui/react";
import CommChart from "./CommChart";

export default function CommPanels(props:any){   
    const commodity = props.commodity;

    async function getCommodities(comm:string){
        let toSend;
        if (comm === "Crude Oil (WTI)") {
            toSend = "WTI"
        }
        else if (comm === "Crude Oil (Brent)") {
            toSend = "BRENT"
        }
        else if (comm === "Natural Gas") {
            toSend = "NATURAL_GAS"
        }
        else {
            toSend = comm.toUpperCase()
        }

            const response = await axios.get(`https://www.alphavantage.co/query?function=${toSend}&interval=monthly&apikey=${process.env.avKey}`)
            return response.data;
        }

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
            <Heading size={'lg'} style={{padding:'12px', marginBottom:'6px', textAlign:'center', fontWeight:'700'}} className="georgia">
                {data.name === "Crude Oil Prices WTI" ? data.name + ' - West Texas Intermediate' : data.name}
            </Heading>
            <CommChart commData={data} />
        </>
    )
}
