import axios from "axios"

export default async function logOutUser() {

    const user = window.localStorage.getItem('user')
    if (!user) return true

    return await axios.get('/api/user/signout', {
        headers: {
            "x-auth-token": window.localStorage.getItem('user')
        }
    })
        .then((response) => {
            if (response.data === true) {
                return true
            } else {
                return false
            }
        })
        .catch(() => {
            return false
        })

}