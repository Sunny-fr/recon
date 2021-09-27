const express = require('express')
const allowCrossDomain = require('../utils/cors')

const router = express.Router()


const register = function (app, _router, config) {
  router.use(allowCrossDomain)

  app.use(config.public_path + 'api', router)
  return router
}

module.exports = {
  register: register,
}