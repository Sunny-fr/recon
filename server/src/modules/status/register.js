const controller = require('./controller')

const corsOptions = (_, res) => res.status(200).send()

const register = function (app, router) {

    router
        .route('/api/clear')
        .get(controller.clear)
    router
        .route('/api/clear')
        .options(corsOptions)

    router
        .route('/api/status')
        .get(controller.status)

    router
        .route('/api/status')
        .options(corsOptions)


}

exports.register = register