var http = require("http").createServer(handler); // "on req" - "handler"
var io = require("socket.io").listen(http); // socket knjižnica
var fs = require("fs"); // spremenljivka za "file system" za posredovanje html
var firmata = require("firmata");

console.log("Starting the code");

function handler(req, res) {
    fs.readFile(__dirname + "/naloga02.html",
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

var values = new Array()

var getAverageLightLevel = function(window=100) {
    try {
        return values.slice(values.length-window, values.length).reduce((a, b) => a + b, 0)/window
    }
    catch (e){
        return values.splice(-1)
    }
    
}

var board = new firmata.Board("/dev/ttyACM0", function(){
    console.log("Povezava na Arduino");
    board.pinMode(3, board.MODES.SERVO);
    board.pinMode(2, board.MODES.ANALOG)
});

var emitValue = function(){};

board.on("ready", function() {
    io.sockets.on("connection", function(socket) {
        emitValue = function (value, name="messageToClient") {
            io.sockets.emit(name, value);
        }
    });
    board.analogRead(2, function(value) {
        values.push(value)
        if (values.length > 500) {values.shift();}
        var avgLevel = getAverageLightLevel()
        board.servoWrite(3, avgLevel)
        emitValue([value, avgLevel], 'lightLevels')
    })
});// JavaScript File