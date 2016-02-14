var fs = require('fs'),
    https = require('https'),
    express = require('express');

var port = 3000;
var app = express();

var options = {
    key: fs.readFileSync('/var/www/httpd-cert/admin/qwile.com.key'),
    cert: fs.readFileSync('/var/www/httpd-cert/admin/qwile.com.crt'),
    requestCert: true
};

var server = https.createServer(options, app); 
server.listen(port, function() {
	console.log("Express server listening on port " + port);
});
var io = require('socket.io')(server);

app.get('/', function (req, res) {
	res.writeHead(200);
	res.end("Hello, secure world!\n" + req.toString());
});

var codesMath = {};

io.on('connection', function(socket) {
    
    console.log('A user with ID: ' + socket.id + ' connected!');
    
    socket.on('tvconnect', function(data) {
        
        // сначала телек
        
        console.log('Code is: ' + data.code);
        codesMath[data.code] = socket.id;
        console.log('ID is: ' + codesMath[data.code]);
        
    });
    
   // затем мобила

    socket.on('mobileconnect', function(code) {

        console.log('Mobileconnect code is: ' + code);
        io.to(codesMath[code]).emit('mobileconnect', true);

        socket.on('disconnect', function() {
            console.log('user disconnected');
            console.log('Code to send: ' + codesMath[code]);
            io.to(codesMath[code]).emit('mobiledisconnect', true);
        });

        socket.on('buttonpress', function(data) {
            console.log(data);
            io.to(codesMath[code]).emit('buttonpress', data);
        });

        socket.on('volumechange', function(data) {
            // console.log(data);
            io.to(codesMath[code]).emit('volumechange', data);
        });

	socket.on('volumechangestart', function() {
            io.to(codesMath[code]).emit('volumechangestart');
        });

	socket.on('volumechangestop', function() {
            io.to(codesMath[code]).emit('volumechangestop');
        });

    });
    
});
