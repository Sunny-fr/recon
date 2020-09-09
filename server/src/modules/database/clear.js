const config = require('../../config/config')
const {getDirectoriesFiles} = require('../../utils/files')
const fs = require('fs')
const clear = () => {

    getDirectoriesFiles([config.upload.preview, config.upload.out, config.upload.in], [
        '.gitignore', 'index.html'
    ]).then(files => {
        const list = files.slice()
        list.unshift(config.databasePath)
        list.forEach((file) => fs.unlink(file, (err) => {
            if (err) {
                console.log('error while removing', file)
                return
            }
            console.log('successfully removed', file)
        }))
    })

}

module.exports = {
    clear
}