
const {argv} = require('yargs');
// Constants
const DEFAULT_PORT = 8080;
const DEFAULT_HOST = '0.0.0.0';
const PUBLIC_PATH = ''
const PUBLIC_PATH_DIRECTORY = './public'

const port = argv.port || DEFAULT_PORT
const host = argv.host || DEFAULT_HOST

const config = {
    host,
    port,
    public_path: PUBLIC_PATH,
    public_path_directory: PUBLIC_PATH_DIRECTORY,
    upload:{
        in: './share/input/',
        out: './share/output/',
    },
    databasePath: './share/database/database.json',
    defaultDatabasePath: './src/database/defaultDatabase.json'
}

module.exports = config
