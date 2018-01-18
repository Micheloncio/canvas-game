var canvas;
var canvasCtx;
var canvasWidth = 1200;
var canvasHeight = 400;

var balls = [];
var enemy;
var player;

function calculateMousePositionY(e){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseY = e.clientY - rect.top - root.scrollTop;

	return mouseY;
}

function gameStart(secondsForBall,secondsForExpanseCanvas,radiusBall,ballSpeedX,ballSpeedY){
	setPlayer();

	setCanvas();

	createEnemy();

	createBall(radiusBall,ballSpeedX,ballSpeedY);
	var intervalBalls = setInterval(function(){
		createBall(radiusBall,ballSpeedX,ballSpeedY);
	},1000 * secondsForBall);

	var timeoutCanvas = setTimeout(modifyCanvas,1000 * secondsForExpanseCanvas);

	var intervalGameCore = setInterval(function(){
		move();
		if(checkGameOver()){
			gameOver(intervalBalls, timeoutCanvas, intervalGameCore);
		}
		draw();
	},1000/60);
}

function setPlayer(){
	player = new Player(3,15,100,0,300,'white');
}

function setCanvas(){
	canvas = document.getElementById('canvasGear');
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	canvasCtx = this.canvas.getContext('2d');

	canvas.addEventListener('mousemove',function(e){
		player.position.y = calculateMousePositionY(e) - player.height/2;
	});
}

function createEnemy(){
	var enemyRadius = 15;
	enemy = new Enemy(canvas.width - enemyRadius, canvas.height/2, 3, enemyRadius, 'black');
}

function createBall(ballRadius,ballSpeedX,ballSpeedY){
	balls.push(new Ball(canvas.width - ballRadius*2 , enemy.position.y, -ballSpeedX, ballSpeedY, ballRadius, 'white'));
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
* Game Over
*/

function checkGameOver(){
	if(!player.hasLives()){
		return true;
	}
	return false;
}

function gameOver(intervalBalls, timeoutCanvas, intervalGameCore){
	clearInterval(intervalBalls);
	clearTimeout(timeoutCanvas);
	clearInterval(intervalGameCore);

	setTimeout(function(){
		drawText('GAME OVER', canvas.width/3, canvas.height/2, 72, 'black');		
	},100);
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
	drawText('Lives: ' + player.lives, 20, 20, 20, 'yellow');

	//drawing player
	drawRect(player.position.x, player.position.y, player.width, player.height, player.color);

	//drawing balls
	for(var i =0; i<balls.length;i++){
		drawCircle(balls[i].position.x, balls[i].position.y, balls[i].radius, 0, Math.PI*2, balls[i].color);
	}

	//drawing enemy
	drawCircle(enemy.position.x, enemy.position.y, enemy.radius, 0.5 * Math.PI, 1.5 * Math.PI, enemy.color);
}
function drawText(text, posX, posY, size,color){
	canvasCtx.font = size + 'px Courier';
	canvasCtx.fillStyle = color;
	canvasCtx.fillText(text,posX,posY);
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