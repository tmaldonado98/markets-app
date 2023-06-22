import { Heading, Input, Text } from "@chakra-ui/react";
import '../../routes/currencies/currencies.css';
import {useState} from 'react';


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

    const [baseInput, setBaseInput] = useState('');
    const [targetInput, setTargetInput] = useState('');

    function handleBase(value:string){
        setBase(value)
    }
    function handleTarget(value:string){
        setTarget(value)
    }

    function handleBaseInput(e:any){
        if (typeof e.keyDown === "string") {
            return false;
        }
        else {
            setBaseInput(e.target.value.replace(/,/g, ''))
        }
    }
    function handleTargetInput(e:any){
        if (typeof e.keyDown === "string") {
            return false;
        }
        else {

            setTargetInput(e.target.value.replace(/,/g, ''))
        }
    }

//SEND EXCHANGE PAIR 
    return (
        <section style={{flex:'1', display:'flex', flexDirection:'column', gap:'25px'}}>
            <Heading style={{textAlign:'center'}} size={'md'}>Currency Exchange Tool</Heading>
            <div className="exchange-tools">
                <Text>Base Currency:</Text>
                <p>{base}</p>
                <select defaultValue={'United States Dollar'}>
                    {currenciesMap.map(([key, value]) => (
                        <option value={key} onClick={() => handleBase(value)}>{key}</option>

                    ))}
                </select>

                <Input onChange={handleBaseInput} variant='filled' type="text" placeholder="Enter Value" value={baseInput !== '' ? Number(baseInput).toLocaleString() : ''}         
                    onKeyDown={(e) => {
                        const allowedCharacters = /^[0-9.]+$/;
                        const key = e.key;

                        if (!allowedCharacters.test(key) && key !== 'Backspace') {
                            e.preventDefault();
                        }
                    }}>

                </Input>
            </div>

            <div className="exchange-tools">
                <Text>Target Currency:</Text>
                <p>{target}</p>
                <select defaultValue={'Chinese Yuan'}>
                   {currenciesMap.map(([key, value]) => (
                        <option value={key} onClick={() => handleTarget(value)}>{key}</option>

                    ))}
                </select>

                <Input onChange={handleTargetInput} variant='filled' type="text" placeholder="Enter Value" value={targetInput !== '' ? Number(targetInput).toLocaleString() : ''}        
                    onKeyDown={(e) => {
                        const allowedCharacters = /^[0-9.]+$/;
                        const key = e.key;

                        if (!allowedCharacters.test(key) && key !== 'Backspace') {
                            e.preventDefault();
                        }
                    }}>
                </Input>
            </div>
        </section>
    )
}