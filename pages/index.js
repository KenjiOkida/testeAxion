import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../styles/Home.module.css'

import Logo from '../public/assets/logo.png'

export default function Home() {
  return ( <>
    <div className={styles.container}>
      <Head>
        <title>ORANGE - Login</title>
        <link rel="icon" href="https://m3-static.marvelapp.com/favicon.ico" />
      </Head>
      <div className={styles.content}>
        <div className={styles.loginForm}>
          <Image src={Logo} width='200px' height='25px' />
          <p>Email</p>
          <p>Password</p>
          <p>Problemas para acessar sua conta?</p>
          <Link href="/foodsList"><a className={styles.btn}>Teste navegação</a></Link>
        </div>
      </div>
    </div>  
  </> )
}
