const auth = async (req) => {

    try {

        const token = req.headers['x-auth-token'];
        if (!token) return false

        if (token !== process.env.DEVICE_AUTH) return false

        return true

    } catch (error) {
        return false
    }
}

export default auth;