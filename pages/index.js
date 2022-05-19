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
  const [checked, setChecked] = useState(false)
  
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

  const handleCheckChange = () => {
    setChecked(!checked)
  }

  return ( <>
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.loginForm}>
          <div className={styles.divLogo}>
            <Image src={Logo} width='200px' height='25px' />
          </div>
          <form>
            <div className={styles.textDiv}>
              <span className={styles.loginText}>Email</span>
            </div>
            <input 
              className={styles.inputStyle} 
              type="email" 
              onChange={e => setEmail(e.target.value)}
              value={email}
              placeholder="seunome@email.com"
            /><br />
            <div className={styles.textDiv}>
              <span className={styles.loginText}>Password</span>
            </div>
            {checked
            ?
              <input 
                className={styles.inputStyle} 
                type="text" 
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
              />
            :
              <input 
                className={styles.inputStyle} 
                type="password" 
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
              />
            }
            
            <div className={styles.checkDiv}>
              <input 
                type="checkbox" 
                checked={checked}
                onChange={handleCheckChange}
              />
              <span className={styles.normalText}>Mostrar senha</span>
            </div>

            <div className={styles.problemDiv}>
              <span className={styles.problemText}>Problemas para acessar sua conta?</span>
            </div>
            <button 
              className={styles.btn} 
              type="button"
              onClick={() => handleLogin()}
            >
              Acessar
            </button>

            <div className={styles.ouDiv}>
              <span className={styles.normalText}>ou</span>
            </div>

            <button 
              className={styles.btnCadastrar} 
              type="button"
            >
              Cadastrar
            </button>

            <div className={styles.fimDiv}>
              <span className={styles.normalText}>Termos de uso  -  Política de privacidade</span>
            </div>
          </form>
        </div>
      </div>
    </div>  
  </> )
}
