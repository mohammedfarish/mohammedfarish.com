import React, { useEffect, useState } from 'react'
import Moment from 'moment-timezone'

import styles from '../styles/homepage.module.css'

import LatestArticles from '../components/latest articles/LatestArticles'
import GetInTouch from '../components/contact/GetInTouch'
import Updates from '../components/updates/Updates'

const Home = (props) => {

    const [age, setAge] = useState(0)

    useEffect(() => {
        calculatedAge()
    }, [])

    const calculatedAge = () => {
        const todayYear = Moment().tz('Asia/Dubai').year()
        const birthYear = 1997
        setAge(todayYear - birthYear)
    }

    return (
        <div className={styles.homepage}>
            <div className={styles.homepageherosection}>
                <div className={styles.homepagesectionLHS}>
                    <h1>I'm Mohammed Farish.</h1>
                    <span>I'm a {age}-year old self-taught fullstack web and software developer, and I'm also one of the founders of <a className={styles.homepageamnuzlink} href="https://www.amnuz.com" target="https://www.amnuz.com">Amnuz Technologies</a>, a company that's deeply focused on the most futuristic projects you can imagine.</span>
                </div>
            </div>
            <div className={styles.homepagesection}>
                <Updates loader={props.loader} setLoader={props.setLoader} />
            </div>
            <div hidden className={styles.homepagesection}>
                <LatestArticles />
            </div>
            <div className={styles.homepagesection}>
                <GetInTouch loader={props.loader} setLoader={props.setLoader} />
            </div>
        </div>
    )
}

export default Home
