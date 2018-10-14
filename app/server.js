const http = require('http');
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const api = require('./api');
const app = express();
const date = new Date();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app
    .use(cors())
    .use(express.static('./'))
    .get('/', function(req, res) {
        res.sendFile('index.html');
    })
    .get('/status', (request, response) => {
        response.send(api.getTime(date))
    })
    .get('/api/events', (request, response) => {
        let hasTypes = request.query.type,
            params = {
                limit: request.query.limit,
                offset: request.query.page,
                types: hasTypes && hasTypes.split(':')
            };

        api.getEvents(params, response)
    })
    .post('/api/events', (request, response) => {
        let hasTypes = request.body.type,
            params = {
                types: hasTypes && hasTypes.split(':')
            };

        api.getEvents(params, response)
    })
    .get('*', (request, response) => {
        response.status(404).sendFile(__dirname.concat('/routing/nopage/index.html'));
    });

var server = http.createServer(app);
server.listen(8000, (err) => {
    if (err) {
        return console.log('something happened', err)
    }
    console.log(`server is listening on ${8000}`)
});
