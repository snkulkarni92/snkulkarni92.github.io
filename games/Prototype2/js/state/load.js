"use strict";
window.Digger.state.load = {
	preload: function(){
		// we have preloaded assets required for Loading group objects in the Boot state
		var loading = mt.createGroup("Loading");
		var loadingGroup = window.loading = loading.self;
		
		// get preload sprite
		var preload = loading.preload;
		
		// check if we have preload object at all
		if(preload){
			// set it as preload sprite
			this.load.setPreloadSprite(preload);
			
			// update group transform - so we can get correct bounds
			loadingGroup.updateTransform();
			
			// get bounds
			var bounds = loadingGroup.getBounds();
			
			// move it to the center of the screen
			loadingGroup.x = this.game.camera.screenView.centerX - (bounds.width) * 0.5  - bounds.x;
			loadingGroup.y = this.game.camera.screenView.centerY - (bounds.height) - bounds.y;
		}
		
		
		
		//map 
		
		
		  	this.game.load.tilemap('map', 'BrainFinal4.json', null, Phaser.Tilemap.TILED_JSON);
		
     		this.game.load.image('brains1', 'assets/Brain Finalsmall2.png');
		
		    this.game.load.audio('backgroundMusic','song.mp3');
		     

		// load all assets
		mt.preload();
	},
	
	create: function(){
		// loading has finished - proceed to menu state (screen)
		this.game.state.start("story");
	}
};