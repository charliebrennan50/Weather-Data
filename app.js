var express = require('express');
const Datastore = require('nedb');
var app = express();

app.use(express.static('public'));
app.use(express.json());

var server = app.listen(8000, function () {

  var host = server.address().address;
  var port = server.address().port;

  //console.log('Express app listening at http://%s:%s', host, port);
  console.log(`Express app listening at localhost:${port}`);

});

const database = new Datastore('database.db');
database.loadDatabase();

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end;
      return;
    } else {
      response.json(data);
    };
  })
});

app.post('/api', (request, response) => {
  console.log(request.body);
  const timestamp = Date.now();
  request.body.timestamp = timestamp;
  database.insert(request.body);
  response.json({
    status: "success"
  });
});