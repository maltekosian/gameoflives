(function (win) {
	var game = {};
	game.canvas = null;
	game.ctx = null;
	var body = null;
	game.stack = [];
  game.const = {};
  game.const.NEW_PLAYER_EVENT = 'newPlayer';
  game.const.GAME_RESET_EVENT = 'gameReset';
  game.const.COLORS = [[], ['red','rgba(255,100,100,0.5)'], ['green','rgba(100,255,100,0.5)'], ['blue','rgba(100,100,255,0.5)'], ['yellow','rgba(255,255,100,0.5)']];
  // cores players
  game.cores = [
    {
      'player': 'quartz',
      'color': 'white',
      'pColor': 'black'

    }
  ];

  game.activity = {
    ticks : 0,
    playersInGame: {},
    stop: false, //because game is not over
    pause: false,
    start: false
  };

  game.start = function () {

      game.activity.start = true;

  };

  game.pause = function () {
    if (!game.activity.pause) {
      game.activity.pause = true;
    } else {
      game.activity.pause = false;
    }
  };

  game.stop = function () {
    game.activity.ticks = 0;
    game.activity.stop = true;
    game.activity.start = false;
  };

  game.addCore = function (core) {
    var len = game.cores.length;
    if ( len > 4 ) {
      return;
    }
    game.cores.push({
      id: core.id,
      player: 'Core ' + core.id,
      color: game.const.COLORS[len][0],
      pColor: game.const.COLORS[len][1],
      pointer: 0
    });
  };

  game.addProgramToStack = function (user, program) {
    var newPosition = program.length + Math.floor(Math.random() * (game.stack.length - program.length));
    for(var i = 0; i < program.length; i++) {
      game.stack[newPosition + i] = new StackObject(user, program[i].operation, program[i].args);
    }
    //game.stack.push(new StackObject(playerId, operation, args));
  };

	//this is a constructor function
	var StackObject = function (core, operation, arguments) {
		this.ops = operation || null;
		this.args = arguments || [];
		this.core = core || 0;
	};


	game.update = true;

	game.interpreter = function (core) {
		//loop
		var i = core.pointer;
    //do somethig like call the opcode
    try {

      var command = game.stack[i].ops;
      game.opcodes[command].func.call(game.stack, i, game.stack[i].args);
    }
    catch (ex) {
      console.error(ex);
    }
    game.activity.playersInGame = {};
    for (i = 0; i < game.stack.length; i++) {
      var cell = game.stack[i].core;
      if (cell > 0) {
        if (typeof game.activity.playersInGame [cell] === 'undefined') {
          game.activity.playersInGame [cell] = 0;
        }
        game.activity.playersInGame [cell]++;
      }
    }
    if (Object.getOwnPropertyNames(game.activity.playersInGame).length <= 1) {
      game.activity.stop = true;
    }

		//}
	};

  game.foo = 'bar';

	game.updateLoop = function () {
		if (game.update) {
			game.draw();
		} else {
      if (!game.activity.stop && game.activity.start && !game.activity.pause) {
        for (var i in game.cores) {
          if (typeof game.cores[i].pointer !== 'undefined') {
            if (game.stack[game.cores[i].pointer].core == i) {
              game.interpreter(game.cores[i]);
            }
            game.cores[i].pointer++;
            if (game.cores[i].pointer >= game.stack.length) {
              game.cores[i].pointer = 0;
            }
          }
        }
        game.activity.ticks++;
        console.log(game.activity);
      }
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
    ctx.lineWidth = 1;
		var fts = cw / 4;
		var elem = null;
		for (var j = 0; j < game.sizeY; j++) {
			for (var i = 0; i < game.sizeX; i++) {
				elem = game.stack[j * game.sizeX + i];

        ctx.fillStyle = '#999';
        ctx.strokeStyle = '#000';
				if (elem.core > 0 && game.cores[elem.core]) {
          ctx.fillStyle = game.cores[elem.core].color;
        }
        ctx.fillRect((cw / 12 + cw) * i, (cw / 12 + cw) * j, cw, cw);
        ctx.strokeRect((cw / 12 + cw) * i, (cw / 12 + cw) * j, cw, cw);

        for (var ci in game.cores) {
          var core = game.cores[ci];
          if (j * game.sizeX + i == core.pointer) {
            //
            ctx.strokeStyle = '#f9o';
            ctx.fillStyle = core.pColor;
            ctx.fillRect((cw / 12 + cw) * i, (cw / 12 + cw) * j, cw, cw);
            ctx.strokeRect((cw / 12 + cw) * i, (cw / 12 + cw) * j, cw, cw);
          }
        }
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
		body.appendChild(game.canvas);
		//need two text areas and help/docu
		game.sizeX = 10;
		game.sizeY = 10;

		for (var i = 0; i < (game.sizeX * game.sizeY); i++) {
			game.stack.push(new StackObject(0, 'NOOP'));
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
  win.StackObject = StackObject;
})(window);
