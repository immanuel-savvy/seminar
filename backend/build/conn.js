"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gds = exports.default = exports.USER_SEMINARS = exports.USERS_HASH = exports.USERS = exports.SEMINARS = exports.GLOBALS = exports.ATTENDANT = exports.ADMIN_HASH = exports.ADMINSTRATORS = void 0;
var _generalisedDatastore = _interopRequireDefault(require("generalised-datastore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var gds;
exports.gds = gds;
var USERS, ADMINSTRATORS, ADMIN_HASH, USERS_HASH, USER_SEMINARS, GLOBALS, ATTENDANT, SEMINARS;
exports.SEMINARS = SEMINARS;
exports.ATTENDANT = ATTENDANT;
exports.GLOBALS = GLOBALS;
exports.USER_SEMINARS = USER_SEMINARS;
exports.USERS_HASH = USERS_HASH;
exports.ADMIN_HASH = ADMIN_HASH;
exports.ADMINSTRATORS = ADMINSTRATORS;
exports.USERS = USERS;
var ds_conn = function ds_conn() {
  exports.gds = gds = new _generalisedDatastore.default("giit_seminar", process.env["PWD"].includes("www") ? process.env["PWD"].split("/").slice(0).join("/") : null).sync();
  exports.ADMINSTRATORS = ADMINSTRATORS = gds.folder("adminstrators");
  exports.USERS = USERS = gds.folder("users");
  exports.ADMIN_HASH = ADMIN_HASH = gds.folder("admin_hash", "admin");
  exports.GLOBALS = GLOBALS = gds.folder("globals", "global");
  exports.USER_SEMINARS = USER_SEMINARS = gds.folder("user_seminars", "user", "seminar");
  exports.SEMINARS = SEMINARS = gds.folder("seminars");
  exports.ATTENDANT = ATTENDANT = gds.folder("attendant", "seminar", "user");
  exports.USERS_HASH = USERS_HASH = gds.folder("user_hash", "user");
};
var _default = ds_conn;
exports.default = _default;