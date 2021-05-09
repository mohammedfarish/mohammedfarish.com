import axios from "axios"

export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'GET':
            try {

                const github = await (await axios.get('https://api.github.com/users/mohammedfarish/events/public')).data

                const githubData = []

                github.forEach(data => {
                    const { payload, type, repo } = data
                    if (githubData.length >= 1) return;
                    if (type === 'PushEvent') {
                        const data = {
                            repo: repo.name,
                            message: payload.commits[0].message
                        }
                        githubData.push(data)
                    }
                })

                res.json({
                    github: githubData[0]
                });

            } catch (error) {
                res.status(503).json(false)
            }
            break;

        default:
            res.status(404).json(false)
            break;
    }


}