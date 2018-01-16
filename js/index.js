var canvas;
var canvasCtx;

var framesPerSecond = 60;

var ball = {
	position: {
		x: 0,
		y: 0
	},
	speed: {
		x: 5,
		y: 2
	},
	radio: 10,
	color: 'white'
};

var player1 = {
	width: 15,
	height: 75,
	position: {
		x: 0,
		y: 300
	},
	color: 'white'
}

function calculateMousePositionY(e){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseY = e.clientY - rect.top - root.scrollTop;

	return mouseY;
}

window.onload = function(){
	canvas = document.getElementById('canvasGear');
	canvasCtx = canvas.getContext('2d');

	ballReset();

	setInterval(function(){
		move();
		draw();
	},1000/framesPerSecond);

	canvas.addEventListener('mousemove',function(e){
		player1.position.y = calculateMousePositionY(e) - player1.height/2;
	});
}

function ballReset(){
	ball.position.x = canvas.width - ball.radio;
	ball.position.y = canvas.height/2;
}

function move(){
	ball.position.x = ball.position.x + ball.speed.x;
	ball.position.y = ball.position.y + ball.speed.y;


	if(ball.position.x > 0 + player1.width/2 && ball.position.x < 0 + player1.width){	
		if(ball.position.y > player1.position.y && ball.position.y < player1.position.y+player1.height)
			ball.speed.x = -ball.speed.x;
	}
	else if(ball.position.x < 0 - (ball.radio * 2))
		ballReset();

	if(ball.position.x > canvas.width-ball.radio)
		ball.speed.x = -ball.speed.x;


	if(ball.position.y < 0)
		ball.speed.y = -ball.speed.y;
	if(ball.position.y > canvas.height-ball.radio)
		ball.speed.y = -ball.speed.y;
}

function draw(){
	//drawing background
	drawRect(0,0,canvas.width,canvas.height,'#759B84');

	//drawing player1
	drawRect(player1.position.x, player1.position.y, player1.width, player1.height, player1.color);

	//drawing ball
	drawCircle(ball.position.x, ball.position.y, ball.radio, 0, Math.PI*2, ball.color);
}

function drawRect(posX,posY,width,height,color){
	canvasCtx.fillStyle = color;
	canvasCtx.fillRect(posX,posY,width,height);
}
function drawCircle(posX,posY,radio, startAngle, endAngle, color){
	canvasCtx.fillStyle = color;
	canvasCtx.beginPath();
	canvasCtx.arc(posX,posY,radio, startAngle, endAngle, true);
	canvasCtx.fill();
}
