const HEADERS_ACCESS_LIST =
  'Content-Type,  authorization, X-Requested-With'

function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*') //req.headers.origin || '*'
  res.header('Access-Control-Allow-Credentials', true)
  //res.header('X-Content-Type-Options', 'nosniff')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', HEADERS_ACCESS_LIST)
  res.header('Access-Control-Expose-Headers', HEADERS_ACCESS_LIST)
  next()
}

module.exports = allowCrossDomain
