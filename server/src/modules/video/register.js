const controller = require('./controller')



const corsOptions = (req, res) => {
     return res.status(200).send()
}

const register = function (app, router) {

     router
         .route('/api/upload')
         .post(controller.conversion)

     router
         .route('/api/upload')
         .options(corsOptions)


}

exports.register = register