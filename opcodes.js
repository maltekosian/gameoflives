(function () {
	'use strict';
	if (typeof window.game === 'undefined') {
		window.game = {};
	}

	game.opcodes = {
		'MOV': function (stack, counter) {
			console.log(stack);
			console.log(stack[counter]);
		},
		'PUSH': function () {
		}
	};
})();
