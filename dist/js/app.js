/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/components/credits.js":
/*!**********************************!*\
  !*** ./js/components/credits.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _digits = __webpack_require__(/*! ./digits */ "./js/components/digits.js");

var _digits2 = _interopRequireDefault(_digits);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var credits = function credits() {
  return {
    creditsRemaining: CREDITS,
    digits: (0, _digits2.default)(),
    container: document.getElementById("credits"),
    addCredit: function addCredit(amount) {
      this.creditsRemaining += amount;
    },
    useCredit: function useCredit() {
      this.creditsRemaining--;
    },
    reset: function reset() {
      this.creditsRemaining = CREDITS;
    },
    render: function render() {
      this.digits.digitsString = this.creditsRemaining.toString();
      this.digits.container = this.container;
      this.digits.render();
    }
  };
};

exports.default = credits;

/***/ }),

/***/ "./js/components/digits.js":
/*!*********************************!*\
  !*** ./js/components/digits.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var digits = function digits() {
    return {
        digitsString: null,
        container: null, // Container that holds digitContainers
        digitContainers: null, // List of digit containers that hold single digit each
        render: function render() {
            // // Split number into seperate characters
            this.digitContainers = this.container.getElementsByClassName('digit-number');
            var digitIndex = void 0; // Which digit container to put number in

            // Wipe the digits
            for (var i = 0; i < this.digitContainers.length; i++) {
                this.digitContainers[i].classList.remove('active');
                this.digitContainers[i].innerHTML = '8';
            }

            // Populate the digits
            for (var _i = 0; _i < this.digitsString.length; _i++) {
                digitIndex = this.digitContainers.length - (this.digitsString.length - _i);
                this.digitContainers[digitIndex].classList.add('active');
                this.digitContainers[digitIndex].innerHTML = this.digitsString[_i];
            }
        }
    };
};

exports.default = digits;

/***/ }),

/***/ "./js/components/holdButton.js":
/*!*************************************!*\
  !*** ./js/components/holdButton.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var holdButton = function holdButton(index) {
    var holdButton = void 0;

    return {
        container: document.getElementById('holdButtons'),
        reelNo: index,
        render: function render() {
            holdButton = document.createElement('button');
            holdButton.innerHTML = 'HOLD';
            holdButton.classList.add('hold-button', 'button');
            holdButton.style.width = BUTTON_WIDTH + 'px';
            holdButton.style.marginLeft = REEL_SPACING / 2 + (REEL_WIDTH - BUTTON_WIDTH) / 2 + 'px';
            holdButton.style.marginRight = REEL_SPACING / 2 + (REEL_WIDTH - BUTTON_WIDTH) / 2 + 'px';
            this.container.appendChild(holdButton);
        }
    };
};

exports.default = holdButton;

/***/ }),

/***/ "./js/components/holdButtons.js":
/*!**************************************!*\
  !*** ./js/components/holdButtons.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _holdButton = __webpack_require__(/*! ./holdButton */ "./js/components/holdButton.js");

var _holdButton2 = _interopRequireDefault(_holdButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var holdButtons = function holdButtons() {
    var newButton = void 0;

    return {
        buttonList: [],
        build: function build() {
            for (var i = 0; i < NO_REELS; i++) {
                newButton = (0, _holdButton2.default)(i);
                this.buttonList.push(newButton);
            }
        },
        render: function render() {
            this.buttonList.forEach(function (btn, index) {
                btn.render(index);
            });
        }
    };
};

exports.default = holdButtons;

/***/ }),

/***/ "./js/components/nudgeButton.js":
/*!**************************************!*\
  !*** ./js/components/nudgeButton.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var nudgeButton = function nudgeButton(index) {
    var nudgeButton = void 0;
    var nudgeButtonContainer = void 0;

    return {
        container: document.getElementById('nudgeButtons'),
        reelNo: index,
        render: function render() {
            nudgeButton = document.createElement('button');
            nudgeButton.innerHTML = 'NUDGE';
            nudgeButton.classList.add('nudge-button', 'button');
            nudgeButton.style.width = BUTTON_WIDTH + 'px';
            nudgeButton.style.marginLeft = REEL_SPACING / 2 + (REEL_WIDTH - BUTTON_WIDTH) / 2 + 'px';
            nudgeButton.style.marginRight = REEL_SPACING / 2 + (REEL_WIDTH - BUTTON_WIDTH) / 2 + 'px';
            this.container.appendChild(nudgeButton);
        }
    };
};

exports.default = nudgeButton;

/***/ }),

/***/ "./js/components/nudgeButtons.js":
/*!***************************************!*\
  !*** ./js/components/nudgeButtons.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nudgeButton = __webpack_require__(/*! ./nudgeButton */ "./js/components/nudgeButton.js");

var _nudgeButton2 = _interopRequireDefault(_nudgeButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nudgeButtons = function nudgeButtons() {
    var newButton = void 0;

    return {
        buttonList: [],
        build: function build() {
            for (var i = 0; i < NO_REELS; i++) {
                newButton = (0, _nudgeButton2.default)(i);
                this.buttonList.push(newButton);
            }
        },
        render: function render() {
            this.buttonList.forEach(function (btn, index) {
                btn.render(index);
            });
        }
    };
};

exports.default = nudgeButtons;

/***/ }),

/***/ "./js/components/nudges.js":
/*!*********************************!*\
  !*** ./js/components/nudges.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _digits = __webpack_require__(/*! ./digits */ "./js/components/digits.js");

var _digits2 = _interopRequireDefault(_digits);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nudges = function nudges() {
    return {
        nudgesRemaining: 0,
        digits: (0, _digits2.default)(),
        container: document.getElementById('nudges'),
        reset: function reset() {
            this.nudgesRemaining = 0;
            this.render();
        },
        render: function render() {
            this.digits.digitsString = this.nudgesRemaining.toString();
            this.digits.container = this.container;
            this.digits.render();
        }
    };
};

exports.default = nudges;

/***/ }),

/***/ "./js/components/reel.js":
/*!*******************************!*\
  !*** ./js/components/reel.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reelItem = __webpack_require__(/*! ./reelItem */ "./js/components/reelItem.js");

var _reelItem2 = _interopRequireDefault(_reelItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moveArrayItemToNewIndex = function moveArrayItemToNewIndex(arr, old_index, new_index) {
  while (old_index < 0) {
    old_index += arr.length;
  }
  while (new_index < 0) {
    new_index += arr.length;
  }
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  console.log("NEW ARR", arr);
};

var reel = function reel(reelNo) {
  var firstItem = void 0;
  var lastItem = void 0;
  var nudgeCallTimes = void 0;

  var SELECT_GAME_MODE = document.getElementById("game-mode");
  var SELECT_ITEM_SELECTOR = document.getElementById("item-selector");
  var SELECT_ROW_SELECTOR = document.getElementById("row-selector");

  return {
    noOfItems: NO_ITEMS,
    itemList: ITEM_LIST,
    reelSpeed: REEL_SPEED,
    nudgeSpeed: 10,
    runTime: REEL_SPEED * 10 + 20 * reelNo, // Arbitrary values for testing
    canHold: false,
    isHeld: false,
    canNudge: false,
    isNudging: false,
    nudgeFrames: ITEM_HEIGHT / NUDGE_SPEED,
    nudgeFrame: 0,
    reelItems: [],
    reelNo: reelNo,
    build: function build() {
      var _this = this;

      var itemNo = 0;
      var type = void 0;
      var instances = void 0;
      var imageSrc = void 0;
      var winAmount = void 0;
      var x = void 0;
      var y = void 0;
      var newReelItem = void 0;

      ITEM_INFO.forEach(function (item, index) {
        type = item.type;
        instances = item.instances;
        imageSrc = item.imageSrc;
        winAmount = item.winAmount;

        // Add required no of instances of this item to the reelItems array
        for (var i = 0; i < instances; i++) {
          x = VIEWPORT_X + _this.reelNo * REEL_WIDTH + _this.reelNo * REEL_SPACING;

          y = VIEWPORT_Y - ITEM_HEIGHT - ITEM_HEIGHT * itemNo - 100;

          var img = new Image();
          img.src = "./img/" + item.imageSrc;

          newReelItem = (0, _reelItem2.default)(type, itemNo, img, x, y, winAmount);
          _this.reelItems.push(newReelItem);
          itemNo++;
          // }
        }
      });

      this.shuffle();
      this.resetCoords();
    },
    shuffle: function shuffle() {
      var rnd = void 0;
      var temp = void 0;
      for (var i = this.reelItems.length - 1; i > 0; i--) {
        rnd = Math.floor(Math.random() * (i + 1));
        temp = this.reelItems[i];
        this.reelItems[i] = this.reelItems[rnd];
        this.reelItems[rnd] = temp;
      }
    },
    nudge: function nudge() {
      this.reelItems.forEach(function (item) {
        item.nudge();
      });

      this.shift();

      this.nudgeFrame++;

      if (this.nudgeFrame >= this.nudgeFrames) {
        this.isNudging = false;
        this.nudgeFrame = 0;
      }
    },
    resetCoords: function resetCoords() {
      for (var i = 0; i < this.reelItems.length; i++) {
        this.reelItems[i].y = VIEWPORT_Y + VIEWPORT_HEIGHT - ITEM_HEIGHT - ITEM_HEIGHT * i;
      }
    },
    resetRuntime: function resetRuntime() {
      if (!this.isHeld) {
        this.runTime = REEL_SPEED * 10 + 20 * reelNo; // Arbitrary values for testing;
      }
    },
    shift: function shift() {
      // If bottom reel item gets below bottom of viewport then move it to beginning of array
      if (this.reelItems[0].y >= VIEWPORT_Y + VIEWPORT_HEIGHT) {
        firstItem = this.reelItems[0];
        lastItem = this.reelItems[this.reelItems.length - 1];

        // Rest y coords for item to shift to top of reel
        firstItem.y = lastItem.y - ITEM_HEIGHT;

        // Shift bottom item to top
        this.reelItems.push(this.reelItems.shift());
      }
    },
    move: function move() {
      this.reelItems.forEach(function (reelItem) {
        reelItem.move();
      });
      this.shift();
      // Reduce reel runtime
      this.runTime--;
      if (SELECT_GAME_MODE.value === "fixed" && this.runTime === 0) {
        var prevIndex = this.reelItems.findIndex(function (item) {
          return parseInt(item.itemNo) === parseInt(SELECT_ITEM_SELECTOR.value);
        });
        var mapRowToString = {
          top: 2,
          middle: 1,
          bottom: 0
        };
        var nextIndex = mapRowToString[SELECT_ROW_SELECTOR.value];
        if (prevIndex !== nextIndex) {
          moveArrayItemToNewIndex(this.reelItems, prevIndex, nextIndex);
          this.resetCoords();
        }
      }
    },
    render: function render() {
      this.reelItems.forEach(function (reelItem) {
        reelItem.render();
      });
    }
  };
};

exports.default = reel;

/***/ }),

/***/ "./js/components/reelItem.js":
/*!***********************************!*\
  !*** ./js/components/reelItem.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var reelItem = function reelItem(type, itemNo, img, x, y, winAmount) {
  return {
    type: type,
    itemNo: itemNo,
    img: img,
    x: x,
    y: y,
    winAmount: winAmount,
    speed: REEL_SPEED,
    nudgeSpeed: NUDGE_SPEED,
    ctx: document.getElementById("viewport").getContext("2d"),
    move: function move() {
      this.y += this.speed;
    },
    nudge: function nudge() {
      this.y += this.nudgeSpeed;
    },
    render: function render() {
      this.ctx.drawImage(this.img, 0, 0, ITEM_WIDTH, ITEM_HEIGHT, this.x, this.y, ITEM_WIDTH, ITEM_HEIGHT);
    }
  };
};

exports.default = reelItem;

/***/ }),

/***/ "./js/components/reels.js":
/*!********************************!*\
  !*** ./js/components/reels.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reel = __webpack_require__(/*! ./reel */ "./js/components/reel.js");

var _reel2 = _interopRequireDefault(_reel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reels = function reels() {
  var newReel = void 0;
  return {
    reelList: [],
    build: function build() {
      for (var i = 0; i < NO_REELS; i++) {
        newReel = (0, _reel2.default)(i);
        newReel.build();
        this.reelList.push(newReel);
      }
    },
    move: function move() {
      this.reelList.forEach(function (reel) {
        if (reel.runTime > 0 && !reel.isHeld) {
          reel.move();
        }
      });
    },
    resetRuntimes: function resetRuntimes() {
      this.reelList.forEach(function (reel) {
        reel.resetRuntime();
      });
    },
    render: function render() {
      this.reelList.forEach(function (reel) {
        reel.render();
      });
    }
  };
};

exports.default = reels;

/***/ }),

/***/ "./js/components/viewport.js":
/*!***********************************!*\
  !*** ./js/components/viewport.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var viewport = function viewport() {
    var newViewport = document.createElement('canvas');
    newViewport.width = VIEWPORT_WIDTH;
    newViewport.height = VIEWPORT_HEIGHT;
    newViewport.id = "viewport";

    return {
        viewport: newViewport,
        width: VIEWPORT_WIDTH,
        height: VIEWPORT_HEIGHT,
        ctx: newViewport.getContext('2d'),
        render: function render() {
            var viewportContainer = document.getElementById('viewportContainer');
            viewportContainer.appendChild(this.viewport);
        },
        clear: function clear() {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }
    };
};

exports.default = viewport;

/***/ }),

/***/ "./js/components/win.js":
/*!******************************!*\
  !*** ./js/components/win.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _digits = __webpack_require__(/*! ./digits */ "./js/components/digits.js");

var _digits2 = _interopRequireDefault(_digits);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var win = function win() {
  return {
    currentWin: 0,
    digits: (0, _digits2.default)(),
    container: document.getElementById("win"),
    addWin: function addWin(winAmount) {
      this.currentWin = winAmount;
    },
    reset: function reset() {
      this.currentWin = 0;
    },
    render: function render() {
      this.digits.digitsString = this.currentWin.toString();
      this.digits.container = this.container;
      this.digits.render();
    }
  };
};

exports.default = win;

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _viewport = __webpack_require__(/*! ./components/viewport */ "./js/components/viewport.js");

var _viewport2 = _interopRequireDefault(_viewport);

var _reels = __webpack_require__(/*! ./components/reels */ "./js/components/reels.js");

var _reels2 = _interopRequireDefault(_reels);

var _nudgeButtons = __webpack_require__(/*! ./components/nudgeButtons */ "./js/components/nudgeButtons.js");

var _nudgeButtons2 = _interopRequireDefault(_nudgeButtons);

var _holdButtons = __webpack_require__(/*! ./components/holdButtons */ "./js/components/holdButtons.js");

var _holdButtons2 = _interopRequireDefault(_holdButtons);

var _credits = __webpack_require__(/*! ./components/credits */ "./js/components/credits.js");

var _credits2 = _interopRequireDefault(_credits);

var _win2 = __webpack_require__(/*! ./components/win */ "./js/components/win.js");

var _win3 = _interopRequireDefault(_win2);

var _nudges = __webpack_require__(/*! ./components/nudges */ "./js/components/nudges.js");

var _nudges2 = _interopRequireDefault(_nudges);

