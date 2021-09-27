const controller = require('./controller')


const register = function (app, router, config) {

     router
         .route('/download/:id')
         .get(controller.download)


}

exports.register = register