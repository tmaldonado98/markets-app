import Link from "next/link"

export const Header:React.FC = () => {
    return (
        <nav>
            <Link href='../stocks/page'>
              Global Markets Data
            </Link>
            <Link href='../currencies/page'>
              Global Currencies Data
            </Link>
        </nav>
    )
}

export const Footer:React.FC = () => {
    return <footer>Footer</footer>
}