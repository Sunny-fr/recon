
const express = require('express');
const {argv} = require('yargs');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./router');

// Constants
const DEFAULT_PORT = 8080;
const DEFAULT_HOST = '0.0.0.0';
const PUBLIC_PATH = ''
const PUBLIC_PATH_DIRECTORY = './public'

const maxPayloadSize = '10mb'

function start() {

    const port = argv.port || DEFAULT_PORT
    const host = argv.host || DEFAULT_HOST


    const app = express();
    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    // configure app
    app.use(morgan( 'dev')); // log requests to the console


    // configure body parser
    app.use(bodyParser.urlencoded({
        limit: maxPayloadSize,
        extended: true,
    }));
    app.use(bodyParser.json({
        type: '*/*',
        limit: maxPayloadSize
    }));


    app.use(PUBLIC_PATH, router);
    app.use(PUBLIC_PATH, express.static(PUBLIC_PATH_DIRECTORY))

    app.listen(port, host);
    console.log(' started on ', host + ':' + port);
    console.log(' public path ', host + ':' + port  + '/' +  PUBLIC_PATH );
}

start()