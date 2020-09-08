const im = require('imagemagick')

const compressImage = ({inputPath, outputPath,}) =>{
    return new Promise(async (resolve, reject) => {
        im.convert([inputPath, '-quality', '50', outputPath], function(err, stdout, stderr){
            console.log(stdout)
            console.log(stderr)
            if (err) return reject(err)
            return resolve({
                outputPath
            })
        });
    })
}
const createPreview = ({inputPath, previewPath}) => {
    return new Promise(async (resolve, reject) => {
        im.resize({
            srcPath: inputPath,
            dstPath: previewPath,
            width:   256,
            quality: .5
        }, function(err, stdout, stderr){
            if (err) {
                console.log(stderr)
                return reject(err)
            }
            return resolve({
                previewPath
            })
        });

    })
}

const convertImage = async function ({inputPath, outputPath, previewPath}) {
    return Promise.all([
        compressImage({inputPath, outputPath}),
        createPreview({inputPath, previewPath})
    ])
}


module.exports = convertImage