
(function (game, win, doc, undefined) {

  'use strict';

  var DEFAULT = '\u2013';
  var NEW_PLAYER_EVENT = 'newPlayer';

  var loopCounter = doc.getElementById('loop-counter'),
      players = doc.querySelectorAll('.js-player-count');

  function addNewPlayer(evnt, count) {
    var newPlayer = doc.createElement('p'),
        last;
    players = doc.querySelectorAll('.js-player-count');
    newPlayer.innerHTML = 'Player ' + count + ': <span class="js-player-count" id="player-count-' + count + '">&ndash;</span>';
    last = players[players.length - 1];
    last.parentNode.appendChild(newPlayer);
  }

  PubSub.subscribe(NEW_PLAYER_EVENT, addNewPlayer);

})(game, window, document);
