grovevoicerecognizer.createVoiceRecognizer(SerialPin.P14, SerialPin.P0, BaudRate.BaudRate9600);

basic.forever(function () {
    let result: VoiceType;
    result = grovevoicerecognizer.getResultFromSerial();
    serial.writeNumber(result);
    switch (result) {
        case VoiceType.None: basic.showIcon(IconNames.Angry);
            break;
        case VoiceType.Turn_on_the_light: basic.showIcon(IconNames.Asleep);
            break;
        case VoiceType.Turn_off_the_light: basic.showIcon(IconNames.Butterfly); break;
        case VoiceType.Play_music: basic.showIcon(IconNames.Chessboard); break;
        case VoiceType.Pause: basic.showIcon(IconNames.Confused); break;
        case VoiceType.Next: basic.showIcon(IconNames.Cow); break;
        case VoiceType.Previous: basic.showIcon(IconNames.Diamond); break;
        case VoiceType.Up: basic.showIcon(IconNames.Duck); break;
        case VoiceType.Down: basic.showIcon(IconNames.EigthNote); break;
        case VoiceType.Turn_on_the_TV: basic.showIcon(IconNames.Fabulous); break;
        case VoiceType.Turn_off_the_TV: basic.showIcon(IconNames.Ghost); break;
        case VoiceType.Increase_temperature: basic.showIcon(IconNames.Giraffe); break;
        case VoiceType.Decrease_temperature: basic.showIcon(IconNames.Happy); break;
        case VoiceType.What_the_time: basic.showIcon(IconNames.Heart); break;
        case VoiceType.Open_the_door: basic.showIcon(IconNames.House); break;
        case VoiceType.Close_the_door: basic.showIcon(IconNames.LeftTriangle); break;
        case VoiceType.Left: basic.showIcon(IconNames.Meh); break;
        case VoiceType.Right: basic.showIcon(IconNames.No); break;
        case VoiceType.Mode_1: basic.showIcon(IconNames.Pitchfork); break;
        case VoiceType.Mode_2: basic.showIcon(IconNames.QuarterNote); break;
        case VoiceType.Go: basic.showIcon(IconNames.Rabbit); break;
        default: basic.showIcon(IconNames.Rollerskate); break;
    }
})