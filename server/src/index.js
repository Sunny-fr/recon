const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./config/router');
const fileUpload = require('express-fileupload');
const config = require('./config/config')


const videoModule = require('./modules/video/register')
const statusModule = require('./modules/status/register')
const downloadModule = require('./modules/download/register')
const {clear} = require('./modules/database/clear')

//const JSON_MAX_PAYLOAD_SIZE = '200mb'


function start() {

    const app = express();

    app.use(fileUpload({
        //debug: true,
        createParentPath: true,
        limits: {
            fileSize: 2000 * 1024 * 1024 * 1024 //2MB max file(s) size
        },
    }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    // configure app
    app.use(morgan( function (tokens, req, res) {
        const url = tokens.url(req, res)
        // TODO BLACK LIST !!
        if (url === '/api/status/') return null

        return [
            '[' + tokens.status(req, res) + ']',
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.res(req, res, 'content-length'),
            '-',
            tokens['response-time'](req, res),
            'ms',
        ].join(' ')
    })); // log requests to the console

    //MODULES REGISTRATION
    videoModule.register(app, router, config)
    statusModule.register(app, router, config)
    downloadModule.register(app, router, config)


    app.use(config.public_path, router);
    app.use(config.public_path, express.static(config.public_path_directory))
    app.use(config.public_path + config.preview_relative_path, express.static(config.upload.preview))

    app.listen(config.port, config.host);
    console.log(' started on ', config.host + ':' + config.port);
    console.log(' public path ', config.host + ':' + config.port + '/' +  config.public_path );
}

start()