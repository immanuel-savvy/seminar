"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_sponsor = exports.update_event_sponsors = exports.sponsors = exports.remove_sponsor = exports.new_sponsor = exports.event_sponsors = void 0;
var _conn = require("../ds/conn");
var _utils = require("./utils");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var new_sponsor = function new_sponsor(req, res) {
  var sponsor = req.body;
  sponsor.logo = (0, _utils.save_image)(sponsor.logo);
  var result = _conn.SPONSORS.write(sponsor);
  res.json({
    ok: true,
    data: {
      _id: result._id,
      logo: sponsor.logo,
      created: result.created
    }
  });
};
exports.new_sponsor = new_sponsor;
var update_sponsor = function update_sponsor(req, res) {
  var sponsor = req.body;
  sponsor.logo = (0, _utils.save_image)(sponsor.logo);
  _conn.SPONSORS.update(sponsor._id, _objectSpread({}, sponsor));
  res.json({
    ok: true,
    data: {
      logo: sponsor.logo,
      _id: sponsor._id,
      created: sponsor.created
    }
  });
};
exports.update_sponsor = update_sponsor;
var event_sponsors = function event_sponsors(req, res) {
  var event = req.params.event;
  var sponsors = _conn.EVENT_SPONSORS.readone({
    event: event
  });
  if (!sponsors) sponsors = new Array();else sponsors = _conn.SPONSORS.read(sponsors.sponsors);
  res.json({
    ok: true,
    data: sponsors
  });
};
exports.event_sponsors = event_sponsors;
var sponsors = function sponsors(req, res) {
  res.json({
    ok: true,
    data: _conn.SPONSORS.read()
  });
};
exports.sponsors = sponsors;
var update_event_sponsors = function update_event_sponsors(req, res) {
  var _req$body = req.body,
    event = _req$body.event,
    sponsors = _req$body.sponsors;
  var e_sponsor = _conn.EVENT_SPONSORS.readone({
    event: event,
    sponsors: sponsors
  });
  if (e_sponsor) {
    _conn.EVENT_SPONSORS.update({
      event: event,
      _id: e_sponsor._id
    }, {
      sponsors: sponsors
    });
  } else _conn.EVENT_SPONSORS.write({
    event: event,
    sponsors: sponsors
  });
  res.end();
};
exports.update_event_sponsors = update_event_sponsors;
var remove_sponsor = function remove_sponsor(req, res) {
  var sponsor = req.params.sponsor;
  var result = _conn.SPONSORS.remove(sponsor);
  result && (0, _utils.remove_image)(sponsor.logo);
  res.end();
};
exports.remove_sponsor = remove_sponsor;