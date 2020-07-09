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

  spinButton.addEventListener("click", function () {
    if (canSpin) {
      credits.useCredit();
      credits.render();
      winningRows = [];
      disableNudges();
      disableSpin();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9jcmVkaXRzLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvZGlnaXRzLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvaG9sZEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2hvbGRCdXR0b25zLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvbnVkZ2VCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9udWRnZUJ1dHRvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9udWRnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9yZWVsLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvcmVlbEl0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9yZWVscy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL3ZpZXdwb3J0LmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvd2luLmpzIiwid2VicGFjazovLy8uL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2Nzcy9hcHAuc2Nzcz9jZWI2Il0sIm5hbWVzIjpbImNyZWRpdHMiLCJjcmVkaXRzUmVtYWluaW5nIiwiQ1JFRElUUyIsImRpZ2l0cyIsImNvbnRhaW5lciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRDcmVkaXQiLCJhbW91bnQiLCJ1c2VDcmVkaXQiLCJyZXNldCIsInJlbmRlciIsImRpZ2l0c1N0cmluZyIsInRvU3RyaW5nIiwiZGlnaXRDb250YWluZXJzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImRpZ2l0SW5kZXgiLCJpIiwibGVuZ3RoIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiaW5uZXJIVE1MIiwiYWRkIiwiaG9sZEJ1dHRvbiIsImluZGV4IiwicmVlbE5vIiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwid2lkdGgiLCJCVVRUT05fV0lEVEgiLCJtYXJnaW5MZWZ0IiwiUkVFTF9TUEFDSU5HIiwiUkVFTF9XSURUSCIsIm1hcmdpblJpZ2h0IiwiYXBwZW5kQ2hpbGQiLCJob2xkQnV0dG9ucyIsIm5ld0J1dHRvbiIsImJ1dHRvbkxpc3QiLCJidWlsZCIsIk5PX1JFRUxTIiwicHVzaCIsImZvckVhY2giLCJidG4iLCJudWRnZUJ1dHRvbiIsIm51ZGdlQnV0dG9uQ29udGFpbmVyIiwibnVkZ2VCdXR0b25zIiwibnVkZ2VzIiwibnVkZ2VzUmVtYWluaW5nIiwibW92ZUFycmF5SXRlbVRvTmV3SW5kZXgiLCJhcnIiLCJvbGRfaW5kZXgiLCJuZXdfaW5kZXgiLCJrIiwidW5kZWZpbmVkIiwic3BsaWNlIiwiY29uc29sZSIsImxvZyIsInJlZWwiLCJmaXJzdEl0ZW0iLCJsYXN0SXRlbSIsIm51ZGdlQ2FsbFRpbWVzIiwiU0VMRUNUX0dBTUVfTU9ERSIsIlNFTEVDVF9JVEVNX1NFTEVDVE9SIiwiU0VMRUNUX1JPV19TRUxFQ1RPUiIsIm5vT2ZJdGVtcyIsIk5PX0lURU1TIiwiaXRlbUxpc3QiLCJJVEVNX0xJU1QiLCJyZWVsU3BlZWQiLCJSRUVMX1NQRUVEIiwibnVkZ2VTcGVlZCIsInJ1blRpbWUiLCJjYW5Ib2xkIiwiaXNIZWxkIiwiY2FuTnVkZ2UiLCJpc051ZGdpbmciLCJudWRnZUZyYW1lcyIsIklURU1fSEVJR0hUIiwiTlVER0VfU1BFRUQiLCJudWRnZUZyYW1lIiwicmVlbEl0ZW1zIiwiaXRlbU5vIiwidHlwZSIsImluc3RhbmNlcyIsImltYWdlU3JjIiwid2luQW1vdW50IiwieCIsInkiLCJuZXdSZWVsSXRlbSIsIklURU1fSU5GTyIsIml0ZW0iLCJWSUVXUE9SVF9YIiwiVklFV1BPUlRfWSIsImltZyIsIkltYWdlIiwic3JjIiwic2h1ZmZsZSIsInJlc2V0Q29vcmRzIiwicm5kIiwidGVtcCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIm51ZGdlIiwic2hpZnQiLCJWSUVXUE9SVF9IRUlHSFQiLCJyZXNldFJ1bnRpbWUiLCJtb3ZlIiwicmVlbEl0ZW0iLCJ2YWx1ZSIsInByZXZJbmRleCIsImZpbmRJbmRleCIsInBhcnNlSW50IiwibWFwUm93VG9TdHJpbmciLCJ0b3AiLCJtaWRkbGUiLCJib3R0b20iLCJuZXh0SW5kZXgiLCJzcGVlZCIsImN0eCIsImdldENvbnRleHQiLCJkcmF3SW1hZ2UiLCJJVEVNX1dJRFRIIiwicmVlbHMiLCJuZXdSZWVsIiwicmVlbExpc3QiLCJyZXNldFJ1bnRpbWVzIiwidmlld3BvcnQiLCJuZXdWaWV3cG9ydCIsIlZJRVdQT1JUX1dJRFRIIiwiaGVpZ2h0IiwiaWQiLCJ2aWV3cG9ydENvbnRhaW5lciIsImNsZWFyIiwiY2xlYXJSZWN0Iiwid2luIiwiY3VycmVudFdpbiIsImFkZFdpbiIsIndpbkNvbnRhaW5lciIsIm51ZGdlc0NvbnRhaW5lciIsInBsYXlTZWN0aW9uIiwic2VsZWN0X2dhbWVNb2RlIiwiZGl2X2ZpeGVkTW9kZU9wdGlvbnMiLCJob2xkQnV0dG9uQ29udGFpbmVyIiwid2luSW5kaWNhdG9yTGVmdCIsIndpbkluZGljYXRvclJpZ2h0Iiwid2luSW5kaWNhdG9yVG9wTGluZSIsIndpbkluZGljYXRvckNlbnRyZUxpbmUiLCJ3aW5JbmRpY2F0b3JCb3R0b21MaW5lIiwic3BpbkJ1dHRvbiIsIm51ZGdlQnV0dG9uTGlzdCIsImhvbGRCdXR0b25MaXN0Iiwid2lubmluZ1Jvd3MiLCJnYW1lTG9vcCIsIm51ZGdlQ2hhbmNlIiwiaG9sZENoYW5jZSIsImNhblNwaW4iLCJub3ciLCJyZWVsc1J1bm5pbmciLCJzcGluVHlwZSIsImluaXQiLCJyZW5kZXJWaWV3cG9ydENvbnRhaW5lciIsInJlZWxDb250YWluZXIiLCJyZWVsQ29udGFpbmVyWCIsInJlZWxDb250YWluZXJZIiwicmVlbENvbnRhaW5lclciLCJyZWVsQ29udGFpbmVySCIsIlZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1giLCJSRUVMX0NPTlRBSU5FUl9QQURESU5HIiwiVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWSIsInBvc2l0aW9uIiwibGVmdCIsInJlbmRlcldpbkluZGljYXRvcnMiLCJyZW5kZXJOdWRnZUJ1dHRvbkNvbnRhaW5lciIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJsb29wIiwiZ2FtZVN0YXRlcyIsImN1cnJlbnRTdGF0ZSIsInJlbmRlckhvbGRCdXR0b25Db250YWluZXIiLCJldmVudCIsInRhcmdldCIsInJlbmRlclNwaW5CdXR0b24iLCJlbmFibGVTcGluIiwiZGlzYWJsZU51ZGdlcyIsImRpc2FibGVTcGluIiwic3BpbiIsImVsZW1lbnQiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwib2Zmc2V0V2lkdGgiLCJjdXJyZW50VGltZSIsIm1vdmVSZWVscyIsImNoZWNrV2luIiwic3BpblJlc3VsdCIsInJlZWxSZXN1bHQiLCJyZXN1bHQiLCJnZXRBbGxSb3dSZXN1bHRzIiwiY3VycmVudFdpbkFtb3VudCIsIndpbm5pbmdDYXNlIiwiY2hlcnJ5IiwidmFsaWRhdGUiLCJ0ZXN0IiwiY2hlcnJ5T3I3IiwiYW55QmFyIiwicm93IiwiYXNzaWduTnVkZ2VzIiwibnVkZ2VSYW5kb20iLCJlbmFibGVOdWRnZXMiLCJhc3NpZ25Ib2xkcyIsImhvbGRSYW5kb20iLCJidXR0b25TdHlsZXMiLCJlbmFibGVIb2xkcyIsImNhbmhvbGQiLCJkaXNhYmxlSG9sZHMiLCJhZGRSZW1vdmUiLCJjbGFzc05hbWUiLCJvbGRXaW5EaXNwbGF5IiwiY3VycmVudFdpbkRpc3BsYXkiLCJmaWx0ZXIiLCJzcGluRmluaXNoZWQiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImdhbWVPdmVyIiwiaW5jbHVkZXMiLCJza2lwIiwic2V0VGltZW91dCIsImJvZHkiLCJyZW1vdmVDaGlsZCIsInJlbmRlckdhbWVPdmVyU2VjdGlvbiIsImdhbWVPdmVyU2VjdGlvbiIsInN0YXJ0QnV0dG9uIiwiaW5uZXJUZXh0IiwibG9hZGVkIiwiaW1hZ2VMaXN0Iiwib25sb2FkIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhOzs7Ozs7QUFFYjs7Ozs7O0FBRUEsSUFBTUEsVUFBVSxTQUFWQSxPQUFVLEdBQU07QUFDcEIsU0FBTztBQUNMQyxzQkFBa0JDLE9BRGI7QUFFTEMsWUFBUSx1QkFGSDtBQUdMQyxlQUFXQyxTQUFTQyxjQUFULENBQXdCLFNBQXhCLENBSE47QUFJTEMsZUFBVyxtQkFBVUMsTUFBVixFQUFrQjtBQUMzQixXQUFLUCxnQkFBTCxJQUF5Qk8sTUFBekI7QUFDRCxLQU5JO0FBT0xDLGVBQVcscUJBQVk7QUFDckIsV0FBS1IsZ0JBQUw7QUFDRCxLQVRJO0FBVUxTLFdBQU8saUJBQVk7QUFDakIsV0FBS1QsZ0JBQUwsR0FBd0JDLE9BQXhCO0FBQ0QsS0FaSTtBQWFMUyxZQUFRLGtCQUFZO0FB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Ozs7Ozs7Ozs7OztBQ3B3QkEsdUMiLCJmaWxlIjoiLi9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2pzL21haW4uanNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGRpZ2l0cyBmcm9tIFwiLi9kaWdpdHNcIjtcblxuY29uc3QgY3JlZGl0cyA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBjcmVkaXRzUmVtYWluaW5nOiBDUkVESVRTLFxuICAgIGRpZ2l0czogZGlnaXRzKCksXG4gICAgY29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNyZWRpdHNcIiksXG4gICAgYWRkQ3JlZGl0OiBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICB0aGlzLmNyZWRpdHNSZW1haW5pbmcgKz0gYW1vdW50O1xuICAgIH0sXG4gICAgdXNlQ3JlZGl0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmNyZWRpdHNSZW1haW5pbmctLTtcbiAgICB9LFxuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmNyZWRpdHNSZW1haW5pbmcgPSBDUkVESVRTO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmRpZ2l0cy5kaWdpdHNTdHJpbmcgPSB0aGlzLmNyZWRpdHNSZW1haW5pbmcudG9TdHJpbmcoKTtcbiAgICAgIHRoaXMuZGlnaXRzLmNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgdGhpcy5kaWdpdHMucmVuZGVyKCk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWRpdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGRpZ2l0cyA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBkaWdpdHNTdHJpbmc6IG51bGwsXG4gICAgICAgIGNvbnRhaW5lcjogbnVsbCwgLy8gQ29udGFpbmVyIHRoYXQgaG9sZHMgZGlnaXRDb250YWluZXJzXG4gICAgICAgIGRpZ2l0Q29udGFpbmVyczogbnVsbCwgLy8gTGlzdCBvZiBkaWdpdCBjb250YWluZXJzIHRoYXQgaG9sZCBzaW5nbGUgZGlnaXQgZWFjaFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIC8vIFNwbGl0IG51bWJlciBpbnRvIHNlcGVyYXRlIGNoYXJhY3RlcnNcbiAgICAgICAgICAgIHRoaXMuZGlnaXRDb250YWluZXJzID0gdGhpcy5jb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGlnaXQtbnVtYmVyJyk7IFxuICAgICAgICAgICAgbGV0IGRpZ2l0SW5kZXg7IC8vIFdoaWNoIGRpZ2l0IGNvbnRhaW5lciB0byBwdXQgbnVtYmVyIGluXG5cbiAgICAgICAgICAgIC8vIFdpcGUgdGhlIGRpZ2l0c1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRpZ2l0Q29udGFpbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlnaXRDb250YWluZXJzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlnaXRDb250YWluZXJzW2ldLmlubmVySFRNTCA9ICc4JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUG9wdWxhdGUgdGhlIGRpZ2l0c1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRpZ2l0c1N0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGRpZ2l0SW5kZXggPSAodGhpcy5kaWdpdENvbnRhaW5lcnMubGVuZ3RoKSAtICh0aGlzLmRpZ2l0c1N0cmluZy5sZW5ndGggLSBpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpZ2l0Q29udGFpbmVyc1tkaWdpdEluZGV4XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpZ2l0Q29udGFpbmVyc1tkaWdpdEluZGV4XS5pbm5lckhUTUwgPSB0aGlzLmRpZ2l0c1N0cmluZ1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBkaWdpdHM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBob2xkQnV0dG9uID0gKGluZGV4KSA9PiB7XG4gICAgbGV0IGhvbGRCdXR0b247XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob2xkQnV0dG9ucycpLFxuICAgICAgICByZWVsTm86IGluZGV4LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGhvbGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGhvbGRCdXR0b24uaW5uZXJIVE1MID0gJ0hPTEQnO1xuICAgICAgICAgICAgaG9sZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdob2xkLWJ1dHRvbicsICdidXR0b24nKTtcbiAgICAgICAgICAgIGhvbGRCdXR0b24uc3R5bGUud2lkdGggPSBCVVRUT05fV0lEVEggKyAncHgnO1xuICAgICAgICAgICAgaG9sZEJ1dHRvbi5zdHlsZS5tYXJnaW5MZWZ0ID0gKFJFRUxfU1BBQ0lORyAvIDIpICsgKChSRUVMX1dJRFRIIC0gQlVUVE9OX1dJRFRIKSAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIGhvbGRCdXR0b24uc3R5bGUubWFyZ2luUmlnaHQgPSAoUkVFTF9TUEFDSU5HIC8gMikgKyAoKFJFRUxfV0lEVEggLSBCVVRUT05fV0lEVEgpIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoaG9sZEJ1dHRvbik7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaG9sZEJ1dHRvbjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBob2xkQnV0dG9uIGZyb20gJy4vaG9sZEJ1dHRvbic7XG5cbmNvbnN0IGhvbGRCdXR0b25zID0gKCkgPT4ge1xuICAgIGxldCBuZXdCdXR0b247XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBidXR0b25MaXN0OiBbXSxcbiAgICAgICAgYnVpbGQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTk9fUkVFTFM7IGkrKykge1xuICAgICAgICAgICAgICAgIG5ld0J1dHRvbiA9IGhvbGRCdXR0b24oaSk7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25MaXN0LnB1c2gobmV3QnV0dG9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbkxpc3QuZm9yRWFjaCgoYnRuLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGJ0bi5yZW5kZXIoaW5kZXgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaG9sZEJ1dHRvbnM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBudWRnZUJ1dHRvbiA9IChpbmRleCkgPT4ge1xuICAgIGxldCBudWRnZUJ1dHRvbjtcbiAgICBsZXQgbnVkZ2VCdXR0b25Db250YWluZXI7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdudWRnZUJ1dHRvbnMnKSxcbiAgICAgICAgcmVlbE5vOiBpbmRleCxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBudWRnZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgbnVkZ2VCdXR0b24uaW5uZXJIVE1MID0gJ05VREdFJztcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ251ZGdlLWJ1dHRvbicsICdidXR0b24nKTtcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uLnN0eWxlLndpZHRoID0gQlVUVE9OX1dJRFRIICsgJ3B4JztcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uLnN0eWxlLm1hcmdpbkxlZnQgPSAoUkVFTF9TUEFDSU5HIC8gMikgKyAoKFJFRUxfV0lEVEggLSBCVVRUT05fV0lEVEgpIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgbnVkZ2VCdXR0b24uc3R5bGUubWFyZ2luUmlnaHQgPSAoUkVFTF9TUEFDSU5HIC8gMikgKyAoKFJFRUxfV0lEVEggLSBCVVRUT05fV0lEVEgpIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQobnVkZ2VCdXR0b24pO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG51ZGdlQnV0dG9uOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IG51ZGdlQnV0dG9uIGZyb20gJy4vbnVkZ2VCdXR0b24nO1xuXG5jb25zdCBudWRnZUJ1dHRvbnMgPSAoKSA9PiB7XG4gICAgbGV0IG5ld0J1dHRvbjtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGJ1dHRvbkxpc3Q6IFtdLFxuICAgICAgICBidWlsZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5PX1JFRUxTOyBpKyspIHtcbiAgICAgICAgICAgICAgICBuZXdCdXR0b24gPSBudWRnZUJ1dHRvbihpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbkxpc3QucHVzaChuZXdCdXR0b24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5idXR0b25MaXN0LmZvckVhY2goKGJ0biwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBidG4ucmVuZGVyKGluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG51ZGdlQnV0dG9uczsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBkaWdpdHMgZnJvbSAnLi9kaWdpdHMnO1xuXG5jb25zdCBudWRnZXMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbnVkZ2VzUmVtYWluaW5nOiAwLFxuICAgICAgICBkaWdpdHM6IGRpZ2l0cygpLFxuICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdudWRnZXMnKSxcbiAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5udWRnZXNSZW1haW5pbmcgPSAwO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLmRpZ2l0c1N0cmluZyA9IHRoaXMubnVkZ2VzUmVtYWluaW5nLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmRpZ2l0cy5jb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG51ZGdlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHJlZWxJdGVtIGZyb20gXCIuL3JlZWxJdGVtXCI7XG5cbmNvbnN0IG1vdmVBcnJheUl0ZW1Ub05ld0luZGV4ID0gKGFyciwgb2xkX2luZGV4LCBuZXdfaW5kZXgpID0+IHtcbiAgd2hpbGUgKG9sZF9pbmRleCA8IDApIHtcbiAgICBvbGRfaW5kZXggKz0gYXJyLmxlbmd0aDtcbiAgfVxuICB3aGlsZSAobmV3X2luZGV4IDwgMCkge1xuICAgIG5ld19pbmRleCArPSBhcnIubGVuZ3RoO1xuICB9XG4gIGlmIChuZXdfaW5kZXggPj0gYXJyLmxlbmd0aCkge1xuICAgIHZhciBrID0gbmV3X2luZGV4IC0gYXJyLmxlbmd0aCArIDE7XG4gICAgd2hpbGUgKGstLSkge1xuICAgICAgYXJyLnB1c2godW5kZWZpbmVkKTtcbiAgICB9XG4gIH1cbiAgYXJyLnNwbGljZShuZXdfaW5kZXgsIDAsIGFyci5zcGxpY2Uob2xkX2luZGV4LCAxKVswXSk7XG4gIGNvbnNvbGUubG9nKFwiTkVXIEFSUlwiLCBhcnIpO1xufTtcblxuY29uc3QgcmVlbCA9IChyZWVsTm8pID0+IHtcbiAgbGV0IGZpcnN0SXRlbTtcbiAgbGV0IGxhc3RJdGVtO1xuICBsZXQgbnVkZ2VDYWxsVGltZXM7XG5cbiAgY29uc3QgU0VMRUNUX0dBTUVfTU9ERSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZS1tb2RlXCIpO1xuICBjb25zdCBTRUxFQ1RfSVRFTV9TRUxFQ1RPUiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXRlbS1zZWxlY3RvclwiKTtcbiAgY29uc3QgU0VMRUNUX1JPV19TRUxFQ1RPUiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm93LXNlbGVjdG9yXCIpO1xuXG4gIHJldHVybiB7XG4gICAgbm9PZkl0ZW1zOiBOT19JVEVNUyxcbiAgICBpdGVtTGlzdDogSVRFTV9MSVNULFxuICAgIHJlZWxTcGVlZDogUkVFTF9TUEVFRCxcbiAgICBudWRnZVNwZWVkOiAxMCxcbiAgICBydW5UaW1lOiBSRUVMX1NQRUVEICogMTAgKyAyMCAqIHJlZWxObywgLy8gQXJiaXRyYXJ5IHZhbHVlcyBmb3IgdGVzdGluZ1xuICAgIGNhbkhvbGQ6IGZhbHNlLFxuICAgIGlzSGVsZDogZmFsc2UsXG4gICAgY2FuTnVkZ2U6IGZhbHNlLFxuICAgIGlzTnVkZ2luZzogZmFsc2UsXG4gICAgbnVkZ2VGcmFtZXM6IElURU1fSEVJR0hUIC8gTlVER0VfU1BFRUQsXG4gICAgbnVkZ2VGcmFtZTogMCxcbiAgICByZWVsSXRlbXM6IFtdLFxuICAgIHJlZWxObyxcbiAgICBidWlsZDogZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGl0ZW1ObyA9IDA7XG4gICAgICBsZXQgdHlwZTtcbiAgICAgIGxldCBpbnN0YW5jZXM7XG4gICAgICBsZXQgaW1hZ2VTcmM7XG4gICAgICBsZXQgd2luQW1vdW50O1xuICAgICAgbGV0IHg7XG4gICAgICBsZXQgeTtcbiAgICAgIGxldCBuZXdSZWVsSXRlbTtcblxuICAgICAgSVRFTV9JTkZPLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIHR5cGUgPSBpdGVtLnR5cGU7XG4gICAgICAgIGluc3RhbmNlcyA9IGl0ZW0uaW5zdGFuY2VzO1xuICAgICAgICBpbWFnZVNyYyA9IGl0ZW0uaW1hZ2VTcmM7XG4gICAgICAgIHdpbkFtb3VudCA9IGl0ZW0ud2luQW1vdW50O1xuXG4gICAgICAgIC8vIEFkZCByZXF1aXJlZCBubyBvZiBpbnN0YW5jZXMgb2YgdGhpcyBpdGVtIHRvIHRoZSByZWVsSXRlbXMgYXJyYXlcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnN0YW5jZXM7IGkrKykge1xuICAgICAgICAgIHggPVxuICAgICAgICAgICAgVklFV1BPUlRfWCArIHRoaXMucmVlbE5vICogUkVFTF9XSURUSCArIHRoaXMucmVlbE5vICogUkVFTF9TUEFDSU5HO1xuXG4gICAgICAgICAgeSA9IFZJRVdQT1JUX1kgLSBJVEVNX0hFSUdIVCAtIElURU1fSEVJR0hUICogaXRlbU5vIC0gMTAwO1xuXG4gICAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgaW1nLnNyYyA9IFwiLi9pbWcvXCIgKyBpdGVtLmltYWdlU3JjO1xuXG4gICAgICAgICAgbmV3UmVlbEl0ZW0gPSByZWVsSXRlbSh0eXBlLCBpdGVtTm8sIGltZywgeCwgeSwgd2luQW1vdW50KTtcbiAgICAgICAgICB0aGlzLnJlZWxJdGVtcy5wdXNoKG5ld1JlZWxJdGVtKTtcbiAgICAgICAgICBpdGVtTm8rKztcbiAgICAgICAgICAvLyB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNodWZmbGUoKTtcbiAgICAgIHRoaXMucmVzZXRDb29yZHMoKTtcbiAgICB9LFxuICAgIHNodWZmbGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBybmQ7XG4gICAgICBsZXQgdGVtcDtcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLnJlZWxJdGVtcy5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIHJuZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgICB0ZW1wID0gdGhpcy5yZWVsSXRlbXNbaV07XG4gICAgICAgIHRoaXMucmVlbEl0ZW1zW2ldID0gdGhpcy5yZWVsSXRlbXNbcm5kXTtcbiAgICAgICAgdGhpcy5yZWVsSXRlbXNbcm5kXSA9IHRlbXA7XG4gICAgICB9XG4gICAgfSxcbiAgICBudWRnZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5yZWVsSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLm51ZGdlKCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zaGlmdCgpO1xuXG4gICAgICB0aGlzLm51ZGdlRnJhbWUrKztcblxuICAgICAgaWYgKHRoaXMubnVkZ2VGcmFtZSA+PSB0aGlzLm51ZGdlRnJhbWVzKSB7XG4gICAgICAgIHRoaXMuaXNOdWRnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubnVkZ2VGcmFtZSA9IDA7XG4gICAgICB9XG4gICAgfSxcbiAgICByZXNldENvb3JkczogZnVuY3Rpb24gKCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJlZWxJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnJlZWxJdGVtc1tpXS55ID1cbiAgICAgICAgICBWSUVXUE9SVF9ZICsgVklFV1BPUlRfSEVJR0hUIC0gSVRFTV9IRUlHSFQgLSBJVEVNX0hFSUdIVCAqIGk7XG4gICAgICB9XG4gICAgfSxcbiAgICByZXNldFJ1bnRpbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghdGhpcy5pc0hlbGQpIHtcbiAgICAgICAgdGhpcy5ydW5UaW1lID0gUkVFTF9TUEVFRCAqIDEwICsgMjAgKiByZWVsTm87IC8vIEFyYml0cmFyeSB2YWx1ZXMgZm9yIHRlc3Rpbmc7XG4gICAgICB9XG4gICAgfSxcbiAgICBzaGlmdDogZnVuY3Rpb24gKCkge1xuICAgICAgLy8gSWYgYm90dG9tIHJlZWwgaXRlbSBnZXRzIGJlbG93IGJvdHRvbSBvZiB2aWV3cG9ydCB0aGVuIG1vdmUgaXQgdG8gYmVnaW5uaW5nIG9mIGFycmF5XG4gICAgICBpZiAodGhpcy5yZWVsSXRlbXNbMF0ueSA+PSBWSUVXUE9SVF9ZICsgVklFV1BPUlRfSEVJR0hUKSB7XG4gICAgICAgIGZpcnN0SXRlbSA9IHRoaXMucmVlbEl0ZW1zWzBdO1xuICAgICAgICBsYXN0SXRlbSA9IHRoaXMucmVlbEl0ZW1zW3RoaXMucmVlbEl0ZW1zLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIC8vIFJlc3QgeSBjb29yZHMgZm9yIGl0ZW0gdG8gc2hpZnQgdG8gdG9wIG9mIHJlZWxcbiAgICAgICAgZmlyc3RJdGVtLnkgPSBsYXN0SXRlbS55IC0gSVRFTV9IRUlHSFQ7XG5cbiAgICAgICAgLy8gU2hpZnQgYm90dG9tIGl0ZW0gdG8gdG9wXG4gICAgICAgIHRoaXMucmVlbEl0ZW1zLnB1c2godGhpcy5yZWVsSXRlbXMuc2hpZnQoKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnJlZWxJdGVtcy5mb3JFYWNoKChyZWVsSXRlbSkgPT4ge1xuICAgICAgICByZWVsSXRlbS5tb3ZlKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2hpZnQoKTtcbiAgICAgIC8vIFJlZHVjZSByZWVsIHJ1bnRpbWVcbiAgICAgIHRoaXMucnVuVGltZS0tO1xuICAgICAgaWYgKFNFTEVDVF9HQU1FX01PREUudmFsdWUgPT09IFwiZml4ZWRcIiAmJiB0aGlzLnJ1blRpbWUgPT09IDApIHtcbiAgICAgICAgbGV0IHByZXZJbmRleCA9IHRoaXMucmVlbEl0ZW1zLmZpbmRJbmRleChcbiAgICAgICAgICAoaXRlbSkgPT5cbiAgICAgICAgICAgIHBhcnNlSW50KGl0ZW0uaXRlbU5vKSA9PT0gcGFyc2VJbnQoU0VMRUNUX0lURU1fU0VMRUNUT1IudmFsdWUpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG1hcFJvd1RvU3RyaW5nID0ge1xuICAgICAgICAgIHRvcDogMixcbiAgICAgICAgICBtaWRkbGU6IDEsXG4gICAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICB9O1xuICAgICAgICBsZXQgbmV4dEluZGV4ID0gbWFwUm93VG9TdHJpbmdbU0VMRUNUX1JPV19TRUxFQ1RPUi52YWx1ZV07XG4gICAgICAgIGlmIChwcmV2SW5kZXggIT09IG5leHRJbmRleCkge1xuICAgICAgICAgIG1vdmVBcnJheUl0ZW1Ub05ld0luZGV4KHRoaXMucmVlbEl0ZW1zLCBwcmV2SW5kZXgsIG5leHRJbmRleCk7XG4gICAgICAgICAgdGhpcy5yZXNldENvb3JkcygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucmVlbEl0ZW1zLmZvckVhY2goKHJlZWxJdGVtKSA9PiB7XG4gICAgICAgIHJlZWxJdGVtLnJlbmRlcigpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlZWw7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgcmVlbEl0ZW0gPSAodHlwZSwgaXRlbU5vLCBpbWcsIHgsIHksIHdpbkFtb3VudCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGUsXG4gICAgaXRlbU5vLFxuICAgIGltZyxcbiAgICB4LFxuICAgIHksXG4gICAgd2luQW1vdW50LFxuICAgIHNwZWVkOiBSRUVMX1NQRUVELFxuICAgIG51ZGdlU3BlZWQ6IE5VREdFX1NQRUVELFxuICAgIGN0eDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWV3cG9ydFwiKS5nZXRDb250ZXh0KFwiMmRcIiksXG4gICAgbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy55ICs9IHRoaXMuc3BlZWQ7XG4gICAgfSxcbiAgICBudWRnZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy55ICs9IHRoaXMubnVkZ2VTcGVlZDtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKFxuICAgICAgICB0aGlzLmltZyxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgSVRFTV9XSURUSCxcbiAgICAgICAgSVRFTV9IRUlHSFQsXG4gICAgICAgIHRoaXMueCxcbiAgICAgICAgdGhpcy55LFxuICAgICAgICBJVEVNX1dJRFRILFxuICAgICAgICBJVEVNX0hFSUdIVFxuICAgICAgKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVlbEl0ZW07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHJlZWwgZnJvbSBcIi4vcmVlbFwiO1xuXG5jb25zdCByZWVscyA9ICgpID0+IHtcbiAgbGV0IG5ld1JlZWw7XG4gIHJldHVybiB7XG4gICAgcmVlbExpc3Q6IFtdLFxuICAgIGJ1aWxkOiBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5PX1JFRUxTOyBpKyspIHtcbiAgICAgICAgbmV3UmVlbCA9IHJlZWwoaSk7XG4gICAgICAgIG5ld1JlZWwuYnVpbGQoKTtcbiAgICAgICAgdGhpcy5yZWVsTGlzdC5wdXNoKG5ld1JlZWwpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgICAgIGlmIChyZWVsLnJ1blRpbWUgPiAwICYmICFyZWVsLmlzSGVsZCkge1xuICAgICAgICAgIHJlZWwubW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHJlc2V0UnVudGltZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgICAgICByZWVsLnJlc2V0UnVudGltZSgpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgICAgICByZWVsLnJlbmRlcigpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlZWxzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB2aWV3cG9ydCA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdWaWV3cG9ydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIG5ld1ZpZXdwb3J0LndpZHRoID0gVklFV1BPUlRfV0lEVEg7XG4gICAgbmV3Vmlld3BvcnQuaGVpZ2h0ID0gVklFV1BPUlRfSEVJR0hUO1xuICAgIG5ld1ZpZXdwb3J0LmlkID0gXCJ2aWV3cG9ydFwiO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdmlld3BvcnQ6IG5ld1ZpZXdwb3J0LFxuICAgICAgICB3aWR0aDogVklFV1BPUlRfV0lEVEgsXG4gICAgICAgIGhlaWdodDogVklFV1BPUlRfSEVJR0hULFxuICAgICAgICBjdHg6IG5ld1ZpZXdwb3J0LmdldENvbnRleHQoJzJkJyksXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3Qgdmlld3BvcnRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld3BvcnRDb250YWluZXInKTtcbiAgICAgICAgICAgIHZpZXdwb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMudmlld3BvcnQpO1xuICAgICAgICB9LFxuICAgICAgICBjbGVhcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHZpZXdwb3J0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgZGlnaXRzIGZyb20gXCIuL2RpZ2l0c1wiO1xuXG5jb25zdCB3aW4gPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgY3VycmVudFdpbjogMCxcbiAgICBkaWdpdHM6IGRpZ2l0cygpLFxuICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5cIiksXG4gICAgYWRkV2luOiBmdW5jdGlvbiAod2luQW1vdW50KSB7XG4gICAgICB0aGlzLmN1cnJlbnRXaW4gPSB3aW5BbW91bnQ7XG4gICAgfSxcbiAgICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5jdXJyZW50V2luID0gMDtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5kaWdpdHMuZGlnaXRzU3RyaW5nID0gdGhpcy5jdXJyZW50V2luLnRvU3RyaW5nKCk7XG4gICAgICB0aGlzLmRpZ2l0cy5jb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgIHRoaXMuZGlnaXRzLnJlbmRlcigpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aW47XG4iLCJpbXBvcnQgVmlld3BvcnQgZnJvbSBcIi4vY29tcG9uZW50cy92aWV3cG9ydFwiO1xuaW1wb3J0IFJlZWxzIGZyb20gXCIuL2NvbXBvbmVudHMvcmVlbHNcIjtcbmltcG9ydCBOdWRnZUJ1dHRvbnMgZnJvbSBcIi4vY29tcG9uZW50cy9udWRnZUJ1dHRvbnNcIjtcbmltcG9ydCBIb2xkQnV0dG9ucyBmcm9tIFwiLi9jb21wb25lbnRzL2hvbGRCdXR0b25zXCI7XG5pbXBvcnQgQ3JlZGl0cyBmcm9tIFwiLi9jb21wb25lbnRzL2NyZWRpdHNcIjtcbmltcG9ydCBXaW4gZnJvbSBcIi4vY29tcG9uZW50cy93aW5cIjtcbmltcG9ydCBOdWRnZXMgZnJvbSBcIi4vY29tcG9uZW50cy9udWRnZXNcIjtcblxuLy8gU2Fzc1xuaW1wb3J0IFwiLi4vc2Nzcy9hcHAuc2Nzc1wiO1xuXG4vLyBjcmVhdGVzIHRoZSBjYW52YXMgd2hpY2ggd2UgbmVlZCB0byBkcmF3IHVwb24gYW5kIGFzc2lnbnMgdG8gYSB2aWV3cG9ydCB2YXJpYWJsZVxuY29uc3Qgdmlld3BvcnQgPSBWaWV3cG9ydCgpO1xuLy8gY29uc3Qgc3BpbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcGluQnV0dG9uJyk7XG5jb25zdCB3aW5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpblwiKTtcbmNvbnN0IG51ZGdlc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibnVkZ2VzXCIpO1xubGV0IHBsYXlTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5U2VjdGlvblwiKTtcbmNvbnN0IHNlbGVjdF9nYW1lTW9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZS1tb2RlXCIpO1xuY29uc3QgZGl2X2ZpeGVkTW9kZU9wdGlvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpeGVkLW1vZGUtb3B0aW9uc1wiKTtcblxubGV0IHZpZXdwb3J0Q29udGFpbmVyO1xubGV0IG51ZGdlQnV0dG9uQ29udGFpbmVyO1xubGV0IGhvbGRCdXR0b25Db250YWluZXI7XG5sZXQgd2luSW5kaWNhdG9yTGVmdDtcbmxldCB3aW5JbmRpY2F0b3JSaWdodDtcbmxldCB3aW5JbmRpY2F0b3JUb3BMaW5lO1xubGV0IHdpbkluZGljYXRvckNlbnRyZUxpbmU7XG5sZXQgd2luSW5kaWNhdG9yQm90dG9tTGluZTtcbmxldCBzcGluQnV0dG9uO1xubGV0IHJlZWxzO1xubGV0IG51ZGdlcztcbmxldCBudWRnZUJ1dHRvbnM7XG5sZXQgaG9sZEJ1dHRvbnM7XG5sZXQgbnVkZ2VCdXR0b25MaXN0O1xubGV0IGhvbGRCdXR0b25MaXN0O1xubGV0IGNyZWRpdHM7XG5sZXQgd2luO1xubGV0IHdpbm5pbmdSb3dzID0gW107XG5sZXQgZ2FtZUxvb3A7XG5sZXQgbnVkZ2VDaGFuY2UgPSAyOyAvLyBDaGFuY2Ugb2YgZ2V0dGluZyBudWRnZXMgYWZ0ZXIgc3BpbiAoMSBpbiBudWRnZUNoYW5jZSlcbmxldCBob2xkQ2hhbmNlID0gMjsgLy8gQ2hhbmNlIG9mIGdldHRpbmcgaG9sZHMgYWZ0ZXIgc3BpbiAoMSBpbiBob2xkQ2hhbmNlKVxubGV0IGNhblNwaW47XG5sZXQgY2FuTnVkZ2U7XG5sZXQgY2FuSG9sZDtcbmxldCBub3c7IC8vIEN1cnJlbnQgdGltZSB0byBjb21wYXJlIGFnYWluc3RcbmxldCByZWVsc1J1bm5pbmcgPSBbXTsgLy8gS2VlcHMgdHJhY2sgb2YgYW55IHJlZWxzIHdpdGggcnVudGltZSBsZWZ0IG9uIHRoZW0gdG8gZXN0Ymxpc2ggd2hldGhlciB0byByZXNldC9zdG9wIHNwaW4gZXRjLlxubGV0IHNwaW5UeXBlID0gXCJzcGluXCI7IC8vIEtlZXBzIHRyYWNrIG9mIHdoZXRoZXIgbGFzdCBzcGluIHdhcyByZWd1bGFyIHNwaW4gb3IgbnVkZ2VcblxuY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgcmVuZGVyVmlld3BvcnRDb250YWluZXIoKTtcblxuICAvLyBSZW5kZXIgdmlld3BvcnRcbiAgdmlld3BvcnQucmVuZGVyKCk7XG5cbiAgLy8gU2V0IHVwIHJlZWxzXG4gIHJlZWxzID0gUmVlbHMoKTtcbiAgcmVlbHMuYnVpbGQoKTtcbiAgcmVlbHMucmVuZGVyKCk7XG5cbiAgbGV0IHJlZWxDb250YWluZXI7XG4gIGxldCByZWVsQ29udGFpbmVyWDtcbiAgbGV0IHJlZWxDb250YWluZXJZO1xuICBsZXQgcmVlbENvbnRhaW5lclc7XG4gIGxldCByZWVsQ29udGFpbmVySDtcblxuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgLy8gUmVuZGVyIG91dGVyIGNvbnRhaW5lciBmb3IgZWFjaCByZWVsIGluIHRoZSB2aWV3cG9ydCBjb250YWluZXJcbiAgICByZWVsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgIHJlZWxDb250YWluZXJYID1cbiAgICAgIHJlZWwucmVlbEl0ZW1zWzBdLnggK1xuICAgICAgVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWCAtXG4gICAgICBSRUVMX0NPTlRBSU5FUl9QQURESU5HO1xuXG4gICAgcmVlbENvbnRhaW5lclkgPVxuICAgICAgcmVlbC5yZWVsSXRlbXNbMl0ueSArXG4gICAgICBWSUVXUE9SVF9DT05UQUlORVJfUEFERElOR19ZIC1cbiAgICAgIFJFRUxfQ09OVEFJTkVSX1BBRERJTkc7XG5cbiAgICByZWVsQ29udGFpbmVyVyA9IFJFRUxfV0lEVEggKyBSRUVMX0NPTlRBSU5FUl9QQURESU5HICogMjtcblxuICAgIHJlZWxDb250YWluZXJIID0gVklFV1BPUlRfSEVJR0hUICsgUkVFTF9DT05UQUlORVJfUEFERElORyAqIDI7XG5cbiAgICByZWVsQ29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIHJlZWxDb250YWluZXIuc3R5bGUudG9wID0gcmVlbENvbnRhaW5lclkgKyBcInB4XCI7XG4gICAgcmVlbENvbnRhaW5lci5zdHlsZS5sZWZ0ID0gcmVlbENvbnRhaW5lclggKyBcInB4XCI7XG4gICAgcmVlbENvbnRhaW5lci5zdHlsZS53aWR0aCA9IHJlZWxDb250YWluZXJXICsgXCJweFwiO1xuICAgIHJlZWxDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gcmVlbENvbnRhaW5lckggKyBcInB4XCI7XG4gICAgcmVlbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicmVlbC1jb250YWluZXJcIik7XG4gICAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQocmVlbENvbnRhaW5lcik7XG4gIH0pO1xuXG4gIHJlbmRlcldpbkluZGljYXRvcnMoKTtcblxuICByZW5kZXJOdWRnZUJ1dHRvbkNvbnRhaW5lcigpO1xuXG4gIC8vIFNldCB1cCBudWRnZSBidXR0b25zXG4gIG51ZGdlQnV0dG9ucyA9IE51ZGdlQnV0dG9ucygpO1xuICBudWRnZUJ1dHRvbnMuYnVpbGQoKTtcbiAgbnVkZ2VCdXR0b25zLnJlbmRlcigpO1xuXG4gIG51ZGdlQnV0dG9uTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJudWRnZS1idXR0b25cIik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudWRnZUJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBudWRnZUJ1dHRvbkxpc3RbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgY2FuU3BpbiAmJlxuICAgICAgICBjYW5OdWRnZSAmJlxuICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5jYW5OdWRnZSA9PT0gdHJ1ZSAmJlxuICAgICAgICBudWRnZXMubnVkZ2VzUmVtYWluaW5nID4gMFxuICAgICAgKSB7XG4gICAgICAgIHNwaW5UeXBlID0gXCJudWRnZVwiO1xuICAgICAgICBudWRnZXMubnVkZ2VzUmVtYWluaW5nIC09IDE7XG4gICAgICAgIHJlZWxzLnJlZWxMaXN0W2ldLmlzTnVkZ2luZyA9IHRydWU7XG4gICAgICAgIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgICBnYW1lU3RhdGVzLmN1cnJlbnRTdGF0ZSA9IGdhbWVTdGF0ZXMubnVkZ2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBTZXQgdXAgbnVkZ2VzXG4gIG51ZGdlcyA9IE51ZGdlcygpO1xuICBudWRnZXMucmVuZGVyKCk7XG5cbiAgcmVuZGVySG9sZEJ1dHRvbkNvbnRhaW5lcigpO1xuXG4gIC8vIFNldCB1cCBob2xkIGJ1dHRvbnNcbiAgaG9sZEJ1dHRvbnMgPSBIb2xkQnV0dG9ucygpO1xuICBob2xkQnV0dG9ucy5idWlsZCgpO1xuICBob2xkQnV0dG9ucy5yZW5kZXIoKTtcblxuICBob2xkQnV0dG9uTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJob2xkLWJ1dHRvblwiKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGhvbGRCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaG9sZEJ1dHRvbkxpc3RbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgaWYgKGNhblNwaW4gJiYgY2FuSG9sZCkge1xuICAgICAgICAvLyBUb2dnbGVcbiAgICAgICAgaWYgKHJlZWxzLnJlZWxMaXN0W2ldLmlzSGVsZCkge1xuICAgICAgICAgIC8vIFRha2UgaG9sZCBvZmZcbiAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQgPSBmYWxzZTtcbiAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5yZXNldFJ1bnRpbWUoKTtcbiAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImhlbGRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUHV0IGhvbGQgb25cbiAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQgPSB0cnVlO1xuICAgICAgICAgIHJlZWxzLnJlZWxMaXN0W2ldLnJ1blRpbWUgPSAwO1xuICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGVsZFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gU2V0IHVwIGNyZWRpdHNcbiAgY3JlZGl0cyA9IENyZWRpdHMoKTtcbiAgY3JlZGl0cy5yZXNldCgpO1xuICBjcmVkaXRzLnJlbmRlcigpO1xuXG4gIC8vIFNldCB1cCB3aW5cbiAgd2luID0gV2luKCk7XG4gIHdpbi5yZXNldCgpO1xuICB3aW4ucmVuZGVyKCk7XG5cbiAgcmVuZGVyU3BpbkJ1dHRvbigpO1xuXG4gIGNhblNwaW4gPSB0cnVlO1xuICBjYW5OdWRnZSA9IGZhbHNlO1xuICBjYW5Ib2xkID0gZmFsc2U7XG5cbiAgZW5hYmxlU3BpbigpO1xuXG4gIHNwaW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAoY2FuU3Bpbikge1xuICAgICAgY3JlZGl0cy51c2VDcmVkaXQoKTtcbiAgICAgIGNyZWRpdHMucmVuZGVyKCk7XG4gICAgICB3aW5uaW5nUm93cyA9IFtdO1xuICAgICAgZGlzYWJsZU51ZGdlcygpO1xuICAgICAgZGlzYWJsZVNwaW4oKTtcblxuICAgICAgLy8gRGlzYWJsZSBob2xkIGJ1dHRvbnMgdGhhdCBhcmVuJ3QgaGVsZFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWVscy5yZWVsTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIXJlZWxzLnJlZWxMaXN0W2ldLmlzSGVsZCkge1xuICAgICAgICAgIHJlZWxzLnJlZWxMaXN0W2ldLmNhbkhvbGQgPSBmYWxzZTtcbiAgICAgICAgICBob2xkQnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNwaW5UeXBlID0gXCJzcGluXCI7XG4gICAgICBnYW1lU3RhdGVzLmN1cnJlbnRTdGF0ZSA9IGdhbWVTdGF0ZXMuc3BpbjtcbiAgICAgIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgZ2FtZVN0YXRlcy5jdXJyZW50U3RhdGUoKTtcbiAgICB9XG4gIH0pO1xuICBzZWxlY3RfZ2FtZU1vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGlmICh0aGlzLnZhbHVlID09PSBcImZpeGVkXCIpIHtcbiAgICAgIGRpdl9maXhlZE1vZGVPcHRpb25zLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgfSBlbHNlIGlmICh0aGlzLnZhbHVlID09PSBcInJhbmRvbVwiKSB7XG4gICAgICBkaXZfZml4ZWRNb2RlT3B0aW9ucy5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCByZW5kZXJOdWRnZUJ1dHRvbkNvbnRhaW5lciA9ICgpID0+IHtcbiAgbnVkZ2VCdXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBudWRnZUJ1dHRvbkNvbnRhaW5lci5pZCA9IFwibnVkZ2VCdXR0b25zXCI7XG4gIHBsYXlTZWN0aW9uLmFwcGVuZENoaWxkKG51ZGdlQnV0dG9uQ29udGFpbmVyKTtcbn07XG5cbmNvbnN0IHJlbmRlckhvbGRCdXR0b25Db250YWluZXIgPSAoKSA9PiB7XG4gIGhvbGRCdXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBob2xkQnV0dG9uQ29udGFpbmVyLmlkID0gXCJob2xkQnV0dG9uc1wiO1xuICBwbGF5U2VjdGlvbi5hcHBlbmRDaGlsZChob2xkQnV0dG9uQ29udGFpbmVyKTtcbn07XG5cbmNvbnN0IHJlbmRlclNwaW5CdXR0b24gPSAoKSA9PiB7XG4gIHNwaW5CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBzcGluQnV0dG9uLmlkID0gXCJzcGluQnV0dG9uXCI7XG4gIHNwaW5CdXR0b24uY2xhc3NMaXN0LmFkZChcImJ1dHRvblwiKTtcbiAgc3BpbkJ1dHRvbi5pbm5lckhUTUwgPSBcIlNQSU5cIjtcbiAgcGxheVNlY3Rpb24uYXBwZW5kQ2hpbGQoc3BpbkJ1dHRvbik7XG59O1xuXG5jb25zdCByZW5kZXJWaWV3cG9ydENvbnRhaW5lciA9ICgpID0+IHtcbiAgLy8gUmVuZGVyIHZpZXdwb3J0IGNvbnRhaW5lclxuICB2aWV3cG9ydENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHZpZXdwb3J0Q29udGFpbmVyLmlkID0gXCJ2aWV3cG9ydENvbnRhaW5lclwiO1xuICB2aWV3cG9ydENvbnRhaW5lci5zdHlsZS5wYWRkaW5nTGVmdCA9IFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1ggKyBcInB4XCI7XG4gIHZpZXdwb3J0Q29udGFpbmVyLnN0eWxlLnBhZGRpbmdSaWdodCA9IFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1ggKyBcInB4XCI7XG4gIHZpZXdwb3J0Q29udGFpbmVyLnN0eWxlLnBhZGRpbmdUb3AgPSBWSUVXUE9SVF9DT05UQUlORVJfUEFERElOR19ZICsgXCJweFwiO1xuICB2aWV3cG9ydENvbnRhaW5lci5zdHlsZS5wYWRkaW5nQm90dG9tID0gVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWSArIFwicHhcIjtcbiAgcGxheVNlY3Rpb24uYXBwZW5kQ2hpbGQodmlld3BvcnRDb250YWluZXIpO1xufTtcblxuY29uc3QgcmVuZGVyV2luSW5kaWNhdG9ycyA9ICgpID0+IHtcbiAgLy8gTGVmdCBpbmRpY2F0b3JcbiAgd2luSW5kaWNhdG9yTGVmdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICB3aW5JbmRpY2F0b3JMZWZ0LmNsYXNzTGlzdC5hZGQoXCJ3aW4taW5kaWNhdG9yXCIsIFwibGVmdFwiKTtcbiAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQod2luSW5kaWNhdG9yTGVmdCk7XG4gIC8vIFJpZ2h0IGluZGljYXRvclxuICB3aW5JbmRpY2F0b3JSaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICB3aW5JbmRpY2F0b3JSaWdodC5jbGFzc0xpc3QuYWRkKFwid2luLWluZGljYXRvclwiLCBcInJpZ2h0XCIpO1xuICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZCh3aW5JbmRpY2F0b3JSaWdodCk7XG5cbiAgLy8gQ2VudHJlIGxpbmVcbiAgd2luSW5kaWNhdG9yQ2VudHJlTGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHdpbkluZGljYXRvckNlbnRyZUxpbmUuY2xhc3NMaXN0LmFkZChcIndpbi1pbmRpY2F0b3ItY2VudHJlLWxpbmVcIik7XG5cbiAgd2luSW5kaWNhdG9yQ2VudHJlTGluZS5zdHlsZS5sZWZ0ID0gd2luSW5kaWNhdG9yTGVmdC5vZmZzZXRXaWR0aCArIFwicHhcIjtcblxuICB3aW5JbmRpY2F0b3JDZW50cmVMaW5lLnN0eWxlLndpZHRoID1cbiAgICB2aWV3cG9ydENvbnRhaW5lci5vZmZzZXRXaWR0aCAtXG4gICAgd2luSW5kaWNhdG9yTGVmdC5vZmZzZXRXaWR0aCAtXG4gICAgd2luSW5kaWNhdG9yUmlnaHQub2Zmc2V0V2lkdGggK1xuICAgIFwicHhcIjtcblxuICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZCh3aW5JbmRpY2F0b3JDZW50cmVMaW5lKTtcblxuICAvLyBUb3AgbGluZVxuICB3aW5JbmRpY2F0b3JUb3BMaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgd2luSW5kaWNhdG9yVG9wTGluZS5jbGFzc0xpc3QuYWRkKFwid2luLWluZGljYXRvci10b3AtbGluZVwiKTtcblxuICB3aW5JbmRpY2F0b3JUb3BMaW5lLnN0eWxlLmxlZnQgPSB3aW5JbmRpY2F0b3JMZWZ0Lm9mZnNldFdpZHRoICsgXCJweFwiO1xuXG4gIHdpbkluZGljYXRvclRvcExpbmUuc3R5bGUud2lkdGggPVxuICAgIHZpZXdwb3J0Q29udGFpbmVyLm9mZnNldFdpZHRoIC1cbiAgICB3aW5JbmRpY2F0b3JMZWZ0Lm9mZnNldFdpZHRoIC1cbiAgICB3aW5JbmRpY2F0b3JSaWdodC5vZmZzZXRXaWR0aCArXG4gICAgXCJweFwiO1xuXG4gIHZpZXdwb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHdpbkluZGljYXRvclRvcExpbmUpO1xuXG4gIC8vIEJvdHRvbSBsaW5lXG4gIHdpbkluZGljYXRvckJvdHRvbUxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB3aW5JbmRpY2F0b3JCb3R0b21MaW5lLmNsYXNzTGlzdC5hZGQoXCJ3aW4taW5kaWNhdG9yLWJvdHRvbS1saW5lXCIpO1xuXG4gIHdpbkluZGljYXRvckJvdHRvbUxpbmUuc3R5bGUubGVmdCA9IHdpbkluZGljYXRvckxlZnQub2Zmc2V0V2lkdGggKyBcInB4XCI7XG5cbiAgd2luSW5kaWNhdG9yQm90dG9tTGluZS5zdHlsZS53aWR0aCA9XG4gICAgdmlld3BvcnRDb250YWluZXIub2Zmc2V0V2lkdGggLVxuICAgIHdpbkluZGljYXRvckxlZnQub2Zmc2V0V2lkdGggLVxuICAgIHdpbkluZGljYXRvclJpZ2h0Lm9mZnNldFdpZHRoICtcbiAgICBcInB4XCI7XG5cbiAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQod2luSW5kaWNhdG9yQm90dG9tTGluZSk7XG59O1xuXG5jb25zdCBsb29wID0gKGN1cnJlbnRUaW1lKSA9PiB7XG4gIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApOyAvLyBOZWVkcyB0byBnbyBiZWZvcmUgbGluZSBiZWxvdyB0byBrZWVwIGFuaW1hdGlvbmZyYW1laWQgdXAgdG8gZGF0ZVxuICBnYW1lU3RhdGVzLmN1cnJlbnRTdGF0ZShjdXJyZW50VGltZSk7XG59O1xuXG5jb25zdCBtb3ZlUmVlbHMgPSAoKSA9PiB7XG4gIHJlZWxzLm1vdmUoKTtcbn07XG5cbmNvbnN0IHJlbmRlciA9ICgpID0+IHtcbiAgdmlld3BvcnQuY2xlYXIoKTtcbiAgcmVlbHMucmVuZGVyKCk7XG5cbiAgLy8gRGlnaXRzXG4gIG51ZGdlcy5yZW5kZXIoKTtcbiAgY3JlZGl0cy5yZW5kZXIoKTtcbiAgd2luLnJlbmRlcigpO1xufTtcblxuLy8gQ2FsY3VsYXRlcyB3aW4gYW1vdW50LCBpZiB3aW5uaW5nIGxpbmVcbmNvbnN0IGNoZWNrV2luID0gKCkgPT4ge1xuICBsZXQgc3BpblJlc3VsdCA9IFtdOyAvLyBBcnJheSBvZiByZWVsIHJlc3VsdHMgYWZ0ZXIgc3BpbiAoYWxsIHRocmVlIHZpc2libGUgb2JqZWN0cyBvZiBlYWNoIHJlZWwpXG4gIGxldCByZWVsUmVzdWx0OyAvLyBJbmRpdmlkdWFsIHJlZWwgcmVzdWx0LCBtYWRlIG9mIHRocmVlIG9iamVjdHMgKHZpc2libGUpXG5cbiAgLy8gQ2hlY2sgZm9yIHdpblxuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsLCBpbmRleCkgPT4ge1xuICAgIHJlZWxSZXN1bHQgPSBbXTsgLy8gUmVzdWx0IG9mIGluZGl2aWR1YWwgcmVlbFxuXG4gICAgcmVlbFJlc3VsdC5wdXNoKHJlZWxzLnJlZWxMaXN0W2luZGV4XS5yZWVsSXRlbXNbMF0pO1xuICAgIHJlZWxSZXN1bHQucHVzaChyZWVscy5yZWVsTGlzdFtpbmRleF0ucmVlbEl0ZW1zWzFdKTtcbiAgICByZWVsUmVzdWx0LnB1c2gocmVlbHMucmVlbExpc3RbaW5kZXhdLnJlZWxJdGVtc1syXSk7XG5cbiAgICBzcGluUmVzdWx0LnB1c2gocmVlbFJlc3VsdCk7XG4gIH0pO1xuICBsZXQgcmVzdWx0ID0gZ2V0QWxsUm93UmVzdWx0cyhzcGluUmVzdWx0KTtcbiAgbGV0IGN1cnJlbnRXaW5BbW91bnQgPSAwO1xuXG4gIC8vIEFsbCB0aGUgcG9zc2libGUgd2lubmluZyBwb3NzaWJpbGl0aWVzIGFuZCBpdHMgcHJpemVzXG4gIHZhciB3aW5uaW5nQ2FzZSA9IHtcbiAgICB0b3A6IHtcbiAgICAgIGNoZXJyeToge1xuICAgICAgICB2YWxpZGF0ZTogLzR7M30vLnRlc3QocmVzdWx0W1widG9wXCJdKSxcbiAgICAgICAgdmFsdWU6IDIwMDAsXG4gICAgICB9LFxuICAgICAgXCI3XCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8zezN9Ly50ZXN0KHJlc3VsdFtcInRvcFwiXSksXG4gICAgICAgIHZhbHVlOiAxNTAsXG4gICAgICB9LFxuICAgICAgY2hlcnJ5T3I3OiB7XG4gICAgICAgIHZhbGlkYXRlOiAvWzQvM117M30vLnRlc3QocmVzdWx0W1widG9wXCJdKSxcbiAgICAgICAgdmFsdWU6IDc1LFxuICAgICAgfSxcbiAgICAgIFwiM3hCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzB7M30vLnRlc3QocmVzdWx0W1widG9wXCJdKSxcbiAgICAgICAgdmFsdWU6IDUwLFxuICAgICAgfSxcbiAgICAgIFwiMnhCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzJ7M30vLnRlc3QocmVzdWx0W1widG9wXCJdKSxcbiAgICAgICAgdmFsdWU6IDIwLFxuICAgICAgfSxcbiAgICAgIFwiMXhCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzF7M30vLnRlc3QocmVzdWx0W1widG9wXCJdKSxcbiAgICAgICAgdmFsdWU6IDEwLFxuICAgICAgfSxcbiAgICAgIGFueUJhcjoge1xuICAgICAgICB2YWxpZGF0ZTogL1swMTJdezN9Ly50ZXN0KHJlc3VsdFtcInRvcFwiXSksXG4gICAgICAgIHZhbHVlOiA1LFxuICAgICAgfSxcbiAgICB9LFxuICAgIG1pZGRsZToge1xuICAgICAgY2hlcnJ5OiB7XG4gICAgICAgIHZhbGlkYXRlOiAvNHszfS8udGVzdChyZXN1bHRbXCJtaWRkbGVcIl0pLFxuICAgICAgICB2YWx1ZTogMTAwMCxcbiAgICAgIH0sXG4gICAgICBcIjdcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzN7M30vLnRlc3QocmVzdWx0W1wibWlkZGxlXCJdKSxcbiAgICAgICAgdmFsdWU6IDE1MCxcbiAgICAgIH0sXG4gICAgICBjaGVycnlPcjc6IHtcbiAgICAgICAgdmFsaWRhdGU6IC9bNC8zXXszfS8udGVzdChyZXN1bHRbXCJtaWRkbGVcIl0pLFxuICAgICAgICB2YWx1ZTogNzUsXG4gICAgICB9LFxuICAgICAgXCIzeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMHszfS8udGVzdChyZXN1bHRbXCJtaWRkbGVcIl0pLFxuICAgICAgICB2YWx1ZTogNTAsXG4gICAgICB9LFxuICAgICAgXCIyeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMnszfS8udGVzdChyZXN1bHRbXCJtaWRkbGVcIl0pLFxuICAgICAgICB2YWx1ZTogMjAsXG4gICAgICB9LFxuICAgICAgXCIxeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMXszfS8udGVzdChyZXN1bHRbXCJtaWRkbGVcIl0pLFxuICAgICAgICB2YWx1ZTogMTAsXG4gICAgICB9LFxuICAgICAgYW55QmFyOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvWzAxMl17M30vLnRlc3QocmVzdWx0W1wibWlkZGxlXCJdKSxcbiAgICAgICAgdmFsdWU6IDUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgYm90dG9tOiB7XG4gICAgICBjaGVycnk6IHtcbiAgICAgICAgdmFsaWRhdGU6IC80ezN9Ly50ZXN0KHJlc3VsdFtcImJvdHRvbVwiXSksXG4gICAgICAgIHZhbHVlOiA0MDAwLFxuICAgICAgfSxcbiAgICAgIFwiN1wiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvM3szfS8udGVzdChyZXN1bHRbXCJib3R0b21cIl0pLFxuICAgICAgICB2YWx1ZTogMTUwLFxuICAgICAgfSxcbiAgICAgIGNoZXJyeU9yNzoge1xuICAgICAgICB2YWxpZGF0ZTogL1s0LzNdezN9Ly50ZXN0KHJlc3VsdFtcImJvdHRvbVwiXSksXG4gICAgICAgIHZhbHVlOiA3NSxcbiAgICAgIH0sXG4gICAgICBcIjN4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8wezN9Ly50ZXN0KHJlc3VsdFtcImJvdHRvbVwiXSksXG4gICAgICAgIHZhbHVlOiA1MCxcbiAgICAgIH0sXG4gICAgICBcIjJ4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8yezN9Ly50ZXN0KHJlc3VsdFtcImJvdHRvbVwiXSksXG4gICAgICAgIHZhbHVlOiAyMCxcbiAgICAgIH0sXG4gICAgICBcIjF4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8xezN9Ly50ZXN0KHJlc3VsdFtcImJvdHRvbVwiXSksXG4gICAgICAgIHZhbHVlOiAxMCxcbiAgICAgIH0sXG4gICAgICBhbnlCYXI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC9bMDEyXXszfS8udGVzdChyZXN1bHRbXCJib3R0b21cIl0pLFxuICAgICAgICB2YWx1ZTogNSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICAvLyBMb29wIHRocm91Z2ggdGhlIHdpbm5pbmcgcG9zc2liaWxpdGllc1xuICAvLyBjYXNlIHdpbm5pbmcgZHJhdyB0aGUgbGluZSBpbiB0aGUgd2lubmluZyByb3dcbiAgLy8gdXBkYXRlIHRoZSB2aWV3IHdpdGggdGhlIHByaXplIHZhbHVlXG4gIGZvciAobGV0IHJvdyBpbiB3aW5uaW5nQ2FzZSkge1xuICAgIGZvciAobGV0IGl0ZW0gaW4gd2lubmluZ0Nhc2Vbcm93XSkge1xuICAgICAgaWYgKHdpbm5pbmdDYXNlW3Jvd11baXRlbV0udmFsaWRhdGUpIHtcbiAgICAgICAgY3VycmVudFdpbkFtb3VudCArPSB3aW5uaW5nQ2FzZVtyb3ddW2l0ZW1dLnZhbHVlO1xuXG4gICAgICAgIHdpbm5pbmdSb3dzLnB1c2gocm93KTtcbiAgICAgICAgLy8gQnJlYWsgZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoY3VycmVudFdpbkFtb3VudCkgcmV0dXJuIGN1cnJlbnRXaW5BbW91bnQ7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGdldEFsbFJvd1Jlc3VsdHMgPSAoc3BpblJlc3VsdCkgPT4ge1xuICBsZXQgdG9wID0gXCJcIixcbiAgICBtaWRkbGUgPSBcIlwiLFxuICAgIGJvdHRvbSA9IFwiXCI7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3BpblJlc3VsdC5sZW5ndGggJiYgc3BpblJlc3VsdC5sZW5ndGggPT09IDM7IGkrKykge1xuICAgIHRvcCArPSBzcGluUmVzdWx0W2ldWzJdLml0ZW1Oby50b1N0cmluZygpO1xuICAgIG1pZGRsZSArPSBzcGluUmVzdWx0W2ldWzFdLml0ZW1Oby50b1N0cmluZygpO1xuICAgIGJvdHRvbSArPSBzcGluUmVzdWx0W2ldWzBdLml0ZW1Oby50b1N0cmluZygpO1xuICB9XG4gIHJldHVybiB7XG4gICAgdG9wLFxuICAgIG1pZGRsZSxcbiAgICBib3R0b20sXG4gIH07XG59O1xuXG4vLyBSYW5kb21seSBhc3NpZ24gbnVkZ2VzXG5jb25zdCBhc3NpZ25OdWRnZXMgPSAoKSA9PiB7XG4gIC8vIFJhbmRvbWx5IGFzc2lnbiBudWRnZXNcbiAgY29uc3QgbnVkZ2VSYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBudWRnZUNoYW5jZSArIDEpO1xuXG4gIC8vIElmIHJhbmRvbSBjaGFuY2UgaXMgbWV0IHRoZW4gYXNzaWduIG51ZGdlc1xuICBpZiAobnVkZ2VSYW5kb20gPT09IG51ZGdlQ2hhbmNlKSB7XG4gICAgY2FuTnVkZ2UgPSB0cnVlO1xuICAgIGVuYWJsZU51ZGdlcygpO1xuICAgIG51ZGdlcy5udWRnZXNSZW1haW5pbmcgPSA1O1xuICAgIG51ZGdlcy5yZW5kZXIoKTtcbiAgfSBlbHNlIGlmIChudWRnZXMubnVkZ2VzUmVtYWluaW5nIDwgMSkge1xuICAgIC8vIElmIG5vIG51ZGdlcyBsZWZ0IGluIGJhbmtcbiAgICBjYW5OdWRnZSA9IGZhbHNlO1xuICAgIGRpc2FibGVOdWRnZXMoKTtcbiAgfVxufTtcblxuLy8gUmFuZG9tbHkgYXNzaWduIGhvbGRzXG5jb25zdCBhc3NpZ25Ib2xkcyA9ICgpID0+IHtcbiAgY29uc3QgaG9sZFJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGhvbGRDaGFuY2UgKyAxKTtcblxuICAvLyBSYW5kb21seSBhc3NpZ24gaG9sZHMgKGlmIG5vIG51ZGdlcyBsZWZ0IGluIGJhbmspXG4gIC8vIEFzc2lnbiBob2xkIGlmIHJhbmRvbSBudW1iZXIgbWV0IGFuZCBsYXN0IHNwaW4gd2Fzbid0IGEgd2luXG4gIGlmIChudWRnZXMubnVkZ2VzUmVtYWluaW5nIDwgMSkge1xuICAgIGlmIChob2xkUmFuZG9tID09PSBob2xkQ2hhbmNlKSB7XG4gICAgICAvLyBDYW4gaG9sZFxuICAgICAgY2FuSG9sZCA9IHRydWU7XG4gICAgICBidXR0b25TdHlsZXMoaG9sZEJ1dHRvbkxpc3QsIFwiYWRkXCIsIFwiYWN0aXZlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYW5Ib2xkID0gZmFsc2U7XG4gICAgICBidXR0b25TdHlsZXMoaG9sZEJ1dHRvbkxpc3QsIFwicmVtb3ZlXCIsIFwiYWN0aXZlXCIpO1xuICAgICAgYnV0dG9uU3R5bGVzKGhvbGRCdXR0b25MaXN0LCBcInJlbW92ZVwiLCBcImhlbGRcIik7XG4gICAgfVxuICB9XG59O1xuXG4vLyBFbmFibGUgYWxsIG51ZGdlc1xuY29uc3QgZW5hYmxlTnVkZ2VzID0gKCkgPT4ge1xuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgLy8gSWYgdGhlIHJlZWwgaXNuJ3QgaGVsZFxuICAgIGlmICghcmVlbC5pc0hlbGQpIHtcbiAgICAgIHJlZWwuY2FuTnVkZ2UgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudWRnZUJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBJZiB0aGUgcmVlbCBpc24ndCBoZWxkXG4gICAgaWYgKCFyZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQpIHtcbiAgICAgIG51ZGdlQnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIH1cbiAgfVxuXG4gIG51ZGdlc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xufTtcblxuLy8gRW5iYWxlIGFsbCBob2xkc1xuY29uc3QgZW5hYmxlSG9sZHMgPSAoKSA9PiB7XG4gIHJlZWxzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcbiAgICByZWVsLmNhbkhvbGQgPSB0cnVlO1xuICB9KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGhvbGRCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaG9sZEJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgfVxuXG4gIGNhbmhvbGQgPSB0cnVlO1xufTtcblxuLy8gRGlzYWJsZSBhbGwgbnVkZ2VzXG5jb25zdCBkaXNhYmxlTnVkZ2VzID0gKCkgPT4ge1xuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgcmVlbC5jYW5OdWRnZSA9IGZhbHNlO1xuICB9KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG51ZGdlQnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIG51ZGdlQnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICB9XG5cbiAgbnVkZ2VzLnJlc2V0KCk7XG5cbiAgY2FuTnVkZ2UgPSBmYWxzZTtcblxuICBudWRnZXNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbn07XG5cbi8vIERpc2FibGUgYWxsIGhvbGRzXG5jb25zdCBkaXNhYmxlSG9sZHMgPSAoKSA9PiB7XG4gIHJlZWxzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcbiAgICByZWVsLmNhbkhvbGQgPSBmYWxzZTtcbiAgICByZWVsLmlzSGVsZCA9IGZhbHNlO1xuICAgIGlmIChyZWVsLnJ1blRpbWUgPCAxKSB7XG4gICAgICByZWVsLnJlc2V0UnVudGltZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBob2xkQnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGhvbGRCdXR0b25MaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIiwgXCJoZWxkXCIpO1xuICB9XG5cbiAgY2FuSG9sZCA9IGZhbHNlO1xufTtcblxuLy8gRW5hYmxlIHNwaW5cbmNvbnN0IGVuYWJsZVNwaW4gPSAoKSA9PiB7XG4gIHNwaW5CdXR0b24uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgY2FuU3BpbiA9IHRydWU7XG59O1xuXG4vLyBEaXNiYWxlIHNwaW5cbmNvbnN0IGRpc2FibGVTcGluID0gKCkgPT4ge1xuICBzcGluQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gIGNhblNwaW4gPSBmYWxzZTtcbn07XG5cbi8vIEFkZCBvciByZW1vdmUgZ3JvdXAgYnV0dG9uIHN0eWxlc1xuY29uc3QgYnV0dG9uU3R5bGVzID0gKGJ1dHRvbkxpc3QsIGFkZFJlbW92ZSwgY2xhc3NOYW1lKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhZGRSZW1vdmUgPT09IFwiYWRkXCIpIHtcbiAgICAgIGJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH0gZWxzZSBpZiAoYWRkUmVtb3ZlID09PSBcInJlbW92ZVwiKSB7XG4gICAgICBidXR0b25MaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIEdhbWUgc3RhdGVcbmNvbnN0IGdhbWVTdGF0ZXMgPSB7XG4gIGN1cnJlbnRTdGF0ZTogbnVsbCxcbiAgd2luQW1vdW50OiAwLFxuICBvbGRXaW5EaXNwbGF5OiAwLCAvLyBXaGVuIGxvb3BpbmcgdGhyb3VnaCB3aW4gaW5jcmVtZW50IC0gdGhpcyBpcyB0aGUgb3JpZ2luYWwgZmlndXJlXG4gIGN1cnJlbnRXaW5EaXNwbGF5OiAwLCAvLyBXaGVuIGxvb3BpbmcgdGhyb3VnaCB3aW4gYW1vdW50IC0gdGhpcyBpcyB0aGUgbmV3IGZpZ3VyZVxuXG4gIC8vIFJlZ3VsYXIgc3BpblxuICBzcGluOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zcGluVHlwZSA9IFwic3BpblwiO1xuICAgIGRpc2FibGVTcGluKCk7XG4gICAgbW92ZVJlZWxzKCk7XG4gICAgcmVuZGVyKCk7XG5cbiAgICAvLyBGaWx0ZXIgcmVlbCBydW50aW1lcyAtIGlmIG9uZSBpcyBhYm92ZSB6ZXJvIHRoZW4gY2Fycnkgb25cbiAgICByZWVsc1J1bm5pbmcgPSByZWVscy5yZWVsTGlzdC5maWx0ZXIoKHJlZWwpID0+IHtcbiAgICAgIHJldHVybiByZWVsLnJ1blRpbWUgPiAwO1xuICAgIH0pO1xuXG4gICAgaWYgKCFyZWVsc1J1bm5pbmcubGVuZ3RoKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuc3BpbkZpbmlzaGVkO1xuICAgIH1cbiAgfSxcbiAgLy8gU3BpbiBmaW5pc2hlZFxuICBzcGluRmluaXNoZWQ6IGZ1bmN0aW9uIChjdXJyZW50VGltZSkge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcblxuICAgIGlmIChudWRnZXMubnVkZ2VzUmVtYWluaW5nIDwgMSkge1xuICAgICAgZGlzYWJsZU51ZGdlcygpO1xuICAgICAgaWYgKHNwaW5UeXBlICE9PSBcIm51ZGdlXCIpIHtcbiAgICAgICAgZGlzYWJsZUhvbGRzKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIHdpblxuICAgIGNvbnN0IHdpbiA9IGNoZWNrV2luKCk7XG5cbiAgICAvLyBXaW5cbiAgICBpZiAod2luKSB7XG4gICAgICAvLyBSZXNldCBudWRnZXNcbiAgICAgIG51ZGdlcy5yZXNldCgpO1xuICAgICAgY2FuTnVkZ2UgPSBmYWxzZTtcbiAgICAgIGRpc2FibGVOdWRnZXMoKTtcbiAgICAgIGRpc2FibGVIb2xkcygpO1xuICAgICAgZGlzYWJsZVNwaW4oKTtcblxuICAgICAgbm93ID0gY3VycmVudFRpbWU7XG4gICAgICB0aGlzLndpbkFtb3VudCA9IHdpbjtcblxuICAgICAgcmVuZGVyKCk7XG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMud2luOyAvLyBTd2l0Y2ggdG8gd2luIGFuaW1hdGlvbiBzdGF0ZVxuICAgICAgZ2FtZUxvb3AgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgfVxuICAgIC8vIE5vIHdpblxuICAgIGVsc2Uge1xuICAgICAgaWYgKFxuICAgICAgICBudWRnZXMubnVkZ2VzUmVtYWluaW5nIDwgMSAmJlxuICAgICAgICBzcGluVHlwZSAhPT0gXCJudWRnZVwiICYmXG4gICAgICAgIGNyZWRpdHMuY3JlZGl0c1JlbWFpbmluZyA+IDBcbiAgICAgICkge1xuICAgICAgICAvLyBJZiBubyB3aW5uaW5nIGxpbmUgdGhlbiBhc3NpZ24gaG9sZHMgYW5kIG51ZGdlc1xuICAgICAgICBhc3NpZ25Ib2xkcygpO1xuICAgICAgICBhc3NpZ25OdWRnZXMoKTtcbiAgICAgIH1cblxuICAgICAgLy8gRW5hYmxlIHNwaW5cbiAgICAgIGVuYWJsZVNwaW4oKTtcblxuICAgICAgLy8gQ2hlY2sgY3JlZGl0c1xuICAgICAgaWYgKGNyZWRpdHMuY3JlZGl0c1JlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuZ2FtZU92ZXI7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvLyBOdWRnZVxuICBudWRnZTogZnVuY3Rpb24gKGN1cnJlbnRUaW1lKSB7XG4gICAgbGV0IGlzTnVkZ2luZyA9IFtdO1xuICAgIC8vIElmIG51ZGdpbmcgc3RvcHBlZCwgdGhlbiBjaGFuZ2UgZ2FtZXN0YXRlIHRvIHNwaW5maW5pc2hlZFxuICAgIGlzTnVkZ2luZyA9IHJlZWxzLnJlZWxMaXN0LmZpbHRlcigocmVlbCkgPT4ge1xuICAgICAgcmV0dXJuIHJlZWwuaXNOdWRnaW5nID09PSB0cnVlO1xuICAgIH0pO1xuXG4gICAgaWYgKCFpc051ZGdpbmcubGVuZ3RoKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG4gICAgICB0aGlzLnNwaW5GaW5pc2hlZChjdXJyZW50VGltZSk7XG4gICAgfVxuXG4gICAgaXNOdWRnaW5nLmZvckVhY2goKHJlZWwpID0+IHtcbiAgICAgIHJlZWwubnVkZ2UoKTtcbiAgICAgIHJlbmRlcigpO1xuICAgIH0pO1xuICB9LFxuICAvLyBXaW4gYW5pbWF0aW9uXG4gIHdpbjogZnVuY3Rpb24gKGN1cnJlbnRUaW1lKSB7XG4gICAgaWYgKHdpbm5pbmdSb3dzLmluY2x1ZGVzKFwidG9wXCIpKVxuICAgICAgd2luSW5kaWNhdG9yVG9wTGluZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGlmICh3aW5uaW5nUm93cy5pbmNsdWRlcyhcIm1pZGRsZVwiKSlcbiAgICAgIHdpbkluZGljYXRvckNlbnRyZUxpbmUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICBpZiAod2lubmluZ1Jvd3MuaW5jbHVkZXMoXCJib3R0b21cIikpXG4gICAgICB3aW5JbmRpY2F0b3JCb3R0b21MaW5lLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgd2luQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG5cbiAgICBkaXNhYmxlU3BpbigpO1xuICAgIGRpc2FibGVIb2xkcygpO1xuXG4gICAgaWYgKGN1cnJlbnRUaW1lIC0gbm93ID4gMSkge1xuICAgICAgbm93ID0gY3VycmVudFRpbWU7XG4gICAgICBsZXQgc2tpcCA9IHRoaXMud2luQW1vdW50ID4gNTAwID8gMTAgOiAxO1xuICAgICAgdGhpcy5jdXJyZW50V2luRGlzcGxheSArPSBza2lwO1xuICAgICAgd2luLmN1cnJlbnRXaW4gPSB0aGlzLndpbkFtb3VudDtcbiAgICAgIHdpbi5yZW5kZXIoKTtcblxuICAgICAgaWYgKHRoaXMuY3VycmVudFdpbkRpc3BsYXkgLSB0aGlzLm9sZFdpbkRpc3BsYXkgPj0gdGhpcy53aW5BbW91bnQpIHtcbiAgICAgICAgLy8gRmluaXNoZWQgbG9vcGluZ1xuICAgICAgICBjcmVkaXRzLmFkZENyZWRpdCh0aGlzLndpbkFtb3VudCk7XG4gICAgICAgIGNyZWRpdHMucmVuZGVyKCk7XG4gICAgICAgIHRoaXMub2xkV2luRGlzcGxheSA9IHRoaXMuY3VycmVudFdpbkRpc3BsYXk7XG4gICAgICAgIHdpbi5yZXNldCgpO1xuICAgICAgICB3aW4ucmVuZGVyKCk7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcbiAgICAgICAgZW5hYmxlU3BpbigpO1xuICAgICAgICB3aW5Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgdmlld3BvcnRDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgd2luSW5kaWNhdG9yTGVmdC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICB3aW5JbmRpY2F0b3JSaWdodC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICB3aW5JbmRpY2F0b3JUb3BMaW5lLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIHdpbkluZGljYXRvckNlbnRyZUxpbmUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgd2luSW5kaWNhdG9yQm90dG9tTGluZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuXG4gICAgICAgIC8vIENoZWNrIGNyZWRpdHNcbiAgICAgICAgaWYgKGNyZWRpdHMuY3JlZGl0c1JlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5nYW1lT3ZlcjtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvLyBHYW1lIG92ZXIgLSBjcmVkaXRzIHJhbiBvdXRcbiAgZ2FtZU92ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG4gICAgZGlzYWJsZVNwaW4oKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChwbGF5U2VjdGlvbik7XG5cbiAgICAgIGRpc2FibGVOdWRnZXMoKTtcbiAgICAgIGRpc2FibGVIb2xkcygpO1xuXG4gICAgICByZW5kZXJHYW1lT3ZlclNlY3Rpb24oKTtcblxuICAgICAgdGhpcy53aW5BbW91bnQgPSAwO1xuICAgICAgdGhpcy5vbGRXaW5EaXNwbGF5ID0gMDtcbiAgICAgIHRoaXMuY3VycmVudFdpbkRpc3BsYXkgPSAwO1xuICAgIH0sIDEwMDApO1xuICB9LFxufTtcblxuY29uc3QgcmVuZGVyR2FtZU92ZXJTZWN0aW9uID0gKCkgPT4ge1xuICBjb25zdCBnYW1lT3ZlclNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBnYW1lT3ZlclNlY3Rpb24uaWQgPSBcImdhbWVPdmVyU2VjdGlvblwiO1xuXG4gIGdhbWVPdmVyU2VjdGlvbi5pbm5lckhUTUwgPSBcIjxkaXY+XCI7XG4gIGdhbWVPdmVyU2VjdGlvbi5pbm5lckhUTUwgKz0gXCI8cD5HYW1lIG92ZXI8L3A+XCI7XG4gIGdhbWVPdmVyU2VjdGlvbi5pbm5lckhUTUwgKz0gXCI8cD5Zb3Ugd29uIFwiICsgd2luLmN1cnJlbnRXaW4gKyBcIiBjcmVkaXRzXCI7XG4gIGdhbWVPdmVyU2VjdGlvbi5pbm5lckhUTUwgKz0gXCI8cD5QcmVzcyBzdGFydCB0byBwbGF5IGFnYWluPC9wPlwiO1xuICBnYW1lT3ZlclNlY3Rpb24uaW5uZXJIVE1MICs9IFwiPC9kaXY+XCI7XG5cbiAgY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBzdGFydEJ1dHRvbi5pZCA9IFwic3RhcnRCdXR0b25cIjtcbiAgc3RhcnRCdXR0b24uY2xhc3NMaXN0LmFkZChcImJ1dHRvblwiKTtcbiAgc3RhcnRCdXR0b24uaW5uZXJUZXh0ID0gXCJTVEFSVFwiO1xuXG4gIGdhbWVPdmVyU2VjdGlvbi5hcHBlbmRDaGlsZChzdGFydEJ1dHRvbik7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChnYW1lT3ZlclNlY3Rpb24pO1xuXG4gIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChnYW1lT3ZlclNlY3Rpb24pO1xuXG4gICAgcGxheVNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHBsYXlTZWN0aW9uLmlkID0gXCJwbGF5U2VjdGlvblwiO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocGxheVNlY3Rpb24pO1xuXG4gICAgaW5pdCgpO1xuICB9KTtcbn07XG5cbi8vIFByZWxvYWQgaW1hZ2VzIHRoZW4gc3RhcnQgZ2FtZVxudmFyIGxvYWRlZCA9IDA7XG52YXIgaW1hZ2VMaXN0ID0gW107XG5sZXQgaW1nO1xuXG5JVEVNX0lORk8uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgaW1nLnNyYyA9IFwiLi9pbWcvXCIgKyBpdGVtLmltYWdlU3JjO1xuICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgIGxvYWRlZCsrO1xuICAgIGlmIChsb2FkZWQgPT09IElURU1fSU5GTy5sZW5ndGgpIGluaXQoKTtcbiAgfTtcbn0pO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==