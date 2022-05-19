import '../styles/globals.css'
import Router from 'next/router'
import { parseCookies } from 'nookies'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return(<>
    <Head>
      <title>ORANGE</title>
      <link rel="icon" href="https://m3-static.marvelapp.com/favicon.ico" />
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;600;700&display=swap" rel="stylesheet" />
    </Head>
    <Component {...pageProps} />
  </>) 
}

export default MyApp

function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}
  const jwt = parseCookies(ctx).jwt

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  //Se não houver o cookie com o jwt, redireciona para o login
  if (!jwt) {
    if(ctx.pathname === "/foodsList" || ctx.pathname === "/peopleList" || ctx.pathname === "/placesList"){
      redirectUser(ctx, "/");
    }
  }

  return {
    pageProps
  }
}