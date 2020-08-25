//var button0Size = [70, 60, 50, 40 ];
//var button1Size = [70, 90, 110, 105, 100, 65, 50, 60, 60, 80, 100, 95, 90, 55, 40, 50, 50, 70, 90, 85, 80, 45, 30, 40, 50, 70, 90, 85, 80, 45, 30, 40];
//var button1Size = [240, 90, 110, 105, 100, 65, 50, 60, 60, 80, 100, 95, 90, 55, 40, 50, 50, 70, 90, 85, 80, 45, 30, 40, 50, 70, 90, 85, 80, 45, 30, 40];
//var diagonalDisance = 734;
//var verticalDistance = 360;



function docLoadedFunc()
{

//Initial condition start

//position of circle shaped button from top left
var offsets = [256, 144];  //16:9 increments. default 320,180

//Calculate distances on a screen of resolution 1920x1080
var distances = [];
distances[0] = Math.sqrt(Math.pow(960 - offsets[0], 2) + Math.pow(540 - offsets[1], 2));
distances[1] = 540 - offsets[1];
distances[2] = 960 - offsets[0];

var difficultyLevel=2;
var zoneNumber = 1;

//Calculate button size for initialization
var firstButtonSize = distances[0] / (Math.pow(2, difficultyLevel) -1);

var Button1 = document.createElement('div');
Button1.class ="button";
Button1.ID ="button1";
Button1.style.width = firstButtonSize + "px";
Button1.style.height = firstButtonSize + "px";
Button1.style.borderRadius =firstButtonSize + "px";
Button1.style.border = "none";
Button1.style.backgroundColor = "white";
//Button1.style.marginLeft = "auto";
//Button1.style.marginRight = "auto";
//Button1.style.marginTop = centerPoint1 +"px";
Button1.style.outline = "none";
Button1.style.position = "absolute";
Button1.style.left = offsets[0] - firstButtonSize/2 + "px";
Button1.style.top = offsets[1]- firstButtonSize/2 + "px";
document.getElementById(zoneNumber.toString()).appendChild(Button1);

var button0 = document.getElementById("button0");
button0.style.width = firstButtonSize + "px";
button0.style.height = firstButtonSize + "px";
button0.style.marginTop = (360-firstButtonSize)/2 + "px";


//Initial condition over

var buttonSize = 0;
//var buttonSize = (Math.pow(2,difficultyLevel) -1);

var clickCount = 0;




function changeColorEntera(event){
	Button1.style.backgroundColor = "red";
	console.log(Button1.style.backgroundColor);
	//Button1.remove();
	//Button1.remove
};

function changeColorLeavea(event){
	Button1.style.backgroundColor = "white";
	console.log(Button1.style.backgroundColor);
	//document.getElementById("2").appendChild(Button1);
};

function changeColorClicka(event){

	Button1.style.backgroundColor = "white";
	Button1.style.opacity = 0.5;
	document.getElementById("button0").style.opacity = 1.0;
	console.log(Button1.style.backgroundColor);
	Button1.removeEventListener("mouseenter",changeColorEntera);
	Button1.removeEventListener("mouseleave",changeColorLeavea);
	Button1.removeEventListener("click",changeColorClicka);
	button0.addEventListener("mouseenter",changeColorEnter);
	button0.addEventListener("mouseleave",changeColorLeave);
	button0.addEventListener("click",changeColorClick);
}


function changeColorEnter(event){
	button0.style.backgroundColor = "red";
	console.log(button0.style.backgroundColor);
	//Button1.remove();
	//Button1.remove
};

function changeColorLeave(event){
	//document.getElementById("button0").style.backgroundColor = "white";
	button0.style.backgroundColor = "white";
	//console.log(document.getElementById("button0").style.backgroundColor);
	console.log(button0.style.backgroundColor);
	//document.getElementById("2").appendChild(Button1);
};


function changeColorClick(event){
	//document.getElementById("button0").style.backgroundColor = "grey";
	//console.log(document.getElementById("button0").style.backgroundColor);

	var x_offset =0, y_offset =0;

	clickCount++;

	if(clickCount >5 && clickCount % 5 == 1)
	{
		document.getElementById(zoneNumber.toString()).removeChild(Button1);

		zoneNumber++;

		if(zoneNumber == 9)
		{
			zoneNumber = 1;

			difficultyLevel++;

			if(difficultyLevel ==6)
			{
				alert("Study for the given posture is completed. Switch to the next posture. Thanks! ");
				clearInterval(fiveMinTimer);
				difficultyLevel = 1;
			}

			

			document.getElementById("difficulty").innerHTML = "ID = " + difficultyLevel;
		}

		switch (zoneNumber) {
				case 1:
				    buttonSize = distances[0] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = offsets[0] - buttonSize/2 + "px";
				    y_offset = offsets[1] - buttonSize/2 + "px";
					break;

				case 2:
				    buttonSize = distances[1] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = (1920/6) - buttonSize/2 + "px";
				    y_offset = offsets[1] - buttonSize/2 + "px";
					break;

				case 3:
				    buttonSize = distances[0] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = (1920/3) - offsets[0] - buttonSize/2 + "px";
				    y_offset = offsets[1] - buttonSize/2 + "px";
					break;				
				case 4:
				    buttonSize = distances[2] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = (1920/3) - offsets[0] - buttonSize/2 + "px";
				    y_offset = (1080/6) - buttonSize/2 + "px";
					break;
				case 5:
				    buttonSize = distances[0] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = (1920/3) - offsets[0] - buttonSize/2 + "px";
				    y_offset = (1080/3) - offsets[1] - buttonSize/2 + "px";
					break;
				case 6:
				    buttonSize = distances[1] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = (1920/6) - buttonSize/2 + "px";
				    y_offset = (1080/3) - offsets[1] - buttonSize/2 + "px";
					break;
				case 7:
				    buttonSize = distances[0] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = offsets[0] - buttonSize/2 + "px";
				    y_offset = (1080/3) - offsets[1] - buttonSize/2 + "px";
					break;
				case 8:
				    buttonSize = distances[2] / (Math.pow(2, difficultyLevel) -1);
				    x_offset = offsets[0] - buttonSize/2 + "px";
				    y_offset = (1080/6) - buttonSize/2 + "px";
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
		button0.style.marginTop = (360-buttonSize)/2 + "px";

		//document.getElementById("button0").style.width = button0Size[difficultyLevel-3] + "px";
		//document.getElementById("button0").style.height = button0Size[difficultyLevel-3] +"px";

		//document.getElementById("button0").style.marginTop = centerPoint0 +"px";
        //Button1.style.marginTop = centerPoint1 +"px";
		document.getElementById(zoneNumber.toString()).appendChild(Button1);

	}
	button0.style.backgroundColor = "white";
	button0.removeEventListener("mouseenter",changeColorEnter);
	button0.removeEventListener("mouseleave",changeColorLeave);
	button0.removeEventListener("click",changeColorClick);
	Button1.style.opacity = 1.0;
	button0.style.opacity = 0.5;
	Button1.addEventListener("mouseenter",changeColorEntera);
	Button1.addEventListener("mouseleave",changeColorLeavea);
	Button1.addEventListener("click",changeColorClicka);



};



document.getElementById("button0").addEventListener("click",changeColorClick);
document.getElementById("button0").addEventListener("mouseenter",changeColorEnter);
document.getElementById("button0").addEventListener("mouseleave",changeColorLeave);

Button1.addEventListener("mouseenter",changeColorEntera);
Button1.addEventListener("mouseleave",changeColorLeavea);
Button1.addEventListener("click",changeColorClicka);

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