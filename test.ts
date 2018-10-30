grovevoicerecognizer.createVoiceRecognizer(SerialPin.P14, SerialPin.P0)
basic.forever(function () {

})
grovevoicerecognizer.startListenVoiceRecognizer(VoiceType.Turn_off_the_light, function () {
    basic.showIcon(IconNames.Heart)
})