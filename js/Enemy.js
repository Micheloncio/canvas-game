function Enemy(posX,posY,speedY,radius,color){
	this.position= {
		x: posX,
		y: posY
	};
	this.speed = {
		y: speedY
	};
	this.radius = radius;
	this.color = color;
};

Enemy.prototype.move = function(canvasHeight){
	this.position.y = this.position.y + this.speed.y;

	if(this.position.y < 0 + this.radius)
		this.speed.y = -this.speed.y;
	if(this.position.y > canvasHeight - this.radius)
		this.speed.y = -this.speed.y;
};