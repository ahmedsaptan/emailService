const config = require('./knexfile.js')['development']

const debug = require("debug")("bonat:server")
debug({
    config
})

module.exports = require('knex')(config)