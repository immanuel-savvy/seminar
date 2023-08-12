"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user_conferences = exports.update_conference = exports.remove_conference = exports.register_conference_attendance = exports.new_conference = exports.in_conference_attendance = exports.conferences = exports.conference_attendees = exports.conference_attended = exports.conference = void 0;
var _conn = require("../ds/conn");
var _utils = require("./utils");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var conferences = function conferences(req, res) {
  var _req$body = req.body,
    limit = _req$body.limit,
    skip = _req$body.skip,
    query = _req$body.query,
    show_total = _req$body.show_total;
  var data = _conn.CONFERENCES.read(query, {
    limit: limit,
    skip: skip
  });
  if (show_total) data = {
    conferences: data,
    total: _conn.CONFERENCES.config.total_entries
  };
  res.json({
    ok: true,
    data: data
  });
};
exports.conferences = conferences;
var new_conference = function new_conference(req, res) {
  var conference = req.body;
  conference.images = conference.images.map(function (img) {
    img.url = (0, _utils.save_image)(img.url);
    return img;
  });
  conference.conference_attendees = 0;
  var result = _conn.CONFERENCES.write(conference);
  conference._id = result._id;
  conference.created = result.created;
  res.json({
    ok: true,
    message: "conference created",
    data: conference
  });
};
exports.new_conference = new_conference;
var update_conference = function update_conference(req, res) {
  var conference = req.body;
  conference.images = conference.images.map(function (img) {
    img.url = (0, _utils.save_image)(img.url);
    return img;
  });
  _conn.CONFERENCES.update(conference._id, _objectSpread({}, conference));
  res.json({
    ok: true,
    message: "conference updated",
    data: conference
  });
};
exports.update_conference = update_conference;
var remove_conference = function remove_conference(req, res) {
  var conference = req.params.conference;
  _conn.CONFERENCES.remove(conference);
  _conn.CONFERENCE_ATTENDANT.remove({
    conference: conference
  });
  res.end();
};
exports.remove_conference = remove_conference;
var register_conference_attendance = function register_conference_attendance(req, res) {
  var _req$body2 = req.body,
    user = _req$body2.user,
    conference = _req$body2.conference;
  if (_conn.CONFERENCE_ATTENDANT.readone({
    user: user,
    conference: conference
  })) return res.end();
  _conn.CONFERENCE_ATTENDANT.write({
    user: user,
    conference: conference,
    conference_attended: false
  });
  _conn.CONFERENCES.update(conference, {
    conference_attendees: {
      $inc: 1
    }
  });
  _conn.USER_CONFERENCES.write({
    user: user,
    conference: conference
  });
  res.end();
};
exports.register_conference_attendance = register_conference_attendance;
var conference = function conference(req, res) {
  var conference_id = req.params.conference_id;
  res.json({
    ok: true,
    data: _conn.CONFERENCES.readone(conference_id)
  });
};
exports.conference = conference;
var in_conference_attendance = function in_conference_attendance(req, res) {
  var _req$body3 = req.body,
    user = _req$body3.user,
    conference = _req$body3.conference;
  res.json({
    ok: true,
    data: _conn.CONFERENCE_ATTENDANT.readone({
      user: user,
      conference: conference
    })
  });
};
exports.in_conference_attendance = in_conference_attendance;
var conference_attended = function conference_attended(req, res) {
  var _req$body4 = req.body,
    user = _req$body4.user,
    conference = _req$body4.conference;
  _conn.CONFERENCE_ATTENDANT.update({
    user: user,
    conference: conference
  }, {
    conference_attended: true
  });
  res.end();
};
exports.conference_attended = conference_attended;
var conference_attendees = function conference_attendees(req, res) {
  var _req$body5 = req.body,
    conference = _req$body5.conference,
    query = _req$body5.query,
    limit = _req$body5.limit,
    skip = _req$body5.skip;
  res.json({
    ok: true,
    data: _conn.CONFERENCE_ATTENDANT.read(_objectSpread({
      conference: conference
    }, query), {
      limit: limit,
      skip: skip
    })
  });
};
exports.conference_attendees = conference_attendees;
var user_conferences = function user_conferences(req, res) {
  var _req$body6 = req.body,
    user = _req$body6.user,
    limit = _req$body6.limit,
    skip = _req$body6.skip;
  res.json({
    ok: true,
    data: _conn.USER_CONFERENCES.read({
      user: user
    }, {
      limit: limit,
      skip: skip
    })
  });
};
exports.user_conferences = user_conferences;