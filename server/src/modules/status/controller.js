const {getDatabase} = require('../database/database')
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
            size: file.data.outputSize
        }
    }))
}