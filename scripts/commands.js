
(function (game, win, doc, undefined) {

  'use strict';

  var PLAY = '\u25B6';
  var PAUSE = '\u2590\u2590';

  var isPlaying = false;

  var forEach = Array.prototype.forEach.call.bind(Array.prototype.forEach);
  var playBtn = doc.getElementById('play');

  function toggleGame() {
    var contents;
    isPlaying = !isPlaying;
    this.textContent = isPlaying ? PAUSE : PLAY;
    this.classList[isPlaying ? 'add' : 'remove']('is-playing');
    if ( !isPlaying ) {
      return;
    }
    contents = [];
    forEach(doc.querySelectorAll('.js-commands'), function (txt) {
      contents.push({
        player: txt.id.replace(/\D+/g, ''),
        commands: txt.value.trim()
      });
    });
    console.log(contents);
  }

  playBtn.addEventListener('click', toggleGame, false);

})(game, window, document);
