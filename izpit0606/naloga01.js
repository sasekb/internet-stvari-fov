var http = require("http").createServer(handler); // "on req" - "handler"
var io = require("socket.io").listen(http); // socket knjižnica
var fs = require("fs"); // spremenljivka za "file system" za posredovanje html
var firmata = require("firmata");

console.log("Starting the code");

function handler(req, res) {
    fs.readFile(__dirname + "/naloga01.html",
    function (err, data) {
        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            return res.end("Napaka pri nalaganju html strani.");
        }
    res.writeHead(200);
    res.end(data);
    })
}

http.listen(8080); // strežnik bo poslušal na vratih 8080// JavaScript File

var board = new firmata.Board("/dev/ttyACM0", function(){
    console.log("Povezava na Arduino");
    board.pinMode(13, board.MODES.OUTPUT);
});

board.on("ready", function() {
    io.sockets.on("connection", function(socket) {
        socket.on("led", function(value) {
            if (value === 1) {
                board.digitalWrite(13, board.HIGH);
            }
            else {
                board.digitalWrite(13, board.LOW);
            }
        });
    });
});