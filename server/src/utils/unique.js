/* eslint-disable */
function unique(params = {}){
    const {pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'} = params
    return pattern.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}
module.exports = unique
