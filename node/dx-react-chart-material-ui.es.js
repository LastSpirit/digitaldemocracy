/**
 * Bundle of @devexpress/dx-react-chart-material-ui
 * Generated: 2021-03-04
 * Version: 2.7.5
 * License: https://js.devexpress.com/Licensing
 */

import { createElement, useState, forwardRef } from 'react';
import { node, string, object, any, bool, oneOfType, func } from 'prop-types';
import { withComponents } from '@devexpress/dx-react-core';
import { withPatchedProps, Chart as Chart$1, Palette, Legend as Legend$1, Title as Title$1, ScatterSeries as ScatterSeries$1, Axis, ValueAxis as ValueAxis$1, ArgumentAxis as ArgumentAxis$1, Tooltip as Tooltip$1, ZoomAndPan as ZoomAndPan$1 } from '@devexpress/dx-react-chart';
export { AreaSeries, BarSeries, LineSeries, PieSeries, SplineSeries } from '@devexpress/dx-react-chart';
import { lighten, darken, alpha } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Popper from '@material-ui/core/Popper';
import { RIGHT, TOP } from '@devexpress/dx-chart-core';
import Paper from '@material-ui/core/Paper';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var getBorderColor = function getBorderColor(theme) {
  return theme.palette.type === 'light' ? 'rgba(224, 224, 224, 1)' : 'rgba(224, 224, 224, 1)';
};
var withClassName = function withClassName() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var setClassName = function setClassName(_ref) {
    var className = _ref.className,
        classes = _ref.classes,
        restProps = _objectWithoutProperties(_ref, ["className", "classes"]);

    return _objectSpread2({
      className: classNames(classes.root, className)
    }, restProps);
  }; // TODO: First candidate to `compose` util?


  return function (Target) {
    return withStyles.apply(void 0, args)(withPatchedProps(setClassName)(Target));
  };
};

var styles = function styles(theme) {
  var _theme$typography = theme.typography,
      fontFamily = _theme$typography.fontFamily,
      fontSize = _theme$typography.fontSize,
      fontWeightLight = _theme$typography.fontWeightLight;
  return {
    root: {
      fontFamily: fontFamily,
      fontSize: fontSize,
      fontWeight: fontWeightLight,
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
      boxSizing: 'border-box'
    }
  };
};

var Root = withClassName(styles)(Chart$1.Root);

var styles$1 = function styles(theme) {
  var fontFamily = theme.typography.fontFamily;
  return {
    root: {
      fill: theme.palette.text.secondary,
      fontFamily: fontFamily,
      fontSize: 12,
      fontWeight: 400
    }
  };
};

var Label = withClassName(styles$1)(Chart$1.Label);

var palette = ['#42A5F5', '#FF7043', '#9CCC65', '#FFCA28', '#26A69A', '#EC407A'];

var ChartWithPalette = function ChartWithPalette(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  return createElement(Chart$1, props, createElement(Palette, {
    scheme: palette
  }), children);
};

ChartWithPalette.components = Chart$1.components;
process.env.NODE_ENV !== "production" ? ChartWithPalette.propTypes = {
  children: node.isRequired
} : void 0;
var Chart = withComponents({
  Root: Root
})(ChartWithPalette);
Chart.Label = Label;

var styles$2 = function styles() {
  return {
    root: {
      paddingTop: 16,
      paddingBottom: 16
    }
  };
};

var Root$1 = withClassName(styles$2, {
  name: 'LegendRoot'
})(List);

var styles$3 = function styles() {
  return {
    root: {
      fontSize: 14,
      paddingLeft: 8,
      paddingRight: 8
    }
  };
};

var Label$1 = withClassName(styles$3, {
  name: 'LegendLabel'
})(function (_ref) {
  var text = _ref.text,
      restProps = _objectWithoutProperties(_ref, ["text"]);

  return createElement(ListItemText, restProps, text);
});

var styles$4 = function styles(theme) {
  return {
    root: {
      alignItems: 'center',
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5)
    }
  };
};

