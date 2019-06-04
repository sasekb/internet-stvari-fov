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

http.listen(8080); // strežnik bo poslušal na vratih 8080

var pošljiVrednostPrekoVtičnika = function(){}; // spr. za pošiljanje sporočil


var board = new firmata.Board("/dev/ttyACM0", function(){
    console.log("Povezava na Arduino");
    console.log("Aktiviramo Pin 13");
    board.pinMode(13, board.MODES.OUTPUT); // pin13 kot izhod
    console.log("Omogočimo Pin 2 kot vhod");
    board.pinMode(2, board.MODES.INPUT);
    board.pinMode(0, board.MODES.ANALOG);
    board.pinMode(1, board.MODES.ANALOG);
    
    board.pinMode(8, board.MODES.OUTPUT);
    board.pinMode(9, board.MODES.OUTPUT);
    board.pinMode(10, board.MODES.OUTPUT);
    
    
});

var switchState = false;
var nrOfClicks = 0;

board.on("ready", function() {
    io.sockets.on("connection", function(socket) {
        pošljiVrednostPrekoVtičnika = function (value) {
            io.sockets.emit("sporočiloKlientu", value);
        }
        var emitPotentiometerValue = function(val) {
            console.log(val)
        }
        socket.on('prižgiLED', () => {
            board.digitalWrite(13, board.HIGH);
        })
        socket.on('ugasniLED', () => {
            board.digitalWrite(13, board.LOW);
        })
    });    
    
    board.digitalRead(2, function(value) {
        if (nrOfClicks % 2 === 0) {
            switchState = !switchState
            pošljiVrednostPrekoVtičnika(switchState);
        }
        if (switchState) {
            board.digitalWrite(13, board.HIGH);
        }
        else {
            board.digitalWrite(13, board.LOW);
        }
        nrOfClicks++;
    }); 
    
    board.analogRead(0, val => {
        // console.log(val)
    })
    
    board.analogRead(1, val => {
        console.log(val)
        if (val < 300) {
            board.digitalWrite(10, board.HIGH);
        
            board.digitalWrite(9, board.LOW);
            board.digitalWrite(8, board.LOW);
        }
        else if (val > 700) {
            board.digitalWrite(8, board.HIGH);
            board.digitalWrite(10, board.LOW);
            board.digitalWrite(9, board.LOW);
        }
        else {
            board.digitalWrite(9, board.HIGH);
            board.digitalWrite(10, board.LOW);
            board.digitalWrite(8, board.LOW);
        }
    })
});




