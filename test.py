# test
import pyduino
import serial
import time
    
board = pyduino.Arduino('/dev/ttyACM0')

board.digital[13].set_active(1)
board.digital[13].set_mode(pyduino.DIGITAL_OUTPUT)
board.digital[12].set_active(1)
board.digital[12].set_mode(pyduino.DIGITAL_OUTPUT)
board.digital[2].set_active(1)
board.digital[2].set_mode(pyduino.DIGITAL_INPUT)

# board.digital[13].write(1) 
# time.sleep(5)
# board.digital[13].write(0) 



# for i in range(2):
#     if i%2 == 0:    
#         board.digital[13].write(1) 
#     else:
#         board.digital[13].write(0) 

#     time.sleep(3)

board.digital[13].write(1)
while True:
    time.sleep(3)
    try:
        value = board.digital[2].read()
        print(value)
    except Exception as e:
        print(e)
        board.exit()
    

# board.exit()

print('OK')
