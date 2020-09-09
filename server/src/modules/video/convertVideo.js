const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')

const isMoveFile = (inputPath) => inputPath.split('.').pop().toLowerCase() !== 'mov'

const handleQuickTimeFiles = (inputPath, newPath) => {
    return new Promise((resolve, reject) => {
        if(isMoveFile(inputPath)) return resolve(inputPath)
        ffmpeg()
            .input(inputPath)
            .save(newPath)
            .on('end', () => resolve(newPath))
            .on('error', (err) => {
                console.log('error quicktime conversion')
                reject(err)
            })

    })

}

const compressVideo = ({inputPath, outputPath}) => {
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(inputPath)
            .videoFilters([
                'scale=iw/2:ih/2'
            ])
            .videoCodec('libx264')
            .audioCodec('mp2')
            .output(outputPath)
            .on('end', resolve)
            .on('error', (err) => {
                console.log('')
                console.log('error video compression')
                console.log('file : ', inputPath)
                console.log('')
                reject(err)
            })
            .run()
    })
}
const createPreview = ({inputPath, previewPath}) => {
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(inputPath)
            .inputOptions([
                '-t 7',
                '-ss 00:01:00',
            ])
            //.videoCodec('libx264')
            .videoFilters([
                //'scale=iw/2:ih/2'
                'fps=15,scale=w=250:h=-1'
            ])
            .output(previewPath)
            .on('end', resolve)
            .on('error', (err) => {
                console.log('')
                console.log('error generating preview')
                console.log('file : ', inputPath)
                console.log('')
                reject(err)
            })
            .run()
    })
}
const convertVideo = async function ({inputPath, outputPath, previewPath}) {

    const movFilePath = inputPath + '.mp4'
    return handleQuickTimeFiles(inputPath, movFilePath)
        .then(videoPath => {
            return Promise.all([
                compressVideo({
                    inputPath: videoPath,
                    outputPath,
                }),
                createPreview({
                    inputPath: videoPath,
                    previewPath,
                })
            ]).then(()=> {
                if(videoPath === movFilePath) {
                    fs.unlink(movFilePath, (err) => {
                        if(err) {
                            console.log('cant remove file', videoPath)
                        }
                    })
                }
                return Promise.resolve()
            })
        })
}


module.exports = convertVideo