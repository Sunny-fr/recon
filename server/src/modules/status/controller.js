const {getDatabase} = require('../database/database')
const config = require('../../config/config')
const {clear} = require('../database/clear')
exports.status = function (req, res) {
    const status = getDatabase('history')

    return res.status(200).json(status
        .slice()
        .sort((a,b) => b.timestamp - a.timestamp)
        .map(file => {
        return {
            id: file.id,
            name: file.data.name,
            status: file.status,
            optimization: file.data.optimizationPc,
            originalSize: file.data.size,
            size: file.data.outputSize,
            preview: config.public_path + config.preview_relative_path + file.data.previewFilename,
            type: file.data.type
        }
    }))
}
exports.clear = function (req, res) {
    clear()
    return res.status(200).json({message: 'ok'})
}