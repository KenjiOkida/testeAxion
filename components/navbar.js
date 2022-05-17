import Image from "next/image"
import Link from "next/link"

import styles from '../styles/navbarStyle.module.css'
import Logo from '../public/assets/logo.png'

const Navbar = () => {
    return (
        <nav>
            <div className={styles.logo}>
                <Image src={Logo} width='200px' height='25px' />
            </div>
            <Link href="/foodsList"><a>FOODS</a></Link>
            <Link href="/peopleList"><a>PEOPLE</a></Link>
            <Link href="/placesList"><a>PLACES</a></Link>
        </nav>
    );
}

export default Navbar;