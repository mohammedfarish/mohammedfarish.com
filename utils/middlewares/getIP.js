import isDev from "./isDev";

export default async function getIP(req) {

    let ip

    const development = await isDev()
    if (development) return ip = 'dev'

    ip = req.headers['x-forwarded-for'];
    if (!ip) return false
    if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7)
    }

    return ip

}