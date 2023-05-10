"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_vision = exports.update_mission = exports.update_about_statement = exports.mission_vision_statement = exports.entry = exports.about_statement = exports.GLOBALS_vision_statement = exports.GLOBALS_mission_statement = exports.GLOBALS_about_statement = void 0;
var _conn = require("../ds/conn");
var _utils = require("./utils");
var GLOBALS_mission_statement = "mission_statement",
  GLOBALS_vision_statement = "vision_statement",
  GLOBALS_about_statement = "about_statement";
exports.GLOBALS_about_statement = GLOBALS_about_statement;
exports.GLOBALS_vision_statement = GLOBALS_vision_statement;
exports.GLOBALS_mission_statement = GLOBALS_mission_statement;
var mission_vision_statement = function mission_vision_statement(req, res) {
  var vision = _conn.GLOBALS.readone({
      global: GLOBALS_vision_statement
    }),
    mission = _conn.GLOBALS.readone({
      global: GLOBALS_mission_statement
    });
  res.json({
    ok: true,
    data: {
      vision: vision,
      mission: mission
    }
  });
};
exports.mission_vision_statement = mission_vision_statement;
var update_mission = function update_mission(req, res) {
  var _req$body = req.body,
    mission_statement = _req$body.mission_statement,
    mission = _req$body.mission,
    mission_file_hash = _req$body.mission_file_hash;
  if (!mission || !mission_file_hash || !mission_statement) return res.end();
  mission = (0, _utils.save_image)(mission);
  _conn.GLOBALS.update({
    global: GLOBALS_mission_statement
  }, {
    mission_statement: mission_statement,
    mission: mission,
    mission_file_hash: mission_file_hash
  });
  res.json({
    ok: true,
    data: {
      mission: mission
    }
  });
};
exports.update_mission = update_mission;
var update_vision = function update_vision(req, res) {
  var _req$body2 = req.body,
    vision_statement = _req$body2.vision_statement,
    vision = _req$body2.vision,
    vision_file_hash = _req$body2.vision_file_hash;
  if (!vision || !vision_file_hash || !vision_statement) return res.end();
  vision = (0, _utils.save_image)(vision);
  _conn.GLOBALS.update({
    global: GLOBALS_vision_statement
  }, {
    vision_statement: vision_statement,
    vision: vision,
    vision_file_hash: vision_file_hash
  });
  res.json({
    ok: true,
    data: {
      vision: vision
    }
  });
};
exports.update_vision = update_vision;
var update_about_statement = function update_about_statement(req, res) {
  var _req$body3 = req.body,
    about_statement = _req$body3.about_statement,
    bullets = _req$body3.bullets,
    image = _req$body3.image,
    image_file_hash = _req$body3.image_file_hash;
  if (!image || !image_file_hash || !about_statement) return res.end();
  image = (0, _utils.save_image)(image);
  _conn.GLOBALS.update({
    global: GLOBALS_about_statement
  }, {
    about_statement: about_statement,
    image: image,
    bullets: bullets,
    image_file_hash: image_file_hash
  });
  res.json({
    ok: true,
    data: {
      image: image
    }
  });
};
exports.update_about_statement = update_about_statement;
var about_statement = function about_statement(req, res) {
  res.json({
    ok: true,
    data: _conn.GLOBALS.readone({
      global: GLOBALS_about_statement
    })
  });
};
exports.about_statement = about_statement;
var entry = function entry(req, res) {
  res.json({
    ok: true,
    data: {
      about: _conn.GLOBALS.readone({
        global: GLOBALS_about_statement
      }),
      vision: _conn.GLOBALS.readone({
        global: GLOBALS_vision_statement
      }),
      mission: _conn.GLOBALS.readone({
        global: GLOBALS_mission_statement
      })
    }
  });
};
exports.entry = entry;