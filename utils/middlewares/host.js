export default async function host(req) {

    try {

        const hosts = [
            'mohammedfarish.com'
        ]

        const host = req.headers['host'];
        if (!hosts.includes(host)) return false

        return true

    } catch (error) {
        return false
    }

}