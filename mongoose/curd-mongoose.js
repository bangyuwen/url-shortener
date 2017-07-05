const UrlModel = require('./mongoose-shcema.js')

// save
exports.save = (urlAddress, callback) => {
  let url = new UrlModel({url: urlAddress})
  url.save((err, data) => {
    if (err) throw err
    connection.close()
    console.log(data);
  })
}

// find
exports.find = (id, callback) => {
  console.log(`goose: ${id}`);
  UrlModel.find({_id: id}, (err, data) => {
    console.log(`gooseData: ${data}`);
    if (err) throw err
    connection.close()
  })
}
