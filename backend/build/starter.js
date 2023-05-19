"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default_user = exports.create_default_admin = void 0;
var _conn = require("../ds/conn");
var _articles = require("./articles");
var _reviews = require("./reviews");
var _settings = require("./settings");
var _speakers = require("./speakers");
var default_admin = "adminstrators~123seminar~1234567890123",
  default_user = "users~123seminar~1234567890123";
exports.default_user = default_user;
var create_default_admin = function create_default_admin() {
  if (!_conn.ADMINSTRATORS.readone(default_admin)) {
    _conn.ADMINSTRATORS.write({
      firstname: "GIIT",
      lastname: "Foundation",
      image: "logo_single.png",
      email: "admin@seminar.com".toLowerCase(),
      _id: default_admin
    });
    _conn.ADMIN_HASH.write({
      admin: default_admin,
      key: "adminstrator#1"
    });
  }
  var user_ = _conn.USERS.readone(default_user);
  if (!user_) {
    _conn.USERS.write({
      _id: default_user,
      firstname: "GIIT",
      lastname: "Foundation",
      verified: true,
      email: "seminarafrica@gmail.com"
    });
    _conn.USERS_HASH.write({
      user: default_user,
      key: "adminstrator#1"
    });
  }
  !_conn.GLOBALS.readone({
    global: _settings.GLOBALS_mission_statement
  }) && _conn.GLOBALS.write({
    global: _settings.GLOBALS_mission_statement
  });
  !_conn.GLOBALS.readone({
    global: _settings.GLOBALS_vision_statement
  }) && _conn.GLOBALS.write({
    global: _settings.GLOBALS_vision_statement
  });
  !_conn.GLOBALS.readone({
    global: _settings.GLOBALS_about_statement
  }) && _conn.GLOBALS.write({
    global: _settings.GLOBALS_about_statement
  });
  !_conn.GLOBALS.readone({
    global: _speakers.GLOBAL_pending_talks
  }) && _conn.GLOBALS.write({
    global: _speakers.GLOBAL_pending_talks,
    talks: new Array()
  });
  !_conn.GLOBALS.readone({
    global: _articles.GLOBAL_trending_articles
  }) && _conn.GLOBALS.write({
    global: _articles.GLOBAL_trending_articles,
    articles: new Array()
  });
  !_conn.GLOBALS.readone({
    global: _reviews.GLOBAL_alumni_overview
  }) && _conn.GLOBALS.write({
    global: _reviews.GLOBAL_alumni_overview
  });
  !_conn.GLOBALS.readone({
    global: _settings.GLOBAL_live_training
  }) && _conn.GLOBALS.write({
    global: _settings.GLOBAL_live_training
  });
  !_conn.GLOBALS.readone({
    global: _settings.GLOBAL_donation_section
  }) && _conn.GLOBALS.write({
    global: _settings.GLOBAL_donation_section
  });
  !_conn.GLOBALS.readone({
    global: _settings.GLOBAL_mentorship
  }) && _conn.GLOBALS.write({
    global: _settings.GLOBAL_mentorship
  });
  !_conn.GLOBALS.readone({
    global: _settings.GLOBAL_internship
  }) && _conn.GLOBALS.write({
    global: _settings.GLOBAL_internship
  });
  !_conn.GLOBALS.readone({
    global: _settings.GLOBAL_sponsors
  }) && _conn.GLOBALS.write({
    global: _settings.GLOBAL_sponsors
  });
  !_conn.GLOBALS.readone({
    global: _settings.GLOBAL_speakers
  }) && _conn.GLOBALS.write({
    global: _settings.GLOBAL_speakers
  });
};
exports.create_default_admin = create_default_admin;