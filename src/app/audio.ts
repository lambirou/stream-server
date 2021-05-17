import * as express from "express";
import * as url from "url";
import * as fs from "fs";

const audio = express.Router();

const filePath = 'contents/audios/audio.wav';
const stat = fs.statSync(filePath);

audio.get('/', (req, res) => {
    const queryData = url.parse(req.url, true).query;
    const skip: any = typeof (queryData.skip) === 'undefined' ? 0 : queryData.skip;
    const startByte = stat.size * skip;

    res.set('Content-Type', 'audio/ogg');
    res.set('Content-Length', String(stat.size - startByte));

    fs.createReadStream(filePath, {
        start: startByte
    }).pipe(res);
})

export default audio;
