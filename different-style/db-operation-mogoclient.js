//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.

var dburl = 'mongodb://heroku_q8bbz29v:u2meii8dsu33c3g66scij9g1s5@ds119151.mlab.com:19151/heroku_q8bbz29v';
// mongo ds119151.mlab.com:19151/heroku_q8bbz29v -u heroku_q8bbz29v -p u2meii8dsu33c3g66scij9g1s5


// Use connect method to connect to the Server
exports.getID = (url) =>{
  MongoClient.connect(dburl, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', url);
      getNextSequence();
      db.collection('counters').findAndModify(
        { _id: 'productid' },
        [['a',1]],
        { $inc: { seq_value: 1 } },
        {new: true},
        function(err, doc) {
          if(err) throw err
          db.collection('urls').insert({
            _id: doc.value.seq_value,
            url: url
          })
          db.close();
        }
      )
      db.collection('counters').find({_id:'productid'}).to
    }
  })
}
