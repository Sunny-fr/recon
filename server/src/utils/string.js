const getExtension = (filename) => '.' + filename.split('.').pop().toLowerCase()


module.exports = {
    getExtension
}