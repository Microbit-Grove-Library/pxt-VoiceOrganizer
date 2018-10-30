let oled: groveoleddisplay.SH1107G;
oled.init();
oled.clearDisplay();

oled.drawRec(63,63,67,67);
oled.drawRec(42,0,100,80);
// oled.setTextXY(0, 0);
// oled.putString("hello");

oled.setTextXY(64, 0);
oled.putString("world");


basic.forever(() => {
    basic.showNumber(200);
    basic.pause(250);
})