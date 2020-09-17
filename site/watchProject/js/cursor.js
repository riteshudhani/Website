function docLoadedFuncCursor(){

var g_xcursor = 0, g_ycursor =0;;
var g_azimuth = 0, g_inclination =0;;
window.g_xcursor = g_xcursor;
window.g_ycursor = g_ycursor;

var calibrationOn = true;
var practiceOn = false;


var WIDTH  = window.innerWidth,
HEIGHT = window.innerHeight;

var AZIMUTH_MAX = 0,
AZIMUTH_MIN = -50,
INCLINATION_MAX = 70,
INCLINATION_MIN = 0;

var clickCountLocal =0;
var clickCountHomeTarLocal =0;
var recordingEventsLocal = false;

//var countCalibButtonsPressed = 0;
// var azimuth_lr =0, azimuth_ll = 0, azimuth_ur =0, azimuth_ul =0;
// var inclination_lr =0, inclination_ll = 0, inclination_ur =0, inclination_ul =0;

var countIncMaxPressed = 0, countIncMinPressed = 0, countAzMaxPressed = 0, countAzMinPressed = 0;
var azimuth_max =0, azimuth_min = 0;
var inclination_max =0, inclination_min = 0;

//var min_azimuth =0, min_inclination =0, max_azimuth=0, max_inclination =0;


var body = document.querySelector('body');

// Insert button in page
var connectButton = document.createElement('button');
connectButton.textContent = "Connect";
connectButton.id = "connect"
body.appendChild(connectButton);

// Insert cursor in page
var armCursor = document.createElement('div');
armCursor.id = "arm-cursor";
armCursor.style.border = "none";
//armCursor.textContent = "."
/*var str = "a.";
var result = str.bold();
armCursor.innerHTML = result;
armCursor.textContent.bold();
armCursor.style.textAlign = "center";
armCursor.style.fontSize = "50px"*/

armCursor.addEventListener("click",cursorClicked);
body.appendChild(armCursor);

var markerDot = document.createElement("div");
markerDot.className = "markerDot"
armCursor.appendChild(markerDot);

var bullsEye = document.createElement("div");
bullsEye.className = "bulls-eye";
armCursor.appendChild(bullsEye);

var armAngleCharacteristic = null;

var lastReadValueResponse = 0;

var cursorHistory = [];
window.cursorHistory = cursorHistory;
var isDwelling = false;

var clickPositionInsideTarget = false;
window.clickPositionInsideTarget = clickPositionInsideTarget;

function cursorClicked(e){
    if(!calibrationOn && !practiceOn)
    {
        
        var insidebutton0 = button0HoverCheck(g_xcursor + 15, g_ycursor +15);
        var insidebutton1 = button1HoverCheck(g_xcursor +15 , g_ycursor +15);

        console.log("Inside =", insidebutton0, "over state =", button0.overState, g_xcursor, g_ycursor);

        if (insidebutton0 && button0.overState === "over")
        {
            simulate(document.getElementById("button0"), "click");
            clickPositionInsideTarget = true;
            addHistory(g_xcursor, g_ycursor,  g_azimuth, g_inclination, true, 0);
        }

        if (insidebutton1 && MyButton1.overState === "over")
        {
            simulate(MyButton1, "click");
            clickPositionInsideTarget = true;
            addHistory(g_xcursor, g_ycursor,  g_azimuth, g_inclination, true, 0);
        }

        if(!insidebutton0 && !insidebutton1)
        {
            //clickPositionInsideTarget = false;
            addHistory(g_xcursor, g_ycursor,  g_azimuth, g_inclination, false, 1);
        }
    }
    else if (practiceOn){
            var button2 = document.getElementById("button2");
            var button3 = document.getElementById("button3");
            var insidebutton2 = button2HoverCheck(g_xcursor + 15, g_ycursor +15);
            var insidebutton3 = button3HoverCheck(g_xcursor +15 , g_ycursor +15);

            console.log("Inside =", insidebutton2, "over state =", button2.overState, g_xcursor, g_ycursor);

            if (insidebutton2 && button2.overState === "over")
            {
                simulate(document.getElementById("button2"), "click");
            }

            if (insidebutton3 && button3.overState === "over")
            {
                simulate(button3, "click");
            }            
        }
    else {
            var button = document.getElementById("startExperiment");
            if(button)
            {
               simulate(button, "click");
               console.log("button clicked");
            }
        }
}

function init(){
    webSocket = new WebSocket("ws://192.168.0.158:4000/arm");
    webSocket.onmessage = handleMessage;
    connectButton.remove();


    azimuth_min = localStorage.getItem("min_azimuth");
    azimuth_max = localStorage.getItem("max_azimuth");
    inclination_min = localStorage.getItem("min_inclination");
    inclination_max = localStorage.getItem("max_inclination");

    if(azimuth_min != undefined && azimuth_min != null && azimuth_max != undefined && azimuth_max != null && inclination_min != undefined && inclination_min != null && inclination_max != undefined && inclination_max != null) {
        document.getElementById("minmax1").textContent = "Azimuthal_min = " + azimuth_min + "Azimuthal_max = " + azimuth_max + "Inclination_min = " + inclination_min + "Inclination_max = " + inclination_max;
        document.getElementById("azmin").innerHTML = "Az_min = " + azimuth_min + "<br>" +"Az_max = " + azimuth_max + "<br>" + "Inc_min = " + inclination_min + "<br>" +"Inc_max = " + inclination_max;
    }

}


function toDegrees(x){
return 360 * x/(2*Math.PI);
}

function handleMessage(evt) {
    let dataString = evt.data;
    let values = dataString.split('_');

    let azimuth = toDegrees(parseFloat(values[0]));
    let inclination = toDegrees(parseFloat(values[1]));

    g_azimuth = azimuth;
    g_inclination = inclination;

    document.getElementById("curAzi").innerHTML = azimuth.toFixed(2);
    document.getElementById("curIncli").innerHTML = inclination.toFixed(2);
    document.getElementById("azimuth").innerHTML = azimuth.toFixed(2);
    document.getElementById("inclination").innerHTML = inclination.toFixed(2);
    // var azimuth     = toDegrees(data.getFloat32(0));
    // var inclination = toDegrees(data.getFloat32(4));

    // console.log(dataString + "\t" + azimuth + "\t" + inclination);

    let x = WIDTH * (azimuth - AZIMUTH_MIN) / (AZIMUTH_MAX - AZIMUTH_MIN);
    let y = HEIGHT * (inclination - INCLINATION_MIN) / (INCLINATION_MAX - INCLINATION_MIN);
    y = HEIGHT - y;

    if(x<0)
        x=0;
    if(y<0)
        y=0;
    if(x>1890)
        x=1890;
    if(y>1050)
        y=1050;

    g_xcursor = x;
    g_ycursor = y;

    armCursor.style.top = y + "px";
    armCursor.style.left = x + "px";

   // console.log(g_xcursor, g_ycursor);

    if(!calibrationOn && !practiceOn)
    {
        
        

        var insidebutton0 = button0HoverCheck(x+15, y+15);
        var insidebutton1 = button1HoverCheck(x+15, y+15);

        var checkInsideStatus = insidebutton0 || insidebutton1;

        addHistory(x, y, azimuth, inclination,checkInsideStatus, 0);

        if (insidebutton0 && button0.overState === "out")
        {
            simulate(document.getElementById("button0"), "mouseover");
        }

        if (!insidebutton0 && button0.overState === "over")
        {
            simulate(document.getElementById("button0"), "mouseout");
        }


        if (insidebutton1 && MyButton1.overState === "out")
        {
            simulate(MyButton1, "mouseover");
        }

        if (!insidebutton1 && MyButton1.overState === "over")
        {
            simulate(MyButton1, "mouseout");
        }
    }

    if(practiceOn){

        var button2 = document.getElementById("button2");
        var button3 = document.getElementById("button3");
        var insidebutton2 = button2HoverCheck(x+15, y+15);
        var insidebutton3 = button3HoverCheck(x+15, y+15);

        var checkInsideStatus = insidebutton2 || insidebutton3;

        if (insidebutton2 && button2.overState === "out")
        {
            simulate(button2, "mouseover");
        }

        if (!insidebutton2 && button2.overState === "over")
        {
            simulate(button2, "mouseout");
        }


        if (insidebutton3 && button3.overState === "out")
        {
            simulate(button3, "mouseover");
        }

        if (!insidebutton3 && button3.overState === "over")
        {
            simulate(button3, "mouseout");
        }
        
    }
}



// function addHistory(x, y){
//    // if (cursorHistory.length == 80){
//     //  if (cursorHistory.length == 5){
//     //     cursorHistory.shift();
//     // }
//     var clickOccuredTrueTarget = false;
//     var clickOccuredHomeTarget = false;

//     if(window.recordingEvents)
//     {
//         recordingEventsLocal = window.recordingEvents;
//     }
    
//     // if(clickCountLocal != clickCount)
//     // {
//     //     clickOccuredTrueTarget = true;
//     //     clickCountLocal++;
//     //     if(clickCountLocal != clickCount)
//     //     {
//     //         console.log("Error: click count not same ",clickCountLocal, clickCount);
//     //         return;
//     //     }

//     // }


//     // if(clickCountHomeTarLocal != clickCountHomeTar)
//     // {
//     //     clickOccuredHomeTarget = true;
//     //     clickCountHomeTarLocal++;
//     //     if(clickCountHomeTarLocal != clickCountHomeTar)
//     //     {
//     //         console.log("Error: click count not same");
//     //         return;
//     //     }
//     // }

//     if(recordingEvents || recordingEvents!=recordingEventsLocal)
//     {
//         var currentTime = new Date(0);
//         currentTime = currentTime - startRecordingTime;
//         if(!clickOccuredHomeTarget && !clickOccuredTrueTarget)
//         {
//             cursorHistory.push([currentTime, x, y, "Move", localStorage.getItem("level"), localStorage.getItem("indexofdif"), localStorage.getItem("posture"), localStorage.getItem("participantID") ]);
//         }
//         else if(clickOccuredHomeTarget)
//         {
//             cursorHistory.push([currentTime, x, y, "HomeClick" , localStorage.getItem("level"), localStorage.getItem("indexofdif"), localStorage.getItem("posture") , localStorage.getItem("participantID")]);
//         }
//         else if(clickOccuredTrueTarget)
//         {
//             cursorHistory.push([currentTime, x, y, "TrueClick" , localStorage.getItem("level"), localStorage.getItem("indexofdif"), localStorage.getItem("posture"), localStorage.getItem("participantID") ]);  
//         }

//         if(recordingEvents!=recordingEventsLocal)
//         {
//             recordingEventsLocal = false;
//             dump();
//         }
//     }
// }

function dump(){
    //console.log(cursorHistory);
}

var resetBullsEye = function(selection){
    selection.style('width', '0px')
        .style('height', '0px')
        .style('left', '15px')
        .style('top', '15px');
}

var interruptDwell = function(){
    d3.select('.bulls-eye')
        .interrupt()
        .call(resetBullsEye);
    isDwelling = false;
}

var animateDwell = function(){
   d3.select('.bulls-eye')
        .transition()
        .duration(3000)
        .ease(d3.easeLinear)
        .style('width', '30px')
        .style('height', '30px')
        .style('left', '0px')
        .style('top', '0px')
        .on('end', function(){
            d3.select(this).call(resetBullsEye);
            isDwelling = false;
            let xy = cursorHistory[cursorHistory.length-1]
            document.elementFromPoint(xy[0], xy[1]).click();
        });
    isDwelling = true;
}

//window.animateDwell =animateDwell;

function sd(array){
    const n = array.length;
    const mean = array.reduce((a,b) => a+b)/n;
    return Math.sqrt(array.map(x => Math.pow(x-mean,2)).reduce((a,b) => a+b)/n);
}

function evaluateDwell(){
   // if (cursorHistory.length < 80) return;
    if (cursorHistory.length < 5) return;

    let sdx = sd(cursorHistory.map(p => p[0]));
    let sdy = sd(cursorHistory.map(p => p[1]));

    //console.log(sdx, " ", sdy);

    if (/*sdx < 5 && sdy < 5 && */!isDwelling && (button0HoverCheck(g_xcursor,g_ycursor) || button1HoverCheck(g_xcursor,g_ycursor)))
    {

        animateDwell();
    }

    if (/*(sdx > 5 || sdy > 5) &&*/ isDwelling)
        interruptDwell();

}

var button0HoverCheck = function (x ,y) {

    var totalWidth = (/*armCursor.offsetWidth  +*/ button0.offsetWidth )/2;
    //var distance = Math.sqrt(Math.pow(x-950 ,2) + Math.pow(y-542,2));
    var distance = Math.sqrt(Math.pow(x-960 ,2) + Math.pow(y-540,2));
    var inside = false;
    if(distance*100 < totalWidth*100){
        inside =true;
    }
   // console.log("totalWidth =", totalWidth, " distance =", distance, " inside =", inside);
  
    return inside;
}


var button1HoverCheck = function (x , y) {
 //   var but1 = document.getElementById("button1");
    var totalWidth = (/*armCursor.offsetWidth  +*/ MyButton1.offsetWidth )/2;
    var distance = Math.sqrt(Math.pow(x-MyButton1.offsetWidth/2-MyButton1.offsetLeft -MyButton1.parentNode.offsetLeft,2) + Math.pow(y-MyButton1.offsetWidth/2-MyButton1.offsetTop -MyButton1.parentNode.offsetTop,2));;
    var inside = false;
    if(distance*100 < totalWidth*100){
        inside =true;
    }
   // console.log("totalWidth =", totalWidth, " distance =", distance, " inside =", inside);
  
    return inside;

}

var button2HoverCheck = function (x ,y) {

    var button2 = document.getElementById("button2");
        
    var totalWidth = (/*armCursor.offsetWidth  +*/ button2.offsetWidth )/2;
    //var distance = Math.sqrt(Math.pow(x-950 ,2) + Math.pow(y-542,2));
    var distance = Math.sqrt(Math.pow(x-690 ,2) + Math.pow(y-410,2));
    var inside = false;
    if(distance*100 < totalWidth*100){
        inside =true;
    }
   // console.log("totalWidth =", totalWidth, " distance =", distance, " inside =", inside);
  
    return inside;

    // var inside = false;
    // if(x < 741 && x>640 && y<461 && y > 360)
    //     inside  = true;

    // return inside;
}
 var switchPosition = false;

var button3HoverCheck = function (x ,y) {

    var button3 = document.getElementById("button3");
    var totalWidth = (/*armCursor.offsetWidth  +*/ button3.offsetWidth )/2;
    var distance = Math.sqrt(Math.pow(x-button3.offsetWidth/2-button3.offsetLeft -button3.parentNode.offsetLeft,2) + Math.pow(y-button3.offsetWidth/2-button3.offsetTop -button3.parentNode.offsetTop,2));;
    var inside = false;
    if(distance*100 < totalWidth*100){
        inside =true;
    }
   // console.log("totalWidth =", totalWidth, " distance =", distance, " inside =", inside);
  
    return inside;
    // var inside = false;
    // if(switchPosition) {
    //     if(x < 741 && x>640 && y<721 && y > 620){
    //         inside  = true;
    //     }
    // }
    // else 
    // {
    //     if ((x < 1281 && x>1180 && y<461 && y > 360)){
    //         inside = true;
    //     }
    // }
        

    // return inside;
}

window.switchPositionFunc = function (x){
 switchPosition = x;

}

function mousemovefunc(e) {
    armCursor.style.top = e.clientY -15 + "px";
    armCursor.style.left = e.clientX -15 + "px";

    g_xcursor = e.clientX;
    g_ycursor = e.clientY;

    if(practiceOn){

        var button2 = document.getElementById("button2");
        var button3 = document.getElementById("button3");
        var insidebutton2 = button2HoverCheck(e.clientX, e.clientY);
        var insidebutton3 = button3HoverCheck(e.clientX, e.clientY);

        var checkInsideStatus = insidebutton2 || insidebutton3;

        if (insidebutton2 && button2.overState === "out")
        {
            simulate(button2, "mouseover");
        }

        if (!insidebutton2 && button2.overState === "over")
        {
            simulate(button2, "mouseout");
        }


        if (insidebutton3 && button3.overState === "out")
        {
            simulate(button3, "mouseover");
        }

        if (!insidebutton3 && button3.overState === "over")
        {
            simulate(button3, "mouseout");
        }
        
    }
    
    if(!calibrationOn && !practiceOn)
    {
        

       // console.log (e.clientX, " ", e.clientY);
        var insidebutton0 = button0HoverCheck(e.clientX, e.clientY);
        var insidebutton1 = button1HoverCheck(e.clientX, e.clientY);

        var checkInsideStatus = insidebutton0 || insidebutton1;

        addHistory(e.clientX, e.clientY, -1, -1, checkInsideStatus, 0);

        if (insidebutton0 && button0.overState === "out")
        {
            simulate(document.getElementById("button0"), "mouseover");
        }

        if (!insidebutton0 && button0.overState === "over")
        {
            simulate(document.getElementById("button0"), "mouseout");
        }


        if (insidebutton1 && MyButton1.overState === "out")
        {
            simulate(MyButton1, "mouseover");
        }

        if (!insidebutton1 && MyButton1.overState === "over")
        {
            simulate(MyButton1, "mouseout");
        }
    }
/*
    if(ret != undefined)
    {
        ret = "mouse" + ret;
        simulate(MyButton1, ret);   
    }*/
    
  //  if (insidebutton1 && Button1.overState === "out")
  //  {
  //      simulate(document.getElementById("button1"), "mouseover");
  //  }

  //  if (!insidebutton1 && Button1.overState === "over")
  //  {
  //      simulate(document.getElementById("button1"), "mouseout");
  //  }

   // if (insidebutton0 && Button1.overState === "out")
  //  {
   //     simulate(document.getElementById("button1"), "mouseout");
   // }

//test simulator
  /*  if(e.clientX >= 800 && e.clientX < 1000)
    {
        if(button0.overState == "out") {
            simulate(document.getElementById("button0"), "mouseover");
            console.log("enter called" + e.clientX);
        }
        
    }
    if(e.clientX >= 1300 && e.clientX < 1920)
    {
        if(button0.overState == "over") {
            simulate(document.getElementById("button0"), "mouseout");
            console.log("leave called" + e.clientX);
        }
        
    }*/

//test over
    /*var hoverElement = document.elementFromPoint(e.clientY, e.clientX);

    if(hoverElement !== undefined)
    {
        console.log (hoverElement.id);
    }*/
    //hoverElement.click();
}



// function calculateMinimum(){

//     min_azimuth = (azimuth_ll < azimuth_ul)?azimuth_ul:azimuth_ll;
//     max_azimuth = (azimuth_lr < azimuth_ur)?azimuth_lr:azimuth_ur;
//     min_inclination = (inclination_ll < inclination_lr)?inclination_lr:inclination_ll;
//     max_inclination = (inclination_ul < inclination_ur)?inclination_ul:inclination_ur;

//     localStorage.setItem("min_azimuth", min_azimuth.toFixed(2));
//     localStorage.setItem("max_azimuth", max_azimuth.toFixed(2));
//     localStorage.setItem("min_inclination", min_inclination.toFixed(2));
//     localStorage.setItem("max_inclination", max_inclination.toFixed(2));
    
//     localStorage.setItem("ul_azimuth", azimuth_ul.toFixed(2));
//     localStorage.setItem("ur_azimuth", azimuth_ur.toFixed(2));
//     localStorage.setItem("ul_inclination", inclination_ul.toFixed(2));
//     localStorage.setItem("ur_inclination", inclination_ur.toFixed(2));
//     localStorage.setItem("ll_azimuth", azimuth_ll.toFixed(2));
//     localStorage.setItem("lr_azimuth", azimuth_lr.toFixed(2));
//     localStorage.setItem("ll_inclination", inclination_ll.toFixed(2));
//     localStorage.setItem("lr_inclination", inclination_lr.toFixed(2));

//     document.getElementById("minmax1").textContent = "Azimuthal_min = " + min_azimuth.toFixed(2) + "Azimuthal_max = " + max_azimuth.toFixed(2) + "Inclination_min = " + min_inclination.toFixed(2) + "Inclination_max = " + max_inclination.toFixed(2);
//     document.getElementById("azmin").innerHTML = "Az_min = " + min_azimuth.toFixed(2) + "<br>" +"Az_max = " + max_azimuth.toFixed(2) + "<br>" + "Inc_min = " + min_inclination.toFixed(2) + "<br>" +"Inc_max = " + max_inclination.toFixed(2);
// }

// function lrCalibButtonHandler(e){

//     countCalibButtonsPressed++;
//     azimuth_lr = g_azimuth;
//     inclination_lr = g_inclination;    

//     document.getElementById("lrcalibvalues").innerHTML = "Az = " + azimuth_lr + " Inc = " + inclination_lr;

//     if(countCalibButtonsPressed ==4)
//     {
//         calculateMinimum();
//     }
    
// }

function incMaxCalibButtonHandler(e){

    var inc_limit = 80;
    countIncMaxPressed++;
    if(g_inclination > inc_limit){
      inclination_max = (inclination_max*(countIncMaxPressed -1) + inc_limit)/countIncMaxPressed;    
    }
    else    {
      inclination_max = (inclination_max*(countIncMaxPressed -1) + g_inclination)/countIncMaxPressed;      
    }

    document.getElementById("incMaxcalibvalues").innerHTML = "IncMaxAvg = " + inclination_max; 

    localStorage.setItem("max_inclination", inclination_max.toFixed(2));
}

function incMinCalibButtonHandler(e){

    var inc_limit = -80;
    countIncMinPressed++;

    if(g_inclination < inc_limit){
      inclination_min = (inclination_min*(countIncMinPressed -1) + inc_limit)/countIncMinPressed;    
    }
    else     {
      inclination_min = (inclination_min*(countIncMinPressed -1) + g_inclination)/countIncMinPressed;      
    }
  

    document.getElementById("incMincalibvalues").innerHTML = "IncMinAvg = " + inclination_min; 

     localStorage.setItem("min_inclination", inclination_min.toFixed(2));
}

function azMaxCalibButtonHandler(e){
    
    var az_limit = 80;
    countAzMaxPressed++;

    if(g_azimuth > az_limit){
      azimuth_max = (azimuth_max*(countAzMaxPressed -1) + az_limit)/countAzMaxPressed;    
    }
    else     {
      azimuth_max = (azimuth_max*(countAzMaxPressed -1) + g_azimuth)/countAzMaxPressed;      
    }
  
    document.getElementById("azMaxcalibvalues").innerHTML = "AzMaxAvg = " + azimuth_max; 

        
    localStorage.setItem("max_azimuth", azimuth_max.toFixed(2));

}

function azMinCalibButtonHandler(e){
    
    var az_limit = -80;
    countAzMinPressed++;

    if(g_azimuth < az_limit){
      azimuth_min = (azimuth_min*(countAzMinPressed -1) + az_limit)/countAzMinPressed;    
    }
    else     {
      azimuth_min = (azimuth_min*(countAzMinPressed -1)  + g_azimuth)/countAzMinPressed;      
    }
  
    document.getElementById("azMincalibvalues").innerHTML = "AzMinAvg = " + azimuth_min; 

    localStorage.setItem("min_azimuth", azimuth_min.toFixed(2));
}


function incMaxResetHandler(e){

    countIncMaxPressed =0;
    
    inclination_max = 0;      

    document.getElementById("incMaxcalibvalues").innerHTML = "IncMaxAvg = " + inclination_max; 
}

function incMinResetHandler(e){

    countIncMinPressed= 0;
    inclination_min = 0;        

    document.getElementById("incMincalibvalues").innerHTML = "IncMinAvg = " + inclination_min; 
}

function azMaxResetHandler(e){
    
    countAzMaxPressed = 0;
    azimuth_max = 0;
  
    document.getElementById("azMaxcalibvalues").innerHTML = "AzMaxAvg = " + azimuth_max; 
}

function azMinResetHandler(e){
    
    countAzMinPressed = 0;
    azimuth_min = 0;    
    
    document.getElementById("azMincalibvalues").innerHTML = "AzMinAvg = " + azimuth_min; 
}

// function llCalibButtonHandler(e){

//     countCalibButtonsPressed++;
//     azimuth_ll = g_azimuth;
//     inclination_ll = g_inclination;    

//     document.getElementById("llcalibvalues").innerHTML = "Az = " + azimuth_ll + " Inc = " + inclination_ll;

//     if(countCalibButtonsPressed ==4)
//     {
//         calculateMinimum();
//     }
    
// }

// function urCalibButtonHandler(e){

//     countCalibButtonsPressed++;

//     azimuth_ur = g_azimuth;
//     inclination_ur = g_inclination;

//     document.getElementById("urcalibvalues").innerHTML = "Az = " + azimuth_ur + " Inc = " + inclination_ur;

//     if(countCalibButtonsPressed ==4)
//     {
//         calculateMinimum();
//     }
        
// }

// function ulCalibButtonHandler(e){

//     countCalibButtonsPressed++;
//     azimuth_ul = g_azimuth;
//     inclination_ul = g_inclination;    

//     document.getElementById("ulcalibvalues").innerHTML = "Az = " + azimuth_ul + " Inc = " + inclination_ul;

//     if(countCalibButtonsPressed ==4)
//     {
//         calculateMinimum();
//     }

// }

function startStudyButtonHandler(e) {

    var practiceElements = document.querySelectorAll(".practicebutton");
        
    var i;

    for (i = 0; i < practiceElements.length; i++) {
            practiceElements[i].style.display = "none";
    }
    practiceOn = false;
    
    var lev = localStorage.getItem("level");
    document.getElementById(lev).appendChild(MyButton1);

    document.getElementById("button0").style.display = "block";   
    // var practiceCheckv = localStorage.getItem("practiceCheck");
    localStorage.setItem("practiceCheck", 2);
}

function startExpButtonHandler(e) {
    // AZIMUTH_MIN = min_azimuth;
    // AZIMUTH_MAX = max_azimuth;
    // INCLINATION_MIN = min_inclination;
    // INCLINATION_MAX = max_inclination;


  

    AZIMUTH_MIN = azimuth_min;
    AZIMUTH_MAX = azimuth_max;
    INCLINATION_MIN = inclination_min;
    INCLINATION_MAX = inclination_max;

    var practiceElements = document.querySelectorAll(".practicebutton");
    var experimentElements = document.querySelectorAll(".calibrationoff");
    var calibrationElements = document.querySelectorAll(".calibrationon");

    var i;

    for (i = 0; i < calibrationElements.length; i++) {
        calibrationElements[i].style.display = "none";
    }

    for (i = 0; i < experimentElements.length; i++) {
        experimentElements[i].style.display = "block";
    }

    if(practiceCheckvv == 1) {
        for (i = 0; i < practiceElements.length; i++) {
            practiceElements[i].style.display = "block";
        }
        practiceOn = true;
    }
    else if(practiceCheckvv ==2) {


        //document.getElementById("button1").style.display = "block";
        //document.getElementById(zoneNumber.toString()).appendChild(Button1);
        var lev = localStorage.getItem("level");
        document.getElementById(lev).appendChild(MyButton1);

        document.getElementById("button0").style.display = "block";

    }
    else {
        console.log("Error");
    }
    
    calibrationOn = false;


    // azimuth_ul = localStorage.getItem("ul_azimuth");
    // azimuth_ur = localStorage.getItem("ur_azimuth");
    // inclination_ul = localStorage.getItem("ul_inclination");
    // inclination_ur = localStorage.getItem("ur_inclination");
    // azimuth_ll = localStorage.getItem("ll_azimuth");
    // azimuth_lr = localStorage.getItem("lr_azimuth");
    // inclination_ll = localStorage.getItem("ll_inclination");
    // inclination_lr = localStorage.getItem("lr_inclination");

    azimuth_max = localStorage.getItem("max_azimuth");
    azimuth_min = localStorage.getItem("min_azimuth");
    inclination_max = localStorage.getItem("max_inclination");
    inclination_min = localStorage.getItem("min_inclination");

    document.getElementById("minmax1").textContent = "Azimuthal_min = " + azimuth_min + "Azimuthal_max = " + azimuth_max + "Inclination_min = " + inclination_min + "Inclination_max = " + inclination_max;
    document.getElementById("azmin").innerHTML = "Az_min = " + azimuth_min + "<br>" +"Az_max = " + azimuth_max + "<br>" + "Inc_min = " + inclination_min + "<br>" +"Inc_max = " + inclination_max;
//}

    //document.getElementById("minmax1").textContent = "Azimuthal_min = " + azimuth_min.toFixed(2) + "Azimuthal_max = " + azimuth_max.toFixed(2) + "Inclination_min = " + inclination_min.toFixed(2) + "Inclination_max = " + inclination_max.toFixed(2);
    //document.getElementById("azmin").innerHTML = "Az_min = " + azimuth_min.toFixed(2) + "<br>" +"Az_max = " + azimuth_max.toFixed(2) + "<br>" + "Inc_min = " + inclination_min.toFixed(2) + "<br>" +"Inc_max = " + inclination_max.toFixed(2);


    //transferCalibrationValues(azimuth_lr, azimuth_ll, azimuth_ur, azimuth_ul, inclination_lr, inclination_ll, inclination_ur, inclination_ul, min_azimuth, min_inclination, max_azimuth, max_inclination);
    transferCalibrationValues(azimuth_max, azimuth_min, inclination_max, inclination_min);
}

function mouseclickfunc(e){
    if(e.clientX ==0)
    {
        return;
    }
    if(!calibrationOn){
        simulate(armCursor, "click");
    }

    //var hover1 = button0HoverCheck(g_xcursor, g_ycursor);
    //var hover2 = button1HoverCheck(g_xcursor, g_ycursor);

    //return false;
}


connectButton.onclick = init;
//setInterval(evaluateDwell, 300);
window.addEventListener("mousemove", mousemovefunc) ;
window.addEventListener("click", mouseclickfunc) ;

// document.getElementById("lrCalibButton").addEventListener("click", lrCalibButtonHandler);
// document.getElementById("llCalibButton").addEventListener("click", llCalibButtonHandler);
// document.getElementById("urCalibButton").addEventListener("click", urCalibButtonHandler);
// document.getElementById("ulCalibButton").addEventListener("click", ulCalibButtonHandler);

document.getElementById("incMaxCalibButton").addEventListener("click", incMaxCalibButtonHandler);
document.getElementById("incMinCalibButton").addEventListener("click", incMinCalibButtonHandler);
document.getElementById("azMaxCalibButton").addEventListener("click", azMaxCalibButtonHandler);
document.getElementById("azMinCalibButton").addEventListener("click", azMinCalibButtonHandler);

document.getElementById("incMaxResetCalibButton").addEventListener("click", incMaxResetHandler);
document.getElementById("incMinResetCalibButton").addEventListener("click", incMinResetHandler);
document.getElementById("azMaxResetCalibButton").addEventListener("click", azMaxResetHandler);
document.getElementById("azMinResetCalibButton").addEventListener("click", azMinResetHandler);

document.getElementById("startExperiment").addEventListener("click", startExpButtonHandler);
document.getElementById("startStudy").addEventListener("click", startStudyButtonHandler);
};

window.addEventListener("DOMContentLoaded", docLoadedFuncCursor);