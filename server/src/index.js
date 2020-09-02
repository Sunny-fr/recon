const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./config/router');
const fileUpload = require('express-fileupload');
const config = require('./config/config')


const videoModule = require('./modules/video/register')
const statusModule = require('./modules/status/register')
const downloadModule = require('./modules/download/register')

//const JSON_MAX_PAYLOAD_SIZE = '200mb'


function start() {





    const app = express();

    app.use(fileUpload({
        createParentPath: true,
        limits: {
            fileSize: 2000 * 1024 * 1024 * 1024 //2MB max file(s) size
        },
    }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    // configure app
    app.use(morgan( 'dev')); // log requests to the console


    //MODULES REGISTRATION
    videoModule.register(app, router, config)
    statusModule.register(app, router, config)
    downloadModule.register(app, router, config)


    app.use(config.public_path, router);
    app.use(config.public_path, express.static(config.public_path_directory))

    app.listen(config.port, config.host);
    console.log(' started on ', config.host + ':' + config.port);
    console.log(' public path ', config.host + ':' + config.port + '/' +  config.public_path );
}

start()