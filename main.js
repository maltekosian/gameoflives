(function (win) {
	var game = {};
	game.canvas = null;
	game.ctx = null;
	var body = null;
	game.stack = [];
	//this is a class
	var StackObject = function () {
		this.ops = null;
		this.args = [];
	};

	game.opcodes = [
		{
			opcode: '', func: function () {
		}
		},
		{
			opscode: 'MOV', 'func': function () {

		}
		}];

//
	game.opscodes = {
		'MOV': function () {
		},
		'PUSH': function () {
		}
	};

	game.opscodes['BLUBB'] = function () {
		console.log('this is new');
	};

	game.callOpCode = function (ops, args) {
		for (var i = 0; i < game.opcodes.length; i++) {
			if (game.opcodes[i].opcode == ops) {
				return game.opcodes[i](args);
			}
		}
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
				game.stack[i].ops.call(game.stack, i);
				// Bgame[game.stack[i].ops](game.stack[i].args);
				//or
				//game.callOpCode(game.stack[i].ops, game.stack[i].args);
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
		var cw = canvas.height / 12;
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
					ctx.fillStyle = '#6d9';
				}
				ctx.fillRect((cw / 12 + cw) * i, (cw / 12 + cw) * j, cw, cw);
				ctx.strokeRect((cw / 12 + cw) * i, (cw / 12 + cw) * j, cw, cw);
				ctx.fillStyle = '#000';
				game.ctx.fillText(elem.ops, (3 + cw / 12 + cw) * i, (3 + fts + cw / 12 + cw) * j);
				for (var k = 0; k < 2; k++) {
					ctx.fillText(elem.args[k], (3 + cw / 12 + cw) * i, ((3 + fts) * (k + 1) + cw / 12 + cw) * j);
				}
			}
		}
	};
	game.init = function () {
		var canvas = document.createElement('canvas');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		canvas.style.width = window.innerWidth + 'px';
		canvas.style.height = window.innerHeight + 'px';
		game.ctx = canvas.getContext('2d');
		game.canvas = canvas;
    body = document.body;
		body.style.overflow = 'hidden';
		body.style.margin = 0;
		body.style.background = '#f0f';
		body.appendChild(game.canvas);
		//need two text areas and help/docu
		game.sizeX = 10;
		game.sizeY = 10;
		for (var i = 0; i < (game.sizeX * game.sizeY); i++) {
			//
			game.stack.push(new StackObject());
		}
		requestAnimationFrame(function () {
			game.updateLoop();
		});
	};


	////// export
	win.game = game;
	win.onload = function () {
		setTimeout(game.init, 100)
	};
})(window);
