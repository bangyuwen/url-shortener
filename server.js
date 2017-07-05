const express = require('express')
const Url = require('./mongoose-schema').UrlModel
const encodeID = require('./crypto').encodeID
const decodeID = require('./crypto').decodeID
const app = express()

app.get('/favicon.ico', function(req, res) {
    res.send(204);
})

app.get('/api/:URL', (req, res)=>{
  let url = new Url({url: req.params.URL, clicks:0})
  url.save((err, data) => {
      let codedID = encodeID(data._id)
      console.log(`getCodedID: ${codedID}`)
      res.status(200).send(`http://${req.hostname}/${codedID}`)
  })
})

app.get('/:SHORTURL', (req,res)=>{
  let short = req.params.SHORTURL
  console.log(`short: ${short}`);
  let id = decodeID(short)
  console.log(`id: ${id}`);
  Url.find({_id:id}, (err, data) => {
    console.log(`data: ${data}`);
    console.log(data[0].url);
    console.log(Object.keys(data));
    if (data) {
      let url = data[0].url
      console.log('dataurl: '+ typeof data);
      res.writeHead(301,
        {Location: `https://${url}`}
      );
      res.end();
    } else {
      res.end('no exist')
    }
  })
})

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
})

let server = app.listen(process.env.PORT, ()=>{
  var port = server.address().port;
  console.log("App now running on port", port);
})
