import Link from "next/link"
import Head from "next/head"



export default function Stocks(){


    return(
        <div>
        <Head>
            <title>Global Stock Market Data</title>
        </Head>
            <Link href='../'>
                Home
            </Link>
            <h1>Stock Data here</h1>
        </div>

    )
}