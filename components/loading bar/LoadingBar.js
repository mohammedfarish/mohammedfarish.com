import React, { Component } from 'react'

import styles from '../../styles/loadingbar.module.css'

export default class LoadingBar extends Component {
    render() {
        return <div style={{ width: this.props.loader + "vw", opacity: this.props.loaderOpaccty }} className={styles.loadingbar} />
    }
}