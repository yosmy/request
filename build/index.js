"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = void 0;

var _superagent = _interopRequireDefault(require("superagent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = function api(uri, device, authorization, payload) {
  return new Promise(function (resolve, reject) {
    var request = _superagent["default"].post(uri);

    if (device) {
      request.set('Device', device);
    }

    if (authorization) {
      request.set('Authorization', authorization);
    }

    request.send(payload);
    request.then(function (response) {
      resolve(response.body);
    })["catch"](function (err) {
      if (err.status === 500 || err.status === 502) {
        reject({
          code: "server"
        });
        return;
      }

      if (err.crossDomain || err.timeout) {
        reject({
          code: "connection"
        });
        return;
      }

      throw err;
    });
  });
};

exports.api = api;
