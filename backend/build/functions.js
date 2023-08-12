"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valid_id = exports.shuffle_array = exports.month_index = exports.get_timestamp_from_id = exports.generate_random_string = exports.gen_random_int = exports.copy_object = exports._id = void 0;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var month_index = new Object({
  0: "jan",
  1: "feb",
  2: "mar",
  3: "apr",
  4: "may",
  5: "jun",
  6: "jul",
  7: "aug",
  8: "sep",
  9: "oct",
  10: "nov",
  11: "dec"
});
exports.month_index = month_index;
var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var combinations = {
  alnum: charset,
  num: "01234556789",
  alpha: "abcdefghijklmnopqrstuvwxyz"
};
var gen_random_int = function gen_random_int(max_int) {
  var min_int = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return min_int + Math.floor(Math.random() * max_int);
};
exports.gen_random_int = gen_random_int;
var get_timestamp_from_id = function get_timestamp_from_id(_id) {
  var split_id = _id && _id.split("~");
  return split_id && split_id[2];
};
exports.get_timestamp_from_id = get_timestamp_from_id;
var generate_random_string = function generate_random_string(len, combination) {
  var string = "";
  combination = combinations[combination] || combinations["num"];
  for (var i = 0; i < (len || 6); i++) string += combination[gen_random_int(combination.length)];
  return string;
};
exports.generate_random_string = generate_random_string;
var _id = function _id(folder) {
  var random_value = "";
  for (var i = 0; i < gen_random_int(32, 12); i++) random_value += charset[gen_random_int(charset.length)];
  return "".concat(folder, "~").concat(random_value, "~").concat(Date.now());
};
exports._id = _id;
var valid_id = function valid_id(val) {
  if (typeof val !== "string" || !val) return;
  var splited = val.split("~");
  if (splited.length !== 3) return;
  return true;
};
exports.valid_id = valid_id;
var copy_object = function copy_object(object) {
  if (_typeof(object) !== "object") return object;
  var new_object = _objectSpread({}, object);
  for (var prop in new_object) {
    var val = new_object[prop];
    if (Array.isArray(val) && _typeof(val[0]) === "object" && val[0] && valid_id(val[0]._id)) new_object[val] = val.map(function (v) {
      return copy_object(v);
    });else if (_typeof(val) === "object" && val) new_object[val] = copy_object(val);
  }
  return new_object;
};
exports.copy_object = copy_object;
var shuffle_array = function shuffle_array(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};
exports.shuffle_array = shuffle_array;