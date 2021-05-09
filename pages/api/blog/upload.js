import cloudinary from 'cloudinary'

export default async (req, res) => {


    try {
        cloudinary.v2.config({
            cloud_name: 'farish',
            api_key: '622758927776665',
            api_secret: '1R0uaP9hYPPkEvgK2hAzTz8sFjI'
        })
        // console.log(req.body);
        // const image = await cloudinary.v2.image(req.body)

        // Buffer

        // await multerUploads(req, res)

        if (req.file) return console.log(req.file)

        // const file = await fs.readFile()

        // const data = await cloudinary.v2.uploader.upload(file)
        // const data = await cloudinary.v2.uploader.upload('https://cdn.discordapp.com/attachments/726328135393476609/832274177247150130/Logo_1.png')
        // const url = await data.url

        // res.json({ success: true, url })
        console.log(url)

    } catch (error) {
        console.log(error);
        res.json(false)
    }

}