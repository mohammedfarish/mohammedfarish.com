import sessionSchema from '../../../utils/database/schema/sessionSchema';
import auth from '../../../utils/middlewares/auth'

export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'GET':
            try {

                const authenticate = await auth(req);
                if (!authenticate) return res.status(400).json('Unauthorised');

                await sessionSchema.findByIdAndUpdate(req.user.sessionId, { active: false })

                return res.json(true)

            } catch (error) {
                res.status(503).json('Internal server error')
            }
            break;

        default:
            res.status(404).json(false)
            break;
    }

}