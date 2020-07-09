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
      if (this.creditsRemaining > 5000) {
        alert("You must checkout $5,000, your balance would be left in your wallet");
        this.creditsRemaining = this.creditsRemaining - 5000;
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9jcmVkaXRzLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvZGlnaXRzLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvaG9sZEJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2hvbGRCdXR0b25zLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvbnVkZ2VCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9udWRnZUJ1dHRvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9udWRnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9yZWVsLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvcmVlbEl0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9yZWVscy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL3ZpZXdwb3J0LmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvd2luLmpzIiwid2VicGFjazovLy8uL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc2Nzcy9hcHAuc2NzcyJdLCJuYW1lcyI6WyJjcmVkaXRzIiwiY3JlZGl0c1JlbWFpbmluZyIsIkNSRURJVFMiLCJkaWdpdHMiLCJjb250YWluZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWRkQ3JlZGl0IiwiYW1vdW50IiwiYWxlcnQiLCJ1c2VDcmVkaXQiLCJyZXNldCIsInJlbmRlciIsImRpZ2l0c1N0cmluZyIsInRvU3RyaW5nIiwiZGlnaXRDb250YWluZXJzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImRpZ2l0SW5kZXgiLCJpIiwibGVuZ3RoIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiaW5uZXJIVE1MIiwiYWRkIiwiaG9sZEJ1dHRvbiIsImluZGV4IiwicmVlbE5vIiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwid2lkdGgiLCJCVVRUT05fV0lEVEgiLCJtYXJnaW5MZWZ0IiwiUkVFTF9TUEFDSU5HIiwiUkVFTF9XSURUSCIsIm1hcmdpblJpZ2h0IiwiYXBwZW5kQ2hpbGQiLCJob2xkQnV0dG9ucyIsIm5ld0J1dHRvbiIsImJ1dHRvbkxpc3QiLCJidWlsZCIsIk5PX1JFRUxTIiwicHVzaCIsImZvckVhY2giLCJidG4iLCJudWRnZUJ1dHRvbiIsIm51ZGdlQnV0dG9uQ29udGFpbmVyIiwibnVkZ2VCdXR0b25zIiwibnVkZ2VzIiwibnVkZ2VzUmVtYWluaW5nIiwibW92ZUFycmF5SXRlbVRvTmV3SW5kZXgiLCJhcnIiLCJvbGRfaW5kZXgiLCJuZXdfaW5kZXgiLCJrIiwidW5kZWZpbmVkIiwic3BsaWNlIiwiY29uc29sZSIsImxvZyIsInJlZWwiLCJmaXJzdEl0ZW0iLCJsYXN0SXRlbSIsIm51ZGdlQ2FsbFRpbWVzIiwiU0VMRUNUX0dBTUVfTU9ERSIsIlNFTEVDVF9JVEVNX1NFTEVDVE9SIiwiU0VMRUNUX1JPV19TRUxFQ1RPUiIsIm5vT2ZJdGVtcyIsIk5PX0lURU1TIiwiaXRlbUxpc3QiLCJJVEVNX0xJU1QiLCJyZWVsU3BlZWQiLCJSRUVMX1NQRUVEIiwibnVkZ2VTcGVlZCIsInJ1blRpbWUiLCJjYW5Ib2xkIiwiaXNIZWxkIiwiY2FuTnVkZ2UiLCJpc051ZGdpbmciLCJudWRnZUZyYW1lcyIsIklURU1fSEVJR0hUIiwiTlVER0VfU1BFRUQiLCJudWRnZUZyYW1lIiwicmVlbEl0ZW1zIiwiaXRlbU5vIiwidHlwZSIsImluc3RhbmNlcyIsImltYWdlU3JjIiwid2luQW1vdW50IiwieCIsInkiLCJuZXdSZWVsSXRlbSIsIklURU1fSU5GTyIsIml0ZW0iLCJWSUVXUE9SVF9YIiwiVklFV1BPUlRfWSIsImltZyIsIkltYWdlIiwic3JjIiwic2h1ZmZsZSIsInJlc2V0Q29vcmRzIiwicm5kIiwidGVtcCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIm51ZGdlIiwic2hpZnQiLCJWSUVXUE9SVF9IRUlHSFQiLCJyZXNldFJ1bnRpbWUiLCJtb3ZlIiwicmVlbEl0ZW0iLCJ2YWx1ZSIsInByZXZJbmRleCIsImZpbmRJbmRleCIsInBhcnNlSW50IiwibWFwUm93VG9TdHJpbmciLCJ0b3AiLCJtaWRkbGUiLCJib3R0b20iLCJuZXh0SW5kZXgiLCJzcGVlZCIsImN0eCIsImdldENvbnRleHQiLCJkcmF3SW1hZ2UiLCJJVEVNX1dJRFRIIiwicmVlbHMiLCJuZXdSZWVsIiwicmVlbExpc3QiLCJyZXNldFJ1bnRpbWVzIiwidmlld3BvcnQiLCJuZXdWaWV3cG9ydCIsIlZJRVdQT1JUX1dJRFRIIiwiaGVpZ2h0IiwiaWQiLCJ2aWV3cG9ydENvbnRhaW5lciIsImNsZWFyIiwiY2xlYXJSZWN0Iiwid2luIiwiY3VycmVudFdpbiIsImFkZFdpbiIsIndpbkNvbnRhaW5lciIsIm51ZGdlc0NvbnRhaW5lciIsInBsYXlTZWN0aW9uIiwic2VsZWN0X2dhbWVNb2RlIiwic2VsZWN0X2l0ZW1TZWxlY3RvciIsInNlbGVjdF9yb3dTZWxlY3RvciIsImRpdl9maXhlZE1vZGVPcHRpb25zIiwiaG9sZEJ1dHRvbkNvbnRhaW5lciIsIndpbkluZGljYXRvckxlZnQiLCJ3aW5JbmRpY2F0b3JSaWdodCIsIndpbkluZGljYXRvclRvcExpbmUiLCJ3aW5JbmRpY2F0b3JDZW50cmVMaW5lIiwid2luSW5kaWNhdG9yQm90dG9tTGluZSIsInNwaW5CdXR0b24iLCJudWRnZUJ1dHRvbkxpc3QiLCJob2xkQnV0dG9uTGlzdCIsIndpbm5pbmdSb3dzIiwiZ2FtZUxvb3AiLCJudWRnZUNoYW5jZSIsImhvbGRDaGFuY2UiLCJjYW5TcGluIiwibm93IiwicmVlbHNSdW5uaW5nIiwic3BpblR5cGUiLCJpbml0IiwicmVuZGVyVmlld3BvcnRDb250YWluZXIiLCJyZWVsQ29udGFpbmVyIiwicmVlbENvbnRhaW5lclgiLCJyZWVsQ29udGFpbmVyWSIsInJlZWxDb250YWluZXJXIiwicmVlbENvbnRhaW5lckgiLCJWSUVXUE9SVF9DT05UQUlORVJfUEFERElOR19YIiwiUkVFTF9DT05UQUlORVJfUEFERElORyIsIlZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1kiLCJwb3NpdGlvbiIsImxlZnQiLCJyZW5kZXJXaW5JbmRpY2F0b3JzIiwicmVuZGVyTnVkZ2VCdXR0b25Db250YWluZXIiLCJhZGRFdmVudExpc3RlbmVyIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibG9vcCIsImdhbWVTdGF0ZXMiLCJjdXJyZW50U3RhdGUiLCJyZW5kZXJIb2xkQnV0dG9uQ29udGFpbmVyIiwiZXZlbnQiLCJ0YXJnZXQiLCJyZW5kZXJTcGluQnV0dG9uIiwiZW5hYmxlU3BpbiIsImVuYWJsZUdhbWVNb2RlIiwiZGlzYWJsZU51ZGdlcyIsImRpc2FibGVTcGluIiwiZGlzYWJsZUdhbWVNb2RlIiwic3BpbiIsImVsZW1lbnQiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwib2Zmc2V0V2lkdGgiLCJjdXJyZW50VGltZSIsIm1vdmVSZWVscyIsImNoZWNrV2luIiwic3BpblJlc3VsdCIsInJlZWxSZXN1bHQiLCJyZXN1bHQiLCJnZXRBbGxSb3dSZXN1bHRzIiwiY3VycmVudFdpbkFtb3VudCIsIndpbm5pbmdDYXNlIiwiY2hlcnJ5IiwidmFsaWRhdGUiLCJ0ZXN0IiwiY2hlcnJ5T3I3IiwiYW55QmFyIiwicm93IiwiYXNzaWduTnVkZ2VzIiwibnVkZ2VSYW5kb20iLCJlbmFibGVOdWRnZXMiLCJhc3NpZ25Ib2xkcyIsImhvbGRSYW5kb20iLCJidXR0b25TdHlsZXMiLCJlbmFibGVIb2xkcyIsImNhbmhvbGQiLCJkaXNhYmxlSG9sZHMiLCJkaXNhYmxlZCIsImFkZFJlbW92ZSIsImNsYXNzTmFtZSIsIm9sZFdpbkRpc3BsYXkiLCJjdXJyZW50V2luRGlzcGxheSIsImZpbHRlciIsInNwaW5GaW5pc2hlZCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiZ2FtZU92ZXIiLCJpbmNsdWRlcyIsInNraXAiLCJzZXRUaW1lb3V0IiwiYm9keSIsInJlbW92ZUNoaWxkIiwicmVuZGVyR2FtZU92ZXJTZWN0aW9uIiwiZ2FtZU92ZXJTZWN0aW9uIiwic3RhcnRCdXR0b24iLCJpbm5lclRleHQiLCJsb2FkZWQiLCJpbWFnZUxpc3QiLCJvbmxvYWQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRmE7Ozs7OztBQUViOzs7Ozs7QUFFQSxJQUFNQSxVQUFVLFNBQVZBLE9BQVUsR0FBTTtBQUNwQixTQUFPO0FBQ0xDLHNCQUFrQkMsT0FEYjtBQUVMQyxZQUFRLHVCQUZIO0FBR0xDLGVBQVdDLFNBQVNDLGNBQVQsQ0FBd0IsU0FBeEIsQ0FITjtBQUlMQyxlQUFXLG1CQUFVQyxNQUFWLEVBQWtCO0FBQzNCLFdBQUtQLGdCQUFMLElBQXlCTyxNQUF6QjtBQUNBLFVBQUksS0FBS1AsZ0JBQUwsR0FBd0IsSUFBNUIsRUFBa0M7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WixDQUFzQkcsR0FBdEIsQ0FBMEIsUUFBMUI7QUFDQXVOLGNBQVlDLFNBQVosR0FBd0IsT0FBeEI7O0FBRUFGLGtCQUFnQjFNLFdBQWhCLENBQTRCMk0sV0FBNUI7O0FBRUF6TyxXQUFTcU8sSUFBVCxDQUFjdk0sV0FBZCxDQUEwQjBNLGVBQTFCOztBQUVBQyxjQUFZN0QsZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0MsWUFBTTtBQUMxQzVLLGFBQVNxTyxJQUFULENBQWNDLFdBQWQsQ0FBMEJFLGVBQTFCOztBQUVBaEcsa0JBQWN4SSxTQUFTc0IsYUFBVCxDQUF1QixLQUF2QixDQUFkO0FBQ0FrSCxnQkFBWVQsRUFBWixHQUFpQixhQUFqQjtBQUNBL0gsYUFBU3FPLElBQVQsQ0FBY3ZNLFdBQWQsQ0FBMEIwRyxXQUExQjs7QUFFQXNCO0FBQ0QsR0FSRDtBQVNELENBNUJEOztBQThCQTtBQUNBLElBQUk2RSxTQUFTLENBQWI7QUFDQSxJQUFJQyxZQUFZLEVBQWhCO0FBQ0EsSUFBSW5KLFlBQUo7O0FBRUFKLFVBQVVoRCxPQUFWLENBQWtCLFVBQUNpRCxJQUFELEVBQVU7QUFDMUJHLFFBQU0sSUFBSUMsS0FBSixFQUFOO0FBQ0FELE1BQUlFLEdBQUosR0FBVSxXQUFXTCxLQUFLTixRQUExQjtBQUNBUyxNQUFJb0osTUFBSixHQUFhLFlBQU07QUFDakJGO0FBQ0EsUUFBSUEsV0FBV3RKLFVBQVV2RSxNQUF6QixFQUFpQ2dKO0FBQ2xDLEdBSEQ7QUFJRCxDQVBELEU7Ozs7Ozs7Ozs7O0FDenhCQSx1QyIsImZpbGUiOiIuL2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vanMvbWFpbi5qc1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgZGlnaXRzIGZyb20gXCIuL2RpZ2l0c1wiO1xuXG5jb25zdCBjcmVkaXRzID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGNyZWRpdHNSZW1haW5pbmc6IENSRURJVFMsXG4gICAgZGlnaXRzOiBkaWdpdHMoKSxcbiAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3JlZGl0c1wiKSxcbiAgICBhZGRDcmVkaXQ6IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgIHRoaXMuY3JlZGl0c1JlbWFpbmluZyArPSBhbW91bnQ7XG4gICAgICBpZiAodGhpcy5jcmVkaXRzUmVtYWluaW5nID4gNTAwMCkge1xuICAgICAgICBhbGVydChcbiAgICAgICAgICBcIllvdSBtdXN0IGNoZWNrb3V0ICQ1LDAwMCwgeW91ciBiYWxhbmNlIHdvdWxkIGJlIGxlZnQgaW4geW91ciB3YWxsZXRcIlxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNyZWRpdHNSZW1haW5pbmcgPSB0aGlzLmNyZWRpdHNSZW1haW5pbmcgLSA1MDAwO1xuICAgICAgfVxuICAgIH0sXG4gICAgdXNlQ3JlZGl0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmNyZWRpdHNSZW1haW5pbmctLTtcbiAgICB9LFxuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmNyZWRpdHNSZW1haW5pbmcgPSBDUkVESVRTO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmRpZ2l0cy5kaWdpdHNTdHJpbmcgPSB0aGlzLmNyZWRpdHNSZW1haW5pbmcudG9TdHJpbmcoKTtcbiAgICAgIHRoaXMuZGlnaXRzLmNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgdGhpcy5kaWdpdHMucmVuZGVyKCk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWRpdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGRpZ2l0cyA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBkaWdpdHNTdHJpbmc6IG51bGwsXG4gICAgICAgIGNvbnRhaW5lcjogbnVsbCwgLy8gQ29udGFpbmVyIHRoYXQgaG9sZHMgZGlnaXRDb250YWluZXJzXG4gICAgICAgIGRpZ2l0Q29udGFpbmVyczogbnVsbCwgLy8gTGlzdCBvZiBkaWdpdCBjb250YWluZXJzIHRoYXQgaG9sZCBzaW5nbGUgZGlnaXQgZWFjaFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIC8vIFNwbGl0IG51bWJlciBpbnRvIHNlcGVyYXRlIGNoYXJhY3RlcnNcbiAgICAgICAgICAgIHRoaXMuZGlnaXRDb250YWluZXJzID0gdGhpcy5jb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGlnaXQtbnVtYmVyJyk7IFxuICAgICAgICAgICAgbGV0IGRpZ2l0SW5kZXg7IC8vIFdoaWNoIGRpZ2l0IGNvbnRhaW5lciB0byBwdXQgbnVtYmVyIGluXG5cbiAgICAgICAgICAgIC8vIFdpcGUgdGhlIGRpZ2l0c1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRpZ2l0Q29udGFpbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlnaXRDb250YWluZXJzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlnaXRDb250YWluZXJzW2ldLmlubmVySFRNTCA9ICc4JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUG9wdWxhdGUgdGhlIGRpZ2l0c1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRpZ2l0c1N0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGRpZ2l0SW5kZXggPSAodGhpcy5kaWdpdENvbnRhaW5lcnMubGVuZ3RoKSAtICh0aGlzLmRpZ2l0c1N0cmluZy5sZW5ndGggLSBpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpZ2l0Q29udGFpbmVyc1tkaWdpdEluZGV4XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpZ2l0Q29udGFpbmVyc1tkaWdpdEluZGV4XS5pbm5lckhUTUwgPSB0aGlzLmRpZ2l0c1N0cmluZ1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBkaWdpdHM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBob2xkQnV0dG9uID0gKGluZGV4KSA9PiB7XG4gICAgbGV0IGhvbGRCdXR0b247XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob2xkQnV0dG9ucycpLFxuICAgICAgICByZWVsTm86IGluZGV4LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGhvbGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGhvbGRCdXR0b24uaW5uZXJIVE1MID0gJ0hPTEQnO1xuICAgICAgICAgICAgaG9sZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdob2xkLWJ1dHRvbicsICdidXR0b24nKTtcbiAgICAgICAgICAgIGhvbGRCdXR0b24uc3R5bGUud2lkdGggPSBCVVRUT05fV0lEVEggKyAncHgnO1xuICAgICAgICAgICAgaG9sZEJ1dHRvbi5zdHlsZS5tYXJnaW5MZWZ0ID0gKFJFRUxfU1BBQ0lORyAvIDIpICsgKChSRUVMX1dJRFRIIC0gQlVUVE9OX1dJRFRIKSAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIGhvbGRCdXR0b24uc3R5bGUubWFyZ2luUmlnaHQgPSAoUkVFTF9TUEFDSU5HIC8gMikgKyAoKFJFRUxfV0lEVEggLSBCVVRUT05fV0lEVEgpIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoaG9sZEJ1dHRvbik7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaG9sZEJ1dHRvbjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBob2xkQnV0dG9uIGZyb20gJy4vaG9sZEJ1dHRvbic7XG5cbmNvbnN0IGhvbGRCdXR0b25zID0gKCkgPT4ge1xuICAgIGxldCBuZXdCdXR0b247XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBidXR0b25MaXN0OiBbXSxcbiAgICAgICAgYnVpbGQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTk9fUkVFTFM7IGkrKykge1xuICAgICAgICAgICAgICAgIG5ld0J1dHRvbiA9IGhvbGRCdXR0b24oaSk7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25MaXN0LnB1c2gobmV3QnV0dG9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbkxpc3QuZm9yRWFjaCgoYnRuLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGJ0bi5yZW5kZXIoaW5kZXgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaG9sZEJ1dHRvbnM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBudWRnZUJ1dHRvbiA9IChpbmRleCkgPT4ge1xuICAgIGxldCBudWRnZUJ1dHRvbjtcbiAgICBsZXQgbnVkZ2VCdXR0b25Db250YWluZXI7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdudWRnZUJ1dHRvbnMnKSxcbiAgICAgICAgcmVlbE5vOiBpbmRleCxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBudWRnZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgbnVkZ2VCdXR0b24uaW5uZXJIVE1MID0gJ05VREdFJztcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ251ZGdlLWJ1dHRvbicsICdidXR0b24nKTtcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uLnN0eWxlLndpZHRoID0gQlVUVE9OX1dJRFRIICsgJ3B4JztcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uLnN0eWxlLm1hcmdpbkxlZnQgPSAoUkVFTF9TUEFDSU5HIC8gMikgKyAoKFJFRUxfV0lEVEggLSBCVVRUT05fV0lEVEgpIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgbnVkZ2VCdXR0b24uc3R5bGUubWFyZ2luUmlnaHQgPSAoUkVFTF9TUEFDSU5HIC8gMikgKyAoKFJFRUxfV0lEVEggLSBCVVRUT05fV0lEVEgpIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQobnVkZ2VCdXR0b24pO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG51ZGdlQnV0dG9uOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IG51ZGdlQnV0dG9uIGZyb20gJy4vbnVkZ2VCdXR0b24nO1xuXG5jb25zdCBudWRnZUJ1dHRvbnMgPSAoKSA9PiB7XG4gICAgbGV0IG5ld0J1dHRvbjtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGJ1dHRvbkxpc3Q6IFtdLFxuICAgICAgICBidWlsZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5PX1JFRUxTOyBpKyspIHtcbiAgICAgICAgICAgICAgICBuZXdCdXR0b24gPSBudWRnZUJ1dHRvbihpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbkxpc3QucHVzaChuZXdCdXR0b24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5idXR0b25MaXN0LmZvckVhY2goKGJ0biwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBidG4ucmVuZGVyKGluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG51ZGdlQnV0dG9uczsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBkaWdpdHMgZnJvbSAnLi9kaWdpdHMnO1xuXG5jb25zdCBudWRnZXMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbnVkZ2VzUmVtYWluaW5nOiAwLFxuICAgICAgICBkaWdpdHM6IGRpZ2l0cygpLFxuICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdudWRnZXMnKSxcbiAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5udWRnZXNSZW1haW5pbmcgPSAwO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLmRpZ2l0c1N0cmluZyA9IHRoaXMubnVkZ2VzUmVtYWluaW5nLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmRpZ2l0cy5jb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG51ZGdlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHJlZWxJdGVtIGZyb20gXCIuL3JlZWxJdGVtXCI7XG5cbmNvbnN0IG1vdmVBcnJheUl0ZW1Ub05ld0luZGV4ID0gKGFyciwgb2xkX2luZGV4LCBuZXdfaW5kZXgpID0+IHtcbiAgd2hpbGUgKG9sZF9pbmRleCA8IDApIHtcbiAgICBvbGRfaW5kZXggKz0gYXJyLmxlbmd0aDtcbiAgfVxuICB3aGlsZSAobmV3X2luZGV4IDwgMCkge1xuICAgIG5ld19pbmRleCArPSBhcnIubGVuZ3RoO1xuICB9XG4gIGlmIChuZXdfaW5kZXggPj0gYXJyLmxlbmd0aCkge1xuICAgIHZhciBrID0gbmV3X2luZGV4IC0gYXJyLmxlbmd0aCArIDE7XG4gICAgd2hpbGUgKGstLSkge1xuICAgICAgYXJyLnB1c2godW5kZWZpbmVkKTtcbiAgICB9XG4gIH1cbiAgYXJyLnNwbGljZShuZXdfaW5kZXgsIDAsIGFyci5zcGxpY2Uob2xkX2luZGV4LCAxKVswXSk7XG4gIGNvbnNvbGUubG9nKFwiTkVXIEFSUlwiLCBhcnIpO1xufTtcblxuY29uc3QgcmVlbCA9IChyZWVsTm8pID0+IHtcbiAgbGV0IGZpcnN0SXRlbTtcbiAgbGV0IGxhc3RJdGVtO1xuICBsZXQgbnVkZ2VDYWxsVGltZXM7XG5cbiAgY29uc3QgU0VMRUNUX0dBTUVfTU9ERSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZS1tb2RlXCIpO1xuICBjb25zdCBTRUxFQ1RfSVRFTV9TRUxFQ1RPUiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXRlbS1zZWxlY3RvclwiKTtcbiAgY29uc3QgU0VMRUNUX1JPV19TRUxFQ1RPUiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm93LXNlbGVjdG9yXCIpO1xuXG4gIHJldHVybiB7XG4gICAgbm9PZkl0ZW1zOiBOT19JVEVNUyxcbiAgICBpdGVtTGlzdDogSVRFTV9MSVNULFxuICAgIHJlZWxTcGVlZDogUkVFTF9TUEVFRCxcbiAgICBudWRnZVNwZWVkOiAxMCxcbiAgICBydW5UaW1lOiBSRUVMX1NQRUVEICogMTAgKyAyMCAqIHJlZWxObywgLy8gQXJiaXRyYXJ5IHZhbHVlcyBmb3IgdGVzdGluZ1xuICAgIGNhbkhvbGQ6IGZhbHNlLFxuICAgIGlzSGVsZDogZmFsc2UsXG4gICAgY2FuTnVkZ2U6IGZhbHNlLFxuICAgIGlzTnVkZ2luZzogZmFsc2UsXG4gICAgbnVkZ2VGcmFtZXM6IElURU1fSEVJR0hUIC8gTlVER0VfU1BFRUQsXG4gICAgbnVkZ2VGcmFtZTogMCxcbiAgICByZWVsSXRlbXM6IFtdLFxuICAgIHJlZWxObyxcbiAgICBidWlsZDogZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGl0ZW1ObyA9IDA7XG4gICAgICBsZXQgdHlwZTtcbiAgICAgIGxldCBpbnN0YW5jZXM7XG4gICAgICBsZXQgaW1hZ2VTcmM7XG4gICAgICBsZXQgd2luQW1vdW50O1xuICAgICAgbGV0IHg7XG4gICAgICBsZXQgeTtcbiAgICAgIGxldCBuZXdSZWVsSXRlbTtcblxuICAgICAgSVRFTV9JTkZPLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIHR5cGUgPSBpdGVtLnR5cGU7XG4gICAgICAgIGluc3RhbmNlcyA9IGl0ZW0uaW5zdGFuY2VzO1xuICAgICAgICBpbWFnZVNyYyA9IGl0ZW0uaW1hZ2VTcmM7XG4gICAgICAgIHdpbkFtb3VudCA9IGl0ZW0ud2luQW1vdW50O1xuXG4gICAgICAgIC8vIEFkZCByZXF1aXJlZCBubyBvZiBpbnN0YW5jZXMgb2YgdGhpcyBpdGVtIHRvIHRoZSByZWVsSXRlbXMgYXJyYXlcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnN0YW5jZXM7IGkrKykge1xuICAgICAgICAgIHggPVxuICAgICAgICAgICAgVklFV1BPUlRfWCArIHRoaXMucmVlbE5vICogUkVFTF9XSURUSCArIHRoaXMucmVlbE5vICogUkVFTF9TUEFDSU5HO1xuXG4gICAgICAgICAgeSA9IFZJRVdQT1JUX1kgLSBJVEVNX0hFSUdIVCAtIElURU1fSEVJR0hUICogaXRlbU5vIC0gMTAwO1xuXG4gICAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgaW1nLnNyYyA9IFwiLi9pbWcvXCIgKyBpdGVtLmltYWdlU3JjO1xuXG4gICAgICAgICAgbmV3UmVlbEl0ZW0gPSByZWVsSXRlbSh0eXBlLCBpdGVtTm8sIGltZywgeCwgeSwgd2luQW1vdW50KTtcbiAgICAgICAgICB0aGlzLnJlZWxJdGVtcy5wdXNoKG5ld1JlZWxJdGVtKTtcbiAgICAgICAgICBpdGVtTm8rKztcbiAgICAgICAgICAvLyB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNodWZmbGUoKTtcbiAgICAgIHRoaXMucmVzZXRDb29yZHMoKTtcbiAgICB9LFxuICAgIHNodWZmbGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBybmQ7XG4gICAgICBsZXQgdGVtcDtcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLnJlZWxJdGVtcy5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIHJuZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgICB0ZW1wID0gdGhpcy5yZWVsSXRlbXNbaV07XG4gICAgICAgIHRoaXMucmVlbEl0ZW1zW2ldID0gdGhpcy5yZWVsSXRlbXNbcm5kXTtcbiAgICAgICAgdGhpcy5yZWVsSXRlbXNbcm5kXSA9IHRlbXA7XG4gICAgICB9XG4gICAgfSxcbiAgICBudWRnZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5yZWVsSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLm51ZGdlKCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zaGlmdCgpO1xuXG4gICAgICB0aGlzLm51ZGdlRnJhbWUrKztcblxuICAgICAgaWYgKHRoaXMubnVkZ2VGcmFtZSA+PSB0aGlzLm51ZGdlRnJhbWVzKSB7XG4gICAgICAgIHRoaXMuaXNOdWRnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubnVkZ2VGcmFtZSA9IDA7XG4gICAgICB9XG4gICAgfSxcbiAgICByZXNldENvb3JkczogZnVuY3Rpb24gKCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJlZWxJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnJlZWxJdGVtc1tpXS55ID1cbiAgICAgICAgICBWSUVXUE9SVF9ZICsgVklFV1BPUlRfSEVJR0hUIC0gSVRFTV9IRUlHSFQgLSBJVEVNX0hFSUdIVCAqIGk7XG4gICAgICB9XG4gICAgfSxcbiAgICByZXNldFJ1bnRpbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghdGhpcy5pc0hlbGQpIHtcbiAgICAgICAgdGhpcy5ydW5UaW1lID0gUkVFTF9TUEVFRCAqIDEwICsgMjAgKiByZWVsTm87IC8vIEFyYml0cmFyeSB2YWx1ZXMgZm9yIHRlc3Rpbmc7XG4gICAgICB9XG4gICAgfSxcbiAgICBzaGlmdDogZnVuY3Rpb24gKCkge1xuICAgICAgLy8gSWYgYm90dG9tIHJlZWwgaXRlbSBnZXRzIGJlbG93IGJvdHRvbSBvZiB2aWV3cG9ydCB0aGVuIG1vdmUgaXQgdG8gYmVnaW5uaW5nIG9mIGFycmF5XG4gICAgICBpZiAodGhpcy5yZWVsSXRlbXNbMF0ueSA+PSBWSUVXUE9SVF9ZICsgVklFV1BPUlRfSEVJR0hUKSB7XG4gICAgICAgIGZpcnN0SXRlbSA9IHRoaXMucmVlbEl0ZW1zWzBdO1xuICAgICAgICBsYXN0SXRlbSA9IHRoaXMucmVlbEl0ZW1zW3RoaXMucmVlbEl0ZW1zLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIC8vIFJlc3QgeSBjb29yZHMgZm9yIGl0ZW0gdG8gc2hpZnQgdG8gdG9wIG9mIHJlZWxcbiAgICAgICAgZmlyc3RJdGVtLnkgPSBsYXN0SXRlbS55IC0gSVRFTV9IRUlHSFQ7XG5cbiAgICAgICAgLy8gU2hpZnQgYm90dG9tIGl0ZW0gdG8gdG9wXG4gICAgICAgIHRoaXMucmVlbEl0ZW1zLnB1c2godGhpcy5yZWVsSXRlbXMuc2hpZnQoKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnJlZWxJdGVtcy5mb3JFYWNoKChyZWVsSXRlbSkgPT4ge1xuICAgICAgICByZWVsSXRlbS5tb3ZlKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2hpZnQoKTtcbiAgICAgIC8vIFJlZHVjZSByZWVsIHJ1bnRpbWVcbiAgICAgIHRoaXMucnVuVGltZS0tO1xuICAgICAgaWYgKFNFTEVDVF9HQU1FX01PREUudmFsdWUgPT09IFwiZml4ZWRcIiAmJiB0aGlzLnJ1blRpbWUgPT09IDApIHtcbiAgICAgICAgbGV0IHByZXZJbmRleCA9IHRoaXMucmVlbEl0ZW1zLmZpbmRJbmRleChcbiAgICAgICAgICAoaXRlbSkgPT5cbiAgICAgICAgICAgIHBhcnNlSW50KGl0ZW0uaXRlbU5vKSA9PT0gcGFyc2VJbnQoU0VMRUNUX0lURU1fU0VMRUNUT1IudmFsdWUpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG1hcFJvd1RvU3RyaW5nID0ge1xuICAgICAgICAgIHRvcDogMixcbiAgICAgICAgICBtaWRkbGU6IDEsXG4gICAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICB9O1xuICAgICAgICBsZXQgbmV4dEluZGV4ID0gbWFwUm93VG9TdHJpbmdbU0VMRUNUX1JPV19TRUxFQ1RPUi52YWx1ZV07XG4gICAgICAgIGlmIChwcmV2SW5kZXggIT09IG5leHRJbmRleCkge1xuICAgICAgICAgIG1vdmVBcnJheUl0ZW1Ub05ld0luZGV4KHRoaXMucmVlbEl0ZW1zLCBwcmV2SW5kZXgsIG5leHRJbmRleCk7XG4gICAgICAgICAgdGhpcy5yZXNldENvb3JkcygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucmVlbEl0ZW1zLmZvckVhY2goKHJlZWxJdGVtKSA9PiB7XG4gICAgICAgIHJlZWxJdGVtLnJlbmRlcigpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlZWw7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgcmVlbEl0ZW0gPSAodHlwZSwgaXRlbU5vLCBpbWcsIHgsIHksIHdpbkFtb3VudCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGUsXG4gICAgaXRlbU5vLFxuICAgIGltZyxcbiAgICB4LFxuICAgIHksXG4gICAgd2luQW1vdW50LFxuICAgIHNwZWVkOiBSRUVMX1NQRUVELFxuICAgIG51ZGdlU3BlZWQ6IE5VREdFX1NQRUVELFxuICAgIGN0eDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWV3cG9ydFwiKS5nZXRDb250ZXh0KFwiMmRcIiksXG4gICAgbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy55ICs9IHRoaXMuc3BlZWQ7XG4gICAgfSxcbiAgICBudWRnZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy55ICs9IHRoaXMubnVkZ2VTcGVlZDtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKFxuICAgICAgICB0aGlzLmltZyxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgSVRFTV9XSURUSCxcbiAgICAgICAgSVRFTV9IRUlHSFQsXG4gICAgICAgIHRoaXMueCxcbiAgICAgICAgdGhpcy55LFxuICAgICAgICBJVEVNX1dJRFRILFxuICAgICAgICBJVEVNX0hFSUdIVFxuICAgICAgKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVlbEl0ZW07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHJlZWwgZnJvbSBcIi4vcmVlbFwiO1xuXG5jb25zdCByZWVscyA9ICgpID0+IHtcbiAgbGV0IG5ld1JlZWw7XG4gIHJldHVybiB7XG4gICAgcmVlbExpc3Q6IFtdLFxuICAgIGJ1aWxkOiBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5PX1JFRUxTOyBpKyspIHtcbiAgICAgICAgbmV3UmVlbCA9IHJlZWwoaSk7XG4gICAgICAgIG5ld1JlZWwuYnVpbGQoKTtcbiAgICAgICAgdGhpcy5yZWVsTGlzdC5wdXNoKG5ld1JlZWwpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgICAgIGlmIChyZWVsLnJ1blRpbWUgPiAwICYmICFyZWVsLmlzSGVsZCkge1xuICAgICAgICAgIHJlZWwubW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHJlc2V0UnVudGltZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgICAgICByZWVsLnJlc2V0UnVudGltZSgpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgICAgICByZWVsLnJlbmRlcigpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlZWxzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB2aWV3cG9ydCA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdWaWV3cG9ydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIG5ld1ZpZXdwb3J0LndpZHRoID0gVklFV1BPUlRfV0lEVEg7XG4gICAgbmV3Vmlld3BvcnQuaGVpZ2h0ID0gVklFV1BPUlRfSEVJR0hUO1xuICAgIG5ld1ZpZXdwb3J0LmlkID0gXCJ2aWV3cG9ydFwiO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdmlld3BvcnQ6IG5ld1ZpZXdwb3J0LFxuICAgICAgICB3aWR0aDogVklFV1BPUlRfV0lEVEgsXG4gICAgICAgIGhlaWdodDogVklFV1BPUlRfSEVJR0hULFxuICAgICAgICBjdHg6IG5ld1ZpZXdwb3J0LmdldENvbnRleHQoJzJkJyksXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3Qgdmlld3BvcnRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld3BvcnRDb250YWluZXInKTtcbiAgICAgICAgICAgIHZpZXdwb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMudmlld3BvcnQpO1xuICAgICAgICB9LFxuICAgICAgICBjbGVhcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHZpZXdwb3J0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgZGlnaXRzIGZyb20gXCIuL2RpZ2l0c1wiO1xuXG5jb25zdCB3aW4gPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgY3VycmVudFdpbjogMCxcbiAgICBkaWdpdHM6IGRpZ2l0cygpLFxuICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5cIiksXG4gICAgYWRkV2luOiBmdW5jdGlvbiAod2luQW1vdW50KSB7XG4gICAgICB0aGlzLmN1cnJlbnRXaW4gPSB3aW5BbW91bnQ7XG4gICAgfSxcbiAgICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5jdXJyZW50V2luID0gMDtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5kaWdpdHMuZGlnaXRzU3RyaW5nID0gdGhpcy5jdXJyZW50V2luLnRvU3RyaW5nKCk7XG4gICAgICB0aGlzLmRpZ2l0cy5jb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgIHRoaXMuZGlnaXRzLnJlbmRlcigpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aW47XG4iLCJpbXBvcnQgVmlld3BvcnQgZnJvbSBcIi4vY29tcG9uZW50cy92aWV3cG9ydFwiO1xuaW1wb3J0IFJlZWxzIGZyb20gXCIuL2NvbXBvbmVudHMvcmVlbHNcIjtcbmltcG9ydCBOdWRnZUJ1dHRvbnMgZnJvbSBcIi4vY29tcG9uZW50cy9udWRnZUJ1dHRvbnNcIjtcbmltcG9ydCBIb2xkQnV0dG9ucyBmcm9tIFwiLi9jb21wb25lbnRzL2hvbGRCdXR0b25zXCI7XG5pbXBvcnQgQ3JlZGl0cyBmcm9tIFwiLi9jb21wb25lbnRzL2NyZWRpdHNcIjtcbmltcG9ydCBXaW4gZnJvbSBcIi4vY29tcG9uZW50cy93aW5cIjtcbmltcG9ydCBOdWRnZXMgZnJvbSBcIi4vY29tcG9uZW50cy9udWRnZXNcIjtcblxuLy8gU2Fzc1xuaW1wb3J0IFwiLi4vc2Nzcy9hcHAuc2Nzc1wiO1xuXG4vLyBjcmVhdGVzIHRoZSBjYW52YXMgd2hpY2ggd2UgbmVlZCB0byBkcmF3IHVwb24gYW5kIGFzc2lnbnMgdG8gYSB2aWV3cG9ydCB2YXJpYWJsZVxuY29uc3Qgdmlld3BvcnQgPSBWaWV3cG9ydCgpO1xuLy8gY29uc3Qgc3BpbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcGluQnV0dG9uJyk7XG5jb25zdCB3aW5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpblwiKTtcbmNvbnN0IG51ZGdlc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibnVkZ2VzXCIpO1xubGV0IHBsYXlTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5U2VjdGlvblwiKTtcbmNvbnN0IHNlbGVjdF9nYW1lTW9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZS1tb2RlXCIpO1xuY29uc3Qgc2VsZWN0X2l0ZW1TZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXRlbS1zZWxlY3RvclwiKTtcbmNvbnN0IHNlbGVjdF9yb3dTZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm93LXNlbGVjdG9yXCIpO1xuY29uc3QgZGl2X2ZpeGVkTW9kZU9wdGlvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpeGVkLW1vZGUtb3B0aW9uc1wiKTtcblxubGV0IHZpZXdwb3J0Q29udGFpbmVyO1xubGV0IG51ZGdlQnV0dG9uQ29udGFpbmVyO1xubGV0IGhvbGRCdXR0b25Db250YWluZXI7XG5sZXQgd2luSW5kaWNhdG9yTGVmdDtcbmxldCB3aW5JbmRpY2F0b3JSaWdodDtcbmxldCB3aW5JbmRpY2F0b3JUb3BMaW5lO1xubGV0IHdpbkluZGljYXRvckNlbnRyZUxpbmU7XG5sZXQgd2luSW5kaWNhdG9yQm90dG9tTGluZTtcbmxldCBzcGluQnV0dG9uO1xubGV0IHJlZWxzO1xubGV0IG51ZGdlcztcbmxldCBudWRnZUJ1dHRvbnM7XG5sZXQgaG9sZEJ1dHRvbnM7XG5sZXQgbnVkZ2VCdXR0b25MaXN0O1xubGV0IGhvbGRCdXR0b25MaXN0O1xubGV0IGNyZWRpdHM7XG5sZXQgd2luO1xubGV0IHdpbm5pbmdSb3dzID0gW107XG5sZXQgZ2FtZUxvb3A7XG5sZXQgbnVkZ2VDaGFuY2UgPSAyOyAvLyBDaGFuY2Ugb2YgZ2V0dGluZyBudWRnZXMgYWZ0ZXIgc3BpbiAoMSBpbiBudWRnZUNoYW5jZSlcbmxldCBob2xkQ2hhbmNlID0gMjsgLy8gQ2hhbmNlIG9mIGdldHRpbmcgaG9sZHMgYWZ0ZXIgc3BpbiAoMSBpbiBob2xkQ2hhbmNlKVxubGV0IGNhblNwaW47XG5sZXQgY2FuTnVkZ2U7XG5sZXQgY2FuSG9sZDtcbmxldCBub3c7IC8vIEN1cnJlbnQgdGltZSB0byBjb21wYXJlIGFnYWluc3RcbmxldCByZWVsc1J1bm5pbmcgPSBbXTsgLy8gS2VlcHMgdHJhY2sgb2YgYW55IHJlZWxzIHdpdGggcnVudGltZSBsZWZ0IG9uIHRoZW0gdG8gZXN0Ymxpc2ggd2hldGhlciB0byByZXNldC9zdG9wIHNwaW4gZXRjLlxubGV0IHNwaW5UeXBlID0gXCJzcGluXCI7IC8vIEtlZXBzIHRyYWNrIG9mIHdoZXRoZXIgbGFzdCBzcGluIHdhcyByZWd1bGFyIHNwaW4gb3IgbnVkZ2VcblxuY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgcmVuZGVyVmlld3BvcnRDb250YWluZXIoKTtcblxuICAvLyBSZW5kZXIgdmlld3BvcnRcbiAgdmlld3BvcnQucmVuZGVyKCk7XG5cbiAgLy8gU2V0IHVwIHJlZWxzXG4gIHJlZWxzID0gUmVlbHMoKTtcbiAgcmVlbHMuYnVpbGQoKTtcbiAgcmVlbHMucmVuZGVyKCk7XG5cbiAgbGV0IHJlZWxDb250YWluZXI7XG4gIGxldCByZWVsQ29udGFpbmVyWDtcbiAgbGV0IHJlZWxDb250YWluZXJZO1xuICBsZXQgcmVlbENvbnRhaW5lclc7XG4gIGxldCByZWVsQ29udGFpbmVySDtcblxuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgLy8gUmVuZGVyIG91dGVyIGNvbnRhaW5lciBmb3IgZWFjaCByZWVsIGluIHRoZSB2aWV3cG9ydCBjb250YWluZXJcbiAgICByZWVsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgIHJlZWxDb250YWluZXJYID1cbiAgICAgIHJlZWwucmVlbEl0ZW1zWzBdLnggK1xuICAgICAgVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWCAtXG4gICAgICBSRUVMX0NPTlRBSU5FUl9QQURESU5HO1xuXG4gICAgcmVlbENvbnRhaW5lclkgPVxuICAgICAgcmVlbC5yZWVsSXRlbXNbMl0ueSArXG4gICAgICBWSUVXUE9SVF9DT05UQUlORVJfUEFERElOR19ZIC1cbiAgICAgIFJFRUxfQ09OVEFJTkVSX1BBRERJTkc7XG5cbiAgICByZWVsQ29udGFpbmVyVyA9IFJFRUxfV0lEVEggKyBSRUVMX0NPTlRBSU5FUl9QQURESU5HICogMjtcblxuICAgIHJlZWxDb250YWluZXJIID0gVklFV1BPUlRfSEVJR0hUICsgUkVFTF9DT05UQUlORVJfUEFERElORyAqIDI7XG5cbiAgICByZWVsQ29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIHJlZWxDb250YWluZXIuc3R5bGUudG9wID0gcmVlbENvbnRhaW5lclkgKyBcInB4XCI7XG4gICAgcmVlbENvbnRhaW5lci5zdHlsZS5sZWZ0ID0gcmVlbENvbnRhaW5lclggKyBcInB4XCI7XG4gICAgcmVlbENvbnRhaW5lci5zdHlsZS53aWR0aCA9IHJlZWxDb250YWluZXJXICsgXCJweFwiO1xuICAgIHJlZWxDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gcmVlbENvbnRhaW5lckggKyBcInB4XCI7XG4gICAgcmVlbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicmVlbC1jb250YWluZXJcIik7XG4gICAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQocmVlbENvbnRhaW5lcik7XG4gIH0pO1xuXG4gIHJlbmRlcldpbkluZGljYXRvcnMoKTtcblxuICByZW5kZXJOdWRnZUJ1dHRvbkNvbnRhaW5lcigpO1xuXG4gIC8vIFNldCB1cCBudWRnZSBidXR0b25zXG4gIG51ZGdlQnV0dG9ucyA9IE51ZGdlQnV0dG9ucygpO1xuICBudWRnZUJ1dHRvbnMuYnVpbGQoKTtcbiAgbnVkZ2VCdXR0b25zLnJlbmRlcigpO1xuXG4gIG51ZGdlQnV0dG9uTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJudWRnZS1idXR0b25cIik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudWRnZUJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBudWRnZUJ1dHRvbkxpc3RbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgY2FuU3BpbiAmJlxuICAgICAgICBjYW5OdWRnZSAmJlxuICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5jYW5OdWRnZSA9PT0gdHJ1ZSAmJlxuICAgICAgICBudWRnZXMubnVkZ2VzUmVtYWluaW5nID4gMFxuICAgICAgKSB7XG4gICAgICAgIHNwaW5UeXBlID0gXCJudWRnZVwiO1xuICAgICAgICBudWRnZXMubnVkZ2VzUmVtYWluaW5nIC09IDE7XG4gICAgICAgIHJlZWxzLnJlZWxMaXN0W2ldLmlzTnVkZ2luZyA9IHRydWU7XG4gICAgICAgIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgICBnYW1lU3RhdGVzLmN1cnJlbnRTdGF0ZSA9IGdhbWVTdGF0ZXMubnVkZ2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBTZXQgdXAgbnVkZ2VzXG4gIG51ZGdlcyA9IE51ZGdlcygpO1xuICBudWRnZXMucmVuZGVyKCk7XG5cbiAgcmVuZGVySG9sZEJ1dHRvbkNvbnRhaW5lcigpO1xuXG4gIC8vIFNldCB1cCBob2xkIGJ1dHRvbnNcbiAgaG9sZEJ1dHRvbnMgPSBIb2xkQnV0dG9ucygpO1xuICBob2xkQnV0dG9ucy5idWlsZCgpO1xuICBob2xkQnV0dG9ucy5yZW5kZXIoKTtcblxuICBob2xkQnV0dG9uTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJob2xkLWJ1dHRvblwiKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGhvbGRCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaG9sZEJ1dHRvbkxpc3RbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgaWYgKGNhblNwaW4gJiYgY2FuSG9sZCkge1xuICAgICAgICAvLyBUb2dnbGVcbiAgICAgICAgaWYgKHJlZWxzLnJlZWxMaXN0W2ldLmlzSGVsZCkge1xuICAgICAgICAgIC8vIFRha2UgaG9sZCBvZmZcbiAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQgPSBmYWxzZTtcbiAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5yZXNldFJ1bnRpbWUoKTtcbiAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImhlbGRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUHV0IGhvbGQgb25cbiAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQgPSB0cnVlO1xuICAgICAgICAgIHJlZWxzLnJlZWxMaXN0W2ldLnJ1blRpbWUgPSAwO1xuICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGVsZFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gU2V0IHVwIGNyZWRpdHNcbiAgY3JlZGl0cyA9IENyZWRpdHMoKTtcbiAgY3JlZGl0cy5yZXNldCgpO1xuICBjcmVkaXRzLnJlbmRlcigpO1xuXG4gIC8vIFNldCB1cCB3aW5cbiAgd2luID0gV2luKCk7XG4gIHdpbi5yZXNldCgpO1xuICB3aW4ucmVuZGVyKCk7XG5cbiAgcmVuZGVyU3BpbkJ1dHRvbigpO1xuXG4gIGNhblNwaW4gPSB0cnVlO1xuICBjYW5OdWRnZSA9IGZhbHNlO1xuICBjYW5Ib2xkID0gZmFsc2U7XG5cbiAgZW5hYmxlU3BpbigpO1xuICBlbmFibGVHYW1lTW9kZSgpO1xuXG4gIHNwaW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAoY2FuU3Bpbikge1xuICAgICAgY3JlZGl0cy51c2VDcmVkaXQoKTtcbiAgICAgIGNyZWRpdHMucmVuZGVyKCk7XG4gICAgICB3aW5uaW5nUm93cyA9IFtdO1xuICAgICAgZGlzYWJsZU51ZGdlcygpO1xuICAgICAgZGlzYWJsZVNwaW4oKTtcbiAgICAgIGRpc2FibGVHYW1lTW9kZSgpO1xuXG4gICAgICAvLyBEaXNhYmxlIGhvbGQgYnV0dG9ucyB0aGF0IGFyZW4ndCBoZWxkXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlZWxzLnJlZWxMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghcmVlbHMucmVlbExpc3RbaV0uaXNIZWxkKSB7XG4gICAgICAgICAgcmVlbHMucmVlbExpc3RbaV0uY2FuSG9sZCA9IGZhbHNlO1xuICAgICAgICAgIGhvbGRCdXR0b25MaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3BpblR5cGUgPSBcInNwaW5cIjtcbiAgICAgIGdhbWVTdGF0ZXMuY3VycmVudFN0YXRlID0gZ2FtZVN0YXRlcy5zcGluO1xuICAgICAgZ2FtZUxvb3AgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgICBnYW1lU3RhdGVzLmN1cnJlbnRTdGF0ZSgpO1xuICAgIH1cbiAgfSk7XG4gIHNlbGVjdF9nYW1lTW9kZS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgaWYgKHRoaXMudmFsdWUgPT09IFwiZml4ZWRcIikge1xuICAgICAgZGl2X2ZpeGVkTW9kZU9wdGlvbnMuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudmFsdWUgPT09IFwicmFuZG9tXCIpIHtcbiAgICAgIGRpdl9maXhlZE1vZGVPcHRpb25zLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHJlbmRlck51ZGdlQnV0dG9uQ29udGFpbmVyID0gKCkgPT4ge1xuICBudWRnZUJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG51ZGdlQnV0dG9uQ29udGFpbmVyLmlkID0gXCJudWRnZUJ1dHRvbnNcIjtcbiAgcGxheVNlY3Rpb24uYXBwZW5kQ2hpbGQobnVkZ2VCdXR0b25Db250YWluZXIpO1xufTtcblxuY29uc3QgcmVuZGVySG9sZEJ1dHRvbkNvbnRhaW5lciA9ICgpID0+IHtcbiAgaG9sZEJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGhvbGRCdXR0b25Db250YWluZXIuaWQgPSBcImhvbGRCdXR0b25zXCI7XG4gIHBsYXlTZWN0aW9uLmFwcGVuZENoaWxkKGhvbGRCdXR0b25Db250YWluZXIpO1xufTtcblxuY29uc3QgcmVuZGVyU3BpbkJ1dHRvbiA9ICgpID0+IHtcbiAgc3BpbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHNwaW5CdXR0b24uaWQgPSBcInNwaW5CdXR0b25cIjtcbiAgc3BpbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uXCIpO1xuICBzcGluQnV0dG9uLmlubmVySFRNTCA9IFwiU1BJTlwiO1xuICBwbGF5U2VjdGlvbi5hcHBlbmRDaGlsZChzcGluQnV0dG9uKTtcbn07XG5cbmNvbnN0IHJlbmRlclZpZXdwb3J0Q29udGFpbmVyID0gKCkgPT4ge1xuICAvLyBSZW5kZXIgdmlld3BvcnQgY29udGFpbmVyXG4gIHZpZXdwb3J0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdmlld3BvcnRDb250YWluZXIuaWQgPSBcInZpZXdwb3J0Q29udGFpbmVyXCI7XG4gIHZpZXdwb3J0Q29udGFpbmVyLnN0eWxlLnBhZGRpbmdMZWZ0ID0gVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWCArIFwicHhcIjtcbiAgdmlld3BvcnRDb250YWluZXIuc3R5bGUucGFkZGluZ1JpZ2h0ID0gVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWCArIFwicHhcIjtcbiAgdmlld3BvcnRDb250YWluZXIuc3R5bGUucGFkZGluZ1RvcCA9IFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1kgKyBcInB4XCI7XG4gIHZpZXdwb3J0Q29udGFpbmVyLnN0eWxlLnBhZGRpbmdCb3R0b20gPSBWSUVXUE9SVF9DT05UQUlORVJfUEFERElOR19ZICsgXCJweFwiO1xuICBwbGF5U2VjdGlvbi5hcHBlbmRDaGlsZCh2aWV3cG9ydENvbnRhaW5lcik7XG59O1xuXG5jb25zdCByZW5kZXJXaW5JbmRpY2F0b3JzID0gKCkgPT4ge1xuICAvLyBMZWZ0IGluZGljYXRvclxuICB3aW5JbmRpY2F0b3JMZWZ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIHdpbkluZGljYXRvckxlZnQuY2xhc3NMaXN0LmFkZChcIndpbi1pbmRpY2F0b3JcIiwgXCJsZWZ0XCIpO1xuICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZCh3aW5JbmRpY2F0b3JMZWZ0KTtcbiAgLy8gUmlnaHQgaW5kaWNhdG9yXG4gIHdpbkluZGljYXRvclJpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIHdpbkluZGljYXRvclJpZ2h0LmNsYXNzTGlzdC5hZGQoXCJ3aW4taW5kaWNhdG9yXCIsIFwicmlnaHRcIik7XG4gIHZpZXdwb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHdpbkluZGljYXRvclJpZ2h0KTtcblxuICAvLyBDZW50cmUgbGluZVxuICB3aW5JbmRpY2F0b3JDZW50cmVMaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgd2luSW5kaWNhdG9yQ2VudHJlTGluZS5jbGFzc0xpc3QuYWRkKFwid2luLWluZGljYXRvci1jZW50cmUtbGluZVwiKTtcblxuICB3aW5JbmRpY2F0b3JDZW50cmVMaW5lLnN0eWxlLmxlZnQgPSB3aW5JbmRpY2F0b3JMZWZ0Lm9mZnNldFdpZHRoICsgXCJweFwiO1xuXG4gIHdpbkluZGljYXRvckNlbnRyZUxpbmUuc3R5bGUud2lkdGggPVxuICAgIHZpZXdwb3J0Q29udGFpbmVyLm9mZnNldFdpZHRoIC1cbiAgICB3aW5JbmRpY2F0b3JMZWZ0Lm9mZnNldFdpZHRoIC1cbiAgICB3aW5JbmRpY2F0b3JSaWdodC5vZmZzZXRXaWR0aCArXG4gICAgXCJweFwiO1xuXG4gIHZpZXdwb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHdpbkluZGljYXRvckNlbnRyZUxpbmUpO1xuXG4gIC8vIFRvcCBsaW5lXG4gIHdpbkluZGljYXRvclRvcExpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB3aW5JbmRpY2F0b3JUb3BMaW5lLmNsYXNzTGlzdC5hZGQoXCJ3aW4taW5kaWNhdG9yLXRvcC1saW5lXCIpO1xuXG4gIHdpbkluZGljYXRvclRvcExpbmUuc3R5bGUubGVmdCA9IHdpbkluZGljYXRvckxlZnQub2Zmc2V0V2lkdGggKyBcInB4XCI7XG5cbiAgd2luSW5kaWNhdG9yVG9wTGluZS5zdHlsZS53aWR0aCA9XG4gICAgdmlld3BvcnRDb250YWluZXIub2Zmc2V0V2lkdGggLVxuICAgIHdpbkluZGljYXRvckxlZnQub2Zmc2V0V2lkdGggLVxuICAgIHdpbkluZGljYXRvclJpZ2h0Lm9mZnNldFdpZHRoICtcbiAgICBcInB4XCI7XG5cbiAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQod2luSW5kaWNhdG9yVG9wTGluZSk7XG5cbiAgLy8gQm90dG9tIGxpbmVcbiAgd2luSW5kaWNhdG9yQm90dG9tTGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHdpbkluZGljYXRvckJvdHRvbUxpbmUuY2xhc3NMaXN0LmFkZChcIndpbi1pbmRpY2F0b3ItYm90dG9tLWxpbmVcIik7XG5cbiAgd2luSW5kaWNhdG9yQm90dG9tTGluZS5zdHlsZS5sZWZ0ID0gd2luSW5kaWNhdG9yTGVmdC5vZmZzZXRXaWR0aCArIFwicHhcIjtcblxuICB3aW5JbmRpY2F0b3JCb3R0b21MaW5lLnN0eWxlLndpZHRoID1cbiAgICB2aWV3cG9ydENvbnRhaW5lci5vZmZzZXRXaWR0aCAtXG4gICAgd2luSW5kaWNhdG9yTGVmdC5vZmZzZXRXaWR0aCAtXG4gICAgd2luSW5kaWNhdG9yUmlnaHQub2Zmc2V0V2lkdGggK1xuICAgIFwicHhcIjtcblxuICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZCh3aW5JbmRpY2F0b3JCb3R0b21MaW5lKTtcbn07XG5cbmNvbnN0IGxvb3AgPSAoY3VycmVudFRpbWUpID0+IHtcbiAgZ2FtZUxvb3AgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7IC8vIE5lZWRzIHRvIGdvIGJlZm9yZSBsaW5lIGJlbG93IHRvIGtlZXAgYW5pbWF0aW9uZnJhbWVpZCB1cCB0byBkYXRlXG4gIGdhbWVTdGF0ZXMuY3VycmVudFN0YXRlKGN1cnJlbnRUaW1lKTtcbn07XG5cbmNvbnN0IG1vdmVSZWVscyA9ICgpID0+IHtcbiAgcmVlbHMubW92ZSgpO1xufTtcblxuY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuICB2aWV3cG9ydC5jbGVhcigpO1xuICByZWVscy5yZW5kZXIoKTtcblxuICAvLyBEaWdpdHNcbiAgbnVkZ2VzLnJlbmRlcigpO1xuICBjcmVkaXRzLnJlbmRlcigpO1xuICB3aW4ucmVuZGVyKCk7XG59O1xuXG4vLyBDYWxjdWxhdGVzIHdpbiBhbW91bnQsIGlmIHdpbm5pbmcgbGluZVxuY29uc3QgY2hlY2tXaW4gPSAoKSA9PiB7XG4gIGxldCBzcGluUmVzdWx0ID0gW107IC8vIEFycmF5IG9mIHJlZWwgcmVzdWx0cyBhZnRlciBzcGluIChhbGwgdGhyZWUgdmlzaWJsZSBvYmplY3RzIG9mIGVhY2ggcmVlbClcbiAgbGV0IHJlZWxSZXN1bHQ7IC8vIEluZGl2aWR1YWwgcmVlbCByZXN1bHQsIG1hZGUgb2YgdGhyZWUgb2JqZWN0cyAodmlzaWJsZSlcblxuICAvLyBDaGVjayBmb3Igd2luXG4gIHJlZWxzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwsIGluZGV4KSA9PiB7XG4gICAgcmVlbFJlc3VsdCA9IFtdOyAvLyBSZXN1bHQgb2YgaW5kaXZpZHVhbCByZWVsXG5cbiAgICByZWVsUmVzdWx0LnB1c2gocmVlbHMucmVlbExpc3RbaW5kZXhdLnJlZWxJdGVtc1swXSk7XG4gICAgcmVlbFJlc3VsdC5wdXNoKHJlZWxzLnJlZWxMaXN0W2luZGV4XS5yZWVsSXRlbXNbMV0pO1xuICAgIHJlZWxSZXN1bHQucHVzaChyZWVscy5yZWVsTGlzdFtpbmRleF0ucmVlbEl0ZW1zWzJdKTtcblxuICAgIHNwaW5SZXN1bHQucHVzaChyZWVsUmVzdWx0KTtcbiAgfSk7XG4gIGxldCByZXN1bHQgPSBnZXRBbGxSb3dSZXN1bHRzKHNwaW5SZXN1bHQpO1xuICBsZXQgY3VycmVudFdpbkFtb3VudCA9IDA7XG5cbiAgLy8gQWxsIHRoZSBwb3NzaWJsZSB3aW5uaW5nIHBvc3NpYmlsaXRpZXMgYW5kIGl0cyBwcml6ZXNcbiAgdmFyIHdpbm5pbmdDYXNlID0ge1xuICAgIHRvcDoge1xuICAgICAgY2hlcnJ5OiB7XG4gICAgICAgIHZhbGlkYXRlOiAvNHszfS8udGVzdChyZXN1bHRbXCJ0b3BcIl0pLFxuICAgICAgICB2YWx1ZTogMjAwMCxcbiAgICAgIH0sXG4gICAgICBcIjdcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzN7M30vLnRlc3QocmVzdWx0W1widG9wXCJdKSxcbiAgICAgICAgdmFsdWU6IDE1MCxcbiAgICAgIH0sXG4gICAgICBjaGVycnlPcjc6IHtcbiAgICAgICAgdmFsaWRhdGU6IC9bNC8zXXszfS8udGVzdChyZXN1bHRbXCJ0b3BcIl0pLFxuICAgICAgICB2YWx1ZTogNzUsXG4gICAgICB9LFxuICAgICAgXCIzeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMHszfS8udGVzdChyZXN1bHRbXCJ0b3BcIl0pLFxuICAgICAgICB2YWx1ZTogNTAsXG4gICAgICB9LFxuICAgICAgXCIyeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMnszfS8udGVzdChyZXN1bHRbXCJ0b3BcIl0pLFxuICAgICAgICB2YWx1ZTogMjAsXG4gICAgICB9LFxuICAgICAgXCIxeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMXszfS8udGVzdChyZXN1bHRbXCJ0b3BcIl0pLFxuICAgICAgICB2YWx1ZTogMTAsXG4gICAgICB9LFxuICAgICAgYW55QmFyOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvWzAxMl17M30vLnRlc3QocmVzdWx0W1widG9wXCJdKSxcbiAgICAgICAgdmFsdWU6IDUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgbWlkZGxlOiB7XG4gICAgICBjaGVycnk6IHtcbiAgICAgICAgdmFsaWRhdGU6IC80ezN9Ly50ZXN0KHJlc3VsdFtcIm1pZGRsZVwiXSksXG4gICAgICAgIHZhbHVlOiAxMDAwLFxuICAgICAgfSxcbiAgICAgIFwiN1wiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvM3szfS8udGVzdChyZXN1bHRbXCJtaWRkbGVcIl0pLFxuICAgICAgICB2YWx1ZTogMTUwLFxuICAgICAgfSxcbiAgICAgIGNoZXJyeU9yNzoge1xuICAgICAgICB2YWxpZGF0ZTogL1s0LzNdezN9Ly50ZXN0KHJlc3VsdFtcIm1pZGRsZVwiXSksXG4gICAgICAgIHZhbHVlOiA3NSxcbiAgICAgIH0sXG4gICAgICBcIjN4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8wezN9Ly50ZXN0KHJlc3VsdFtcIm1pZGRsZVwiXSksXG4gICAgICAgIHZhbHVlOiA1MCxcbiAgICAgIH0sXG4gICAgICBcIjJ4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8yezN9Ly50ZXN0KHJlc3VsdFtcIm1pZGRsZVwiXSksXG4gICAgICAgIHZhbHVlOiAyMCxcbiAgICAgIH0sXG4gICAgICBcIjF4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8xezN9Ly50ZXN0KHJlc3VsdFtcIm1pZGRsZVwiXSksXG4gICAgICAgIHZhbHVlOiAxMCxcbiAgICAgIH0sXG4gICAgICBhbnlCYXI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC9bMDEyXXszfS8udGVzdChyZXN1bHRbXCJtaWRkbGVcIl0pLFxuICAgICAgICB2YWx1ZTogNSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBib3R0b206IHtcbiAgICAgIGNoZXJyeToge1xuICAgICAgICB2YWxpZGF0ZTogLzR7M30vLnRlc3QocmVzdWx0W1wiYm90dG9tXCJdKSxcbiAgICAgICAgdmFsdWU6IDQwMDAsXG4gICAgICB9LFxuICAgICAgXCI3XCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8zezN9Ly50ZXN0KHJlc3VsdFtcImJvdHRvbVwiXSksXG4gICAgICAgIHZhbHVlOiAxNTAsXG4gICAgICB9LFxuICAgICAgY2hlcnJ5T3I3OiB7XG4gICAgICAgIHZhbGlkYXRlOiAvWzQvM117M30vLnRlc3QocmVzdWx0W1wiYm90dG9tXCJdKSxcbiAgICAgICAgdmFsdWU6IDc1LFxuICAgICAgfSxcbiAgICAgIFwiM3hCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzB7M30vLnRlc3QocmVzdWx0W1wiYm90dG9tXCJdKSxcbiAgICAgICAgdmFsdWU6IDUwLFxuICAgICAgfSxcbiAgICAgIFwiMnhCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzJ7M30vLnRlc3QocmVzdWx0W1wiYm90dG9tXCJdKSxcbiAgICAgICAgdmFsdWU6IDIwLFxuICAgICAgfSxcbiAgICAgIFwiMXhCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzF7M30vLnRlc3QocmVzdWx0W1wiYm90dG9tXCJdKSxcbiAgICAgICAgdmFsdWU6IDEwLFxuICAgICAgfSxcbiAgICAgIGFueUJhcjoge1xuICAgICAgICB2YWxpZGF0ZTogL1swMTJdezN9Ly50ZXN0KHJlc3VsdFtcImJvdHRvbVwiXSksXG4gICAgICAgIHZhbHVlOiA1LFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIC8vIExvb3AgdGhyb3VnaCB0aGUgd2lubmluZyBwb3NzaWJpbGl0aWVzXG4gIC8vIGNhc2Ugd2lubmluZyBkcmF3IHRoZSBsaW5lIGluIHRoZSB3aW5uaW5nIHJvd1xuICAvLyB1cGRhdGUgdGhlIHZpZXcgd2l0aCB0aGUgcHJpemUgdmFsdWVcbiAgZm9yIChsZXQgcm93IGluIHdpbm5pbmdDYXNlKSB7XG4gICAgZm9yIChsZXQgaXRlbSBpbiB3aW5uaW5nQ2FzZVtyb3ddKSB7XG4gICAgICBpZiAod2lubmluZ0Nhc2Vbcm93XVtpdGVtXS52YWxpZGF0ZSkge1xuICAgICAgICBjdXJyZW50V2luQW1vdW50ICs9IHdpbm5pbmdDYXNlW3Jvd11baXRlbV0udmFsdWU7XG5cbiAgICAgICAgd2lubmluZ1Jvd3MucHVzaChyb3cpO1xuICAgICAgICAvLyBCcmVhayBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChjdXJyZW50V2luQW1vdW50KSByZXR1cm4gY3VycmVudFdpbkFtb3VudDtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgZ2V0QWxsUm93UmVzdWx0cyA9IChzcGluUmVzdWx0KSA9PiB7XG4gIGxldCB0b3AgPSBcIlwiLFxuICAgIG1pZGRsZSA9IFwiXCIsXG4gICAgYm90dG9tID0gXCJcIjtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGluUmVzdWx0Lmxlbmd0aCAmJiBzcGluUmVzdWx0Lmxlbmd0aCA9PT0gMzsgaSsrKSB7XG4gICAgdG9wICs9IHNwaW5SZXN1bHRbaV1bMl0uaXRlbU5vLnRvU3RyaW5nKCk7XG4gICAgbWlkZGxlICs9IHNwaW5SZXN1bHRbaV1bMV0uaXRlbU5vLnRvU3RyaW5nKCk7XG4gICAgYm90dG9tICs9IHNwaW5SZXN1bHRbaV1bMF0uaXRlbU5vLnRvU3RyaW5nKCk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICB0b3AsXG4gICAgbWlkZGxlLFxuICAgIGJvdHRvbSxcbiAgfTtcbn07XG5cbi8vIFJhbmRvbWx5IGFzc2lnbiBudWRnZXNcbmNvbnN0IGFzc2lnbk51ZGdlcyA9ICgpID0+IHtcbiAgLy8gUmFuZG9tbHkgYXNzaWduIG51ZGdlc1xuICBjb25zdCBudWRnZVJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51ZGdlQ2hhbmNlICsgMSk7XG5cbiAgLy8gSWYgcmFuZG9tIGNoYW5jZSBpcyBtZXQgdGhlbiBhc3NpZ24gbnVkZ2VzXG4gIGlmIChudWRnZVJhbmRvbSA9PT0gbnVkZ2VDaGFuY2UpIHtcbiAgICBjYW5OdWRnZSA9IHRydWU7XG4gICAgZW5hYmxlTnVkZ2VzKCk7XG4gICAgbnVkZ2VzLm51ZGdlc1JlbWFpbmluZyA9IDU7XG4gICAgbnVkZ2VzLnJlbmRlcigpO1xuICB9IGVsc2UgaWYgKG51ZGdlcy5udWRnZXNSZW1haW5pbmcgPCAxKSB7XG4gICAgLy8gSWYgbm8gbnVkZ2VzIGxlZnQgaW4gYmFua1xuICAgIGNhbk51ZGdlID0gZmFsc2U7XG4gICAgZGlzYWJsZU51ZGdlcygpO1xuICB9XG59O1xuXG4vLyBSYW5kb21seSBhc3NpZ24gaG9sZHNcbmNvbnN0IGFzc2lnbkhvbGRzID0gKCkgPT4ge1xuICBjb25zdCBob2xkUmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaG9sZENoYW5jZSArIDEpO1xuXG4gIC8vIFJhbmRvbWx5IGFzc2lnbiBob2xkcyAoaWYgbm8gbnVkZ2VzIGxlZnQgaW4gYmFuaylcbiAgLy8gQXNzaWduIGhvbGQgaWYgcmFuZG9tIG51bWJlciBtZXQgYW5kIGxhc3Qgc3BpbiB3YXNuJ3QgYSB3aW5cbiAgaWYgKG51ZGdlcy5udWRnZXNSZW1haW5pbmcgPCAxKSB7XG4gICAgaWYgKGhvbGRSYW5kb20gPT09IGhvbGRDaGFuY2UpIHtcbiAgICAgIC8vIENhbiBob2xkXG4gICAgICBjYW5Ib2xkID0gdHJ1ZTtcbiAgICAgIGJ1dHRvblN0eWxlcyhob2xkQnV0dG9uTGlzdCwgXCJhZGRcIiwgXCJhY3RpdmVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbkhvbGQgPSBmYWxzZTtcbiAgICAgIGJ1dHRvblN0eWxlcyhob2xkQnV0dG9uTGlzdCwgXCJyZW1vdmVcIiwgXCJhY3RpdmVcIik7XG4gICAgICBidXR0b25TdHlsZXMoaG9sZEJ1dHRvbkxpc3QsIFwicmVtb3ZlXCIsIFwiaGVsZFwiKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIEVuYWJsZSBhbGwgbnVkZ2VzXG5jb25zdCBlbmFibGVOdWRnZXMgPSAoKSA9PiB7XG4gIHJlZWxzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcbiAgICAvLyBJZiB0aGUgcmVlbCBpc24ndCBoZWxkXG4gICAgaWYgKCFyZWVsLmlzSGVsZCkge1xuICAgICAgcmVlbC5jYW5OdWRnZSA9IHRydWU7XG4gICAgfVxuICB9KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG51ZGdlQnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIC8vIElmIHRoZSByZWVsIGlzbid0IGhlbGRcbiAgICBpZiAoIXJlZWxzLnJlZWxMaXN0W2ldLmlzSGVsZCkge1xuICAgICAgbnVkZ2VCdXR0b25MaXN0W2ldLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgfVxuICB9XG5cbiAgbnVkZ2VzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG59O1xuXG4vLyBFbmJhbGUgYWxsIGhvbGRzXG5jb25zdCBlbmFibGVIb2xkcyA9ICgpID0+IHtcbiAgcmVlbHMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgIHJlZWwuY2FuSG9sZCA9IHRydWU7XG4gIH0pO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaG9sZEJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBob2xkQnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICB9XG5cbiAgY2FuaG9sZCA9IHRydWU7XG59O1xuXG4vLyBEaXNhYmxlIGFsbCBudWRnZXNcbmNvbnN0IGRpc2FibGVOdWRnZXMgPSAoKSA9PiB7XG4gIHJlZWxzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcbiAgICByZWVsLmNhbk51ZGdlID0gZmFsc2U7XG4gIH0pO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbnVkZ2VCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgbnVkZ2VCdXR0b25MaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gIH1cblxuICBudWRnZXMucmVzZXQoKTtcblxuICBjYW5OdWRnZSA9IGZhbHNlO1xuXG4gIG51ZGdlc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xufTtcblxuLy8gRGlzYWJsZSBhbGwgaG9sZHNcbmNvbnN0IGRpc2FibGVIb2xkcyA9ICgpID0+IHtcbiAgcmVlbHMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgIHJlZWwuY2FuSG9sZCA9IGZhbHNlO1xuICAgIHJlZWwuaXNIZWxkID0gZmFsc2U7XG4gICAgaWYgKHJlZWwucnVuVGltZSA8IDEpIHtcbiAgICAgIHJlZWwucmVzZXRSdW50aW1lKCk7XG4gICAgfVxuICB9KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGhvbGRCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaG9sZEJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiLCBcImhlbGRcIik7XG4gIH1cblxuICBjYW5Ib2xkID0gZmFsc2U7XG59O1xuXG4vLyBFbmFibGUgc3BpblxuY29uc3QgZW5hYmxlU3BpbiA9ICgpID0+IHtcbiAgc3BpbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICBjYW5TcGluID0gdHJ1ZTtcbn07XG5cbi8vIERpc2JhbGUgc3BpblxuY29uc3QgZGlzYWJsZVNwaW4gPSAoKSA9PiB7XG4gIHNwaW5CdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgY2FuU3BpbiA9IGZhbHNlO1xufTtcblxuY29uc3QgZGlzYWJsZUdhbWVNb2RlID0gKCkgPT4ge1xuICBzZWxlY3RfZ2FtZU1vZGUuZGlzYWJsZWQgPSB0cnVlO1xuICBzZWxlY3RfaXRlbVNlbGVjdG9yLmRpc2FibGVkID0gdHJ1ZTtcbiAgc2VsZWN0X3Jvd1NlbGVjdG9yLmRpc2FibGVkID0gdHJ1ZTtcbn07XG5cbmNvbnN0IGVuYWJsZUdhbWVNb2RlID0gKCkgPT4ge1xuICBzZWxlY3RfZ2FtZU1vZGUuZGlzYWJsZWQgPSBmYWxzZTtcbiAgc2VsZWN0X2l0ZW1TZWxlY3Rvci5kaXNhYmxlZCA9IGZhbHNlO1xuICBzZWxlY3Rfcm93U2VsZWN0b3IuZGlzYWJsZWQgPSBmYWxzZTtcbn07XG5cbi8vIEFkZCBvciByZW1vdmUgZ3JvdXAgYnV0dG9uIHN0eWxlc1xuY29uc3QgYnV0dG9uU3R5bGVzID0gKGJ1dHRvbkxpc3QsIGFkZFJlbW92ZSwgY2xhc3NOYW1lKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhZGRSZW1vdmUgPT09IFwiYWRkXCIpIHtcbiAgICAgIGJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH0gZWxzZSBpZiAoYWRkUmVtb3ZlID09PSBcInJlbW92ZVwiKSB7XG4gICAgICBidXR0b25MaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIEdhbWUgc3RhdGVcbmNvbnN0IGdhbWVTdGF0ZXMgPSB7XG4gIGN1cnJlbnRTdGF0ZTogbnVsbCxcbiAgd2luQW1vdW50OiAwLFxuICBvbGRXaW5EaXNwbGF5OiAwLCAvLyBXaGVuIGxvb3BpbmcgdGhyb3VnaCB3aW4gaW5jcmVtZW50IC0gdGhpcyBpcyB0aGUgb3JpZ2luYWwgZmlndXJlXG4gIGN1cnJlbnRXaW5EaXNwbGF5OiAwLCAvLyBXaGVuIGxvb3BpbmcgdGhyb3VnaCB3aW4gYW1vdW50IC0gdGhpcyBpcyB0aGUgbmV3IGZpZ3VyZVxuXG4gIC8vIFJlZ3VsYXIgc3BpblxuICBzcGluOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zcGluVHlwZSA9IFwic3BpblwiO1xuICAgIGRpc2FibGVTcGluKCk7XG4gICAgZGlzYWJsZUdhbWVNb2RlKCk7XG4gICAgbW92ZVJlZWxzKCk7XG4gICAgcmVuZGVyKCk7XG5cbiAgICAvLyBGaWx0ZXIgcmVlbCBydW50aW1lcyAtIGlmIG9uZSBpcyBhYm92ZSB6ZXJvIHRoZW4gY2Fycnkgb25cbiAgICByZWVsc1J1bm5pbmcgPSByZWVscy5yZWVsTGlzdC5maWx0ZXIoKHJlZWwpID0+IHtcbiAgICAgIHJldHVybiByZWVsLnJ1blRpbWUgPiAwO1xuICAgIH0pO1xuXG4gICAgaWYgKCFyZWVsc1J1bm5pbmcubGVuZ3RoKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuc3BpbkZpbmlzaGVkO1xuICAgIH1cbiAgfSxcbiAgLy8gU3BpbiBmaW5pc2hlZFxuICBzcGluRmluaXNoZWQ6IGZ1bmN0aW9uIChjdXJyZW50VGltZSkge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcblxuICAgIGlmIChudWRnZXMubnVkZ2VzUmVtYWluaW5nIDwgMSkge1xuICAgICAgZGlzYWJsZU51ZGdlcygpO1xuICAgICAgaWYgKHNwaW5UeXBlICE9PSBcIm51ZGdlXCIpIHtcbiAgICAgICAgZGlzYWJsZUhvbGRzKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIHdpblxuICAgIGNvbnN0IHdpbiA9IGNoZWNrV2luKCk7XG5cbiAgICAvLyBXaW5cbiAgICBpZiAod2luKSB7XG4gICAgICAvLyBSZXNldCBudWRnZXNcbiAgICAgIG51ZGdlcy5yZXNldCgpO1xuICAgICAgY2FuTnVkZ2UgPSBmYWxzZTtcbiAgICAgIGRpc2FibGVOdWRnZXMoKTtcbiAgICAgIGRpc2FibGVIb2xkcygpO1xuICAgICAgZGlzYWJsZVNwaW4oKTtcbiAgICAgIGRpc2FibGVHYW1lTW9kZSgpO1xuXG4gICAgICBub3cgPSBjdXJyZW50VGltZTtcbiAgICAgIHRoaXMud2luQW1vdW50ID0gd2luO1xuXG4gICAgICByZW5kZXIoKTtcbiAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy53aW47IC8vIFN3aXRjaCB0byB3aW4gYW5pbWF0aW9uIHN0YXRlXG4gICAgICBnYW1lTG9vcCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICB9XG4gICAgLy8gTm8gd2luXG4gICAgZWxzZSB7XG4gICAgICBpZiAoXG4gICAgICAgIG51ZGdlcy5udWRnZXNSZW1haW5pbmcgPCAxICYmXG4gICAgICAgIHNwaW5UeXBlICE9PSBcIm51ZGdlXCIgJiZcbiAgICAgICAgY3JlZGl0cy5jcmVkaXRzUmVtYWluaW5nID4gMFxuICAgICAgKSB7XG4gICAgICAgIC8vIElmIG5vIHdpbm5pbmcgbGluZSB0aGVuIGFzc2lnbiBob2xkcyBhbmQgbnVkZ2VzXG4gICAgICAgIGFzc2lnbkhvbGRzKCk7XG4gICAgICAgIGFzc2lnbk51ZGdlcygpO1xuICAgICAgfVxuXG4gICAgICAvLyBFbmFibGUgc3BpblxuICAgICAgZW5hYmxlU3BpbigpO1xuICAgICAgZW5hYmxlR2FtZU1vZGUoKTtcblxuICAgICAgLy8gQ2hlY2sgY3JlZGl0c1xuICAgICAgaWYgKGNyZWRpdHMuY3JlZGl0c1JlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuZ2FtZU92ZXI7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvLyBOdWRnZVxuICBudWRnZTogZnVuY3Rpb24gKGN1cnJlbnRUaW1lKSB7XG4gICAgbGV0IGlzTnVkZ2luZyA9IFtdO1xuICAgIC8vIElmIG51ZGdpbmcgc3RvcHBlZCwgdGhlbiBjaGFuZ2UgZ2FtZXN0YXRlIHRvIHNwaW5maW5pc2hlZFxuICAgIGlzTnVkZ2luZyA9IHJlZWxzLnJlZWxMaXN0LmZpbHRlcigocmVlbCkgPT4ge1xuICAgICAgcmV0dXJuIHJlZWwuaXNOdWRnaW5nID09PSB0cnVlO1xuICAgIH0pO1xuXG4gICAgaWYgKCFpc051ZGdpbmcubGVuZ3RoKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG4gICAgICB0aGlzLnNwaW5GaW5pc2hlZChjdXJyZW50VGltZSk7XG4gICAgfVxuXG4gICAgaXNOdWRnaW5nLmZvckVhY2goKHJlZWwpID0+IHtcbiAgICAgIHJlZWwubnVkZ2UoKTtcbiAgICAgIHJlbmRlcigpO1xuICAgIH0pO1xuICB9LFxuICAvLyBXaW4gYW5pbWF0aW9uXG4gIHdpbjogZnVuY3Rpb24gKGN1cnJlbnRUaW1lKSB7XG4gICAgaWYgKHdpbm5pbmdSb3dzLmluY2x1ZGVzKFwidG9wXCIpKVxuICAgICAgd2luSW5kaWNhdG9yVG9wTGluZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGlmICh3aW5uaW5nUm93cy5pbmNsdWRlcyhcIm1pZGRsZVwiKSlcbiAgICAgIHdpbkluZGljYXRvckNlbnRyZUxpbmUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICBpZiAod2lubmluZ1Jvd3MuaW5jbHVkZXMoXCJib3R0b21cIikpXG4gICAgICB3aW5JbmRpY2F0b3JCb3R0b21MaW5lLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgd2luQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG5cbiAgICBkaXNhYmxlU3BpbigpO1xuICAgIGRpc2FibGVHYW1lTW9kZSgpO1xuICAgIGRpc2FibGVIb2xkcygpO1xuXG4gICAgaWYgKGN1cnJlbnRUaW1lIC0gbm93ID4gMSkge1xuICAgICAgbm93ID0gY3VycmVudFRpbWU7XG4gICAgICBsZXQgc2tpcCA9IHRoaXMud2luQW1vdW50ID4gNTAwID8gMTAgOiAxO1xuICAgICAgdGhpcy5jdXJyZW50V2luRGlzcGxheSArPSBza2lwO1xuICAgICAgd2luLmN1cnJlbnRXaW4gPSB0aGlzLndpbkFtb3VudDtcbiAgICAgIHdpbi5yZW5kZXIoKTtcblxuICAgICAgaWYgKHRoaXMuY3VycmVudFdpbkRpc3BsYXkgLSB0aGlzLm9sZFdpbkRpc3BsYXkgPj0gdGhpcy53aW5BbW91bnQpIHtcbiAgICAgICAgLy8gRmluaXNoZWQgbG9vcGluZ1xuICAgICAgICBjcmVkaXRzLmFkZENyZWRpdCh0aGlzLndpbkFtb3VudCk7XG4gICAgICAgIGNyZWRpdHMucmVuZGVyKCk7XG4gICAgICAgIHRoaXMub2xkV2luRGlzcGxheSA9IHRoaXMuY3VycmVudFdpbkRpc3BsYXk7XG4gICAgICAgIHdpbi5yZXNldCgpO1xuICAgICAgICB3aW4ucmVuZGVyKCk7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcbiAgICAgICAgZW5hYmxlU3BpbigpO1xuICAgICAgICBlbmFibGVHYW1lTW9kZSgpO1xuICAgICAgICB3aW5Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgdmlld3BvcnRDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgd2luSW5kaWNhdG9yTGVmdC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICB3aW5JbmRpY2F0b3JSaWdodC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICB3aW5JbmRpY2F0b3JUb3BMaW5lLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIHdpbkluZGljYXRvckNlbnRyZUxpbmUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgd2luSW5kaWNhdG9yQm90dG9tTGluZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuXG4gICAgICAgIC8vIENoZWNrIGNyZWRpdHNcbiAgICAgICAgaWYgKGNyZWRpdHMuY3JlZGl0c1JlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5nYW1lT3ZlcjtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvLyBHYW1lIG92ZXIgLSBjcmVkaXRzIHJhbiBvdXRcbiAgZ2FtZU92ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG4gICAgZGlzYWJsZVNwaW4oKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChwbGF5U2VjdGlvbik7XG5cbiAgICAgIGRpc2FibGVOdWRnZXMoKTtcbiAgICAgIGRpc2FibGVIb2xkcygpO1xuXG4gICAgICByZW5kZXJHYW1lT3ZlclNlY3Rpb24oKTtcblxuICAgICAgdGhpcy53aW5BbW91bnQgPSAwO1xuICAgICAgdGhpcy5vbGRXaW5EaXNwbGF5ID0gMDtcbiAgICAgIHRoaXMuY3VycmVudFdpbkRpc3BsYXkgPSAwO1xuICAgIH0sIDEwMDApO1xuICB9LFxufTtcblxuY29uc3QgcmVuZGVyR2FtZU92ZXJTZWN0aW9uID0gKCkgPT4ge1xuICBjb25zdCBnYW1lT3ZlclNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBnYW1lT3ZlclNlY3Rpb24uaWQgPSBcImdhbWVPdmVyU2VjdGlvblwiO1xuXG4gIGdhbWVPdmVyU2VjdGlvbi5pbm5lckhUTUwgPSBcIjxkaXY+XCI7XG4gIGdhbWVPdmVyU2VjdGlvbi5pbm5lckhUTUwgKz0gXCI8cD5HYW1lIG92ZXI8L3A+XCI7XG4gIGdhbWVPdmVyU2VjdGlvbi5pbm5lckhUTUwgKz0gXCI8cD5Zb3Ugd29uIFwiICsgd2luLmN1cnJlbnRXaW4gKyBcIiBjcmVkaXRzXCI7XG4gIGdhbWVPdmVyU2VjdGlvbi5pbm5lckhUTUwgKz0gXCI8cD5QcmVzcyBzdGFydCB0byBwbGF5IGFnYWluPC9wPlwiO1xuICBnYW1lT3ZlclNlY3Rpb24uaW5uZXJIVE1MICs9IFwiPC9kaXY+XCI7XG5cbiAgY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBzdGFydEJ1dHRvbi5pZCA9IFwic3RhcnRCdXR0b25cIjtcbiAgc3RhcnRCdXR0b24uY2xhc3NMaXN0LmFkZChcImJ1dHRvblwiKTtcbiAgc3RhcnRCdXR0b24uaW5uZXJUZXh0ID0gXCJTVEFSVFwiO1xuXG4gIGdhbWVPdmVyU2VjdGlvbi5hcHBlbmRDaGlsZChzdGFydEJ1dHRvbik7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChnYW1lT3ZlclNlY3Rpb24pO1xuXG4gIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChnYW1lT3ZlclNlY3Rpb24pO1xuXG4gICAgcGxheVNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHBsYXlTZWN0aW9uLmlkID0gXCJwbGF5U2VjdGlvblwiO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocGxheVNlY3Rpb24pO1xuXG4gICAgaW5pdCgpO1xuICB9KTtcbn07XG5cbi8vIFByZWxvYWQgaW1hZ2VzIHRoZW4gc3RhcnQgZ2FtZVxudmFyIGxvYWRlZCA9IDA7XG52YXIgaW1hZ2VMaXN0ID0gW107XG5sZXQgaW1nO1xuXG5JVEVNX0lORk8uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgaW1nLnNyYyA9IFwiLi9pbWcvXCIgKyBpdGVtLmltYWdlU3JjO1xuICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgIGxvYWRlZCsrO1xuICAgIGlmIChsb2FkZWQgPT09IElURU1fSU5GTy5sZW5ndGgpIGluaXQoKTtcbiAgfTtcbn0pO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==