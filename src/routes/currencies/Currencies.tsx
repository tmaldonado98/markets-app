import CurrList from "../../components/Currencies/CurrList"; 
import ExchangeTool from "../../components/Currencies/ExchangeTool";
import './currencies.css';

export default function Currencies(){
    document.title = "Foreign Exchanges";


    return(
        <>
            <main id="curr-container">
                <CurrList />
                <ExchangeTool />
            </main>
            <div className="ad"></div>
        </>

    )
}

{/* <CurrencyRow />
<p>Is Equal To</p>
<CurrencyRow /> */}