var Item = withClassName(styles$4, {
  name: 'LegendItem'
})(ListItem);

var Legend = withComponents({
  Root: Root$1,
  Item: Item,
  Label: Label$1
})(Legend$1);

var styles$5 = function styles() {
  return {
    root: {
      textAlign: 'center',
      width: '100%',
      marginBottom: '20px'
    }
  };
};

var Text = withClassName(styles$5, {
  name: 'Title'
})(function (_ref) {
  var text = _ref.text,
      restProps = _objectWithoutProperties(_ref, ["text"]);

  return createElement(Typography, _extends({
    component: "h3",
    variant: "h5"
  }, restProps), text);
});

var Title = withComponents({
  Text: Text
})(Title$1);

var styles$6 = function styles(theme) {
  return {
    point: {
      fill: theme.palette.background.paper
    }
  };
};

var setClassName = function setClassName(_ref) {
  var classes = _ref.classes,
      restProps = _objectWithoutProperties(_ref, ["classes"]);

  if (restProps.state) {
    var className = restProps.className,
        rest = _objectWithoutProperties(restProps, ["className"]);

    return _objectSpread2({
      className: classNames(classes.point, className)
    }, rest);
  }

  return restProps;
};

var Point = withStyles(styles$6)(withPatchedProps(setClassName)(ScatterSeries$1.Point));

var ScatterSeries = withComponents({
  Point: Point
})(ScatterSeries$1);

var styles$7 = function styles() {
  return {
    root: {
      shapeRendering: 'crispEdges'
    }
  };
};

var Root$2 = withClassName(styles$7)(Axis.Root);

var styles$8 = function styles(theme) {
  return {
    root: {
      stroke: getBorderColor(theme),
      shapeRendering: 'crispEdges'
    }
  };
};

var Tick = withClassName(styles$8)(Axis.Tick);

var styles$9 = function styles(theme) {
  var fontFamily = theme.typography.fontFamily;
  return {
    root: {
      fill: theme.palette.text.secondary,
      fontFamily: fontFamily,
      fontSize: 12,
      fontWeight: 400,
      backgroundColor: theme.palette.background.paper
    }
  };
};

var Label$2 = withClassName(styles$9)(Axis.Label);

var styles$a = function styles(theme) {
  return {
    root: {
      stroke: getBorderColor(theme),
      shapeRendering: 'crispEdges'
    }
  };
};

var Line = withClassName(styles$a)(Axis.Line);

var styles$b = function styles(theme) {
  return {
    root: {
      stroke: getBorderColor(theme),
      shapeRendering: 'crispEdges'
    }
  };
};

var Grid = withClassName(styles$b)(Axis.Grid);

var ValueAxis = withComponents({
  Root: Root$2,
  Tick: Tick,
  Label: Label$2,
  Line: Line,
  Grid: Grid
})(ValueAxis$1);

var ArgumentAxis = withComponents({
  Root: Root$2,
  Tick: Tick,
  Label: Label$2,
  Line: Line,
  Grid: Grid
})(ArgumentAxis$1);

var styles$c = function styles(theme) {
  var arrowSize = theme.spacing(1.2);
  return {
    'popper-top': {
      zIndex: 1,
      marginBottom: "".concat(arrowSize, "px")
    },
    'popper-right': {
      zIndex: 1,
      marginLeft: "".concat(arrowSize, "px")
    }
  };
};

var popperModifiers = function popperModifiers(arrowRef) {
  return {
    flip: {
      enabled: false
    },
    arrow: {
      element: arrowRef
    }
  };
};

var OverlayBase = function OverlayBase(_ref) {
  var classes = _ref.classes,
      className = _ref.className,
      children = _ref.children,
      target = _ref.target,
      rotated = _ref.rotated,
      ArrowComponent = _ref.arrowComponent,
      restProps = _objectWithoutProperties(_ref, ["classes", "className", "children", "target", "rotated", "arrowComponent"]);

  var _React$useState = useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      arrowRef = _React$useState2[0],
      setArrowRef = _React$useState2[1];

  var placement = rotated ? RIGHT : TOP;
  return createElement(Popper, _extends({
    open: true,
    anchorEl: target,
    placement: placement,
    className: classNames(classes["popper-".concat(placement)], className),
    modifiers: popperModifiers(arrowRef)
  }, restProps), children, createElement(ArrowComponent, {
    placement: placement,
    ref: setArrowRef
  }));
};

