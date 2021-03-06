const {getDatabase} = require('../database/database')
const download = (req, res) => {

    const {id} = req.params
    const files = getDatabase('history')

    const file = files.find(p => p.id === id)

    if(!file) {
        return res.status('404').json({
            message: 'file not found'
        })
    }
    if(file.status !== 'success') {
        return res.status('404').json({
            message: 'file not ready yet'
        })
    }
    const filename = file.data.name
    //const extension = filename.split('.').pop()
    //const outputFileName = filename.replace('.' + extension, '.mp4')
    //const outputFileName = file.data.name //filename.replace('.' + extension, '.mp4')



    return res.download(file.data.output, filename );
}

module.exports = {
    download
}