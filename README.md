# Grove - VoiceRecognizer
***
## Introduction 
Use voice to interact with things around you can always be one of the most interesting things of IoT application, we want to make something more different and cooler. Recently we just launched the voice control solution “Respeaker” on Kickstarter and it becomes the blockbuster. However not everybody needs a Respeaker to build voice control project, sometimes people only need a simple solution, here we would like to introduce the first generation of grove speech recognizer to realize your dream of smart home easily and fast.
***  
## <span id="jump">Reference</span>  
Before you start a project,I recommend you to visit the [Usage of voice recognizer page](http://wiki.seeedstudio.com/Grove-Speech_Recognizer/)  .   
***Actully it's not a recommendation  for people who use this sensor for the first time,I think you have to read it at  first for better use experience.Thanks!!!***



# Micro:Bit library usage  
## Add to web editor
Add this library to micro:bit web editor as a extension library.
***
## Introduction of two main blocks
There are two blocks in library:  
The "Create Voice Recognizer with TX and RX"  to init the sensor  
![](https://user-images.githubusercontent.com/30164980/47712676-4a422a00-dc73-11e8-893a-2ea7e8d42856.png)  

***
and the "Receive Voice Recognizer event"  to listen at serial port,if the sensor is triggered,enter the callback event.   
![](https://user-images.githubusercontent.com/30164980/47712697-5b8b3680-dc73-11e8-9edc-ba021fedf18b.png)  
 ***
## Redirect serial pin
There isn't a grove serial port on the board,So we have to redirect the serial pin to the grove-port,There are four grove ports on grove micro:bit shied:I2C,P0/P14,P1/P15,P2/P16,so we can redirect the serial's TX&RX to P0/P14,P1/P15,P2/P16.
![](https://user-images.githubusercontent.com/30164980/47713406-2a136a80-dc75-11e8-9cb1-dbb3253e05cf.png)  
***
## Example  
For example,we put the "Create Voice Recognizer with TX and RX" block into "on start" block to init the sensor.And redirect the TX pin to P14,RX pin to P0.  
And then,Create a callback event,if sensor is triggered,the sensor will send a number to micro:bit board via serial.We can do something according to that number which received.
When we receive the result of sensor,show string(Certainly,You can do another interesting things ).    
![](https://user-images.githubusercontent.com/30164980/47713294-e9b3ec80-dc74-11e8-9593-4ede364a75dd.png)  
***
As we know ,there are 22 commands that sensor supported(If you had visited the [usage page](#jump)).So we can registe for every command like this:  
![](https://user-images.githubusercontent.com/30164980/47713368-16680400-dc75-11e8-865a-d981ffc7dfb9.png)  
***
![](https://user-images.githubusercontent.com/30164980/47714694-875ceb00-dc78-11e8-84f5-55af1c2facad.png)  
***
## Wiring  
![](https://user-images.githubusercontent.com/30164980/47714151-0b15d800-dc77-11e8-92a8-a9acc67282be.png)  
***
## Speak to sensor.
Speak loudly  with the specified command and hacking something in the recv-event block.

Wish you enjoy yourself!!


***
This software is written by downey  for seeed studio<br>
Email:dao.huang@seeed.cc
and is licensed under [The MIT License](http://opensource.org/licenses/mit-license.php). Check License.txt for more information.<br>

Contributing to this software is warmly welcomed. You can do this basically by<br>
[forking](https://help.github.com/articles/fork-a-repo), committing modifications and then [pulling requests](https://help.github.com/articles/using-pull-requests) (follow the links above<br>
for operating guide). Adding change log and your contact into file header is encouraged.<br>
Thanks for your contribution.

Seeed Studio is an open hardware facilitation company based in Shenzhen, China. <br>
Benefiting from local manufacture power and convenient global logistic system, <br>
we integrate resources to serve new era of innovation. Seeed also works with <br>
global distributors and partners to push open hardware movement.<br>
