const controller = require('./controller')

const corsOptions = (_, res) => res.status(200).send()

const register = function (app, router) {

    router
        .route('/api/status')
        .get(controller.status)

    router
        .route('/api/status')
        .options(corsOptions)


}

exports.register = register