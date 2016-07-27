/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, CalculatorGUI_1) {
	    "use strict";
	    __webpack_require__(5);
	    new CalculatorGUI_1.CalculatorGUI(document.getElementById('calculator-gui-container'));
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, HTMLElementGenerator_1, Calculator_1) {
	    "use strict";
	    var attribute = HTMLElementGenerator_1.HTMLAttrKeyValuePair;
	    var element = HTMLElementGenerator_1.HTMLElementProperties;
	    var event = HTMLElementGenerator_1.HTMLEventKeyValuePair;
	    var NumberOp = (function () {
	        function NumberOp(token, width) {
	            this.token = token;
	            this.width = width;
	            if (typeof (this.token) === 'number') {
	                if (this.token > 0) {
	                    this.ev = function (token) {
	                        var display = this.display;
	                        if (display.getAttribute('dirty') === 'false') {
	                            display.value = token;
	                        }
	                        else if (display.getAttribute('dirty') === 'true') {
	                            display.value += token;
	                        }
	                        display.setAttribute('dirty', true);
	                        display.setAttribute('allowZero', true);
	                    };
	                }
	                else if (this.token === 0) {
	                    this.ev = function (token) {
	                        var display = this.display;
	                        if (display.getAttribute('allowZero') === 'true') {
	                            display.value += token;
	                        }
	                    };
	                }
	            }
	            else if (typeof (this.token) === 'string') {
	                if (this.token === 'C') {
	                    this.ev = function () {
	                        var display = this.display;
	                        display.value = '0';
	                        display.setAttribute('dirty', false);
	                        display.setAttribute('allowZero', false);
	                        display.setAttribute('numOps', 0);
	                    };
	                }
	                else if (this.token === '=') {
	                    this.ev = function () {
	                        var display = this.display;
	                        var calcResult = this.calculator.calc(display.value);
	                        if (calcResult.error) {
	                            alert(calcResult.errorMessage);
	                        }
	                        else {
	                            display.value = calcResult.result;
	                        }
	                    };
	                }
	                else {
	                    this.ev = function (token) {
	                        var display = this.display;
	                        var numOps = display.getAttribute('numOps');
	                        if (numOps === 1) {
	                            if (this.token !== '+' || this.token !== '-') {
	                                return;
	                            }
	                        }
	                        else if (numOps === 2) {
	                            return;
	                        }
	                        if (display.value === '0') {
	                            display.value = token;
	                        }
	                        else {
	                            display.value += token;
	                        }
	                        display.setAttribute('dirty', true);
	                        display.setAttribute('allowZero', false);
	                        display.setAttribute('numOps', parseInt(display.getAttribute('numOps') + 1, 10));
	                    };
	                }
	            }
	        }
	        return NumberOp;
	    }());
	    var CalculatorGUI = (function () {
	        function CalculatorGUI(container) {
	            this.calculator = new Calculator_1.Calculator();
	            this.container = container;
	            this.generator = new HTMLElementGenerator_1.HTMLElementGenerator();
	            this.render();
	        }
	        CalculatorGUI.prototype.renderNumberOpCell = function (numberOp) {
	            return this.generator.createElement(new element({
	                type: 'div',
	                className: 'mobile-sm-' + numberOp.width,
	                children: [
	                    new element({
	                        type: 'input',
	                        value: numberOp.token,
	                        className: 'mobile-sm-12',
	                        attrs: [
	                            new attribute('type', 'button'),
	                        ],
	                        events: [
	                            new event('click', numberOp.ev.bind(this, numberOp.token))
	                        ]
	                    })
	                ]
	            }));
	        };
	        CalculatorGUI.prototype.renderDisplayRow = function () {
	            this.display = this.generator.createElement(new element({
	                type: 'input',
	                id: 'calculator-display',
	                className: 'mobile-sm-12',
	                value: '0',
	                attrs: [
	                    new attribute('readonly', true),
	                    new attribute('type', 'text'),
	                    new attribute('dirty', false),
	                    new attribute('allowZero', false),
	                    new attribute('numOps', 0),
	                ]
	            }));
	            return this.generator.createElement(new element({
	                type: 'div',
	                className: 'group',
	                children: [
	                    new element({
	                        type: 'div',
	                        className: 'mobile-sm-12',
	                        children: [
	                            this.display
	                        ]
	                    })
	                ]
	            }));
	        };
	        CalculatorGUI.prototype.renderNumberOpRow = function (numbersOps) {
	            var _this = this;
	            var rowChildren = new Array();
	            numbersOps.forEach(function (x) { return rowChildren.push(_this.renderNumberOpCell(x)); });
	            return this.generator.createElement(new element({
	                type: 'div',
	                className: 'group',
	                children: rowChildren
	            }));
	        };
	        CalculatorGUI.prototype.render = function () {
	            var NumOp = NumberOp;
	            var calculator = this.generator.createElement(new element({
	                type: 'div',
	                id: 'calculator',
	                className: 'container',
	                children: [
	                    this.renderDisplayRow(),
	                    this.renderNumberOpRow([new NumOp('C', 3), new NumOp('(', 3), new NumOp(')', 3), new NumOp('/', 3)]),
	                    this.renderNumberOpRow([new NumOp(7, 3), new NumOp(8, 3), new NumOp(9, 3), new NumOp('x', 3)]),
	                    this.renderNumberOpRow([new NumOp(4, 3), new NumOp(5, 3), new NumOp(6, 3), new NumOp('-', 3)]),
	                    this.renderNumberOpRow([new NumOp(1, 3), new NumOp(2, 3), new NumOp(3, 3), new NumOp('+', 3)]),
	                    this.renderNumberOpRow([new NumOp(0, 6), new NumOp('.', 3), new NumOp('=', 3)]),
	                ]
	            }));
	            this.container.appendChild(calculator);
	        };
	        return CalculatorGUI;
	    }());
	    exports.CalculatorGUI = CalculatorGUI;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    var HTMLAttrKeyValuePair = (function () {
	        function HTMLAttrKeyValuePair(key, value) {
	            this.key = key;
	            this.value = value;
	        }
	        return HTMLAttrKeyValuePair;
	    }());
	    exports.HTMLAttrKeyValuePair = HTMLAttrKeyValuePair;
	    var HTMLEventKeyValuePair = (function () {
	        function HTMLEventKeyValuePair(name, fn) {
	            this.eventName = name;
	            this.eventFn = fn;
	        }
	        return HTMLEventKeyValuePair;
	    }());
	    exports.HTMLEventKeyValuePair = HTMLEventKeyValuePair;
	    var HTMLElementProperties = (function (_super) {
	        __extends(HTMLElementProperties, _super);
	        function HTMLElementProperties(obj) {
	            _super.call(this);
	            var attrStr;
	            attrStr = 'type';
	            if (this.isDefinedWithValue(obj[attrStr])) {
	                this.type = obj[attrStr];
	            }
	            attrStr = 'id';
	            if (this.isDefinedWithValue(obj[attrStr])) {
	                this.id = obj[attrStr];
	            }
	            attrStr = 'className';
	            if (this.isDefinedWithValue(obj[attrStr])) {
	                this.className = obj[attrStr];
	            }
	            attrStr = 'text';
	            if (this.isDefinedWithValue(obj[attrStr])) {
	                this.text = obj[attrStr];
	            }
	            attrStr = 'value';
	            if (this.isDefinedWithValue(obj[attrStr])) {
	                this.value = obj[attrStr];
	            }
	            attrStr = 'attrs';
	            if (this.isDefinedWithValue(obj[attrStr])) {
	                this.attrs = obj[attrStr];
	            }
	            attrStr = 'styles';
	            if (this.isDefinedWithValue(obj[attrStr])) {
	                this.styles = obj[attrStr];
	            }
	            attrStr = 'events';
	            if (this.isDefinedWithValue(obj[attrStr])) {
	                this.events = obj[attrStr];
	            }
	            attrStr = 'children';
	            if (this.isDefinedWithValue(obj[attrStr])) {
	                this.children = obj[attrStr];
	            }
	        }
	        HTMLElementProperties.prototype.isDefinedWithValue = function (obj) {
	            return typeof obj !== 'undefined' && obj !== null;
	        };
	        return HTMLElementProperties;
	    }(Object));
	    exports.HTMLElementProperties = HTMLElementProperties;
	    exports.HTMLElementsTypes = [
	        'table',
	        'caption',
	        'tbody',
	        'thead',
	        'tfoot',
	        'tr',
	        'th',
	        'td',
	        'div',
	        'span',
	        'input',
	        'label',
	        'select'
	    ];
	    var HTMLElementGenerator = (function () {
	        function HTMLElementGenerator() {
	        }
	        HTMLElementGenerator.prototype.isDefined = function (obj) {
	            return typeof (obj) !== 'undefined';
	        };
	        HTMLElementGenerator.prototype.isDefinedWithValue = function (obj) {
	            return typeof (obj) !== 'undefined' && obj !== null;
	        };
	        HTMLElementGenerator.prototype.setElementText = function (el, text) {
	            if (this.isDefinedWithValue(el.innerText)) {
	                el.innerText = text;
	            }
	            else if (this.isDefinedWithValue(el.textContent)) {
	                el.textContent = text;
	            }
	        };
	        HTMLElementGenerator.prototype.generate = function (attributes) {
	            var el = document.createElement(attributes.type);
	            if (this.isDefinedWithValue(attributes.id) && attributes.id.length > 0) {
	                el.id = attributes.id;
	            }
	            if (this.isDefinedWithValue(attributes.className) && attributes.className.length > 0) {
	                el.className = attributes.className;
	            }
	            if (this.isDefinedWithValue(attributes.text)) {
	                this.setElementText(el, attributes.text.toString());
	            }
	            if (this.isDefinedWithValue(attributes.value)) {
	                var valueStr = 'value';
	                el[valueStr] = attributes.value;
	            }
	            if (this.isDefinedWithValue(attributes.attrs) && attributes.attrs.length > 0) {
	                for (var i = 0; i < attributes.attrs.length; ++i) {
	                    var attrKey = attributes.attrs[i].key;
	                    var attrValue = attributes.attrs[i].value;
	                    if (attrKey.length > 0) {
	                        el.setAttribute(attrKey, attrValue.toString());
	                    }
	                }
	            }
	            if (this.isDefinedWithValue(attributes.styles) && attributes.styles.length > 0) {
	                for (var i = 0; i < attributes.styles.length; ++i) {
	                    var styleKey = attributes.styles[i].key;
	                    var styleValue = attributes.styles[i].value;
	                    if (this.isDefinedWithValue(el.style[styleKey])) {
	                        el.style[styleKey] = styleValue;
	                    }
	                }
	            }
	            if (this.isDefinedWithValue(attributes.events) && attributes.events.length > 0) {
	                for (var i = 0; i < attributes.events.length; ++i) {
	                    var eventName = attributes.events[i].eventName;
	                    var eventFn = attributes.events[i].eventFn;
	                    var eventNameFallBack = 'on' + eventName;
	                    if ((this.isDefined(el[eventName]) || this.isDefined(el[eventNameFallBack]))
	                        && typeof eventFn === 'function') {
	                        el[eventNameFallBack] = eventFn;
	                    }
	                }
	            }
	            if (this.isDefinedWithValue(attributes.children) && attributes.children.length > 0) {
	                for (var i = 0; i < attributes.children.length; ++i) {
	                    var child = null;
	                    if (attributes.children[i] instanceof HTMLElementProperties) {
	                        child = this.generate(attributes.children[i]);
	                    }
	                    else {
	                        child = attributes.children[i];
	                    }
	                    if (this.isDefinedWithValue(child)) {
	                        el.appendChild(child);
	                    }
	                }
	            }
	            return el;
	        };
	        HTMLElementGenerator.prototype.createElement = function (attributes) {
	            if (this.isDefinedWithValue(attributes.type) && exports.HTMLElementsTypes[attributes.type] !== null) {
	                if (this.isDefinedWithValue(attributes)) {
	                    return this.generate(attributes);
	                }
	            }
	        };
	        return HTMLElementGenerator;
	    }());
	    exports.HTMLElementGenerator = HTMLElementGenerator;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, CharUtils_1) {
	    "use strict";
	    var EvalResult = (function () {
	        function EvalResult() {
	            this.error = false;
	            this.errorMessage = null;
	            this.result = 0;
	        }
	        EvalResult.prototype.setError = function (msg) {
	            this.error = true;
	            this.errorMessage = 'Error: ' + msg;
	            this.result = null;
	        };
	        EvalResult.prototype.reset = function () {
	            this.error = false;
	            this.errorMessage = null;
	            this.result = 0;
	        };
	        return EvalResult;
	    }());
	    exports.EvalResult = EvalResult;
	    var Calculator = (function () {
	        function Calculator() {
	            this.result = new EvalResult();
	        }
	        Calculator.prototype.orderOperationsGreater = function (curOp, nextOp) {
	            return nextOp > curOp;
	        };
	        Calculator.prototype.getTokenIndex = function (counter) {
	            while (this.expression[counter] === CharUtils_1.CharUtils.WHITESPACE) {
	                counter += 1;
	            }
	            return counter;
	        };
	        Calculator.prototype.setTokenIndex = function () {
	            while (this.expression[this.counter] === CharUtils_1.CharUtils.WHITESPACE) {
	                this.counter += 1;
	            }
	        };
	        Calculator.prototype.power = function (num, exp) {
	            if (exp > 1) {
	                return num * this.power(num, exp - 1);
	            }
	            return num;
	        };
	        Calculator.prototype.getNextNumber = function () {
	            var num = 0;
	            var token = this.expression[this.counter];
	            var zero = '0';
	            do {
	                num *= 10;
	                num += (token - zero);
	                this.counter += 1;
	                this.setTokenIndex();
	                token = this.expression[this.counter];
	            } while (CharUtils_1.CharUtils.IsNumber(token));
	            return num;
	        };
	        Calculator.prototype.getTokenType = function (token) {
	            if (token === CharUtils_1.CharUtils.OPEN_BRACE) {
	                return CharUtils_1.TOKEN_TYPES.START_EXP;
	            }
	            else if (token === CharUtils_1.CharUtils.CLOSE_BRACE) {
	                return CharUtils_1.TOKEN_TYPES.END_EXP;
	            }
	            else if (CharUtils_1.CharUtils.IsOp(token)) {
	                return CharUtils_1.TOKEN_TYPES.OP;
	            }
	            else if (CharUtils_1.CharUtils.IsNumber(token)) {
	                return CharUtils_1.TOKEN_TYPES.NUMBER;
	            }
	            else {
	                return CharUtils_1.TOKEN_TYPES.INVALID;
	            }
	        };
	        Calculator.prototype.getOpType = function (token) {
	            switch (token) {
	                case CharUtils_1.CharUtils.ADDER:
	                    return CharUtils_1.OP_TYPES.ADD;
	                case CharUtils_1.CharUtils.SUBTRACTER:
	                    return CharUtils_1.OP_TYPES.SUBTRACT;
	                case CharUtils_1.CharUtils.MULTIPLIER:
	                    return CharUtils_1.OP_TYPES.MULTIPLY;
	                case CharUtils_1.CharUtils.MULTIPLIER2:
	                    return CharUtils_1.OP_TYPES.MULTIPLY;
	                case CharUtils_1.CharUtils.DIVIDER:
	                    return CharUtils_1.OP_TYPES.DIVIDE;
	                case CharUtils_1.CharUtils.EXPONENT:
	                    return CharUtils_1.OP_TYPES.POWER;
	                case CharUtils_1.CharUtils.OPEN_BRACE:
	                    return CharUtils_1.OP_TYPES.NEW_EXPRESSION;
	                default:
	                    return CharUtils_1.OP_TYPES.NO_OP;
	            }
	        };
	        Calculator.prototype.performOp = function (lhs, rhs, op) {
	            var opStr;
	            if (op !== null) {
	                opStr = 'Performing Op:\t' + lhs.result + ' ' + op + ' ' + rhs.result + ' = ';
	            }
	            switch (op) {
	                case CharUtils_1.CharUtils.ADDER:
	                    lhs.result += rhs.result;
	                    break;
	                case CharUtils_1.CharUtils.SUBTRACTER:
	                    lhs.result -= rhs.result;
	                    break;
	                case CharUtils_1.CharUtils.MULTIPLIER:
	                    lhs.result *= rhs.result;
	                    break;
	                case CharUtils_1.CharUtils.MULTIPLIER2:
	                    lhs.result *= rhs.result;
	                    break;
	                case CharUtils_1.CharUtils.DIVIDER:
	                    lhs.result /= rhs.result;
	                    break;
	                case CharUtils_1.CharUtils.EXPONENT:
	                    lhs.result = this.power(lhs.result, rhs.result);
	                    break;
	                default:
	                    lhs.result = rhs.result;
	                    break;
	            }
	            if (op !== null) {
	                opStr += lhs.result;
	                console.log(opStr);
	            }
	        };
	        Calculator.prototype.parse = function (result) {
	            var op = null, token = null, nextToken = null;
	            var parenFlag = false, negativeFlag = false;
	            var nextCounter = 0, consecutiveOps = 0;
	            var nextResult = new EvalResult();
	            var opType = null;
	            var tokenType = null, lastTokenType = null;
	            if (this.counter === 0) {
	                parenFlag = this.expression[this.counter] === CharUtils_1.CharUtils.OPEN_BRACE;
	            }
	            else if (this.counter > 1) {
	                parenFlag = this.expression[this.counter - 1] === CharUtils_1.CharUtils.OPEN_BRACE;
	            }
	            while (this.counter < this.expressionLen) {
	                this.setTokenIndex();
	                lastTokenType = tokenType;
	                token = this.expression[this.counter];
	                tokenType = this.getTokenType(token);
	                switch (tokenType) {
	                    case (CharUtils_1.TOKEN_TYPES.START_EXP):
	                        this.counter += 1;
	                        nextResult.reset();
	                        nextResult = this.parse(nextResult);
	                        if (nextResult.error) {
	                            return nextResult;
	                        }
	                        else if (this.expression[this.counter] !== CharUtils_1.CharUtils.CLOSE_BRACE) {
	                            nextResult.setError('Missing closing parentheses');
	                            return nextResult;
	                        }
	                        parenFlag = false;
	                        this.counter += 1;
	                        nextCounter = this.getTokenIndex(this.counter);
	                        nextToken = this.expression[nextCounter];
	                        if (this.orderOperationsGreater(opType, this.getOpType(nextToken))) {
	                            nextResult = this.parse(nextResult);
	                            if (nextResult.error) {
	                                return nextResult;
	                            }
	                            if (nextToken === CharUtils_1.CharUtils.OPEN_BRACE) {
	                                parenFlag = false;
	                            }
	                        }
	                        this.performOp(result, nextResult, op);
	                        break;
	                    case (CharUtils_1.TOKEN_TYPES.END_EXP):
	                        return result;
	                    case (CharUtils_1.TOKEN_TYPES.OP):
	                        opType = this.getOpType(token);
	                        if (lastTokenType === CharUtils_1.TOKEN_TYPES.OP) {
	                            consecutiveOps += 1;
	                            if (consecutiveOps > 2) {
	                                result.setError('Too many consecutive operations');
	                                return result;
	                            }
	                            if (token === CharUtils_1.CharUtils.ADDER) {
	                                negativeFlag = false;
	                            }
	                            else if (token === CharUtils_1.CharUtils.SUBTRACTER) {
	                                negativeFlag = true;
	                            }
	                            else if (token !== CharUtils_1.CharUtils.OPEN_BRACE) {
	                                result.setError('Illegal order of operations');
	                                return result;
	                            }
	                        }
	                        else {
	                            consecutiveOps = 1;
	                            op = token;
	                        }
	                        this.counter += 1;
	                        break;
	                    case (CharUtils_1.TOKEN_TYPES.NUMBER):
	                        nextResult.reset();
	                        nextResult.result = this.getNextNumber();
	                        if (negativeFlag) {
	                            nextResult.result *= -1;
	                        }
	                        nextCounter = this.getTokenIndex(this.counter);
	                        nextToken = this.expression[nextCounter];
	                        if (this.orderOperationsGreater(opType, this.getOpType(nextToken))) {
	                            nextResult = this.parse(nextResult);
	                            if (nextResult.error) {
	                                return nextResult;
	                            }
	                            if (nextToken === CharUtils_1.CharUtils.OPEN_BRACE) {
	                                parenFlag = false;
	                            }
	                        }
	                        this.performOp(result, nextResult, op);
	                        break;
	                    default:
	                        result.setError('Invalid token');
	                        return result;
	                }
	            }
	            if (parenFlag) {
	                result.setError('Missing closing parentheses');
	            }
	            return result;
	        };
	        Calculator.prototype.calc = function (expression) {
	            this.counter = 0;
	            this.expression = expression;
	            this.expressionLen = expression.length;
	            this.result = new EvalResult();
	            return this.parse(this.result);
	        };
	        return Calculator;
	    }());
	    exports.Calculator = Calculator;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    (function (TOKEN_TYPES) {
	        TOKEN_TYPES[TOKEN_TYPES["INVALID"] = 0] = "INVALID";
	        TOKEN_TYPES[TOKEN_TYPES["NUMBER"] = 1] = "NUMBER";
	        TOKEN_TYPES[TOKEN_TYPES["OP"] = 2] = "OP";
	        TOKEN_TYPES[TOKEN_TYPES["START_EXP"] = 3] = "START_EXP";
	        TOKEN_TYPES[TOKEN_TYPES["END_EXP"] = 4] = "END_EXP";
	    })(exports.TOKEN_TYPES || (exports.TOKEN_TYPES = {}));
	    var TOKEN_TYPES = exports.TOKEN_TYPES;
	    ;
	    (function (OP_TYPES) {
	        OP_TYPES[OP_TYPES["NO_OP"] = 0] = "NO_OP";
	        OP_TYPES[OP_TYPES["ADD"] = 1] = "ADD";
	        OP_TYPES[OP_TYPES["SUBTRACT"] = 1] = "SUBTRACT";
	        OP_TYPES[OP_TYPES["MULTIPLY"] = 2] = "MULTIPLY";
	        OP_TYPES[OP_TYPES["DIVIDE"] = 2] = "DIVIDE";
	        OP_TYPES[OP_TYPES["POWER"] = 3] = "POWER";
	        OP_TYPES[OP_TYPES["NEW_EXPRESSION"] = 4] = "NEW_EXPRESSION";
	    })(exports.OP_TYPES || (exports.OP_TYPES = {}));
	    var OP_TYPES = exports.OP_TYPES;
	    ;
	    var CharUtils = (function () {
	        function CharUtils() {
	        }
	        Object.defineProperty(CharUtils, "NUL", {
	            get: function () { return '\u0000'; },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        Object.defineProperty(CharUtils, "WHITESPACE", {
	            get: function () { return '\u0020'; },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        Object.defineProperty(CharUtils, "OPEN_BRACE", {
	            get: function () { return '\u0028'; },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        Object.defineProperty(CharUtils, "CLOSE_BRACE", {
	            get: function () { return '\u0029'; },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        Object.defineProperty(CharUtils, "EXPONENT", {
	            get: function () { return '\u005E'; },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        Object.defineProperty(CharUtils, "MULTIPLIER", {
	            get: function () { return '\u002A'; },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        Object.defineProperty(CharUtils, "MULTIPLIER2", {
	            get: function () { return '\u0078'; },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        Object.defineProperty(CharUtils, "DIVIDER", {
	            get: function () { return '\u002F'; },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        Object.defineProperty(CharUtils, "ADDER", {
	            get: function () { return '\u002B'; },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        Object.defineProperty(CharUtils, "SUBTRACTER", {
	            get: function () { return '\u002D'; },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        Object.defineProperty(CharUtils, "NUMBERS", {
	            get: function () {
	                return [
	                    '\u0030', '\u0031', '\u0032', '\u0033',
	                    '\u0034', '\u0035', '\u0036',
	                    '\u0037', '\u0038', '\u0039'
	                ];
	            },
	            enumerable: true,
	            configurable: true
	        });
	        CharUtils.IsNumber = function (token) {
	            return this.NUMBERS.indexOf(token) >= 0;
	        };
	        CharUtils.IsNumber2 = function (token) {
	            var charCode = token.charCodeAt(0);
	            return charCode >= 48 && charCode <= 57;
	        };
	        CharUtils.IsOp = function (token) {
	            return token === this.ADDER || token === this.SUBTRACTER
	                || token === this.MULTIPLIER || token === this.MULTIPLIER2
	                || token === this.DIVIDER || token === this.EXPONENT;
	        };
	        return CharUtils;
	    }());
	    exports.CharUtils = CharUtils;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);