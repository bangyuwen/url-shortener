const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      autoIncrement = require('mongoose-auto-increment')

const connection = mongoose.createConnection('mongodb://heroku_q8bbz29v:u2meii8dsu33c3g66scij9g1s5@ds119151.mlab.com:19151/heroku_q8bbz29v')

autoIncrement.initialize(connection)

const urlSchema = new Schema({
  url: String,
  clicks: Number
})
urlSchema.plugin(autoIncrement.plugin, 'urls')
exports.UrlModel = connection.model('urls', urlSchema)
