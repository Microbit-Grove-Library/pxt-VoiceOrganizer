enum VoiceType {
    //% block=None
    None = 0,
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

    const voiceRecognizerEvenNum: number = 3102;
    
    export function  getResultFromSerial() : VoiceType
    {
        let result: VoiceType;
        let recv_data: Buffer = null;
        recv_data = serial.readBuffer(1);
        return recv_data[0];
    }

    /**
     * Create Grove - Voice-Recognizer
     * @param TX_PIN  TX_PIN num
     * @param RX_PIN  RX_PIN num
     */
    //% blockId=grove_voice_recognizer_create block="Create Voice recognizer with TX|%TX_PIN and RX|%RX_PIN"
    export function createVoiceRecognizer(TX_PIN: SerialPin, RX_PIN: SerialPin) {
        serial.redirect(TX_PIN, RX_PIN, BaudRate.BaudRate9600);
    }


    /**
    *  Listen to serial for message.
    *  @param result Listen Voice result.
    *  @param handler Event handler.
    */
    //% blockId=listen_voice_recognzer  block="Receive Voice Recognizer |%result event"
    export function startListenVoiceRecognizer(result: VoiceType,handler: () => void) 
    {
        control.onEvent(voiceRecognizerEvenNum, result, handler);

        control.inBackground(function () {
            while (1) {
                
                result = grovevoicerecognizer.getResultFromSerial()
                if (result != VoiceType.None) {
                    control.raiseEvent(voiceRecognizerEvenNum, result);
                }
                basic.pause(100);
            }

        })
    }
}