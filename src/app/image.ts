import * as express from "express";
// import * as Jimp from 'jimp';

const image = express.Router();

image.get('/', (req, res) => {
    // const img = await Jimp.read('contents/images/images-test.jpeg');
    // img.greyscale();
    // img.writeAsync(`test/${Date.now()}_greyscale.jpeg`);

    res.send('Welcome to the media streaming server !');
})

export default image;