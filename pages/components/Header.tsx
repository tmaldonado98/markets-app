import Link from "next/link"
// import './headerfooter.css';


export const Header:React.FC = () => {
    return (
        <nav className='flex justify-evenly'>
            <Link href='/'>
              Home
            </Link>
            <Link href='/routes/stocks'>
              Global Markets Data
            </Link>
            <Link href='/routes/currencies'>
              Global Currencies Data
            </Link>
            <Link href='/routes/commodities'>
              Global Commodities Prices
            </Link>
        </nav>
    )
}

export const Footer:React.FC = () => {
    return <footer className="bg-gray-200 py-4 underline">Footer</footer>
}