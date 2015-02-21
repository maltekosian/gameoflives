(function () {
	'use strict';
	if (typeof game === 'undefined') {
		window.game = {};
    console.error('no game');
	}

  function calculatePosition(memory, position, crement) {
    var newPosition = position + crement;
    if (newPosition < 0) {
      newPosition = memory.length + newPosition;
    } else if (newPosition >= memory.length) {
      newPosition = newPosition - memory.length;
    }
    return newPosition;
  }

  window.game.opcodes = {
		'NOOP': {
      'func': function(counter) {
      // NOOP;
      },
      pseudo: 'NOOP'
    },
    'MOV': {
      func: function (counter, args) {
        // one argument, positive or negative steps, positive right, negative left
        var cell = this[counter];
        var pos = args[0] || 0;
        var cells = args[1] || 0;
        var npos = cells < 0 ? calculatePosition(this, game.cores[cell.core].pointer, cells) : game.cores[cell.core].pointer;
        var bucket = [];
        for (var i = 0; i <= Math.abs(cells); i++) {
          bucket.push(this[calculatePosition(this, npos, i)]);
          this[calculatePosition(this, npos, i)] = new StackObject(0, 'NOOP');
        }
        for (var i = 0; i < bucket.length; i++) {
          this[calculatePosition(this, npos, i + pos)] = bucket[i];
        }
      },
      pseudo: 'MOV pos cells'
    },'COPY':{
      func: function (counter, args) {
      var cell = this[counter];
        var pos = calculatePosition(this, game.cores[cell.core].pointer, args[0]);
        this[pos] = this[counter];

      },
      pseudo: 'COPY pos cells'
    },
		'JUMP': {
      func: function (counter, args) {
        var cell = this[counter];
        var pos = calculatePosition(this, game.cores[cell.core].pointer, args[0]);
        game.cores[cell.core].pointer = pos;
      },
      pseudo: 'JUMP pos'
    }
};
})();
