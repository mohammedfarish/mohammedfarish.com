import Link from 'next/link'
import React, { Component } from 'react'

import styles from '../../styles/footer.module.css'

export default class Footer extends Component {
    render() {
        return (
            <div className={styles.footer}>
                <Link href="/">
                    <a className={styles.footertext}>© {new Date().getFullYear()} Mohammed Farish. All rights reserved.</a>
                </Link>
            </div>
        )
    }
}
