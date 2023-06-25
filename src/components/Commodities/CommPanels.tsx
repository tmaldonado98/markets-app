import axios from "axios";
import Loading from "../../components/Loading";
import {useEffect, useState, useContext} from 'react';


export default function CommPanels(props:any){
    const [commData, setCommData] = useState({})
    
    const tabData = props.tabData;
    // const commodity = Array.isArray(tabData) ? tabData[0] + ' - ' + tabData[1] : tabData;
    

    return (
        <>
            <p>{tabData.name}     {tabData.unit}</p>
            {/* {tabData.map((each:any) => (
                <p>{each.value}{each.date}</p>
            ))} */}
        </>
    )
}
