import React, { useEffect } from 'react'
import Router from 'next/router'

import Loading from '../components/loading/Loading'
import logOutUser from '../utils/functions/logout'

const index = () => {

    useEffect(() => {
        logoutUser()
    }, [])

    const logoutUser = async () => {
        const user = window.localStorage.getItem('user')
        if (user) {
            try {
                await logOutUser()
                window.localStorage.removeItem('user')
                return Router.push('/')
            } catch (error) {
                window.localStorage.removeItem('user')
                return Router.push('/')
            }
        }
        window.localStorage.removeItem('user')
        return Router.push('/')
    }

    return <Loading message={'Logging out'} />

}

export default index
