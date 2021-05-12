import isDev from "./isDev"

export default async function host(req) {

    try {

        const development = await isDev()
        if (development) return true

        const hosts = [
            'mohammedfarish.com',
            'www.mohammedfarish.com',
        ]

        const host = hosts.includes(req.headers['host'])
        if (!host) return false

        return true

    } catch (error) {
        return false
    }

}