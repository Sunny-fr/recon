const convertVideo = require('./convert')
const config = require('../../config/config')
const {saveDatabase} = require('../database/database')
const {getDatabase} = require('../database/database')
const fs = require('fs')

const update = (id, data, status) => {
    const items = getDatabase('history')
    const found = items.find(p => p.id === id)
    if (found) {
        found.data = {
            ...found.data,
            ...data,
        }
        found.status = status
    }

    saveDatabase(items, 'history')

}

const status = {
    available: true
}

const worker = () => {
    const items = getDatabase('history')
    const found = items.find(p => p.status === 'queued')
    if (found && status.available) {
        // do something

        status.available = false
        const output = config.upload.out + found.data.id + found.data.extension
        //saveDatabase(items, 'history')
        update(found.id, {
            output,
        }, 'pending')
        return convertVideo({
            inputPath: found.data.path,
            outputPath: output
        }).then(() => {
            console.log('encoding done')
            const stats = fs.statSync(output)
            const optimization = Math.round((100 - stats.size / found.data.size) * 1000) / 1000
            update(found.id, {
                output,
                outputSize: stats.size,
                optimizationPc: optimization
            }, 'success')

        }).catch((e) => {
            console.log('encoding error')
            console.log(e)
            update(found.id, {}, 'error')
        }).finally(() => {
            status.available = true
            worker()
            fs.unlinkSync(found.data.path)
        })

    }
    console.log('queue is empty')
}

module.exports = {
    worker
}