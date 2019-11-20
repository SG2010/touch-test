var touchCount = 0;
var mouseCount = 0;
var pointerCount = 0;
var redObj;

var INTERACTOR_TYPE = {
	Pointer : 'pointer',
	Touch : 'touch',
	Mouse : 'mouse'
}
function PointerObj(){
	var pointerIds = [];
	var listenerBody = function(evt) {
		if(evt.type.indexOf(INTERACTOR_TYPE.Pointer) != -1){
			if(evt.type == "pointerdown"){
				pointerIds.push(evt.pointerId);
			}
			else if(evt.type == "pointerup"){
				var idx = -1;
				for(var i = 0; i < pointerIds.length; i++){
					if(pointerIds[i] == evt.pointerId){
						idx = i;
						break;
					}
				}
				
				pointerIds.splice(idx, 1);
			}
			printEvent(evt, pointerIds.length, INTERACTOR_TYPE.Pointer);
		}
		else if(evt.type.indexOf(INTERACTOR_TYPE.Touch) != -1){
			printEvent(evt, evt.touches.length, INTERACTOR_TYPE.Touch);
		}
		else if(evt.type.indexOf(INTERACTOR_TYPE.Mouse) != -1){
			printEvent(evt, 1, INTERACTOR_TYPE.Mouse);
		}
		
	}

	this.Listener = listenerBody.bind(this);
}

function onLoad() {
	
	redObj = new PointerObj();

    //  Create gesture event listeners for each <div> element
    prepareTarget("Red", redObj);
}

//  Add gesture events to an element and point at a specific function
function prepareTarget(targetId, eventObj) {
    var target = document.getElementById(targetId);
	
	// Pointer
    target.addEventListener("pointerdown", eventObj.Listener, false);
	target.addEventListener("pointermove", eventObj.Listener, false);
	target.addEventListener("pointerup", eventObj.Listener, false);
	target.addEventListener("pointerout", eventObj.Listener, false);
	target.addEventListener("pointerover", eventObj.Listener, false);
	target.addEventListener("pointercancel", eventObj.Listener, false);
	target.addEventListener("pointerenter", eventObj.Listener, false);
	target.addEventListener("pointerleave", eventObj.Listener, false);
	
	// Mouse
	target.addEventListener("mousedown", eventObj.Listener, false);
	target.addEventListener("mousemove", eventObj.Listener, false);
	target.addEventListener("mouseup", eventObj.Listener, false);
	target.addEventListener("mouseout", eventObj.Listener, false);
	target.addEventListener("mouseenter", eventObj.Listener, false);
	target.addEventListener("mouseleave", eventObj.Listener, false);
	target.addEventListener("mouseover", eventObj.Listener, false);
	
	target.addEventListener("touchstart", eventObj.Listener, false);
	target.addEventListener("touchmove", eventObj.Listener, false);
	target.addEventListener("touchend", eventObj.Listener, false);
	target.addEventListener("touchcancel", eventObj.Listener, false);
	target.addEventListener("touchenter", eventObj.Listener, false);
	target.addEventListener("touchleave", eventObj.Listener, false);
}

function printMessage(str, id) {
    var element = document.getElementById(id + 'Out');
	window[id + "Count"]++;
    element.value += formatMessage(window[id + "Count"] + ":", 4) + str;
    element.scrollTop = element.scrollHeight;

    element = document.getElementById(id + 'EventCount');
    element.innerHTML = window[id + "Count"];
}

function formatMessage(str, len) {
    var formattedMessage = null;
    if (str != null) {
        var formattedMessage = str.toString();
        formattedMessage += " ";
        for (var idx = formattedMessage.length; idx < len; idx++) {
            formattedMessage += " ";
        }
    }
    return formattedMessage;
}

function printEvent(evt, numTouches, id) {
	var coordObj = evt;
	
	if(evt.type.indexOf("touch") >= 0){
		coordObj = ((evt.changedTouches != null && evt.changedTouches.length > 0) ? evt.changedTouches[0] : evt);
	}
	
	if(evt.type.indexOf("touchend") >= 0){
		console.log('touchend');
	}
    var str =
        formatMessage(evt.type, 16) + 
        formatMessage((coordObj.screenX != null ? coordObj.screenX.toFixed(0) : "null"), 6) +
        formatMessage((coordObj.screenY != null ? coordObj.screenY.toFixed(0) : "null"), 6)  +
        formatMessage((coordObj.clientX != null ? coordObj.clientX.toFixed(0) : "null"), 6) +
        formatMessage((coordObj.clientY != null ? coordObj.clientY.toFixed(0) : "null"), 6)  +
		formatMessage((coordObj.pageX   != null ? coordObj.pageX.toFixed(0) : "null"), 6) +
        formatMessage((coordObj.pageY   != null ? coordObj.pageY.toFixed(0) : "null"), 6) +
        // formatMessage((evt.translationX != null ? evt.translationX.toFixed(2) : "null"), 8) +
        // formatMessage((evt.translationY != null ? evt.translationY.toFixed(2) : "null"), 9) +
        // formatMessage((evt.scale != null ? evt.scale.toFixed(2) : "null"), 7) +
        // formatMessage((evt.rotation != null ? evt.rotation.toFixed(2) : "null"), 8) +
        // formatMessage(evt.detail, 7) +
		
        formatMessage(evt.currentTarget.id, 10) +
        formatMessage(evt.srcElement.id, 8) +
		formatMessage((evt.pointerId != null ? evt.pointerId : "null"), 9) +
		formatMessage((numTouches != null ? numTouches : "null"), 6) + 
		formatMessage(getTimeString(), 8) + 
        "\n";
    printMessage(str, id);
    evt.stopPropagation();
}

// Clear the list of gesture messages
function clearMessages(id) {
    var results = document.getElementById(id + 'Out');
    results.value = "";
    window[id + "Count"] = 0;
    results = document.getElementById(id + 'EventCount');
    results.innerHTML = window[id + "Count"];
}
function pad(num, size, padWith) {
	var s = num + "";
	while (s.length < size) s = padWith + s;
	return s;
}
function getTimeString() {
	var d = new Date();
	var output = "";

	var month = pad((d.getMonth() + 1), 2, "0");
	var day = pad(d.getDate(), 2, "0");
	var year = d.getFullYear();

	var hour = pad((d.getHours()), 2, "0");
	var minutes = pad((d.getMinutes()), 2, "0");
	var seconds = pad((d.getSeconds()), 2, "0");
	var milliseconds = pad((d.getMilliseconds()), 3, "0");

	output = /*year + "/" + month + "/" + day + " " + */hour + ":" + minutes + ":" + seconds + "." + milliseconds;

	return output;
}