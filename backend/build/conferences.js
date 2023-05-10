"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conferences = void 0;
var _conn = require("../ds/conn");
var conferences = function conferences(req, res) {
  var _req$body = req.body,
    limit = _req$body.limit,
    skip = _req$body.skip,
    total_conferences = _req$body.total_conferences;
  var conferences_ = _conn.CONFERENCES.read(null, {
    limit: Number(limit),
    skip: skip
  });
  if (total_conferences) conferences_ = {
    conferences: conferences_,
    total_conferences: _conn.CONFERENCES.config.total_entries
  };
  res.json({
    ok: true,
    message: "conferences fetched",
    data: conferences_
  });
};
exports.conferences = conferences;