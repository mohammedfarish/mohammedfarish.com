import React, { Component } from 'react'
import Head from 'next/head'

export default class CustomHead extends Component {
    render() {
        return (
            <Head>
                <title>{this.props.title || 'Mohammed Farish'}</title>
                <link rel="icon" href="https://mohammedfarish.com/favicon.ico" />
                <meta name="viewport" content="width=device-width, user-scalable=no" />
                <meta name="theme-color" content="#000000" />
                <meta name="description" content={this.props.content || "Originally from Kerala, India, Farish is now an innovative backend developer working on futuristic projects. "} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.mohammedfarish.com/" />
                <meta property="og:title" content="Mohammed Farish" />
                <meta property="og:description" content={this.props.content || "Originally from Kerala, India, Farish is now an innovative backend developer working on futuristic projects. "} />
                <meta property="og:image" content="https://www.mohammedfarish.com/assets/seoimage.jpg" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://www.mohammedfarish.com/" />
                <meta property="twitter:title" content="Mohammed Farish" />
                <meta property="twitter:description" content={this.props.content || "Originally from Kerala, India, Farish is now an innovative backend developer working on futuristic projects. "} />
                <meta property="twitter:image" content="https://www.mohammedfarish.com/assets/seoimage.jpg" />
            </Head>
        )
    }
}
