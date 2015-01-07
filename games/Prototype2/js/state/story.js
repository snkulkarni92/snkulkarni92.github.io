"use strict";
var spawnTime;
window.Digger.state.story = {
	create: function(){
		// you can create menu group in map editor and load it like this:
		// mt.createGroup("menu");
		
		this.madCowAnimation = mt.create("MadCowHappyFunTimeExplosion(Animation)2");

		
		//this.enemies.self.create(100,100,"/wbc.png");
		//this.enemies.self.create(1000,500,"/wbc.png");
		
		this.madCowAnimation.animations.add('play',[0,1,2,3,4],.6,false);
		this.madCowAnimation.animations.play('play');
		
			 this.game.input.onDown.add(function() { 	this.game.state.start("menu"); }, this);
		
		 spawnTime = this.game.time.now
	},
	
	update: function(){
		
		if(this.game.time.elapsedSecondsSince(spawnTime)>15)
			this.game.state.start("menu");
		
		
	
		
	}
};