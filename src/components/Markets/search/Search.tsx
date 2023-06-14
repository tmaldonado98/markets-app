import Loading from "../../../components/Loading";
import {Input, InputGroup, InputRightAddon} from "@chakra-ui/react";
import {BsSearch} from 'react-icons/bs';

export default function SearchStocks(){
    document.title = "Search Stocks";


    return (
        <section>
            <InputGroup>
                <Input variant='filled' placeholder='Search stocks' />
                {/* <InputRightAddon children={<BsSearch/>} /> */}
            </InputGroup>

        </section>
    )
}