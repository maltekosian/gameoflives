
(function (game) {

  'use strict';

  var VALID_OPERATIONS = Object.keys(game.opcodes);
  var INVALID_OPERATION = 'The given command is invalid';

  function _parse(str) {
    var lines = str.split(/\r?\n/g);
    return lines.map(function (item, i) {
      var tmp = item.split(/\s+?/g),
          op = tmp[0].toUpperCase(),
          error = null;
      if ( VALID_OPERATIONS.indexOf(op) === -1 ) {
        error = {
          line: ++i,
          msg: INVALID_OPERATION
        };
      }
      return {
        operation: op,
        args: tmp.slice(1),
        error: error
      };
    });
  }

  game.parser = function (str) {
    var result = _parse(str);
    return result.map(function (item) {
      return {
        operation: item.operation,
        args: item.args
      };
    });
  };

  game.linter = function (str) {
    var result = _parse(str),
        errors = [];
    result.forEach(function (item) {
      if ( item.error ) {
        errors.push(item.error);
      }
    });
    return errors;
  };

})(game);
