/************************ VAR ************************/
var EASING = 0.2;

var cursor = document.getElementById('cursor');
var svg = document.getElementById('svg');
var brush = document.getElementById('brush');
var button = document.getElementById('reset');

var distort = new DVG(svg, DVG.DYNAMIC_INTERPOLATION);
var originX = svg.viewBox.baseVal.x;
var originY = svg.viewBox.baseVal.y;

var mouseX, mouseY, lastMouseX, lastMouseY, mouseDeltaX, mouseDeltaY = 0;

var resetting = false;
var smudging = false;

/************************ EVENTS LISTENERS ************************/

button.addEventListener('click', function(e){
	resetting = true;
});

// ************************ DESKTOP ************************

window.addEventListener('mousedown', function(e){
	smudging = true;
	resetting = false;
});
window.addEventListener('mouseup', function(e){
	smudging = false;
});
window.addEventListener('mousemove', function(e){
	var rect = svg.getBoundingClientRect();
	
	mouseX = e.clientX - (isNaN(rect.x) ? svg.offsetLeft | 0 : rect.x);
	mouseY = e.clientY - (isNaN(rect.y) ? svg.offsetTop  | 0 : rect.y);

	cursor.style.transform = 'translate(' + mouseX + 'px,' + mouseY + 'px) scale(' + (brush.value / 100) + ')';

	mouseDeltaX = mouseX - lastMouseX;
	mouseDeltaY = mouseY - lastMouseY;

	lastMouseX = mouseX;
	lastMouseY = mouseY;
});

// ************************ MOBILE ************************
window.addEventListener('touchstart', function(e){
	smudging = true;
	resetting = false;
});
window.addEventListener('touchend', function(e){
	smudging = false;
});
window.addEventListener('touchmove', function(e){
	var rect = svg.getBoundingClientRect();
	
	mouseX = e.targetTouches[0].pageX - (isNaN(rect.x) ? svg.offsetLeft | 0 : rect.x);
	mouseY = e.targetTouches[0].pageY - (isNaN(rect.y) ? svg.offsetTop  | 0 : rect.y);

	cursor.style.transform = 'translate(' + mouseX + 'px,' + mouseY + 'px) scale(' + (brush.value / 100) + ')';

	mouseDeltaX = mouseX - lastMouseX;
	mouseDeltaY = mouseY - lastMouseY;

	lastMouseX = mouseX;
	lastMouseY = mouseY;
});

function smudge(x, y){
	var pointX = x - originX;
	var pointY = y - originY;

	var deltaX = mouseX - pointX;
	var deltaY = mouseY - pointY;
	var delta = Math.sqrt(deltaX * deltaX + deltaY * deltaY);


	if(delta <= brush.value){
		this.x(this.x() + mouseDeltaX * ((brush.value - delta) / brush.value));
		this.y(this.y() + mouseDeltaY * ((brush.value - delta) / brush.value));
	}
}

function reset(x, y){
	this.x(x * (1 - EASING) + this.restX() * EASING);
	this.y(y * (1 - EASING) + this.restY() * EASING);
}

function frame(){
	if(smudging)	{
		distort.withPoints(smudge);

		if(lastMouseX === mouseX){
			mouseDeltaX = 0;
		}

		if(lastMouseY === mouseY){
			mouseDeltaY = 0;
		}
	}
	else if(resetting){
		distort.withPoints(reset);
	}

	requestAnimationFrame(frame);
}

frame();