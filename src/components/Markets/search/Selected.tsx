import { Chart } from "../Chart"

interface SelectedProps{
    ticker: string
}

export default function Selected({ticker}: SelectedProps){
    return (
        <>
        <Chart ticker={ticker}/>
        </>
    )
}