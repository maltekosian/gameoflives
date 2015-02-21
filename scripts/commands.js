
(function (game, win, doc, undefined) {

  'use strict';

  var PLAY = '\u25B6';
  var PAUSE = '\u2590\u2590';

  var forEach = Array.prototype.forEach.call.bind(Array.prototype.forEach);
  var playBtn = doc.getElementById('play');

  function toggleGame() {
    var contents;
    this.textContent = !game.activity.start ? PAUSE : PLAY;
    this.classList[!game.activity.start ? 'add' : 'remove']('is-playing');
    if ( game.activity.start ) {
      game.pause();
      return;
    }
    contents = [];
    forEach(doc.querySelectorAll('.js-commands'), function (txt) {
      contents.push({
        player: txt.id.replace(/\D+/g, ''),
        commands: txt.value.trim()
      });
    });
    game.start();
    console.log(contents);
  }

  playBtn.addEventListener('click', toggleGame, false);

})(game, window, document);
