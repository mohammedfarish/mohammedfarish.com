import axios from "axios"

export default async function verifyUser() {

    return await axios.get('/api/user/verify', {
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