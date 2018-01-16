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

var player = {
	width: 15,
	height: 75,
	position: {
		x: 0,
		y: 300
	},
	color: 'white'
};

var enemy = {
	position: {
		x: 0,
		y: 0
	},
	speed: {
		y: 3
	},
	radio: 15,
	color: 'black'
};

function calculateMousePositionY(e){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseY = e.clientY - rect.top - root.scrollTop;

	return mouseY;
}

window.onload = function(){
	canvas = document.getElementById('canvasGear');
	canvasCtx = canvas.getContext('2d');

	enemyInit();
	ballInit();

	setInterval(function(){
		move();
		draw();
	},1000/framesPerSecond);

	canvas.addEventListener('mousemove',function(e){
		player.position.y = calculateMousePositionY(e) - player.height/2;
	});
}

function ballInit(){
	ball.position.x = canvas.width - ball.radio;
	ball.position.y = enemy.position.y;
}
function enemyInit(){
	enemy.position.x = canvas.width - enemy.radio;
	enemy.position.y = canvas.height/2;
}

function move(){
	moveEnemy();
	moveBall();
}
function moveEnemy(){
	enemy.position.y = enemy.position.y + enemy.speed.y;

	if(enemy.position.y < 0)
		enemy.speed.y = -enemy.speed.y;
	if(enemy.position.y > canvas.height)
		enemy.speed.y = -enemy.speed.y;
}
function moveBall(){
	ball.position.x = ball.position.x + ball.speed.x;
	ball.position.y = ball.position.y + ball.speed.y;


	if(ball.position.x > 0 + player.width/2 && ball.position.x < 0 + player.width){	
		if(ball.position.y > player.position.y && ball.position.y < player.position.y+player.height)
			ball.speed.x = -ball.speed.x;
	}
	else if(ball.position.x < 0 - (ball.radio * 2))
		ballInit();

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
	//drawing line
	drawRect(canvas.width-2,0, 2,canvas.height,'black');

	//drawing player
	drawRect(player.position.x, player.position.y, player.width, player.height, player.color);

	//drawing ball
	drawCircle(ball.position.x, ball.position.y, ball.radio, 0, Math.PI*2, ball.color);
	drawCircle(enemy.position.x, enemy.position.y, enemy.radio, 0.5 * Math.PI, 1.5 * Math.PI, enemy.color);
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

