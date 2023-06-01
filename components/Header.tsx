// import Link from "next/link"
import { Link } from '@chakra-ui/next-js'
// import './headerfooter.css';


export const Header:React.FC = () => {
    return (
        <nav className='flex justify-evenly'>
            <Link color='blue.400' _hover={{ color: 'blue.500' }} href='/'>
              Home
            </Link>
            <Link color='blue.400' _hover={{ color: 'blue.500' }} href='/routes/stocks'>
              Global Markets Data
            </Link>
            <Link color='blue.400' _hover={{ color: 'blue.500' }} href='/routes/currencies'>
              Global Currencies Data
            </Link>
            <Link color='blue.400' _hover={{ color: 'blue.500' }} href='/routes/commodities'>
              Global Commodities Prices
            </Link>
        </nav>
    )
}

export const Footer:React.FC = () => {
    return <footer className="bg-gray-200 py-4 underline">Footer</footer>
}