import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { fetcher } from '../lib/api'
import { setCookie } from 'nookies'
import styles from '../styles/Home.module.css'
import Logo from '../public/assets/logo.png'
import Router from 'next/router'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  async function handleLogin() {
    const loginInfo = {
      identifier: email,
      password: password
    }

    const login = await fetcher('http://localhost:1337/auth/local', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
    })

    if (login.statusCode === 400){
      console.log("Erro no login")
    } else {
      //Setando um cookie que pode ser utilizados do lado do servidor e do cliente
      setCookie(null, 'jwt', login.jwt, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/' 
      })

      Router.push('/foodsList')
      console.log(login)
    }
  }

  return ( <>
    <div className={styles.container}>
      <Head>
        <title>ORANGE - Login</title>
        <link rel="icon" href="https://m3-static.marvelapp.com/favicon.ico" />
      </Head>
      <div className={styles.content}>
        <div className={styles.loginForm}>
          <div className={styles.divLogo}>
            <Image src={Logo} width='200px' height='25px' />
          </div>
          <form>
            <p>Email</p>
            <input 
              className={styles.inputStyle} 
              type="email" 
              onChange={e => setEmail(e.target.value)}
              value={email}
            /><br />
            <p>Password</p>
            <input 
              className={styles.inputStyle} 
              type="password" 
              onChange={e => setPassword(e.target.value)}
              value={password}
            /><br />
            <p>Problemas para acessar sua conta?</p>
            <button 
              className={styles.btn} 
              type="button"
              onClick={() => handleLogin()}
            >
              Acessar
            </button>
          </form>
        </div>
      </div>
    </div>  
  </> )
}
