const controller = require('./controller')



const corsOptions = (req, res) => {
     return res.status(200).send()
}

const register = function (app, router) {

     router
         .route('/upload')
         .post(controller.conversion)

     router
         .route('/upload')
         .options(corsOptions)


}

exports.register = register