import { Request, Response } from 'express';
import express from 'express';
import http from 'http';
import cors from 'cors';
const app: express.Application = express();
const date = new Date();
const api = require('./api');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app
    .use(cors())
    .use(express.static('./'))
    .get('/', (req: Request, res: Response) => {
        res.sendFile('index.html');
    })
    .get('/status', (request: Request, response: Response) => {
        response.send(api.getTime(date))
    })
    .get('/api/events', (request: Request, response: Response) => {
        const hasTypes = request.query.type,
            params = {
                limit: request.query.limit,
                offset: request.query.page,
                types: hasTypes && hasTypes.split(':')
            };

        api.getEvents(params, response)
    })
    .post('/api/events', (request: Request, response: Response) => {
        const hasTypes = request.body.type,
            params = {
                types: hasTypes && hasTypes.split(':')
            };

        api.getEvents(params, response)
    })
    .get('*', (request: Request, response: Response) => {
        response.status(404).sendFile(__dirname.concat('/routing/nopage/index.html'));
    });

const server = http.createServer(app);
server.listen(8000, (err: string) => {
    if (err) {
        return console.log('something happened', err)
    }
    console.log(`server is listening on ${8000}`)
});
