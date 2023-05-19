"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_vision = exports.update_sponsors = exports.update_speakers = exports.update_mission = exports.update_mentorship = exports.update_live_training = exports.update_internship = exports.update_event_highlight = exports.update_donation_section = exports.update_about_statement = exports.sponsors_page = exports.speakers_page = exports.mission_vision_statement = exports.mentorship = exports.live_training = exports.internship = exports.entry = exports.donation_section = exports.about_statement = exports.GLOBAL_sponsors = exports.GLOBAL_speakers = exports.GLOBAL_mentorship = exports.GLOBAL_live_training = exports.GLOBAL_internship = exports.GLOBAL_donation_section = exports.GLOBALS_vision_statement = exports.GLOBALS_mission_statement = exports.GLOBALS_about_statement = void 0;
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
    mission_title = _req$body.mission_title,
    mission = _req$body.mission,
    mission_file_hash = _req$body.mission_file_hash;
  if (!mission || !mission_file_hash || !mission_statement) return res.end();
  mission = (0, _utils.save_image)(mission);
  _conn.GLOBALS.update({
    global: GLOBALS_mission_statement
  }, {
    mission_statement: mission_statement,
    mission_title: mission_title,
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
    vision_title = _req$body2.vision_title,
    vision = _req$body2.vision,
    vision_file_hash = _req$body2.vision_file_hash;
  if (!vision || !vision_file_hash || !vision_statement) return res.end();
  vision = (0, _utils.save_image)(vision);
  _conn.GLOBALS.update({
    global: GLOBALS_vision_statement
  }, {
    vision_statement: vision_statement,
    vision_title: vision_title,
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
    more_details = _req$body3.more_details,
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
    more_details: more_details,
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
var update_event_highlight = function update_event_highlight(req, res) {
  var _req$body4 = req.body,
    event = _req$body4.event,
    images = _req$body4.images,
    video = _req$body4.video;
  images = images.map(function (img) {
    img.url = (0, _utils.save_image)(img.url);
    return img;
  });
  var Folder = event.startsWith("seminar") ? _conn.SEMINARS : _conn.CONFERENCES;
  Folder.update(event, {
    highlights: {
      images: images,
      video: video
    }
  });
  res.json({
    ok: true,
    data: {
      _id: event,
      images: images
    }
  });
};
exports.update_event_highlight = update_event_highlight;
var GLOBAL_live_training = "live_training";
exports.GLOBAL_live_training = GLOBAL_live_training;
var update_live_training = function update_live_training(req, res) {
  var _req$body5 = req.body,
    title = _req$body5.title,
    description = _req$body5.description,
    video = _req$body5.video,
    thumbnail = _req$body5.thumbnail,
    thumbnail_hash = _req$body5.thumbnail_hash;
  video = (0, _utils.save_video)(video);
  thumbnail = (0, _utils.save_image)(thumbnail);
  _conn.GLOBALS.update({
    global: GLOBAL_live_training
  }, {
    title: title,
    description: description,
    video: video,
    thumbnail: thumbnail,
    thumbnail_hash: thumbnail_hash
  });
  res.json({
    ok: true,
    data: {
      video: video,
      thumbnail: thumbnail
    }
  });
};
exports.update_live_training = update_live_training;
var live_training = function live_training(req, res) {
  res.json({
    ok: true,
    data: _conn.GLOBALS.readone({
      global: GLOBAL_live_training
    })
  });
};
exports.live_training = live_training;
var GLOBAL_donation_section = "donation_section";
exports.GLOBAL_donation_section = GLOBAL_donation_section;
var donation_section = function donation_section(req, res) {
  res.json({
    ok: true,
    data: _conn.GLOBALS.readone({
      global: GLOBAL_donation_section
    })
  });
};
exports.donation_section = donation_section;
var update_donation_section = function update_donation_section(req, res) {
  var _req$body6 = req.body,
    title = _req$body6.title,
    text = _req$body6.text,
    image = _req$body6.image,
    image_file_hash = _req$body6.image_file_hash;
  image = (0, _utils.save_image)(image);
  _conn.GLOBALS.update({
    global: GLOBAL_donation_section
  }, {
    title: title,
    text: text,
    image: image,
    image_file_hash: image_file_hash
  });
  res.json({
    ok: true,
    data: {
      image: image
    }
  });
};
exports.update_donation_section = update_donation_section;
var GLOBAL_mentorship = "mentorship";
exports.GLOBAL_mentorship = GLOBAL_mentorship;
var mentorship = function mentorship(req, res) {
  res.json({
    ok: true,
    data: _conn.GLOBALS.readone({
      global: GLOBAL_mentorship
    })
  });
};
exports.mentorship = mentorship;
var update_mentorship = function update_mentorship(req, res) {
  var _req$body7 = req.body,
    sections = _req$body7.sections,
    title = _req$body7.title,
    image = _req$body7.image,
    image_file_hash = _req$body7.image_file_hash;
  image = (0, _utils.save_image)(image);
  var result = _conn.GLOBALS.update({
    global: GLOBAL_mentorship
  }, {
    title: title,
    sections: sections,
    image: image,
    image_file_hash: image_file_hash
  });
  res.json({
    ok: true,
    data: {
      image: image,
      message: !result ? "Something went wrong!" : null
    }
  });
};
exports.update_mentorship = update_mentorship;
var GLOBAL_internship = "internship";
exports.GLOBAL_internship = GLOBAL_internship;
var internship = function internship(req, res) {
  res.json({
    ok: true,
    data: _conn.GLOBALS.readone({
      global: GLOBAL_internship
    })
  });
};
exports.internship = internship;
var update_internship = function update_internship(req, res) {
  var _req$body8 = req.body,
    sections = _req$body8.sections,
    title = _req$body8.title,
    image = _req$body8.image,
    image_file_hash = _req$body8.image_file_hash;
  image = (0, _utils.save_image)(image);
  var result = _conn.GLOBALS.update({
    global: GLOBAL_internship
  }, {
    title: title,
    sections: sections,
    image: image,
    image_file_hash: image_file_hash
  });
  res.json({
    ok: true,
    data: {
      image: image,
      message: !result ? "Something went wrong!" : null
    }
  });
};
exports.update_internship = update_internship;
var GLOBAL_sponsors = "sponsors";
exports.GLOBAL_sponsors = GLOBAL_sponsors;
var sponsors_page = function sponsors_page(req, res) {
  res.json({
    ok: true,
    data: _conn.GLOBALS.readone({
      global: GLOBAL_sponsors
    })
  });
};
exports.sponsors_page = sponsors_page;
var update_sponsors = function update_sponsors(req, res) {
  var _req$body9 = req.body,
    sections = _req$body9.sections,
    title = _req$body9.title,
    image = _req$body9.image,
    image_file_hash = _req$body9.image_file_hash;
  image = (0, _utils.save_image)(image);
  var result = _conn.GLOBALS.update({
    global: GLOBAL_sponsors
  }, {
    title: title,
    sections: sections,
    image: image,
    image_file_hash: image_file_hash
  });
  res.json({
    ok: true,
    data: {
      image: image,
      message: !result ? "Something went wrong!" : null
    }
  });
};
exports.update_sponsors = update_sponsors;
var GLOBAL_speakers = "speakers";
exports.GLOBAL_speakers = GLOBAL_speakers;
var speakers_page = function speakers_page(req, res) {
  res.json({
    ok: true,
    data: _conn.GLOBALS.readone({
      global: GLOBAL_speakers
    })
  });
};
exports.speakers_page = speakers_page;
var update_speakers = function update_speakers(req, res) {
  var _req$body10 = req.body,
    sections = _req$body10.sections,
    title = _req$body10.title,
    image = _req$body10.image,
    image_file_hash = _req$body10.image_file_hash;
  image = (0, _utils.save_image)(image);
  var result = _conn.GLOBALS.update({
    global: GLOBAL_speakers
  }, {
    title: title,
    sections: sections,
    image: image,
    image_file_hash: image_file_hash
  });
  res.json({
    ok: true,
    data: {
      image: image,
      message: !result ? "Something went wrong!" : null
    }
  });
};
exports.update_speakers = update_speakers;