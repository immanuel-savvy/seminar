"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _users = require("./handlers/users");
var _admin = require("./handlers/admin");
var _seminar = require("./handlers/seminar");
var router = function router(app) {
  app.get("/user/:user_id", _users.user);
  app.get("/get_admins", _admin.get_admins);
  app.get("/stats", _admin.stats);
  app.get("/seminar/:seminar_id", _seminar.seminar);
  app.post("/signup", _users.signup);
  app.post("/login", _users.login);
  app.post("/users", _users.users);
  app.post("/user_by_email", _users.user_by_email);
  app.post("/create_admin", _admin.create_admin);
  app.post("/update_user/:user", _users.update_user);
  app.post("/verify_email", _users.verify_email);
  app.post("/admin_login", _admin.admin_login);
  app.post("/new_seminar", _seminar.new_seminar);
  app.post("/seminars", _seminar.seminars);
  app.post("/update_seminar", _seminar.update_seminar);
  app.post("/remove_seminar/:seminar", _seminar.remove_seminar);
  app.post("/register_attendance", _seminar.register_attendance);
  app.post("/in_attendance", _seminar.in_attendance);
  app.post("/attendees", _seminar.attendees);
  app.post("/attended", _seminar.attended);
  app.post("/user_seminars", _seminar.user_seminars);
};
var _default = router;
exports.default = _default;