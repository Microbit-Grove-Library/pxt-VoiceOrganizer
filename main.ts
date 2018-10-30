enum RedirectSerialPin{
    //% block=P0
    P0 = 7,
    //% block=P1
    P1 = 8,
    //% block=P2
    P2 = 9,
    //% block=P8
    P8 = 15,
    //% block=P12
    P12 = 19,
    //% block=P13
    P13 = 20,
    //% block=P14
    P14 = 21,
    //% block=P15
    P15 = 22,
    //% block=P16
    P16 = 23
}

enum SerialBuad{
    //% block=Baud 115200
    Baud_115200,
    //% block=Baud 57600
    Baud_57600,
    //% block=Baud 38400
    Baud_38400,
    //% block=Baud 31250
    Baud_31250,
    //% block=Baud 28800
    Baud_28800,
    //% block=Baud 14400
    Baud_14400,
    //% block=Baud 9600
    Baud_9600,
    //% block=Baud 4800
    Baud_4800,
    //% block=Baud 1200
    Baud_1200,
    //% block=Baud 300
    Baud_300,
}

enum VoiceType{
    //% block=Turn on the light
    Turn_on_the_light,
    //% block=Turn off the light
    Turn_off_the_light,
    //% block=Play music
    Play_music,
    //% block=Pause
    Pause,
    //% block=Next
    Next,
    //% block=Previous
    Previous,
    //% block=Up
    Up,
    //% block=Down
    Down,
    //% block=Turn on the TV
    Turn_on_the_TV,
    //% block=Turn off the TV
    Turn_off_the_TV,
    //% block=Increase temperature
    Increase_temperature,
    //% block=Decrease temperature
    Decrease_temperature,
    //% block=What's the time
    What_the_time,
    //% block=Open the door
    Open_the_door,
    //% block=Close the door
    Close_the_door,
    //% block=Left
    Left,
    //% block=Right
    Right,
    //% block=Stop
    Stop,
    //% block=Start
    Start,
    //% block=Mode 1
    Mode_1,
    //% block=Mode 2
    Mode_2,
    //% block=Go
    Go
}


/**
 * Functions to operate Grove module.
 */
//% weight=11 color=#9F79EE icon="\uf108" block="Voice recognizer"
namespace grovevoicerecognizer {

    /**
     * Create Grove - Voice-Recognizer
     */
    //% blockId=grove_voice_recognizer_create block="Create Voice recognizer"
    export function createVoiceRecognizer(TX_PIN:RedirectSerialPin,RX_PIN:RedirectSerialPin,Baud:SerialBuad)
    {
        serial.redirect(TX_PIN,RX_PIN,Baud)
    }

    export function getResultFromSerial()
    {
        
    }
    export class SH1107G 
    {

        private sendData(data:number) {
            let buf: Buffer = pins.createBuffer(2);
            buf[0] = 0x40; // SeeedGrayOLED_Data_Mode
            buf[1] = data;

            pins.i2cWriteBuffer(0x3c, buf, false);
            // pins.i2cWriteBuffer(0x3c, buf);
        }

        private sendCommand(cmd:number) {
            
            let buf: Buffer = pins.createBuffer(2);
            buf[0] = 0x80;  // SeeedGrayOLED_Command_Mode
            buf[1] = cmd;

            pins.i2cWriteBuffer(0x3c, buf, false);
            // pins.i2cWriteBuffer(0x3c, buf);
        }

        /**
         * Init Grove - OLED Display
         */
        //% blockId=grove_oled_init block="%oled|Init Grove - OLED Display"
        //% advanced=true
        init() {
            this.sendCommand(0xae);  // Display OFF 
            this.sendCommand(0xd5);  // Set Dclk
            this.sendCommand(0x50);  // 100Hz
            this.sendCommand(0x20);  // Set row address
            this.sendCommand(0x81);  // Set contrast control
            this.sendCommand(0x80);  
            this.sendCommand(0xa0);  // Segment remap
            this.sendCommand(0xa4);  // Set Entire Display ON 
            this.sendCommand(0xa6);  // Normal display
            this.sendCommand(0xad);  // Set external VCC
            this.sendCommand(0x80);
            this.sendCommand(0xc0);  // Set Common scan direction
            this.sendCommand(0xd9);  // Set phase leghth
            this.sendCommand(0x1f);
            this.sendCommand(0xdb);  // Set Vcomh voltage
            this.sendCommand(0x27);
            this.sendCommand(0xaf);  // Display ON
            this.sendCommand(0xb0);
            this.sendCommand(0x00);
            this.sendCommand(0x11);
        }

        /**
         * Set display position
         * @param row which row to display, range from 0 to 15.
         * @param col which col to display, range from 0 to 127.
         */
        //% blockId=grove_oled_set_text_xy block="%oled|Set display position at row|%row|and column|%col"
        //% row.min=0 row.max=15
        //% col.min=0 col.max=127
        setTextXY(row:number, col:number) {
            let col_l:number = col % 16;
            let col_h:number = (col / 16)+0x10;

            this.sendCommand(0xb0+row);
            this.sendCommand(col_l);
            this.sendCommand(col_h);
        }

        /**
         * Clear display
         */
        //% blockId=grove_oled_clear_display block="%oled|Clear display"
        clearDisplay() {
            for(let i:number=0; i<16;i++){
                this.sendCommand(0xb0+i);
                this.sendCommand(0x0);
                this.sendCommand(0x10);
                for(let j=0; j<128;j++){ 
                  this.sendData(0x00);  
                }
            }
        }