__webpack_require__(/*! ../scss/app.scss */ "./scss/app.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// creates the canvas which we need to draw upon and assigns to a viewport variable
var viewport = (0, _viewport2.default)();
// const spinButton = document.getElementById('spinButton');


// Sass
var winContainer = document.getElementById("win");
var nudgesContainer = document.getElementById("nudges");
var playSection = document.getElementById("playSection");
var select_gameMode = document.getElementById("game-mode");
var select_itemSelector = document.getElementById("item-selector");
var select_rowSelector = document.getElementById("row-selector");
var div_fixedModeOptions = document.getElementById("fixed-mode-options");

var viewportContainer = void 0;
var nudgeButtonContainer = void 0;
var holdButtonContainer = void 0;
var winIndicatorLeft = void 0;
var winIndicatorRight = void 0;
var winIndicatorTopLine = void 0;
var winIndicatorCentreLine = void 0;
var winIndicatorBottomLine = void 0;
var spinButton = void 0;
var reels = void 0;
var nudges = void 0;
var nudgeButtons = void 0;
var holdButtons = void 0;
var nudgeButtonList = void 0;
var holdButtonList = void 0;
var credits = void 0;
var _win = void 0;
var winningRows = [];
var gameLoop = void 0;
var nudgeChance = 2; // Chance of getting nudges after spin (1 in nudgeChance)
var holdChance = 2; // Chance of getting holds after spin (1 in holdChance)
var canSpin = void 0;
var canNudge = void 0;
var canHold = void 0;
var now = void 0; // Current time to compare against
var reelsRunning = []; // Keeps track of any reels with runtime left on them to estblish whether to reset/stop spin etc.
var spinType = "spin"; // Keeps track of whether last spin was regular spin or nudge

var init = function init() {
  renderViewportContainer();

  // Render viewport
  viewport.render();

  // Set up reels
  reels = (0, _reels2.default)();
  reels.build();
  reels.render();

  var reelContainer = void 0;
  var reelContainerX = void 0;
  var reelContainerY = void 0;
  var reelContainerW = void 0;
  var reelContainerH = void 0;

  reels.reelList.forEach(function (reel) {
    // Render outer container for each reel in the viewport container
    reelContainer = document.createElement("div");

    reelContainerX = reel.reelItems[0].x + VIEWPORT_CONTAINER_PADDING_X - REEL_CONTAINER_PADDING;

    reelContainerY = reel.reelItems[2].y + VIEWPORT_CONTAINER_PADDING_Y - REEL_CONTAINER_PADDING;

    reelContainerW = REEL_WIDTH + REEL_CONTAINER_PADDING * 2;

    reelContainerH = VIEWPORT_HEIGHT + REEL_CONTAINER_PADDING * 2;

    reelContainer.style.position = "absolute";
    reelContainer.style.top = reelContainerY + "px";
    reelContainer.style.left = reelContainerX + "px";
    reelContainer.style.width = reelContainerW + "px";
    reelContainer.style.height = reelContainerH + "px";
    reelContainer.classList.add("reel-container");
    viewportContainer.appendChild(reelContainer);
  });

  renderWinIndicators();

  renderNudgeButtonContainer();

  // Set up nudge buttons
  nudgeButtons = (0, _nudgeButtons2.default)();
  nudgeButtons.build();
  nudgeButtons.render();

  nudgeButtonList = document.getElementsByClassName("nudge-button");

  var _loop = function _loop(i) {
    nudgeButtonList[i].addEventListener("click", function () {
      if (canSpin && canNudge && reels.reelList[i].canNudge === true && nudges.nudgesRemaining > 0) {
        spinType = "nudge";
        nudges.nudgesRemaining -= 1;
        reels.reelList[i].isNudging = true;
        gameLoop = requestAnimationFrame(loop);
        gameStates.currentState = gameStates.nudge;
      }
    });
  };

  for (var i = 0; i < nudgeButtonList.length; i++) {
    _loop(i);
  }

  // Set up nudges
  nudges = (0, _nudges2.default)();
  nudges.render();

  renderHoldButtonContainer();

  // Set up hold buttons
  holdButtons = (0, _holdButtons2.default)();
  holdButtons.build();
  holdButtons.render();

  holdButtonList = document.getElementsByClassName("hold-button");

  var _loop2 = function _loop2(i) {
    holdButtonList[i].addEventListener("click", function (event) {
      if (canSpin && canHold) {
        // Toggle
        if (reels.reelList[i].isHeld) {
          // Take hold off
          reels.reelList[i].isHeld = false;
          reels.reelList[i].resetRuntime();
          event.target.classList.add("active");
          event.target.classList.remove("held");
        } else {
          // Put hold on
          reels.reelList[i].isHeld = true;
          reels.reelList[i].runTime = 0;
          event.target.classList.remove("active");
          event.target.classList.add("held");
        }
      }
    });
  };

  for (var i = 0; i < holdButtonList.length; i++) {
    _loop2(i);
  }

  // Set up credits
  credits = (0, _credits2.default)();
  credits.reset();
  credits.render();

  // Set up win
  _win = (0, _win3.default)();
  _win.reset();
  _win.render();

  renderSpinButton();

  canSpin = true;
  canNudge = false;
  canHold = false;

  enableSpin();
  enableGameMode();

  spinButton.addEventListener("click", function () {
    if (canSpin) {
      credits.useCredit();
      credits.render();
      winningRows = [];
      disableNudges();
      disableSpin();
      disableGameMode();

      // Disable hold buttons that aren't held
      for (var i = 0; i < reels.reelList.length; i++) {
        if (!reels.reelList[i].isHeld) {
          reels.reelList[i].canHold = false;
          holdButtonList[i].classList.remove("active");
        }
      }

      spinType = "spin";
      gameStates.currentState = gameStates.spin;
      gameLoop = requestAnimationFrame(loop);
      gameStates.currentState();
    }
  });
  select_gameMode.addEventListener("change", function (element) {
    if (this.value === "fixed") {
      div_fixedModeOptions.classList.remove("hidden");
    } else if (this.value === "random") {
      div_fixedModeOptions.classList.add("hidden");
    }
  });
};

var renderNudgeButtonContainer = function renderNudgeButtonContainer() {
  nudgeButtonContainer = document.createElement("div");
  nudgeButtonContainer.id = "nudgeButtons";
  playSection.appendChild(nudgeButtonContainer);
};

var renderHoldButtonContainer = function renderHoldButtonContainer() {
  holdButtonContainer = document.createElement("div");
  holdButtonContainer.id = "holdButtons";
  playSection.appendChild(holdButtonContainer);
};

var renderSpinButton = function renderSpinButton() {
  spinButton = document.createElement("button");
  spinButton.id = "spinButton";
  spinButton.classList.add("button");
  spinButton.innerHTML = "SPIN";
  playSection.appendChild(spinButton);
};

var renderViewportContainer = function renderViewportContainer() {
  // Render viewport container
  viewportContainer = document.createElement("div");
  viewportContainer.id = "viewportContainer";
  viewportContainer.style.paddingLeft = VIEWPORT_CONTAINER_PADDING_X + "px";
  viewportContainer.style.paddingRight = VIEWPORT_CONTAINER_PADDING_X + "px";
  viewportContainer.style.paddingTop = VIEWPORT_CONTAINER_PADDING_Y + "px";
  viewportContainer.style.paddingBottom = VIEWPORT_CONTAINER_PADDING_Y + "px";
  playSection.appendChild(viewportContainer);
};

var renderWinIndicators = function renderWinIndicators() {
  // Left indicator
  winIndicatorLeft = document.createElement("span");
  winIndicatorLeft.classList.add("win-indicator", "left");
  viewportContainer.appendChild(winIndicatorLeft);
  // Right indicator
  winIndicatorRight = document.createElement("span");
  winIndicatorRight.classList.add("win-indicator", "right");
  viewportContainer.appendChild(winIndicatorRight);

  // Centre line
  winIndicatorCentreLine = document.createElement("div");
  winIndicatorCentreLine.classList.add("win-indicator-centre-line");

  winIndicatorCentreLine.style.left = winIndicatorLeft.offsetWidth + "px";

  winIndicatorCentreLine.style.width = viewportContainer.offsetWidth - winIndicatorLeft.offsetWidth - winIndicatorRight.offsetWidth + "px";

  viewportContainer.appendChild(winIndicatorCentreLine);

  // Top line
  winIndicatorTopLine = document.createElement("div");
  winIndicatorTopLine.classList.add("win-indicator-top-line");

  winIndicatorTopLine.style.left = winIndicatorLeft.offsetWidth + "px";

  winIndicatorTopLine.style.width = viewportContainer.offsetWidth - winIndicatorLeft.offsetWidth - winIndicatorRight.offsetWidth + "px";

  viewportContainer.appendChild(winIndicatorTopLine);

  // Bottom line
  winIndicatorBottomLine = document.createElement("div");
  winIndicatorBottomLine.classList.add("win-indicator-bottom-line");

  winIndicatorBottomLine.style.left = winIndicatorLeft.offsetWidth + "px";

  winIndicatorBottomLine.style.width = viewportContainer.offsetWidth - winIndicatorLeft.offsetWidth - winIndicatorRight.offsetWidth + "px";

  viewportContainer.appendChild(winIndicatorBottomLine);
};

var loop = function loop(currentTime) {
  gameLoop = requestAnimationFrame(loop); // Needs to go before line below to keep animationframeid up to date
  gameStates.currentState(currentTime);
};

var moveReels = function moveReels() {
  reels.move();
};

var render = function render() {
  viewport.clear();
  reels.render();

  // Digits
  nudges.render();
  credits.render();
  _win.render();
};

// Calculates win amount, if winning line
var checkWin = function checkWin() {
  var spinResult = []; // Array of reel results after spin (all three visible objects of each reel)
  var reelResult = void 0; // Individual reel result, made of three objects (visible)

  // Check for win
  reels.reelList.forEach(function (reel, index) {
    reelResult = []; // Result of individual reel

    reelResult.push(reels.reelList[index].reelItems[0]);
    reelResult.push(reels.reelList[index].reelItems[1]);
    reelResult.push(reels.reelList[index].reelItems[2]);

    spinResult.push(reelResult);
  });
  var result = getAllRowResults(spinResult);
  var currentWinAmount = 0;

  // All the possible winning possibilities and its prizes
  var winningCase = {
    top: {
      cherry: {
        validate: /4{3}/.test(result["top"]),
        value: 2000
      },
      "7": {
        validate: /3{3}/.test(result["top"]),
        value: 150
      },
      cherryOr7: {
        validate: /[4/3]{3}/.test(result["top"]),
        value: 75
      },
      "3xBar": {
        validate: /0{3}/.test(result["top"]),
        value: 50
      },
      "2xBar": {
        validate: /2{3}/.test(result["top"]),
        value: 20
      },
      "1xBar": {
        validate: /1{3}/.test(result["top"]),
        value: 10
      },
      anyBar: {
        validate: /[012]{3}/.test(result["top"]),
        value: 5
      }
    },
    middle: {
      cherry: {
        validate: /4{3}/.test(result["middle"]),
        value: 1000
      },
      "7": {
        validate: /3{3}/.test(result["middle"]),
        value: 150
      },
      cherryOr7: {
        validate: /[4/3]{3}/.test(result["middle"]),
        value: 75
      },
      "3xBar": {
        validate: /0{3}/.test(result["middle"]),
        value: 50
      },
      "2xBar": {
        validate: /2{3}/.test(result["middle"]),
        value: 20
      },
      "1xBar": {
        validate: /1{3}/.test(result["middle"]),
        value: 10
      },
      anyBar: {
        validate: /[012]{3}/.test(result["middle"]),
        value: 5
      }
    },
    bottom: {
      cherry: {
        validate: /4{3}/.test(result["bottom"]),
        value: 4000
      },
      "7": {
        validate: /3{3}/.test(result["bottom"]),
        value: 150
      },
      cherryOr7: {
        validate: /[4/3]{3}/.test(result["bottom"]),
        value: 75
      },
      "3xBar": {
        validate: /0{3}/.test(result["bottom"]),
        value: 50
      },
      "2xBar": {
        validate: /2{3}/.test(result["bottom"]),
        value: 20
      },
      "1xBar": {
        validate: /1{3}/.test(result["bottom"]),
        value: 10
      },
      anyBar: {
        validate: /[012]{3}/.test(result["bottom"]),
        value: 5
      }
    }
  };

  // Loop through the winning possibilities
  // case winning draw the line in the winning row
  // update the view with the prize value
  for (var row in winningCase) {
    for (var item in winningCase[row]) {
      if (winningCase[row][item].validate) {
        currentWinAmount += winningCase[row][item].value;

        winningRows.push(row);
        // Break for better performance
        break;
      }
    }
  }

  if (currentWinAmount) return currentWinAmount;
  return false;
};

var getAllRowResults = function getAllRowResults(spinResult) {
  var top = "",
      middle = "",
      bottom = "";
  for (var i = 0; i < spinResult.length && spinResult.length === 3; i++) {
    top += spinResult[i][2].itemNo.toString();
    middle += spinResult[i][1].itemNo.toString();
    bottom += spinResult[i][0].itemNo.toString();
  }
  return {
    top: top,
    middle: middle,
    bottom: bottom
  };
};

// Randomly assign nudges
var assignNudges = function assignNudges() {
  // Randomly assign nudges
  var nudgeRandom = Math.floor(Math.random() * nudgeChance + 1);

  // If random chance is met then assign nudges
  if (nudgeRandom === nudgeChance) {
    canNudge = true;
    enableNudges();
    nudges.nudgesRemaining = 5;
    nudges.render();
  } else if (nudges.nudgesRemaining < 1) {
    // If no nudges left in bank
    canNudge = false;
    disableNudges();
  }
};

// Randomly assign holds
var assignHolds = function assignHolds() {
  var holdRandom = Math.floor(Math.random() * holdChance + 1);

  // Randomly assign holds (if no nudges left in bank)
  // Assign hold if random number met and last spin wasn't a win
  if (nudges.nudgesRemaining < 1) {
    if (holdRandom === holdChance) {
      // Can hold
      canHold = true;
      buttonStyles(holdButtonList, "add", "active");
    } else {
      canHold = false;
      buttonStyles(holdButtonList, "remove", "active");
      buttonStyles(holdButtonList, "remove", "held");
    }
  }
};

// Enable all nudges
var enableNudges = function enableNudges() {
  reels.reelList.forEach(function (reel) {
    // If the reel isn't held
    if (!reel.isHeld) {
      reel.canNudge = true;
    }
  });

  for (var i = 0; i < nudgeButtonList.length; i++) {
    // If the reel isn't held
    if (!reels.reelList[i].isHeld) {
      nudgeButtonList[i].classList.add("active");
    }
  }

  nudgesContainer.classList.add("active");
};

// Enbale all holds
var enableHolds = function enableHolds() {
  reels.reelList.forEach(function (reel) {
    reel.canHold = true;
  });

  for (var i = 0; i < holdButtonList.length; i++) {
    holdButtonList[i].classList.add("active");
  }

  canhold = true;
};

// Disable all nudges
var disableNudges = function disableNudges() {
  reels.reelList.forEach(function (reel) {
    reel.canNudge = false;
  });

  for (var i = 0; i < nudgeButtonList.length; i++) {
    nudgeButtonList[i].classList.remove("active");
  }

  nudges.reset();

  canNudge = false;

  nudgesContainer.classList.remove("active");
};

// Disable all holds
var disableHolds = function disableHolds() {
  reels.reelList.forEach(function (reel) {
    reel.canHold = false;
    reel.isHeld = false;
    if (reel.runTime < 1) {
      reel.resetRuntime();
    }
  });

  for (var i = 0; i < holdButtonList.length; i++) {
    holdButtonList[i].classList.remove("active", "held");
  }

  canHold = false;
};

// Enable spin
var enableSpin = function enableSpin() {
  spinButton.classList.add("active");
  canSpin = true;
};

// Disbale spin
var disableSpin = function disableSpin() {
  spinButton.classList.remove("active");
  canSpin = false;
};

var disableGameMode = function disableGameMode() {
  select_gameMode.disabled = true;
  select_itemSelector.disabled = true;
  select_rowSelector.disabled = true;
};

var enableGameMode = function enableGameMode() {
  select_gameMode.disabled = false;
  select_itemSelector.disabled = false;
  select_rowSelector.disabled = false;
};

// Add or remove group button styles
var buttonStyles = function buttonStyles(buttonList, addRemove, className) {
  for (var i = 0; i < buttonList.length; i++) {
    if (addRemove === "add") {
      buttonList[i].classList.add(className);
    } else if (addRemove === "remove") {
      buttonList[i].classList.remove(className);
    }
  }
};

// Game state
var gameStates = {
  currentState: null,
  winAmount: 0,
  oldWinDisplay: 0, // When looping through win increment - this is the original figure
  currentWinDisplay: 0, // When looping through win amount - this is the new figure

  // Regular spin
  spin: function spin() {
    this.spinType = "spin";
    disableSpin();
    disableGameMode();
    moveReels();
    render();

    // Filter reel runtimes - if one is above zero then carry on
    reelsRunning = reels.reelList.filter(function (reel) {
      return reel.runTime > 0;
    });

    if (!reelsRunning.length) {
      this.currentState = this.spinFinished;
    }
  },
  // Spin finished
  spinFinished: function spinFinished(currentTime) {
    cancelAnimationFrame(gameLoop);

    if (nudges.nudgesRemaining < 1) {
      disableNudges();
      if (spinType !== "nudge") {
        disableHolds();
      }
    }

    // Check for win
    var win = checkWin();

    // Win
    if (win) {
      // Reset nudges
      nudges.reset();
      canNudge = false;
      disableNudges();
      disableHolds();
      disableSpin();
      disableGameMode();

      now = currentTime;
      this.winAmount = win;

      render();
      this.currentState = this.win; // Switch to win animation state
      gameLoop = requestAnimationFrame(loop);
    }
    // No win
    else {
        if (nudges.nudgesRemaining < 1 && spinType !== "nudge" && credits.creditsRemaining > 0) {
          // If no winning line then assign holds and nudges
          assignHolds();
          assignNudges();
        }

        // Enable spin
        enableSpin();
        enableGameMode();

        // Check credits
        if (credits.creditsRemaining === 0) {
          this.currentState = this.gameOver;
          this.currentState();
        }
      }
  },
  // Nudge
  nudge: function nudge(currentTime) {
    var isNudging = [];
    // If nudging stopped, then change gamestate to spinfinished
    isNudging = reels.reelList.filter(function (reel) {
      return reel.isNudging === true;
    });

    if (!isNudging.length) {
      cancelAnimationFrame(gameLoop);
      this.spinFinished(currentTime);
    }

    isNudging.forEach(function (reel) {
      reel.nudge();
      render();
    });
  },
  // Win animation
  win: function win(currentTime) {
    if (winningRows.includes("top")) winIndicatorTopLine.classList.add("active");
    if (winningRows.includes("middle")) winIndicatorCentreLine.classList.add("active");
    if (winningRows.includes("bottom")) winIndicatorBottomLine.classList.add("active");
    winContainer.classList.add("active");

    disableSpin();
    disableGameMode();
    disableHolds();

    if (currentTime - now > 1) {
      now = currentTime;
      var skip = this.winAmount > 500 ? 10 : 1;
      this.currentWinDisplay += skip;
      _win.currentWin = this.winAmount;
      _win.render();

      if (this.currentWinDisplay - this.oldWinDisplay >= this.winAmount) {
        // Finished looping
        credits.addCredit(this.winAmount);
        credits.render();
        this.oldWinDisplay = this.currentWinDisplay;
        _win.reset();
        _win.render();
        cancelAnimationFrame(gameLoop);
        enableSpin();
        enableGameMode();
        winContainer.classList.remove("active");
        viewportContainer.classList.remove("active");
        winIndicatorLeft.classList.remove("active");
        winIndicatorRight.classList.remove("active");
        winIndicatorTopLine.classList.remove("active");
        winIndicatorCentreLine.classList.remove("active");
        winIndicatorBottomLine.classList.remove("active");

        // Check credits
        if (credits.creditsRemaining === 0) {
          this.currentState = this.gameOver;
          this.currentState();
        }
      }
    }
  },
  // Game over - credits ran out
  gameOver: function gameOver() {
    var _this = this;

    cancelAnimationFrame(gameLoop);
    disableSpin();

    setTimeout(function () {
      document.body.removeChild(playSection);

      disableNudges();
      disableHolds();

      renderGameOverSection();

      _this.winAmount = 0;
      _this.oldWinDisplay = 0;
      _this.currentWinDisplay = 0;
    }, 1000);
  }
};

var renderGameOverSection = function renderGameOverSection() {
  var gameOverSection = document.createElement("div");
  gameOverSection.id = "gameOverSection";

  gameOverSection.innerHTML = "<div>";
  gameOverSection.innerHTML += "<p>Game over</p>";
  gameOverSection.innerHTML += "<p>You won " + _win.currentWin + " credits";
  gameOverSection.innerHTML += "<p>Press start to play again</p>";
  gameOverSection.innerHTML += "</div>";

  var startButton = document.createElement("button");
  startButton.id = "startButton";
  startButton.classList.add("button");
  startButton.innerText = "START";

  gameOverSection.appendChild(startButton);

  document.body.appendChild(gameOverSection);

  startButton.addEventListener("click", function () {
    document.body.removeChild(gameOverSection);

    playSection = document.createElement("div");
    playSection.id = "playSection";
    document.body.appendChild(playSection);

    init();
  });
};

// Preload images then start game
var loaded = 0;
var imageList = [];
var img = void 0;

ITEM_INFO.forEach(function (item) {
  img = new Image();
  img.src = "./img/" + item.imageSrc;
  img.onload = function () {
    loaded++;
    if (loaded === ITEM_INFO.length) init();
  };
});

/***/ }),

