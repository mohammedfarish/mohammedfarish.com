import axios from "axios"

export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const { q } = req.query

                if (q === 'api') {
                    axios.post('https://api.uptimerobot.com/v2/getMonitors?api_key=' + process.env.UPTIME_ROBOT_API_KEY)
                        .then(response => {
                            const data = {
                                active: response.data.monitors.length
                            }
                            return res.json(data)
                        })
                        .catch(() => {
                            const data = {
                                active: 0
                            }
                            return res.json(data)
                        })
                }

            } catch (error) {
                res.status(503).json(false)
            }
            break;

        default:
            res.status(404).json(false)
            break;
    }


}