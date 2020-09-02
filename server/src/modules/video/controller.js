const unique = require('../../utils/unique')
const {worker} = require('./worker')
const config = require('../../config/config')
const {saveDatabase} = require('../database/database')
const {getDatabase} = require('../database/database')



const addFile = (file) => {
    const db = getDatabase('history')
    const found = db.find(p => p.id === file.id)
    if (!found) {
        saveDatabase(db.concat({
            id: file.id,
            data: file,
            status: 'queued',
            timestamp: new Date().getTime()
        }), 'history')
    }
    console.log('found skip')
    return Promise.resolve()
}

const upload = async (req) => {

    try {
        if(!req.files) {
            return Promise.reject({
                status: false,
                message: 'No file uploaded'
            })

        } else {

            const file = req.files.file;
            const id =  unique()
            const extension = '.' + file.name.split('.').pop()
            const path = config.upload.in + id + extension
            await file.mv(path);

            //send response
            return Promise.resolve({
                file,
                status: true,
                message: 'File is uploaded',
                data: {
                    id,
                    extension,
                    path,
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size
                }
            })
        }
    } catch (err) {
       return Promise.reject(err)
    }
}

const conversion = (req, res) => {

    return upload(req)
        .then(({data}) => {
           return addFile(data)
               .then(() => {
                   return data
               })
        })
        .then((data) => {

            res.status(200).send({
                status: true,
                message: 'File is uploaded',
                data,
            });
            worker()
        })
        .catch(err => {
            return res.status(500).send(err);
        })

}

exports.conversion = conversion