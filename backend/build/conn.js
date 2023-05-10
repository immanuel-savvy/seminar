"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gds = exports.default = exports.USER_SEMINARS = exports.USERS_HASH = exports.USERS = exports.TRENDING_ARTICLES = exports.TEAM_MEMBER = exports.SPEAKERS = exports.SEMINARS = exports.REVIEWS = exports.REPLIES = exports.PENDING_TALKS = exports.GLOBALS = exports.CONFERENCES = exports.COMMENTS = exports.ATTENDANT = exports.ARTICLE_CATEGORIES = exports.ARTICLES = exports.ADMIN_HASH = exports.ADMINSTRATORS = void 0;
var _generalisedDatastore = _interopRequireDefault(require("generalised-datastore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var gds;
exports.gds = gds;
var USERS, ADMINSTRATORS, ADMIN_HASH, USERS_HASH, USER_SEMINARS, GLOBALS, TEAM_MEMBER, SPEAKERS, ATTENDANT, PENDING_TALKS, SEMINARS, ARTICLES, ARTICLE_CATEGORIES, COMMENTS, REVIEWS, REPLIES, CONFERENCES, TRENDING_ARTICLES;
exports.TRENDING_ARTICLES = TRENDING_ARTICLES;
exports.CONFERENCES = CONFERENCES;
exports.REPLIES = REPLIES;
exports.REVIEWS = REVIEWS;
exports.COMMENTS = COMMENTS;
exports.ARTICLE_CATEGORIES = ARTICLE_CATEGORIES;
exports.ARTICLES = ARTICLES;
exports.SEMINARS = SEMINARS;
exports.PENDING_TALKS = PENDING_TALKS;
exports.ATTENDANT = ATTENDANT;
exports.SPEAKERS = SPEAKERS;
exports.TEAM_MEMBER = TEAM_MEMBER;
exports.GLOBALS = GLOBALS;
exports.USER_SEMINARS = USER_SEMINARS;
exports.USERS_HASH = USERS_HASH;
exports.ADMIN_HASH = ADMIN_HASH;
exports.ADMINSTRATORS = ADMINSTRATORS;
exports.USERS = USERS;
var ds_conn = function ds_conn() {
  exports.gds = gds = new _generalisedDatastore.default("giit_seminar", process.env["PWD"].includes("www") ? process.env["PWD"].split("/").slice(0).join("/") : null).sync();
  exports.REVIEWS = REVIEWS = gds.folder("reviews");
  exports.ARTICLES = ARTICLES = gds.folder("articles", null, "categories");
  exports.CONFERENCES = CONFERENCES = gds.folder("conferences");
  exports.ARTICLE_CATEGORIES = ARTICLE_CATEGORIES = gds.folder("article_categories");
  exports.TRENDING_ARTICLES = TRENDING_ARTICLES = gds.folder("trending_articles", null, "article");
  exports.ADMINSTRATORS = ADMINSTRATORS = gds.folder("adminstrators");
  exports.USERS = USERS = gds.folder("users");
  exports.PENDING_TALKS = PENDING_TALKS = gds.folder("pending_talks", null, "user");
  exports.TEAM_MEMBER = TEAM_MEMBER = gds.folder("team_members");
  exports.SPEAKERS = SPEAKERS = gds.folder("speakers");
  exports.COMMENTS = COMMENTS = gds.folder("comments", "item");
  exports.REPLIES = REPLIES = gds.folder("replies", "comment");
  exports.ADMIN_HASH = ADMIN_HASH = gds.folder("admin_hash", "admin");
  exports.GLOBALS = GLOBALS = gds.folder("globals", "global");
  exports.USER_SEMINARS = USER_SEMINARS = gds.folder("user_seminars", "user", "seminar");
  exports.SEMINARS = SEMINARS = gds.folder("seminars");
  exports.ATTENDANT = ATTENDANT = gds.folder("attendant", "seminar", "user");
  exports.USERS_HASH = USERS_HASH = gds.folder("user_hash", "user");
};
var _default = ds_conn;
exports.default = _default;