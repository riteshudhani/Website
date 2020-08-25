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
body.appendChild(armCursor);

var bullsEye = document.createElement("div");
bullsEye.className = "bulls-eye";
armCursor.appendChild(bullsEye);

var armAngleCharacteristic = null;

var lastReadValueResponse = 0;

var cursorHistory = [];
var isDwelling = false;

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
    if (cursorHistory.length == 80){
        cursorHistory.shift();
    }
    cursorHistory.push([x, y]);
}

var resetBullsEye = function(selection){
    selection.style('width', '0px')
        .style('height', '0px')
        .style('left', '30px')
        .style('top', '30px');
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
        .style('width', '60px')
        .style('height', '60px')
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
    if (cursorHistory.length < 80) return;

    let sdx = sd(cursorHistory.map(p => p[0]));
    let sdy = sd(cursorHistory.map(p => p[1]));

    if (sdx < 5 && sdy < 5 && !isDwelling)
        animateDwell();

    if ((sdx > 5 || sdy > 5) && isDwelling)
        interruptDwell();

}

function mousemovefunc(e) {
    armCursor.style.top = e.clientY -15 + "px";
    armCursor.style.left = e.clientX -15 + "px";
}


connectButton.onclick = init;
setInterval(evaluateDwell, 300);
window.addEventListener("mousemove", mousemovefunc) ;
};

window.addEventListener("DOMContentLoaded", docLoadedFuncCursor);