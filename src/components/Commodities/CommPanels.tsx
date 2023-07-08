import axios from "axios";
import Loading from "../../components/Loading";
import {useEffect, useState, useContext} from 'react';
import { useQuery } from "@tanstack/react-query";
import { Button, Heading } from "@chakra-ui/react";
import CommChart from "./CommChart";
import { MyContext } from "../../components/Context";
import { BsPinFill } from "react-icons/bs";
import { MdOutlineDone } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

export default function CommPanels(props:any){   
    const commodity = props.commodity;

    useEffect(() => {
        window?.scrollTo({
            top: 0,
            left: 0,
            behavior:'smooth'
        })
    }, [])

    const [del, setDel] = useState(false);

    const { update, handlePin, sendDelete} = useContext(MyContext)!;

    const pinnedCommItems = localStorage.getItem('pinnedCommItems') ? localStorage.getItem('pinnedCommItems')! : '';
    const parsedPinnedComm = pinnedCommItems !== '' ? JSON.parse(pinnedCommItems) : '';   


    useEffect(() => {
        const pinnedCommItems = localStorage.getItem('pinnedCommItems') ? localStorage.getItem('pinnedCommItems')! : '';
        const parsedCommCrypto = pinnedCommItems !== '' ? JSON.parse(pinnedCommItems) : '';   
        console.log(parsedCommCrypto)

    }, [update])


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

    return (
        <>
            <div style={{ padding: '12px', margin:"12px auto", marginBottom: '24px', textAlign: 'center', fontWeight: '700' }}>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'3rem'}}>
                
                    <div style={{display:'flex', flexDirection:'column', flex:'1'}}>
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
                    
                        {
                            parsedPinnedComm.includes(commodity + '@#pinnedCommItems^4,' + commodity) ?
                                <span style={{ display: 'flex', flexDirection: 'column', width: 'fit-content', textAlign: 'center' }}>
                                    <Button onMouseEnter={() => setDel(true)} onMouseLeave={() => setDel(false)} style={{ width: 'fit-content', margin: '0 auto' }} variant='ghost' onClick={() => sendDelete(commodity + '@#pinnedCommItems^4,' + commodity, 'pinnedCommItems')}>{del === false ? <MdOutlineDone /> : <TiDelete />}</Button>
                                    Pinned To Home
                                </span>
                                :
                                <span style={{ display: 'flex', flexDirection: 'column', width: 'fit-content', textAlign: 'center' }}>
                                    <Button style={{ width: 'fit-content', margin: '0 auto' }} variant='ghost' onClick={() => handlePin(commodity + '@#pinnedCommItems', [4, commodity], 'pinnedCommItems')}><BsPinFill /></Button>
                                    Pin Item
                                </span>
                        }
                </div>
            </div>
            <CommChart commData={data} />
        </>
    )
}
