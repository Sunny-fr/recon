const convertVideo = require('../video/convertVideo')
const convertImage = require('../images/convertImage')
const config = require('../../config/config')
const {saveDatabase} = require('../database/database')
const {getDatabase} = require('../database/database')
const fs = require('fs')

const getMediaType = (extension) => {
    if(config.allowedVideoFiles.includes(extension)){
        return 'video'
    }
    if(config.allowedImageFiles.includes(extension)){
        return 'image'
    }
    return 'rejected'
}

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

const getWorker = ({found, output, preview}) => {
    const mediaType = getMediaType(found.data.extension)
    if(mediaType === 'video') {
        return convertVideo({
            inputPath: found.data.path,
            outputPath: output,
            previewPath: preview
        })
    }
    if(mediaType === 'image') {
        return convertImage({
            inputPath: found.data.path,
            outputPath: output,
            previewPath: preview
        })
    }
    return Promise.reject('Unsupported file type')
}

const getOutputFile = ({found, destDirectory, previewDirectory}) => {
    const mediaType = getMediaType(found.data.extension)
    if(mediaType === 'video') {
        const previewFilename = found.data.id + '.gif'
        return {
            main: destDirectory + found.data.id + '.mp4',
            preview: previewDirectory + previewFilename,
            previewFilename,
            type: mediaType
        }
    }
    if(mediaType === 'image') {
        const previewFilename = found.data.id + found.data.extension
        return {
            main: destDirectory + previewFilename,
            preview: previewDirectory + previewFilename,
            previewFilename,
            type: mediaType
        }
    }
    return {}
}

const worker = () => {
    const items = getDatabase('history')
    const found = items.find(p => p.status === 'queued')
    if (found && status.available) {
        // do something

        status.available = false
        const {main : output, preview, previewFilename, type} = getOutputFile({found, destDirectory: config.upload.out, previewDirectory: config.upload.preview})

        update(found.id, { output, preview }, 'pending')

        return getWorker({found, output, preview}).then(() => {
            const {size : outputSize} = fs.statSync(output)
            const optimizationPc = Math.round(outputSize / found.data.size * 100) / 100
            update(found.id, { output, outputSize, optimizationPc, preview, previewFilename, type}, 'success')

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