const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      autoIncrement = require('mongoose-auto-increment')

const connection = mongoose.createConnection(process.env.MONGODB_URI)
autoIncrement.initialize(connection)

const urlSchema = new Schema({
  url: String,
  clicks: Number
})
urlSchema.plugin(autoIncrement.plugin, 'urls')
exports.UrlModel = connection.model('urls', urlSchema)
