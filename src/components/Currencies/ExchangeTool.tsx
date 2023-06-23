import { Heading, Input, Text } from "@chakra-ui/react";
import '../../routes/currencies/currencies.css';
import {useState, useEffect} from 'react';
import axios from "axios";
import '../../styles/globals.css';

export default function ExchangeTool () {

    const currenciesMap = [
            ["United States Dollar", "USD"],
            ["Chinese Yuan", "CNY"],
            ["Euro", "EUR"],
            ["Singapore Dollar", "SGD"],
            ["Japanese Yen", "JPY"],
            ["Great British Pound", "GBP"],
            ["Hong Kong Dollar", "HKD"],
            ["Indian Rupee", "INR"],
            ["Russian Ruble", "RUB"],
            ["Brazilian Real", "BRL"],
            ["Mexican Peso", "MXN"],
            ["Australian Dollar", "AUD"],
            ["Swiss Franc", "CHF"],
            ["New Zealand Dollar", "NZD"],
            ["Canadian Dollar", "CAD"],
            ["South African Rand", "ZAR"],
    ];

    const [base, setBase] = useState('USD');
    const [target, setTarget] = useState('CNY')

    const [baseInput, setBaseInput] = useState<any>('');
    const [targetInput, setTargetInput] = useState<any>('');

    function handleBase(value:string){
        setBase(value)
        setBaseInput('')
        setTargetInput('')

    }
    function handleTarget(value:string){
        setTarget(value)
        setBaseInput('')

        setTargetInput('')
    }

    // const [exchangePair, setExchangePair] = useState('USDCNY');

    // function handleExchangePair(){
    //     setExchangePair(base+target)
    // }

    const [rate, setRate] = useState<any>('')

    async function saveExchangeRate(){
        // REACT_APP_localServer   REACT_APP_marketsServer
        // console.log(exchangePair)
        try {
            const response = await axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${base}&to_currency=${target}&apikey=${process.env.avKey}`)
            console.log(response.data["Realtime Currency Exchange Rate"]);
            setRate(response.data["Realtime Currency Exchange Rate"])
            return response.data["Realtime Currency Exchange Rate"];
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     console.log(base, target)
    //     // handleExchangePair();
    //     saveExchangeRate();
    //     // setTimeout(() => {
    //     // }, 2000);
    // }, [base, target])

    const exchangeRate = rate !== '' ? rate["5. Exchange Rate"] : '';

    function handleBaseInput(e:any){
        if (typeof e.keyDown === "string") {
            return false;
        }

        else {
            // setBaseInput(e.target.value.replace(/,/g, ''))
            // handleCalculationForTarget();    
            const baseInputValue = e.target.value.replace(/,/g, "");
            setBaseInput(baseInputValue);
            const calculation = baseInputValue !== '' ? parseFloat(baseInputValue) * exchangeRate : '';
            setTargetInput(calculation.toString());
        }
    }
    function handleTargetInput(e:any){
        if (typeof e.keyDown === "string") {
            return false;
        }
       
        else {
            const baseTargetValue = e.target.value.replace(/,/g, "");
            setTargetInput(baseTargetValue);
            const calculation = baseTargetValue !== '' ? parseFloat(baseTargetValue) / exchangeRate : '';
            setBaseInput(calculation.toString());

        }
    }
    

    const formattedTimestamp = new Date(rate['6. Last Refreshed']);
    
    return (
    <>
        <section style={{flex:'1', display:'flex', flexDirection:'column', gap:'25px'}}>
            <Heading style={{textAlign:'center'}} size={'md'}>Currency Exchange Tool</Heading>
            <div className="exchange-tools">
                {rate === '' ? '' :
                <p style={{textAlign:'center'}}>Last Updated: {formattedTimestamp.toLocaleString(undefined, {timeStyle: 'short'})} UTC</p>
                }
                <Text>Base Currency:</Text>
                <p><b>{base}</b></p>
                <select defaultValue={'United States Dollar'}>
                    {currenciesMap.map(([key, value]) => (
                        <option value={key} onClick={() => handleBase(value)}>{key}</option>

                    ))}
                </select>

                <Input onChange={handleBaseInput} variant='filled' type="text" placeholder="Enter Value" onFocus={saveExchangeRate} value={baseInput !== '' ? Number(baseInput).toLocaleString() : ''}         
                    onKeyDown={(e) => {
                        const allowedKeys = [
                            "Backspace",
                            "Period",
                            "Tab",
                            "Delete",
                            "ArrowLeft",
                            "ArrowRight",
                            "ArrowUp",
                            "ArrowDown",
                            "Home",
                            "End",
                            "Insert",
                            "Clear",
                            "Enter",
                            "Escape",
                            "PageUp",
                            "PageDown",
                            "Help",
                            /^[0-9.\b\t]+$/
                          ];
                      
                          if (!allowedKeys.includes(e.key) && !/^\d|\.$/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                    >

                </Input>
            </div>

            <div className="exchange-tools">
                <Text>Target Currency:</Text>
                <p><b>{target}</b></p>
                <select defaultValue={'Chinese Yuan'}>
                   {currenciesMap.map(([key, value]) => (
                        <option value={key} onClick={() => handleTarget(value)}>{key}</option>

                    ))}
                </select>

                <Input onChange={handleTargetInput} variant='filled' type="text" placeholder="Enter Value" onFocus={saveExchangeRate} value={targetInput !== '' ? Number(targetInput).toLocaleString() : ''}        
                    onKeyDown={(e) => {
                        const allowedKeys = [
                            "Backspace",
                            "Period",
                            "Tab",
                            "Delete",
                            "ArrowLeft",
                            "ArrowRight",
                            "ArrowUp",
                            "ArrowDown",
                            "Home",
                            "End",
                            "Insert",
                            "Clear",
                            "Enter",
                            "Escape",
                            "PageUp",
                            "PageDown",
                            "Help",
                            /^[0-9.\b\t]+$/
                          ];
                      
                          if (!allowedKeys.includes(e.key) && !/^\d|\.$/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                    >
                </Input>
            </div>
            
            {/* <div>
                <Heading size={'medium'}>Saved:</Heading>
            </div> */}
        </section>
        <div className="ad"></div>
    </>
    )
}