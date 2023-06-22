import { Heading, Text } from "@chakra-ui/react";


export default function ExchangeTool () {


    return (
        <div style={{flex:'1'}}>
            <Heading size={'md'}>Currency Exchange Tool</Heading>
            <Text>Base Currency:</Text>
            <select>
                <option value={'placeholder'}>placeholder</option>
            </select>
            <input type="number" placeholder="Enter Value"></input>
        </div>
    )
}