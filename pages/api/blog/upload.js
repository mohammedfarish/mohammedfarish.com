import cloudinary from 'cloudinary'

// THIS IS A TEST ROUTE

export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'POST':
            try {

                cloudinary.v2.config({
                    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                    api_key: process.env.CLOUDINARY_API_KEY,
                    api_secret: process.env.CLOUDINARY_API_SECRET
                })

                if (req.file) return console.log(req.file)

                res.json({ success: false, url: "This is a test route." });

            } catch (error) {
                console.log(error);
                res.json(false)
            }

            break;

        default:
            res.status(404).json(false)
            break;
    }

}