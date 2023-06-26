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
            <div style={{padding:'12px', marginBottom:'6px', textAlign:'center', fontWeight:'700'}}>
                <Heading className="georgia" size={'lg'}>
                    {data.name === "Crude Oil Prices WTI" ? data.name + ' - West Texas Intermediate' : data.name}
                </Heading>
                {data.name === "Crude Oil Prices WTI" || data.name === "Crude Oil Prices Brent" ?
                    <Heading className="georgia" size={'md'}>dollars per barrel</Heading>
                :
                data.name === "Henry Hub Natural Gas Spot Price" ? 
                    <Heading className="georgia" size={'md'}>dollars per million BTU</Heading>
                :
                data.name === "Global Price of Copper" || data.name === "Global Price of Aluminum" || data.name === "Global Price of Wheat" || data.name === "Global Price of Corn" ?
                    <Heading className="georgia" size={'md'}>dollars per metric ton</Heading>
                :
                data.name === "Global Price of Cotton" || data.name === "Global Price of Sugar" || data.name === "Global Price of Coffee" || data.name === "Global Price of Corn" ?
                    <Heading className="georgia" size={'md'}>cents per pound</Heading>
                : 
                ''
                }                
            </div>
            <CommChart commData={data} />
        </>
    )
}
