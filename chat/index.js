var express = require("express");
var app = express();
var port = 3700;

// gets the socket.io server to listen first
var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat', uName:'Server' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

console.log("Listening on port " + port);

// display the template page
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});

// look for the chat.js file here
app.use(express.static(__dirname + '/public'));
