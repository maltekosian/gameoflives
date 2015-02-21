(function () {
	'use strict';
	if (typeof game === 'undefined') {
		window.game = {};
    console.error('no game');
	}

  window.game.opcodes = {
		'NOOP': function(counter) {
      console.debug(counter, this[counter].args, 'owner', this[counter].core);
    },
    'MOV': function (counter, args) {
      // one argument, positive or negative steps, positive right, negative left
      var newPosition = counter + args[0];
      if (newPosition < 0) {
        newPosition = this.length + newPosition;
      } else if (newPosition > this.length) {
        newPosition = newPosition - this.length;
      }
      this[newPosition] = this[counter];
      this[counter] = new StackObject(0, 'NOOP');


		},
		'PUSH': function () {
		}
	};
  console.debug(window.game);

})();
