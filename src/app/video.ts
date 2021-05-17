import * as express from "express";
import * as fs from "fs";

const video = express.Router();

const filePath = 'contents/videos/ncv.mp4';
const stat = fs.statSync(filePath);

video.get('/', (req, res) => {
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = Number(parts[0]);
        const end = parts[1] ? Number(parts[1]) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, head);
        fs.createReadStream(filePath, {
            start,
            end
        }).pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res);
    }
});

export default video;