// Framework for firmata
// Brings additional functionality to firmata like button management, motor management, etc.
var firmata = require("firmata");

class Board {
    constructor(port) {
        this.firmata = new firmata.Board(port)
        // console.log(this)
    }
    
    addButtonClicker() {
        
    }
    
    addOutputDevice(pin=13){
        return new OutputDevice(pin, this.firmata)
    }
}

class ClickerButton {
    constructor() {
        //console.log(this)
    }
}

class OutputDevice {
    constructor(pin, board) {
        if (!board) {
            throw 'Board needed!'
        }
        this.pin = pin
        this.board = board
        console.log(this.board)
        console.log( this.board.MODES.OUTPUT)
        this.board.pinMode(pin, this.board.MODES.OUTPUT);
    }
    turnOn() {
        this.board.digitalWrite(this.pin, this.board.HIGH);
    }
    turnOff() {
        this.board.digitalWrite(this.pin, this.board.LOW);
    }
    
    
}

module.exports.Board = Board