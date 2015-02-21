
(function (game, win, doc, undefined) {

  'use strict';

  var DEFAULT = '\u2013';

  var loopCounter = doc.getElementById('loops-counter'),
      players = doc.querySelectorAll('.js-player-count');

  function addNewPlayer(evnt, count) {
    var newPlayer = doc.createElement('p'),
        last;
    newPlayer.innerHTML = 'Player ' + count + ': <span class="js-player-count" id="player-count-' + count + '">&ndash;</span>';
    last = players[players.length - 1];
    last.parentNode.appendChild(newPlayer);
    players = doc.querySelectorAll('.js-player-count');
  }

  // Reset Cycle-count & Player score
  function resetMeta() {
    [loopCounter].concat([].slice.call(players)).forEach(function (elem) {
      elem.textContent = DEFAULT;
    });
  }

  PubSub.subscribe(game.const.NEW_PLAYER_EVENT, addNewPlayer);
  PubSub.subscribe(game.const.GAME_RESET_EVENT, resetMeta);

})(game, window, document);
