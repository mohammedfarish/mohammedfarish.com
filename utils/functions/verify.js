import axios from "axios"

export default async function verifyUser() {

    const user = window.localStorage.getItem('user')
    if (!user) return false

    return await axios.get('/api/user/verify', {
        headers: {
            "x-auth-token": window.localStorage.getItem('user')
        }
    })
        .then((response) => {
            if (response.data === true) {
                return true
            } else {
                window.localStorage.removeItem('user')
                return false
            }
        })
        .catch(() => {
            window.localStorage.removeItem('user')
            return false
        })

}