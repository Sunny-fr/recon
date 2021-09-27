const controller = require('./controller')

const corsOptions = (_, res) => res.status(200).send()

const register = function (app, router) {

    router
        .route('/clear')
        .get(controller.clear)
    router
        .route('/clear')
        .options(corsOptions)

    router
        .route('/status')
        .get(controller.status)

    router
        .route('/status')
        .options(corsOptions)


}

exports.register = register