var mysql = require("mysql");
exports.connection = function() {
  var con = mysql.createConnection({
              host: "localhost",
              user: "test",
              password: "test1234!!",
              database: "people"
            });
  return con;
};
