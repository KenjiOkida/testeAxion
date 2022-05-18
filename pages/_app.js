import '../styles/globals.css'
import Router from 'next/router'
import { parseCookies } from 'nookies'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
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