import CurrList from "../../components/Currencies/CurrList"; 
import ExchangeTool from "../../components/Currencies/ExchangeTool";

export default function Currencies(){
    document.title = "Foreign Exchanges";


    return(
        <>
            <h1>Global Currency Data here</h1>
            <main id="curr-container">
                <CurrList />
                <ExchangeTool />
            </main>
        </>

    )
}

{/* <CurrencyRow />
<p>Is Equal To</p>
<CurrencyRow /> */}