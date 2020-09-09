//var button0Size = [70, 60, 50, 40 ];
//var button1Size = [70, 90, 110, 105, 100, 65, 50, 60, 60, 80, 100, 95, 90, 55, 40, 50, 50, 70, 90, 85, 80, 45, 30, 40, 50, 70, 90, 85, 80, 45, 30, 40];
//var button1Size = [240, 90, 110, 105, 100, 65, 50, 60, 60, 80, 100, 95, 90, 55, 40, 50, 50, 70, 90, 85, 80, 45, 30, 40, 50, 70, 90, 85, 80, 45, 30, 40];
//var diagonalDisance = 734;
//var verticalDistance = 360;



function docLoadedFunc()
{

//var g_azimuth_lr, g_azimuth_ll, g_azimuth_ur, g_azimuth_ul, g_inclination_lr, g_inclination_ll, g_inclination_ur, g_inclination_ul, g_min_azimuth, g_min_inclination, g_max_azimuth, g_max_inclination;
var g_min_azimuth, g_max_azimuth, g_min_inclination, g_max_inclination;
//Initial condition start

//position of circle shaped button from top left
var offsets = [256, 144];  //16:9 increments. default 320,180
//var offsets = [256, 147];  //16:9 increments. default 534:942

//Calculate distances on a screen of resolution 1920x1080
var distances = [];
//distances[0] = Math.sqrt(Math.pow(960 - offsets[0], 2) + Math.pow(540 - offsets[1], 2));
//distances[1] = 540 - offsets[1];
//distances[2] = 960 - offsets[0];

//distances[0] = Math.sqrt(Math.pow(950 - offsets[0], 2) + Math.pow(542 - offsets[1], 2));
//distances[1] = 542 - offsets[1];
//distances[2] = 950 - offsets[0];

distances[0] = Math.sqrt(Math.pow(960 - offsets[0], 2) + Math.pow(540 - offsets[1], 2));
distances[1] = 540 - offsets[1];
distances[2] = 960 - offsets[0];


var difficultyLevel=2;
var zoneNumber = 1;
var zonePrev;

var IDForFileName = difficultyLevel;

var indexofdifvv = localStorage.getItem("indexofdif");
var participantIDvv = localStorage.getItem("participantID");
var posturevv = localStorage.getItem("posture");
var levelvv = localStorage.getItem("level");
var practiceCheckvv = localStorage.getItem("practiceCheck");
window.practiceCheckvv = practiceCheckvv;

if(indexofdifvv != undefined && indexofdifvv != null) {
	difficultyLevel = indexofdifvv;
	IDForFileName = difficultyLevel;
}

if(levelvv != undefined && levelvv != null) {
	zoneNumber = levelvv;
}

console.log("Values received in calibration page", "ParticipantID = ", participantIDvv, "PostureID = ", posturevv, "ID value = ", indexofdifvv, "Zone value =", levelvv, "PracticeCheck =", practiceCheckvv);

var firstButtonSize =0;
var x_offset =0, y_offset =0;

var targetX = 0, targetY=0;
var buttonSize = 0;




firstSizeCalculator();

function firstSizeCalculator() {

			switch (Number(zoneNumber)) {
				case 1:
				    firstButtonSize = distances[0] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = offsets[0] - firstButtonSize/2 + "px";
				    y_offset = offsets[1] - firstButtonSize/2 + "px";
				    
				    targetX= offsets[0];
					targetY= offsets[1];
					break;

				case 2:
				    firstButtonSize = distances[1] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = (1920/6) - firstButtonSize/2 + "px";
				    //x_offset = (1884/6) - buttonSize/2 + "px";
				    y_offset = offsets[1] - firstButtonSize/2 + "px";

				    targetX= 940;
					targetY= offsets[1];
					break;

				case 3:
				    firstButtonSize = distances[0] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = (1920/3) - offsets[0] - firstButtonSize/2 + "px";
				    //x_offset = (1884/3) - offsets[0] - buttonSize/2 + "px";
				    y_offset = offsets[1] - firstButtonSize/2 + "px";

				    targetX= 1920 - offsets[0];
					targetY= offsets[1];
					break;				
				case 4:
				    firstButtonSize = distances[2] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = (1920/3) - offsets[0] - firstButtonSize/2 + "px";
				    //x_offset = (1884/3) - offsets[0] - buttonSize/2 + "px";
				    y_offset = (1080/6) - firstButtonSize/2 + "px";
				    //y_offset = (1068/6) - buttonSize/2 + "px";

				    targetX= 1920 - offsets[0];
					targetY= 540;
					break;
				case 5:
				    firstButtonSize = distances[0] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = (1920/3) - offsets[0] - firstButtonSize/2 + "px";
				    //x_offset = (1884/3) - offsets[0] - buttonSize/2 + "px";
				    y_offset = (1080/3) - offsets[1] - firstButtonSize/2 + "px";
				    //y_offset = (1068/3) - offsets[1] - buttonSize/2 + "px";

				    targetX= 1920 - offsets[0];
					targetY= 1080 - offsets[1];
					break;
				case 6:
				    firstButtonSize = distances[1] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = (1920/6) - firstButtonSize/2 + "px";
				    y_offset = (1080/3) - offsets[1] - firstButtonSize/2 + "px";

				    //x_offset = (1884/6) - buttonSize/2 + "px";
				    //y_offset = (1068/3) - offsets[1] - buttonSize/2 + "px";

				    targetX= 960;
					targetY= 1080 - offsets[1];
					break;
				case 7:
				    firstButtonSize = distances[0] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = offsets[0] - firstButtonSize/2 + "px";
				    y_offset = (1080/3) - offsets[1] - firstButtonSize/2 + "px";
				    //y_offset = (1068/3) - offsets[1] - buttonSize/2 + "px";

				    targetX= offset[0];
					targetY= 1080 - offsets[1];
					break;
				case 8:
				    firstButtonSize = distances[2] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = offsets[0] - firstButtonSize/2 + "px";
				    y_offset = (1080/6) - firstButtonSize/2 + "px";
				    //y_offset = (1068/6) - buttonSize/2 + "px";
				    
				    targetX= offsets[0];
					targetY= 540;
					break;
				default:
					console.log("Error case");
				 break;

			};
		}


document.getElementById("difficulty").innerHTML = "ID = " + difficultyLevel;


//Calculate button size for initialization
//var firstButtonSize = distances[0] / (Math.pow(2, difficultyLevel) -1);
console.log(firstButtonSize);
buttonSize = firstButtonSize;

var Button1 = document.createElement('div');
Button1.class ="button" + "calibrationoff";
//Button1.class = "calibrationoff";
Button1.ID ="button1";
Button1.style.width = firstButtonSize + "px";
Button1.style.height = firstButtonSize + "px";
Button1.style.borderRadius =firstButtonSize + "px";
Button1.style.border = "0px solid black";
Button1.style.backgroundColor = "white";
Button1.style.padding = "0px";
Button1.style.opacity = "0.1";
//Button1.style.display = "none";
//Button1.style.margin = "0px";

//Button1.style.marginLeft = "auto";
//Button1.style.marginRight = "auto";
//Button1.style.marginTop = centerPoint1 +"px";
Button1.style.outline = "none";
Button1.style.position = "absolute";
//Button1.style.left = offsets[0] - firstButtonSize/2 + "px";
//Button1.style.top = offsets[1]- firstButtonSize/2 + "px";

Button1.style.left = x_offset;
Button1.style.top = y_offset;


//document.getElementById(zoneNumber.toString()).appendChild(Button1);


window.MyButton1 = Button1;

var button0 = document.getElementById("button0");
button0.style.width = firstButtonSize + "px";
button0.style.height = firstButtonSize + "px";
button0.style.marginTop = (356-firstButtonSize)/2 + "px";
button0.style.border = "0px solid black";
button0.style.padding = "0px";

button0.overState = "out";
Button1.overState = "out";
//Initial condition over

var button2 = document.getElementById("button2");
var button3 = document.getElementById("button3");
button2.overState = "out";
button3.overState = "out";

button2ClickCount = 0;
button3ClickCount = 0;

//var buttonSize = (Math.pow(2,difficultyLevel) -1);

var clickCount = 0;
var clickCountHomeTar =0;
var recordingEvents = false;
var startRecordingTime = 0;
// window.recordingEvents = recordingEvents;
// window.startRecordingTime = startRecordingTime;
// window.clickCounter = clickCount;
// window.clickCountHomeTar =clickCountHomeTar;

var clickCountLocal =0;
var clickCountHomeTarLocal =0;
var recordingEventsLocal = false;

var buttonTimeout = 0;
var objectNameFocussed = null;


function clickFunc(){
	
	//if()
	simulate(objectNameFocussed, "click");
}


window.addHistory = function (x, y, az, inclination, insidestatus, clickflag){
   // if (cursorHistory.length == 80){
    //  if (cursorHistory.length == 5){
    //     cursorHistory.shift();
    // }
    var clickOccuredTrueTarget = false;
    var clickOccuredHomeTarget = false;

    if(recordingEvents && !recordingEventsLocal)
    {
        recordingEventsLocal = recordingEvents;
    }
    
     if(clickCountLocal != clickCount)
     {
         clickOccuredTrueTarget = true;
         clickCountLocal++;
         if(clickCountLocal != clickCount)
         {
             console.log("Error: click count not same ",clickCountLocal, clickCount);
             return;
         }
        // console.log(cursorHistory);
     }



     if(clickCountHomeTarLocal != clickCountHomeTar)
     {
         clickOccuredHomeTarget = true;
         clickCountHomeTarLocal++;
         if(clickCountHomeTarLocal != clickCountHomeTar)
         {
             console.log("Error: click count not same");
             return;
         }
         //console.log(cursorHistory);
     }

    if(recordingEvents || recordingEvents!=recordingEventsLocal)
    {
    	var date = new Date();
        var currentTime = date.getTime();
        //console.log("currentTime ", currentTime);
        //var cur = Date.parse(currentTime);
      //  var stime = Date.parse(startRecordingTime)
        currentTime = currentTime - startRecordingTime;
        //console.log("currentTime ", currentTime);
        if(!clickOccuredHomeTarget && !clickOccuredTrueTarget)
        {
        	if(clickflag ==1)
        	{
        		//cursorHistory.push([currentTime, x, y, "BlankClick", zoneNumber, difficultyLevel, posturevv, participantIDvv, targetX, targetY, 960, 540, buttonSize, az, inclination, insidestatus, g_min_azimuth, g_min_inclination, g_max_azimuth, g_max_inclination, g_azimuth_lr, g_inclination_lr, g_azimuth_ll, g_inclination_ll, g_azimuth_ur, g_inclination_ur, g_azimuth_ul, g_inclination_ul]);	
        		cursorHistory.push([currentTime, x, y, "BlankClick", zoneNumber, difficultyLevel, posturevv, participantIDvv, targetX, targetY, 960, 540, buttonSize, az, inclination, insidestatus, g_min_azimuth, g_min_inclination, g_max_azimuth, g_max_inclination]);	
        	}
        	else{
            //cursorHistory.push([currentTime, x, y, "Move", localStorage.getItem("level"), localStorage.getItem("indexofdif"), localStorage.getItem("posture"), localStorage.getItem("participantID"), zoneCoordinateX, zoneCoordinateY, 960, 540, buttonSize, az, inclination ]);
            	//cursorHistory.push([currentTime, x, y, "Move", zoneNumber, difficultyLevel, posturevv, participantIDvv, targetX, targetY, 960, 540, buttonSize, az, inclination, insidestatus , g_min_azimuth, g_min_inclination, g_max_azimuth, g_max_inclination, g_azimuth_lr, g_inclination_lr, g_azimuth_ll, g_inclination_ll, g_azimuth_ur, g_inclination_ur, g_azimuth_ul, g_inclination_ul]);
            	cursorHistory.push([currentTime, x, y, "Move", zoneNumber, difficultyLevel, posturevv, participantIDvv, targetX, targetY, 960, 540, buttonSize, az, inclination, insidestatus , g_min_azimuth, g_min_inclination, g_max_azimuth, g_max_inclination]);
            }
        }
        else if(clickOccuredHomeTarget)
        {
            //cursorHistory.push([currentTime, x, y, "HomeClick" , zoneNumber, difficultyLevel, posturevv , participantIDvv, targetX, targetY, 960, 540, buttonSize, az, inclination, insidestatus, g_min_azimuth, g_min_inclination, g_max_azimuth, g_max_inclination, g_azimuth_lr, g_inclination_lr, g_azimuth_ll, g_inclination_ll, g_azimuth_ur, g_inclination_ur, g_azimuth_ul, g_inclination_ul]);
            cursorHistory.push([currentTime, x, y, "HomeClick" , zoneNumber, difficultyLevel, posturevv , participantIDvv, targetX, targetY, 960, 540, buttonSize, az, inclination, insidestatus, g_min_azimuth, g_min_inclination, g_max_azimuth, g_max_inclination]);
        }
        else if(clickOccuredTrueTarget)
        {
            cursorHistory.push([currentTime, x, y, "TrueClick" , zoneNumber, difficultyLevel, posturevv, participantIDvv, targetX, targetY, 960, 540,  buttonSize, az, inclination, insidestatus, g_min_azimuth, g_min_inclination, g_max_azimuth, g_max_inclination]);  
            //cursorHistory.push([currentTime, x, y, "TrueClick" , zoneNumber, difficultyLevel, posturevv, participantIDvv, targetX, targetY, 960, 540,  buttonSize, az, inclination, insidestatus, g_min_azimuth, g_min_inclination, g_max_azimuth, g_max_inclination, g_azimuth_lr, g_inclination_lr, g_azimuth_ll, g_inclination_ll, g_azimuth_ur, g_inclination_ur, g_azimuth_ul, g_inclination_ul]);  
        }
        else
        {
        	console.log("Error");
        }

        if(recordingEvents!=recordingEventsLocal)
        {
            recordingEventsLocal = false;
            //dump();
            var text = "";

            function addLineEndFunction(value)
			{
				text += value + "\n";
			}

			
            cursorHistory.forEach(addLineEndFunction);
            var filename = "ParticipantID_" + participantIDvv + "_PostureID_"+ posturevv + "_ID_"+ difficultyLevel + "_zone_" + zoneNumber + ".csv";

            IDForFileName = difficultyLevel;

            //var filename = "readme.txt";
			
			var blob = new Blob([text], {type:'text/plain'});
			var link = document.createElement("a");
			link.download = filename;
			//link.innerHTML = "Download File";
			link.href = window.URL.createObjectURL(blob);
			document.body.appendChild(link);
			//link.style.float = "right";
			link.click();


			switchToNextZone();

			cursorHistory = [];
        }
    }
    
}




function changeColorEntera(event){
	Button1.style.backgroundColor = "yellow";
	//console.log(Button1.style.backgroundColor);
	//Button1.remove();
	//Button1.remove
	Button1.title = "x_offset y_offset";

	Button1.overState = "over";

	objectNameFocussed = Button1;

	//buttonTimeout = setTimeout(clickFunc, 800);

};

function changeColorLeavea(event){
	Button1.style.backgroundColor = "green";
	//console.log(Button1.style.backgroundColor);
	//document.getElementById("2").appendChild(Button1);

	Button1.overState = "out";
	//clearTimeout(buttonTimeout);
	objectNameFocussed = null;
};

function switchToNextZone(){
	var x_offset =0, y_offset =0;

	if(( clickCount % 5 == 0))
	{
		document.getElementById(zoneNumber.toString()).removeChild(Button1);

		zonePrev = zoneNumber;
		zoneNumber++;

		if(zoneNumber == 9)
		{
			zoneNumber = 1;
			
			difficultyLevel++;

			if(difficultyLevel ==6)
			{
				alert("Study for the given posture is completed. Switch to the next posture. Thanks! ");
				clearInterval(fiveMinTimer);
				difficultyLevel = 2;
			}

			localStorage.setItem("indexofdif", difficultyLevel);

			console.log("ID set = ", difficultyLevel);

			document.getElementById("difficulty").innerHTML = "ID = " + difficultyLevel;
		}
		localStorage.setItem("level", zoneNumber);
		console.log("Zone set= ", zoneNumber);

		switch (zoneNumber) {
				case 1:
				    buttonSize = distances[0] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = offsets[0] - buttonSize/2 + "px";
				    y_offset = offsets[1] - buttonSize/2 + "px";

				    targetX= offsets[0];
					targetY= offsets[1];
					break;

				case 2:
				    buttonSize = distances[1] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = (1920/6) - buttonSize/2 + "px";
				    //x_offset = (1884/6) - buttonSize/2 + "px";
				    y_offset = offsets[1] - buttonSize/2 + "px";

				    targetX= 940;
					targetY= offsets[1];
					break;

				case 3:
				    buttonSize = distances[0] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = (1920/3) - offsets[0] - buttonSize/2 + "px";
				    //x_offset = (1884/3) - offsets[0] - buttonSize/2 + "px";
				    y_offset = offsets[1] - buttonSize/2 + "px";

				    targetX= 1920 - offsets[0];
					targetY= offsets[1];
					break;				
				case 4:
				    buttonSize = distances[2] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = (1920/3) - offsets[0] - buttonSize/2 + "px";
				    //x_offset = (1884/3) - offsets[0] - buttonSize/2 + "px";
				    y_offset = (1080/6) - buttonSize/2 + "px";
				    //y_offset = (1068/6) - buttonSize/2 + "px";

				    targetX= 1920 - offsets[0];
					targetY= 540;
					break;
				case 5:
				    buttonSize = distances[0] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = (1920/3) - offsets[0] - buttonSize/2 + "px";
				    //x_offset = (1884/3) - offsets[0] - buttonSize/2 + "px";
				    y_offset = (1080/3) - offsets[1] - buttonSize/2 + "px";
				    //y_offset = (1068/3) - offsets[1] - buttonSize/2 + "px";

				    targetX= 1920 - offsets[0];
					targetY= 540 - offsets[1];
					break;
				case 6:
				    buttonSize = distances[1] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = (1920/6) - buttonSize/2 + "px";
				    y_offset = (1080/3) - offsets[1] - buttonSize/2 + "px";

				    //x_offset = (1884/6) - buttonSize/2 + "px";
				    //y_offset = (1068/3) - offsets[1] - buttonSize/2 + "px";
				    targetX= 960;
					targetY= 540 - offsets[1];
					break;
				case 7:
				    buttonSize = distances[0] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = offsets[0] - buttonSize/2 + "px";
				    y_offset = (1080/3) - offsets[1] - buttonSize/2 + "px";
				    //y_offset = (1068/3) - offsets[1] - buttonSize/2 + "px";

				    targetX= offsets[0];
					targetY= 540 - offsets[1];
					break;
				case 8:
				    buttonSize = distances[2] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = offsets[0] - buttonSize/2 + "px";
				    y_offset = (1080/6) - buttonSize/2 + "px";
				    //y_offset = (1068/6) - buttonSize/2 + "px";

				    targetX= offsets[0];
					targetY= 540;
					break;
				default:
					console.log("Error case");
				 break;

			};
		//centerPoint0 = (300-button0Size[difficultyLevel-3])/2;
		//centerPoint1 = (300-button1Size[zoneNumber-1 + 8*(difficultyLevel-3)])/2;
		Button1.style.width = buttonSize + "px";
		Button1.style.height = buttonSize + "px";
		button0.style.width = buttonSize + "px";
		button0.style.height = buttonSize + "px";


		Button1.style.left = x_offset;
		Button1.style.top = y_offset;
		//button0.style.marginTop = (356-buttonSize)/2 + "px";
		button0.style.marginTop = (360-buttonSize)/2 + "px";

		//document.getElementById("button0").style.width = button0Size[difficultyLevel-3] + "px";
		//document.getElementById("button0").style.height = button0Size[difficultyLevel-3] +"px";

		//document.getElementById("button0").style.marginTop = centerPoint0 +"px";
        //Button1.style.marginTop = centerPoint1 +"px";
		document.getElementById(zoneNumber.toString()).appendChild(Button1);


	}

}

function changeColorClicka(event){

	

	clickCount++;
	//console.log(clickCount);
	if(( clickCount % 5 == 0)){
		recordingEvents = false;
	}

	button0.style.backgroundColor = "green";
	Button1.style.backgroundColor = "white";
	Button1.style.opacity = 0.1;
	document.getElementById("button0").style.opacity = 1.0;
//	console.log(Button1.style.backgroundColor);
	//Button1.removeEventListener("mouseenter",changeColorEntera);
	//Button1.removeEventListener("mouseleave",changeColorLeavea);
	Button1.removeEventListener("click",changeColorClicka);

	//for simulator
	Button1.removeEventListener("mouseover",changeColorEntera);
	Button1.removeEventListener("mouseout",changeColorLeavea);
	//for simulator ends

	//button0.addEventListener("mouseenter",changeColorEnter);
	//button0.addEventListener("mouseleave",changeColorLeave);
	button0.addEventListener("click",changeColorClick);

	//for simulator
	button0.addEventListener("mouseover",changeColorEnter);
	button0.addEventListener("mouseout",changeColorLeave);
	//for sumulator
	
}


// window.transferCalibrationValues = function (azimuth_lr, azimuth_ll, azimuth_ur, azimuth_ul, inclination_lr, inclination_ll, inclination_ur, inclination_ul, min_azimuth, min_inclination, max_azimuth, max_inclination) {


// 	g_azimuth_lr = azimuth_lr;
// 	g_azimuth_ll = azimuth_ll;
// 	g_azimuth_ur = azimuth_ur;
// 	g_azimuth_ul = azimuth_ul;
// 	g_inclination_lr = inclination_lr;
// 	g_inclination_ll = inclination_ll;
// 	g_inclination_ur = inclination_ur;
// 	g_inclination_ul = inclination_ul;
// 	g_min_azimuth = min_azimuth;
// 	g_min_inclination = min_inclination;
// 	g_max_azimuth = max_azimuth;
// 	g_max_inclination = max_inclination;
// }

window.transferCalibrationValues = function (azimuth_max, azimuth_min, inclination_max, inclination_min) {
	

	g_max_azimuth = azimuth_max;
	g_min_azimuth = azimuth_min;
	
	g_max_inclination = inclination_max;
	g_min_inclination = inclination_min;
	
}

function changeColorEnter(event){
	button0.style.backgroundColor = "yellow";
	//console.log(button0.style.backgroundColor);
	//Button1.remove();
	//Button1.remove

	objectNameFocussed = button0;

	//buttonTimeout = setTimeout(clickFunc, 800);
	button0.overState = "over";
};

function changeColorLeave(event){
	//document.getElementById("button0").style.backgroundColor = "white";
	button0.style.backgroundColor = "green";
	//console.log(document.getElementById("button0").style.backgroundColor);
//	console.log(button0.style.backgroundColor);
	//document.getElementById("2").appendChild(Button1);

	button0.overState = "out";
	objectNameFocussed = null;

	//clearTimeout(buttonTimeout);
};


function changeColorClick(event){
	//document.getElementById("button0").style.backgroundColor = "grey";
	//console.log(document.getElementById("button0").style.backgroundColor);

	button0.style.backgroundColor = "white";
	Button1.style.backgroundColor = "green";
	//button0.removeEventListener("mouseenter",changeColorEnter);
	//button0.removeEventListener("mouseleave",changeColorLeave);
	button0.removeEventListener("click",changeColorClick);
	
	//for simulator
	button0.removeEventListener("mouseover",changeColorEnter);
	button0.removeEventListener("mouseout",changeColorLeave);
	//for simulator ends

	Button1.style.opacity = 1.0;
	button0.style.opacity = 0.1;
	//Button1.addEventListener("mouseenter",changeColorEntera);
	//Button1.addEventListener("mouseleave",changeColorLeavea);
	Button1.addEventListener("click",changeColorClicka);

	//for simulator
	Button1.addEventListener("mouseover",changeColorEntera);
	Button1.addEventListener("mouseout",changeColorLeavea);
	//for simulator ends

	clickCountHomeTar++;

	if(clickCountHomeTar % 5 ==1)
	{
		recordingEvents = true;
		var date = new Date();
		startRecordingTime = date.getTime();
		console.log("startRecordingTime",startRecordingTime)

//     	cursorHistory.push(["currentTime", "x", "y", "Event", "Zone", "ID", "Posture ID", "Participant ID",  "TrueTargetX", "TrueTargetY", "HomeTargetX", "HomeTargetY","TargetDiameter", "Azimuth", "Elevation", "Ontarget", "min_azimuth", "min_inclination", "max_azimuth", "max_inclination", "azimuth_lr", "inclination_lr", "azimuth_ll", "inclination_ll", "azimuth_ur", "inclination_ur", "azimuth_ul", "inclination_ul"]);
     	cursorHistory.push(["currentTime", "x", "y", "Event", "Zone", "ID", "Posture ID", "Participant ID",  "TrueTargetX", "TrueTargetY", "HomeTargetX", "HomeTargetY","TargetDiameter", "Azimuth", "Elevation", "Ontarget", "min_azimuth", "min_inclination", "max_azimuth", "max_inclination"]);
    
	}


};

var switchPosition = false;
window.switchPosition = switchPosition;

function changeColorEnter3(event){
	button3.style.backgroundColor = "yellow";
	button3.overState = "over";
	objectNameFocussed = button3;
};

function changeColorLeave3(event){
	button3.style.backgroundColor = "green";
	button3.overState = "out";
	objectNameFocussed = null;
};

function changeColorClick3(event){
	button3ClickCount++;

	if(( button3ClickCount % 5 == 0)){
		if(switchPosition){

			// button2.style.top = 0;
			// button2.style.left = 0;

			 button3.style.top = "0px";
			 button3.style.left = "540px";
			switchPosition = false;
			switchPositionFunc(switchPosition);
		}
		else{
				button3.style.top = "260px";
			 	button3.style.left = "0px";
			// button2.style.top = 540;
			// button2.style.left = 0;

			// button3.style.top = 0;
			// button3.style.left = 260;
			switchPosition = true;
			switchPositionFunc(switchPosition);
	}
}

	button2.style.backgroundColor = "green";
	button3.style.backgroundColor = "white";
	button3.style.opacity = 0.1;
	button2.style.opacity = 1.0;
	document.getElementById("button2").style.opacity = 1.0;

	button3.removeEventListener("click",changeColorClick3);
	button3.removeEventListener("mouseover",changeColorEnter3);
	button3.removeEventListener("mouseout",changeColorLeave3);

	button2.addEventListener("click",changeColorClick2);
	button2.addEventListener("mouseover",changeColorEnter2);
	button2.addEventListener("mouseout",changeColorLeave2);	
	//}
}


function changeColorEnter2(event){
	button2.style.backgroundColor = "yellow";
	objectNameFocussed = button2;
	button2.overState = "over";
};

function changeColorLeave2(event){
	
	button2.style.backgroundColor = "green";
	button2.overState = "out";
	objectNameFocussed = null;
};


function changeColorClick2(event){
	
	button2.style.backgroundColor = "white";
	button3.style.backgroundColor = "green";

	button2.removeEventListener("click",changeColorClick2);
	button2.removeEventListener("mouseover",changeColorEnter2);
	button2.removeEventListener("mouseout",changeColorLeave2);


	button3.style.opacity = 1.0;
	button2.style.opacity = 0.1;

	button3.addEventListener("click",changeColorClick3);
	button3.addEventListener("mouseover",changeColorEnter3);
	button3.addEventListener("mouseout",changeColorLeave3);

	button2ClickCount++;
};





document.getElementById("button0").addEventListener("click",changeColorClick);
//document.getElementById("button0").addEventListener("mouseenter",changeColorEnter);
//document.getElementById("button0").addEventListener("mouseleave",changeColorLeave);

//for simulator
document.getElementById("button0").addEventListener("mouseover",changeColorEnter);
document.getElementById("button0").addEventListener("mouseout",changeColorLeave);


document.getElementById("button2").addEventListener("click",changeColorClick2);
document.getElementById("button2").addEventListener("mouseover",changeColorEnter2);
document.getElementById("button2").addEventListener("mouseout",changeColorLeave2);

// document.getElementById("button3").addEventListener("click",changeColorClick3);
// document.getElementById("button3").addEventListener("mouseover",changeColorEnter3);
// document.getElementById("button3").addEventListener("mouseout",changeColorLeave3);


//for simulator ends

//Button1.addEventListener("mouseenter",changeColorEntera);
//Button1.addEventListener("mouseleave",changeColorLeavea);

//for simulator
//Button1.addEventListener("mouseover",changeColorEntera);
//Button1.addEventListener("mouseout",changeColorLeavea);
//for simulator ends

//Button1.addEventListener("click",changeColorClicka);

/*
window.button1HoverCheck =  function (x , y) {
    var but1 = Button1.offsetWidth;
    //var totalWidth = (armCursor.offsetWidth  + but1 )/2;
    var totalWidth = (30  + but1 )/2;
    var distance = Math.sqrt(Math.pow(x-but1/2-Button1.offsetLeft ,2) + Math.pow(y-but1/2-Button1.offsetTop,2));
    var inside = false;
    if(distance*100 < totalWidth*100)
       inside =true;
    console.log("totalWidth =", totalWidth, " distance =", distance, " inside =", inside);
  
    var ret;
    if (inside && Button1.overState === "out")
    {
    	ret = "over";
        //simulate(document.getElementById("button1"), "mouseover");
    }

    if (!inside && Button1.overState === "over")
    {
    	ret = "out";
        //simulate(document.getElementById("button1"), "mouseout");
    }
    return ret;

}
*/
//document.getElementById("pausebutton").addEventListener("click",pauseEvent);

//Session, timer controller and pop-up messages

/*var fiveMinTimer;
var secondsElapsed = 0;

function pauseEvent(event) {

	clearInterval(fiveMinTimer);
	displaySessionStartMsg("Do you want to restart the session?");
	secondsElapsed = 0;
}*/

/*document.getElementsByTagName("button0").onload = *///displaySessionStartMsg("Do you want to start the session?");
//document.getElementsByTagName("body").addEventListener("load", displaySessionStartMsg);
//document.getElementById("body").onkeydown = keyPressHandlerFunc();
//displaySessionStartMsg("Do you want to start the session?");

/*function keyPressHandlerFunc() {
	alert(KeyPressed);
}*/

/*function displaySessionStartMsg () {
	 
	if(confirm(arguments[0])) {
		fiveMinTimer = setInterval(timeUpdater, 100);
	}
	else {
		displaySessionStartMsg("Do you want to start the session?");	
	}
}

function timeUpdater() {
	if (secondsElapsed == 300) {
		secondsElapsed = 0;
		clearInterval(fiveMinTimer);
  		alert("5 mins are over. Please take rest!");
    	displaySessionStartMsg("Do you want to restart the session?");
	} else {

		secondsElapsed++;  
		var additionalText = "";
			if(!(secondsElapsed %30)) {
				additionalText = "Report Fatigue"
			}
			else {
				additionalText = "";
			}
  	
		document.getElementById("timer").innerHTML = "Time: " + secondsElapsed;
		document.getElementById("report").innerHTML = additionalText;
	}
}*/
};

window.addEventListener("DOMContentLoaded", docLoadedFunc);