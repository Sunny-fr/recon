const ffmpeg = require('fluent-ffmpeg')
const convertVideo = async function (
    {
        inputPath,
        outputPath,
    }
) {
    return new Promise(async (resolve, reject) => {
        return ffmpeg()
            .input(inputPath)
            .videoFilters([
                'scale=iw/2:ih/2'
            ])
            .output(outputPath)
            .on('end', resolve)
            .on('error', reject)
            .run()
    })
}


module.exports = convertVideo