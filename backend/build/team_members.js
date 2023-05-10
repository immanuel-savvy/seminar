"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_team_member = exports.team_members = exports.remove_team_member = exports.add_team_member = void 0;
var _conn = require("../ds/conn");
var _utils = require("./utils");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var add_team_member = function add_team_member(req, res) {
  var data = req.body;
  data.image = (0, _utils.save_image)(data.image);
  var result = _conn.TEAM_MEMBER.write(data);
  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: data.image,
      created: result.created
    }
  });
};
exports.add_team_member = add_team_member;
var update_team_member = function update_team_member(req, res) {
  var data = req.body;
  data.image = (0, _utils.save_image)(data.image);
  var result = _conn.TEAM_MEMBER.update(data._id, _objectSpread({}, data));
  res.json({
    ok: true,
    data: {
      _id: result._id,
      image: data.image,
      created: result.created
    }
  });
};
exports.update_team_member = update_team_member;
var team_members = function team_members(req, res) {
  res.json({
    ok: true,
    data: _conn.TEAM_MEMBER.read()
  });
};
exports.team_members = team_members;
var remove_team_member = function remove_team_member(req, res) {
  var member = req.params.member;
  var result = _conn.TEAM_MEMBER.remove(member);
  result && (0, _utils.remove_image)(result.image);
  res.end();
};
exports.remove_team_member = remove_team_member;