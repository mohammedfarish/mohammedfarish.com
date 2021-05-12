import { useEffect } from 'react'
import Head from 'next/head'

import '../styles/globals.css'
import '../styles/fonts.css'

import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
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
        <meta name="description" content="Originally from Kerala, India, Farish is now an innovative backend developer working on futuristic projects. Starting with Smart Technology, Farish works on projects involving the internet of things." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.mohammedfarish.com/" />
        <meta property="og:title" content="Mohammed Farish" />
        <meta property="og:description" content="Originally from Kerala, India, Farish is now an innovative backend developer working on futuristic projects. Starting with Smart Technology, Farish works on projects involving the internet of things." />
        <meta property="og:image" content="https://www.mohammedfarish.com/assets/seoimage.jpg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.mohammedfarish.com/" />
        <meta property="twitter:title" content="Mohammed Farish" />
        <meta property="twitter:description" content="Originally from Kerala, India, Farish is now an innovative backend developer working on futuristic projects. Starting with Smart Technology, Farish works on projects involving the internet of things." />
        <meta property="twitter:image" content="https://www.mohammedfarish.com/assets/seoimage.jpg" />
      </Head>
      <Header />
      <div className="pages">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  )
}

export default MyApp
