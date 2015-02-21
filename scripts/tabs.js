
(function (game, win, doc, undefined) {

  'use strict';

  var CURRENT_CLASS = 'is-current';
  var NEW_PLAYER_EVENT = 'newPlayer';

  var forEach = Array.prototype.forEach.call.bind(Array.prototype.forEach);

  var tabs = doc.getElementById('tabs'),
      tabsContent = doc.getElementById('tabs-content'),
      addNew = doc.getElementById('new-player');

  function togglePane() {
    removeCurrentClasses(tabs.querySelectorAll('button[rel]'));
    removeCurrentClasses(tabs.querySelectorAll('.js-tab__pane'));
    this.classList.add(CURRENT_CLASS);
    doc.getElementById(this.getAttribute('rel')).classList.add(CURRENT_CLASS);
  }

  function removeCurrentClasses(elements) {
    forEach(elements, function (elem) {
      elem.classList.remove(CURRENT_CLASS);
    });
  }

  function addNewPlayer() {
    var newCount = doc.querySelectorAll('button[rel^="player-"]').length + 1,
        btn = doc.createElement('button'),
        pane = doc.createElement('div');
    btn.type = 'button';
    btn.setAttribute('rel', 'player-' + newCount);
    btn.className = 'tabs__btn';
    btn.textContent = 'Player ' + newCount;
    this.parentNode.insertBefore(btn, this);
    btn.addEventListener('click', togglePane, false);
    pane.className = 'tabs__pane js-tab__pane';
    pane.id = 'player-' + newCount;
    pane.innerHTML = '<textarea id="commands-player-' + newCount + '" \
      class="commands js-commands" \
      placeholder="Player ' + newCount + ', insert your commands &hellip;" \
      data-error-msg="error-player-' + newCount + '"></textarea>\
      <small class="error-msg" id="error-player-' + newCount + '"></small>';
    tabsContent.appendChild(pane);
    PubSub.publish(NEW_PLAYER_EVENT, newCount);
  }

  function lintInput(evnt) {
    var val,
        errors,
        errorMsg;
    if ( evnt.target.nodeName.toLowerCase() != 'textarea' || !evnt.target.classList.contains('js-commands') ) {
      return;
    }
    val = evnt.target.value.trim();
    errors = game.linter(val);
    errorMsg = doc.getElementById(evnt.target.getAttribute('data-error-msg'));
    if ( !errors.length || !val.length ) {
      errorMsg.classList.remove('is-visible');
      return;
    }
    errorMsg.textContent = createErrorMessage(errors);
    errorMsg.classList.add('is-visible');
  }

  function createErrorMessage(arr) {
    return arr.map(function (item) {
      return 'Line ' + item.line + ': ' + item.msg;
    }).join("\r\n");
  }

  forEach(tabs.querySelectorAll('button[rel]'), function (btn) {
    btn.addEventListener('click', togglePane, false);
  }, false);

  addNew.addEventListener('click', addNewPlayer, false);
  tabsContent.addEventListener('keyup', lintInput, false);

})(game, window, document);
