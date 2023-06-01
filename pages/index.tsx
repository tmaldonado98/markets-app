import Link from "next/link";
import { Footer, Header } from "./components/Header";
import Head from "next/head";


export default function Home() {
  let test = '6';

  return (
    <section>
      <Head>
        <title>Markets App</title>
      </Head>

      <Header/>
        <main>
        

          <img style={{height: 'auto', width:'550px'}} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F001%2F330%2F263%2Foriginal%2Fstock-market-graph-trading-chart-for-business-and-finance-free-vector.jpg&f=1&nofb=1&ipt=fa08a3632004a23da25f69703978ec9779c8e2777acb8f07786a6f2aad7b0bac&ipo=images"/>

        </main>
    
      <Footer/>
    </section>
)
}
