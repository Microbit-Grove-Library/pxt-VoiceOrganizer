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
    //% block=None
    None=0,
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
     * @param TX_PIN  TX_PIN num
     * @param RX_PIN  RX_PIN num
     * @param Baud    Serial baudrate
     */
    //% blockId=grove_voice_recognizer_create block="Create Voice recognizer"
    export function createVoiceRecognizer(TX_PIN:RedirectSerialPin,RX_PIN:RedirectSerialPin,Baud:SerialBuad)
    {
        serial.redirect(TX_PIN,RX_PIN,Baud);
    }
    /**
     *  Get Voice-Recognizer result.
     */
    //% blockId=grove_get_voice_recognizer_result  block="Get Voice Recognizer Result"
    export function getResultFromSerial:VoiceType()
    {
        return Turn_on_the_light;
    }
    
}