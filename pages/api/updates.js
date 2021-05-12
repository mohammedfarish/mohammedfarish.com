
export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const { q } = req.query

                return res.json({ q })

            } catch (error) {
                res.status(503).json(false)
            }
            break;

        default:
            res.status(404).json(false)
            break;
    }


}