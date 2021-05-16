import { useEffect, useState } from 'react'
import Head from 'next/head'
// import AnimatedCursor from "react-animated-cursor"

import '../styles/globals.css'
import '../styles/fonts.css'

import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

import isDev from '../utils/middlewares/isDev'

function MyApp({ Component, pageProps }) {

  const [globalState, setGlobalState] = useState({})

  useEffect(() => {

    if (isDev()) return;

    if (document.addEventListener) {
      document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
      }, false);
      document.addEventListener('copy', (e) => {
        e.preventDefault();
      });
    } else {
      document.attachEvent('oncontextmenu', function () {
        window.event.returnValue = false;
      });
      document.attachEvent('copy', function () {
        window.event.returnValue = false;
      });
    }
  }, [])

  return (
    <div>
      <Head>
        <title>Mohammed Farish</title>
        <link rel="icon" href="https://mohammedfarish.com/favicon.ico" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Originally from Kerala, India, Farish is now an innovative fullstack developer working on futuristic projects. Starting with Smart Technology, Farish works on projects involving the internet of things." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.mohammedfarish.com/" />
        <meta property="og:title" content="Mohammed Farish" />
        <meta property="og:description" content="Originally from Kerala, India, Farish is now an innovative fullstack developer working on futuristic projects. Starting with Smart Technology, Farish works on projects involving the internet of things." />
        <meta property="og:image" content="https://www.mohammedfarish.com/assets/seoimage.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.mohammedfarish.com/" />
        <meta property="twitter:title" content="Mohammed Farish" />
        <meta property="twitter:description" content="Originally from Kerala, India, Farish is now an innovative fullstack developer working on futuristic projects. Starting with Smart Technology, Farish works on projects involving the internet of things." />
        <meta property="twitter:image" content="https://www.mohammedfarish.com/assets/seoimage.jpg" />
      </Head>
      {/* <AnimatedCursor
      innerSize={8}
      outerSize={8}
      color='193, 11, 111'
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={5}
    /> */}
      <Header />
      <div className="pages">
        <Component {...pageProps} globalState={globalState} setGlobalState={setGlobalState} />
      </div>
      <Footer />
    </div>
  )
}

export default MyApp
