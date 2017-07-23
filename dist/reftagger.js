/*!
 * reftagger v0.0.1
 * A reftagger for Arabic Holy Books.
 * https://github.com/alkotob/reftagger
 *
 * Copyright © 2017, Alkotob <alkotob.org>
 * Released under the MIT
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Reftagger"] = factory();
	else
		root["Reftagger"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _tippy = __webpack_require__(1);

	var _tippy2 = _interopRequireDefault(_tippy);

	var _quran = __webpack_require__(2);

	var _quran2 = _interopRequireDefault(_quran);

	var _bible = __webpack_require__(5);

	var _bible2 = _interopRequireDefault(_bible);

	var _tooltip = __webpack_require__(6);

	var _tooltip2 = _interopRequireDefault(_tooltip);

	var _domIterator = __webpack_require__(7);

	var _domIterator2 = _interopRequireDefault(_domIterator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * The main entry point for the reftagger of Alkotob
	 */
	var Reftagger = function () {
	  function Reftagger(ctx) {
	    _classCallCheck(this, Reftagger);

	    this._initialized = false;
	    this._tippy = null;
	    this._iterator;
	    this._ctx = ctx;

	    // Initialize the default settings for the class
	    this._settings = {
	      onPageLoad: true,
	      iframes: true, // From match.js
	      exclude: [], // From match.js
	      theme: 'alkotob' // dark, light, transparent, <custom>
	    };
	  }

	  /**
	   * Utility function for accessing the settings
	   */


	  _createClass(Reftagger, [{
	    key: 'init',


	    /**
	     * Initializes the functionality on the page, called within the library
	     * for initial page load and looks for the settings variable on the page.
	     */
	    value: function init() {
	      var self = this;
	      if (this._initialized) return;

	      // Start working on the options
	      var options = typeof window.refTagger !== 'undefined' ? window.refTagger : {};

	      // Update the settings with user defined values
	      Object.keys(options).forEach(function (key) {
	        if (typeof self._settings[key] !== 'undefined') {
	          self._settings[key] = options[key];
	        }
	      });

	      // Override the root object
	      window.refTagger = self;

	      self._initDOMDependencies();

	      // Tag references on page load
	      if (self.settings.onPageLoad) {
	        window.onload = function () {
	          return self.tag();
	        };
	      }

	      self._initialized = true;
	    }

	    /**
	     * This is the primary init function that runs regex on the HTML to find
	     * references. If a context is provided it will execute only within the
	     * context, otherwise it will execute on the document body. If no context
	     * is provided it will attempt to destroy previous matches so it doesn't
	     * double insert.
	     *
	     * @param ctx Actual DOM context to perform updates
	     */

	  }, {
	    key: 'tag',
	    value: function tag(ctx) {
	      var _this = this;

	      // TODO: implement DOM for ctx
	      var nodes = this._getTextNodes();

	      nodes.forEach(function (node) {
	        var references = [];

	        // Parse out all the references
	        references.push.apply(references, _toConsumableArray(_quran2.default.parse(node.textContent)));
	        references.push.apply(references, _toConsumableArray(_bible2.default.parse(node.textContent)));

	        references.sort(function (a, b) {
	          return b.order - a.order;
	        }) // Sort in reverse order
	        .forEach(function (ref) {
	          return _this._wrapReference(node, ref);
	        });
	      });

	      this._initTooltips();
	    }

	    /**
	     * Destroys all the references that have been made on the page.
	     */

	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var references = document.querySelectorAll('.alkotob-ayah');

	      // Replace them with the original text
	      for (var i = 0; i < references.length; i++) {
	        references[i].outerHTML = references[i].innerHTML;
	      }
	    }

	    /**
	     * Adds necessary elements to DOM
	     */

	  }, {
	    key: '_initDOMDependencies',
	    value: function _initDOMDependencies() {
	      var style = document.createElement('link');
	      style.setAttribute('rel', 'stylesheet');
	      style.setAttribute('type', 'text/css');
	      // style.setAttribute('href', 'https://cdn.rawgit.com/alkotob/reftagger/master/dist/reftagger.min.css'); // TODO: use own domain
	      style.setAttribute('href', '/dist/reftagger.min.css');
	      document.getElementsByTagName('head')[0].appendChild(style);

	      // Append tooltip html
	      document.body.innerHTML += _tooltip2.default;
	    }

	    /**
	     * Retrieves the text nodes that will contain references
	     */

	  }, {
	    key: '_getTextNodes',
	    value: function _getTextNodes() {
	      var _this2 = this;

	      var nodes = [];

	      this.iterator.forEachNode(NodeFilter.SHOW_TEXT, function (node) {
	        nodes.push(node);
	      }, function (node) {
	        if (_this2._matchesExclude(node.parentNode)) {
	          return NodeFilter.FILTER_REJECT;
	        } else {
	          return NodeFilter.FILTER_ACCEPT;
	        }
	      });

	      return nodes;
	    }

	    /**
	     * Wraps the instance element and class around matches that fit the start
	     * and end positions within the node
	     * @param  {HTMLElement} node - The DOM text node
	     * @return {Reference} Reference to replace it with
	     */

	  }, {
	    key: '_wrapReference',
	    value: function _wrapReference(node, ref) {
	      var startIdx = node.textContent.indexOf(ref.text);
	      if (startIdx === -1) return;

	      var startNode = node.splitText(startIdx);

	      var refEl = document.createElement('a');
	      refEl.setAttribute('href', ref.permalink);
	      refEl.setAttribute('target', '_blank');
	      refEl.setAttribute('class', 'alkotob-ayah');
	      refEl.setAttribute('data-text', ref.text);
	      refEl.setAttribute('data-type', ref.type);
	      refEl.setAttribute('data-book', ref.book);
	      refEl.setAttribute('data-chapter', ref.chapter);
	      refEl.setAttribute('data-verses', ref.verses);
	      refEl.setAttribute('data-permalink', ref.permalink);
	      refEl.textContent = ref.text;

	      // Get rid of actual text in following node
	      startNode.textContent = startNode.textContent.replace(ref.text, '');

	      // Insert it before the tailing statement
	      startNode.parentNode.insertBefore(refEl, startNode);
	    }

	    /**
	     * Checks if an element matches any of the specified exclude selectors. Also
	     * it checks for elements in which no marks should be performed (e.g.
	     * script and style tags) and optionally already marked elements
	     * @param  {HTMLElement} el - The element to check
	     * @return {boolean}
	     * @access protected
	     */

	  }, {
	    key: '_matchesExclude',
	    value: function _matchesExclude(el) {
	      return _domIterator2.default.matches(el, this.settings.exclude.concat([
	      // ignores the elements itself, not their childrens (selector *)
	      "script", "style", "title", "head", "html"]));
	    }

	    /**
	     * Inits tooltips across the site by looping through text elements and
	     * replacing it with reference tips.
	     */

	  }, {
	    key: '_initTooltips',
	    value: function _initTooltips() {
	      var self = this;

	      // Setup references to update elements
	      var template = document.getElementById('alkotob-tooltip');
	      var reference = document.getElementById('alkotob-reference');

	      self._tippy = (0, _tippy2.default)('.alkotob-ayah', {
	        position: 'auto',
	        arrow: true,
	        html: '#alkotob-tooltip',
	        interactive: true,
	        theme: self.settings.theme,
	        flipDuration: 0, // prevent a transition once tooltip size changes and updates position
	        onShow: function onShow() {
	          if (self._tippy.loading) return;
	          self._tippy.loading = true;

	          var el = self._tippy.getReferenceElement(this);
	          var matchText = el.getAttribute('data-text');
	          var bookType = el.getAttribute('data-type');
	          var book = el.getAttribute('data-book');
	          var chapter = el.getAttribute('data-chapter');
	          var verses = el.getAttribute('data-verses');
	          var permalink = el.getAttribute('data-permalink');

	          // Update the social media buttons
	          var fb = document.getElementById('alkotob-social-fb');
	          fb.setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(permalink));
	          var tw = document.getElementById('alkotob-social-tw');
	          tw.setAttribute('href', 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(permalink));
	          var read = document.getElementById('alkotob-readmore-link');
	          read.setAttribute('href', permalink);

	          // Update the reference in the tooltip
	          reference.innerHTML = matchText.trim();

	          self._tippy.update(this);

	          // TODO: load the api request
	          // fetch('https://unsplash.it/200/?random')
	          //   .then(resp => resp.blob())
	          //   .then(blob => {
	          //     const refData = self._tippy.getReferenceData(el);
	          //     template.innerHTML = `fjsdklfjdslkfjkdls ${new Date()}`;
	          //     self._tippy.loading = false;
	          //     self._tippy.update(this);
	          //   }).catch(e => {
	          //     // template.innerHTML = 'Loading failed';
	          //     self._tippy.loading = false;
	          //   });
	        },
	        onHide: function onHide() {
	          self._tippy.loading = false;
	        },
	        onHidden: function onHidden() {
	          // template.innerHTML = 'loading';
	        }
	      });
	    }
	  }, {
	    key: 'settings',
	    get: function get() {
	      return this._settings;
	    }

	    /**
	     * An instance of DOMIterator
	     * @type {DOMIterator}
	     * @access protected
	     */

	  }, {
	    key: 'iterator',
	    get: function get() {
	      return new _domIterator2.default(this._ctx || document, this.settings.iframes, this.settings.exclude);
	    }
	  }]);

	  return Reftagger;
	}();

	// Initialize on script load


	var tagger = new Reftagger();
	tagger.init();

	exports.default = Reftagger;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.tippy = factory());
	}(this, (function () { 'use strict';

	var Browser = {};

	if (typeof window !== 'undefined') {
	    Browser.SUPPORTED = 'requestAnimationFrame' in window;
	    Browser.SUPPORTS_TOUCH = 'ontouchstart' in window;
	    Browser.touch = false;
	    Browser.dynamicInputDetection = true;
	    // Chrome device/touch emulation can make this dynamic
	    Browser.iOS = function () {
	        return (/iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream
	        );
	    };
	}

	/**
	* The global storage array which holds all data reference objects
	* from every instance
	* This allows us to hide tooltips from all instances, finding the ref when
	* clicking on the body, and for followCursor
	*/
	var Store = [];

	/**
	* Selector constants used for grabbing elements
	*/
	var Selectors = {
	    POPPER: '.tippy-popper',
	    TOOLTIP: '.tippy-tooltip',
	    CONTENT: '.tippy-tooltip-content',
	    CIRCLE: '[x-circle]',
	    ARROW: '[x-arrow]',
	    TOOLTIPPED_EL: '[data-tooltipped]',
	    CONTROLLER: '[data-tippy-controller]'
	};

	/**
	* The default settings applied to each instance
	*/
	var Defaults = {
	    html: false,
	    position: 'top',
	    animation: 'shift',
	    animateFill: true,
	    arrow: false,
	    arrowSize: 'regular',
	    delay: 0,
	    trigger: 'mouseenter focus',
	    duration: 350,
	    interactive: false,
	    interactiveBorder: 2,
	    theme: 'dark',
	    size: 'regular',
	    distance: 10,
	    offset: 0,
	    hideOnClick: true,
	    multiple: false,
	    followCursor: false,
	    inertia: false,
	    flipDuration: 350,
	    sticky: false,
	    stickyDuration: 200,
	    appendTo: null,
	    zIndex: 9999,
	    touchHold: false,
	    performance: false,
	    popperOptions: {}
	};

	/**
	* The keys of the defaults object for reducing down into a new object
	* Used in `getIndividualSettings()`
	*/
	var DefaultsKeys = Browser.SUPPORTED && Object.keys(Defaults);

	/**
	* Hides all poppers
	* @param {Object} exclude - refData to exclude if needed
	*/
	function hideAllPoppers(exclude) {
	    Store.forEach(function (refData) {
	        var popper = refData.popper,
	            tippyInstance = refData.tippyInstance,
	            _refData$settings = refData.settings,
	            appendTo = _refData$settings.appendTo,
	            hideOnClick = _refData$settings.hideOnClick,
	            trigger = _refData$settings.trigger;

	        // Don't hide already hidden ones

	        if (!appendTo.contains(popper)) return;

	        // hideOnClick can have the truthy value of 'persistent', so strict check is needed
	        var isHideOnClick = hideOnClick === true || trigger.indexOf('focus') !== -1;
	        var isNotCurrentRef = !exclude || popper !== exclude.popper;

	        if (isHideOnClick && isNotCurrentRef) {
	            tippyInstance.hide(popper);
	        }
	    });
	}

	var matches = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || function (s) {
	    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
	        i = matches.length;
	    while (--i >= 0 && matches.item(i) !== this) {}
	    return i > -1;
	};

	/**
	* Ponyfill to get the closest parent element
	* @param {Element} element - child of parent to be returned
	* @param {String} parentSelector - selector to match the parent if found
	* @return {Element}
	*/
	function closest(element, parentSelector) {
	    var _closest = Element.prototype.closest || function (selector) {
	        var el = this;
	        while (el) {
	            if (matches.call(el, selector)) {
	                return el;
	            }
	            el = el.parentElement;
	        }
	    };

	    return _closest.call(element, parentSelector);
	}

	/**
	* Ponyfill for Array.prototype.find
	* @param {Array} arr
	* @param {Function} checkFn
	* @return item in the array
	*/
	function find(arr, checkFn) {
	  if (Array.prototype.find) {
	    return arr.find(checkFn);
	  }

	  // use `filter` as fallback
	  return arr.filter(checkFn)[0];
	}

	/**
	* Adds the needed event listeners
	*/
	function bindEventListeners() {
	    var touchHandler = function touchHandler() {
	        Browser.touch = true;

	        if (Browser.iOS()) {
	            document.body.classList.add('tippy-touch');
	        }

	        if (Browser.dynamicInputDetection) {
	            document.addEventListener('mousemove', mousemoveHandler);
	        }
	    };

	    var mousemoveHandler = function () {
	        var time = void 0;

	        return function () {
	            var now = performance && performance.now();

	            if (now && now - time < 10) {
	                Browser.touch = false;
	                document.removeEventListener('mousemove', mousemoveHandler);
	                if (!Browser.iOS() && document.body.classList.contains('tippy-touch')) {
	                    document.body.classList.remove('tippy-touch');
	                }
	            }

	            time = now;
	        };
	    }();

	    var clickHandler = function clickHandler(event) {

	        // Simulated events dispatched on the document
	        if (!(event.target instanceof Element)) {
	            return hideAllPoppers();
	        }

	        var el = closest(event.target, Selectors.TOOLTIPPED_EL);
	        var popper = closest(event.target, Selectors.POPPER);

	        if (popper) {
	            var ref = find(Store, function (ref) {
	                return ref.popper === popper;
	            });
	            var interactive = ref.settings.interactive;

	            if (interactive) return;
	        }

	        if (el) {
	            var _ref = find(Store, function (ref) {
	                return ref.el === el;
	            });
	            var _ref$settings = _ref.settings,
	                hideOnClick = _ref$settings.hideOnClick,
	                multiple = _ref$settings.multiple,
	                trigger = _ref$settings.trigger;

	            // Hide all poppers except the one belonging to the element that was clicked IF
	            // `multiple` is false AND they are a touch user, OR
	            // `multiple` is false AND it's triggered by a click

	            if (!multiple && Browser.touch || !multiple && trigger.indexOf('click') !== -1) {
	                return hideAllPoppers(_ref);
	            }

	            // If hideOnClick is not strictly true or triggered by a click don't hide poppers
	            if (hideOnClick !== true || trigger.indexOf('click') !== -1) return;
	        }

	        // Don't trigger a hide for tippy controllers, and don't needlessly run loop
	        if (closest(event.target, Selectors.CONTROLLER) || !document.querySelector(Selectors.POPPER)) return;

	        hideAllPoppers();
	    };

	    var blurHandler = function blurHandler(event) {
	        var _document = document,
	            el = _document.activeElement;

	        if (el && el.blur && matches.call(el, Selectors.TOOLTIPPED_EL)) {
	            el.blur();
	        }
	    };

	    // Hook events
	    document.addEventListener('click', clickHandler);
	    document.addEventListener('touchstart', touchHandler);
	    window.addEventListener('blur', blurHandler);

	    if (!Browser.SUPPORTS_TOUCH && (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)) {
	        document.addEventListener('pointerdown', touchHandler);
	    }
	}

	/**
	* To run a single time, once DOM is presumed to be ready
	* @return {Boolean} whether the function has run or not
	*/
	function init() {
	    if (init.done) return false;
	    init.done = true;

	    // If the script is in <head>, document.body is null, so it's set in the
	    // init function
	    Defaults.appendTo = document.body;

	    bindEventListeners();

	    return true;
	}

	/**
	* Waits until next repaint to execute a fn
	* @return {Function}
	*/
	function queueExecution(fn) {
	  window.requestAnimationFrame(function () {
	    setTimeout(fn, 0);
	  });
	}

	/**
	* Returns the supported prefixed property - only `webkit` is needed, `moz`, `ms` and `o` are obsolete
	* @param {String} property
	* @return {String} - browser supported prefixed property
	*/
	function prefix(property) {
	    var prefixes = [false, 'webkit'];
	    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

	    for (var i = 0; i < prefixes.length; i++) {
	        var _prefix = prefixes[i];
	        var prefixedProp = _prefix ? '' + _prefix + upperProp : property;
	        if (typeof window.document.body.style[prefixedProp] !== 'undefined') {
	            return prefixedProp;
	        }
	    }

	    return null;
	}

	/**
	* Ponyfill for Array.prototype.findIndex
	* @param {Array} arr
	* @param {Function} checkFn
	* @return index of the item in the array
	*/
	function findIndex(arr, checkFn) {
	  if (Array.prototype.findIndex) {
	    return arr.findIndex(checkFn);
	  }

	  // fallback
	  return arr.indexOf(find(arr, checkFn));
	}

	/**
	* Removes the title from the tooltipped element
	* @param {Element} el
	*/
	function removeTitle(el) {
	    var title = el.getAttribute('title');
	    el.setAttribute('data-original-title', title || 'html');
	    el.removeAttribute('title');
	}

	/**
	* Determines if an element is visible in the viewport
	* @param {Element} el
	* @return {Boolean}
	*/
	function elementIsInViewport(el) {
	    var rect = el.getBoundingClientRect();

	    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
	}

	/**
	* Triggers a document repaint or reflow for CSS transition
	* @param {Element} tooltip
	* @param {Element} circle
	*/
	function triggerReflow(tooltip, circle) {
	    // Safari needs the specific 'transform' property to be accessed
	    circle ? window.getComputedStyle(circle)[prefix('transform')] : window.getComputedStyle(tooltip).opacity;
	}

	/**
	* Modifies elements' class lists
	* @param {Element[]} els - Array of elements
	* @param {Function} callback
	*/
	function modifyClassList(els, callback) {
	    els.forEach(function (el) {
	        if (!el) return;
	        callback(el.classList);
	    });
	}

	/**
	* Applies the transition duration to each element
	* @param {Element[]} els - Array of elements
	* @param {Number} duration
	*/
	function applyTransitionDuration(els, duration) {
	    els.forEach(function (el) {
	        if (!el) return;

	        var isContent = matches.call(el, Selectors.CONTENT);

	        var _duration = isContent ? Math.round(duration / 1.3) : duration;

	        el.style[prefix('transitionDuration')] = _duration + 'ms';
	    });
	}

	/**
	* Determines if a popper is currently visible
	* @param {Element} popper
	* @return {Boolean}
	*/
	function isVisible(popper) {
	    return popper.style.visibility === 'visible';
	}

	function noop() {}

	/**
	* Returns the non-shifted placement (e.g., 'bottom-start' => 'bottom')
	* @param {String} placement
	* @return {String}
	*/
	function getCorePlacement(placement) {
	    return placement.replace(/-.+/, '');
	}

	/**
	* Mousemove event listener callback method for follow cursor setting
	* @param {MouseEvent} e
	*/
	function followCursorHandler(e) {
	    var _this = this;

	    var refData = find(Store, function (refData) {
	        return refData.el === _this;
	    });

	    var popper = refData.popper,
	        offset = refData.settings.offset;


	    var position = getCorePlacement(popper.getAttribute('x-placement'));
	    var halfPopperWidth = Math.round(popper.offsetWidth / 2);
	    var halfPopperHeight = Math.round(popper.offsetHeight / 2);
	    var viewportPadding = 5;
	    var pageWidth = document.documentElement.offsetWidth || document.body.offsetWidth;

	    var pageX = e.pageX,
	        pageY = e.pageY;


	    var x = void 0,
	        y = void 0;

	    switch (position) {
	        case 'top':
	            x = pageX - halfPopperWidth + offset;
	            y = pageY - 2.25 * halfPopperHeight;
	            break;
	        case 'left':
	            x = pageX - 2 * halfPopperWidth - 10;
	            y = pageY - halfPopperHeight + offset;
	            break;
	        case 'right':
	            x = pageX + halfPopperHeight;
	            y = pageY - halfPopperHeight + offset;
	            break;
	        case 'bottom':
	            x = pageX - halfPopperWidth + offset;
	            y = pageY + halfPopperHeight / 1.5;
	            break;
	    }

	    var isRightOverflowing = pageX + viewportPadding + halfPopperWidth + offset > pageWidth;
	    var isLeftOverflowing = pageX - viewportPadding - halfPopperWidth + offset < 0;

	    // Prevent left/right overflow
	    if (position === 'top' || position === 'bottom') {
	        if (isRightOverflowing) {
	            x = pageWidth - viewportPadding - 2 * halfPopperWidth;
	        }

	        if (isLeftOverflowing) {
	            x = viewportPadding;
	        }
	    }

	    popper.style[prefix('transform')] = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
	}

	/**
	* Returns an array of elements based on the selector input
	* @param {String|Element} selector
	* @return {Elements[]}
	*/
	function getArrayOfElements(selector) {
	    if (selector instanceof Element) {
	        return [selector];
	    }

	    return [].slice.call(document.querySelectorAll(selector));
	}

	/**
	* Prepares the callback functions for `show` and `hide` methods
	* @param {Object} refData -  the element/popper reference data
	* @param {Number} duration
	* @param {Function} callback - callback function to fire once transitions complete
	*/
	function onTransitionEnd(refData, duration, callback) {

	    // Make callback synchronous if duration is 0
	    if (!duration) {
	        return callback();
	    }

	    var tooltip = refData.popper.querySelector(Selectors.TOOLTIP);
	    var transitionendFired = false;

	    var listenerCallback = function listenerCallback(e) {
	        if (e.target !== tooltip) return;

	        transitionendFired = true;

	        tooltip.removeEventListener('webkitTransitionEnd', listenerCallback);
	        tooltip.removeEventListener('transitionend', listenerCallback);

	        callback();
	    };

	    // Wait for transitions to complete
	    tooltip.addEventListener('webkitTransitionEnd', listenerCallback);
	    tooltip.addEventListener('transitionend', listenerCallback);

	    // transitionend listener sometimes may not fire
	    clearTimeout(refData._transitionendTimeout);
	    refData._transitionendTimeout = setTimeout(function () {
	        !transitionendFired && callback();
	    }, duration);
	}

	/**!
	 * @fileOverview Kickass library to create and place poppers near their reference elements.
	 * @version 1.10.8
	 * @license
	 * Copyright (c) 2016 Federico Zivolo and contributors
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */
	var nativeHints = ['native code', '[object MutationObserverConstructor]'];

	/**
	 * Determine if a function is implemented natively (as opposed to a polyfill).
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Function | undefined} fn the function to check
	 * @returns {Boolean}
	 */
	var isNative = function isNative(fn) {
	  return nativeHints.some(function (hint) {
	    return (fn || '').toString().indexOf(hint) > -1;
	  });
	};

	var isBrowser = typeof window !== 'undefined';
	var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
	var timeoutDuration = 0;
	for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
	  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
	    timeoutDuration = 1;
	    break;
	  }
	}

	function microtaskDebounce(fn) {
	  var scheduled = false;
	  var i = 0;
	  var elem = document.createElement('span');

	  // MutationObserver provides a mechanism for scheduling microtasks, which
	  // are scheduled *before* the next task. This gives us a way to debounce
	  // a function but ensure it's called *before* the next paint.
	  var observer = new MutationObserver(function () {
	    fn();
	    scheduled = false;
	  });

	  observer.observe(elem, { attributes: true });

	  return function () {
	    if (!scheduled) {
	      scheduled = true;
	      elem.setAttribute('x-index', i);
	      i = i + 1; // don't use compund (+=) because it doesn't get optimized in V8
	    }
	  };
	}

	function taskDebounce(fn) {
	  var scheduled = false;
	  return function () {
	    if (!scheduled) {
	      scheduled = true;
	      setTimeout(function () {
	        scheduled = false;
	        fn();
	      }, timeoutDuration);
	    }
	  };
	}

	// It's common for MutationObserver polyfills to be seen in the wild, however
	// these rely on Mutation Events which only occur when an element is connected
	// to the DOM. The algorithm used in this module does not use a connected element,
	// and so we must ensure that a *native* MutationObserver is available.
	var supportsNativeMutationObserver = isBrowser && isNative(window.MutationObserver);

	/**
	* Create a debounced version of a method, that's asynchronously deferred
	* but called in the minimum time possible.
	*
	* @method
	* @memberof Popper.Utils
	* @argument {Function} fn
	* @returns {Function}
	*/
	var debounce = supportsNativeMutationObserver ? microtaskDebounce : taskDebounce;

	/**
	 * Check if the given variable is a function
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Any} functionToCheck - variable to check
	 * @returns {Boolean} answer to: is a function?
	 */
	function isFunction(functionToCheck) {
	  var getType = {};
	  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	/**
	 * Get CSS computed property of the given element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Eement} element
	 * @argument {String} property
	 */
	function getStyleComputedProperty(element, property) {
	  if (element.nodeType !== 1) {
	    return [];
	  }
	  // NOTE: 1 DOM access here
	  var css = window.getComputedStyle(element, null);
	  return property ? css[property] : css;
	}

	/**
	 * Returns the parentNode or the host of the element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Element} parent
	 */
	function getParentNode(element) {
	  if (element.nodeName === 'HTML') {
	    return element;
	  }
	  return element.parentNode || element.host;
	}

	/**
	 * Returns the scrolling parent of the given element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Element} scroll parent
	 */
	function getScrollParent(element) {
	  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
	  if (!element || ['HTML', 'BODY', '#document'].indexOf(element.nodeName) !== -1) {
	    return window.document.body;
	  }

	  // Firefox want us to check `-x` and `-y` variations as well

	  var _getStyleComputedProp = getStyleComputedProperty(element),
	      overflow = _getStyleComputedProp.overflow,
	      overflowX = _getStyleComputedProp.overflowX,
	      overflowY = _getStyleComputedProp.overflowY;

	  if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
	    return element;
	  }

	  return getScrollParent(getParentNode(element));
	}

	function isOffsetContainer(element) {
	  var nodeName = element.nodeName;

	  if (nodeName === 'BODY') {
	    return false;
	  }
	  return nodeName === 'HTML' || element.firstElementChild.offsetParent === element;
	}

	/**
	 * Finds the root node (document, shadowDOM root) of the given element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} node
	 * @returns {Element} root node
	 */
	function getRoot(node) {
	  if (node.parentNode !== null) {
	    return getRoot(node.parentNode);
	  }

	  return node;
	}

	/**
	 * Returns the offset parent of the given element
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Element} offset parent
	 */
	function getOffsetParent(element) {
	  // NOTE: 1 DOM access here
	  var offsetParent = element && element.offsetParent;
	  var nodeName = offsetParent && offsetParent.nodeName;

	  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
	    return window.document.documentElement;
	  }

	  return offsetParent;
	}

	/**
	 * Finds the offset parent common to the two provided nodes
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element1
	 * @argument {Element} element2
	 * @returns {Element} common offset parent
	 */
	function findCommonOffsetParent(element1, element2) {
	  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
	  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
	    return window.document.documentElement;
	  }

	  // Here we make sure to give as "start" the element that comes first in the DOM
	  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
	  var start = order ? element1 : element2;
	  var end = order ? element2 : element1;

	  // Get common ancestor container
	  var range = document.createRange();
	  range.setStart(start, 0);
	  range.setEnd(end, 0);
	  var commonAncestorContainer = range.commonAncestorContainer;

	  // Both nodes are inside #document

	  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
	    if (isOffsetContainer(commonAncestorContainer)) {
	      return commonAncestorContainer;
	    }

	    return getOffsetParent(commonAncestorContainer);
	  }

	  // one of the nodes is inside shadowDOM, find which one
	  var element1root = getRoot(element1);
	  if (element1root.host) {
	    return findCommonOffsetParent(element1root.host, element2);
	  } else {
	    return findCommonOffsetParent(element1, getRoot(element2).host);
	  }
	}

	/**
	 * Gets the scroll value of the given element in the given side (top and left)
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @argument {String} side `top` or `left`
	 * @returns {number} amount of scrolled pixels
	 */
	function getScroll(element) {
	  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

	  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
	  var nodeName = element.nodeName;

	  if (nodeName === 'BODY' || nodeName === 'HTML') {
	    var html = window.document.documentElement;
	    var scrollingElement = window.document.scrollingElement || html;
	    return scrollingElement[upperSide];
	  }

	  return element[upperSide];
	}

	/*
	 * Sum or subtract the element scroll values (left and top) from a given rect object
	 * @method
	 * @memberof Popper.Utils
	 * @param {Object} rect - Rect object you want to change
	 * @param {HTMLElement} element - The element from the function reads the scroll values
	 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
	 * @return {Object} rect - The modifier rect object
	 */
	function includeScroll(rect, element) {
	  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	  var scrollTop = getScroll(element, 'top');
	  var scrollLeft = getScroll(element, 'left');
	  var modifier = subtract ? -1 : 1;
	  rect.top += scrollTop * modifier;
	  rect.bottom += scrollTop * modifier;
	  rect.left += scrollLeft * modifier;
	  rect.right += scrollLeft * modifier;
	  return rect;
	}

	/*
	 * Helper to detect borders of a given element
	 * @method
	 * @memberof Popper.Utils
	 * @param {CSSStyleDeclaration} styles
	 * Result of `getStyleComputedProperty` on the given element
	 * @param {String} axis - `x` or `y`
	 * @return {number} borders - The borders size of the given axis
	 */

	function getBordersSize(styles, axis) {
	  var sideA = axis === 'x' ? 'Left' : 'Top';
	  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

	  return +styles['border' + sideA + 'Width'].split('px')[0] + +styles['border' + sideB + 'Width'].split('px')[0];
	}

	/**
	 * Tells if you are running Internet Explorer 10
	 * @method
	 * @memberof Popper.Utils
	 * @returns {Boolean} isIE10
	 */
	var isIE10 = undefined;

	var isIE10$1 = function isIE10$1() {
	  if (isIE10 === undefined) {
	    isIE10 = navigator.appVersion.indexOf('MSIE 10') !== -1;
	  }
	  return isIE10;
	};

	function getSize(axis, body, html, computedStyle) {
	  return Math.max(body['offset' + axis], html['client' + axis], html['offset' + axis], isIE10$1() ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
	}

	function getWindowSizes() {
	  var body = window.document.body;
	  var html = window.document.documentElement;
	  var computedStyle = isIE10$1() && window.getComputedStyle(html);

	  return {
	    height: getSize('Height', body, html, computedStyle),
	    width: getSize('Width', body, html, computedStyle)
	  };
	}

	var classCallCheck = function classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	var defineProperty = function defineProperty(obj, key, value) {
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
	};

	var _extends = Object.assign || function (target) {
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

	/**
	 * Given element offsets, generate an output similar to getBoundingClientRect
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Object} offsets
	 * @returns {Object} ClientRect like output
	 */
	function getClientRect(offsets) {
	  return _extends({}, offsets, {
	    right: offsets.left + offsets.width,
	    bottom: offsets.top + offsets.height
	  });
	}

	/**
	 * Get bounding client rect of given element
	 * @method
	 * @memberof Popper.Utils
	 * @param {HTMLElement} element
	 * @return {Object} client rect
	 */
	function getBoundingClientRect(element) {
	  var rect = {};

	  // IE10 10 FIX: Please, don't ask, the element isn't
	  // considered in DOM in some circumstances...
	  // This isn't reproducible in IE10 compatibility mode of IE11
	  if (isIE10$1()) {
	    try {
	      rect = element.getBoundingClientRect();
	      var scrollTop = getScroll(element, 'top');
	      var scrollLeft = getScroll(element, 'left');
	      rect.top += scrollTop;
	      rect.left += scrollLeft;
	      rect.bottom += scrollTop;
	      rect.right += scrollLeft;
	    } catch (err) {}
	  } else {
	    rect = element.getBoundingClientRect();
	  }

	  var result = {
	    left: rect.left,
	    top: rect.top,
	    width: rect.right - rect.left,
	    height: rect.bottom - rect.top
	  };

	  // subtract scrollbar size from sizes
	  var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
	  var width = sizes.width || element.clientWidth || result.right - result.left;
	  var height = sizes.height || element.clientHeight || result.bottom - result.top;

	  var horizScrollbar = element.offsetWidth - width;
	  var vertScrollbar = element.offsetHeight - height;

	  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
	  // we make this check conditional for performance reasons
	  if (horizScrollbar || vertScrollbar) {
	    var styles = getStyleComputedProperty(element);
	    horizScrollbar -= getBordersSize(styles, 'x');
	    vertScrollbar -= getBordersSize(styles, 'y');

	    result.width -= horizScrollbar;
	    result.height -= vertScrollbar;
	  }

	  return getClientRect(result);
	}

	function getOffsetRectRelativeToArbitraryNode(children, parent) {
	  var isIE10 = isIE10$1();
	  var isHTML = parent.nodeName === 'HTML';
	  var childrenRect = getBoundingClientRect(children);
	  var parentRect = getBoundingClientRect(parent);
	  var scrollParent = getScrollParent(children);

	  var styles = getStyleComputedProperty(parent);
	  var borderTopWidth = +styles.borderTopWidth.split('px')[0];
	  var borderLeftWidth = +styles.borderLeftWidth.split('px')[0];

	  var offsets = getClientRect({
	    top: childrenRect.top - parentRect.top - borderTopWidth,
	    left: childrenRect.left - parentRect.left - borderLeftWidth,
	    width: childrenRect.width,
	    height: childrenRect.height
	  });
	  offsets.marginTop = 0;
	  offsets.marginLeft = 0;

	  // Subtract margins of documentElement in case it's being used as parent
	  // we do this only on HTML because it's the only element that behaves
	  // differently when margins are applied to it. The margins are included in
	  // the box of the documentElement, in the other cases not.
	  if (!isIE10 && isHTML) {
	    var marginTop = +styles.marginTop.split('px')[0];
	    var marginLeft = +styles.marginLeft.split('px')[0];

	    offsets.top -= borderTopWidth - marginTop;
	    offsets.bottom -= borderTopWidth - marginTop;
	    offsets.left -= borderLeftWidth - marginLeft;
	    offsets.right -= borderLeftWidth - marginLeft;

	    // Attach marginTop and marginLeft because in some circumstances we may need them
	    offsets.marginTop = marginTop;
	    offsets.marginLeft = marginLeft;
	  }

	  if (isIE10 ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
	    offsets = includeScroll(offsets, parent);
	  }

	  return offsets;
	}

	function getViewportOffsetRectRelativeToArtbitraryNode(element) {
	  var html = window.document.documentElement;
	  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
	  var width = Math.max(html.clientWidth, window.innerWidth || 0);
	  var height = Math.max(html.clientHeight, window.innerHeight || 0);

	  var scrollTop = getScroll(html);
	  var scrollLeft = getScroll(html, 'left');

	  var offset = {
	    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
	    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
	    width: width,
	    height: height
	  };

	  return getClientRect(offset);
	}

	/**
	 * Check if the given element is fixed or is inside a fixed parent
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @argument {Element} customContainer
	 * @returns {Boolean} answer to "isFixed?"
	 */
	function isFixed(element) {
	  var nodeName = element.nodeName;
	  if (nodeName === 'BODY' || nodeName === 'HTML') {
	    return false;
	  }
	  if (getStyleComputedProperty(element, 'position') === 'fixed') {
	    return true;
	  }
	  return isFixed(getParentNode(element));
	}

	/**
	 * Computed the boundaries limits and return them
	 * @method
	 * @memberof Popper.Utils
	 * @param {HTMLElement} popper
	 * @param {HTMLElement} reference
	 * @param {number} padding
	 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
	 * @returns {Object} Coordinates of the boundaries
	 */
	function getBoundaries(popper, reference, padding, boundariesElement) {
	  // NOTE: 1 DOM access here
	  var boundaries = { top: 0, left: 0 };
	  var offsetParent = findCommonOffsetParent(popper, reference);

	  // Handle viewport case
	  if (boundariesElement === 'viewport') {
	    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent);
	  } else {
	    // Handle other cases based on DOM element used as boundaries
	    var boundariesNode = void 0;
	    if (boundariesElement === 'scrollParent') {
	      boundariesNode = getScrollParent(getParentNode(popper));
	      if (boundariesNode.nodeName === 'BODY') {
	        boundariesNode = window.document.documentElement;
	      }
	    } else if (boundariesElement === 'window') {
	      boundariesNode = window.document.documentElement;
	    } else {
	      boundariesNode = boundariesElement;
	    }

	    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent);

	    // In case of HTML, we need a different computation
	    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
	      var _getWindowSizes = getWindowSizes(),
	          height = _getWindowSizes.height,
	          width = _getWindowSizes.width;

	      boundaries.top += offsets.top - offsets.marginTop;
	      boundaries.bottom = height + offsets.top;
	      boundaries.left += offsets.left - offsets.marginLeft;
	      boundaries.right = width + offsets.left;
	    } else {
	      // for all the other DOM elements, this one is good
	      boundaries = offsets;
	    }
	  }

	  // Add paddings
	  boundaries.left += padding;
	  boundaries.top += padding;
	  boundaries.right -= padding;
	  boundaries.bottom -= padding;

	  return boundaries;
	}

	function getArea(_ref) {
	  var width = _ref.width,
	      height = _ref.height;

	  return width * height;
	}

	/**
	 * Utility used to transform the `auto` placement to the placement with more
	 * available space.
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
	  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

	  if (placement.indexOf('auto') === -1) {
	    return placement;
	  }

	  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

	  var rects = {
	    top: {
	      width: boundaries.width,
	      height: refRect.top - boundaries.top
	    },
	    right: {
	      width: boundaries.right - refRect.right,
	      height: boundaries.height
	    },
	    bottom: {
	      width: boundaries.width,
	      height: boundaries.bottom - refRect.bottom
	    },
	    left: {
	      width: refRect.left - boundaries.left,
	      height: boundaries.height
	    }
	  };

	  var sortedAreas = Object.keys(rects).map(function (key) {
	    return _extends({
	      key: key
	    }, rects[key], {
	      area: getArea(rects[key])
	    });
	  }).sort(function (a, b) {
	    return b.area - a.area;
	  });

	  var filteredAreas = sortedAreas.filter(function (_ref2) {
	    var width = _ref2.width,
	        height = _ref2.height;
	    return width >= popper.clientWidth && height >= popper.clientHeight;
	  });

	  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

	  var variation = placement.split('-')[1];

	  return computedPlacement + (variation ? '-' + variation : '');
	}

	/**
	 * Get offsets to the reference element
	 * @method
	 * @memberof Popper.Utils
	 * @param {Object} state
	 * @param {Element} popper - the popper element
	 * @param {Element} reference - the reference element (the popper will be relative to this)
	 * @returns {Object} An object containing the offsets which will be applied to the popper
	 */
	function getReferenceOffsets(state, popper, reference) {
	  var commonOffsetParent = findCommonOffsetParent(popper, reference);
	  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent);
	}

	/**
	 * Get the outer sizes of the given element (offset size + margins)
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element
	 * @returns {Object} object containing width and height properties
	 */
	function getOuterSizes(element) {
	  var styles = window.getComputedStyle(element);
	  var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
	  var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
	  var result = {
	    width: element.offsetWidth + y,
	    height: element.offsetHeight + x
	  };
	  return result;
	}

	/**
	 * Get the opposite placement of the given one
	 * @method
	 * @memberof Popper.Utils
	 * @argument {String} placement
	 * @returns {String} flipped placement
	 */
	function getOppositePlacement(placement) {
	  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash[matched];
	  });
	}

	/**
	 * Get offsets to the popper
	 * @method
	 * @memberof Popper.Utils
	 * @param {Object} position - CSS position the Popper will get applied
	 * @param {HTMLElement} popper - the popper element
	 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
	 * @param {String} placement - one of the valid placement options
	 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
	 */
	function getPopperOffsets(popper, referenceOffsets, placement) {
	  placement = placement.split('-')[0];

	  // Get popper node sizes
	  var popperRect = getOuterSizes(popper);

	  // Add position, width and height to our offsets object
	  var popperOffsets = {
	    width: popperRect.width,
	    height: popperRect.height
	  };

	  // depending by the popper placement we have to compute its offsets slightly differently
	  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
	  var mainSide = isHoriz ? 'top' : 'left';
	  var secondarySide = isHoriz ? 'left' : 'top';
	  var measurement = isHoriz ? 'height' : 'width';
	  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

	  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
	  if (placement === secondarySide) {
	    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
	  } else {
	    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
	  }

	  return popperOffsets;
	}

	/**
	 * Mimics the `find` method of Array
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Array} arr
	 * @argument prop
	 * @argument value
	 * @returns index or -1
	 */
	function find$1(arr, check) {
	  // use native find if supported
	  if (Array.prototype.find) {
	    return arr.find(check);
	  }

	  // use `filter` to obtain the same behavior of `find`
	  return arr.filter(check)[0];
	}

	/**
	 * Return the index of the matching object
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Array} arr
	 * @argument prop
	 * @argument value
	 * @returns index or -1
	 */
	function findIndex$1(arr, prop, value) {
	  // use native findIndex if supported
	  if (Array.prototype.findIndex) {
	    return arr.findIndex(function (cur) {
	      return cur[prop] === value;
	    });
	  }

	  // use `find` + `indexOf` if `findIndex` isn't supported
	  var match = find$1(arr, function (obj) {
	    return obj[prop] === value;
	  });
	  return arr.indexOf(match);
	}

	/**
	 * Loop trough the list of modifiers and run them in order,
	 * each of them will then edit the data object.
	 * @method
	 * @memberof Popper.Utils
	 * @param {dataObject} data
	 * @param {Array} modifiers
	 * @param {String} ends - Optional modifier name used as stopper
	 * @returns {dataObject}
	 */
	function runModifiers(modifiers, data, ends) {
	  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex$1(modifiers, 'name', ends));

	  modifiersToRun.forEach(function (modifier) {
	    if (modifier.function) {
	      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
	    }
	    var fn = modifier.function || modifier.fn;
	    if (modifier.enabled && isFunction(fn)) {
	      // Add properties to offsets to make them a complete clientRect object
	      // we do this before each modifier to make sure the previous one doesn't
	      // mess with these values
	      data.offsets.popper = getClientRect(data.offsets.popper);
	      data.offsets.reference = getClientRect(data.offsets.reference);

	      data = fn(data, modifier);
	    }
	  });

	  return data;
	}

	/**
	 * Updates the position of the popper, computing the new offsets and applying
	 * the new style.<br />
	 * Prefer `scheduleUpdate` over `update` because of performance reasons.
	 * @method
	 * @memberof Popper
	 */
	function update() {
	  // if popper is destroyed, don't perform any further update
	  if (this.state.isDestroyed) {
	    return;
	  }

	  var data = {
	    instance: this,
	    styles: {},
	    attributes: {},
	    flipped: false,
	    offsets: {}
	  };

	  // compute reference element offsets
	  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference);

	  // compute auto placement, store placement inside the data object,
	  // modifiers will be able to edit `placement` if needed
	  // and refer to originalPlacement to know the original value
	  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

	  // store the computed placement inside `originalPlacement`
	  data.originalPlacement = data.placement;

	  // compute the popper offsets
	  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
	  data.offsets.popper.position = 'absolute';

	  // run the modifiers
	  data = runModifiers(this.modifiers, data);

	  // the first `update` will call `onCreate` callback
	  // the other ones will call `onUpdate` callback
	  if (!this.state.isCreated) {
	    this.state.isCreated = true;
	    this.options.onCreate(data);
	  } else {
	    this.options.onUpdate(data);
	  }
	}

	/**
	 * Helper used to know if the given modifier is enabled.
	 * @method
	 * @memberof Popper.Utils
	 * @returns {Boolean}
	 */
	function isModifierEnabled(modifiers, modifierName) {
	  return modifiers.some(function (_ref) {
	    var name = _ref.name,
	        enabled = _ref.enabled;
	    return enabled && name === modifierName;
	  });
	}

	/**
	 * Get the prefixed supported property name
	 * @method
	 * @memberof Popper.Utils
	 * @argument {String} property (camelCase)
	 * @returns {String} prefixed property (camelCase)
	 */
	function getSupportedPropertyName(property) {
	  var prefixes = [false, 'ms', 'webkit', 'moz', 'o'];
	  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

	  for (var i = 0; i < prefixes.length - 1; i++) {
	    var prefix = prefixes[i];
	    var toCheck = prefix ? '' + prefix + upperProp : property;
	    if (typeof window.document.body.style[toCheck] !== 'undefined') {
	      return toCheck;
	    }
	  }
	  return null;
	}

	/**
	 * Destroy the popper
	 * @method
	 * @memberof Popper
	 */
	function destroy() {
	  this.state.isDestroyed = true;

	  // touch DOM only if `applyStyle` modifier is enabled
	  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
	    this.popper.removeAttribute('x-placement');
	    this.popper.style.left = '';
	    this.popper.style.position = '';
	    this.popper.style.top = '';
	    this.popper.style[getSupportedPropertyName('transform')] = '';
	  }

	  this.disableEventListeners();

	  // remove the popper if user explicity asked for the deletion on destroy
	  // do not use `remove` because IE11 doesn't support it
	  if (this.options.removeOnDestroy) {
	    this.popper.parentNode.removeChild(this.popper);
	  }
	  return this;
	}

	function attachToScrollParents(scrollParent, event, callback, scrollParents) {
	  var isBody = scrollParent.nodeName === 'BODY';
	  var target = isBody ? window : scrollParent;
	  target.addEventListener(event, callback, { passive: true });

	  if (!isBody) {
	    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
	  }
	  scrollParents.push(target);
	}

	/**
	 * Setup needed event listeners used to update the popper position
	 * @method
	 * @memberof Popper.Utils
	 * @private
	 */
	function setupEventListeners(reference, options, state, updateBound) {
	  // Resize event listener on window
	  state.updateBound = updateBound;
	  window.addEventListener('resize', state.updateBound, { passive: true });

	  // Scroll event listener on scroll parents
	  var scrollElement = getScrollParent(reference);
	  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
	  state.scrollElement = scrollElement;
	  state.eventsEnabled = true;

	  return state;
	}

	/**
	 * It will add resize/scroll events and start recalculating
	 * position of the popper element when they are triggered.
	 * @method
	 * @memberof Popper
	 */
	function enableEventListeners() {
	  if (!this.state.eventsEnabled) {
	    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
	  }
	}

	/**
	 * Remove event listeners used to update the popper position
	 * @method
	 * @memberof Popper.Utils
	 * @private
	 */
	function removeEventListeners(reference, state) {
	  // Remove resize event listener on window
	  window.removeEventListener('resize', state.updateBound);

	  // Remove scroll event listener on scroll parents
	  state.scrollParents.forEach(function (target) {
	    target.removeEventListener('scroll', state.updateBound);
	  });

	  // Reset state
	  state.updateBound = null;
	  state.scrollParents = [];
	  state.scrollElement = null;
	  state.eventsEnabled = false;
	  return state;
	}

	/**
	 * It will remove resize/scroll events and won't recalculate popper position
	 * when they are triggered. It also won't trigger onUpdate callback anymore,
	 * unless you call `update` method manually.
	 * @method
	 * @memberof Popper
	 */
	function disableEventListeners() {
	  if (this.state.eventsEnabled) {
	    window.cancelAnimationFrame(this.scheduleUpdate);
	    this.state = removeEventListeners(this.reference, this.state);
	  }
	}

	/**
	 * Tells if a given input is a number
	 * @method
	 * @memberof Popper.Utils
	 * @param {*} input to check
	 * @return {Boolean}
	 */
	function isNumeric(n) {
	  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
	}

	/**
	 * Set the style to the given popper
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element - Element to apply the style to
	 * @argument {Object} styles
	 * Object with a list of properties and values which will be applied to the element
	 */
	function setStyles(element, styles) {
	  Object.keys(styles).forEach(function (prop) {
	    var unit = '';
	    // add unit if the value is numeric and is one of the following
	    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
	      unit = 'px';
	    }
	    element.style[prop] = styles[prop] + unit;
	  });
	}

	/**
	 * Set the attributes to the given popper
	 * @method
	 * @memberof Popper.Utils
	 * @argument {Element} element - Element to apply the attributes to
	 * @argument {Object} styles
	 * Object with a list of properties and values which will be applied to the element
	 */
	function setAttributes(element, attributes) {
	  Object.keys(attributes).forEach(function (prop) {
	    var value = attributes[prop];
	    if (value !== false) {
	      element.setAttribute(prop, attributes[prop]);
	    } else {
	      element.removeAttribute(prop);
	    }
	  });
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} data.styles - List of style properties - values to apply to popper element
	 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The same data object
	 */
	function applyStyle(data) {
	  // any property present in `data.styles` will be applied to the popper,
	  // in this way we can make the 3rd party modifiers add custom styles to it
	  // Be aware, modifiers could override the properties defined in the previous
	  // lines of this modifier!
	  setStyles(data.instance.popper, data.styles);

	  // any property present in `data.attributes` will be applied to the popper,
	  // they will be set as HTML attributes of the element
	  setAttributes(data.instance.popper, data.attributes);

	  // if the arrow style has been computed, apply the arrow style
	  if (data.offsets.arrow) {
	    setStyles(data.arrowElement, data.offsets.arrow);
	  }

	  return data;
	}

	/**
	 * Set the x-placement attribute before everything else because it could be used
	 * to add margins to the popper margins needs to be calculated to get the
	 * correct popper offsets.
	 * @method
	 * @memberof Popper.modifiers
	 * @param {HTMLElement} reference - The reference element used to position the popper
	 * @param {HTMLElement} popper - The HTML element used as popper.
	 * @param {Object} options - Popper.js options
	 */
	function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
	  // compute reference element offsets
	  var referenceOffsets = getReferenceOffsets(state, popper, reference);

	  // compute auto placement, store placement inside the data object,
	  // modifiers will be able to edit `placement` if needed
	  // and refer to originalPlacement to know the original value
	  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

	  popper.setAttribute('x-placement', placement);

	  // Apply `position` to popper before anything else because
	  // without the position applied we can't guarantee correct computations
	  setStyles(popper, { position: 'absolute' });

	  return options;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function computeStyle(data, options) {
	  var x = options.x,
	      y = options.y;
	  var popper = data.offsets.popper;

	  // Remove this legacy support in Popper.js v2

	  var legacyGpuAccelerationOption = find$1(data.instance.modifiers, function (modifier) {
	    return modifier.name === 'applyStyle';
	  }).gpuAcceleration;
	  if (legacyGpuAccelerationOption !== undefined) {
	    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
	  }
	  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

	  var offsetParent = getOffsetParent(data.instance.popper);
	  var offsetParentRect = getBoundingClientRect(offsetParent);

	  // Styles
	  var styles = {
	    position: popper.position
	  };

	  // floor sides to avoid blurry text
	  var offsets = {
	    left: Math.floor(popper.left),
	    top: Math.floor(popper.top),
	    bottom: Math.floor(popper.bottom),
	    right: Math.floor(popper.right)
	  };

	  var sideA = x === 'bottom' ? 'top' : 'bottom';
	  var sideB = y === 'right' ? 'left' : 'right';

	  // if gpuAcceleration is set to `true` and transform is supported,
	  //  we use `translate3d` to apply the position to the popper we
	  // automatically use the supported prefixed version if needed
	  var prefixedProperty = getSupportedPropertyName('transform');

	  // now, let's make a step back and look at this code closely (wtf?)
	  // If the content of the popper grows once it's been positioned, it
	  // may happen that the popper gets misplaced because of the new content
	  // overflowing its reference element
	  // To avoid this problem, we provide two options (x and y), which allow
	  // the consumer to define the offset origin.
	  // If we position a popper on top of a reference element, we can set
	  // `x` to `top` to make the popper grow towards its top instead of
	  // its bottom.
	  var left = void 0,
	      top = void 0;
	  if (sideA === 'bottom') {
	    top = -offsetParentRect.height + offsets.bottom;
	  } else {
	    top = offsets.top;
	  }
	  if (sideB === 'right') {
	    left = -offsetParentRect.width + offsets.right;
	  } else {
	    left = offsets.left;
	  }
	  if (gpuAcceleration && prefixedProperty) {
	    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
	    styles[sideA] = 0;
	    styles[sideB] = 0;
	    styles.willChange = 'transform';
	  } else {
	    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
	    var invertTop = sideA === 'bottom' ? -1 : 1;
	    var invertLeft = sideB === 'right' ? -1 : 1;
	    styles[sideA] = top * invertTop;
	    styles[sideB] = left * invertLeft;
	    styles.willChange = sideA + ', ' + sideB;
	  }

	  // Attributes
	  var attributes = {
	    'x-placement': data.placement
	  };

	  // Update attributes and styles of `data`
	  data.attributes = _extends({}, attributes, data.attributes);
	  data.styles = _extends({}, styles, data.styles);

	  return data;
	}

	/**
	 * Helper used to know if the given modifier depends from another one.<br />
	 * It checks if the needed modifier is listed and enabled.
	 * @method
	 * @memberof Popper.Utils
	 * @param {Array} modifiers - list of modifiers
	 * @param {String} requestingName - name of requesting modifier
	 * @param {String} requestedName - name of requested modifier
	 * @returns {Boolean}
	 */
	function isModifierRequired(modifiers, requestingName, requestedName) {
	  var requesting = find$1(modifiers, function (_ref) {
	    var name = _ref.name;
	    return name === requestingName;
	  });

	  var isRequired = !!requesting && modifiers.some(function (modifier) {
	    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
	  });

	  if (!isRequired) {
	    var _requesting = '`' + requestingName + '`';
	    var requested = '`' + requestedName + '`';
	    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
	  }
	  return isRequired;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function arrow(data, options) {
	  // arrow depends on keepTogether in order to work
	  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
	    return data;
	  }

	  var arrowElement = options.element;

	  // if arrowElement is a string, suppose it's a CSS selector
	  if (typeof arrowElement === 'string') {
	    arrowElement = data.instance.popper.querySelector(arrowElement);

	    // if arrowElement is not found, don't run the modifier
	    if (!arrowElement) {
	      return data;
	    }
	  } else {
	    // if the arrowElement isn't a query selector we must check that the
	    // provided DOM node is child of its popper node
	    if (!data.instance.popper.contains(arrowElement)) {
	      console.warn('WARNING: `arrow.element` must be child of its popper element!');
	      return data;
	    }
	  }

	  var placement = data.placement.split('-')[0];
	  var _data$offsets = data.offsets,
	      popper = _data$offsets.popper,
	      reference = _data$offsets.reference;

	  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

	  var len = isVertical ? 'height' : 'width';
	  var side = isVertical ? 'top' : 'left';
	  var altSide = isVertical ? 'left' : 'top';
	  var opSide = isVertical ? 'bottom' : 'right';
	  var arrowElementSize = getOuterSizes(arrowElement)[len];

	  //
	  // extends keepTogether behavior making sure the popper and its reference have enough pixels in conjuction
	  //

	  // top/left side
	  if (reference[opSide] - arrowElementSize < popper[side]) {
	    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
	  }
	  // bottom/right side
	  if (reference[side] + arrowElementSize > popper[opSide]) {
	    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
	  }

	  // compute center of the popper
	  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

	  // Compute the sideValue using the updated popper offsets
	  var sideValue = center - getClientRect(data.offsets.popper)[side];

	  // prevent arrowElement from being placed not contiguously to its popper
	  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

	  data.arrowElement = arrowElement;
	  data.offsets.arrow = {};
	  data.offsets.arrow[side] = Math.round(sideValue);
	  data.offsets.arrow[altSide] = ''; // make sure to unset any eventual altSide value from the DOM node

	  return data;
	}

	/**
	 * Get the opposite placement variation of the given one
	 * @method
	 * @memberof Popper.Utils
	 * @argument {String} placement variation
	 * @returns {String} flipped placement variation
	 */
	function getOppositeVariation(variation) {
	  if (variation === 'end') {
	    return 'start';
	  } else if (variation === 'start') {
	    return 'end';
	  }
	  return variation;
	}

	/**
	 * List of accepted placements to use as values of the `placement` option.<br />
	 * Valid placements are:
	 * - `auto`
	 * - `top`
	 * - `right`
	 * - `bottom`
	 * - `left`
	 *
	 * Each placement can have a variation from this list:
	 * - `-start`
	 * - `-end`
	 *
	 * Variations are interpreted easily if you think of them as the left to right
	 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
	 * is right.<br />
	 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
	 *
	 * Some valid examples are:
	 * - `top-end` (on top of reference, right aligned)
	 * - `right-start` (on right of reference, top aligned)
	 * - `bottom` (on bottom, centered)
	 * - `auto-right` (on the side with more space available, alignment depends by placement)
	 *
	 * @static
	 * @type {Array}
	 * @enum {String}
	 * @readonly
	 * @method placements
	 * @memberof Popper
	 */
	var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

	// Get rid of `auto` `auto-start` and `auto-end`
	var validPlacements = placements.slice(3);

	/**
	 * Given an initial placement, returns all the subsequent placements
	 * clockwise (or counter-clockwise).
	 *
	 * @method
	 * @memberof Popper.Utils
	 * @argument {String} placement - A valid placement (it accepts variations)
	 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
	 * @returns {Array} placements including their variations
	 */
	function clockwise(placement) {
	  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  var index = validPlacements.indexOf(placement);
	  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
	  return counter ? arr.reverse() : arr;
	}

	var BEHAVIORS = {
	  FLIP: 'flip',
	  CLOCKWISE: 'clockwise',
	  COUNTERCLOCKWISE: 'counterclockwise'
	};

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function flip(data, options) {
	  // if `inner` modifier is enabled, we can't use the `flip` modifier
	  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
	    return data;
	  }

	  if (data.flipped && data.placement === data.originalPlacement) {
	    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
	    return data;
	  }

	  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement);

	  var placement = data.placement.split('-')[0];
	  var placementOpposite = getOppositePlacement(placement);
	  var variation = data.placement.split('-')[1] || '';

	  var flipOrder = [];

	  switch (options.behavior) {
	    case BEHAVIORS.FLIP:
	      flipOrder = [placement, placementOpposite];
	      break;
	    case BEHAVIORS.CLOCKWISE:
	      flipOrder = clockwise(placement);
	      break;
	    case BEHAVIORS.COUNTERCLOCKWISE:
	      flipOrder = clockwise(placement, true);
	      break;
	    default:
	      flipOrder = options.behavior;
	  }

	  flipOrder.forEach(function (step, index) {
	    if (placement !== step || flipOrder.length === index + 1) {
	      return data;
	    }

	    placement = data.placement.split('-')[0];
	    placementOpposite = getOppositePlacement(placement);

	    var popperOffsets = data.offsets.popper;
	    var refOffsets = data.offsets.reference;

	    // using floor because the reference offsets may contain decimals we are not going to consider here
	    var floor = Math.floor;
	    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

	    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
	    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
	    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
	    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

	    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

	    // flip the variation if required
	    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
	    var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

	    if (overlapsRef || overflowsBoundaries || flippedVariation) {
	      // this boolean to detect any flip loop
	      data.flipped = true;

	      if (overlapsRef || overflowsBoundaries) {
	        placement = flipOrder[index + 1];
	      }

	      if (flippedVariation) {
	        variation = getOppositeVariation(variation);
	      }

	      data.placement = placement + (variation ? '-' + variation : '');

	      // this object contains `position`, we want to preserve it along with
	      // any additional property we may add in the future
	      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

	      data = runModifiers(data.instance.modifiers, data, 'flip');
	    }
	  });
	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function keepTogether(data) {
	  var _data$offsets = data.offsets,
	      popper = _data$offsets.popper,
	      reference = _data$offsets.reference;

	  var placement = data.placement.split('-')[0];
	  var floor = Math.floor;
	  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
	  var side = isVertical ? 'right' : 'bottom';
	  var opSide = isVertical ? 'left' : 'top';
	  var measurement = isVertical ? 'width' : 'height';

	  if (popper[side] < floor(reference[opSide])) {
	    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
	  }
	  if (popper[opSide] > floor(reference[side])) {
	    data.offsets.popper[opSide] = floor(reference[side]);
	  }

	  return data;
	}

	/**
	 * Converts a string containing value + unit into a px value number
	 * @function
	 * @memberof {modifiers~offset}
	 * @private
	 * @argument {String} str - Value + unit string
	 * @argument {String} measurement - `height` or `width`
	 * @argument {Object} popperOffsets
	 * @argument {Object} referenceOffsets
	 * @returns {Number|String}
	 * Value in pixels, or original string if no values were extracted
	 */
	function toValue(str, measurement, popperOffsets, referenceOffsets) {
	  // separate value from unit
	  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
	  var value = +split[1];
	  var unit = split[2];

	  // If it's not a number it's an operator, I guess
	  if (!value) {
	    return str;
	  }

	  if (unit.indexOf('%') === 0) {
	    var element = void 0;
	    switch (unit) {
	      case '%p':
	        element = popperOffsets;
	        break;
	      case '%':
	      case '%r':
	      default:
	        element = referenceOffsets;
	    }

	    var rect = getClientRect(element);
	    return rect[measurement] / 100 * value;
	  } else if (unit === 'vh' || unit === 'vw') {
	    // if is a vh or vw, we calculate the size based on the viewport
	    var size = void 0;
	    if (unit === 'vh') {
	      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	    } else {
	      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	    }
	    return size / 100 * value;
	  } else {
	    // if is an explicit pixel unit, we get rid of the unit and keep the value
	    // if is an implicit unit, it's px, and we return just the value
	    return value;
	  }
	}

	/**
	 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
	 * @function
	 * @memberof {modifiers~offset}
	 * @private
	 * @argument {String} offset
	 * @argument {Object} popperOffsets
	 * @argument {Object} referenceOffsets
	 * @argument {String} basePlacement
	 * @returns {Array} a two cells array with x and y offsets in numbers
	 */
	function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
	  var offsets = [0, 0];

	  // Use height if placement is left or right and index is 0 otherwise use width
	  // in this way the first offset will use an axis and the second one
	  // will use the other one
	  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

	  // Split the offset string to obtain a list of values and operands
	  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
	  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
	    return frag.trim();
	  });

	  // Detect if the offset string contains a pair of values or a single one
	  // they could be separated by comma or space
	  var divider = fragments.indexOf(find$1(fragments, function (frag) {
	    return frag.search(/,|\s/) !== -1;
	  }));

	  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
	    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
	  }

	  // If divider is found, we divide the list of values and operands to divide
	  // them by ofset X and Y.
	  var splitRegex = /\s*,\s*|\s+/;
	  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

	  // Convert the values with units to absolute pixels to allow our computations
	  ops = ops.map(function (op, index) {
	    // Most of the units rely on the orientation of the popper
	    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
	    var mergeWithPrevious = false;
	    return op
	    // This aggregates any `+` or `-` sign that aren't considered operators
	    // e.g.: 10 + +5 => [10, +, +5]
	    .reduce(function (a, b) {
	      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
	        a[a.length - 1] = b;
	        mergeWithPrevious = true;
	        return a;
	      } else if (mergeWithPrevious) {
	        a[a.length - 1] += b;
	        mergeWithPrevious = false;
	        return a;
	      } else {
	        return a.concat(b);
	      }
	    }, [])
	    // Here we convert the string values into number values (in px)
	    .map(function (str) {
	      return toValue(str, measurement, popperOffsets, referenceOffsets);
	    });
	  });

	  // Loop trough the offsets arrays and execute the operations
	  ops.forEach(function (op, index) {
	    op.forEach(function (frag, index2) {
	      if (isNumeric(frag)) {
	        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
	      }
	    });
	  });
	  return offsets;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @argument {Number|String} options.offset=0
	 * The offset value as described in the modifier description
	 * @returns {Object} The data object, properly modified
	 */
	function offset(data, _ref) {
	  var offset = _ref.offset;
	  var placement = data.placement,
	      _data$offsets = data.offsets,
	      popper = _data$offsets.popper,
	      reference = _data$offsets.reference;

	  var basePlacement = placement.split('-')[0];

	  var offsets = void 0;
	  if (isNumeric(+offset)) {
	    offsets = [+offset, 0];
	  } else {
	    offsets = parseOffset(offset, popper, reference, basePlacement);
	  }

	  if (basePlacement === 'left') {
	    popper.top += offsets[0];
	    popper.left -= offsets[1];
	  } else if (basePlacement === 'right') {
	    popper.top += offsets[0];
	    popper.left += offsets[1];
	  } else if (basePlacement === 'top') {
	    popper.left += offsets[0];
	    popper.top -= offsets[1];
	  } else if (basePlacement === 'bottom') {
	    popper.left += offsets[0];
	    popper.top += offsets[1];
	  }

	  data.popper = popper;
	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function preventOverflow(data, options) {
	  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

	  // If offsetParent is the reference element, we really want to
	  // go one step up and use the next offsetParent as reference to
	  // avoid to make this modifier completely useless and look like broken
	  if (data.instance.reference === boundariesElement) {
	    boundariesElement = getOffsetParent(boundariesElement);
	  }

	  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement);
	  options.boundaries = boundaries;

	  var order = options.priority;
	  var popper = data.offsets.popper;

	  var check = {
	    primary: function primary(placement) {
	      var value = popper[placement];
	      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
	        value = Math.max(popper[placement], boundaries[placement]);
	      }
	      return defineProperty({}, placement, value);
	    },
	    secondary: function secondary(placement) {
	      var mainSide = placement === 'right' ? 'left' : 'top';
	      var value = popper[mainSide];
	      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
	        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
	      }
	      return defineProperty({}, mainSide, value);
	    }
	  };

	  order.forEach(function (placement) {
	    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
	    popper = _extends({}, popper, check[side](placement));
	  });

	  data.offsets.popper = popper;

	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function shift(data) {
	  var placement = data.placement;
	  var basePlacement = placement.split('-')[0];
	  var shiftvariation = placement.split('-')[1];

	  // if shift shiftvariation is specified, run the modifier
	  if (shiftvariation) {
	    var _data$offsets = data.offsets,
	        reference = _data$offsets.reference,
	        popper = _data$offsets.popper;

	    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
	    var side = isVertical ? 'left' : 'top';
	    var measurement = isVertical ? 'width' : 'height';

	    var shiftOffsets = {
	      start: defineProperty({}, side, reference[side]),
	      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
	    };

	    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
	  }

	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by update method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function hide(data) {
	  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
	    return data;
	  }

	  var refRect = data.offsets.reference;
	  var bound = find$1(data.instance.modifiers, function (modifier) {
	    return modifier.name === 'preventOverflow';
	  }).boundaries;

	  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
	    // Avoid unnecessary DOM access if visibility hasn't changed
	    if (data.hide === true) {
	      return data;
	    }

	    data.hide = true;
	    data.attributes['x-out-of-boundaries'] = '';
	  } else {
	    // Avoid unnecessary DOM access if visibility hasn't changed
	    if (data.hide === false) {
	      return data;
	    }

	    data.hide = false;
	    data.attributes['x-out-of-boundaries'] = false;
	  }

	  return data;
	}

	/**
	 * @function
	 * @memberof Modifiers
	 * @argument {Object} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {Object} The data object, properly modified
	 */
	function inner(data) {
	  var placement = data.placement;
	  var basePlacement = placement.split('-')[0];
	  var _data$offsets = data.offsets,
	      popper = _data$offsets.popper,
	      reference = _data$offsets.reference;

	  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

	  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

	  popper[isHoriz ? 'left' : 'top'] = reference[placement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

	  data.placement = getOppositePlacement(placement);
	  data.offsets.popper = getClientRect(popper);

	  return data;
	}

	/**
	 * Modifier function, each modifier can have a function of this type assigned
	 * to its `fn` property.<br />
	 * These functions will be called on each update, this means that you must
	 * make sure they are performant enough to avoid performance bottlenecks.
	 *
	 * @function ModifierFn
	 * @argument {dataObject} data - The data object generated by `update` method
	 * @argument {Object} options - Modifiers configuration and options
	 * @returns {dataObject} The data object, properly modified
	 */

	/**
	 * Modifiers are plugins used to alter the behavior of your poppers.<br />
	 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
	 * needed by the library.
	 *
	 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
	 * All the other properties are configurations that could be tweaked.
	 * @namespace modifiers
	 */
	var modifiers = {
	  /**
	   * Modifier used to shift the popper on the start or end of its reference
	   * element.<br />
	   * It will read the variation of the `placement` property.<br />
	   * It can be one either `-end` or `-start`.
	   * @memberof modifiers
	   * @inner
	   */
	  shift: {
	    /** @prop {number} order=100 - Index used to define the order of execution */
	    order: 100,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: shift
	  },

	  /**
	   * The `offset` modifier can shift your popper on both its axis.
	   *
	   * It accepts the following units:
	   * - `px` or unitless, interpreted as pixels
	   * - `%` or `%r`, percentage relative to the length of the reference element
	   * - `%p`, percentage relative to the length of the popper element
	   * - `vw`, CSS viewport width unit
	   * - `vh`, CSS viewport height unit
	   *
	   * For length is intended the main axis relative to the placement of the popper.<br />
	   * This means that if the placement is `top` or `bottom`, the length will be the
	   * `width`. In case of `left` or `right`, it will be the height.
	   *
	   * You can provide a single value (as `Number` or `String`), or a pair of values
	   * as `String` divided by a comma or one (or more) white spaces.<br />
	   * The latter is a deprecated method because it leads to confusion and will be
	   * removed in v2.<br />
	   * Additionally, it accepts additions and subtractions between different units.
	   * Note that multiplications and divisions aren't supported.
	   *
	   * Valid examples are:
	   * ```
	   * 10
	   * '10%'
	   * '10, 10'
	   * '10%, 10'
	   * '10 + 10%'
	   * '10 - 5vh + 3%'
	   * '-10px + 5vh, 5px - 6%'
	   * ```
	   *
	   * @memberof modifiers
	   * @inner
	   */
	  offset: {
	    /** @prop {number} order=200 - Index used to define the order of execution */
	    order: 200,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: offset,
	    /** @prop {Number|String} offset=0
	     * The offset value as described in the modifier description
	     */
	    offset: 0
	  },

	  /**
	   * Modifier used to prevent the popper from being positioned outside the boundary.
	   *
	   * An scenario exists where the reference itself is not within the boundaries.<br />
	   * We can say it has "escaped the boundaries" — or just "escaped".<br />
	   * In this case we need to decide whether the popper should either:
	   *
	   * - detach from the reference and remain "trapped" in the boundaries, or
	   * - if it should ignore the boundary and "escape with its reference"
	   *
	   * When `escapeWithReference` is set to`true` and reference is completely
	   * outside its boundaries, the popper will overflow (or completely leave)
	   * the boundaries in order to remain attached to the edge of the reference.
	   *
	   * @memberof modifiers
	   * @inner
	   */
	  preventOverflow: {
	    /** @prop {number} order=300 - Index used to define the order of execution */
	    order: 300,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: preventOverflow,
	    /**
	     * @prop {Array} [priority=['left','right','top','bottom']]
	     * Popper will try to prevent overflow following these priorities by default,
	     * then, it could overflow on the left and on top of the `boundariesElement`
	     */
	    priority: ['left', 'right', 'top', 'bottom'],
	    /**
	     * @prop {number} padding=5
	     * Amount of pixel used to define a minimum distance between the boundaries
	     * and the popper this makes sure the popper has always a little padding
	     * between the edges of its container
	     */
	    padding: 5,
	    /**
	     * @prop {String|HTMLElement} boundariesElement='scrollParent'
	     * Boundaries used by the modifier, can be `scrollParent`, `window`,
	     * `viewport` or any DOM element.
	     */
	    boundariesElement: 'scrollParent'
	  },

	  /**
	   * Modifier used to make sure the reference and its popper stay near eachothers
	   * without leaving any gap between the two. Expecially useful when the arrow is
	   * enabled and you want to assure it to point to its reference element.
	   * It cares only about the first axis, you can still have poppers with margin
	   * between the popper and its reference element.
	   * @memberof modifiers
	   * @inner
	   */
	  keepTogether: {
	    /** @prop {number} order=400 - Index used to define the order of execution */
	    order: 400,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: keepTogether
	  },

	  /**
	   * This modifier is used to move the `arrowElement` of the popper to make
	   * sure it is positioned between the reference element and its popper element.
	   * It will read the outer size of the `arrowElement` node to detect how many
	   * pixels of conjuction are needed.
	   *
	   * It has no effect if no `arrowElement` is provided.
	   * @memberof modifiers
	   * @inner
	   */
	  arrow: {
	    /** @prop {number} order=500 - Index used to define the order of execution */
	    order: 500,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: arrow,
	    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
	    element: '[x-arrow]'
	  },

	  /**
	   * Modifier used to flip the popper's placement when it starts to overlap its
	   * reference element.
	   *
	   * Requires the `preventOverflow` modifier before it in order to work.
	   *
	   * **NOTE:** this modifier will interrupt the current update cycle and will
	   * restart it if it detects the need to flip the placement.
	   * @memberof modifiers
	   * @inner
	   */
	  flip: {
	    /** @prop {number} order=600 - Index used to define the order of execution */
	    order: 600,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: flip,
	    /**
	     * @prop {String|Array} behavior='flip'
	     * The behavior used to change the popper's placement. It can be one of
	     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
	     * placements (with optional variations).
	     */
	    behavior: 'flip',
	    /**
	     * @prop {number} padding=5
	     * The popper will flip if it hits the edges of the `boundariesElement`
	     */
	    padding: 5,
	    /**
	     * @prop {String|HTMLElement} boundariesElement='viewport'
	     * The element which will define the boundaries of the popper position,
	     * the popper will never be placed outside of the defined boundaries
	     * (except if keepTogether is enabled)
	     */
	    boundariesElement: 'viewport'
	  },

	  /**
	   * Modifier used to make the popper flow toward the inner of the reference element.
	   * By default, when this modifier is disabled, the popper will be placed outside
	   * the reference element.
	   * @memberof modifiers
	   * @inner
	   */
	  inner: {
	    /** @prop {number} order=700 - Index used to define the order of execution */
	    order: 700,
	    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
	    enabled: false,
	    /** @prop {ModifierFn} */
	    fn: inner
	  },

	  /**
	   * Modifier used to hide the popper when its reference element is outside of the
	   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
	   * be used to hide with a CSS selector the popper when its reference is
	   * out of boundaries.
	   *
	   * Requires the `preventOverflow` modifier before it in order to work.
	   * @memberof modifiers
	   * @inner
	   */
	  hide: {
	    /** @prop {number} order=800 - Index used to define the order of execution */
	    order: 800,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: hide
	  },

	  /**
	   * Computes the style that will be applied to the popper element to gets
	   * properly positioned.
	   *
	   * Note that this modifier will not touch the DOM, it just prepares the styles
	   * so that `applyStyle` modifier can apply it. This separation is useful
	   * in case you need to replace `applyStyle` with a custom implementation.
	   *
	   * This modifier has `850` as `order` value to maintain backward compatibility
	   * with previous versions of Popper.js. Expect the modifiers ordering method
	   * to change in future major versions of the library.
	   *
	   * @memberof modifiers
	   * @inner
	   */
	  computeStyle: {
	    /** @prop {number} order=850 - Index used to define the order of execution */
	    order: 850,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: computeStyle,
	    /**
	     * @prop {Boolean} gpuAcceleration=true
	     * If true, it uses the CSS 3d transformation to position the popper.
	     * Otherwise, it will use the `top` and `left` properties.
	     */
	    gpuAcceleration: true,
	    /**
	     * @prop {string} [x='bottom']
	     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
	     * Change this if your popper should grow in a direction different from `bottom`
	     */
	    x: 'bottom',
	    /**
	     * @prop {string} [x='left']
	     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
	     * Change this if your popper should grow in a direction different from `right`
	     */
	    y: 'right'
	  },

	  /**
	   * Applies the computed styles to the popper element.
	   *
	   * All the DOM manipulations are limited to this modifier. This is useful in case
	   * you want to integrate Popper.js inside a framework or view library and you
	   * want to delegate all the DOM manipulations to it.
	   *
	   * Note that if you disable this modifier, you must make sure the popper element
	   * has its position set to `absolute` before Popper.js can do its work!
	   *
	   * Just disable this modifier and define you own to achieve the desired effect.
	   *
	   * @memberof modifiers
	   * @inner
	   */
	  applyStyle: {
	    /** @prop {number} order=900 - Index used to define the order of execution */
	    order: 900,
	    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
	    enabled: true,
	    /** @prop {ModifierFn} */
	    fn: applyStyle,
	    /** @prop {Function} */
	    onLoad: applyStyleOnLoad,
	    /**
	     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
	     * @prop {Boolean} gpuAcceleration=true
	     * If true, it uses the CSS 3d transformation to position the popper.
	     * Otherwise, it will use the `top` and `left` properties.
	     */
	    gpuAcceleration: undefined
	  }
	};

	/**
	 * The `dataObject` is an object containing all the informations used by Popper.js
	 * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
	 * @name dataObject
	 * @property {Object} data.instance The Popper.js instance
	 * @property {String} data.placement Placement applied to popper
	 * @property {String} data.originalPlacement Placement originally defined on init
	 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
	 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
	 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
	 * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
	 * @property {Object} data.boundaries Offsets of the popper boundaries
	 * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
	 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
	 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
	 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
	 */

	/**
	 * Default options provided to Popper.js constructor.<br />
	 * These can be overriden using the `options` argument of Popper.js.<br />
	 * To override an option, simply pass as 3rd argument an object with the same
	 * structure of this object, example:
	 * ```
	 * new Popper(ref, pop, {
	 *   modifiers: {
	 *     preventOverflow: { enabled: false }
	 *   }
	 * })
	 * ```
	 * @type {Object}
	 * @static
	 * @memberof Popper
	 */
	var Defaults$1 = {
	  /**
	   * Popper's placement
	   * @prop {Popper.placements} placement='bottom'
	   */
	  placement: 'bottom',

	  /**
	   * Whether events (resize, scroll) are initially enabled
	   * @prop {Boolean} eventsEnabled=true
	   */
	  eventsEnabled: true,

	  /**
	   * Set to true if you want to automatically remove the popper when
	   * you call the `destroy` method.
	   * @prop {Boolean} removeOnDestroy=false
	   */
	  removeOnDestroy: false,

	  /**
	   * Callback called when the popper is created.<br />
	   * By default, is set to no-op.<br />
	   * Access Popper.js instance with `data.instance`.
	   * @prop {onCreate}
	   */
	  onCreate: function onCreate() {},

	  /**
	   * Callback called when the popper is updated, this callback is not called
	   * on the initialization/creation of the popper, but only on subsequent
	   * updates.<br />
	   * By default, is set to no-op.<br />
	   * Access Popper.js instance with `data.instance`.
	   * @prop {onUpdate}
	   */
	  onUpdate: function onUpdate() {},

	  /**
	   * List of modifiers used to modify the offsets before they are applied to the popper.
	   * They provide most of the functionalities of Popper.js
	   * @prop {modifiers}
	   */
	  modifiers: modifiers
	};

	/**
	 * @callback onCreate
	 * @param {dataObject} data
	 */

	/**
	 * @callback onUpdate
	 * @param {dataObject} data
	 */

	// Utils
	// Methods
	var Popper = function () {
	  /**
	   * Create a new Popper.js instance
	   * @class Popper
	   * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
	   * @param {HTMLElement} popper - The HTML element used as popper.
	   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
	   * @return {Object} instance - The generated Popper.js instance
	   */
	  function Popper(reference, popper) {
	    var _this = this;

	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    classCallCheck(this, Popper);

	    this.scheduleUpdate = function () {
	      return requestAnimationFrame(_this.update);
	    };

	    // make update() debounced, so that it only runs at most once-per-tick
	    this.update = debounce(this.update.bind(this));

	    // with {} we create a new object with the options inside it
	    this.options = _extends({}, Popper.Defaults, options);

	    // init state
	    this.state = {
	      isDestroyed: false,
	      isCreated: false,
	      scrollParents: []
	    };

	    // get reference and popper elements (allow jQuery wrappers)
	    this.reference = reference.jquery ? reference[0] : reference;
	    this.popper = popper.jquery ? popper[0] : popper;

	    // Deep merge modifiers options
	    this.options.modifiers = {};
	    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
	      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
	    });

	    // Refactoring modifiers' list (Object => Array)
	    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
	      return _extends({
	        name: name
	      }, _this.options.modifiers[name]);
	    })
	    // sort the modifiers by order
	    .sort(function (a, b) {
	      return a.order - b.order;
	    });

	    // modifiers have the ability to execute arbitrary code when Popper.js get inited
	    // such code is executed in the same order of its modifier
	    // they could add new properties to their options configuration
	    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
	    this.modifiers.forEach(function (modifierOptions) {
	      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
	        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
	      }
	    });

	    // fire the first update to position the popper in the right place
	    this.update();

	    var eventsEnabled = this.options.eventsEnabled;
	    if (eventsEnabled) {
	      // setup event listeners, they will take care of update the position in specific situations
	      this.enableEventListeners();
	    }

	    this.state.eventsEnabled = eventsEnabled;
	  }

	  // We can't use class properties because they don't get listed in the
	  // class prototype and break stuff like Sinon stubs


	  createClass(Popper, [{
	    key: 'update',
	    value: function update$$1() {
	      return update.call(this);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy$$1() {
	      return destroy.call(this);
	    }
	  }, {
	    key: 'enableEventListeners',
	    value: function enableEventListeners$$1() {
	      return enableEventListeners.call(this);
	    }
	  }, {
	    key: 'disableEventListeners',
	    value: function disableEventListeners$$1() {
	      return disableEventListeners.call(this);
	    }

	    /**
	     * Schedule an update, it will run on the next UI update available
	     * @method scheduleUpdate
	     * @memberof Popper
	     */

	    /**
	     * Collection of utilities useful when writing custom modifiers.
	     * Starting from version 1.7, this method is available only if you
	     * include `popper-utils.js` before `popper.js`.
	     *
	     * **DEPRECATION**: This way to access PopperUtils is deprecated
	     * and will be removed in v2! Use the PopperUtils module directly instead.
	     * Due to the high instability of the methods contained in Utils, we can't
	     * guarantee them to follow semver. Use them at your own risk!
	     * @static
	     * @private
	     * @type {Object}
	     * @deprecated since version 1.8
	     * @member Utils
	     * @memberof Popper
	     */

	  }]);
	  return Popper;
	}();

	/**
	 * The `referenceObject` is an object that provides an interface compatible with Popper.js
	 * and lets you use it as replacement of a real DOM node.<br />
	 * You can use this method to position a popper relatively to a set of coordinates
	 * in case you don't have a DOM node to use as reference.
	 *
	 * ```
	 * new Popper(referenceObject, popperNode);
	 * ```
	 *
	 * NB: This feature isn't supported in Internet Explorer 10
	 * @name referenceObject
	 * @property {Function} data.getBoundingClientRect
	 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
	 * @property {number} data.clientWidth
	 * An ES6 getter that will return the width of the virtual reference element.
	 * @property {number} data.clientHeight
	 * An ES6 getter that will return the height of the virtual reference element.
	 */

	Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
	Popper.placements = placements;
	Popper.Defaults = Defaults$1;

	/**
	* Returns the distance taking into account the default distance due to
	* the transform: translate setting in CSS
	* @param {Number} distance
	* @return {String}
	*/
	function getOffsetDistanceInPx(distance) {
	    return -(distance - Defaults.distance) + 'px';
	}

	var classCallCheck$1 = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass$1 = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();







	var _extends$1 = Object.assign || function (target) {
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

	/**
	* Creates a new popper instance
	* @param {Object} refData
	* @return {Object} - the popper instance
	*/
	function createPopperInstance(refData) {
	    var el = refData.el,
	        popper = refData.popper,
	        _refData$settings = refData.settings,
	        position = _refData$settings.position,
	        popperOptions = _refData$settings.popperOptions,
	        offset = _refData$settings.offset,
	        distance = _refData$settings.distance,
	        flipDuration = _refData$settings.flipDuration;


	    var tooltip = popper.querySelector(Selectors.TOOLTIP);
	    var flipped = void 0;

	    var config = _extends$1({
	        placement: position
	    }, popperOptions || {}, {
	        modifiers: _extends$1({}, popperOptions ? popperOptions.modifiers : {}, {
	            flip: _extends$1({
	                padding: distance + 5 /* 5px from viewport boundary */
	            }, popperOptions && popperOptions.modifiers ? popperOptions.modifiers.flip : {}),
	            offset: _extends$1({
	                offset: offset
	            }, popperOptions && popperOptions.modifiers ? popperOptions.modifiers.offset : {})
	        }),
	        onUpdate: function onUpdate(data) {
	            tooltip.style.top = '';
	            tooltip.style.bottom = '';
	            tooltip.style.left = '';
	            tooltip.style.right = '';
	            tooltip.style[getCorePlacement(popper.getAttribute('x-placement'))] = getOffsetDistanceInPx(distance);
	        }
	    });

	    return new Popper(el, popper, config);
	}

	/**
	* Appends the popper and creates a popper instance if one does not exist
	* Also updates its position if need be and enables event listeners
	* @param {Object} refData -  the element/popper reference data
	*/
	function mountPopper(refData) {
	    var el = refData.el,
	        popper = refData.popper,
	        _refData$settings = refData.settings,
	        appendTo = _refData$settings.appendTo,
	        followCursor = _refData$settings.followCursor,
	        flipDuration = _refData$settings.flipDuration;

	    // Already on the DOM

	    if (appendTo.contains(popper)) return;

	    appendTo.appendChild(popper);

	    if (!refData.popperInstance) {
	        // Create instance if it hasn't been created yet
	        refData.popperInstance = createPopperInstance(refData);

	        // Update the popper's position whenever its content changes
	        // Not supported in IE10 unless polyfilled
	        if (window.MutationObserver) {
	            var styles = popper.style;
	            var observer = new MutationObserver(function () {
	                styles[prefix('transitionDuration')] = '0ms';
	                refData.popperInstance.update();
	                queueExecution(function () {
	                    styles[prefix('transitionDuration')] = flipDuration + 'ms';
	                });
	            });
	            observer.observe(popper, {
	                childList: true,
	                subtree: true,
	                characterData: true
	            });
	            refData._mutationObserver = observer;
	        }
	    } else {
	        refData.popperInstance.update();

	        if (!followCursor || Browser.touch) {
	            refData.popperInstance.enableEventListeners();
	        }
	    }

	    // Since touch is determined dynamically, followCursor setting
	    // is set on mount
	    if (followCursor && !Browser.touch) {
	        el.addEventListener('mousemove', followCursorHandler);
	        refData.popperInstance.disableEventListeners();
	    }
	}

	/**
	* Updates a popper's position on each animation frame to make it stick to a moving element
	* @param {Object} refData
	*/
	function makeSticky(refData) {
	    var popper = refData.popper,
	        popperInstance = refData.popperInstance,
	        stickyDuration = refData.settings.stickyDuration;


	    var applyTransitionDuration = function applyTransitionDuration() {
	        return popper.style[prefix('transitionDuration')] = stickyDuration + 'ms';
	    };

	    var removeTransitionDuration = function removeTransitionDuration() {
	        return popper.style[prefix('transitionDuration')] = '';
	    };

	    var updatePosition = function updatePosition() {
	        popperInstance && popperInstance.scheduleUpdate();

	        applyTransitionDuration();

	        isVisible(popper) ? window.requestAnimationFrame(updatePosition) : removeTransitionDuration();
	    };

	    // Wait until Popper's position has been updated initially
	    queueExecution(updatePosition);
	}

	/**
	* Returns an object of settings to override global settings
	* @param {Element} el - the tooltipped element
	* @param {Object} instanceSettings
	* @return {Object} - individual settings
	*/
	function getIndividualSettings(el, instanceSettings) {

	    var settings = DefaultsKeys.reduce(function (acc, key) {
	        var val = el.getAttribute('data-' + key.toLowerCase()) || instanceSettings[key];

	        // Convert strings to booleans
	        if (val === 'false') val = false;
	        if (val === 'true') val = true;

	        // Convert number strings to true numbers
	        if (isFinite(val) && !isNaN(parseFloat(val))) {
	            val = parseFloat(val);
	        }

	        // Convert array strings to actual arrays
	        if (typeof val === 'string' && val.trim().charAt(0) === '[') {
	            val = JSON.parse(val);
	        }

	        acc[key] = val;

	        return acc;
	    }, {});

	    return _extends$1({}, instanceSettings, settings);
	}

	/**
	* Creates a popper element then returns it
	* @param {Number} id - the popper id
	* @param {String} title - the tooltip's `title` attribute
	* @param {Object} settings - individual settings
	* @return {Element} - the popper element
	*/
	function createPopperElement(id, title, settings) {
	    var position = settings.position,
	        distance = settings.distance,
	        arrow = settings.arrow,
	        animateFill = settings.animateFill,
	        inertia = settings.inertia,
	        animation = settings.animation,
	        arrowSize = settings.arrowSize,
	        size = settings.size,
	        theme = settings.theme,
	        html = settings.html,
	        zIndex = settings.zIndex,
	        interactive = settings.interactive;


	    var popper = document.createElement('div');
	    popper.setAttribute('class', 'tippy-popper');
	    popper.setAttribute('role', 'tooltip');
	    popper.setAttribute('aria-hidden', 'true');
	    popper.setAttribute('id', 'tippy-tooltip-' + id);
	    popper.style.zIndex = zIndex;

	    var tooltip = document.createElement('div');
	    tooltip.setAttribute('class', 'tippy-tooltip tippy-tooltip--' + size + ' leave');
	    tooltip.setAttribute('data-animation', animation);

	    theme.split(' ').forEach(function (t) {
	        tooltip.classList.add(t + '-theme');
	    });

	    if (arrow) {
	        // Add an arrow
	        var _arrow = document.createElement('div');
	        _arrow.setAttribute('class', 'arrow-' + arrowSize);
	        _arrow.setAttribute('x-arrow', '');
	        tooltip.appendChild(_arrow);
	    }

	    if (animateFill) {
	        // Create animateFill circle element for animation
	        tooltip.setAttribute('data-animatefill', '');
	        var circle = document.createElement('div');
	        circle.setAttribute('class', 'leave');
	        circle.setAttribute('x-circle', '');
	        tooltip.appendChild(circle);
	    }

	    if (inertia) {
	        // Change transition timing function cubic bezier
	        tooltip.setAttribute('data-inertia', '');
	    }

	    if (interactive) {
	        tooltip.setAttribute('data-interactive', '');
	    }

	    // Tooltip content (text or HTML)
	    var content = document.createElement('div');
	    content.setAttribute('class', 'tippy-tooltip-content');

	    if (html) {

	        var templateId = void 0;

	        if (html instanceof Element) {
	            content.appendChild(html);
	            templateId = '#' + html.id || 'tippy-html-template';
	        } else {
	            content.innerHTML = document.getElementById(html.replace('#', '')).innerHTML;
	            templateId = html;
	        }

	        popper.classList.add('html-template');
	        interactive && popper.setAttribute('tabindex', '-1');
	        tooltip.setAttribute('data-template-id', templateId);
	    } else {
	        content.innerHTML = title;
	    }

	    // Init distance. Further updates are made in the popper instance's `onUpdate()` method
	    tooltip.style[getCorePlacement(position)] = getOffsetDistanceInPx(distance);

	    tooltip.appendChild(content);
	    popper.appendChild(tooltip);

	    return popper;
	}

	/**
	* Creates a trigger
	* @param {Object} event - the custom event specified in the `trigger` setting
	* @param {Element} el - tooltipped element
	* @param {Object} handlers - the handlers for each listener
	* @param {Boolean} touchHold
	* @return {Array} - array of listener objects
	*/
	function createTrigger(event, el, handlers, touchHold) {
	    var listeners = [];

	    if (event === 'manual') return listeners;

	    // Enter
	    el.addEventListener(event, handlers.handleTrigger);
	    listeners.push({
	        event: event,
	        handler: handlers.handleTrigger
	    });

	    // Leave
	    if (event === 'mouseenter') {

	        if (Browser.SUPPORTS_TOUCH && touchHold) {
	            el.addEventListener('touchstart', handlers.handleTrigger);
	            listeners.push({
	                event: 'touchstart',
	                handler: handlers.handleTrigger
	            });
	            el.addEventListener('touchend', handlers.handleMouseleave);
	            listeners.push({
	                event: 'touchend',
	                handler: handlers.handleMouseleave
	            });
	        }

	        el.addEventListener('mouseleave', handlers.handleMouseleave);
	        listeners.push({
	            event: 'mouseleave',
	            handler: handlers.handleMouseleave
	        });
	    }

	    if (event === 'focus') {
	        el.addEventListener('blur', handlers.handleBlur);
	        listeners.push({
	            event: 'blur',
	            handler: handlers.handleBlur
	        });
	    }

	    return listeners;
	}

	/**
	* Determines if the mouse's cursor is outside the interactive border
	* @param {MouseEvent} event
	* @param {Element} popper
	* @param {Object} settings
	* @return {Boolean}
	*/
	function cursorIsOutsideInteractiveBorder(event, popper, settings) {
	    if (!popper.getAttribute('x-placement')) return true;

	    var x = event.clientX,
	        y = event.clientY;
	    var interactiveBorder = settings.interactiveBorder,
	        distance = settings.distance;


	    var rect = popper.getBoundingClientRect();
	    var corePosition = getCorePlacement(popper.getAttribute('x-placement'));
	    var borderWithDistance = interactiveBorder + distance;

	    var exceeds = {
	        top: rect.top - y > interactiveBorder,
	        bottom: y - rect.bottom > interactiveBorder,
	        left: rect.left - x > interactiveBorder,
	        right: x - rect.right > interactiveBorder
	    };

	    switch (corePosition) {
	        case 'top':
	            exceeds.top = rect.top - y > borderWithDistance;
	            break;
	        case 'bottom':
	            exceeds.bottom = y - rect.bottom > borderWithDistance;
	            break;
	        case 'left':
	            exceeds.left = rect.left - x > borderWithDistance;
	            break;
	        case 'right':
	            exceeds.right = x - rect.right > borderWithDistance;
	            break;
	    }

	    return exceeds.top || exceeds.bottom || exceeds.left || exceeds.right;
	}

	/**
	* Returns relevant listener callbacks for each ref
	* @param {Element} el
	* @param {Element} popper
	* @param {Object} settings
	* @return {Object} - relevant listener callback methods
	*/
	function getEventListenerHandlers(el, popper, settings) {
	    var _this = this;

	    var position = settings.position,
	        delay = settings.delay,
	        duration = settings.duration,
	        interactive = settings.interactive,
	        interactiveBorder = settings.interactiveBorder,
	        distance = settings.distance,
	        hideOnClick = settings.hideOnClick,
	        trigger = settings.trigger,
	        touchHold = settings.touchHold,
	        touchWait = settings.touchWait;


	    var showDelay = void 0,
	        hideDelay = void 0;

	    var clearTimeouts = function clearTimeouts() {
	        clearTimeout(showDelay);
	        clearTimeout(hideDelay);
	    };

	    var _show = function _show() {
	        clearTimeouts();

	        // Not hidden. For clicking when it also has a `focus` event listener
	        if (isVisible(popper)) return;

	        var _delay = Array.isArray(delay) ? delay[0] : delay;

	        if (delay) {
	            showDelay = setTimeout(function () {
	                return _this.show(popper);
	            }, _delay);
	        } else {
	            _this.show(popper);
	        }
	    };

	    var show = function show(event) {
	        return _this.callbacks.wait ? _this.callbacks.wait.call(popper, _show, event) : _show();
	    };

	    var hide = function hide() {
	        clearTimeouts();

	        var _delay = Array.isArray(delay) ? delay[1] : delay;

	        if (delay) {
	            hideDelay = setTimeout(function () {
	                return _this.hide(popper);
	            }, _delay);
	        } else {
	            _this.hide(popper);
	        }
	    };

	    var handleTrigger = function handleTrigger(event) {

	        var mouseenterTouch = event.type === 'mouseenter' && Browser.SUPPORTS_TOUCH && Browser.touch;

	        if (mouseenterTouch && touchHold) return;

	        // Toggle show/hide when clicking click-triggered tooltips
	        var isClick = event.type === 'click';
	        var isNotPersistent = hideOnClick !== 'persistent';

	        isClick && isVisible(popper) && isNotPersistent ? hide() : show(event);

	        if (mouseenterTouch && Browser.iOS() && el.click) {
	            el.click();
	        }
	    };

	    var handleMouseleave = function handleMouseleave(event) {

	        // Don't fire 'mouseleave', use the 'touchend'
	        if (event.type === 'mouseleave' && Browser.SUPPORTS_TOUCH && Browser.touch && touchHold) {
	            return;
	        }

	        if (interactive) {
	            // Temporarily handle mousemove to check if the mouse left somewhere
	            // other than its popper
	            var handleMousemove = function handleMousemove(event) {

	                var triggerHide = function triggerHide() {
	                    document.body.removeEventListener('mouseleave', hide);
	                    document.removeEventListener('mousemove', handleMousemove);
	                    hide();
	                };

	                var closestTooltippedEl = closest(event.target, Selectors.TOOLTIPPED_EL);

	                var isOverPopper = closest(event.target, Selectors.POPPER) === popper;
	                var isOverEl = closestTooltippedEl === el;
	                var isClickTriggered = trigger.indexOf('click') !== -1;
	                var isOverOtherTooltippedEl = closestTooltippedEl && closestTooltippedEl !== el;

	                if (isOverOtherTooltippedEl) {
	                    return triggerHide();
	                }

	                if (isOverPopper || isOverEl || isClickTriggered) return;

	                if (cursorIsOutsideInteractiveBorder(event, popper, settings)) {
	                    triggerHide();
	                }
	            };

	            document.body.addEventListener('mouseleave', hide);
	            document.addEventListener('mousemove', handleMousemove);

	            return;
	        }

	        // If it's not interactive, just hide it
	        hide();
	    };

	    var handleBlur = function handleBlur(event) {
	        // Ignore blur on touch devices, if there is no `relatedTarget`, hide
	        // If the related target is a popper, ignore
	        if (!event.relatedTarget || Browser.touch) return;
	        if (closest(event.relatedTarget, Selectors.POPPER)) return;

	        hide();
	    };

	    return {
	        handleTrigger: handleTrigger,
	        handleMouseleave: handleMouseleave,
	        handleBlur: handleBlur
	    };
	}

	var idCounter = 1;

	/**
	* Creates tooltips for all el elements that match the instance's selector
	* @param {Element[]} els - Array of elements
	* @return {Object[]} Array of ref data objects
	*/
	function createTooltips(els) {
	    var _this = this;

	    return els.reduce(function (a, el) {

	        var settings = _this.settings.performance ? _this.settings : getIndividualSettings(el, _this.settings);

	        // animateFill is disabled if an arrow is true
	        if (settings.arrow) settings.animateFill = false;

	        var html = settings.html,
	            trigger = settings.trigger,
	            touchHold = settings.touchHold;


	        var title = el.getAttribute('title');
	        if (!title && !html) return a;

	        var id = idCounter;
	        el.setAttribute('data-tooltipped', '');
	        el.setAttribute('aria-describedby', 'tippy-tooltip-' + id);
	        removeTitle(el);

	        var popper = createPopperElement(id, title, settings);
	        var handlers = getEventListenerHandlers.call(_this, el, popper, settings);
	        var listeners = [];

	        trigger.trim().split(' ').forEach(function (event) {
	            return listeners = listeners.concat(createTrigger(event, el, handlers, touchHold));
	        });

	        a.push({
	            id: id,
	            el: el,
	            popper: popper,
	            settings: settings,
	            listeners: listeners,
	            tippyInstance: _this
	        });

	        idCounter++;

	        return a;
	    }, []);
	}

	/* Utility functions */
	/* Core library functions */
	/**
	* @param {String|Element} selector
	* @param {Object} settings (optional) - the object of settings to be applied to the instance
	*/

	var Tippy = function () {
	    function Tippy(selector) {
	        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	        classCallCheck$1(this, Tippy);


	        // Use default browser tooltip on unsupported browsers
	        if (!Browser.SUPPORTED) return;

	        // DOM is presumably mostly ready (for document.body) by instantiation time
	        init();

	        this.state = {
	            destroyed: false
	        };

	        this.selector = selector;

	        this.settings = _extends$1({}, Defaults, settings);

	        // DEPRECATION: `on` prefixed callbacks are now preferred over non-
	        // as it better indicates it's a callback function
	        this.callbacks = {
	            wait: settings.wait,
	            show: settings.onShow || settings.show || noop,
	            shown: settings.onShown || settings.shown || noop,
	            hide: settings.onHide || settings.hide || noop,
	            hidden: settings.onHidden || settings.hidden || noop
	        };

	        this.store = createTooltips.call(this, getArrayOfElements(selector));
	        Store.push.apply(Store, this.store);
	    }

	    /**
	    * Returns the reference element's popper element
	    * @param {Element} el
	    * @return {Element}
	    */


	    createClass$1(Tippy, [{
	        key: 'getPopperElement',
	        value: function getPopperElement(el) {
	            try {
	                return find(this.store, function (refData) {
	                    return refData.el === el;
	                }).popper;
	            } catch (e) {
	                console.error('[getPopperElement]: Element passed as the argument does not exist in the instance');
	            }
	        }

	        /**
	        * Returns a popper's reference element
	        * @param {Element} popper
	        * @return {Element}
	        */

	    }, {
	        key: 'getReferenceElement',
	        value: function getReferenceElement(popper) {
	            try {
	                return find(this.store, function (refData) {
	                    return refData.popper === popper;
	                }).el;
	            } catch (e) {
	                console.error('[getReferenceElement]: Popper passed as the argument does not exist in the instance');
	            }
	        }

	        /**
	        * Returns the reference data object from either the reference element or popper element
	        * @param {Element} x (reference element or popper)
	        * @return {Object}
	        */

	    }, {
	        key: 'getReferenceData',
	        value: function getReferenceData(x) {
	            return find(this.store, function (refData) {
	                return refData.el === x || refData.popper === x;
	            });
	        }

	        /**
	        * Shows a popper
	        * @param {Element} popper
	        * @param {Number} customDuration (optional)
	        */

	    }, {
	        key: 'show',
	        value: function show(popper, customDuration) {
	            var _this = this;

	            if (this.state.destroyed) return;

	            this.callbacks.show.call(popper);

	            var refData = find(this.store, function (refData) {
	                return refData.popper === popper;
	            });
	            var tooltip = popper.querySelector(Selectors.TOOLTIP);
	            var circle = popper.querySelector(Selectors.CIRCLE);
	            var content = popper.querySelector(Selectors.CONTENT);

	            var el = refData.el,
	                _refData$settings = refData.settings,
	                appendTo = _refData$settings.appendTo,
	                sticky = _refData$settings.sticky,
	                interactive = _refData$settings.interactive,
	                followCursor = _refData$settings.followCursor,
	                flipDuration = _refData$settings.flipDuration,
	                duration = _refData$settings.duration;


	            var _duration = customDuration !== undefined ? customDuration : Array.isArray(duration) ? duration[0] : duration;

	            // Remove transition duration (prevent a transition when popper changes position)
	            applyTransitionDuration([popper, tooltip, circle], 0);

	            mountPopper(refData);

	            popper.style.visibility = 'visible';
	            popper.setAttribute('aria-hidden', 'false');

	            // Wait for popper to update position and alter x-placement
	            queueExecution(function () {
	                if (!isVisible(popper)) return;

	                // Sometimes the arrow will not be in the correct position,
	                // force another update
	                if (!followCursor || Browser.touch) {
	                    refData.popperInstance.update();
	                }

	                // Re-apply transition durations
	                applyTransitionDuration([tooltip, circle], _duration);
	                if (!followCursor || Browser.touch) {
	                    applyTransitionDuration([popper], flipDuration);
	                }

	                // Make content fade out a bit faster than the tooltip if `animateFill`
	                if (circle) content.style.opacity = 1;

	                // Interactive tooltips receive a class of 'active'
	                interactive && el.classList.add('active');

	                // Update popper's position on every animation frame
	                sticky && makeSticky(refData);

	                // Repaint/reflow is required for CSS transition when appending
	                triggerReflow(tooltip, circle);

	                modifyClassList([tooltip, circle], function (list) {
	                    list.contains('tippy-notransition') && list.remove('tippy-notransition');
	                    list.remove('leave');
	                    list.add('enter');
	                });

	                // Wait for transitions to complete
	                onTransitionEnd(refData, _duration, function () {
	                    if (!isVisible(popper) || refData._onShownFired) return;

	                    // Focus interactive tooltips only
	                    interactive && popper.focus();

	                    // Remove transitions from tooltip
	                    tooltip.classList.add('tippy-notransition');

	                    // Prevents shown() from firing more than once from early transition cancellations
	                    refData._onShownFired = true;

	                    _this.callbacks.shown.call(popper);
	                });
	            });
	        }

	        /**
	        * Hides a popper
	        * @param {Element} popper
	        * @param {Number} customDuration (optional)
	        */

	    }, {
	        key: 'hide',
	        value: function hide(popper, customDuration) {
	            var _this2 = this;

	            if (this.state.destroyed) return;

	            this.callbacks.hide.call(popper);

	            var refData = find(this.store, function (refData) {
	                return refData.popper === popper;
	            });
	            var tooltip = popper.querySelector(Selectors.TOOLTIP);
	            var circle = popper.querySelector(Selectors.CIRCLE);
	            var content = popper.querySelector(Selectors.CONTENT);

	            var el = refData.el,
	                _refData$settings2 = refData.settings,
	                appendTo = _refData$settings2.appendTo,
	                sticky = _refData$settings2.sticky,
	                interactive = _refData$settings2.interactive,
	                followCursor = _refData$settings2.followCursor,
	                html = _refData$settings2.html,
	                trigger = _refData$settings2.trigger,
	                duration = _refData$settings2.duration;


	            var _duration = customDuration !== undefined ? customDuration : Array.isArray(duration) ? duration[1] : duration;

	            refData._onShownFired = false;
	            interactive && el.classList.remove('active');

	            popper.style.visibility = 'hidden';
	            popper.setAttribute('aria-hidden', 'true');

	            applyTransitionDuration([tooltip, circle, circle ? content : null], _duration);

	            if (circle) content.style.opacity = 0;

	            modifyClassList([tooltip, circle], function (list) {
	                list.contains('tippy-tooltip') && list.remove('tippy-notransition');
	                list.remove('enter');
	                list.add('leave');
	            });

	            // Re-focus click-triggered html elements
	            // and the tooltipped element IS in the viewport (otherwise it causes unsightly scrolling
	            // if the tooltip is closed and the element isn't in the viewport anymore)
	            if (html && trigger.indexOf('click') !== -1 && elementIsInViewport(el)) {
	                el.focus();
	            }

	            // Wait for transitions to complete
	            onTransitionEnd(refData, _duration, function () {
	                if (isVisible(popper) || !appendTo.contains(popper)) return;

	                el.removeEventListener('mousemove', followCursorHandler);

	                refData.popperInstance.disableEventListeners();

	                appendTo.removeChild(popper);

	                _this2.callbacks.hidden.call(popper);
	            });
	        }

	        /**
	        * Updates a popper with new content
	        * @param {Element} popper
	        */

	    }, {
	        key: 'update',
	        value: function update(popper) {
	            if (this.state.destroyed) return;

	            var refData = find(this.store, function (refData) {
	                return refData.popper === popper;
	            });
	            var content = popper.querySelector(Selectors.CONTENT);
	            var el = refData.el,
	                html = refData.settings.html;


	            if (html instanceof Element) {
	                console.warn('Aborted: update() should not be used if `html` is a DOM element');
	                return;
	            }

	            content.innerHTML = html ? document.getElementById(html.replace('#', '')).innerHTML : el.getAttribute('title') || el.getAttribute('data-original-title');

	            if (!html) removeTitle(el);
	        }

	        /**
	        * Destroys a popper
	        * @param {Element} popper
	        * @param {Boolean} _isLast - private param used by destroyAll to optimize
	        */

	    }, {
	        key: 'destroy',
	        value: function destroy(popper, _isLast) {
	            var _this3 = this;

	            if (this.state.destroyed) return;

	            var refData = find(this.store, function (refData) {
	                return refData.popper === popper;
	            });

	            var el = refData.el,
	                popperInstance = refData.popperInstance,
	                listeners = refData.listeners,
	                _mutationObserver = refData._mutationObserver;

	            // Ensure the popper is hidden

	            if (isVisible(popper)) {
	                this.hide(popper, 0);
	            }

	            // Remove Tippy-only event listeners from tooltipped element
	            listeners.forEach(function (listener) {
	                return el.removeEventListener(listener.event, listener.handler);
	            });

	            // Restore original title
	            el.setAttribute('title', el.getAttribute('data-original-title'));

	            el.removeAttribute('data-original-title');
	            el.removeAttribute('data-tooltipped');
	            el.removeAttribute('aria-describedby');

	            popperInstance && popperInstance.destroy();
	            _mutationObserver && _mutationObserver.disconnect();

	            // Remove from store
	            Store.splice(findIndex(Store, function (refData) {
	                return refData.popper === popper;
	            }), 1);

	            // Ensure filter is called only once
	            if (_isLast === undefined || _isLast) {
	                this.store = Store.filter(function (refData) {
	                    return refData.tippyInstance === _this3;
	                });
	            }
	        }

	        /**
	        * Destroys all tooltips created by the instance
	        */

	    }, {
	        key: 'destroyAll',
	        value: function destroyAll() {
	            var _this4 = this;

	            if (this.state.destroyed) return;

	            var storeLength = this.store.length;

	            this.store.forEach(function (_ref, index) {
	                var popper = _ref.popper;

	                _this4.destroy(popper, index === storeLength - 1);
	            });

	            this.store = null;
	            this.state.destroyed = true;
	        }
	    }]);
	    return Tippy;
	}();

	function tippy$2(selector, settings) {
	    return new Tippy(selector, settings);
	}

	tippy$2.Browser = Browser;
	tippy$2.Defaults = Defaults;
	tippy$2.disableDynamicInputDetection = function () {
	    return Browser.dynamicInputDetection = false;
	};
	tippy$2.enableDynamicInputDetection = function () {
	    return Browser.dynamicInputDetection = true;
	};

	return tippy$2;

	})));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.parse = exports.getChapter = undefined;

	var _escapeStringRegexp = __webpack_require__(3);

	var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

	var _reference = __webpack_require__(4);

	var _reference2 = _interopRequireDefault(_reference);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var chapters = [["Al-Fatihah", "The Opener", "الفاتحة"], ["Al-Baqarah", "The Cow", "البقرة"], ["Ali 'Imran", "Family of Imran", "آل عمران"], ["An-Nisa", "The Women", "النساء"], ["Al-Ma'idah", "The Table Spread", "المائدة"], ["Al-An'am", "The Cattle", "الأنعام"], ["Al-A'raf", "The Heights", "الأعراف"], ["Al-Anfal", "The Spoils of War", "الأنفال"], ["At-Tawbah", "The Repentance", "التوبة"], ["Yunus", "Jonah", "يونس"], ["Hud", "Hud", "هود"], ["Yusuf", "Joseph", "يوسف"], ["Ar-Ra'd", "The Thunder", "الرّعد"], ["Ibrahim", "Abrahim", "إبراهيم"], ["Al-Hijr", "The Rocky Tract", "الحجر"], ["An-Nahl", "The Bee", "النحل"], ["Al-Isra", "The Night Journey", "الإسراء"], ["Al-Kahf", "The Cave", "الكهف"], ["Maryam", "Mary", "مريم"], ["Taha", "Ta-Ha", "طه"], ["Al-Anbya", "The Prophets", "الأنبياء"], ["Al-Haj", "The Pilgrimage", "الحج"], ["Al-Mu'minun", "The Believers", "المؤمنون"], ["An-Nur", "The Light", "النّور"], ["Al-Furqan", "The Criterian", "الفرقان"], ["Ash-Shu'ara", "The Poets", "الشعراء"], ["An-Naml", "The Ant", "النمل"], ["Al-Qasas", "The Stories", "القصص"], ["Al-'Ankabut", "The Spider", "العنكبوت"], ["Ar-Rum", "The Romans", "الروم"], ["Luqman", "Luqman", "لقمان"], ["As-Sajdah", "The Prostration", "السجدة"], ["Al-Ahzab", "The Combined Forces", "الأحزاب"], ["Saba", "Sheba", "سبإ"], ["Fatir", "Originator", "فاطر"], ["Ya-Sin", "Ya Sin", "يس"], ["As-Saffat", "Those who set the Ranks", "الصّافّات"], ["Sad", "The Letter \"Saad\"", "ص"], ["Az-Zumar", "The Troops", "الزمر"], ["Ghafir", "The Forgiver", "غافر"], ["Fussilat", "Explained in Detail", "فصّلت"], ["Ash-Shuraa", "The Consultation", "الشورى"], ["Az-Zukhruf", "The Ornaments of Gold", "الزخرف"], ["Ad-Dukhan", "The Smoke", "الدخان"], ["Al-Jathiyah", "The Crouching", "الجاثية"], ["Al-Ahqaf", "The Wind-Curved Sandhills", "الأحقاف"], ["Muhammad", "Muhammad", "محمّـد"], ["Al-Fath", "The Victory", "الفتح"], ["Al-Hujurat", "The Rooms", "الحُـجُـرات"], ["Qaf", "The Letter \"Qaf\"", "ق"], ["Adh-Dhariyat", "The Winnowing Winds", "الذاريات"], ["At-Tur", "The Mount", "الـطور"], ["An-Najm", "The Star", "الـنحـم"], ["Al-Qamar", "The Moon", "الـقمـر"], ["Ar-Rahman", "The Beneficent", "الـرحـمـن"], ["Al-Waqi'ah", "The Inevitable", "الواقيـة"], ["Al-Hadid", "The Iron", "الحـديد"], ["Al-Mujadila", "The Pleading Woman", "الـمجادلـة"], ["Al-Hashr", "The Exile", "الـحـشـر"], ["Al-Mumtahanah", "She that is to be examined", "الـمـمـتـحنة"], ["As-Saf", "The Ranks", "الـصّـف"], ["Al-Jumu'ah", "The Congregation, Friday", "الـجـمـعـة"], ["Al-Munafiqun", "The Hypocrites", "الـمنافقون"], ["At-Taghabun", "The Mutual Disillusion", "الـتغابن"], ["At-Talaq", "The Divorce", "الـطلاق"], ["At-Tahrim", "The Prohibtiion", "الـتحريم"], ["Al-Mulk", "The Sovereignty", "الـملك"], ["Al-Qalam", "The Pen", "الـقـلـم"], ["Al-Haqqah", "The Reality", "الـحاقّـة"], ["Al-Ma'arij", "The Ascending Stairways", "الـمعارج"], ["Nuh", "Noah", "نوح"], ["Al-Jinn", "The Jinn", "الجن"], ["Al-Muzzammil", "The Enshrouded One", "الـمـزّمّـل"], ["Al-Muddaththir", "The Cloaked One", "الـمّـدّثّـر"], ["Al-Qiyamah", "The Resurrection", "الـقـيامـة"], ["Al-Insan", "The Man", "الإنسان"], ["Al-Mursalat", "The Emissaries", "الـمرسلات"], ["An-Naba", "The Tidings", "الـنبإ"], ["An-Nazi'at", "Those who drag forth", "الـنازعات"], ["'Abasa", "He Frowned", "عبس"], ["At-Takwir", "The Overthrowing", "التكوير"], ["Al-Infitar", "The Cleaving", "الانفطار"], ["Al-Mutaffifin", "The Defrauding", "المطـفـفين"], ["Al-Inshiqaq", "The Sundering", "الانشقاق"], ["Al-Buruj", "The Mansions of the Stars", "البروج"], ["At-Tariq", "The Nightcommer", "الـطارق"], ["Al-A'la", "The Most High", "الأعـلى"], ["Al-Ghashiyah", "The Overwhelming", "الغاشـيـة"], ["Al-Fajr", "The Dawn", "الفجر"], ["Al-Balad", "The City", "الـبلد"], ["Ash-Shams", "The Sun", "الـشـمـس"], ["Al-Layl", "The Night", "اللـيـل"], ["Ad-Duhaa", "The Morning Hours", "الضـحى"], ["Ash-Sharh", "The Relief", "الـشرح"], ["At-Tin", "The Fig", "الـتين"], ["Al-'Alaq", "The Clot", "الـعلق"], ["Al-Qadr", "The Power", "الـقدر"], ["Al-Bayyinah", "The Clear Proof", "الـبينة"], ["Az-Zalzalah", "The Earthquake", "الـزلزلة"], ["Al-'Adiyat", "The Courser", "الـعاديات"], ["Al-Qari'ah", "The Calamity", "الـقارعـة"], ["At-Takathur", "The Rivalry in world increase", "الـتكاثر"], ["Al-'Asr", "The Declining Day", "الـعصر"], ["Al-Humazah", "The Traducer", "الـهمزة"], ["Al-Fil", "The Elephant", "الـفيل"], ["Quraysh", "Quraysh", "قريش"], ["Al-Ma'un", "The Small Kindesses", "المـاعون"], ["Al-Kawthar", "The Abundance", "الـكوثر"], ["Al-Kafirun", "The Disbelievers", "الـكافرون"], ["An-Nasr", "The Divine Support", "الـنصر"], ["Al-Masad", "The Palm Fiber", "الـمسد"], ["Al-Ikhlas", "The Sincerity", "الإخلاص"], ["Al-Falaq", "The Daybreak", "الـفلق"], ["An-Nas", "The Mankind", "الـناس"]];

	// Make the array lowercase so its not case-sensitive
	chapters = chapters.map(function (list) {
	  return list.map(function (book) {
	    return book.toLowerCase().trim();
	  });
	});

	function getChapter(chapter) {
	  var c = parseInt(chapter);

	  // Chapter is already a number
	  if (!isNaN(c)) return c;

	  var bookIndex = -1;

	  // Attempt to find it in the array
	  chapters.forEach(function (b, idx) {
	    if (b.indexOf(chapter.toLowerCase().trim()) !== -1) {
	      // Do +1 as array starts at zero
	      bookIndex = idx + 1;
	    }
	  });

	  // For consistency lets stick to strings
	  return bookIndex.toString();
	}

	function parse(input) {
	  var results = [];
	  var pattern = void 0;
	  var regex = void 0;
	  var match = void 0;

	  /**
	   * Q 1:123
	   * Q 11: 123
	   * Q111:123
	   * Quran111:123
	   * Quran 1:123
	   * Koran 1:111
	   * Qur'an 1:111
	   */
	  pattern = '\n    (?:q|quran|koran|qur\\\'an)\n      \\s*\n      ([\\d]{1,3})\n      (?::\\s*\n        ([\\d\\s\\-,]+)\n      )?\n    ';

	  regex = new RegExp(pattern.replace(/[\n\s]+/g, ''), 'gi');
	  while (match = regex.exec(input)) {
	    var ref = new _reference2.default();

	    ref.order = match.index;
	    ref.text = match[0];
	    ref.type = 'quran';
	    ref.chapter = getChapter(match[1]);
	    ref.verses = match[2];

	    results.push(ref);
	  }

	  /**
	   * <ar|en chapter> 3: 21
	   * <ar|en chapter> 21-25
	   */
	  var chapterList = chapters.map(function (variations) {
	    return variations.map(function (bookName) {
	      return (0, _escapeStringRegexp2.default)(bookName);
	    }).join('|');
	  }).join('|');

	  pattern = '\n    (?:surat|\u0633\u0648\u0631\u0629)?\n    \\s*\n    (' + chapterList + '):?\n    \\s*\n      (?:([\\d]{1,3})\\s*:)?\n      \\s+\n      ([\\d\\s\\-,]+)\n    ';

	  regex = new RegExp(pattern.replace(/[\n\s]+/g, ''), 'gi');
	  while (match = regex.exec(input)) {
	    var _ref = new _reference2.default();

	    _ref.order = match.index;
	    _ref.text = match[0];
	    _ref.type = 'quran';
	    _ref.chapter = getChapter(match[2] || match[1]);
	    _ref.verses = match[3];

	    results.push(_ref);
	  }

	  return results;
	};

	exports.default = { parse: parse, getChapter: getChapter };
	exports.getChapter = getChapter;
	exports.parse = parse;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

	module.exports = function (str) {
		if (typeof str !== 'string') {
			throw new TypeError('Expected a string');
		}

		return str.replace(matchOperatorsRe, '\\$&');
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Reference = function () {
	  function Reference() {
	    _classCallCheck(this, Reference);

	    // Set the index here to allow it to order in reverse.
	    // When it breaks up the DOM indexes are reset unless reversed.
	    this.order = 0;

	    this._opts = {
	      text: null,
	      type: null,
	      book: null,
	      chapter: null,
	      verses: null
	    };
	  }

	  _createClass(Reference, [{
	    key: 'text',
	    set: function set(val) {
	      this._opts.text = val.trim();
	    },
	    get: function get() {
	      return this._opts.text;
	    }
	  }, {
	    key: 'type',
	    set: function set(type) {
	      if (['quran', 'bible'].indexOf(type) === -1) {
	        throw 'You must specify a proper book type';
	      }

	      this._opts.type = type;
	    },
	    get: function get() {
	      return this._opts.type;
	    }
	  }, {
	    key: 'chapter',
	    set: function set(num) {
	      this._opts.chapter = num.toString().trim();
	    },
	    get: function get() {
	      return this._opts.chapter;
	    }
	  }, {
	    key: 'book',
	    set: function set(name) {
	      this._opts.book = name.trim();
	    },
	    get: function get() {
	      return this._opts.book;
	    }
	  }, {
	    key: 'verses',
	    set: function set(str) {
	      if (typeof str === 'undefined') return;
	      this._opts.verses = str.toString().replace(/\s/g, '');
	    },
	    get: function get() {
	      return this._opts.verses;
	    }
	  }, {
	    key: 'options',
	    get: function get() {
	      return this._opts;
	    }
	  }, {
	    key: 'permalink',
	    get: function get() {
	      var url = void 0;

	      if (this._opts.type === 'quran') {
	        url = 'https://alkotob.org/quran/' + this.chapter + '/' + this.verses;
	      } else {
	        url = 'https://alkotob.org/bible/' + this.book + '/' + this.chapter + '/' + this.verses;
	      }

	      return url;
	    }
	  }]);

	  return Reference;
	}();

	exports.default = Reference;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.parse = exports.getBook = undefined;

	var _escapeStringRegexp = __webpack_require__(3);

	var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

	var _reference = __webpack_require__(4);

	var _reference2 = _interopRequireDefault(_reference);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var books = {
	  psa: ['Ps', 'Psalms', 'Psalm']
	};

	// Make the array lowercase so its not case-sensitive
	Object.keys(books).forEach(function (bookId) {
	  books[bookId] = books[bookId].map(function (book) {
	    return book.toLowerCase();
	  });
	});

	function getBook(title) {
	  title = title.toLowerCase();

	  // If they used an actual normalized version, return it
	  if (typeof books[title] !== 'undefined') return title;

	  // Look through titles for proper format
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = Object.keys(books)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var bookId = _step.value;

	      if (books[bookId].indexOf(title) !== -1) {
	        return bookId;
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return false;
	}

	function parse(input) {
	  var results = [];
	  var pattern = void 0;
	  var regex = void 0;
	  var match = void 0;

	  /**
	   * <en|ar book> 10: 12-13,4
	   * <en|ar book> 139: 12-13,4
	   */
	  var bookList = [];
	  Object.keys(books).forEach(function (bookId) {
	    var _bookList;

	    return (_bookList = bookList).push.apply(_bookList, _toConsumableArray(books[bookId]));
	  });
	  bookList = bookList.join('|');

	  pattern = '\n    (' + bookList + ')\n    \\s*\n      ([\\d]{1,3})\\s*:?\n      \\s*\n      ([\\d\\s\\-,]+)?\n    ';

	  regex = new RegExp(pattern.replace(/[\n\s]+/g, ''), 'gi');
	  while (match = regex.exec(input)) {
	    var ref = new _reference2.default();

	    ref.order = match.index;
	    ref.text = match[0];
	    ref.type = 'bible';
	    ref.book = getBook(match[1]);
	    ref.chapter = match[2];
	    ref.verses = match[3];

	    results.push(ref);
	  }

	  return results;
	};

	exports.default = { parse: parse, getBook: getBook };
	exports.getBook = getBook;
	exports.parse = parse;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var template = "\n  <div id=\"alkotob-tooltip\" style=\"display: none;\">\n    <div id=\"alkotob-share\">\n      <a id=\"alkotob-social-fb\" href=\"#\" target=\"_blank\" class=\"social facebook\" title=\"Facebook\"><svg viewBox=\"0 0 512 512\"><path d=\"M211.9 197.4h-36.7v59.9h36.7V433.1h70.5V256.5h49.2l5.2-59.1h-54.4c0 0 0-22.1 0-33.7 0-13.9 2.8-19.5 16.3-19.5 10.9 0 38.2 0 38.2 0V82.9c0 0-40.2 0-48.8 0 -52.5 0-76.1 23.1-76.1 67.3C211.9 188.8 211.9 197.4 211.9 197.4z\"/></svg><!--[if lt IE 9]><em>Facebook</em><![endif]--></a>\n      <a id=\"alkotob-social-tw\" href=\"#\" target=\"_blank\" class=\"social twitter\" title=\"Twitter\"><svg viewBox=\"0 0 512 512\"><path d=\"M419.6 168.6c-11.7 5.2-24.2 8.7-37.4 10.2 13.4-8.1 23.8-20.8 28.6-36 -12.6 7.5-26.5 12.9-41.3 15.8 -11.9-12.6-28.8-20.6-47.5-20.6 -42 0-72.9 39.2-63.4 79.9 -54.1-2.7-102.1-28.6-134.2-68 -17 29.2-8.8 67.5 20.1 86.9 -10.7-0.3-20.7-3.3-29.5-8.1 -0.7 30.2 20.9 58.4 52.2 64.6 -9.2 2.5-19.2 3.1-29.4 1.1 8.3 25.9 32.3 44.7 60.8 45.2 -27.4 21.4-61.8 31-96.4 27 28.8 18.5 63 29.2 99.8 29.2 120.8 0 189.1-102.1 185-193.6C399.9 193.1 410.9 181.7 419.6 168.6z\"/></svg><!--[if lt IE 9]><em>Twitter</em><![endif]--></a>\n    </div>\n    <div id=\"alkotob-reference\"></div>\n    <div class=\"bismillah\">\uFDFD</div>\n    <div id=\"alkotob-verse-text\">\n      \u0641\u0642\u0648\u0644\u0647 - \u062A\u0639\u0627\u0644\u0649 -: \uFD3F \u0627\u0644\u0644\u064E\u0651\u0647\u064F \u0644\u064E\u0627 \u0625\u0650\u0644\u064E\u0647\u064E \u0625\u0650\u0644\u064E\u0651\u0627 \u0647\u064F\u0648\u064E \u0627\u0644\u0652\u062D\u064E\u064A\u064F\u0651 \u0627\u0644\u0652\u0642\u064E\u064A\u064F\u0651\u0648\u0645\u064F \uFD3E\u060C \u0625\u062E\u0628\u0627\u0631 \u0628\u0623\u0646\u0647 \u0627\u0644\u0645\u0646\u0641\u0631\u0650\u062F \u0628\u0627\u0644\u0625\u0644\u0647\u064A\u0629 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u062E\u0644\u0627\u0626\u0642\u060C \u0641\u0644\u0627 \u0645\u0639\u0628\u0648\u062F \u0628\u062D\u0642\u064D\u0651 \u0625\u0644\u0627\u064E\u0651 \u0647\u0648 - \u0633\u0628\u062D\u0627\u0646\u0647 - \u0648\u0647\u0648 \u0627\u0644\u0645\u0633\u062A\u064E\u062D\u0642 \u0644\u0644\u0639\u0650\u0628\u0627\u062F\u0629\u060C \u0648\u0628\u0647\u0630\u0647 \u0627\u0644\u0643\u0644\u0645\u0629 \u0623\u0631\u0652\u0633\u064E\u0644 \u0627\u0644\u0644\u0647 \u0627\u0644\u0631\u064F\u0651\u0633\u0644\u060C \u0648\u0623\u0646\u0632\u064E\u0644\n    </div>\n    <div id=\"alkotob-copyright\">\n      <a target=\"_blank\" href=\"https://alkotob.org/?utm_source=reftagger\">alkotob.org</a>\n    </div>\n    <div id=\"alkotob-readmore\">\n      <a id=\"alkotob-readmore-link\" target=\"_blank\" href=\"https://alkotob.org/?utm_source=reftagger\">&laquo; \u0627\u0642\u0631\u0623 \u0623\u0643\u062B\u0631</a>\n    </div>\n  </div>\n";

	exports.default = template;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * A NodeIterator with iframes support and a method to check if an element is
	 * matching a specified selector
	 * @example
	 * const iterator = new DOMIterator(
	 *     document.querySelector("#context"), true
	 * );
	 * iterator.forEachNode(NodeFilter.SHOW_TEXT, node => {
	 *     console.log(node);
	 * }, node => {
	 *     if(DOMIterator.matches(node.parentNode, ".ignore")){
	 *         return NodeFilter.FILTER_REJECT;
	 *     } else {
	 *         return NodeFilter.FILTER_ACCEPT;
	 *     }
	 * }, () => {
	 *     console.log("DONE");
	 * });
	 * @todo Outsource into separate repository and include it in the build
	 */
	var DOMIterator = function () {

	  /**
	   * @param {HTMLElement|HTMLElement[]|NodeList|string} ctx - The context DOM
	   * element, an array of DOM elements, a NodeList or a selector
	   * @param {boolean} [iframes=true] - A boolean indicating if iframes should
	   * be handled
	   * @param {string[]} [exclude=[]] - An array containing exclusion selectors
	   * for iframes
	   * @param {number} [iframesTimeout=5000] - A number indicating the ms to
	   * wait before an iframe should be skipped, in case the load event isn't
	   * fired. This also applies if the user is offline and the resource of the
	   * iframe is online (either by the browsers "offline" mode or because
	   * there's no internet connection)
	   */
	  function DOMIterator(ctx) {
	    var iframes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	    var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	    var iframesTimeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5000;

	    _classCallCheck(this, DOMIterator);

	    /**
	     * The context of the instance. Either a DOM element, an array of DOM
	     * elements, a NodeList or a selector
	     * @type {HTMLElement|HTMLElement[]|NodeList|string}
	     * @access protected
	     */
	    this.ctx = ctx;
	    /**
	     * Boolean indicating if iframe support is enabled
	     * @type {boolean}
	     * @access protected
	     */
	    this.iframes = iframes;
	    /**
	     * An array containing exclusion selectors for iframes
	     * @type {string[]}
	     */
	    this.exclude = exclude;
	    /**
	     * The maximum ms to wait for a load event before skipping an iframe
	     * @type {number}
	     */
	    this.iframesTimeout = iframesTimeout;
	  }

	  /**
	   * Checks if the specified DOM element matches the selector
	   * @param  {HTMLElement} element - The DOM element
	   * @param  {string|string[]} selector - The selector or an array with
	   * selectors
	   * @return {boolean}
	   * @access public
	   */


	  _createClass(DOMIterator, [{
	    key: "getContexts",


	    /**
	     * Returns all contexts filtered by duplicates (even nested)
	     * @return {HTMLElement[]} - An array containing DOM contexts
	     * @access protected
	     */
	    value: function getContexts() {
	      var ctx = void 0,
	          filteredCtx = [];
	      if (typeof this.ctx === "undefined" || !this.ctx) {
	        // e.g. null
	        ctx = [];
	      } else if (NodeList.prototype.isPrototypeOf(this.ctx)) {
	        ctx = Array.prototype.slice.call(this.ctx);
	      } else if (Array.isArray(this.ctx)) {
	        ctx = this.ctx;
	      } else if (typeof this.ctx === "string") {
	        ctx = Array.prototype.slice.call(document.querySelectorAll(this.ctx));
	      } else {
	        // e.g. HTMLElement or element inside iframe
	        ctx = [this.ctx];
	      }
	      // filter duplicate text nodes
	      ctx.forEach(function (ctx) {
	        var isDescendant = filteredCtx.filter(function (contexts) {
	          return contexts.contains(ctx);
	        }).length > 0;
	        if (filteredCtx.indexOf(ctx) === -1 && !isDescendant) {
	          filteredCtx.push(ctx);
	        }
	      });
	      return filteredCtx;
	    }

	    /**
	     * @callback DOMIterator~getIframeContentsSuccessCallback
	     * @param {HTMLDocument} contents - The contentDocument of the iframe
	     */
	    /**
	     * Calls the success callback function with the iframe document. If it can't
	     * be accessed it calls the error callback function
	     * @param {HTMLElement} ifr - The iframe DOM element
	     * @param {DOMIterator~getIframeContentsSuccessCallback} successFn
	     * @param {function} [errorFn]
	     * @access protected
	     */

	  }, {
	    key: "getIframeContents",
	    value: function getIframeContents(ifr, successFn) {
	      var errorFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

	      var doc = void 0;
	      try {
	        var ifrWin = ifr.contentWindow;
	        doc = ifrWin.document;
	        if (!ifrWin || !doc) {
	          // no permission = null. Undefined in Phantom
	          throw new Error("iframe inaccessible");
	        }
	      } catch (e) {
	        errorFn();
	      }
	      if (doc) {
	        successFn(doc);
	      }
	    }

	    /**
	     * Checks if an iframe is empty (if about:blank is the shown page)
	     * @param {HTMLElement} ifr - The iframe DOM element
	     * @return {boolean}
	     * @access protected
	     */

	  }, {
	    key: "isIframeBlank",
	    value: function isIframeBlank(ifr) {
	      var bl = "about:blank",
	          src = ifr.getAttribute("src").trim(),
	          href = ifr.contentWindow.location.href;
	      return href === bl && src !== bl && src;
	    }

	    /**
	     * Observes the onload event of an iframe and calls the success callback or
	     * the error callback if the iframe is inaccessible. If the event isn't
	     * fired within the specified {@link DOMIterator#iframesTimeout}, then it'll
	     * call the error callback too
	     * @param {HTMLElement} ifr - The iframe DOM element
	     * @param {DOMIterator~getIframeContentsSuccessCallback} successFn
	     * @param {function} errorFn
	     * @access protected
	     */

	  }, {
	    key: "observeIframeLoad",
	    value: function observeIframeLoad(ifr, successFn, errorFn) {
	      var _this = this;

	      var called = false,
	          tout = null;
	      var listener = function listener() {
	        if (called) {
	          return;
	        }
	        called = true;
	        clearTimeout(tout);
	        try {
	          if (!_this.isIframeBlank(ifr)) {
	            ifr.removeEventListener("load", listener);
	            _this.getIframeContents(ifr, successFn, errorFn);
	          }
	        } catch (e) {
	          // isIframeBlank maybe throws throws an error
	          errorFn();
	        }
	      };
	      ifr.addEventListener("load", listener);
	      tout = setTimeout(listener, this.iframesTimeout);
	    }

	    /**
	     * Callback when the iframe is ready
	     * @callback DOMIterator~onIframeReadySuccessCallback
	     * @param {HTMLDocument} contents - The contentDocument of the iframe
	     */
	    /**
	     * Callback if the iframe can't be accessed
	     * @callback DOMIterator~onIframeReadyErrorCallback
	     */
	    /**
	     * Calls the callback if the specified iframe is ready for DOM access
	     * @param  {HTMLElement} ifr - The iframe DOM element
	     * @param  {DOMIterator~onIframeReadySuccessCallback} successFn - Success
	     * callback
	     * @param {DOMIterator~onIframeReadyErrorCallback} errorFn - Error callback
	     * @see {@link http://stackoverflow.com/a/36155560/3894981} for
	     * background information
	     * @access protected
	     */

	  }, {
	    key: "onIframeReady",
	    value: function onIframeReady(ifr, successFn, errorFn) {
	      try {
	        if (ifr.contentWindow.document.readyState === "complete") {
	          if (this.isIframeBlank(ifr)) {
	            this.observeIframeLoad(ifr, successFn, errorFn);
	          } else {
	            this.getIframeContents(ifr, successFn, errorFn);
	          }
	        } else {
	          this.observeIframeLoad(ifr, successFn, errorFn);
	        }
	      } catch (e) {
	        // accessing document failed
	        errorFn();
	      }
	    }

	    /**
	     * Callback when all iframes are ready for DOM access
	     * @callback DOMIterator~waitForIframesDoneCallback
	     */
	    /**
	     * Iterates over all iframes and calls the done callback when all of them
	     * are ready for DOM access (including nested ones)
	     * @param {HTMLElement} ctx - The context DOM element
	     * @param {DOMIterator~waitForIframesDoneCallback} done - Done callback
	     */

	  }, {
	    key: "waitForIframes",
	    value: function waitForIframes(ctx, done) {
	      var _this2 = this;

	      var eachCalled = 0;
	      this.forEachIframe(ctx, function () {
	        return true;
	      }, function (ifr) {
	        eachCalled++;
	        _this2.waitForIframes(ifr.querySelector("html"), function () {
	          if (! --eachCalled) {
	            done();
	          }
	        });
	      }, function (handled) {
	        if (!handled) {
	          done();
	        }
	      });
	    }

	    /**
	     * Callback allowing to filter an iframe. Must return true when the element
	     * should remain, otherwise false
	     * @callback DOMIterator~forEachIframeFilterCallback
	     * @param {HTMLElement} iframe - The iframe DOM element
	     */
	    /**
	     * Callback for each iframe content
	     * @callback DOMIterator~forEachIframeEachCallback
	     * @param {HTMLElement} content - The iframe document
	     */
	    /**
	     * Callback if all iframes inside the context were handled
	     * @callback DOMIterator~forEachIframeEndCallback
	     * @param {number} handled - The number of handled iframes (those who
	     * wheren't filtered)
	     */
	    /**
	     * Iterates over all iframes inside the specified context and calls the
	     * callbacks when they're ready. Filters iframes based on the instance
	     * exclusion selectors
	     * @param {HTMLElement} ctx - The context DOM element
	     * @param {DOMIterator~forEachIframeFilterCallback} filter - Filter callback
	     * @param {DOMIterator~forEachIframeEachCallback} each - Each callback
	     * @param {DOMIterator~forEachIframeEndCallback} [end] - End callback
	     * @access protected
	     */

	  }, {
	    key: "forEachIframe",
	    value: function forEachIframe(ctx, filter, each) {
	      var _this3 = this;

	      var end = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

	      var ifr = ctx.querySelectorAll("iframe"),
	          open = ifr.length,
	          handled = 0;
	      ifr = Array.prototype.slice.call(ifr);
	      var checkEnd = function checkEnd() {
	        if (--open <= 0) {
	          end(handled);
	        }
	      };
	      if (!open) {
	        checkEnd();
	      }
	      ifr.forEach(function (ifr) {
	        if (DOMIterator.matches(ifr, _this3.exclude)) {
	          checkEnd();
	        } else {
	          _this3.onIframeReady(ifr, function (con) {
	            if (filter(ifr)) {
	              handled++;
	              each(con);
	            }
	            checkEnd();
	          }, checkEnd);
	        }
	      });
	    }

	    /**
	     * Creates a NodeIterator on the specified context
	     * @see {@link https://developer.mozilla.org/en/docs/Web/API/NodeIterator}
	     * @param {HTMLElement} ctx - The context DOM element
	     * @param {DOMIterator~whatToShow} whatToShow
	     * @param {DOMIterator~filterCb} filter
	     * @return {NodeIterator}
	     * @access protected
	     */

	  }, {
	    key: "createIterator",
	    value: function createIterator(ctx, whatToShow, filter) {
	      return document.createNodeIterator(ctx, whatToShow, filter, false);
	    }

	    /**
	     * Creates an instance of DOMIterator in an iframe
	     * @param {HTMLDocument} contents - Iframe document
	     * @return {DOMIterator}
	     * @access protected
	     */

	  }, {
	    key: "createInstanceOnIframe",
	    value: function createInstanceOnIframe(contents) {
	      return new DOMIterator(contents.querySelector("html"), this.iframes);
	    }

	    /**
	     * Checks if an iframe occurs between two nodes, more specifically if an
	     * iframe occurs before the specified node and after the specified prevNode
	     * @param {HTMLElement} node - The node that should occur after the iframe
	     * @param {HTMLElement} prevNode - The node that should occur before the
	     * iframe
	     * @param {HTMLElement} ifr - The iframe to check against
	     * @return {boolean}
	     * @access protected
	     */

	  }, {
	    key: "compareNodeIframe",
	    value: function compareNodeIframe(node, prevNode, ifr) {
	      var compCurr = node.compareDocumentPosition(ifr),
	          prev = Node.DOCUMENT_POSITION_PRECEDING;
	      if (compCurr & prev) {
	        if (prevNode !== null) {
	          var compPrev = prevNode.compareDocumentPosition(ifr),
	              after = Node.DOCUMENT_POSITION_FOLLOWING;
	          if (compPrev & after) {
	            return true;
	          }
	        } else {
	          return true;
	        }
	      }
	      return false;
	    }

	    /**
	     * @typedef {DOMIterator~getIteratorNodeReturn}
	     * @type {object.<string>}
	     * @property {HTMLElement} prevNode - The previous node or null if there is
	     * no
	     * @property {HTMLElement} node - The current node
	     */
	    /**
	     * Returns the previous and current node of the specified iterator
	     * @param {NodeIterator} itr - The iterator
	     * @return {DOMIterator~getIteratorNodeReturn}
	     * @access protected
	     */

	  }, {
	    key: "getIteratorNode",
	    value: function getIteratorNode(itr) {
	      var prevNode = itr.previousNode();
	      var node = void 0;
	      if (prevNode === null) {
	        node = itr.nextNode();
	      } else {
	        node = itr.nextNode() && itr.nextNode();
	      }
	      return {
	        prevNode: prevNode,
	        node: node
	      };
	    }

	    /**
	     * An array containing objects. The object key "val" contains an iframe
	     * DOM element. The object key "handled" contains a boolean indicating if
	     * the iframe was handled already.
	     * It wouldn't be enough to save all open or all already handled iframes.
	     * The information of open iframes is necessary because they may occur after
	     * all other text nodes (and compareNodeIframe would never be true). The
	     * information of already handled iframes is necessary as otherwise they may
	     * be handled multiple times
	     * @typedef DOMIterator~checkIframeFilterIfr
	     * @type {object[]}
	     */
	    /**
	     * Checks if an iframe wasn't handled already and if so, calls
	     * {@link DOMIterator#compareNodeIframe} to check if it should be handled.
	     * Information wheter an iframe was or wasn't handled is given within the
	     * <code>ifr</code> dictionary
	     * @param {HTMLElement} node - The node that should occur after the iframe
	     * @param {HTMLElement} prevNode - The node that should occur before the
	     * iframe
	     * @param {HTMLElement} currIfr - The iframe to check
	     * @param {DOMIterator~checkIframeFilterIfr} ifr - The iframe dictionary.
	     * Will be manipulated (by reference)
	     * @return {boolean} Returns true when it should be handled, otherwise false
	     * @access protected
	     */

	  }, {
	    key: "checkIframeFilter",
	    value: function checkIframeFilter(node, prevNode, currIfr, ifr) {
	      var key = false,
	          // false === doesn't exist
	      handled = false;
	      ifr.forEach(function (ifrDict, i) {
	        if (ifrDict.val === currIfr) {
	          key = i;
	          handled = ifrDict.handled;
	        }
	      });
	      if (this.compareNodeIframe(node, prevNode, currIfr)) {
	        if (key === false && !handled) {
	          ifr.push({
	            val: currIfr,
	            handled: true
	          });
	        } else if (key !== false && !handled) {
	          ifr[key].handled = true;
	        }
	        return true;
	      }
	      if (key === false) {
	        ifr.push({
	          val: currIfr,
	          handled: false
	        });
	      }
	      return false;
	    }

	    /**
	     * Creates an iterator on all open iframes in the specified array and calls
	     * the end callback when finished
	     * @param {DOMIterator~checkIframeFilterIfr} ifr
	     * @param {DOMIterator~whatToShow} whatToShow
	     * @param  {DOMIterator~forEachNodeCallback} eCb - Each callback
	     * @param {DOMIterator~filterCb} fCb
	     * @access protected
	     */

	  }, {
	    key: "handleOpenIframes",
	    value: function handleOpenIframes(ifr, whatToShow, eCb, fCb) {
	      var _this4 = this;

	      ifr.forEach(function (ifrDict) {
	        if (!ifrDict.handled) {
	          _this4.getIframeContents(ifrDict.val, function (con) {
	            _this4.createInstanceOnIframe(con).forEachNode(whatToShow, eCb, fCb);
	          });
	        }
	      });
	    }

	    /**
	     * Iterates through all nodes in the specified context and handles iframe
	     * nodes at the correct position
	     * @param {DOMIterator~whatToShow} whatToShow
	     * @param {HTMLElement} ctx - The context
	     * @param  {DOMIterator~forEachNodeCallback} eachCb - Each callback
	     * @param {DOMIterator~filterCb} filterCb - Filter callback
	     * @param {DOMIterator~forEachNodeEndCallback} doneCb - End callback
	     * @access protected
	     */

	  }, {
	    key: "iterateThroughNodes",
	    value: function iterateThroughNodes(whatToShow, ctx, eachCb, filterCb, doneCb) {
	      var _this5 = this;

	      var itr = this.createIterator(ctx, whatToShow, filterCb);
	      var ifr = [],
	          elements = [],
	          node = void 0,
	          prevNode = void 0,
	          retrieveNodes = function retrieveNodes() {
	        var _getIteratorNode = _this5.getIteratorNode(itr);

	        prevNode = _getIteratorNode.prevNode;
	        node = _getIteratorNode.node;

	        return node;
	      };
	      while (retrieveNodes()) {
	        if (this.iframes) {
	          this.forEachIframe(ctx, function (currIfr) {
	            // note that ifr will be manipulated here
	            return _this5.checkIframeFilter(node, prevNode, currIfr, ifr);
	          }, function (con) {
	            _this5.createInstanceOnIframe(con).forEachNode(whatToShow, function (ifrNode) {
	              return elements.push(ifrNode);
	            }, filterCb);
	          });
	        }
	        // it's faster to call the each callback in an array loop
	        // than in this while loop
	        elements.push(node);
	      }
	      elements.forEach(function (node) {
	        eachCb(node);
	      });
	      if (this.iframes) {
	        this.handleOpenIframes(ifr, whatToShow, eachCb, filterCb);
	      }
	      doneCb();
	    }

	    /**
	     * Callback for each node
	     * @callback DOMIterator~forEachNodeCallback
	     * @param {HTMLElement} node - The DOM text node element
	     */
	    /**
	     * Callback if all contexts were handled
	     * @callback DOMIterator~forEachNodeEndCallback
	     */
	    /**
	     * Iterates over all contexts and initializes
	     * {@link DOMIterator#iterateThroughNodes iterateThroughNodes} on them
	     * @param {DOMIterator~whatToShow} whatToShow
	     * @param  {DOMIterator~forEachNodeCallback} each - Each callback
	     * @param {DOMIterator~filterCb} filter - Filter callback
	     * @param {DOMIterator~forEachNodeEndCallback} done - End callback
	     * @access public
	     */

	  }, {
	    key: "forEachNode",
	    value: function forEachNode(whatToShow, each, filter) {
	      var _this6 = this;

	      var done = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

	      var contexts = this.getContexts();
	      var open = contexts.length;
	      if (!open) {
	        done();
	      }
	      contexts.forEach(function (ctx) {
	        var ready = function ready() {
	          _this6.iterateThroughNodes(whatToShow, ctx, each, filter, function () {
	            if (--open <= 0) {
	              // call end all contexts were handled
	              done();
	            }
	          });
	        };
	        // wait for iframes to avoid recursive calls, otherwise this would
	        // perhaps reach the recursive function call limit with many nodes
	        if (_this6.iframes) {
	          _this6.waitForIframes(ctx, ready);
	        } else {
	          ready();
	        }
	      });
	    }

	    /**
	     * Callback to filter nodes. Can return e.g. NodeFilter.FILTER_ACCEPT or
	     * NodeFilter.FILTER_REJECT
	     * @see {@link http://tinyurl.com/zdczmm2}
	     * @callback DOMIterator~filterCb
	     * @param {HTMLElement} node - The node to filter
	     */
	    /**
	     * @typedef DOMIterator~whatToShow
	     * @see {@link http://tinyurl.com/zfqqkx2}
	     * @type {number}
	     */

	  }], [{
	    key: "matches",
	    value: function matches(element, selector) {
	      var selectors = typeof selector === "string" ? [selector] : selector,
	          fn = element.matches || element.matchesSelector || element.msMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector;
	      if (fn) {
	        var match = false;
	        selectors.every(function (sel) {
	          if (fn.call(element, sel)) {
	            match = true;
	            return false;
	          }
	          return true;
	        });
	        return match;
	      } else {
	        // may be false e.g. when el is a textNode
	        return false;
	      }
	    }
	  }]);

	  return DOMIterator;
	}();

	exports.default = DOMIterator;

/***/ }
/******/ ])
});
;