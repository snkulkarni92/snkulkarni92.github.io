"use strict";
window.Digger = {
	
	// reference to Phaser.Game instance
	game: null,
	
	// main function
	main: function(){
		this.game = new Phaser.Game(1280, 720, Phaser.AUTO, document.body, window.Digger.state.boot);
	},
	
	// here we will store all states
	state: {}
};

window.addEventListener('DOMContentLoaded', function(){
	window.Digger.main();
}, false);