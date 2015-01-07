"use strict";
window.Digger.state.menu = {
	create: function(){
		// you can create menu group in map editor and load it like this:
		// mt.createGroup("menu");
		this.titleScreen = mt.create("TitleScreen");
		
		
		 this.game.input.onDown.add(function() { 	this.game.state.start("play"); }, this);
	
	},
	
	update: function(){
		
	}
};