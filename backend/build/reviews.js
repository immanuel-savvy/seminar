"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_alumni_overview = exports.reviews = exports.remove_review = exports.new_review = exports.approve_review = exports.alumni_overview = exports.GLOBAL_alumni_overview = void 0;
var _conn = require("../ds/conn");
var _utils = require("./utils");
var GLOBALS_verified_reviews = "verified_reviews";
var approve_review = function approve_review(req, res) {
  var review = req.params.review;
  var globals = _conn.GLOBALS.readone({
    global: GLOBALS_verified_reviews
  });
  if (globals) _conn.GLOBALS.update({
    global: GLOBALS_verified_reviews
  }, {
    reviews: {
      $push: review
    }
  });else _conn.GLOBALS.write({
    global: GLOBALS_verified_reviews,
    review: new Array(review)
  });
  _conn.REVIEWS.update(review, {
    verified: true
  });
  res.end();
};
exports.approve_review = approve_review;
var reviews = function reviews(req, res) {
  var _req$body = req.body,
    limit = _req$body.limit,
    verified = _req$body.verified;
  var reviews;
  var verified_reviews = _conn.GLOBALS.readone({
    global: GLOBALS_verified_reviews
  });
  if (!verified_reviews) reviews = new Array();else reviews = verified_reviews.reviews;
  reviews = _conn.REVIEWS.read(verified ? reviews : null, {
    exclude: verified ? null : reviews,
    limit: limit
  });
  res.json({
    ok: true,
    message: "reviews fetched",
    data: reviews
  });
};
exports.reviews = reviews;
var new_review = function new_review(req, res) {
  var review = req.body;
  review.image = (0, _utils.save_image)(review.image);
  var result = _conn.REVIEWS.write(review);
  review._id = result._id;
  review.created = result.created;
  if (review.verified) if (!!_conn.GLOBALS.readone({
    global: GLOBALS_verified_reviews
  })) _conn.GLOBALS.update({
    global: GLOBALS_verified_reviews
  }, {
    reviews: {
      $push: review._id
    }
  });else _conn.GLOBALS.write({
    global: GLOBALS_verified_reviews,
    reviews: new Array(review._id)
  });
  res.json({
    ok: true,
    message: "review added",
    data: review
  });
};
exports.new_review = new_review;
var remove_review = function remove_review(req, res) {
  var review = req.params.review;
  var review_ = _conn.REVIEWS.readone(review);
  if (!review_) return res.end();
  review_.image && !review_.user && (0, _utils.remove_image)(review_.image);
  review_.verified && _conn.GLOBALS.update({
    global: GLOBALS_verified_reviews
  }, {
    reviews: {
      $splice: review
    }
  });
  _conn.REVIEWS.remove(review);
  res.json({
    ok: true,
    message: "review removed",
    data: review
  });
};
exports.remove_review = remove_review;
var GLOBAL_alumni_overview = "alumni_overview";
exports.GLOBAL_alumni_overview = GLOBAL_alumni_overview;
var alumni_overview = function alumni_overview(req, res) {
  var alumni_overview_ = _conn.GLOBALS.readone({
    global: GLOBAL_alumni_overview
  });
  res.json({
    ok: true,
    message: "alumni overview",
    data: alumni_overview_
  });
};
exports.alumni_overview = alumni_overview;
var update_alumni_overview = function update_alumni_overview(req, res) {
  var _req$body2 = req.body,
    video = _req$body2.video,
    thumbnail = _req$body2.thumbnail,
    image_hash = _req$body2.image_hash;
  video = (0, _utils.save_video)(video), thumbnail = (0, _utils.save_image)(thumbnail);
  var alumni_overview = _conn.GLOBALS.readone({
    global: GLOBAL_alumni_overview
  });
  alumni_overview && (thumbnail.startsWith("data") && (0, _utils.remove_image)(alumni_overview.thumbnail), video.startsWith("data") && (0, _utils.remove_video)(alumni_overview.video));
  _conn.GLOBALS.update({
    global: GLOBAL_alumni_overview
  }, {
    video: video,
    thumbnail: thumbnail,
    image_hash: image_hash
  });
  res.json({
    ok: true,
    message: "alumni overview updated",
    data: {
      video: video,
      thumbnail: thumbnail
    }
  });
};
exports.update_alumni_overview = update_alumni_overview;