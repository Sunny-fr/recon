const fs = require('fs')
const config = require('../../config/config')


const getDatabase = (node) => {
    try {
        const raw = fs.readFileSync(config.databasePath, {encoding: 'utf8'})
        const root = JSON.parse(raw)
        if (node) {
            return root[node]
        }
        return root
    } catch (e) {
        console.log('file might not exist')
        const raw = fs.readFileSync(config.defaultDatabasePath, {encoding: 'utf8'})
        const root = JSON.parse(raw)
        if (node) {
            return root[node]
        }
        return root
    }

}

const saveDatabase = (data, node) => {
    const prev = getDatabase()
    const dest = node ? {
        ...prev,
        [node]: data,
    } : data
    fs.writeFileSync(config.databasePath, JSON.stringify(dest, null, 2), {encoding: 'utf8'})
}


module.exports = {
    getDatabase,
    saveDatabase
}