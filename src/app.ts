import express from 'express'
import config from 'config'
import cookieParser from 'cookie-parser'
import log from "./log"
import connect from './utils/connect';
import routes from './routes';
import deserializeUser from './middleware/deserializeUser';

const port = config.get<number>('port');
const host = config.get<string>('host');

const app = express();

app.use(cookieParser())

app.use(express.json());

app.use(deserializeUser)

app.use(express.urlencoded({extended: false}))

app.listen(port, host, async () => {
    log.info(`app is listening at http://${host}:${port}`)
    await connect();

    routes(app)
})