/***/ "./scss/app.scss":
/*!***********************!*\
  !*** ./scss/app.scss ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9jcmVkaXRzLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvZGlnaXRzLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvaG9sZEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2hvbGRCdXR0b25zLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvbnVkZ2VCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9udWRnZUJ1dHRvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9udWRnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9yZWVsLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvcmVlbEl0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9yZWVscy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL3ZpZXdwb3J0LmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvd2luLmpzIiwid2VicGFjazovLy8uL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2Nzcy9hcHAuc2NzcyJdLCJuYW1lcyI6WyJjcmVkaXRzIiwiY3JlZGl0c1JlbWFpbmluZyIsIkNSRURJVFMiLCJkaWdpdHMiLCJjb250YWluZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWRkQ3JlZGl0IiwiYW1vdW50IiwidXNlQ3JlZGl0IiwicmVzZXQiLCJyZW5kZXIiLCJkaWdpdHNTdHJpbmciLCJ0b1N0cmluZyIsImRpZ2l0Q29udGFpbmVycyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJkaWdpdEluZGV4IiwiaSIsImxlbmd0aCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImlubmVySFRNTCIsImFkZCIsImhvbGRCdXR0b24iLCJpbmRleCIsInJlZWxObyIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsIndpZHRoIiwiQlVUVE9OX1dJRFRIIiwibWFyZ2luTGVmdCIsIlJFRUxfU1BBQ0lORyIsIlJFRUxfV0lEVEgiLCJtYXJnaW5SaWdodCIsImFwcGVuZENoaWxkIiwiaG9sZEJ1dHRvbnMiLCJuZXdCdXR0b24iLCJidXR0b25MaXN0IiwiYnVpbGQiLCJOT19SRUVMUyIsInB1c2giLCJmb3JFYWNoIiwiYnRuIiwibnVkZ2VCdXR0b24iLCJudWRnZUJ1dHRvbkNvbnRhaW5lciIsIm51ZGdlQnV0dG9ucyIsIm51ZGdlcyIsIm51ZGdlc1JlbWFpbmluZyIsIm1vdmVBcnJheUl0ZW1Ub05ld0luZGV4IiwiYXJyIiwib2xkX2luZGV4IiwibmV3X2luZGV4IiwiayIsInVuZGVmaW5lZCIsInNwbGljZSIsImNvbnNvbGUiLCJsb2ciLCJyZWVsIiwiZmlyc3RJdGVtIiwibGFzdEl0ZW0iLCJudWRnZUNhbGxUaW1lcyIsIlNFTEVDVF9HQU1FX01PREUiLCJTRUxFQ1RfSVRFTV9TRUxFQ1RPUiIsIlNFTEVDVF9ST1dfU0VMRUNUT1IiLCJub09mSXRlbXMiLCJOT19JVEVNUyIsIml0ZW1MaXN0IiwiSVRFTV9MSVNUIiwicmVlbFNwZWVkIiwiUkVFTF9TUEVFRCIsIm51ZGdlU3BlZWQiLCJydW5UaW1lIiwiY2FuSG9sZCIsImlzSGVsZCIsImNhbk51ZGdlIiwiaXNOdWRnaW5nIiwibnVkZ2VGcmFtZXMiLCJJVEVNX0hFSUdIVCIsIk5VREdFX1NQRUVEIiwibnVkZ2VGcmFtZSIsInJlZWxJdGVtcyIsIml0ZW1ObyIsInR5cGUiLCJpbnN0YW5jZXMiLCJpbWFnZVNyYyIsIndpbkFtb3VudCIsIngiLCJ5IiwibmV3UmVlbEl0ZW0iLCJJVEVNX0lORk8iLCJpdGVtIiwiVklFV1BPUlRfWCIsIlZJRVdQT1JUX1kiLCJpbWciLCJJbWFnZSIsInNyYyIsInNodWZmbGUiLCJyZXNldENvb3JkcyIsInJuZCIsInRlbXAiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJudWRnZSIsInNoaWZ0IiwiVklFV1BPUlRfSEVJR0hUIiwicmVzZXRSdW50aW1lIiwibW92ZSIsInJlZWxJdGVtIiwidmFsdWUiLCJwcmV2SW5kZXgiLCJmaW5kSW5kZXgiLCJwYXJzZUludCIsIm1hcFJvd1RvU3RyaW5nIiwidG9wIiwibWlkZGxlIiwiYm90dG9tIiwibmV4dEluZGV4Iiwic3BlZWQiLCJjdHgiLCJnZXRDb250ZXh0IiwiZHJhd0ltYWdlIiwiSVRFTV9XSURUSCIsInJlZWxzIiwibmV3UmVlbCIsInJlZWxMaXN0IiwicmVzZXRSdW50aW1lcyIsInZpZXdwb3J0IiwibmV3Vmlld3BvcnQiLCJWSUVXUE9SVF9XSURUSCIsImhlaWdodCIsImlkIiwidmlld3BvcnRDb250YWluZXIiLCJjbGVhciIsImNsZWFyUmVjdCIsIndpbiIsImN1cnJlbnRXaW4iLCJhZGRXaW4iLCJ3aW5Db250YWluZXIiLCJudWRnZXNDb250YWluZXIiLCJwbGF5U2VjdGlvbiIsInNlbGVjdF9nYW1lTW9kZSIsInNlbGVjdF9pdGVtU2VsZWN0b3IiLCJzZWxlY3Rfcm93U2VsZWN0b3IiLCJkaXZfZml4ZWRNb2RlT3B0aW9ucyIsImhvbGRCdXR0b25Db250YWluZXIiLCJ3aW5JbmRpY2F0b3JMZWZ0Iiwid2luSW5kaWNhdG9yUmlnaHQiLCJ3aW5JbmRpY2F0b3JUb3BMaW5lIiwid2luSW5kaWNhdG9yQ2VudHJlTGluZSIsIndpbkluZGljYXRvckJvdHRvbUxpbmUiLCJzcGluQnV0dG9uIiwibnVkZ2VCdXR0b25MaXN0IiwiaG9sZEJ1dHRvbkxpc3QiLCJ3aW5uaW5nUm93cyIsImdhbWVMb29wIiwibnVkZ2VDaGFuY2UiLCJob2xkQ2hhbmNlIiwiY2FuU3BpbiIsIm5vdyIsInJlZWxzUnVubmluZyIsInNwaW5UeXBlIiwiaW5pdCIsInJlbmRlclZpZXdwb3J0Q29udGFpbmVyIiwicmVlbENvbnRhaW5lciIsInJlZWxDb250YWluZXJYIiwicmVlbENvbnRhaW5lclkiLCJyZWVsQ29udGFpbmVyVyIsInJlZWxDb250YWluZXJIIiwiVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWCIsIlJFRUxfQ09OVEFJTkVSX1BBRERJTkciLCJWSUVXUE9SVF9DT05UQUlORVJfUEFERElOR19ZIiwicG9zaXRpb24iLCJsZWZ0IiwicmVuZGVyV2luSW5kaWNhdG9ycyIsInJlbmRlck51ZGdlQnV0dG9uQ29udGFpbmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImxvb3AiLCJnYW1lU3RhdGVzIiwiY3VycmVudFN0YXRlIiwicmVuZGVySG9sZEJ1dHRvbkNvbnRhaW5lciIsImV2ZW50IiwidGFyZ2V0IiwicmVuZGVyU3BpbkJ1dHRvbiIsImVuYWJsZVNwaW4iLCJlbmFibGVHYW1lTW9kZSIsImRpc2FibGVOdWRnZXMiLCJkaXNhYmxlU3BpbiIsImRpc2FibGVHYW1lTW9kZSIsInNwaW4iLCJlbGVtZW50IiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsIm9mZnNldFdpZHRoIiwiY3VycmVudFRpbWUiLCJtb3ZlUmVlbHMiLCJjaGVja1dpbiIsInNwaW5SZXN1bHQiLCJyZWVsUmVzdWx0IiwicmVzdWx0IiwiZ2V0QWxsUm93UmVzdWx0cyIsImN1cnJlbnRXaW5BbW91bnQiLCJ3aW5uaW5nQ2FzZSIsImNoZXJyeSIsInZhbGlkYXRlIiwidGVzdCIsImNoZXJyeU9yNyIsImFueUJhciIsInJvdyIsImFzc2lnbk51ZGdlcyIsIm51ZGdlUmFuZG9tIiwiZW5hYmxlTnVkZ2VzIiwiYXNzaWduSG9sZHMiLCJob2xkUmFuZG9tIiwiYnV0dG9uU3R5bGVzIiwiZW5hYmxlSG9sZHMiLCJjYW5ob2xkIiwiZGlzYWJsZUhvbGRzIiwiZGlzYWJsZWQiLCJhZGRSZW1vdmUiLCJjbGFzc05hbWUiLCJvbGRXaW5EaXNwbGF5IiwiY3VycmVudFdpbkRpc3BsYXkiLCJmaWx0ZXIiLCJzcGluRmluaXNoZWQiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImdhbWVPdmVyIiwiaW5jbHVkZXMiLCJza2lwIiwic2V0VGltZW91dCIsImJvZHkiLCJyZW1vdmVDaGlsZCIsInJlbmRlckdhbWVPdmVyU2VjdGlvbiIsImdhbWVPdmVyU2VjdGlvbiIsInN0YXJ0QnV0dG9uIiwiaW5uZXJUZXh0IiwibG9hZGVkIiwiaW1hZ2VMaXN0Iiwib25sb2FkIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhOzs7Ozs7QUFFYjs7Ozs7O0FBRUEsSUFBTUEsVUFBVSxTQUFWQSxPQUFVLEdBQU07QUFDcEIsU0FBTztBQUNMQyxzQkFBa0JDLE9BRGI7QUFFTEMsWUFBUSx1QkFGSDtBQUdMQyxlQUFXQyxTQUFTQyxjQUFULENBQXdCLFNBQXhCLENBSE47QUFJTEMsZUFBVyxtQkFBVUMsTUFBVixFQUFrQjtBQUMzQixXQUFLUCxnQkFBTCxJQUF5Qk8sTUFBekI7QUFDRCxLQU5JO0FBT0xDLGVBQVcscUJBQVk7QUFDckIsV0FBS1IsZ0JBQUw7QUFD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QUFkLENBQTBCME0sZUFBMUI7O0FBRUFDLGNBQVk3RCxnQkFBWixDQUE2QixPQUE3QixFQUFzQyxZQUFNO0FBQzFDM0ssYUFBU29PLElBQVQsQ0FBY0MsV0FBZCxDQUEwQkUsZUFBMUI7O0FBRUFoRyxrQkFBY3ZJLFNBQVNxQixhQUFULENBQXVCLEtBQXZCLENBQWQ7QUFDQWtILGdCQUFZVCxFQUFaLEdBQWlCLGFBQWpCO0FBQ0E5SCxhQUFTb08sSUFBVCxDQUFjdk0sV0FBZCxDQUEwQjBHLFdBQTFCOztBQUVBc0I7QUFDRCxHQVJEO0FBU0QsQ0E1QkQ7O0FBOEJBO0FBQ0EsSUFBSTZFLFNBQVMsQ0FBYjtBQUNBLElBQUlDLFlBQVksRUFBaEI7QUFDQSxJQUFJbkosWUFBSjs7QUFFQUosVUFBVWhELE9BQVYsQ0FBa0IsVUFBQ2lELElBQUQsRUFBVTtBQUMxQkcsUUFBTSxJQUFJQyxLQUFKLEVBQU47QUFDQUQsTUFBSUUsR0FBSixHQUFVLFdBQVdMLEtBQUtOLFFBQTFCO0FBQ0FTLE1BQUlvSixNQUFKLEdBQWEsWUFBTTtBQUNqQkY7QUFDQSxRQUFJQSxXQUFXdEosVUFBVXZFLE1BQXpCLEVBQWlDZ0o7QUFDbEMsR0FIRDtBQUlELENBUEQsRTs7Ozs7Ozs7Ozs7QUN6eEJBLHVDIiwiZmlsZSI6Ii4vanMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9qcy9tYWluLmpzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBkaWdpdHMgZnJvbSBcIi4vZGlnaXRzXCI7XG5cbmNvbnN0IGNyZWRpdHMgPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgY3JlZGl0c1JlbWFpbmluZzogQ1JFRElUUyxcbiAgICBkaWdpdHM6IGRpZ2l0cygpLFxuICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcmVkaXRzXCIpLFxuICAgIGFkZENyZWRpdDogZnVuY3Rpb24gKGFtb3VudCkge1xuICAgICAgdGhpcy5jcmVkaXRzUmVtYWluaW5nICs9IGFtb3VudDtcbiAgICB9LFxuICAgIHVzZUNyZWRpdDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5jcmVkaXRzUmVtYWluaW5nLS07XG4gICAgfSxcbiAgICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5jcmVkaXRzUmVtYWluaW5nID0gQ1JFRElUUztcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5kaWdpdHMuZGlnaXRzU3RyaW5nID0gdGhpcy5jcmVkaXRzUmVtYWluaW5nLnRvU3RyaW5nKCk7XG4gICAgICB0aGlzLmRpZ2l0cy5jb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgIHRoaXMuZGlnaXRzLnJlbmRlcigpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVkaXRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBkaWdpdHMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGlnaXRzU3RyaW5nOiBudWxsLFxuICAgICAgICBjb250YWluZXI6IG51bGwsIC8vIENvbnRhaW5lciB0aGF0IGhvbGRzIGRpZ2l0Q29udGFpbmVyc1xuICAgICAgICBkaWdpdENvbnRhaW5lcnM6IG51bGwsIC8vIExpc3Qgb2YgZGlnaXQgY29udGFpbmVycyB0aGF0IGhvbGQgc2luZ2xlIGRpZ2l0IGVhY2hcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyAvLyBTcGxpdCBudW1iZXIgaW50byBzZXBlcmF0ZSBjaGFyYWN0ZXJzXG4gICAgICAgICAgICB0aGlzLmRpZ2l0Q29udGFpbmVycyA9IHRoaXMuY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RpZ2l0LW51bWJlcicpOyBcbiAgICAgICAgICAgIGxldCBkaWdpdEluZGV4OyAvLyBXaGljaCBkaWdpdCBjb250YWluZXIgdG8gcHV0IG51bWJlciBpblxuXG4gICAgICAgICAgICAvLyBXaXBlIHRoZSBkaWdpdHNcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kaWdpdENvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpZ2l0Q29udGFpbmVyc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpZ2l0Q29udGFpbmVyc1tpXS5pbm5lckhUTUwgPSAnOCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFBvcHVsYXRlIHRoZSBkaWdpdHNcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kaWdpdHNTdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBkaWdpdEluZGV4ID0gKHRoaXMuZGlnaXRDb250YWluZXJzLmxlbmd0aCkgLSAodGhpcy5kaWdpdHNTdHJpbmcubGVuZ3RoIC0gaSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWdpdENvbnRhaW5lcnNbZGlnaXRJbmRleF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWdpdENvbnRhaW5lcnNbZGlnaXRJbmRleF0uaW5uZXJIVE1MID0gdGhpcy5kaWdpdHNTdHJpbmdbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGlnaXRzOyIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgaG9sZEJ1dHRvbiA9IChpbmRleCkgPT4ge1xuICAgIGxldCBob2xkQnV0dG9uO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG9sZEJ1dHRvbnMnKSxcbiAgICAgICAgcmVlbE5vOiBpbmRleCxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBob2xkQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBob2xkQnV0dG9uLmlubmVySFRNTCA9ICdIT0xEJztcbiAgICAgICAgICAgIGhvbGRCdXR0b24uY2xhc3NMaXN0LmFkZCgnaG9sZC1idXR0b24nLCAnYnV0dG9uJyk7XG4gICAgICAgICAgICBob2xkQnV0dG9uLnN0eWxlLndpZHRoID0gQlVUVE9OX1dJRFRIICsgJ3B4JztcbiAgICAgICAgICAgIGhvbGRCdXR0b24uc3R5bGUubWFyZ2luTGVmdCA9IChSRUVMX1NQQUNJTkcgLyAyKSArICgoUkVFTF9XSURUSCAtIEJVVFRPTl9XSURUSCkgLyAyKSArICdweCc7XG4gICAgICAgICAgICBob2xkQnV0dG9uLnN0eWxlLm1hcmdpblJpZ2h0ID0gKFJFRUxfU1BBQ0lORyAvIDIpICsgKChSRUVMX1dJRFRIIC0gQlVUVE9OX1dJRFRIKSAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKGhvbGRCdXR0b24pO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGhvbGRCdXR0b247IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgaG9sZEJ1dHRvbiBmcm9tICcuL2hvbGRCdXR0b24nO1xuXG5jb25zdCBob2xkQnV0dG9ucyA9ICgpID0+IHtcbiAgICBsZXQgbmV3QnV0dG9uO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYnV0dG9uTGlzdDogW10sXG4gICAgICAgIGJ1aWxkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5PX1JFRUxTOyBpKyspIHtcbiAgICAgICAgICAgICAgICBuZXdCdXR0b24gPSBob2xkQnV0dG9uKGkpO1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uTGlzdC5wdXNoKG5ld0J1dHRvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5idXR0b25MaXN0LmZvckVhY2goKGJ0biwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBidG4ucmVuZGVyKGluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGhvbGRCdXR0b25zOyIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbnVkZ2VCdXR0b24gPSAoaW5kZXgpID0+IHtcbiAgICBsZXQgbnVkZ2VCdXR0b247XG4gICAgbGV0IG51ZGdlQnV0dG9uQ29udGFpbmVyO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbnVkZ2VCdXR0b25zJyksXG4gICAgICAgIHJlZWxObzogaW5kZXgsXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbnVkZ2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uLmlubmVySFRNTCA9ICdOVURHRSc7XG4gICAgICAgICAgICBudWRnZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdudWRnZS1idXR0b24nLCAnYnV0dG9uJyk7XG4gICAgICAgICAgICBudWRnZUJ1dHRvbi5zdHlsZS53aWR0aCA9IEJVVFRPTl9XSURUSCArICdweCc7XG4gICAgICAgICAgICBudWRnZUJ1dHRvbi5zdHlsZS5tYXJnaW5MZWZ0ID0gKFJFRUxfU1BBQ0lORyAvIDIpICsgKChSRUVMX1dJRFRIIC0gQlVUVE9OX1dJRFRIKSAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uLnN0eWxlLm1hcmdpblJpZ2h0ID0gKFJFRUxfU1BBQ0lORyAvIDIpICsgKChSRUVMX1dJRFRIIC0gQlVUVE9OX1dJRFRIKSAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKG51ZGdlQnV0dG9uKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBudWRnZUJ1dHRvbjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBudWRnZUJ1dHRvbiBmcm9tICcuL251ZGdlQnV0dG9uJztcblxuY29uc3QgbnVkZ2VCdXR0b25zID0gKCkgPT4ge1xuICAgIGxldCBuZXdCdXR0b247XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBidXR0b25MaXN0OiBbXSxcbiAgICAgICAgYnVpbGQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOT19SRUVMUzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbmV3QnV0dG9uID0gbnVkZ2VCdXR0b24oaSk7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25MaXN0LnB1c2gobmV3QnV0dG9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uTGlzdC5mb3JFYWNoKChidG4sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgYnRuLnJlbmRlcihpbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBudWRnZUJ1dHRvbnM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZGlnaXRzIGZyb20gJy4vZGlnaXRzJztcblxuY29uc3QgbnVkZ2VzID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIG51ZGdlc1JlbWFpbmluZzogMCxcbiAgICAgICAgZGlnaXRzOiBkaWdpdHMoKSxcbiAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbnVkZ2VzJyksXG4gICAgICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMubnVkZ2VzUmVtYWluaW5nID0gMDtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmRpZ2l0cy5kaWdpdHNTdHJpbmcgPSB0aGlzLm51ZGdlc1JlbWFpbmluZy50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5kaWdpdHMuY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgICAgICB0aGlzLmRpZ2l0cy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBudWRnZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCByZWVsSXRlbSBmcm9tIFwiLi9yZWVsSXRlbVwiO1xuXG5jb25zdCBtb3ZlQXJyYXlJdGVtVG9OZXdJbmRleCA9IChhcnIsIG9sZF9pbmRleCwgbmV3X2luZGV4KSA9PiB7XG4gIHdoaWxlIChvbGRfaW5kZXggPCAwKSB7XG4gICAgb2xkX2luZGV4ICs9IGFyci5sZW5ndGg7XG4gIH1cbiAgd2hpbGUgKG5ld19pbmRleCA8IDApIHtcbiAgICBuZXdfaW5kZXggKz0gYXJyLmxlbmd0aDtcbiAgfVxuICBpZiAobmV3X2luZGV4ID49IGFyci5sZW5ndGgpIHtcbiAgICB2YXIgayA9IG5ld19pbmRleCAtIGFyci5sZW5ndGggKyAxO1xuICAgIHdoaWxlIChrLS0pIHtcbiAgICAgIGFyci5wdXNoKHVuZGVmaW5lZCk7XG4gICAgfVxuICB9XG4gIGFyci5zcGxpY2UobmV3X2luZGV4LCAwLCBhcnIuc3BsaWNlKG9sZF9pbmRleCwgMSlbMF0pO1xuICBjb25zb2xlLmxvZyhcIk5FVyBBUlJcIiwgYXJyKTtcbn07XG5cbmNvbnN0IHJlZWwgPSAocmVlbE5vKSA9PiB7XG4gIGxldCBmaXJzdEl0ZW07XG4gIGxldCBsYXN0SXRlbTtcbiAgbGV0IG51ZGdlQ2FsbFRpbWVzO1xuXG4gIGNvbnN0IFNFTEVDVF9HQU1FX01PREUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWUtbW9kZVwiKTtcbiAgY29uc3QgU0VMRUNUX0lURU1fU0VMRUNUT1IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIml0ZW0tc2VsZWN0b3JcIik7XG4gIGNvbnN0IFNFTEVDVF9ST1dfU0VMRUNUT1IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvdy1zZWxlY3RvclwiKTtcblxuICByZXR1cm4ge1xuICAgIG5vT2ZJdGVtczogTk9fSVRFTVMsXG4gICAgaXRlbUxpc3Q6IElURU1fTElTVCxcbiAgICByZWVsU3BlZWQ6IFJFRUxfU1BFRUQsXG4gICAgbnVkZ2VTcGVlZDogMTAsXG4gICAgcnVuVGltZTogUkVFTF9TUEVFRCAqIDEwICsgMjAgKiByZWVsTm8sIC8vIEFyYml0cmFyeSB2YWx1ZXMgZm9yIHRlc3RpbmdcbiAgICBjYW5Ib2xkOiBmYWxzZSxcbiAgICBpc0hlbGQ6IGZhbHNlLFxuICAgIGNhbk51ZGdlOiBmYWxzZSxcbiAgICBpc051ZGdpbmc6IGZhbHNlLFxuICAgIG51ZGdlRnJhbWVzOiBJVEVNX0hFSUdIVCAvIE5VREdFX1NQRUVELFxuICAgIG51ZGdlRnJhbWU6IDAsXG4gICAgcmVlbEl0ZW1zOiBbXSxcbiAgICByZWVsTm8sXG4gICAgYnVpbGQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBpdGVtTm8gPSAwO1xuICAgICAgbGV0IHR5cGU7XG4gICAgICBsZXQgaW5zdGFuY2VzO1xuICAgICAgbGV0IGltYWdlU3JjO1xuICAgICAgbGV0IHdpbkFtb3VudDtcbiAgICAgIGxldCB4O1xuICAgICAgbGV0IHk7XG4gICAgICBsZXQgbmV3UmVlbEl0ZW07XG5cbiAgICAgIElURU1fSU5GTy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICB0eXBlID0gaXRlbS50eXBlO1xuICAgICAgICBpbnN0YW5jZXMgPSBpdGVtLmluc3RhbmNlcztcbiAgICAgICAgaW1hZ2VTcmMgPSBpdGVtLmltYWdlU3JjO1xuICAgICAgICB3aW5BbW91bnQgPSBpdGVtLndpbkFtb3VudDtcblxuICAgICAgICAvLyBBZGQgcmVxdWlyZWQgbm8gb2YgaW5zdGFuY2VzIG9mIHRoaXMgaXRlbSB0byB0aGUgcmVlbEl0ZW1zIGFycmF5XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdGFuY2VzOyBpKyspIHtcbiAgICAgICAgICB4ID1cbiAgICAgICAgICAgIFZJRVdQT1JUX1ggKyB0aGlzLnJlZWxObyAqIFJFRUxfV0lEVEggKyB0aGlzLnJlZWxObyAqIFJFRUxfU1BBQ0lORztcblxuICAgICAgICAgIHkgPSBWSUVXUE9SVF9ZIC0gSVRFTV9IRUlHSFQgLSBJVEVNX0hFSUdIVCAqIGl0ZW1ObyAtIDEwMDtcblxuICAgICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgIGltZy5zcmMgPSBcIi4vaW1nL1wiICsgaXRlbS5pbWFnZVNyYztcblxuICAgICAgICAgIG5ld1JlZWxJdGVtID0gcmVlbEl0ZW0odHlwZSwgaXRlbU5vLCBpbWcsIHgsIHksIHdpbkFtb3VudCk7XG4gICAgICAgICAgdGhpcy5yZWVsSXRlbXMucHVzaChuZXdSZWVsSXRlbSk7XG4gICAgICAgICAgaXRlbU5vKys7XG4gICAgICAgICAgLy8gfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zaHVmZmxlKCk7XG4gICAgICB0aGlzLnJlc2V0Q29vcmRzKCk7XG4gICAgfSxcbiAgICBzaHVmZmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgcm5kO1xuICAgICAgbGV0IHRlbXA7XG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5yZWVsSXRlbXMubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICBybmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICAgICAgdGVtcCA9IHRoaXMucmVlbEl0ZW1zW2ldO1xuICAgICAgICB0aGlzLnJlZWxJdGVtc1tpXSA9IHRoaXMucmVlbEl0ZW1zW3JuZF07XG4gICAgICAgIHRoaXMucmVlbEl0ZW1zW3JuZF0gPSB0ZW1wO1xuICAgICAgfVxuICAgIH0sXG4gICAgbnVkZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucmVlbEl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5udWRnZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc2hpZnQoKTtcblxuICAgICAgdGhpcy5udWRnZUZyYW1lKys7XG5cbiAgICAgIGlmICh0aGlzLm51ZGdlRnJhbWUgPj0gdGhpcy5udWRnZUZyYW1lcykge1xuICAgICAgICB0aGlzLmlzTnVkZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm51ZGdlRnJhbWUgPSAwO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVzZXRDb29yZHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yZWVsSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5yZWVsSXRlbXNbaV0ueSA9XG4gICAgICAgICAgVklFV1BPUlRfWSArIFZJRVdQT1JUX0hFSUdIVCAtIElURU1fSEVJR0hUIC0gSVRFTV9IRUlHSFQgKiBpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVzZXRSdW50aW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNIZWxkKSB7XG4gICAgICAgIHRoaXMucnVuVGltZSA9IFJFRUxfU1BFRUQgKiAxMCArIDIwICogcmVlbE5vOyAvLyBBcmJpdHJhcnkgdmFsdWVzIGZvciB0ZXN0aW5nO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2hpZnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIElmIGJvdHRvbSByZWVsIGl0ZW0gZ2V0cyBiZWxvdyBib3R0b20gb2Ygdmlld3BvcnQgdGhlbiBtb3ZlIGl0IHRvIGJlZ2lubmluZyBvZiBhcnJheVxuICAgICAgaWYgKHRoaXMucmVlbEl0ZW1zWzBdLnkgPj0gVklFV1BPUlRfWSArIFZJRVdQT1JUX0hFSUdIVCkge1xuICAgICAgICBmaXJzdEl0ZW0gPSB0aGlzLnJlZWxJdGVtc1swXTtcbiAgICAgICAgbGFzdEl0ZW0gPSB0aGlzLnJlZWxJdGVtc1t0aGlzLnJlZWxJdGVtcy5sZW5ndGggLSAxXTtcblxuICAgICAgICAvLyBSZXN0IHkgY29vcmRzIGZvciBpdGVtIHRvIHNoaWZ0IHRvIHRvcCBvZiByZWVsXG4gICAgICAgIGZpcnN0SXRlbS55ID0gbGFzdEl0ZW0ueSAtIElURU1fSEVJR0hUO1xuXG4gICAgICAgIC8vIFNoaWZ0IGJvdHRvbSBpdGVtIHRvIHRvcFxuICAgICAgICB0aGlzLnJlZWxJdGVtcy5wdXNoKHRoaXMucmVlbEl0ZW1zLnNoaWZ0KCkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5yZWVsSXRlbXMuZm9yRWFjaCgocmVlbEl0ZW0pID0+IHtcbiAgICAgICAgcmVlbEl0ZW0ubW92ZSgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnNoaWZ0KCk7XG4gICAgICAvLyBSZWR1Y2UgcmVlbCBydW50aW1lXG4gICAgICB0aGlzLnJ1blRpbWUtLTtcbiAgICAgIGlmIChTRUxFQ1RfR0FNRV9NT0RFLnZhbHVlID09PSBcImZpeGVkXCIgJiYgdGhpcy5ydW5UaW1lID09PSAwKSB7XG4gICAgICAgIGxldCBwcmV2SW5kZXggPSB0aGlzLnJlZWxJdGVtcy5maW5kSW5kZXgoXG4gICAgICAgICAgKGl0ZW0pID0+XG4gICAgICAgICAgICBwYXJzZUludChpdGVtLml0ZW1ObykgPT09IHBhcnNlSW50KFNFTEVDVF9JVEVNX1NFTEVDVE9SLnZhbHVlKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBtYXBSb3dUb1N0cmluZyA9IHtcbiAgICAgICAgICB0b3A6IDIsXG4gICAgICAgICAgbWlkZGxlOiAxLFxuICAgICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IG5leHRJbmRleCA9IG1hcFJvd1RvU3RyaW5nW1NFTEVDVF9ST1dfU0VMRUNUT1IudmFsdWVdO1xuICAgICAgICBpZiAocHJldkluZGV4ICE9PSBuZXh0SW5kZXgpIHtcbiAgICAgICAgICBtb3ZlQXJyYXlJdGVtVG9OZXdJbmRleCh0aGlzLnJlZWxJdGVtcywgcHJldkluZGV4LCBuZXh0SW5kZXgpO1xuICAgICAgICAgIHRoaXMucmVzZXRDb29yZHMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnJlZWxJdGVtcy5mb3JFYWNoKChyZWVsSXRlbSkgPT4ge1xuICAgICAgICByZWVsSXRlbS5yZW5kZXIoKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZWVsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHJlZWxJdGVtID0gKHR5cGUsIGl0ZW1ObywgaW1nLCB4LCB5LCB3aW5BbW91bnQpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlLFxuICAgIGl0ZW1ObyxcbiAgICBpbWcsXG4gICAgeCxcbiAgICB5LFxuICAgIHdpbkFtb3VudCxcbiAgICBzcGVlZDogUkVFTF9TUEVFRCxcbiAgICBudWRnZVNwZWVkOiBOVURHRV9TUEVFRCxcbiAgICBjdHg6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlld3BvcnRcIikuZ2V0Q29udGV4dChcIjJkXCIpLFxuICAgIG1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMueSArPSB0aGlzLnNwZWVkO1xuICAgIH0sXG4gICAgbnVkZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMueSArPSB0aGlzLm51ZGdlU3BlZWQ7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShcbiAgICAgICAgdGhpcy5pbWcsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIElURU1fV0lEVEgsXG4gICAgICAgIElURU1fSEVJR0hULFxuICAgICAgICB0aGlzLngsXG4gICAgICAgIHRoaXMueSxcbiAgICAgICAgSVRFTV9XSURUSCxcbiAgICAgICAgSVRFTV9IRUlHSFRcbiAgICAgICk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlZWxJdGVtO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCByZWVsIGZyb20gXCIuL3JlZWxcIjtcblxuY29uc3QgcmVlbHMgPSAoKSA9PiB7XG4gIGxldCBuZXdSZWVsO1xuICByZXR1cm4ge1xuICAgIHJlZWxMaXN0OiBbXSxcbiAgICBidWlsZDogZnVuY3Rpb24gKCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOT19SRUVMUzsgaSsrKSB7XG4gICAgICAgIG5ld1JlZWwgPSByZWVsKGkpO1xuICAgICAgICBuZXdSZWVsLmJ1aWxkKCk7XG4gICAgICAgIHRoaXMucmVlbExpc3QucHVzaChuZXdSZWVsKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgICAgICBpZiAocmVlbC5ydW5UaW1lID4gMCAmJiAhcmVlbC5pc0hlbGQpIHtcbiAgICAgICAgICByZWVsLm1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgICByZXNldFJ1bnRpbWVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcbiAgICAgICAgcmVlbC5yZXNldFJ1bnRpbWUoKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcbiAgICAgICAgcmVlbC5yZW5kZXIoKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZWVscztcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgdmlld3BvcnQgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3Vmlld3BvcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBuZXdWaWV3cG9ydC53aWR0aCA9IFZJRVdQT1JUX1dJRFRIO1xuICAgIG5ld1ZpZXdwb3J0LmhlaWdodCA9IFZJRVdQT1JUX0hFSUdIVDtcbiAgICBuZXdWaWV3cG9ydC5pZCA9IFwidmlld3BvcnRcIjtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHZpZXdwb3J0OiBuZXdWaWV3cG9ydCxcbiAgICAgICAgd2lkdGg6IFZJRVdQT1JUX1dJRFRILFxuICAgICAgICBoZWlnaHQ6IFZJRVdQT1JUX0hFSUdIVCxcbiAgICAgICAgY3R4OiBuZXdWaWV3cG9ydC5nZXRDb250ZXh0KCcyZCcpLFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHZpZXdwb3J0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXdwb3J0Q29udGFpbmVyJyk7XG4gICAgICAgICAgICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnZpZXdwb3J0KTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCB2aWV3cG9ydDsiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGRpZ2l0cyBmcm9tIFwiLi9kaWdpdHNcIjtcblxuY29uc3Qgd2luID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGN1cnJlbnRXaW46IDAsXG4gICAgZGlnaXRzOiBkaWdpdHMoKSxcbiAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luXCIpLFxuICAgIGFkZFdpbjogZnVuY3Rpb24gKHdpbkFtb3VudCkge1xuICAgICAgdGhpcy5jdXJyZW50V2luID0gd2luQW1vdW50O1xuICAgIH0sXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuY3VycmVudFdpbiA9IDA7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZGlnaXRzLmRpZ2l0c1N0cmluZyA9IHRoaXMuY3VycmVudFdpbi50b1N0cmluZygpO1xuICAgICAgdGhpcy5kaWdpdHMuY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICB0aGlzLmRpZ2l0cy5yZW5kZXIoKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgd2luO1xuIiwiaW1wb3J0IFZpZXdwb3J0IGZyb20gXCIuL2NvbXBvbmVudHMvdmlld3BvcnRcIjtcbmltcG9ydCBSZWVscyBmcm9tIFwiLi9jb21wb25lbnRzL3JlZWxzXCI7XG5pbXBvcnQgTnVkZ2VCdXR0b25zIGZyb20gXCIuL2NvbXBvbmVudHMvbnVkZ2VCdXR0b25zXCI7XG5pbXBvcnQgSG9sZEJ1dHRvbnMgZnJvbSBcIi4vY29tcG9uZW50cy9ob2xkQnV0dG9uc1wiO1xuaW1wb3J0IENyZWRpdHMgZnJvbSBcIi4vY29tcG9uZW50cy9jcmVkaXRzXCI7XG5pbXBvcnQgV2luIGZyb20gXCIuL2NvbXBvbmVudHMvd2luXCI7XG5pbXBvcnQgTnVkZ2VzIGZyb20gXCIuL2NvbXBvbmVudHMvbnVkZ2VzXCI7XG5cbi8vIFNhc3NcbmltcG9ydCBcIi4uL3Njc3MvYXBwLnNjc3NcIjtcblxuLy8gY3JlYXRlcyB0aGUgY2FudmFzIHdoaWNoIHdlIG5lZWQgdG8gZHJhdyB1cG9uIGFuZCBhc3NpZ25zIHRvIGEgdmlld3BvcnQgdmFyaWFibGVcbmNvbnN0IHZpZXdwb3J0ID0gVmlld3BvcnQoKTtcbi8vIGNvbnN0IHNwaW5CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3BpbkJ1dHRvbicpO1xuY29uc3Qgd2luQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5cIik7XG5jb25zdCBudWRnZXNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm51ZGdlc1wiKTtcbmxldCBwbGF5U2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheVNlY3Rpb25cIik7XG5jb25zdCBzZWxlY3RfZ2FtZU1vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWUtbW9kZVwiKTtcbmNvbnN0IHNlbGVjdF9pdGVtU2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIml0ZW0tc2VsZWN0b3JcIik7XG5jb25zdCBzZWxlY3Rfcm93U2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvdy1zZWxlY3RvclwiKTtcbmNvbnN0IGRpdl9maXhlZE1vZGVPcHRpb25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaXhlZC1tb2RlLW9wdGlvbnNcIik7XG5cbmxldCB2aWV3cG9ydENvbnRhaW5lcjtcbmxldCBudWRnZUJ1dHRvbkNvbnRhaW5lcjtcbmxldCBob2xkQnV0dG9uQ29udGFpbmVyO1xubGV0IHdpbkluZGljYXRvckxlZnQ7XG5sZXQgd2luSW5kaWNhdG9yUmlnaHQ7XG5sZXQgd2luSW5kaWNhdG9yVG9wTGluZTtcbmxldCB3aW5JbmRpY2F0b3JDZW50cmVMaW5lO1xubGV0IHdpbkluZGljYXRvckJvdHRvbUxpbmU7XG5sZXQgc3BpbkJ1dHRvbjtcbmxldCByZWVscztcbmxldCBudWRnZXM7XG5sZXQgbnVkZ2VCdXR0b25zO1xubGV0IGhvbGRCdXR0b25zO1xubGV0IG51ZGdlQnV0dG9uTGlzdDtcbmxldCBob2xkQnV0dG9uTGlzdDtcbmxldCBjcmVkaXRzO1xubGV0IHdpbjtcbmxldCB3aW5uaW5nUm93cyA9IFtdO1xubGV0IGdhbWVMb29wO1xubGV0IG51ZGdlQ2hhbmNlID0gMjsgLy8gQ2hhbmNlIG9mIGdldHRpbmcgbnVkZ2VzIGFmdGVyIHNwaW4gKDEgaW4gbnVkZ2VDaGFuY2UpXG5sZXQgaG9sZENoYW5jZSA9IDI7IC8vIENoYW5jZSBvZiBnZXR0aW5nIGhvbGRzIGFmdGVyIHNwaW4gKDEgaW4gaG9sZENoYW5jZSlcbmxldCBjYW5TcGluO1xubGV0IGNhbk51ZGdlO1xubGV0IGNhbkhvbGQ7XG5sZXQgbm93OyAvLyBDdXJyZW50IHRpbWUgdG8gY29tcGFyZSBhZ2FpbnN0XG5sZXQgcmVlbHNSdW5uaW5nID0gW107IC8vIEtlZXBzIHRyYWNrIG9mIGFueSByZWVscyB3aXRoIHJ1bnRpbWUgbGVmdCBvbiB0aGVtIHRvIGVzdGJsaXNoIHdoZXRoZXIgdG8gcmVzZXQvc3RvcCBzcGluIGV0Yy5cbmxldCBzcGluVHlwZSA9IFwic3BpblwiOyAvLyBLZWVwcyB0cmFjayBvZiB3aGV0aGVyIGxhc3Qgc3BpbiB3YXMgcmVndWxhciBzcGluIG9yIG51ZGdlXG5cbmNvbnN0IGluaXQgPSAoKSA9PiB7XG4gIHJlbmRlclZpZXdwb3J0Q29udGFpbmVyKCk7XG5cbiAgLy8gUmVuZGVyIHZpZXdwb3J0XG4gIHZpZXdwb3J0LnJlbmRlcigpO1xuXG4gIC8vIFNldCB1cCByZWVsc1xuICByZWVscyA9IFJlZWxzKCk7XG4gIHJlZWxzLmJ1aWxkKCk7XG4gIHJlZWxzLnJlbmRlcigpO1xuXG4gIGxldCByZWVsQ29udGFpbmVyO1xuICBsZXQgcmVlbENvbnRhaW5lclg7XG4gIGxldCByZWVsQ29udGFpbmVyWTtcbiAgbGV0IHJlZWxDb250YWluZXJXO1xuICBsZXQgcmVlbENvbnRhaW5lckg7XG5cbiAgcmVlbHMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgIC8vIFJlbmRlciBvdXRlciBjb250YWluZXIgZm9yIGVhY2ggcmVlbCBpbiB0aGUgdmlld3BvcnQgY29udGFpbmVyXG4gICAgcmVlbENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICByZWVsQ29udGFpbmVyWCA9XG4gICAgICByZWVsLnJlZWxJdGVtc1swXS54ICtcbiAgICAgIFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1ggLVxuICAgICAgUkVFTF9DT05UQUlORVJfUEFERElORztcblxuICAgIHJlZWxDb250YWluZXJZID1cbiAgICAgIHJlZWwucmVlbEl0ZW1zWzJdLnkgK1xuICAgICAgVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWSAtXG4gICAgICBSRUVMX0NPTlRBSU5FUl9QQURESU5HO1xuXG4gICAgcmVlbENvbnRhaW5lclcgPSBSRUVMX1dJRFRIICsgUkVFTF9DT05UQUlORVJfUEFERElORyAqIDI7XG5cbiAgICByZWVsQ29udGFpbmVySCA9IFZJRVdQT1JUX0hFSUdIVCArIFJFRUxfQ09OVEFJTkVSX1BBRERJTkcgKiAyO1xuXG4gICAgcmVlbENvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICByZWVsQ29udGFpbmVyLnN0eWxlLnRvcCA9IHJlZWxDb250YWluZXJZICsgXCJweFwiO1xuICAgIHJlZWxDb250YWluZXIuc3R5bGUubGVmdCA9IHJlZWxDb250YWluZXJYICsgXCJweFwiO1xuICAgIHJlZWxDb250YWluZXIuc3R5bGUud2lkdGggPSByZWVsQ29udGFpbmVyVyArIFwicHhcIjtcbiAgICByZWVsQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IHJlZWxDb250YWluZXJIICsgXCJweFwiO1xuICAgIHJlZWxDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInJlZWwtY29udGFpbmVyXCIpO1xuICAgIHZpZXdwb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHJlZWxDb250YWluZXIpO1xuICB9KTtcblxuICByZW5kZXJXaW5JbmRpY2F0b3JzKCk7XG5cbiAgcmVuZGVyTnVkZ2VCdXR0b25Db250YWluZXIoKTtcblxuICAvLyBTZXQgdXAgbnVkZ2UgYnV0dG9uc1xuICBudWRnZUJ1dHRvbnMgPSBOdWRnZUJ1dHRvbnMoKTtcbiAgbnVkZ2VCdXR0b25zLmJ1aWxkKCk7XG4gIG51ZGdlQnV0dG9ucy5yZW5kZXIoKTtcblxuICBudWRnZUJ1dHRvbkxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibnVkZ2UtYnV0dG9uXCIpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbnVkZ2VCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgbnVkZ2VCdXR0b25MaXN0W2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGNhblNwaW4gJiZcbiAgICAgICAgY2FuTnVkZ2UgJiZcbiAgICAgICAgcmVlbHMucmVlbExpc3RbaV0uY2FuTnVkZ2UgPT09IHRydWUgJiZcbiAgICAgICAgbnVkZ2VzLm51ZGdlc1JlbWFpbmluZyA+IDBcbiAgICAgICkge1xuICAgICAgICBzcGluVHlwZSA9IFwibnVkZ2VcIjtcbiAgICAgICAgbnVkZ2VzLm51ZGdlc1JlbWFpbmluZyAtPSAxO1xuICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5pc051ZGdpbmcgPSB0cnVlO1xuICAgICAgICBnYW1lTG9vcCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgICAgZ2FtZVN0YXRlcy5jdXJyZW50U3RhdGUgPSBnYW1lU3RhdGVzLm51ZGdlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gU2V0IHVwIG51ZGdlc1xuICBudWRnZXMgPSBOdWRnZXMoKTtcbiAgbnVkZ2VzLnJlbmRlcigpO1xuXG4gIHJlbmRlckhvbGRCdXR0b25Db250YWluZXIoKTtcblxuICAvLyBTZXQgdXAgaG9sZCBidXR0b25zXG4gIGhvbGRCdXR0b25zID0gSG9sZEJ1dHRvbnMoKTtcbiAgaG9sZEJ1dHRvbnMuYnVpbGQoKTtcbiAgaG9sZEJ1dHRvbnMucmVuZGVyKCk7XG5cbiAgaG9sZEJ1dHRvbkxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaG9sZC1idXR0b25cIik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBob2xkQnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGhvbGRCdXR0b25MaXN0W2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChjYW5TcGluICYmIGNhbkhvbGQpIHtcbiAgICAgICAgLy8gVG9nZ2xlXG4gICAgICAgIGlmIChyZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQpIHtcbiAgICAgICAgICAvLyBUYWtlIGhvbGQgb2ZmXG4gICAgICAgICAgcmVlbHMucmVlbExpc3RbaV0uaXNIZWxkID0gZmFsc2U7XG4gICAgICAgICAgcmVlbHMucmVlbExpc3RbaV0ucmVzZXRSdW50aW1lKCk7XG4gICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJoZWxkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFB1dCBob2xkIG9uXG4gICAgICAgICAgcmVlbHMucmVlbExpc3RbaV0uaXNIZWxkID0gdHJ1ZTtcbiAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5ydW5UaW1lID0gMDtcbiAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImhlbGRcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNldCB1cCBjcmVkaXRzXG4gIGNyZWRpdHMgPSBDcmVkaXRzKCk7XG4gIGNyZWRpdHMucmVzZXQoKTtcbiAgY3JlZGl0cy5yZW5kZXIoKTtcblxuICAvLyBTZXQgdXAgd2luXG4gIHdpbiA9IFdpbigpO1xuICB3aW4ucmVzZXQoKTtcbiAgd2luLnJlbmRlcigpO1xuXG4gIHJlbmRlclNwaW5CdXR0b24oKTtcblxuICBjYW5TcGluID0gdHJ1ZTtcbiAgY2FuTnVkZ2UgPSBmYWxzZTtcbiAgY2FuSG9sZCA9IGZhbHNlO1xuXG4gIGVuYWJsZVNwaW4oKTtcbiAgZW5hYmxlR2FtZU1vZGUoKTtcblxuICBzcGluQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKGNhblNwaW4pIHtcbiAgICAgIGNyZWRpdHMudXNlQ3JlZGl0KCk7XG4gICAgICBjcmVkaXRzLnJlbmRlcigpO1xuICAgICAgd2lubmluZ1Jvd3MgPSBbXTtcbiAgICAgIGRpc2FibGVOdWRnZXMoKTtcbiAgICAgIGRpc2FibGVTcGluKCk7XG4gICAgICBkaXNhYmxlR2FtZU1vZGUoKTtcblxuICAgICAgLy8gRGlzYWJsZSBob2xkIGJ1dHRvbnMgdGhhdCBhcmVuJ3QgaGVsZFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWVscy5yZWVsTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIXJlZWxzLnJlZWxMaXN0W2ldLmlzSGVsZCkge1xuICAgICAgICAgIHJlZWxzLnJlZWxMaXN0W2ldLmNhbkhvbGQgPSBmYWxzZTtcbiAgICAgICAgICBob2xkQnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNwaW5UeXBlID0gXCJzcGluXCI7XG4gICAgICBnYW1lU3RhdGVzLmN1cnJlbnRTdGF0ZSA9IGdhbWVTdGF0ZXMuc3BpbjtcbiAgICAgIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgZ2FtZVN0YXRlcy5jdXJyZW50U3RhdGUoKTtcbiAgICB9XG4gIH0pO1xuICBzZWxlY3RfZ2FtZU1vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGlmICh0aGlzLnZhbHVlID09PSBcImZpeGVkXCIpIHtcbiAgICAgIGRpdl9maXhlZE1vZGVPcHRpb25zLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgfSBlbHNlIGlmICh0aGlzLnZhbHVlID09PSBcInJhbmRvbVwiKSB7XG4gICAgICBkaXZfZml4ZWRNb2RlT3B0aW9ucy5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCByZW5kZXJOdWRnZUJ1dHRvbkNvbnRhaW5lciA9ICgpID0+IHtcbiAgbnVkZ2VCdXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBudWRnZUJ1dHRvbkNvbnRhaW5lci5pZCA9IFwibnVkZ2VCdXR0b25zXCI7XG4gIHBsYXlTZWN0aW9uLmFwcGVuZENoaWxkKG51ZGdlQnV0dG9uQ29udGFpbmVyKTtcbn07XG5cbmNvbnN0IHJlbmRlckhvbGRCdXR0b25Db250YWluZXIgPSAoKSA9PiB7XG4gIGhvbGRCdXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBob2xkQnV0dG9uQ29udGFpbmVyLmlkID0gXCJob2xkQnV0dG9uc1wiO1xuICBwbGF5U2VjdGlvbi5hcHBlbmRDaGlsZChob2xkQnV0dG9uQ29udGFpbmVyKTtcbn07XG5cbmNvbnN0IHJlbmRlclNwaW5CdXR0b24gPSAoKSA9PiB7XG4gIHNwaW5CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBzcGluQnV0dG9uLmlkID0gXCJzcGluQnV0dG9uXCI7XG4gIHNwaW5CdXR0b24uY2xhc3NMaXN0LmFkZChcImJ1dHRvblwiKTtcbiAgc3BpbkJ1dHRvbi5pbm5lckhUTUwgPSBcIlNQSU5cIjtcbiAgcGxheVNlY3Rpb24uYXBwZW5kQ2hpbGQoc3BpbkJ1dHRvbik7XG59O1xuXG5jb25zdCByZW5kZXJWaWV3cG9ydENvbnRhaW5lciA9ICgpID0+IHtcbiAgLy8gUmVuZGVyIHZpZXdwb3J0IGNvbnRhaW5lclxuICB2aWV3cG9ydENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHZpZXdwb3J0Q29udGFpbmVyLmlkID0gXCJ2aWV3cG9ydENvbnRhaW5lclwiO1xuICB2aWV3cG9ydENvbnRhaW5lci5zdHlsZS5wYWRkaW5nTGVmdCA9IFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1ggKyBcInB4XCI7XG4gIHZpZXdwb3J0Q29udGFpbmVyLnN0eWxlLnBhZGRpbmdSaWdodCA9IFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1ggKyBcInB4XCI7XG4gIHZpZXdwb3J0Q29udGFpbmVyLnN0eWxlLnBhZGRpbmdUb3AgPSBWSUVXUE9SVF9DT05UQUlORVJfUEFERElOR19ZICsgXCJweFwiO1xuICB2aWV3cG9ydENvbnRhaW5lci5zdHlsZS5wYWRkaW5nQm90dG9tID0gVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWSArIFwicHhcIjtcbiAgcGxheVNlY3Rpb24uYXBwZW5kQ2hpbGQodmlld3BvcnRDb250YWluZXIpO1xufTtcblxuY29uc3QgcmVuZGVyV2luSW5kaWNhdG9ycyA9ICgpID0+IHtcbiAgLy8gTGVmdCBpbmRpY2F0b3JcbiAgd2luSW5kaWNhdG9yTGVmdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICB3aW5JbmRpY2F0b3JMZWZ0LmNsYXNzTGlzdC5hZGQoXCJ3aW4taW5kaWNhdG9yXCIsIFwibGVmdFwiKTtcbiAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQod2luSW5kaWNhdG9yTGVmdCk7XG4gIC8vIFJpZ2h0IGluZGljYXRvclxuICB3aW5JbmRpY2F0b3JSaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICB3aW5JbmRpY2F0b3JSaWdodC5jbGFzc0xpc3QuYWRkKFwid2luLWluZGljYXRvclwiLCBcInJpZ2h0XCIpO1xuICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZCh3aW5JbmRpY2F0b3JSaWdodCk7XG5cbiAgLy8gQ2VudHJlIGxpbmVcbiAgd2luSW5kaWNhdG9yQ2VudHJlTGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHdpbkluZGljYXRvckNlbnRyZUxpbmUuY2xhc3NMaXN0LmFkZChcIndpbi1pbmRpY2F0b3ItY2VudHJlLWxpbmVcIik7XG5cbiAgd2luSW5kaWNhdG9yQ2VudHJlTGluZS5zdHlsZS5sZWZ0ID0gd2luSW5kaWNhdG9yTGVmdC5vZmZzZXRXaWR0aCArIFwicHhcIjtcblxuICB3aW5JbmRpY2F0b3JDZW50cmVMaW5lLnN0eWxlLndpZHRoID1cbiAgICB2aWV3cG9ydENvbnRhaW5lci5vZmZzZXRXaWR0aCAtXG4gICAgd2luSW5kaWNhdG9yTGVmdC5vZmZzZXRXaWR0aCAtXG4gICAgd2luSW5kaWNhdG9yUmlnaHQub2Zmc2V0V2lkdGggK1xuICAgIFwicHhcIjtcblxuICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZCh3aW5JbmRpY2F0b3JDZW50cmVMaW5lKTtcblxuICAvLyBUb3AgbGluZVxuICB3aW5JbmRpY2F0b3JUb3BMaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgd2luSW5kaWNhdG9yVG9wTGluZS5jbGFzc0xpc3QuYWRkKFwid2luLWluZGljYXRvci10b3AtbGluZVwiKTtcblxuICB3aW5JbmRpY2F0b3JUb3BMaW5lLnN0eWxlLmxlZnQgPSB3aW5JbmRpY2F0b3JMZWZ0Lm9mZnNldFdpZHRoICsgXCJweFwiO1xuXG4gIHdpbkluZGljYXRvclRvcExpbmUuc3R5bGUud2lkdGggPVxuICAgIHZpZXdwb3J0Q29udGFpbmVyLm9mZnNldFdpZHRoIC1cbiAgICB3aW5JbmRpY2F0b3JMZWZ0Lm9mZnNldFdpZHRoIC1cbiAgICB3aW5JbmRpY2F0b3JSaWdodC5vZmZzZXRXaWR0aCArXG4gICAgXCJweFwiO1xuXG4gIHZpZXdwb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHdpbkluZGljYXRvclRvcExpbmUpO1xuXG4gIC8vIEJvdHRvbSBsaW5lXG4gIHdpbkluZGljYXRvckJvdHRvbUxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB3aW5JbmRpY2F0b3JCb3R0b21MaW5lLmNsYXNzTGlzdC5hZGQoXCJ3aW4taW5kaWNhdG9yLWJvdHRvbS1saW5lXCIpO1xuXG4gIHdpbkluZGljYXRvckJvdHRvbUxpbmUuc3R5bGUubGVmdCA9IHdpbkluZGljYXRvckxlZnQub2Zmc2V0V2lkdGggKyBcInB4XCI7XG5cbiAgd2luSW5kaWNhdG9yQm90dG9tTGluZS5zdHlsZS53aWR0aCA9XG4gICAgdmlld3BvcnRDb250YWluZXIub2Zmc2V0V2lkdGggLVxuICAgIHdpbkluZGljYXRvckxlZnQub2Zmc2V0V2lkdGggLVxuICAgIHdpbkluZGljYXRvclJpZ2h0Lm9mZnNldFdpZHRoICtcbiAgICBcInB4XCI7XG5cbiAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQod2luSW5kaWNhdG9yQm90dG9tTGluZSk7XG59O1xuXG5jb25zdCBsb29wID0gKGN1cnJlbnRUaW1lKSA9PiB7XG4gIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApOyAvLyBOZWVkcyB0byBnbyBiZWZvcmUgbGluZSBiZWxvdyB0byBrZWVwIGFuaW1hdGlvbmZyYW1laWQgdXAgdG8gZGF0ZVxuICBnYW1lU3RhdGVzLmN1cnJlbnRTdGF0ZShjdXJyZW50VGltZSk7XG59O1xuXG5jb25zdCBtb3ZlUmVlbHMgPSAoKSA9PiB7XG4gIHJlZWxzLm1vdmUoKTtcbn07XG5cbmNvbnN0IHJlbmRlciA9ICgpID0+IHtcbiAgdmlld3BvcnQuY2xlYXIoKTtcbiAgcmVlbHMucmVuZGVyKCk7XG5cbiAgLy8gRGlnaXRzXG4gIG51ZGdlcy5yZW5kZXIoKTtcbiAgY3JlZGl0cy5yZW5kZXIoKTtcbiAgd2luLnJlbmRlcigpO1xufTtcblxuLy8gQ2FsY3VsYXRlcyB3aW4gYW1vdW50LCBpZiB3aW5uaW5nIGxpbmVcbmNvbnN0IGNoZWNrV2luID0gKCkgPT4ge1xuICBsZXQgc3BpblJlc3VsdCA9IFtdOyAvLyBBcnJheSBvZiByZWVsIHJlc3VsdHMgYWZ0ZXIgc3BpbiAoYWxsIHRocmVlIHZpc2libGUgb2JqZWN0cyBvZiBlYWNoIHJlZWwpXG4gIGxldCByZWVsUmVzdWx0OyAvLyBJbmRpdmlkdWFsIHJlZWwgcmVzdWx0LCBtYWRlIG9mIHRocmVlIG9iamVjdHMgKHZpc2libGUpXG5cbiAgLy8gQ2hlY2sgZm9yIHdpblxuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsLCBpbmRleCkgPT4ge1xuICAgIHJlZWxSZXN1bHQgPSBbXTsgLy8gUmVzdWx0IG9mIGluZGl2aWR1YWwgcmVlbFxuXG4gICAgcmVlbFJlc3VsdC5wdXNoKHJlZWxzLnJlZWxMaXN0W2luZGV4XS5yZWVsSXRlbXNbMF0pO1xuICAgIHJlZWxSZXN1bHQucHVzaChyZWVscy5yZWVsTGlzdFtpbmRleF0ucmVlbEl0ZW1zWzFdKTtcbiAgICByZWVsUmVzdWx0LnB1c2gocmVlbHMucmVlbExpc3RbaW5kZXhdLnJlZWxJdGVtc1syXSk7XG5cbiAgICBzcGluUmVzdWx0LnB1c2gocmVlbFJlc3VsdCk7XG4gIH0pO1xuICBsZXQgcmVzdWx0ID0gZ2V0QWxsUm93UmVzdWx0cyhzcGluUmVzdWx0KTtcbiAgbGV0IGN1cnJlbnRXaW5BbW91bnQgPSAwO1xuXG4gIC8vIEFsbCB0aGUgcG9zc2libGUgd2lubmluZyBwb3NzaWJpbGl0aWVzIGFuZCBpdHMgcHJpemVzXG4gIHZhciB3aW5uaW5nQ2FzZSA9IHtcbiAgICB0b3A6IHtcbiAgICAgIGNoZXJyeToge1xuICAgICAgICB2YWxpZGF0ZTogLzR7M30vLnRlc3QocmVzdWx0W1widG9wXCJdKSxcbiAgICAgICAgdmFsdWU6IDIwMDAsXG4gICAgICB9LFxuICAgICAgXCI3XCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8zezN9Ly50ZXN0KHJlc3VsdFtcInRvcFwiXSksXG4gICAgICAgIHZhbHVlOiAxNTAsXG4gICAgICB9LFxuICAgICAgY2hlcnJ5T3I3OiB7XG4gICAgICAgIHZhbGlkYXRlOiAvWzQvM117M30vLnRlc3QocmVzdWx0W1widG9wXCJdKSxcbiAgICAgICAgdmFsdWU6IDc1LFxuICAgICAgfSxcbiAgICAgIFwiM3hCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzB7M30vLnRlc3QocmVzdWx0W1widG9wXCJdKSxcbiAgICAgICAgdmFsdWU6IDUwLFxuICAgICAgfSxcbiAgICAgIFwiMnhCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzJ7M30vLnRlc3QocmVzdWx0W1widG9wXCJdKSxcbiAgICAgICAgdmFsdWU6IDIwLFxuICAgICAgfSxcbiAgICAgIFwiMXhCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzF7M30vLnRlc3QocmVzdWx0W1widG9wXCJdKSxcbiAgICAgICAgdmFsdWU6IDEwLFxuICAgICAgfSxcbiAgICAgIGFueUJhcjoge1xuICAgICAgICB2YWxpZGF0ZTogL1swMTJdezN9Ly50ZXN0KHJlc3VsdFtcInRvcFwiXSksXG4gICAgICAgIHZhbHVlOiA1LFxuICAgICAgfSxcbiAgICB9LFxuICAgIG1pZGRsZToge1xuICAgICAgY2hlcnJ5OiB7XG4gICAgICAgIHZhbGlkYXRlOiAvNHszfS8udGVzdChyZXN1bHRbXCJtaWRkbGVcIl0pLFxuICAgICAgICB2YWx1ZTogMTAwMCxcbiAgICAgIH0sXG4gICAgICBcIjdcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzN7M30vLnRlc3QocmVzdWx0W1wibWlkZGxlXCJdKSxcbiAgICAgICAgdmFsdWU6IDE1MCxcbiAgICAgIH0sXG4gICAgICBjaGVycnlPcjc6IHtcbiAgICAgICAgdmFsaWRhdGU6IC9bNC8zXXszfS8udGVzdChyZXN1bHRbXCJtaWRkbGVcIl0pLFxuICAgICAgICB2YWx1ZTogNzUsXG4gICAgICB9LFxuICAgICAgXCIzeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMHszfS8udGVzdChyZXN1bHRbXCJtaWRkbGVcIl0pLFxuICAgICAgICB2YWx1ZTogNTAsXG4gICAgICB9LFxuICAgICAgXCIyeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMnszfS8udGVzdChyZXN1bHRbXCJtaWRkbGVcIl0pLFxuICAgICAgICB2YWx1ZTogMjAsXG4gICAgICB9LFxuICAgICAgXCIxeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMXszfS8udGVzdChyZXN1bHRbXCJtaWRkbGVcIl0pLFxuICAgICAgICB2YWx1ZTogMTAsXG4gICAgICB9LFxuICAgICAgYW55QmFyOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvWzAxMl17M30vLnRlc3QocmVzdWx0W1wibWlkZGxlXCJdKSxcbiAgICAgICAgdmFsdWU6IDUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgYm90dG9tOiB7XG4gICAgICBjaGVycnk6IHtcbiAgICAgICAgdmFsaWRhdGU6IC80ezN9Ly50ZXN0KHJlc3VsdFtcImJvdHRvbVwiXSksXG4gICAgICAgIHZhbHVlOiA0MDAwLFxuICAgICAgfSxcbiAgICAgIFwiN1wiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvM3szfS8udGVzdChyZXN1bHRbXCJib3R0b21cIl0pLFxuICAgICAgICB2YWx1ZTogMTUwLFxuICAgICAgfSxcbiAgICAgIGNoZXJyeU9yNzoge1xuICAgICAgICB2YWxpZGF0ZTogL1s0LzNdezN9Ly50ZXN0KHJlc3VsdFtcImJvdHRvbVwiXSksXG4gICAgICAgIHZhbHVlOiA3NSxcbiAgICAgIH0sXG4gICAgICBcIjN4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8wezN9Ly50ZXN0KHJlc3VsdFtcImJvdHRvbVwiXSksXG4gICAgICAgIHZhbHVlOiA1MCxcbiAgICAgIH0sXG4gICAgICBcIjJ4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8yezN9Ly50ZXN0KHJlc3VsdFtcImJvdHRvbVwiXSksXG4gICAgICAgIHZhbHVlOiAyMCxcbiAgICAgIH0sXG4gICAgICBcIjF4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8xezN9Ly50ZXN0KHJlc3VsdFtcImJvdHRvbVwiXSksXG4gICAgICAgIHZhbHVlOiAxMCxcbiAgICAgIH0sXG4gICAgICBhbnlCYXI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC9bMDEyXXszfS8udGVzdChyZXN1bHRbXCJib3R0b21cIl0pLFxuICAgICAgICB2YWx1ZTogNSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICAvLyBMb29wIHRocm91Z2ggdGhlIHdpbm5pbmcgcG9zc2liaWxpdGllc1xuICAvLyBjYXNlIHdpbm5pbmcgZHJhdyB0aGUgbGluZSBpbiB0aGUgd2lubmluZyByb3dcbiAgLy8gdXBkYXRlIHRoZSB2aWV3IHdpdGggdGhlIHByaXplIHZhbHVlXG4gIGZvciAobGV0IHJvdyBpbiB3aW5uaW5nQ2FzZSkge1xuICAgIGZvciAobGV0IGl0ZW0gaW4gd2lubmluZ0Nhc2Vbcm93XSkge1xuICAgICAgaWYgKHdpbm5pbmdDYXNlW3Jvd11baXRlbV0udmFsaWRhdGUpIHtcbiAgICAgICAgY3VycmVudFdpbkFtb3VudCArPSB3aW5uaW5nQ2FzZVtyb3ddW2l0ZW1dLnZhbHVlO1xuXG4gICAgICAgIHdpbm5pbmdSb3dzLnB1c2gocm93KTtcbiAgICAgICAgLy8gQnJlYWsgZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoY3VycmVudFdpbkFtb3VudCkgcmV0dXJuIGN1cnJlbnRXaW5BbW91bnQ7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGdldEFsbFJvd1Jlc3VsdHMgPSAoc3BpblJlc3VsdCkgPT4ge1xuICBsZXQgdG9wID0gXCJcIixcbiAgICBtaWRkbGUgPSBcIlwiLFxuICAgIGJvdHRvbSA9IFwiXCI7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3BpblJlc3VsdC5sZW5ndGggJiYgc3BpblJlc3VsdC5sZW5ndGggPT09IDM7IGkrKykge1xuICAgIHRvcCArPSBzcGluUmVzdWx0W2ldWzJdLml0ZW1Oby50b1N0cmluZygpO1xuICAgIG1pZGRsZSArPSBzcGluUmVzdWx0W2ldWzFdLml0ZW1Oby50b1N0cmluZygpO1xuICAgIGJvdHRvbSArPSBzcGluUmVzdWx0W2ldWzBdLml0ZW1Oby50b1N0cmluZygpO1xuICB9XG4gIHJldHVybiB7XG4gICAgdG9wLFxuICAgIG1pZGRsZSxcbiAgICBib3R0b20sXG4gIH07XG59O1xuXG4vLyBSYW5kb21seSBhc3NpZ24gbnVkZ2VzXG5jb25zdCBhc3NpZ25OdWRnZXMgPSAoKSA9PiB7XG4gIC8vIFJhbmRvbWx5IGFzc2lnbiBudWRnZXNcbiAgY29uc3QgbnVkZ2VSYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBudWRnZUNoYW5jZSArIDEpO1xuXG4gIC8vIElmIHJhbmRvbSBjaGFuY2UgaXMgbWV0IHRoZW4gYXNzaWduIG51ZGdlc1xuICBpZiAobnVkZ2VSYW5kb20gPT09IG51ZGdlQ2hhbmNlKSB7XG4gICAgY2FuTnVkZ2UgPSB0cnVlO1xuICAgIGVuYWJsZU51ZGdlcygpO1xuICAgIG51ZGdlcy5udWRnZXNSZW1haW5pbmcgPSA1O1xuICAgIG51ZGdlcy5yZW5kZXIoKTtcbiAgfSBlbHNlIGlmIChudWRnZXMubnVkZ2VzUmVtYWluaW5nIDwgMSkge1xuICAgIC8vIElmIG5vIG51ZGdlcyBsZWZ0IGluIGJhbmtcbiAgICBjYW5OdWRnZSA9IGZhbHNlO1xuICAgIGRpc2FibGVOdWRnZXMoKTtcbiAgfVxufTtcblxuLy8gUmFuZG9tbHkgYXNzaWduIGhvbGRzXG5jb25zdCBhc3NpZ25Ib2xkcyA9ICgpID0+IHtcbiAgY29uc3QgaG9sZFJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGhvbGRDaGFuY2UgKyAxKTtcblxuICAvLyBSYW5kb21seSBhc3NpZ24gaG9sZHMgKGlmIG5vIG51ZGdlcyBsZWZ0IGluIGJhbmspXG4gIC8vIEFzc2lnbiBob2xkIGlmIHJhbmRvbSBudW1iZXIgbWV0IGFuZCBsYXN0IHNwaW4gd2Fzbid0IGEgd2luXG4gIGlmIChudWRnZXMubnVkZ2VzUmVtYWluaW5nIDwgMSkge1xuICAgIGlmIChob2xkUmFuZG9tID09PSBob2xkQ2hhbmNlKSB7XG4gICAgICAvLyBDYW4gaG9sZFxuICAgICAgY2FuSG9sZCA9IHRydWU7XG4gICAgICBidXR0b25TdHlsZXMoaG9sZEJ1dHRvbkxpc3QsIFwiYWRkXCIsIFwiYWN0aXZlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYW5Ib2xkID0gZmFsc2U7XG4gICAgICBidXR0b25TdHlsZXMoaG9sZEJ1dHRvbkxpc3QsIFwicmVtb3ZlXCIsIFwiYWN0aXZlXCIpO1xuICAgICAgYnV0dG9uU3R5bGVzKGhvbGRCdXR0b25MaXN0LCBcInJlbW92ZVwiLCBcImhlbGRcIik7XG4gICAgfVxuICB9XG59O1xuXG4vLyBFbmFibGUgYWxsIG51ZGdlc1xuY29uc3QgZW5hYmxlTnVkZ2VzID0gKCkgPT4ge1xuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgLy8gSWYgdGhlIHJlZWwgaXNuJ3QgaGVsZFxuICAgIGlmICghcmVlbC5pc0hlbGQpIHtcbiAgICAgIHJlZWwuY2FuTnVkZ2UgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudWRnZUJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBJZiB0aGUgcmVlbCBpc24ndCBoZWxkXG4gICAgaWYgKCFyZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQpIHtcbiAgICAgIG51ZGdlQnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIH1cbiAgfVxuXG4gIG51ZGdlc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xufTtcblxuLy8gRW5iYWxlIGFsbCBob2xkc1xuY29uc3QgZW5hYmxlSG9sZHMgPSAoKSA9PiB7XG4gIHJlZWxzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcbiAgICByZWVsLmNhbkhvbGQgPSB0cnVlO1xuICB9KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGhvbGRCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaG9sZEJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgfVxuXG4gIGNhbmhvbGQgPSB0cnVlO1xufTtcblxuLy8gRGlzYWJsZSBhbGwgbnVkZ2VzXG5jb25zdCBkaXNhYmxlTnVkZ2VzID0gKCkgPT4ge1xuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgcmVlbC5jYW5OdWRnZSA9IGZhbHNlO1xuICB9KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG51ZGdlQnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIG51ZGdlQnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICB9XG5cbiAgbnVkZ2VzLnJlc2V0KCk7XG5cbiAgY2FuTnVkZ2UgPSBmYWxzZTtcblxuICBudWRnZXNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbn07XG5cbi8vIERpc2FibGUgYWxsIGhvbGRzXG5jb25zdCBkaXNhYmxlSG9sZHMgPSAoKSA9PiB7XG4gIHJlZWxzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcbiAgICByZWVsLmNhbkhvbGQgPSBmYWxzZTtcbiAgICByZWVsLmlzSGVsZCA9IGZhbHNlO1xuICAgIGlmIChyZWVsLnJ1blRpbWUgPCAxKSB7XG4gICAgICByZWVsLnJlc2V0UnVudGltZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBob2xkQnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGhvbGRCdXR0b25MaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIiwgXCJoZWxkXCIpO1xuICB9XG5cbiAgY2FuSG9sZCA9IGZhbHNlO1xufTtcblxuLy8gRW5hYmxlIHNwaW5cbmNvbnN0IGVuYWJsZVNwaW4gPSAoKSA9PiB7XG4gIHNwaW5CdXR0b24uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgY2FuU3BpbiA9IHRydWU7XG59O1xuXG4vLyBEaXNiYWxlIHNwaW5cbmNvbnN0IGRpc2FibGVTcGluID0gKCkgPT4ge1xuICBzcGluQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gIGNhblNwaW4gPSBmYWxzZTtcbn07XG5cbmNvbnN0IGRpc2FibGVHYW1lTW9kZSA9ICgpID0+IHtcbiAgc2VsZWN0X2dhbWVNb2RlLmRpc2FibGVkID0gdHJ1ZTtcbiAgc2VsZWN0X2l0ZW1TZWxlY3Rvci5kaXNhYmxlZCA9IHRydWU7XG4gIHNlbGVjdF9yb3dTZWxlY3Rvci5kaXNhYmxlZCA9IHRydWU7XG59O1xuXG5jb25zdCBlbmFibGVHYW1lTW9kZSA9ICgpID0+IHtcbiAgc2VsZWN0X2dhbWVNb2RlLmRpc2FibGVkID0gZmFsc2U7XG4gIHNlbGVjdF9pdGVtU2VsZWN0b3IuZGlzYWJsZWQgPSBmYWxzZTtcbiAgc2VsZWN0X3Jvd1NlbGVjdG9yLmRpc2FibGVkID0gZmFsc2U7XG59O1xuXG4vLyBBZGQgb3IgcmVtb3ZlIGdyb3VwIGJ1dHRvbiBzdHlsZXNcbmNvbnN0IGJ1dHRvblN0eWxlcyA9IChidXR0b25MaXN0LCBhZGRSZW1vdmUsIGNsYXNzTmFtZSkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYWRkUmVtb3ZlID09PSBcImFkZFwiKSB7XG4gICAgICBidXR0b25MaXN0W2ldLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9IGVsc2UgaWYgKGFkZFJlbW92ZSA9PT0gXCJyZW1vdmVcIikge1xuICAgICAgYnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgfVxuICB9XG59O1xuXG4vLyBHYW1lIHN0YXRlXG5jb25zdCBnYW1lU3RhdGVzID0ge1xuICBjdXJyZW50U3RhdGU6IG51bGwsXG4gIHdpbkFtb3VudDogMCxcbiAgb2xkV2luRGlzcGxheTogMCwgLy8gV2hlbiBsb29waW5nIHRocm91Z2ggd2luIGluY3JlbWVudCAtIHRoaXMgaXMgdGhlIG9yaWdpbmFsIGZpZ3VyZVxuICBjdXJyZW50V2luRGlzcGxheTogMCwgLy8gV2hlbiBsb29waW5nIHRocm91Z2ggd2luIGFtb3VudCAtIHRoaXMgaXMgdGhlIG5ldyBmaWd1cmVcblxuICAvLyBSZWd1bGFyIHNwaW5cbiAgc3BpbjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3BpblR5cGUgPSBcInNwaW5cIjtcbiAgICBkaXNhYmxlU3BpbigpO1xuICAgIGRpc2FibGVHYW1lTW9kZSgpO1xuICAgIG1vdmVSZWVscygpO1xuICAgIHJlbmRlcigpO1xuXG4gICAgLy8gRmlsdGVyIHJlZWwgcnVudGltZXMgLSBpZiBvbmUgaXMgYWJvdmUgemVybyB0aGVuIGNhcnJ5IG9uXG4gICAgcmVlbHNSdW5uaW5nID0gcmVlbHMucmVlbExpc3QuZmlsdGVyKChyZWVsKSA9PiB7XG4gICAgICByZXR1cm4gcmVlbC5ydW5UaW1lID4gMDtcbiAgICB9KTtcblxuICAgIGlmICghcmVlbHNSdW5uaW5nLmxlbmd0aCkge1xuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLnNwaW5GaW5pc2hlZDtcbiAgICB9XG4gIH0sXG4gIC8vIFNwaW4gZmluaXNoZWRcbiAgc3BpbkZpbmlzaGVkOiBmdW5jdGlvbiAoY3VycmVudFRpbWUpIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG5cbiAgICBpZiAobnVkZ2VzLm51ZGdlc1JlbWFpbmluZyA8IDEpIHtcbiAgICAgIGRpc2FibGVOdWRnZXMoKTtcbiAgICAgIGlmIChzcGluVHlwZSAhPT0gXCJudWRnZVwiKSB7XG4gICAgICAgIGRpc2FibGVIb2xkcygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciB3aW5cbiAgICBjb25zdCB3aW4gPSBjaGVja1dpbigpO1xuXG4gICAgLy8gV2luXG4gICAgaWYgKHdpbikge1xuICAgICAgLy8gUmVzZXQgbnVkZ2VzXG4gICAgICBudWRnZXMucmVzZXQoKTtcbiAgICAgIGNhbk51ZGdlID0gZmFsc2U7XG4gICAgICBkaXNhYmxlTnVkZ2VzKCk7XG4gICAgICBkaXNhYmxlSG9sZHMoKTtcbiAgICAgIGRpc2FibGVTcGluKCk7XG4gICAgICBkaXNhYmxlR2FtZU1vZGUoKTtcblxuICAgICAgbm93ID0gY3VycmVudFRpbWU7XG4gICAgICB0aGlzLndpbkFtb3VudCA9IHdpbjtcblxuICAgICAgcmVuZGVyKCk7XG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMud2luOyAvLyBTd2l0Y2ggdG8gd2luIGFuaW1hdGlvbiBzdGF0ZVxuICAgICAgZ2FtZUxvb3AgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgfVxuICAgIC8vIE5vIHdpblxuICAgIGVsc2Uge1xuICAgICAgaWYgKFxuICAgICAgICBudWRnZXMubnVkZ2VzUmVtYWluaW5nIDwgMSAmJlxuICAgICAgICBzcGluVHlwZSAhPT0gXCJudWRnZVwiICYmXG4gICAgICAgIGNyZWRpdHMuY3JlZGl0c1JlbWFpbmluZyA+IDBcbiAgICAgICkge1xuICAgICAgICAvLyBJZiBubyB3aW5uaW5nIGxpbmUgdGhlbiBhc3NpZ24gaG9sZHMgYW5kIG51ZGdlc1xuICAgICAgICBhc3NpZ25Ib2xkcygpO1xuICAgICAgICBhc3NpZ25OdWRnZXMoKTtcbiAgICAgIH1cblxuICAgICAgLy8gRW5hYmxlIHNwaW5cbiAgICAgIGVuYWJsZVNwaW4oKTtcbiAgICAgIGVuYWJsZUdhbWVNb2RlKCk7XG5cbiAgICAgIC8vIENoZWNrIGNyZWRpdHNcbiAgICAgIGlmIChjcmVkaXRzLmNyZWRpdHNSZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLmdhbWVPdmVyO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgLy8gTnVkZ2VcbiAgbnVkZ2U6IGZ1bmN0aW9uIChjdXJyZW50VGltZSkge1xuICAgIGxldCBpc051ZGdpbmcgPSBbXTtcbiAgICAvLyBJZiBudWRnaW5nIHN0b3BwZWQsIHRoZW4gY2hhbmdlIGdhbWVzdGF0ZSB0byBzcGluZmluaXNoZWRcbiAgICBpc051ZGdpbmcgPSByZWVscy5yZWVsTGlzdC5maWx0ZXIoKHJlZWwpID0+IHtcbiAgICAgIHJldHVybiByZWVsLmlzTnVkZ2luZyA9PT0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIGlmICghaXNOdWRnaW5nLmxlbmd0aCkge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuICAgICAgdGhpcy5zcGluRmluaXNoZWQoY3VycmVudFRpbWUpO1xuICAgIH1cblxuICAgIGlzTnVkZ2luZy5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgICByZWVsLm51ZGdlKCk7XG4gICAgICByZW5kZXIoKTtcbiAgICB9KTtcbiAgfSxcbiAgLy8gV2luIGFuaW1hdGlvblxuICB3aW46IGZ1bmN0aW9uIChjdXJyZW50VGltZSkge1xuICAgIGlmICh3aW5uaW5nUm93cy5pbmNsdWRlcyhcInRvcFwiKSlcbiAgICAgIHdpbkluZGljYXRvclRvcExpbmUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICBpZiAod2lubmluZ1Jvd3MuaW5jbHVkZXMoXCJtaWRkbGVcIikpXG4gICAgICB3aW5JbmRpY2F0b3JDZW50cmVMaW5lLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgaWYgKHdpbm5pbmdSb3dzLmluY2x1ZGVzKFwiYm90dG9tXCIpKVxuICAgICAgd2luSW5kaWNhdG9yQm90dG9tTGluZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIHdpbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuXG4gICAgZGlzYWJsZVNwaW4oKTtcbiAgICBkaXNhYmxlR2FtZU1vZGUoKTtcbiAgICBkaXNhYmxlSG9sZHMoKTtcblxuICAgIGlmIChjdXJyZW50VGltZSAtIG5vdyA+IDEpIHtcbiAgICAgIG5vdyA9IGN1cnJlbnRUaW1lO1xuICAgICAgbGV0IHNraXAgPSB0aGlzLndpbkFtb3VudCA+IDUwMCA/IDEwIDogMTtcbiAgICAgIHRoaXMuY3VycmVudFdpbkRpc3BsYXkgKz0gc2tpcDtcbiAgICAgIHdpbi5jdXJyZW50V2luID0gdGhpcy53aW5BbW91bnQ7XG4gICAgICB3aW4ucmVuZGVyKCk7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRXaW5EaXNwbGF5IC0gdGhpcy5vbGRXaW5EaXNwbGF5ID49IHRoaXMud2luQW1vdW50KSB7XG4gICAgICAgIC8vIEZpbmlzaGVkIGxvb3BpbmdcbiAgICAgICAgY3JlZGl0cy5hZGRDcmVkaXQodGhpcy53aW5BbW91bnQpO1xuICAgICAgICBjcmVkaXRzLnJlbmRlcigpO1xuICAgICAgICB0aGlzLm9sZFdpbkRpc3BsYXkgPSB0aGlzLmN1cnJlbnRXaW5EaXNwbGF5O1xuICAgICAgICB3aW4ucmVzZXQoKTtcbiAgICAgICAgd2luLnJlbmRlcigpO1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG4gICAgICAgIGVuYWJsZVNwaW4oKTtcbiAgICAgICAgZW5hYmxlR2FtZU1vZGUoKTtcbiAgICAgICAgd2luQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIHZpZXdwb3J0Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIHdpbkluZGljYXRvckxlZnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgd2luSW5kaWNhdG9yUmlnaHQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgd2luSW5kaWNhdG9yVG9wTGluZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICB3aW5JbmRpY2F0b3JDZW50cmVMaW5lLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIHdpbkluZGljYXRvckJvdHRvbUxpbmUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcblxuICAgICAgICAvLyBDaGVjayBjcmVkaXRzXG4gICAgICAgIGlmIChjcmVkaXRzLmNyZWRpdHNSZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuZ2FtZU92ZXI7XG4gICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgLy8gR2FtZSBvdmVyIC0gY3JlZGl0cyByYW4gb3V0XG4gIGdhbWVPdmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuICAgIGRpc2FibGVTcGluKCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocGxheVNlY3Rpb24pO1xuXG4gICAgICBkaXNhYmxlTnVkZ2VzKCk7XG4gICAgICBkaXNhYmxlSG9sZHMoKTtcblxuICAgICAgcmVuZGVyR2FtZU92ZXJTZWN0aW9uKCk7XG5cbiAgICAgIHRoaXMud2luQW1vdW50ID0gMDtcbiAgICAgIHRoaXMub2xkV2luRGlzcGxheSA9IDA7XG4gICAgICB0aGlzLmN1cnJlbnRXaW5EaXNwbGF5ID0gMDtcbiAgICB9LCAxMDAwKTtcbiAgfSxcbn07XG5cbmNvbnN0IHJlbmRlckdhbWVPdmVyU2VjdGlvbiA9ICgpID0+IHtcbiAgY29uc3QgZ2FtZU92ZXJTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZ2FtZU92ZXJTZWN0aW9uLmlkID0gXCJnYW1lT3ZlclNlY3Rpb25cIjtcblxuICBnYW1lT3ZlclNlY3Rpb24uaW5uZXJIVE1MID0gXCI8ZGl2PlwiO1xuICBnYW1lT3ZlclNlY3Rpb24uaW5uZXJIVE1MICs9IFwiPHA+R2FtZSBvdmVyPC9wPlwiO1xuICBnYW1lT3ZlclNlY3Rpb24uaW5uZXJIVE1MICs9IFwiPHA+WW91IHdvbiBcIiArIHdpbi5jdXJyZW50V2luICsgXCIgY3JlZGl0c1wiO1xuICBnYW1lT3ZlclNlY3Rpb24uaW5uZXJIVE1MICs9IFwiPHA+UHJlc3Mgc3RhcnQgdG8gcGxheSBhZ2FpbjwvcD5cIjtcbiAgZ2FtZU92ZXJTZWN0aW9uLmlubmVySFRNTCArPSBcIjwvZGl2PlwiO1xuXG4gIGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgc3RhcnRCdXR0b24uaWQgPSBcInN0YXJ0QnV0dG9uXCI7XG4gIHN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidXR0b25cIik7XG4gIHN0YXJ0QnV0dG9uLmlubmVyVGV4dCA9IFwiU1RBUlRcIjtcblxuICBnYW1lT3ZlclNlY3Rpb24uYXBwZW5kQ2hpbGQoc3RhcnRCdXR0b24pO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZ2FtZU92ZXJTZWN0aW9uKTtcblxuICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZ2FtZU92ZXJTZWN0aW9uKTtcblxuICAgIHBsYXlTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwbGF5U2VjdGlvbi5pZCA9IFwicGxheVNlY3Rpb25cIjtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBsYXlTZWN0aW9uKTtcblxuICAgIGluaXQoKTtcbiAgfSk7XG59O1xuXG4vLyBQcmVsb2FkIGltYWdlcyB0aGVuIHN0YXJ0IGdhbWVcbnZhciBsb2FkZWQgPSAwO1xudmFyIGltYWdlTGlzdCA9IFtdO1xubGV0IGltZztcblxuSVRFTV9JTkZPLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgaW1nID0gbmV3IEltYWdlKCk7XG4gIGltZy5zcmMgPSBcIi4vaW1nL1wiICsgaXRlbS5pbWFnZVNyYztcbiAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICBsb2FkZWQrKztcbiAgICBpZiAobG9hZGVkID09PSBJVEVNX0lORk8ubGVuZ3RoKSBpbml0KCk7XG4gIH07XG59KTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=