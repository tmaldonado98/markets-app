import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../../components/Loading';
import { Heading } from '@chakra-ui/react';
import CryptoChart from './CryptoChart';
import {useContext} from 'react';
import { MyContext } from '../../components/Context';
import { Chart } from '../../components/Markets/Chart';
import ToTop from '../ToTop';

// const {server} = useContext(MyContext)!;

export default function CryptoData (props:any) {
    const cryptoData = props.cryptoData;

    return (
        <>  
            <ToTop/>
            <Heading className='georgia' size={'lg'} style={{textAlign:'center'}}>Daily Prices and Volumes for {cryptoData[1]}</Heading>
            {/* data['Meta Data']['3. Digital Currency Name'] */}

            {/* <p style={{fontStyle:'italic'}}>Base Currency USD</p> */}
            
            <div>
                {/* <CryptoChart chartData={cryptoData}/> */}
                <Chart crypto={cryptoData[0]}/>
            </div>
        </>
    )
}