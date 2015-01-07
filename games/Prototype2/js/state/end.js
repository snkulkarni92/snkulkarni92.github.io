"use strict";
window.Digger.state.end = {
	create: function(){
		// you can create menu group in map editor and load it like this:
		// mt.createGroup("menu");
		this.endScreen = mt.create("GAmeOverScreen");
		
		
		 
	},
	
	update: function(){
		
		
		
		
		 if (this.game.input.keyboard.isDown(Phaser.Keyboard.R))
    {
		
		
			   this.game.state.start('play'); 
	}
		
	}
};