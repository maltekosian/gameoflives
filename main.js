(function (win) {
	var game = {};
	game.canvas = null;
	game.ctx = null;
	var body = null;
	game.stack = [];
  // cores players
  game.cores = [{
    'player': 1,
    'color': 'red'
  }, {
    'player': 2,
    'color': 'green'
  }];

	//this is a constructor function
	var StackObject = function (core, operation, arguments) {
		this.ops = operation || null;
		this.args = arguments || [];
		this.core = core || 0;
	};


	game.stackCounter = 0;

	game.update = true;

	game.interpreter = function () {
		//loop
		//for(var i = 0; i < game.stack.length; i++) {
		var i = game.stackCounter;
		if (game.stack[i] != null) {
			//do somethig like call the opcode
			try {
        var command = game.stack[i].ops;
        game.opcodes[command].call(game.stack, i, game.stack[i].args);
			}
			catch (ex) {
			}
		}
		game.stackCounter++;
		if (game.stackCounter >= game.stack.length) {
			game.stackCounter = 0;
		}
		//}
	};

	game.updateLoop = function () {
		if (game.update) {
			game.draw();
		} else {
			game.interpreter();
		}
		game.update = !game.update;
		//this is 30 of possible 60 fps
		requestAnimationFrame(function () {
			game.updateLoop();
		});
	};

	game.draw = function () {
		//draw the canvas here
    var ctx = game.ctx;
		var cw = game.canvas.height / 12;
		var fts = cw / 4;
		var elem = null;
		for (var j = 0; j < game.sizeY; j++) {
			for (var i = 0; i < game.sizeX; i++) {
				elem = game.stack[j * game.sizeX + i];
				ctx.strokeStyle = '#000';
				ctx.fillStyle = '#999';
				if (j * game.sizeX + i == game.stackCounter) {
					//
					ctx.strokeStyle = '#fd9';
					ctx.fillStyle = 'yellow';
				}
				ctx.fillRect((cw / 12 + cw) * i, (cw / 12 + cw) * j, cw, cw);
				ctx.strokeRect((cw / 12 + cw) * i, (cw / 12 + cw) * j, cw, cw);
				ctx.fillStyle = '#000';
				game.ctx.fillText(elem.ops, 3+(cw / 12 + cw) * i, 3+fts/2+(cw / 12 + cw) * j);
				for (var k = 0; k < elem.args.length; k++) {
					ctx.fillText(elem.args[k], 3+(cw / 12 + cw) * i, fts/2 + (3 + fts) * (k + 1) + (cw / 12 + cw) * j);
				}
			}
		}
	};
	game.init = function () {
		body = document.getElementById('game') || document.body;
    var canvas = document.createElement('canvas');
		canvas.width = body.offsetWidth || window.innerWidth;
		canvas.height = body.offsetHeight || window.innerHeight;
		canvas.style.width = canvas.width + 'px';
		canvas.style.height = canvas.height + 'px';
		game.ctx = canvas.getContext('2d');
		game.canvas = canvas;
		body.style.overflow = 'hidden';
		body.style.margin = 0;
		body.style.background = '#fff';
		body.appendChild(game.canvas);
		//need two text areas and help/docu
		game.sizeX = 10;
		game.sizeY = 10;

		for (var i = 0; i < (game.sizeX * game.sizeY); i++) {
			//
			game.stack.push(new StackObject(0, 'NOOP'));
		}

    game.stack[17] = new  StackObject(1, 'MOV', [-5]);
		requestAnimationFrame(function () {
			game.updateLoop();
		});
	};


	////// export
	win.game = game;
	win.onload = function () {
		setTimeout(game.init, 100)
	};
  win.StackObject = StackObject;
})(window);
