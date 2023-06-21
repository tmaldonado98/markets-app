import { Text } from "@chakra-ui/react";


export default function ExchangeTool () {


    return (
        <div>
            <Text>Base Currency:</Text>
            <select>
                <option value={'placeholder'}>placeholder</option>
            </select>
            <input type="number" placeholder="Enter Value"></input>
        </div>
    )
}