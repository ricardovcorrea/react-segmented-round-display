"use strict";

var polarToCartesian = function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 180) * Math.PI / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
};

var drawArc = function drawArc(x, y, radius, startAngle, endAngle) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);
  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  var d = ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");
  return d;
};

var scaleValue = function scaleValue(value, from, to) {
  var scale = (to[1] - to[0]) / (from[1] - from[0]);
  var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
  return ~~(capped * scale + to[0]);
};
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _renderprops = require("react-spring/renderprops");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SegmentedRoundDisplay = function SegmentedRoundDisplay(_ref) {
  var segments = _ref.segments,
      arcWidth = _ref.arcWidth,
      emptyArcWidth = _ref.emptyArcWidth,
      arcSpacing = _ref.arcSpacing,
      totalArcSize = _ref.totalArcSize,
      emptyColor = _ref.emptyColor,
      filledColor = _ref.filledColor,
      radius = _ref.radius,
      displayValue = _ref.displayValue,
      style = _ref.style,
      animationDuration = _ref.animationDuration,
      animated = _ref.animated;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      arcs = _useState2[0],
      setArcs = _useState2[1];

  var totalArcs = segments.length;
  var totalSpaces = totalArcs - 1;
  var totalSpacing = totalSpaces * arcSpacing;
  var arcSize = (totalArcSize - totalSpacing) / totalArcs;
  var arcsStart = 90 - totalArcSize / 2;
  var margin = 10;
  var svgWidth = (radius + arcWidth) * 2;
  var svgHeight = (radius + arcWidth) * 2;
  var createArcs = (0, _react.useCallback)(function () {
    var newArcs = segments.map(function (goal, index) {
      var newArc = {
        centerX: radius + arcWidth,
        centerY: radius + arcWidth,
        start: arcsStart + index * arcSize,
        end: arcsStart + arcSize + index * arcSize
      };

      if (index !== 0) {
        newArc.start += arcSpacing * index;
        newArc.end += arcSpacing * index;
      }

      newArc.filled = scaleValue(goal.filled, [0, goal.total], [newArc.start, newArc.end]);
      return newArc;
    });
    setArcs(newArcs);
  }, [segments, arcSize, arcSpacing, arcWidth, arcsStart, radius]);

  var renderDisplayValue = function renderDisplayValue() {
    var arc = arcs[arcs.length - 1];

    if (!arc) {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
    }

    var pos = polarToCartesian(arc.centerX, arc.centerY, radius, arc.filled);
    return /*#__PURE__*/_react["default"].createElement("text", {
      x: pos.x,
      y: pos.y,
      fill: "red"
    }, displayValue);
  };

  (0, _react.useEffect)(function () {
    createArcs();
  }, [segments, createArcs]);
  return /*#__PURE__*/_react["default"].createElement("svg", {
    width: svgWidth,
    height: svgHeight,
    style: style
  }, arcs.map(function (arc, index) {
    return /*#__PURE__*/_react["default"].createElement("g", {
      key: index.toString()
    }, /*#__PURE__*/_react["default"].createElement("path", {
      fill: "none",
      stroke: emptyColor,
      strokeWidth: emptyArcWidth,
      strokeLinecap: "round",
      d: drawArc(arc.centerX, arc.centerY, radius, arc.start, arc.end)
    }), animated && /*#__PURE__*/_react["default"].createElement(_renderprops.Spring, {
      from: {
        x: arc.start,
        y: 0
      },
      to: {
        x: arc.filled + 0.6,
        y: arcWidth
      },
      config: {
        duration: animationDuration / totalArcs,
        delay: animationDuration / totalArcs * index
      }
    }, function (props) {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, arc.filled > arc.start && /*#__PURE__*/_react["default"].createElement("path", {
        fill: "none",
        stroke: filledColor,
        strokeWidth: props.y,
        strokeLinecap: "round",
        d: drawArc(arc.centerX, arc.centerY, radius, arc.start, props.x)
      }));
    }), !animated && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, arc.filled > arc.start && /*#__PURE__*/_react["default"].createElement("path", {
      fill: "none",
      stroke: filledColor,
      strokeWidth: arcWidth,
      strokeLinecap: "round",
      d: drawArc(arc.centerX, arc.centerY, radius, arc.start, arc.filled)
    })));
  }), displayValue !== '' && renderDisplayValue());
};

SegmentedRoundDisplay.propTypes = {
  segments: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    total: _propTypes["default"].number.isRequired,
    filled: _propTypes["default"].number.isRequired
  })),
  arcWidth: _propTypes["default"].number,
  emptyArcWidth: _propTypes["default"].number,
  arcSpacing: _propTypes["default"].number,
  totalArcSize: _propTypes["default"].number,
  radius: _propTypes["default"].number,
  emptyColor: _propTypes["default"].string,
  filledColor: _propTypes["default"].string,
  formatAmount: _propTypes["default"].func,
  style: _propTypes["default"].object,
  animationDuration: _propTypes["default"].number,
  animated: _propTypes["default"].bool
};
SegmentedRoundDisplay.defaultProps = {
  segments: [],
  arcWidth: 7,
  emptyArcWidth: 7,
  arcSpacing: 7,
  totalArcSize: 280,
  radius: 150,
  emptyColor: 'grey',
  filledColor: 'green',
  animationDuration: 700,
  animated: true
};
var _default = SegmentedRoundDisplay;
exports["default"] = _default;
