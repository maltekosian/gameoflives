
(function (game, win, doc, undefined) {

  'use strict';

  var PLAY = '\u25B6';
  var PAUSE = '\u2590\u2590';

  var forEach = Array.prototype.forEach.call.bind(Array.prototype.forEach);
  var playBtn = doc.getElementById('play');
  var resetBtn = doc.getElementById('reset');

  function toggleGame() {
    var contents;
    this.textContent = !game.activity.pause ? PAUSE : PLAY;
    this.classList[!game.activity.start ? 'add' : 'remove']('is-playing');
    if (game.activity.start ) {
      game.pause();
      return;
    }
    contents = [];
    forEach(doc.querySelectorAll('.js-commands'), function (txt) {
      var program = game.parser(txt.value.trim()),
          playerId = parseInt(txt.id.replace(/\D+/g, ''), 10);
      contents.push({
        player: playerId,
        core: program
      });
      game.addCore({
        id: playerId
      });
      game.addProgramToStack(playerId, program);
    });
    game.start();
  }

  function stopGame() {
    if ( game.activity.stop ) {
      return;
    }
    if ( game.activity.start ) {
      toggleGame.call(playBtn);
    }
    game.activity.stop = true;
    PubSub.publish(game.const.GAME_RESET_EVENT);
  }

  function initGame() {
    if(!game.activity.pause) {
      toggleGame.call(playBtn);
    }
    game.init();
  }

  playBtn.addEventListener('click', toggleGame, false);
  resetBtn.addEventListener('click', initGame, false);

})(game, window, document);
