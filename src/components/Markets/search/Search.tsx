import Loading from "../../../components/Loading";
import {Input, InputGroup, InputRightAddon} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import {BsSearch} from 'react-icons/bs';
import { useQuery } from "@tanstack/react-query";


export default function SearchStocks(){
    document.title = "Search Stocks";
    const [searchInput, setSearchInput] = useState('')

    function handleSearchInput(e:any){
        setSearchInput(e.target.value);
    }

    useEffect(() => {
        console.log(searchInput)
    }, [searchInput])

    function executeSearch(){
        axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchInput}&apikey=${process.env.avKey}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            // resolve(response.data)
        })
    }

    document.addEventListener('keydown', (e:any) => {
        if (e.Keycode === 13) {
            executeSearch;
        }
    })

    return (
        <section>
            <InputGroup>
                <Input variant='filled' placeholder='Search stocks' value={searchInput} onChange={handleSearchInput} />
                <InputRightAddon children={<BsSearch/>} style={{cursor:'pointer'}} onClick={executeSearch} />
            </InputGroup>

        </section>
    )
}