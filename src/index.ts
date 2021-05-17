import * as dotenv from "dotenv";
import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";

import compileOutput from "./helpers/compile-output";
import audio from "./app/audio";
import image from "./app/image";
import video from "./app/video";

dotenv.config();

if (!process.env.SERVER_PORT) {
    process.exit(1);
}

const PORT = Number(process.env.SERVER_PORT);
const app = express();

app.use(cors());
app.use(helmet());
app.use('/audio', audio);
app.use('/image', image);
app.use('/video', video);
app.get('/', (req, res) => res.send('Welcome to the media streaming server !'));

app.listen(PORT, () => compileOutput(PORT));
