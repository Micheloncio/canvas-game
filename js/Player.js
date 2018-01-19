function Player (lives,width,height,posX,posY,color){
	this.lives = lives;
	this.width = width;
	this.height = height;
	this.position = {
		x: posX,
		y: posY
	};
	this.color = color;
	this.points = 0;
};

Player.prototype.hasLives = function(){
	if(this.lives <= 0){
		return false;
	}
	return true;
}