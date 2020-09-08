const ffmpeg = require('fluent-ffmpeg')

const compressVideo = ({inputPath, outputPath}) => {
    return new Promise((resolve, reject) => {
        return ffmpeg()
            .input(inputPath)
            .videoFilters([
                'scale=iw/2:ih/2'
            ])
            .videoCodec('libx264')
            .audioCodec('mp2')
            .output(outputPath)
            .on('end', resolve)
            .on('error', reject)
            .run()
    })
}
const createPreview = ({inputPath, previewPath}) => {
    return new Promise((resolve, reject) => {
        return ffmpeg()
            .input(inputPath)
            .inputOptions([
                '-t 7',
                '-ss 00:01:00',

            ])
            .videoFilters([
                //'scale=iw/2:ih/2'
                'fps=15,scale=w=250:h=-1'
            ])
            .output(previewPath)
            .on('end', resolve)
            .on('error', reject)
            .run()
    })
}
const convertVideo = async function ({inputPath, outputPath, previewPath}) {
    return Promise.all([
        compressVideo({
            inputPath,
            outputPath,
        }),
        createPreview({
            inputPath,
            previewPath,
        })
    ])
}


module.exports = convertVideo