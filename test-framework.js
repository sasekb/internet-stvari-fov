// Test framework
var ff = require("./firmata-framework.js")

let board = new ff.Board("/dev/ttyACM0")

let led = board.addOutputDevice()


led.turnOn()
