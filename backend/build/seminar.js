"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user_seminars = exports.update_seminar = exports.seminars = exports.seminar = exports.remove_seminar = exports.register_attendance = exports.new_seminar = exports.in_attendance = exports.attendees = exports.attended = void 0;
var _conn = require("../ds/conn");
var _utils = require("./utils");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var seminars = function seminars(req, res) {
  var _req$body = req.body,
    limit = _req$body.limit,
    skip = _req$body.skip,
    query = _req$body.query;
  res.json({
    ok: true,
    data: _conn.SEMINARS.read(query, {
      limit: limit,
      skip: skip
    })
  });
};
exports.seminars = seminars;
var new_seminar = function new_seminar(req, res) {
  var seminar = req.body;
  seminar.images = seminar.images.map(function (img) {
    img.url = (0, _utils.save_image)(img.url);
    return img;
  });
  seminar.attendees = 0;
  var result = _conn.SEMINARS.write(seminar);
  seminar._id = result._id;
  seminar.created = result.created;
  res.json({
    ok: true,
    message: "seminar created",
    data: seminar
  });
};
exports.new_seminar = new_seminar;
var update_seminar = function update_seminar(req, res) {
  var seminar = req.body;
  seminar.images = seminar.images.map(function (img) {
    img.url = (0, _utils.save_image)(img.url);
    return img;
  });
  _conn.SEMINARS.update(seminar._id, _objectSpread({}, seminar));
  res.json({
    ok: true,
    message: "seminar updated",
    data: seminar
  });
};
exports.update_seminar = update_seminar;
var remove_seminar = function remove_seminar(req, res) {
  var seminar = req.params.seminar;
  _conn.SEMINARS.remove(seminar);
  _conn.ATTENDANT.remove({
    seminar: seminar
  });
  res.end();
};
exports.remove_seminar = remove_seminar;
var register_attendance = function register_attendance(req, res) {
  var _req$body2 = req.body,
    user = _req$body2.user,
    seminar = _req$body2.seminar;
  if (_conn.ATTENDANT.readone({
    user: user,
    seminar: seminar
  })) return res.end();
  _conn.ATTENDANT.write({
    user: user,
    seminar: seminar,
    attended: false
  });
  _conn.SEMINARS.update(seminar, {
    attendees: {
      $inc: 1
    }
  });
  _conn.USER_SEMINARS.write({
    user: user,
    seminar: seminar
  });
  res.end();
};
exports.register_attendance = register_attendance;
var seminar = function seminar(req, res) {
  var seminar_id = req.params.seminar_id;
  res.json({
    ok: true,
    data: _conn.SEMINARS.readone(seminar_id)
  });
};
exports.seminar = seminar;
var in_attendance = function in_attendance(req, res) {
  var _req$body3 = req.body,
    user = _req$body3.user,
    seminar = _req$body3.seminar;
  res.json({
    ok: true,
    data: _conn.ATTENDANT.readone({
      user: user,
      seminar: seminar
    })
  });
};
exports.in_attendance = in_attendance;
var attended = function attended(req, res) {
  var _req$body4 = req.body,
    user = _req$body4.user,
    seminar = _req$body4.seminar;
  _conn.ATTENDANT.update({
    user: user,
    seminar: seminar
  }, {
    attended: true
  });
  res.end();
};
exports.attended = attended;
var attendees = function attendees(req, res) {
  var _req$body5 = req.body,
    seminar = _req$body5.seminar,
    query = _req$body5.query,
    limit = _req$body5.limit,
    skip = _req$body5.skip;
  res.json({
    ok: true,
    data: _conn.ATTENDANT.read(_objectSpread({
      seminar: seminar
    }, query), {
      limit: limit,
      skip: skip
    })
  });
};
exports.attendees = attendees;
var user_seminars = function user_seminars(req, res) {
  var _req$body6 = req.body,
    user = _req$body6.user,
    limit = _req$body6.limit,
    skip = _req$body6.skip;
  res.json({
    ok: true,
    data: _conn.USER_SEMINARS.read({
      user: user
    }, {
      limit: limit,
      skip: skip
    })
  });
};
exports.user_seminars = user_seminars;