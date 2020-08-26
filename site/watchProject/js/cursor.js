function docLoadedFuncCursor()
{

var WIDTH  = window.innerWidth,
HEIGHT = window.innerHeight;

var AZIMUTH_MAX = 0,
AZIMUTH_MIN = -50,
INCLINATION_MAX = 70,
INCLINATION_MIN = 0;

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
armCursor.addEventListener("click",cursorClicked);
body.appendChild(armCursor);

var bullsEye = document.createElement("div");
bullsEye.className = "bulls-eye";
armCursor.appendChild(bullsEye);

var armAngleCharacteristic = null;

var lastReadValueResponse = 0;

var cursorHistory = [];
var isDwelling = false;

function cursorClicked(e){
    var insidebutton0 = button0HoverCheck(e.clientX, e.clientY);
    var insidebutton1 = button1HoverCheck(e.clientX, e.clientY);

    if (insidebutton0 && button0.overState === "over")
    {
        simulate(document.getElementById("button0"), "click");
    }

    if (insidebutton1 && MyButton1.overState === "over")
    {
        simulate(MyButton1, "click");
    }
}

function init(){
    webSocket = new WebSocket("ws://192.168.0.51:4000/arm");
    webSocket.onmessage = handleMessage;
    connectButton.remove();
}


function toDegrees(x){
return 360 * x/(2*Math.PI);
}

function handleMessage(evt) {
    let dataString = evt.data;
    let values = dataString.split('_');

    let azimuth = toDegrees(parseFloat(values[0]));
    let inclination = toDegrees(parseFloat(values[1]));

    // var azimuth     = toDegrees(data.getFloat32(0));
    // var inclination = toDegrees(data.getFloat32(4));

    // console.log(dataString + "\t" + azimuth + "\t" + inclination);

    let x = WIDTH * (azimuth - AZIMUTH_MIN) / (AZIMUTH_MAX - AZIMUTH_MIN);
    let y = HEIGHT * (inclination - INCLINATION_MIN) / (INCLINATION_MAX - INCLINATION_MIN);
    y = HEIGHT - y;

    armCursor.style.top = y + "px";
    armCursor.style.left = x + "px";
    addHistory(x, y);
}


function addHistory(x, y){
   // if (cursorHistory.length == 80){
     if (cursorHistory.length == 80){
        cursorHistory.shift();
    }
    cursorHistory.push([x, y]);
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

function sd(array){
    const n = array.length;
    const mean = array.reduce((a,b) => a+b)/n;
    return Math.sqrt(array.map(x => Math.pow(x-mean,2)).reduce((a,b) => a+b)/n);
}

function evaluateDwell(){
   // if (cursorHistory.length < 80) return;
    if (cursorHistory.length < 80) return;

    let sdx = sd(cursorHistory.map(p => p[0]));
    let sdy = sd(cursorHistory.map(p => p[1]));

    //console.log(sdx, " ", sdy);

    if (sdx < 5 && sdy < 5 && !isDwelling)
    {

        animateDwell();
    }

    if ((sdx > 5 || sdy > 5) && isDwelling)
        interruptDwell();

}

function button0HoverCheck(x ,y) {

    var totalWidth = (armCursor.offsetWidth  + button0.offsetWidth )/2;
    var distance = Math.sqrt(Math.pow(x-950 ,2) + Math.pow(y-542,2));
    var inside = false;
    if(distance*100 < totalWidth*100)
        inside =true;
   // console.log("totalWidth =", totalWidth, " distance =", distance, " inside =", inside);
  
    return inside;
}


function button1HoverCheck(x , y) {
 //   var but1 = document.getElementById("button1");
    var totalWidth = (armCursor.offsetWidth  + MyButton1.offsetWidth )/2;
    var distance = Math.sqrt(Math.pow(x-MyButton1.offsetWidth/2-MyButton1.offsetLeft -MyButton1.parentNode.offsetLeft,2) + Math.pow(y-MyButton1.offsetWidth/2-MyButton1.offsetTop -MyButton1.parentNode.offsetTop,2));;
    var inside = false;
    if(distance*100 < totalWidth*100)
        inside =true;
    console.log("totalWidth =", totalWidth, " distance =", distance, " inside =", inside);
  
    return inside;

}

function mousemovefunc(e) {
    armCursor.style.top = e.clientY -15 + "px";
    armCursor.style.left = e.clientX -15 + "px";
    addHistory(e.clientX, e.clientY);

    console.log (e.clientX, " ", e.clientY);
    var insidebutton0 = button0HoverCheck(e.clientX, e.clientY);
    var insidebutton1 = button1HoverCheck(e.clientX, e.clientY);

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


connectButton.onclick = init;
setInterval(evaluateDwell, 300);
window.addEventListener("mousemove", mousemovefunc) ;
};

window.addEventListener("DOMContentLoaded", docLoadedFuncCursor);