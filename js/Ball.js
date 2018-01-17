function Ball(posX,posY,speedX,speedY,radius,color){
	this.position = {
		x: posX,
		y: posY
	};
	this.speed = {
		initialX: speedX,
		x: speedX,
		y: speedY
	};
	this.radius = radius;
	this.color = color;
};

Ball.prototype.move = function (ball_1, player_1){
	ball_1.position.x = ball_1.position.x + ball_1.speed.x;
	ball_1.position.y = ball_1.position.y + ball_1.speed.y;

	if(ball_1.position.x > 0 + player_1.width/5 && ball_1.position.x < 0 + player_1.width){	
		if(ball_1.position.y > player_1.position.y && ball_1.position.y < player_1.position.y+player_1.height)
			ball_1.speed.x = -ball_1.speed.x;
	}
	else if(ball_1.position.x < 0 - (ball_1.radius * 2)){
		return null;
	}

	if(ball_1.position.x > canvas.width-ball_1.radius){
		ball_1.speed.x = -ball_1.speed.x;
		if(ball_1.speed.x > ball_1.speed.initialX * 2){//increase speed:
			ball_1.speed.x -= 1;
		}
	}
		
	if(ball_1.position.y < 0)
		ball_1.speed.y = -ball_1.speed.y;
	if(ball_1.position.y > canvas.height-ball_1.radius)
		ball_1.speed.y = -ball_1.speed.y;

	return ball_1;
}