        private putChar(c:number) {
            if (c < 32 || c > 127) {
                c = 0; // space
            }
            else {
                c = c-32;
            }

            for(let i=0; i< 8;i++){
                this.sendData(oledFont[c*8+i]);
            }
        }

        /**
         * Display a string
         * @param s a string to display.
         */
        //% blockId=grove_oled_put_string block="%oled|Display string |%s|"
        putString(s:string) {
            for (let n=0;n<s.length;n++){
                this.putChar(s.charCodeAt(n));
            }
        }

        /**
         * Display a integer number
         * @param num a integer number to display.
         */
        //% blockId=grove_oled_put_number block="%oled|Display integer number |%num|"
        putNumber(num:number) {
            this.putString(num.toString());
        }

        /**
         * Display a bit map(32x32 max)
         * @param x_start 
         * @param y_start 
         * @param row_number
         * @param column_number
         * @param bitmap
         */
        //% blockId=grove_oled_draw_bitmap block="%oled|Draw bitmap start at row|%x_start|and column|%y_start|, size: row|%row_number|and column|%column_number|, bitmap:|%bitmap|"
        //% x.min=0 x.max=15
        //% y.min=0 y.max=127
        //% row_number.min=0 row_number.max=4
        //% column_number.min=0 column_number.max=32
        //% advanced=true
        drawBitmap(x_start:number,y_start:number,row_number:number,column_number:number,bitmap:number[]) {
            let x_end = x_start+row_number;
            let y_end = y_start+column_number;
            if (x_end > 16) x_end = 16;
            if (y_end > 128) y_end = 128;
            let x_offset = 0, y_offset = 0;

            for (let i=x_start; i<x_end; i++) {
                y_offset = 0;
                for (let j=y_start; j<y_end; j++) {
                    let temp_byte = bitmap[column_number*x_offset+y_offset];
                    y_offset++;
                    this.sendCommand(0xb0+i);
                    this.sendCommand(j % 16);
                    this.sendCommand(j/16 + 0x10);
                    this.sendData(temp_byte);
                }
                x_offset ++ ;
            }
            
        }

        private drawPixel(x: number, y:number, data:number) {
            if (x<0) x = 0;
            else if (x>127) x = 127;
            if (y<0) y = 0;
            else if (y>127) y = 127;
            if (data < 0) data = 0;
            else if (data > 255) data = 255;

            this.setTextXY(x/8,y);
            this.sendData(data);
        }

        /**
         * Draw a horizontal line
         * @param x  
         * @param y
         * @param len
         */
        //% blockId=grove_oled_draw_hline block="%oled|Draw horizontal line start at x|%x|and y|%y|, length|%len|"
        //% y.min=0 y.max=127
        //% x.min=0 x.max=127
        //% len.min=1 len.max=128
        drawHLine(x: number, y: number, len: number) {
            let y_max = y + len;
            if (y_max > 128) y_max = 128;
            for (let i=y;i<y_max;i++) {
                this.drawPixel(x,i,0x01<<(x%8));
            }
        }

        /**
         * Draw a vertical line
         * @param x  
         * @param y
         * @param len
         */
        //% blockId=grove_oled_draw_vline block="%oled|Draw vertical line start at x|%x|and y|%y|, length|%len|"
        //% y.min=0 y.max=127
        //% x.min=0 x.max=127
        //% len.min=1 len.max=128
        drawVLine(x: number, y: number, len: number) {
            let x_min = 0, x_max = 0;
            x_min = Math.floor((x / 8));
            x_max = x + len;
            x_min = x_min * 8;
            if (x_max > 128) x_max = 128;
            while ((x_max % 8) != 0) {
                x_max++;
            }

            let last_bit = 0xff;
            for (let i=0;i<(x_max-x-len);i++) {
                last_bit = last_bit - (0x01<<(7-i));
            }
            let first_bit = 0xff;
            for (let i=0;i<(x-x_min);i++) {
                first_bit = first_bit - (0x01<<i);
            }
            
            if (x_max - x_min > 16) {
                this.drawPixel(x_min,y,first_bit);
                for (let i=x_min+8;i<x_max-8;i=i+8){
                    this.drawPixel(i,y,0xff);
                }
                this.drawPixel(x_max-1,y,last_bit);
            }
            else if (x_max - x_min == 16) {
                this.drawPixel(x_min,y,first_bit);
                this.drawPixel(x_max-1,y,last_bit);
            }
            else {
                this.drawPixel(x_min,y,(first_bit & last_bit));
            }
        }

        /**
         * Draw a rectangle
         * @param x1  
         * @param y1
         * @param x2
         * @param y2
         */
        //% blockId=grove_oled_draw_rec block="%oled|Draw a rectangle start at x|%x1|and y|%y1|, end at x|%x2|and y|%y2|"
        //% y1.min=0 y1.max=127
        //% x1.min=0 x1.max=127
        //% y2.min=0 y2.max=127
        //% x2.min=0 x2.max=127
        drawRec(x1: number, y1: number, x2:number, y2:number) {
            let temp = 0;
            if (y2<y1) {
                temp = y2;
                y2 = y1;
                y1 = temp;
            }
            if (x2<x1) {
                temp = x2;
                x2 = x1;
                x1 = temp;
            }

            this.drawHLine(x1,y1,y2-y1+1);
            this.drawHLine(x2,y1,y2-y1+1);
            this.drawVLine(x1,y1,x2-x1+1);
            this.drawVLine(x1,y2,x2-x1+1);

        }
    }

}