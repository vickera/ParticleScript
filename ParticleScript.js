(function() {
	this.ParticleScript = function(options) {
		/////////////////////
		// Default Options //
		/////////////////////
		this.defaults = {
			selector: '#canvas',
			refresh: 40,
			number: 200,
			color: 'random',
			size: 6,
			minSize: 0,
			speed: 40,
			minSpeed: 0,
			shape: 'circle',
			background: 'black',
			pull: 'down',
			height: window.innerHeight,
			width: window.innerWidth
		}

		if (options && typeof options === 'object')
			this.options = mergeDefault(this.defaults, options);
		else
			this.options = this.defaults;

		/////////////////////
		// Canvas Creation // 
		/////////////////////
		var Canvas = function(options) {
			var canvasID, canvas, context;
			canvasID = options.selector.substr(1);
			canvas = document.getElementById(canvasID);
			canvas.height = options.height;
			canvas.width = options.width;
			context = canvas.getContext('2d');

			//update function.
			Canvas.update = function() {
				if(Particle.list.length == 0)
					return false;
				context.fillStyle = options.background;
				context.fillRect(0, 0, canvas.width, canvas.height);
				for (var key in Particle.list) {
					if (!Particle.list.hasOwnProperty(key)) continue;
					var p = Particle.list[key];
					var d = p.outOfBounds()
					if (d) {
						p.destroy();
						p.reincarnate(d);
					}
					context.beginPath();
					if (options.shape === "square")
						context.rect(p.x, p.y, p.size, p.size)
					else if (options.shape === "circle")
						context.arc(p.x, p.y, p.size, 0, Math.PI / 360, true);
					context.fillStyle = p.color;
					context.fill();
					//update the particle if pull is enabled
					p.pull();
				}
			}
		}

		///////////////////////
		// Particle Creation //
		///////////////////////
		var Particle = function(options) {
			this.id = rnd();
			this.color = colorChecker(options.color);
			this.x = rnd(options.width);
			this.y = rnd(options.height);
			this.size = rnd(options.size) + options.minSize;
			this.speed = rnd(options.speed) + options.minSpeed;
			Particle.list[this.id] = this;

			this.outOfBounds = function() {
				if ((this.y + this.size) < 0)
					return 'up';
				else if ((this.y - this.size) > options.height)
					return 'down';
				else if ((this.x + this.size) < 0)
					return 'left';
				else if (this.x - this.size > options.width)
					return 'right';
				else
					return false;
			}

			this.destroy = function() {
				delete Particle.list[this.id];
			}

			this.pull = function() {
				if (options.pull === 'down')
					this.y += this.speed;
				else if (options.pull === 'up')
					this.y -= this.speed;
				else if (options.pull === 'left')
					this.x -= this.speed;
				else if (options.pull === 'right')
					this.x += this.speed;
			}

			this.reincarnate = function(d) {
				var p = new Particle(options);
				if (d === 'up') {
					p.y = options.height + (p.size - 1);
					p.x = rnd(options.width);
				}
				if (d === 'down') {
					p.y = -p.size;
					p.x = rnd(options.width);
				}
				if (d === 'left') {
					p.y = rnd(options.height);
					p.x = options.width + (p.size - 1);
				}
				if (d === 'right') {
					p.y = rnd(options.height);
					p.x = -p.size;
				}
			}
		}
		Particle.list = {};

		////////////////////
		// Public methods //
		////////////////////
		//move the particles in relation to x/y coordinates
		var oldX = 0;
		var oldY = 0;
		this.moveWith = function(x, y, options = {invertX: true,invertY: true,speed: 0.25}) {
			var defaults = {
				invertX: true,
				invertY: true,
				speed: 0.25
			}

			if (options && typeof options === "object")
				options = mergeDefault(defaults, options);
			else
				options = defaults;

			for (var key in Particle.list) {
				if (!Particle.list.hasOwnProperty(key)) continue;
				var p = Particle.list[key];
				var speed = p.speed * options.speed;
				if (oldX > x) {
					if (options.invertX)
						p.x += speed;
					else
						p.x -= speed;
				}
				if (oldX < x)
					if (options.invertX)
						p.x -= speed;
					else
						p.x += speed;
				if (oldY > y)
					if (options.invertY)
						p.y += speed;
					else
						p.y -= speed;
				if (oldY < y)
					if (options.invertY)
						p.y -= speed;
					else
						p.y += speed;
			}
			oldX = x;
			oldY = y;
		}
    
    //refresh the canvas with new particles
		this.refresh = function(){
			Particle.list.length = 0;
			Particle.list = {}
			for (var i = 0; i < this.options.number; i++)
				var p = new Particle(this.options);
		}

		///////////////////
		// Initilization //
		///////////////////
		for (var i = 0; i < this.options.number; i++)
			var p = new Particle(this.options);

		var c = new Canvas(this.options);

		setInterval(function() {
			Canvas.update()
		}, this.options.refresh);

	}

	///////////////////////
	// Utility functions //
	///////////////////////
	//copies properties onto source obj
	function mergeDefault(source, props) {
		for (var i in props) {
			if (props.hasOwnProperty(i)) {
				source[i] = props[i];
			}
		}
		return source;
	}
	
	//returns random number
	function rnd(max = 1, floor = false) {
		if (floor)
			return Math.floor(Math.random() * max);
		else
			return Math.random() * max;
	}

	//returns specific color or a random color from an array
	function colorChecker(c) {
		if (c === 'random')
			return 'rgba(' + rnd(255, true) + ',' + rnd(255, true) + ',' + rnd(255, true) + ',' + rnd() + ')';
		else if (typeof c === 'string')
			return c;
		else if (Array.isArray(c)) {
			var i = rnd(c.length, true);
			return c[i];
		}
	}
}());
