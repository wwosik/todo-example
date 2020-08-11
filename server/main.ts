import * as express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { text } from 'body-parser';


var express_app = express();

express_app.get('/', (req, res) => {
    console.log('GET');
    const data = readFileSync('c:/dev/todos.json', 'utf8');
    res.header('Access-Control-Allow-Origin', '*');
    res.status(200).send(data);
});

express_app.post('/', text(), (req, res) => {
    console.log('POST');

    const body = req.body;
    console.log(body);
    writeFileSync('c:/dev/todos.json', req.body, { encoding: 'utf8' })
    res.header('Access-Control-Allow-Origin', '*');
    res.status(200).send();
})

express_app.listen(4201, () => {
    console.log('Listening');
});