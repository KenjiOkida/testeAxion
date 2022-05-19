import Image from "next/image"
import Link from "next/link"

import styles from '../styles/navbarStyle.module.css'
import Logo from '../public/assets/logo.png'

const Navbar = ({ itemSelected }) => {
    return (
        <nav>
            <div className={styles.logo}>
                <Image src={Logo} width='200px' height='25px' />
            </div>
            {itemSelected === 'foods'
            ?
                <Link href="/foodsList"><a className={styles.barItemSelected}>FOODS</a></Link>
            :
                <Link href="/foodsList"><a className={styles.barItem}>FOODS</a></Link>
            }
            {itemSelected === 'people'
            ?
                <Link href="/peopleList"><a className={styles.barItemSelected}>PEOPLE</a></Link>
            :
                <Link href="/peopleList"><a className={styles.barItem}>PEOPLE</a></Link>
            }
            {itemSelected === 'places'
            ?
                <Link href="/placesList"><a className={styles.barItemSelected}>PLACES</a></Link>
            :
                <Link href="/placesList"><a className={styles.barItem}>PLACES</a></Link>
            }
        </nav>
    );
}

export default Navbar;