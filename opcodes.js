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
		'NOOP': function(counter) {
      // NOOP;
    },
    'MOV': function (counter, args) {
      // one argument, positive or negative steps, positive right, negative left
      var cell = this[counter];
      var newPosition = counter + args[0];
      var pos = calculatePosition(this, game.cores[cell.core].pointer, args[0]);
      this[pos] = this[counter];
      this[counter] = new StackObject(0, 'NOOP');
		},
    'COPY': function (counter, args) {
      var cell = this[counter];
      var pos = calculatePosition(this, game.cores[cell.core].pointer, args[0]);
      this[pos] = this[counter];
    },
		'JUMP': function (counter, args) {
      var cell = this[counter];
      var pos = calculatePosition(this, game.cores[cell.core].pointer, args[0]);
      game.cores[cell.core].pointer = pos;
		}
	};
  console.debug(window.game);

})();
