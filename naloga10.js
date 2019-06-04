var http = require("http").createServer(handler); // "on req" - "handler"
var io = require("socket.io").listen(http); // socket knjižnica
var fs = require("fs"); // spremenljivka za "file system" za posredovanje html
var firmata = require("firmata");

console.log("Starting the code");

function handler(req, res) {
    fs.readFile(__dirname + "/naloga10.html",
    function (err, data) {
        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            return res.end("Napaka pri nalaganju html strani.");
        }
    res.writeHead(200);
    res.end(data);
    })
}

http.listen(8080); // strežnik bo poslušal na vratih 8080

var pošljiVrednostPrekoVtičnika = function(){}; // spr. za pošiljanje sporočil


var board = new firmata.Board("/dev/ttyACM0", function(){
    console.log("Povezava na Arduino");
    console.log("Omogočimo Pin 2 kot vhod");
    board.pinMode(2, board.MODES.INPUT);
    
    
});

var emitValue = function(){};

board.on("ready", function() {
    io.sockets.on("connection", function(socket) {
        emitValue = function (value, name="sporočiloKlientu") {
        io.sockets.emit(name, value);
        }
    });    
    
    board.analogRead(2, function(value) {
        emitValue(value);
    })
        
});




