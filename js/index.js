var canvas;
var canvasCtx;
var canvasWidth = 1200;
var canvasHeight = 400;

var framesPerSecond = 60;
var secondsForBall = 6;
var secondsForExpanseCanvas = 30;


var balls = [];
var enemy;
var player;

function calculateMousePositionY(e){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseY = e.clientY - rect.top - root.scrollTop;

	return mouseY;
}

window.onload = function(){
	setPlayer();

	setCanvas();

	createEnemy();

	createBall();
	setInterval(createBall,1000 * secondsForBall);

	setTimeout(modifyCanvas,1000 * secondsForExpanseCanvas);

	setInterval(function(){
		move();
		draw();
	},1000/framesPerSecond);
}

function setPlayer(){
	player = new Player(3,15,100,0,300,'white');
}

function setCanvas(){
	canvas = document.getElementById('canvasGear');
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	canvasCtx = canvas.getContext('2d');

	canvas.addEventListener('mousemove',function(e){
		player.position.y = calculateMousePositionY(e) - player.height/2;
	});
}

function createEnemy(){
	var enemyRadius = 15;
	enemy = new Enemy(canvas.width - enemyRadius, canvas.height/2, 3, enemyRadius, 'black');
}

function createBall(){
	var ballRadius = 10;
	balls.push(new Ball(canvas.width - ballRadius*2 , enemy.position.y, -5, 3, ballRadius, 'white'));
}

function modifyCanvas(){
		canvas.height = canvas.height * 1.5;
}

/**
* Move
*/

function move(){
	
	enemy.move(canvas.height);

	for(var i =0; i<balls.length;i++){
		balls[i] = balls[i].move(balls[i],player);
	}
	balls = balls.filter(function(ball){
		return ball != null;
	})
}



/**
* Draw
*/

function draw(){
	//drawing background
	drawRect(0,0,canvas.width,canvas.height,'#759B84');
	//drawing line
	drawRect(canvas.width-2,0, 2,canvas.height,'black');

	//drawing text
	drawText("Lives: " + player.lives);

	//drawing player
	drawRect(player.position.x, player.position.y, player.width, player.height, player.color);

	//drawing balls
	for(var i =0; i<balls.length;i++){
		drawCircle(balls[i].position.x, balls[i].position.y, balls[i].radius, 0, Math.PI*2, balls[i].color);
	}

	//drawing enemy
	drawCircle(enemy.position.x, enemy.position.y, enemy.radius, 0.5 * Math.PI, 1.5 * Math.PI, enemy.color);
}
function drawText(text){
	canvasCtx.font = "20px Courier red";
	canvasCtx.fillStyle = "yellow"
	canvasCtx.fillText(text,20,20);
}

function drawRect(posX,posY,width,height,color){
	canvasCtx.fillStyle = color;
	canvasCtx.fillRect(posX,posY,width,height);
}
function drawCircle(posX,posY,radius, startAngle, endAngle, color){
	canvasCtx.fillStyle = color;
	canvasCtx.beginPath();
	canvasCtx.arc(posX,posY,radius, startAngle, endAngle, true);
	canvasCtx.fill();
}