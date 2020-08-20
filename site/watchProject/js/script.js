var button0Size = [60, 50, 40 ];
var button1Size = [60, 80, 100, 95, 90, 55, 40, 50, 50, 70, 90, 85, 80, 45, 30, 40, 50, 70, 90, 85, 80, 45, 30, 40];

var clickCount = 0;
var difficultyLevel=3;
var zoneNumber = 1;

var centerPoint0 = (300-button0Size[0])/2;
var centerPoint1 = (300-button1Size[0])/2;

var Button1 = document.createElement('div');
Button1.class ="button";
Button1.ID ="button1";
Button1.style.width = "60px";
Button1.style.height = "60px";
Button1.style.borderRadius = "60px";
Button1.style.border = "none";
Button1.style.backgroundColor = "white";
Button1.style.marginLeft = "auto";
Button1.style.marginRight = "auto";
Button1.style.marginTop = centerPoint1 +"px";
Button1.style.outline = "none";
document.getElementById(zoneNumber.toString()).appendChild(Button1);


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
	document.getElementById("button0").addEventListener("mouseenter",changeColorEnter);
	document.getElementById("button0").addEventListener("mouseleave",changeColorLeave);
	document.getElementById("button0").addEventListener("click",changeColorClick);
}


function changeColorEnter(event){
	document.getElementById("button0").style.backgroundColor = "red";
	console.log(document.getElementById("button0").style.backgroundColor);
	//Button1.remove();
	//Button1.remove
};

function changeColorLeave(event){
	document.getElementById("button0").style.backgroundColor = "white";
	console.log(document.getElementById("button0").style.backgroundColor);
	//document.getElementById("2").appendChild(Button1);
};


function changeColorClick(event){
	//document.getElementById("button0").style.backgroundColor = "grey";
	//console.log(document.getElementById("button0").style.backgroundColor);
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
				difficultyLevel = 5;
			}
			document.getElementById("difficulty").innerHTML = "ID = " + difficultyLevel;
		}
		centerPoint0 = (300-button0Size[difficultyLevel-3])/2;
		centerPoint1 = (300-button1Size[zoneNumber-1 + 8*(difficultyLevel-3)])/2;
		Button1.style.width = button1Size[zoneNumber-1 + 8*(difficultyLevel-3)] + "px";
		Button1.style.height = button1Size[zoneNumber-1 + 8*(difficultyLevel-3)] + "px";

		document.getElementById("button0").style.width = button0Size[difficultyLevel-3] + "px";
		document.getElementById("button0").style.height = button0Size[difficultyLevel-3] +"px";

		document.getElementById("button0").style.marginTop = centerPoint0 +"px";
        Button1.style.marginTop = centerPoint1 +"px";
		document.getElementById(zoneNumber.toString()).appendChild(Button1);

	}
	document.getElementById("button0").style.backgroundColor = "white";
	document.getElementById("button0").removeEventListener("mouseenter",changeColorEnter);
	document.getElementById("button0").removeEventListener("mouseleave",changeColorLeave);
	document.getElementById("button0").removeEventListener("click",changeColorClick);
	Button1.style.opacity = 1.0;
	document.getElementById("button0").style.opacity = 0.5;
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

document.getElementById("pausebutton").addEventListener("click",pauseEvent);

//Session, timer controller and pop-up messages

var fiveMinTimer;
var secondsElapsed = 0;

function pauseEvent(event) {

	clearInterval(fiveMinTimer);
	displaySessionStartMsg("Do you want to restart the session?");
	secondsElapsed = 0;
}

/*document.getElementsByTagName("button0").onload = */displaySessionStartMsg("Do you want to start the session?");
//document.getElementsByTagName("body").addEventListener("load", displaySessionStartMsg);
//document.getElementById("body").onkeydown = keyPressHandlerFunc();
//displaySessionStartMsg("Do you want to start the session?");

/*function keyPressHandlerFunc() {
	alert(KeyPressed);
}*/

function displaySessionStartMsg () {
	 
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
}
