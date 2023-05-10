"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default_user = exports.create_default_admin = void 0;
var _conn = require("../ds/conn");
var default_admin = "adminstrators~123seminar~1234567890123",
  default_user = "users~123seminar~1234567890123";
exports.default_user = default_user;
var create_default_admin = function create_default_admin() {
  if (!_conn.ADMINSTRATORS.readone(default_admin)) {
    _conn.ADMINSTRATORS.write({
      firstname: "Seminar",
      lastname: "Africa",
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
      firstname: "Seminar",
      lastname: "Africa",
      verified: true,
      email: "seminarafrica@gmail.com"
    });
    _conn.USERS_HASH.write({
      user: default_user,
      key: "adminstrator#1"
    });
  }
};
exports.create_default_admin = create_default_admin;