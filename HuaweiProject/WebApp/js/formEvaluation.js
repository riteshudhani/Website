function docLoadedFunc()
{
	var participantIDv = localStorage.getItem("participantID");
	var posturev = localStorage.getItem("posture");
	var indexofdifv = localStorage.getItem("indexofdif");
	var levelv = localStorage.getItem("level");
	var practiceCheckv = localStorage.getItem("practiceCheck");


	//console.log(participantIDv);
	if(participantIDv != undefined || participantIDv != null) {
		document.getElementById("participantID").value = participantIDv;
		console.log("Last saved ParticipantID", participantIDv);
	}
	else
	{
		console.log("Unable to read participantID from storage");
	}

	if(posturev != undefined || posturev != null) {
		document.getElementById("posture").value = posturev;
		console.log("Last saved PostureID", posturev);
	}
	else
	{
		console.log("unable to read postureID from storage");
	}

	if(indexofdifv != undefined || indexofdifv != null) {
		document.getElementById("indexofdif").value = indexofdifv;
		console.log("Last saved ID", indexofdifv);	
	}
	else
	{
		console.log("unable to read ID from storage");
	}

	if(levelv != undefined || levelv != null) {
		document.getElementById("level").value = levelv;
		console.log("Last saved Zone", levelv);	
	}
	else
	{
		console.log("unable to read zone from storage");
	}

	if(practiceCheckv != undefined || practiceCheckv != null) {
		document.getElementById("practiceCheck").value = practiceCheckv;
		console.log("Last saved PracticeCheck status", practiceCheckv);	
	}
	else
	{
		console.log("unable to read practiceCheck from storage");
	}
	document.getElementById("formSubmission").addEventListener( "click", formDetails);
	

	function formDetails()
	{
		levelv = document.getElementById("level").value;
		indexofdifv = document.getElementById("indexofdif").value;
		posturev = document.getElementById("posture").value;
		participantIDv = document.getElementById("participantID").value;
		practiceCheckv = document.getElementById("practiceCheck").value;
		
		//console.log("recalibrationRequired ", recalibrationRequired, "level ", level, "indexofdif ", indexofdif, "posture ", posture, "participantID ", participantID );

		localStorage.setItem("participantID", participantIDv);
		localStorage.setItem("indexofdif", indexofdifv);
		localStorage.setItem("level", levelv);
		localStorage.setItem("posture", posturev);
		localStorage.setItem("practiceCheck", practiceCheckv);

		//window.location.href = "experiment.html";
		window.location.href = "Calibration.html";

	};

};

window.addEventListener("DOMContentLoaded", docLoadedFunc);