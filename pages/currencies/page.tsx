import Head from "next/head";
import Link from "next/link";

export default function Currencies(){


    return(
        <div>
            <Head>
                <title>Global Currencies Data</title>
            </Head>
            <Link href='../'>
                Home
            </Link>
            <h1>Global Currency Data here</h1>
        </div>

    )
}