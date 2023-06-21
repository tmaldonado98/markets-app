import Loading from "../../../components/Loading";
import {Button, Card, CardHeader, HStack, Heading, Input, InputGroup, InputRightAddon, Stack, Tag} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { MyContext } from "../../Context";
import {BsSearch} from 'react-icons/bs';
import { useQuery } from "@tanstack/react-query";
import './search.css';
import '../../../styles/globals.css';
import Selected from "./Selected";


export default function SearchStocks(){
    document.title = "Search Stocks";
    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState({bestMatches: []})

    const [selectedTicker, setSelectedTicker] = useState('');
    const [hideResults, setHideResults] = useState(true);
    const [hideSelect, setHideSelect] = useState(true);

    const {recent, setRecent, changeRecent, termFromHeader} = useContext(MyContext)!;

    function handleSearchInput(e:any){
        setSearchInput(e.target.value);
    }

    useEffect(() => {
        console.log(recent);
        localStorage.setItem('recent', JSON.stringify(recent));

    }, [recent])


    async function executeSearch(searchTerm:string){
        setSelectedTicker('');
        // const searchTerm = searchInput;
        if (searchTerm === '') {
            return false;
        } 
        else {
            await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${process.env.avKey}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                setHideResults(false);
                setHideSelect(true);
                console.log(response.data);
                setSearchResults(response.data);
            })
            .catch(error => {
                console.error(error)
                return error;
            })
        }

    }

    useEffect(() => {
        executeSearch(termFromHeader);
    }, [termFromHeader])

    function handleKeyDown(e: any) {
        if (e.keyCode === 13) {
            executeSearch(searchInput);
        }
        else {
            return false;

        }
      }

    function handleSelect(ticker:string){
            console.log(ticker);
            // setSearchResults([]);
            setHideSelect(false);
            setHideResults(true);
            setSelectedTicker(ticker);
            changeRecent(ticker)
    }

    function handleReset(){
        setHideResults(true);
        setHideSelect(true);
        // setSelectedTicker('')
    }

    return (
        <section style={{width: '90%', margin: 'auto'}}>
            <InputGroup>
                <Input variant='filled' placeholder='Search stocks' value={searchInput} onChange={handleSearchInput} onKeyDown={handleKeyDown}/> 
                <InputRightAddon children={<BsSearch/>} style={{cursor:'pointer'}} onClick={() => executeSearch(searchInput)} />
                <Button onClick={handleReset}>Reset</Button>
            </InputGroup>

            {/* <div className="ad">Insert ad here</div> */}
            <div id="recent">
                {recent !== '' && <h2>Recently viewed stocks:</h2>}
                {recent !== '' &&
                recent.slice(-5).reverse().map((each:string) => {
                    if(each === '[""]'){
                        return false;
                    } 
                    return (
                        <HStack spacing={4}>
                            <Tag size='lg' key={each} variant='solid' colorScheme='teal' _hover={{bg:'teal.200', color:'black', fontWeight:'600'}} onClick={() => handleSelect(each)}>
                                {each}
                            </Tag>
                        </HStack>
                    
                    )
                })}

            </div>
            <div>
            {/* {hideResults === false && !searchResults.bestMatches && */}
            {hideResults === false && (searchResults.bestMatches === undefined || searchResults.bestMatches.length === 0) &&
                <>
                    <p>Try again later.</p>
                </>
                }
                {hideResults === false && searchResults && searchResults.bestMatches.length > 0 ?
                searchResults.bestMatches.map((each:any) => {
                    return (
                        <Stack visibility={hideResults ? "hidden" : "visible"} key={each["1. symbol"]} style={{marginBottom:'14px'}}>
                            <Card size='md'>
                                <CardHeader>
                                    <Heading size='md' style={{cursor:'pointer'}} onClick={() => handleSelect(each["1. symbol"])}>{each["2. name"]}</Heading>
                                    <p>Ticker: <span style={{fontStyle:'italic', fontWeight:'bold'}}>{each["1. symbol"]}</span></p>
                                    <p><span style={{fontStyle:'italic'}}>{each["4. region"]}</span></p>
                                    <br/>
                                    <p>Timezone: <span style={{fontStyle:'italic'}}>{each["7. timezone"]}</span></p>
                                    <p>Currency: <span style={{fontStyle:'italic'}}>{each["8. currency"]}</span></p>

                                </CardHeader>
                            </Card>
                        </Stack>
                    )
                })        
                :
                ''
                }

                {hideSelect === false ? 
                    <>
                        <h2 className='georgia' id="ticker-header">{selectedTicker}</h2>
                        <Selected ticker={selectedTicker}/>
                    </>
                    :
                    ''
                }
            </div>

        </section>
    )
}