//const path = require('path');
const fs = require('fs');



const getDirectoryFiles = (path, excludeFilename = []) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, function (err, files) {
            if (err) {
                return reject('Unable to scan directory: ' + err);
            }
            return resolve(files
                .filter(file => {
                    return !excludeFilename.includes(file)
                })
                .map(file => {
                return path + file
            }))
        });
    })
}

const getDirectoriesFiles = (paths = [], excludeFilename = []) => {
    return Promise.all(paths.map(path => getDirectoryFiles(path, excludeFilename)))
        .then(results => {
            return results.reduce((acc, items) => acc.concat(items), [])
        })
}

module.exports = {
    getDirectoryFiles,
    getDirectoriesFiles
}