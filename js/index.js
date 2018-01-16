var canvas;
var canvasCtx;

var framesPerSecond = 60;

function ball(posX,posY,speedX,speedY,radio,color){
	this.position = {
		x: posX,
		y: posY
	};
	this.speed = {
		x: speedX,
		y: speedY
	};
	this.radio = radio;
	this.color = color;
};

var player = {
	width: 15,
	height: 100,
	position: {
		x: 0,
		y: 300
	},
	color: 'white'
};

var balls = [];
var secondsForBall = 6;

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

	createBall();
	setInterval(createBall,1000 * secondsForBall);

	setInterval(function(){
		move();
		draw();
	},1000/framesPerSecond);

	canvas.addEventListener('mousemove',function(e){
		player.position.y = calculateMousePositionY(e) - player.height/2;
	});
}

function enemyInit(){
	enemy.position.x = canvas.width - enemy.radio;
	enemy.position.y = canvas.height/2;
}

function createBall(){
	var ballRadio = 10;
	balls.push(new ball(canvas.width - ballRadio*2 , enemy.position.y, 5, 3, ballRadio, 'white'));
	//ball_1.position.x = canvas.width - ball_1.radio;
	//ball_1.position.y = enemy.position.y;
}

/**
* Move
*/

function move(){
	moveEnemy();
	for(var i =0; i<balls.length;i++){
		balls[i] = moveBall(balls[i]);
	}
	balls = balls.filter(function(ball){
		return ball != null;
	})
}

function moveEnemy(){
	enemy.position.y = enemy.position.y + enemy.speed.y;

	if(enemy.position.y < 0)
		enemy.speed.y = -enemy.speed.y;
	if(enemy.position.y > canvas.height)
		enemy.speed.y = -enemy.speed.y;
}

function moveBall(ball_1){
	ball_1.position.x = ball_1.position.x + ball_1.speed.x;
	ball_1.position.y = ball_1.position.y + ball_1.speed.y;


	if(ball_1.position.x > 0 + player.width/2 && ball_1.position.x < 0 + player.width){	
		if(ball_1.position.y > player.position.y && ball_1.position.y < player.position.y+player.height)
			ball_1.speed.x = -ball_1.speed.x;
	}
	else if(ball_1.position.x < 0 - (ball_1.radio * 2)){
		return null;
	}

	if(ball_1.position.x > canvas.width-ball_1.radio)
		ball_1.speed.x = -ball_1.speed.x;


	if(ball_1.position.y < 0)
		ball_1.speed.y = -ball_1.speed.y;
	if(ball_1.position.y > canvas.height-ball_1.radio)
		ball_1.speed.y = -ball_1.speed.y;

	return ball_1;
}

/**
* Draw
*/

function draw(){
	//drawing background
	drawRect(0,0,canvas.width,canvas.height,'#759B84');
	//drawing line
	drawRect(canvas.width-2,0, 2,canvas.height,'black');

	//drawing player
	drawRect(player.position.x, player.position.y, player.width, player.height, player.color);

	//drawing ball
	
	for(var i =0; i<balls.length;i++){
		drawCircle(balls[i].position.x, balls[i].position.y, balls[i].radio, 0, Math.PI*2, balls[i].color);
	}
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

