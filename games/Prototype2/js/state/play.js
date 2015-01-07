"use strict";
var x=0;
var spawnTime = 0, spawnInterval = 3, maxEnemies = 1, currentEnemies = 0;
var flipTime = 2.2;
var enemy_x = 0;
		var enemy_y = 0;
var once=false;
var neuronsEaten =0 ;
var gameEnd= false;
var regions = [
	[[120,90,330,240],[210,240,480,360]],
	[[390,30,570,240],[570,150,910,390]],
	[[660,30,990,150],[840,300,930,510]],
	[[1020,90,1170,540],[1020,90,1200,540]],
	[[30,270,210,480],[30,270,210,480]],
	[[420,390,660,660],[720,510,960,630]],
	[[60,510,240,660],[30,510,240,660]]
];
var total = 14400, eaten=0;
var rows=100,colums=48;
window.Digger.state.play = 
{	
	create: function()
    {
		this.isSlow = false;
		this.maxEnemies = 1;
		this.currentEnemies = 0;
		this.nNeurons = 7;
		this.index = [0,1,2,3,4,5,6];
		this.bg= mt.create("Brain Final Dead Smaller");
		
		this.borders = mt.createGroup("borders");
		
			   this.map = this.game.add.tilemap('map');

   this.map.addTilesetImage('brains',  'brains1');

	     this.layer =this.map.createLayer('Tile Layer 1');
 this.map.setCollisionBetween(0, 1000);
		
		//this.counterImage= mt.create("Enemy");
		this.music = this.game.add.audio('backgroundMusic');
		  this.music.volume=1;
		    this.music.play();
		once=false;
		gameEnd=false;
		
		neuronsEaten=0;
		
		
		
		
		this.cursors = this.game.input.keyboard.createCursorKeys();
		//this.bg = mt.create("bg");
		
		this.blocks = mt.createGroup("blocks");
		this.fillers = mt.createGroup("fillers");
		this.enemies = mt.createGroup("enemies");
		//this.b = mt.createGroup("b");
		//this.shop = mt.create("shop");
		this.character = mt.create("virus");
		
		//this.enemies.self.create(100,100,"/wbc.png");
		//this.enemies.self.create(1000,500,"/wbc.png");
		

		this.character.animations.add('move', [0,1], 5, false);
		
		
		this.points = mt.create("points");
		
		  this.points.fontSize = 32;
		
	/*	for( var j=0;j<rows;j++)
       \\ {
           \\ for (var i=1 ; i<colums; i++)
          \\  {
                this.blocks.self.create(i *  15,j *  15,"/basicTile.png").body.immovable=true;
			\\	total++;
          \\  }
       } */
		/*for(var index=500; index <20000;index++)
    this.map.setTileIndexCallback(index,this.hitCoin, this);
		*/
		//this.map.setCollisionBetween(500,14400);
		
		
		this.createNeuron();	
		this.createNeuron();	
		this.createNeuron();	
		var i = 0;
		
		this.fillers.self.forEach(
			function(enemy)
			{
				enemy.id = i;
				enemy.lastFlipTime = 0;
				if(i==0)
				{
					enemy.body.velocity.x = 200;
					enemy.body.velocity.y = 30;

				}
				else if (i==1)
				{
					enemy.body.velocity.x = -200;
					enemy.body.velocity.y = -30;
				}
				else if(i==2)
				{
					enemy.body.velocity.x = 60;
					enemy.body.velocity.y = 200;
					enemy.visible=false;
					enemy.body.enable=false;
				}
				else if(i==3)
				{
					enemy.body.velocity.x = -60;
					enemy.body.velocity.y = -200;
					enemy.visible=false;
					enemy.body.enable=false;
				}
				else if(enemy.id==4) 
					{
						enemy.currentAngle=Math.random();
						enemy.rotCenterX=this.game.width*0.32;
						enemy.rotCenterY=this.game.height/2;
						enemy.currentRadius=Math.random()*200;
						enemy.radiusIncrement = 2;
						enemy.visible=false;
						enemy.body.enable=false;
					}
				else if(enemy.id>=5) 
					{
						enemy.currentAngle=Math.random();
						enemy.rotCenterX=this.game.width*0.75;
						enemy.rotCenterY=this.game.height/2;
						enemy.currentRadius=Math.random()*200;
						enemy.radiusIncrement = 2;
						enemy.visible=false;
						enemy.body.enable=false;
					}
				i++;
			}	, 
			this
		);
	},
		
       

	update: function()
    {
		
		this.isSlow = false;
		this.velocity = 400;
		
		
		this.points.setText('Neurons Eaten:'+neuronsEaten+'/'+7);
			 if (this.game.input.keyboard.isDown(Phaser.Keyboard.R) && gameEnd)
    {
		
		
			   this.game.state.start("play"); 
	}
		
		
		if(gameEnd){
			
			
			
			
			  this.character.body.velocity.x = 0;
            this.character.body.velocity.y = 0;
			
			
			this.enemies.self.forEach(function(enemy) {
		
		enemy.body.velocity.y =0;
		enemy.body.velocity.x =0;
				
			
		}, this);

			this.fillers.self.forEach
		(
			function(enemy)
			{
				 
		enemy.body.velocity.y =0;
		enemy.body.velocity.x =0;
			},
			this
		);		
			return;
			
		}
		//this.game.physics.arcade.collide(this.character, this.layer);
		//this.game.physics.arcade.overlap(this.fillers.self, this.layer);
		this.game.physics.arcade.collide(this.character, this.borders.self);
		//this.game.physics.arcade.collide(this.character, this.enemies.self);
		//this.game.physics.arcade.collide(this.enemies, this.borders.self);

		
        var group = this.blocks.self;
		var seed =100;
	    var rand = new Phaser.RandomDataGenerator(51);
		//this.game.debug.text('Group size: ' + Math.random()*100, 74, 580);
		var collideDown = false;
		//console.log(this.layer);
		
		
		this.tiles = this.layer.getTiles(this.character.body.x, this.character.body.y, 45, 45, false);
		console.log(this.character);
		
		for(var i = 0; i < this.tiles.length; i++)
		{
			if(this.tiles[i].alpha == 1)
			{
				this.isSlow = true;
				this.tiles[i].alpha = 0;
			}
			
		}
		
		this.layer.dirty=true;
		//console.log(this.tiles);
		 if(this.game.time.elapsedSecondsSince(spawnTime) >= spawnInterval && this.currentEnemies < this.maxEnemies)
		{
			var x=10,y=10;
			
    			x = Math.random()*colums*8;
				y = Math.random()*rows*8;
			
			this.enemies.self.create(x,y,"/healer2.png");
			
			this.enemies.self.setAll('enableBody','true');
			this.enemies.self.setAll('physicsBodyType','this.game.physics.ARCADE');
			spawnTime = this.game.time.now;
			this.currentEnemies++;
		}
		
	 
		
		//this.points.setText(Math.round(( (eaten/total)*100))+'%');
		//this.game.debug.text('case number ' +k, 74, 400);
		this.game.physics.arcade.overlap(
            this.character, 
            this.blocks.self,
            function(character, block) 
            {
              	if(this.index.length>0)
					this.createNeuron();
				neuronsEaten++;
				//this.counter.setText(nerounsEaten+"/"+7);
				if(neuronsEaten == this.nNeurons)
				{
					this.endScreen = mt.create("winstate");
					gameEnd=true;
				}
				block.destroy();
			 	/*if(block.key==='/basicTile.png')
					eaten++;
				
				if(block.key !=='/Transparent100x100.png')
				{
                block.destroy();
				}*/
			}, null, this);
		
		
		if(this.isSlow == true)
			this.velocity = 250;
		
		//player movem
        this.character.body.velocity.x = 0;
		this.character.body.velocity.y = 0;
       	if (this.cursors.down.isDown)
        {this.character.animations.play('move');
			this.character.scale.x = 0.8;
			this.character.angle =90;
			this.character.body.velocity.y = this.velocity;
		}
		else if(this.cursors.left.isDown)
			
		{this.character.animations.play('move');	this.character.angle =0;
			//this.character.body.facing = Phaser.LEFT;
			this.character.scale.x=-0.8;
			this.character.body.velocity.x = -this.velocity;
		}
		else if(this.cursors.right.isDown)
        {this.character.animations.play('move');	this.character.angle =0;
			this.character.scale.x=0.8;
			this.character.body.velocity.x = this.velocity;
		}
		else if(this.cursors.up.isDown)
        {
			this.character.animations.play('move');this.character.scale.x=0.8;
			this.character.angle =-90;
			this.character.body.velocity.y = -this.velocity;	
		}
		else 
		{ 
            this.character.body.velocity.x = 0;
            this.character.body.velocity.y = 0;
		}
		
		
		
		
		
		
		this.game.physics.arcade.collide(
			this.character,
			this.fillers.self,
			function(character, enemy)
			{
				
				if(!once){
							this.endScreen = mt.create("GAmeOverScreen");
                            gameEnd=true;
					
					//this.game.state.start("end");
					
					once=true;
				}
				
			},
			null,
			this
		);
		
		this.game.physics.arcade.collide(
			this.character,
			this.enemies.self,
			function(character, enemy)
			{
				
				if(!once){
							this.endScreen = mt.create("GAmeOverScreen");
                            gameEnd=true;
					
					//this.game.state.start("end");
					
					once=true;
				}
				
			},
			null,
			this
		);
		

		
		
					
		this.fillers.self.forEach
		(
			function(enemy)
			{	
				
				
				//console.log(this.character);
				if(enemy.visible == true)
				{
					this.tiles = this.layer.getTiles(enemy.body.x, enemy.body.y, enemy.width, enemy.height, false);
					for(var i = 0; i < this.tiles.length; i++)
					{
						this.tiles[i].alpha = 1;

					}
				}
				
				if(neuronsEaten>1)
				{
					if(enemy.id == neuronsEaten)
					{
						enemy.visible = true;
						enemy.body.enable = true;
					}
				}
				if(enemy.id <=3)
				{	
						
					
						if((enemy.body.x > 1100 || enemy.body.x < 50) &&
						   this.game.time.now - enemy.lastFlipTime> flipTime )
						{
							enemy.lastFlipTime = this.game.time.now;
							enemy.body.velocity.x = -enemy.body.velocity.x;
						}
						if((enemy.body.y > 620 || enemy.body.y < 50) &&
						   this.game.time.now - enemy.lastFlipTime> flipTime )
						{
							enemy.lastFlipTime = this.game.time.now;
							enemy.body.velocity.y = -enemy.body.velocity.y;
						}
					
				}
				else if(enemy.id>=4)
				{
					if(enemy.id == 4)
						enemy.currentAngle = enemy.currentAngle + Math.PI/72;
					else if(enemy.id == 5)
						enemy.currentAngle = enemy.currentAngle - Math.PI/72;

					enemy.currentRadius = enemy.currentRadius + enemy.radiusIncrement;

					enemy.body.x = enemy.rotCenterX + enemy.currentRadius*Math.sin(enemy.currentAngle);
					enemy.body.y = enemy.rotCenterY + enemy.currentRadius*Math.cos(enemy.currentAngle);
					
					
					{
						if( Math.abs(enemy.currentRadius) > 300)
						{
							enemy.radiusIncrement = -enemy.radiusIncrement;
							
						}
					}					

					
				}


			},
			this
		);
		
		var enemy_velocity = 150;
				//moving enemies
		this.enemies.self.forEach(function(enemy) {
		enemy_x = this.character.body.x - enemy.body.x;
		enemy_y= this.character.body.y - enemy.body.y;
		length = Math.sqrt(enemy_x*enemy_x + enemy_y*enemy_y)
		enemy.body.velocity.y = enemy_y * enemy_velocity / length;
		enemy.body.velocity.x = enemy_x * enemy_velocity / length;
				
			
		}, this);
		
		
	},
	
	destroyBlock: function(block)
    {
		this.dig = false;
		switch(block.key)
        {
			case '/rock.png':
				break;
			case '/grass.png':
			case '/ground.png':
			case 'basicTile.png':
				break;
			case '/gold.png':
				this.character.getData().userData.gold++;
				block.destroy();
				break;
		}
	},
	
	checkOverlap: function (spriteA, spriteB)
    {
    	var boundsA = spriteA.getBounds();
    	var boundsB = spriteB.getBounds();
    	return Phaser.Rectangle.intersects(boundsA, boundsB);
	},
	createNeuron: function ()
	
	
	{
		var i = Math.floor(Math.random()*this.index.length);
		var x = this.index[i];
		this.index.splice(i,1);
		var y = Math.floor(Math.random()*2);
		var posx = Math.floor(Math.random() * (regions[x][y][2] - regions[x][y][0])) + regions[x][y][0];
		var posy = Math.floor(Math.random() * (regions[x][y][3] - regions[x][y][1])) + regions[x][y][1];
		this.blocks.self.create(posx,posy,'/Special Neuron.png').body.immovable.true;
		console.log(this.index);
		console.log('Region '+x+y+' ('+posx+', '+posy+') between ('+regions[x][y][0]+', '+regions[x][y][1]+') and ('+regions[x][y][2]+', '+regions[x][y][3]+')');
	},
	stopDig: function()
    {
		this.dig = false;	
	},
	render:function ()
    {
        this.game.debug.body(this.character.body);
    },
	
	
	hitCoin :function (sprite, tile) {
		if(sprite.key == '/wbc.png')
		{
			if(tile.alpha === 0)
				eaten--;
			tile.alpha = 1;
			return true;
		}
		else
		{
			
			if(tile.alpha !==0 )
			{
				
				eaten++;
    		tile.alpha =0;
	    	this.layer.dirty = true;
   		 	return false;
		}
	}
	
	}
	
};