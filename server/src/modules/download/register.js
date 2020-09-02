const controller = require('./controller')


const register = function (app, router, config) {

     router
         .route('/api/download/:id')
         .get(controller.download)


}

exports.register = register