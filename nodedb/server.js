var con = require("./mysql.js")
var http = require("http")
var url = require('url');
var fs = require('fs');
var connection = con.connection();
var filename;

function serverFunction(req,res) {
  var q = url.parse(req.url, true);
  console.log(q.pathname);
  if (q.pathname == "/" || q.pathname == "index") {filename = "index.html";}
  else {filename = "." + q.pathname;}
  console.log(res)
  fs.readFile(filename, function(err, data) {
    if (err) {
      console.log(err);
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 not found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    if (filename == "./kittens.html") {
      connection.connect(function(err) {

        if(err) {console.log(err)}
          // throw err;
        console.log("connected to mysql database");
        console.log("RESRES");
        console.log(res)

        var sql = `INSERT INTO kittens (name, owner,magic_type) VALUES ('${q.query.kname}', '${q.query.kowner}', '${q.query.kpower}')`;
        connection.query(sql, function(err,result,fields) {
          console.log(err);
          console.log(result);

          sql = "SELECT * from kittens";
          connection.query(sql, function(err,result,fields) {
            var formatted = ''
            for (var i = 0; i < result.length; i++) {
              formatted += `<div style="width:100%"><b>Kitten:</b> ${result[i].name}</div>`;
              formatted += `<div style="width:100%"><b>Owner:</b> ${result[i].owner}</div>`;
              formatted += `<div style="width:100%"><b>Magic Power:</b> ${result[i].magic_type}</div>`;
              formatted += `</br>`;
            }
            res.write(data + formatted);
            return res.end();
          });

        });
      });
      console.log("Yay")
    }
    else {
      res.write(data);
      return res.end();
    }
  });
}





http.createServer(serverFunction).listen(3000);
