var http = require("http").createServer(handler); // "on req" - "handler"
var io = require("socket.io").listen(http); // socket knjižnica
var fs = require("fs"); // spremenljivka za "file system" za posredovanje html
var firmata = require("firmata");

console.log("Starting the code");

function handler(req, res) {
    fs.readFile(__dirname + "/primer00.html",
    function (err, data) {
        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            return res.end("Napaka pri nalaganju html strani.");
        }
    res.writeHead(200);
    res.end(data);
    })
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

http.listen(8080); // strežnik bo poslušal na vratih 8080

var pošljiVrednostPrekoVtičnika = function(){}; // spr. za pošiljanje sporočil


var board = new firmata.Board("/dev/ttyACM0", function(){
    
});


board.on("ready", function() {
    console.log('test')
    console.log("Aktiviramo pin 2");
    board.pinMode(2, board.MODES.OUTPUT); // pin za smer na H-mostu
    console.log("Aktiviramo pin 3");
    board.pinMode(3, board.MODES.PWM); // Pulse Width Modulation - hitrost
    
    board.pinMode(8, board.MODES.INPUT);
    board.pinMode(12, board.MODES.INPUT);
    
    board.pinMode(13, board.MODES.OUTPUT); // pin za smer na H-mostu
    
    board.analogWrite(3, 100);
    
    
    // desno
    board.digitalRead(8, function(value) {
        console.log('8')
        board.digitalWrite(13, 0)
    })
    
    // levo
    board.digitalRead(12, function(value) {
        console.log('12')
        board.digitalWrite(13, 1)
    })
    
    io.sockets.on("connection", function(socket) {
        
    });  
    
});