process.env.NODE_ENV !== "production" ? OverlayBase.propTypes = {
  className: string,
  classes: object.isRequired,
  children: node.isRequired,
  target: any.isRequired,
  rotated: bool.isRequired,
  arrowComponent: oneOfType([func, object]).isRequired
} : void 0;
OverlayBase.defaultProps = {
  className: undefined
};
var Overlay = withStyles(styles$c)(OverlayBase);

var styles$d = function styles(theme) {
  return {
    root: {
      fontSize: 14,
      padding: theme.spacing(0.5)
    }
  };
};

var Content = withClassName(styles$d, {
  name: 'TooltipContent'
})(function (_ref) {
  var text = _ref.text,
      targetItem = _ref.targetItem,
      restProps = _objectWithoutProperties(_ref, ["text", "targetItem"]);

  return createElement(Typography, restProps, text);
});

var styles$e = function styles(theme) {
  var arrowSize = theme.spacing(1.2);
  return {
    'arrow-top': {
      width: "".concat(arrowSize * 2, "px"),
      height: "".concat(arrowSize, "px"),
      position: 'absolute',
      top: '100%',
      overflow: 'hidden',
      '&::after': {
        content: '""',
        position: 'absolute',
        width: "".concat(arrowSize, "px"),
        height: "".concat(arrowSize, "px"),
        background: theme.palette.background.paper,
        transform: 'translateX(-50%) translateY(-50%) rotate(45deg)',
        left: '50%',
        boxShadow: theme.shadows[2]
      }
    },
    'arrow-right': {
      width: "".concat(arrowSize, "px"),
      height: "".concat(arrowSize * 2, "px"),
      position: 'absolute',
      top: '50%',
      transform: 'translateX(-100%)',
      overflow: 'hidden',
      '&::after': {
        content: '""',
        position: 'absolute',
        width: "".concat(arrowSize, "px"),
        height: "".concat(arrowSize, "px"),
        background: theme.palette.background.paper,
        transform: 'translateX(-50%) translateY(-50%) rotate(45deg)',
        top: '50%',
        left: '100%',
        boxShadow: theme.shadows[2]
      }
    }
  };
};

var BaseArrow = forwardRef(function (_ref, ref) {
  var classes = _ref.classes,
      className = _ref.className,
      placement = _ref.placement,
      restProps = _objectWithoutProperties(_ref, ["classes", "className", "placement"]);

  return createElement("div", _extends({
    className: classNames(classes["arrow-".concat(placement)], className),
    ref: ref
  }, restProps));
});
BaseArrow.propTypes = {
  placement: string.isRequired,
  classes: object.isRequired,
  className: string
};
BaseArrow.defaultProps = {
  className: undefined
};
var Arrow = withStyles(styles$e)(BaseArrow);

var styles$f = function styles(theme) {
  return {
    root: {
      padding: theme.spacing(0.5, 1)
    }
  };
};

var Sheet = withClassName(styles$f)(function (props) {
  return createElement(Paper, props);
});

var Tooltip = withComponents({
  Overlay: Overlay,
  Content: Content,
  Sheet: Sheet,
  Arrow: Arrow
})(Tooltip$1);

var styles$g = function styles(theme) {
  return {
    root: {
      fill: theme.palette.primary.main,
      opacity: 0.2
    }
  };
};

var DragBox = withClassName(styles$g)(ZoomAndPan$1.DragBox);

var ZoomAndPan = withComponents({
  DragBox: DragBox
})(ZoomAndPan$1);

export { ArgumentAxis, Chart, Legend, ScatterSeries, Title, Tooltip, ValueAxis, ZoomAndPan };
//# sourceMappingURL=dx-react-chart-material-ui.es.js.map
