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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_viewport__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_reels__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_nudgeButtons__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_holdButtons__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_credits__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_win__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_nudges__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__scss_app_scss__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__scss_app_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__scss_app_scss__);








// Sass


// creates the canvas which we need to draw upon and assigns to a viewport variable
const viewport = Object(__WEBPACK_IMPORTED_MODULE_0__components_viewport__["a" /* default */])();

const winContainer = document.getElementById("win");
const nudgesContainer = document.getElementById("nudges");
let playSection = document.getElementById("playSection");

let viewportContainer;
let nudgeButtonContainer;
let holdButtonContainer;
let winIndicatorLeft;
let winIndicatorRight;
let winIndicatorCentreLine;
let spinButton;
let reels;
let nudges;
let nudgeButtons;
let holdButtons;
let nudgeButtonList;
let holdButtonList;
let credits;
let win;
let gameLoop;
let nudgeChance = 2; // Chance of getting nudges after spin (1 in nudgeChance)
let holdChance = 2; // Chance of getting holds after spin (1 in holdChance)
let canSpin;
let canNudge;
let canHold;
let now; // Current time to compare against
let reelsRunning = []; // Keeps track of any reels with runtime left on them to estblish whether to reset/stop spin etc.
let spinType = "spin"; // Keeps track of whether last spin was regular spin or nudge

// Initiate Building our game

const init = () => {
  // create a container for the view port and append it to the playSection
  renderViewPortContainer();

  // Render viewport
  viewport.render();

  // Set up reels
  reels = Object(__WEBPACK_IMPORTED_MODULE_1__components_reels__["a" /* default */])();
  reels.build();
  reels.render();

  let reelContainer;
  let reelContainerX;
  let reelContainerY;
  let reelContainerW;
  let reelContainerH;

  reels.reelList.forEach((reel) => {
    // Render outer container for each reel in the viewport container
    reelContainer = document.createElement("div");

    reelContainerX =
      reel.reelItems[0].x +
      VIEWPORT_CONTAINER_PADDING_X -
      REEL_CONTAINER_PADDING;

    reelContainerY =
      reel.reelItems[2].y +
      VIEWPORT_CONTAINER_PADDING_Y -
      REEL_CONTAINER_PADDING;

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

  //todo logic for HOLD and NUDGE

  renderWinIndicators();
  renderNudgeButtonContainer();

  // Set up nudge buttons
  nudgeButtons = Object(__WEBPACK_IMPORTED_MODULE_2__components_nudgeButtons__["a" /* default */])();
  nudgeButtons.build();
  nudgeButtons.render();

  nudgeButtonList = document.getElementsByClassName("nudge-button");

  for (let i = 0; i < nudgeButtonList.length; i++) {
    nudgeButtonList[i].addEventListener("click", () => {
      if (
        canSpin &&
        canNudge &&
        reels.reelList[i].canNudge === true &&
        nudges.nudgesRemaining > 0
      ) {
        spinType = "nudge";
        nudges.nudgesRemaining -= 1;
        reels.reelList[i].isNudging = true;
        gameLoop = requestAnimationFrame(loop);
        gameStates.currentState = gameStates.nudge;
      }
    });
  }

  // Set up nudges
  nudges = Object(__WEBPACK_IMPORTED_MODULE_6__components_nudges__["a" /* default */])();
  nudges.render();

  renderHoldButtonContainer();

  // Set up hold buttons
  holdButtons = Object(__WEBPACK_IMPORTED_MODULE_3__components_holdButtons__["a" /* default */])();
  holdButtons.build();
  holdButtons.render();

  holdButtonList = document.getElementsByClassName("hold-button");

  for (let i = 0; i < holdButtonList.length; i++) {
    holdButtonList[i].addEventListener("click", (event) => {
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
  }

  // Set up credits
  credits = Object(__WEBPACK_IMPORTED_MODULE_4__components_credits__["a" /* default */])();
  credits.reset();
  credits.render();

  // Set up win
  win = Object(__WEBPACK_IMPORTED_MODULE_5__components_win__["a" /* default */])();
  win.reset();
  win.render();

  renderSpinButton();

  canSpin = true;
  canNudge = false;
  canHold = false;

  enableSpin();

  spinButton.addEventListener("click", () => {
    if (canSpin) {
      credits.useCredit();
      credits.render();

      disableNudges();
      disableSpin();

      //   Disable hold buttons that aren't held
      for (let i = 0; i < reels.reelList.length; i++) {
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
};

const renderNudgeButtonContainer = () => {
  nudgeButtonContainer = document.createElement("div");
  nudgeButtonContainer.id = "nudgeButtons";
  playSection.appendChild(nudgeButtonContainer);
};

const renderHoldButtonContainer = () => {
  holdButtonContainer = document.createElement("div");
  holdButtonContainer.id = "holdButtons";
  playSection.appendChild(holdButtonContainer);
};

const renderSpinButton = () => {
  spinButton = document.createElement("button");
  spinButton.id = "spinButton";
  spinButton.classList.add("button");
  spinButton.innerHTML = "SPIN";
  playSection.appendChild(spinButton);
};

const renderViewPortContainer = () => {
  viewportContainer = document.createElement("div");
  viewportContainer.id = "viewportContainer";
  viewportContainer.style.paddingLeft = VIEWPORT_CONTAINER_PADDING_X + "px";
  viewportContainer.style.paddingRight = VIEWPORT_CONTAINER_PADDING_X + "px";
  viewportContainer.style.paddingTop = VIEWPORT_CONTAINER_PADDING_Y + "px";
  viewportContainer.style.paddingBottom = VIEWPORT_CONTAINER_PADDING_Y + "px";
  playSection.appendChild(viewportContainer);
};

const renderWinIndicators = () => {
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

  winIndicatorCentreLine.style.width =
    viewportContainer.offsetWidth -
    winIndicatorLeft.offsetWidth -
    winIndicatorRight.offsetWidth +
    "px";

  viewportContainer.appendChild(winIndicatorCentreLine);
};

const loop = (currentTime) => {
  gameLoop = requestAnimationFrame(loop); // Needs to go before line below to keep animationframeid up to date
  gameStates.currentState(currentTime);
};

const moveReels = () => {
  reels.move();
};

const render = () => {
  viewport.clear();
  reels.render();

  // Digits
  //   nudges.render();
  credits.render();
  win.render();
};

const checkWin = () => {
  let spinResult = []; // Array of reel results after spin (all three visible objects of each reel)
  let spinResultFiltered = []; // Array of results that don't match first reel
  let reelResult; // Individual reel result, made of three objects (visible)
  let compareItem; // Middle item on reel one to compare

  // Check for win
  reels.reelList.forEach((reel, index) => {
    reelResult = []; // Result of individual reel

    reelResult.push(reels.reelList[index].reelItems[0]);
    reelResult.push(reels.reelList[index].reelItems[1]);
    reelResult.push(reels.reelList[index].reelItems[2]);

    spinResult.push(reelResult);
  });

  console.log("SPIN RESULT", spinResult);
  return false;
};
// Randomly assign nudges
const assignNudges = () => {
  // Randomly assign nudges
  const nudgeRandom = Math.floor(Math.random() * nudgeChance + 1);

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
const assignHolds = () => {
  const holdRandom = Math.floor(Math.random() * holdChance + 1);

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
const enableNudges = () => {
  reels.reelList.forEach((reel) => {
    // If the reel isn't held
    if (!reel.isHeld) {
      reel.canNudge = true;
    }
  });

  for (let i = 0; i < nudgeButtonList.length; i++) {
    // If the reel isn't held
    if (!reels.reelList[i].isHeld) {
      nudgeButtonList[i].classList.add("active");
    }
  }

  nudgesContainer.classList.add("active");
};

// Enbale all holds
const enableHolds = () => {
  reels.reelList.forEach((reel) => {
    reel.canHold = true;
  });

  for (let i = 0; i < holdButtonList.length; i++) {
    holdButtonList[i].classList.add("active");
  }

  canhold = true;
};

// Disable all nudges
const disableNudges = () => {
  reels.reelList.forEach((reel) => {
    reel.canNudge = false;
  });

  for (let i = 0; i < nudgeButtonList.length; i++) {
    nudgeButtonList[i].classList.remove("active");
  }

  nudges.reset();

  canNudge = false;

  nudgesContainer.classList.remove("active");
};

// Disable all holds
const disableHolds = () => {
  reels.reelList.forEach((reel) => {
    reel.canHold = false;
    reel.isHeld = false;
    if (reel.runTime < 1) {
      reel.resetRuntime();
    }
  });

  for (let i = 0; i < holdButtonList.length; i++) {
    holdButtonList[i].classList.remove("active", "held");
  }

  canHold = false;
};

// Enable spin
const enableSpin = () => {
  spinButton.classList.add("active");
  canSpin = true;
};

// Disbale spin
const disableSpin = () => {
  spinButton.classList.remove("active");
  canSpin = false;
};

// Add or remove group button styles
const buttonStyles = (buttonList, addRemove, className) => {
  for (let i = 0; i < buttonList.length; i++) {
    if (addRemove === "add") {
      buttonList[i].classList.add(className);
    } else if (addRemove === "remove") {
      buttonList[i].classList.remove(className);
    }
  }
};
// Game state
const gameStates = {
  currentState: null,
  winAmount: 0,
  oldWinDisplay: 0, // When looping through win increment - this is the original figure
  currentWinDisplay: 0, // When looping through win amount - this is the new figure

  // Regular spin
  spin: function () {
    this.spinType = "spin";
    disableSpin();
    moveReels();
    render();

    // Filter reel runtimes - if one is above zero then carry on
    reelsRunning = reels.reelList.filter((reel) => {
      return reel.runTime > 0;
    });

    if (!reelsRunning.length) {
      this.currentState = this.spinFinished;
    }
  },
  // Spin finished
  spinFinished: function (currentTime) {
    cancelAnimationFrame(gameLoop);

    if (nudges.nudgesRemaining < 1) {
      disableNudges();
      if (spinType !== "nudge") {
        disableHolds();
      }
    }

    // Check for win
    const win = checkWin();

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
      if (
        nudges.nudgesRemaining < 1 &&
        spinType !== "nudge" &&
        credits.creditsRemaining > 0
      ) {
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
  nudge: function (currentTime) {
    let isNudging = [];
    // If nudging stopped, then change gamestate to spinfinished
    isNudging = reels.reelList.filter((reel) => {
      return reel.isNudging === true;
    });

    if (!isNudging.length) {
      cancelAnimationFrame(gameLoop);
      this.spinFinished(currentTime);
    }

    isNudging.forEach((reel) => {
      reel.nudge();
      render();
    });
  },
  // Win animation
  win: function (currentTime) {
    winIndicatorCentreLine.classList.add("active");
    winContainer.classList.add("active");

    disableSpin();
    disableHolds();

    if (currentTime - now > 50) {
      now = currentTime;
      this.currentWinDisplay += 1;
      win.currentWin = this.currentWinDisplay;
      win.render();

      if (this.currentWinDisplay - this.oldWinDisplay === this.winAmount) {
        // Finished looping
        this.oldWinDisplay = this.currentWinDisplay;
        cancelAnimationFrame(gameLoop);
        enableSpin();
        winContainer.classList.remove("active");
        viewportContainer.classList.remove("active");
        winIndicatorLeft.classList.remove("active");
        winIndicatorRight.classList.remove("active");
        winIndicatorCentreLine.classList.remove("active");

        // Check credits
        if (credits.creditsRemaining === 0) {
          this.currentState = this.gameOver;
          this.currentState();
        }
      }
    }
  },
  // Game over - credits ran out
  gameOver: function () {
    cancelAnimationFrame(gameLoop);
    disableSpin();

    setTimeout(() => {
      document.body.removeChild(playSection);

      disableNudges();
      disableHolds();

      renderGameOverSection();

      this.winAmount = 0;
      this.oldWinDisplay = 0;
      this.currentWinDisplay = 0;
    }, 1000);
  },
};

// Preload images then start game
var loaded = 0;
var imageList = [];
let img;

ITEM_INFO.forEach((item) => {
  img = new Image();
  img.src = "./img/" + item.imageSrc;
  console.log("IMAGE", img);
  img.onload = () => {
    loaded++;
    if (loaded === ITEM_INFO.length) init();
  };
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const viewport = () => {
    const newViewport = document.createElement('canvas');
    newViewport.width = VIEWPORT_WIDTH;
    newViewport.height = VIEWPORT_HEIGHT;
    newViewport.id = "viewport";

    return {
        viewport: newViewport,
        width: VIEWPORT_WIDTH,
        height: VIEWPORT_HEIGHT,
        ctx: newViewport.getContext('2d'),
        render: function () {
            const viewportContainer = document.getElementById('viewportContainer');
            viewportContainer.appendChild(this.viewport);
        },
        clear: function () {
            this.ctx.clearRect(0, 0, this.width, this.height)
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (viewport);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reel__ = __webpack_require__(11);




const reels = () => {
    let newReel;
    return {
        reelList: [],
        build: function () {
            for (let i = 0; i < NO_REELS; i++) {
                newReel = Object(__WEBPACK_IMPORTED_MODULE_0__reel__["a" /* default */])(i);
                newReel.build();
                this.reelList.push(newReel);
            }
        },
        move: function () {
            this.reelList.forEach((reel) => {
                if (reel.runTime > 0 && !reel.isHeld) {
                    reel.move();
                }
            });
        },
        resetRuntimes: function () {
            this.reelList.forEach((reel) => {
                reel.resetRuntime();
            });
        },
        render: function () {
            this.reelList.forEach((reel) => {
                reel.render();
            })
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (reels);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reelItem__ = __webpack_require__(12);




const reel = (reelNo) => {
    let firstItem;
    let lastItem;
    let nudgeCallTimes;

    return {
        noOfItems: NO_ITEMS,
        itemList: ITEM_LIST,
        reelSpeed: REEL_SPEED,
        nudgeSpeed: 10,
        runTime: (REEL_SPEED * 10) + (20 * reelNo), // Arbitrary values for testing
        canHold: false,
        isHeld: false,
        canNudge: false,
        isNudging: false,
        nudgeFrames: ITEM_HEIGHT / NUDGE_SPEED,
        nudgeFrame: 0,
        reelItems: [],
        reelNo,
        build: function () {
            let itemNo = 0;
            let type;
            let instances;
            let imageSrc;
            let winAmount;
            let x;
            let y;
            let newReelItem;

            ITEM_INFO.forEach((item, index) => {
                type = item.type;
                instances = item.instances;
                imageSrc = item.imageSrc;
                winAmount = item.winAmount;

                // Add required no of instances of this item to the reelItems array
                for (let i = 0; i < instances; i++) {
                    x = VIEWPORT_X + (this.reelNo * REEL_WIDTH) + (this.reelNo * REEL_SPACING);

                    y = (VIEWPORT_Y - ITEM_HEIGHT) - (ITEM_HEIGHT * itemNo) - 100;

                    const img = new Image();
                    img.src = './img/' + item.imageSrc;

                    newReelItem = Object(__WEBPACK_IMPORTED_MODULE_0__reelItem__["a" /* default */])(type, itemNo, img, x, y, winAmount);
                    this.reelItems.push(newReelItem);
                    itemNo++;
                    // }
                }
            });

            this.shuffle();
            this.resetCoords();
        },
        shuffle: function () {
            let rnd;
            let temp;
            for (let i = this.reelItems.length - 1; i > 0; i--) {
                rnd = Math.floor(Math.random() * (i + 1));
                temp = this.reelItems[i];
                this.reelItems[i] = this.reelItems[rnd];
                this.reelItems[rnd] = temp;
            }
        },
        nudge: function () {
            this.reelItems.forEach((item) => {
                item.nudge();
            });

            this.shift();

            this.nudgeFrame++;

            if (this.nudgeFrame >= this.nudgeFrames) {
                this.isNudging = false;
                this.nudgeFrame = 0;
            }
        },
        resetCoords: function () {
            for (let i = 0; i < this.reelItems.length; i++) {
                this.reelItems[i].y = VIEWPORT_Y + VIEWPORT_HEIGHT - ITEM_HEIGHT - (ITEM_HEIGHT * i);
            }
        },
        resetRuntime: function () {
            if (!this.isHeld) {
                this.runTime = (REEL_SPEED * 10) + (20 * reelNo); // Arbitrary values for testing;
            }
        },
        shift: function () {
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
        move: function () {
            this.reelItems.forEach((reelItem) => {
                reelItem.move();
            });
            this.shift();
            // Reduce reel runtime
            this.runTime--;
        },
        render: function () {
            this.reelItems.forEach((reelItem) => {
                reelItem.render();
            });
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (reel);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const reelItem = (type, itemNo, img, x, y, winAmount) => {
  return {
    type,
    itemNo,
    img,
    x,
    y,
    winAmount,
    speed: REEL_SPEED,
    nudgeSpeed: NUDGE_SPEED,
    ctx: document.getElementById("viewport").getContext("2d"),
    move: function () {
      this.y += this.speed;
    },
    nudge: function () {
      this.y += this.nudgeSpeed;
    },
    render: function () {
      this.ctx.drawImage(
        this.img,
        0,
        0,
        ITEM_WIDTH,
        ITEM_HEIGHT,
        this.x,
        this.y,
        ITEM_WIDTH,
        ITEM_HEIGHT
      );
    },
  };
};

/* harmony default export */ __webpack_exports__["a"] = (reelItem);


/***/ }),
/* 13 */,
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const digits = () => {
    return {
        digitsString: null,
        container: null, // Container that holds digitContainers
        digitContainers: null, // List of digit containers that hold single digit each
        render: function () {
            // // Split number into seperate characters
            this.digitContainers = this.container.getElementsByClassName('digit-number'); 
            let digitIndex; // Which digit container to put number in

            // Wipe the digits
            for (let i = 0; i < this.digitContainers.length; i++) {
                this.digitContainers[i].classList.remove('active');
                this.digitContainers[i].innerHTML = '8';
            }

            // Populate the digits
            for (let i = 0; i < this.digitsString.length; i++) {
                digitIndex = (this.digitContainers.length) - (this.digitsString.length - i);
                this.digitContainers[digitIndex].classList.add('active');
                this.digitContainers[digitIndex].innerHTML = this.digitsString[i];
            }
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (digits);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__digits__ = __webpack_require__(14);




const credits = () => {
    return {
        creditsRemaining: CREDITS,
        digits: Object(__WEBPACK_IMPORTED_MODULE_0__digits__["a" /* default */])(),
        container: document.getElementById('credits'),
        useCredit: function () {
            this.creditsRemaining--;
        },
        reset: function () {
            this.creditsRemaining = CREDITS;
        },
        render: function () {
            this.digits.digitsString = this.creditsRemaining.toString();
            this.digits.container = this.container;
            this.digits.render();
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (credits);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__digits__ = __webpack_require__(14);




const win = () => {
    return {
        currentWin: 0,
        digits: Object(__WEBPACK_IMPORTED_MODULE_0__digits__["a" /* default */])(),
        container: document.getElementById('win'),
        addWin: function(winAmount) {
            this.currentWin += winAmount;
        },
        reset: function() {
            this.currentWin = 0;
        },
        render: function() {
            this.digits.digitsString = this.currentWin.toString();
            this.digits.container = this.container;
            this.digits.render();
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (win);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__holdButton__ = __webpack_require__(18);




const holdButtons = () => {
    let newButton;

    return {
        buttonList: [],
        build: function () {
            for (let i = 0; i < NO_REELS; i++) {
                newButton = Object(__WEBPACK_IMPORTED_MODULE_0__holdButton__["a" /* default */])(i);
                this.buttonList.push(newButton);
            }
        },
        render: function () {
            this.buttonList.forEach((btn, index) => {
                btn.render(index);
            });
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (holdButtons);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const holdButton = (index) => {
    let holdButton;

    return {
        container: document.getElementById('holdButtons'),
        reelNo: index,
        render: function () {
            holdButton = document.createElement('button');
            holdButton.innerHTML = 'HOLD';
            holdButton.classList.add('hold-button', 'button');
            holdButton.style.width = BUTTON_WIDTH + 'px';
            holdButton.style.marginLeft = (REEL_SPACING / 2) + ((REEL_WIDTH - BUTTON_WIDTH) / 2) + 'px';
            holdButton.style.marginRight = (REEL_SPACING / 2) + ((REEL_WIDTH - BUTTON_WIDTH) / 2) + 'px';
            this.container.appendChild(holdButton);
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (holdButton);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nudgeButton__ = __webpack_require__(20);




const nudgeButtons = () => {
    let newButton;

    return {
        buttonList: [],
        build: function() {
            for (let i = 0; i < NO_REELS; i++) {
                newButton = Object(__WEBPACK_IMPORTED_MODULE_0__nudgeButton__["a" /* default */])(i);
                this.buttonList.push(newButton);
            }
        },
        render: function() {
            this.buttonList.forEach((btn, index) => {
                btn.render(index);
            });
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (nudgeButtons);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const nudgeButton = (index) => {
    let nudgeButton;
    let nudgeButtonContainer;

    return {
        container: document.getElementById('nudgeButtons'),
        reelNo: index,
        render: function () {
            nudgeButton = document.createElement('button');
            nudgeButton.innerHTML = 'NUDGE';
            nudgeButton.classList.add('nudge-button', 'button');
            nudgeButton.style.width = BUTTON_WIDTH + 'px';
            nudgeButton.style.marginLeft = (REEL_SPACING / 2) + ((REEL_WIDTH - BUTTON_WIDTH) / 2) + 'px';
            nudgeButton.style.marginRight = (REEL_SPACING / 2) + ((REEL_WIDTH - BUTTON_WIDTH) / 2) + 'px';
            this.container.appendChild(nudgeButton);
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (nudgeButton);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__digits__ = __webpack_require__(14);




const nudges = () => {
    return {
        nudgesRemaining: 0,
        digits: Object(__WEBPACK_IMPORTED_MODULE_0__digits__["a" /* default */])(),
        container: document.getElementById('nudges'),
        reset: function() {
            this.nudgesRemaining = 0;
            this.render();
        },
        render: function() {
            this.digits.digitsString = this.nudgesRemaining.toString();
            this.digits.container = this.container;
            this.digits.render();
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (nudges);

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTE2ZTc2ODZkMmFmMDJmOTUzNmYiLCJ3ZWJwYWNrOi8vLy4vanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zY3NzL2FwcC5zY3NzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvdmlld3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9yZWVscy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL3JlZWwuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9yZWVsSXRlbS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2RpZ2l0cy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2NyZWRpdHMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy93aW4uanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9ob2xkQnV0dG9ucy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2hvbGRCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9udWRnZUJ1dHRvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9udWRnZUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL251ZGdlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNB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O0FBQ0E7QUFDQSxnQkFBZ0IsZ0VBQU07QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsK0RBQU0sRSIsImZpbGUiOiIuL2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGUxNmU3Njg2ZDJhZjAyZjk1MzZmIiwiaW1wb3J0IFZpZXdwb3J0IGZyb20gXCIuL2NvbXBvbmVudHMvdmlld3BvcnRcIjtcbmltcG9ydCBSZWVscyBmcm9tIFwiLi9jb21wb25lbnRzL3JlZWxzXCI7XG5pbXBvcnQgTnVkZ2VCdXR0b25zIGZyb20gXCIuL2NvbXBvbmVudHMvbnVkZ2VCdXR0b25zXCI7XG5pbXBvcnQgSG9sZEJ1dHRvbnMgZnJvbSBcIi4vY29tcG9uZW50cy9ob2xkQnV0dG9uc1wiO1xuaW1wb3J0IENyZWRpdHMgZnJvbSBcIi4vY29tcG9uZW50cy9jcmVkaXRzXCI7XG5pbXBvcnQgV2luIGZyb20gXCIuL2NvbXBvbmVudHMvd2luXCI7XG5pbXBvcnQgTnVkZ2VzIGZyb20gXCIuL2NvbXBvbmVudHMvbnVkZ2VzXCI7XG5cbi8vIFNhc3NcbmltcG9ydCBcIi4uL3Njc3MvYXBwLnNjc3NcIjtcblxuLy8gY3JlYXRlcyB0aGUgY2FudmFzIHdoaWNoIHdlIG5lZWQgdG8gZHJhdyB1cG9uIGFuZCBhc3NpZ25zIHRvIGEgdmlld3BvcnQgdmFyaWFibGVcbmNvbnN0IHZpZXdwb3J0ID0gVmlld3BvcnQoKTtcblxuY29uc3Qgd2luQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5cIik7XG5jb25zdCBudWRnZXNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm51ZGdlc1wiKTtcbmxldCBwbGF5U2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheVNlY3Rpb25cIik7XG5cbmxldCB2aWV3cG9ydENvbnRhaW5lcjtcbmxldCBudWRnZUJ1dHRvbkNvbnRhaW5lcjtcbmxldCBob2xkQnV0dG9uQ29udGFpbmVyO1xubGV0IHdpbkluZGljYXRvckxlZnQ7XG5sZXQgd2luSW5kaWNhdG9yUmlnaHQ7XG5sZXQgd2luSW5kaWNhdG9yQ2VudHJlTGluZTtcbmxldCBzcGluQnV0dG9uO1xubGV0IHJlZWxzO1xubGV0IG51ZGdlcztcbmxldCBudWRnZUJ1dHRvbnM7XG5sZXQgaG9sZEJ1dHRvbnM7XG5sZXQgbnVkZ2VCdXR0b25MaXN0O1xubGV0IGhvbGRCdXR0b25MaXN0O1xubGV0IGNyZWRpdHM7XG5sZXQgd2luO1xubGV0IGdhbWVMb29wO1xubGV0IG51ZGdlQ2hhbmNlID0gMjsgLy8gQ2hhbmNlIG9mIGdldHRpbmcgbnVkZ2VzIGFmdGVyIHNwaW4gKDEgaW4gbnVkZ2VDaGFuY2UpXG5sZXQgaG9sZENoYW5jZSA9IDI7IC8vIENoYW5jZSBvZiBnZXR0aW5nIGhvbGRzIGFmdGVyIHNwaW4gKDEgaW4gaG9sZENoYW5jZSlcbmxldCBjYW5TcGluO1xubGV0IGNhbk51ZGdlO1xubGV0IGNhbkhvbGQ7XG5sZXQgbm93OyAvLyBDdXJyZW50IHRpbWUgdG8gY29tcGFyZSBhZ2FpbnN0XG5sZXQgcmVlbHNSdW5uaW5nID0gW107IC8vIEtlZXBzIHRyYWNrIG9mIGFueSByZWVscyB3aXRoIHJ1bnRpbWUgbGVmdCBvbiB0aGVtIHRvIGVzdGJsaXNoIHdoZXRoZXIgdG8gcmVzZXQvc3RvcCBzcGluIGV0Yy5cbmxldCBzcGluVHlwZSA9IFwic3BpblwiOyAvLyBLZWVwcyB0cmFjayBvZiB3aGV0aGVyIGxhc3Qgc3BpbiB3YXMgcmVndWxhciBzcGluIG9yIG51ZGdlXG5cbi8vIEluaXRpYXRlIEJ1aWxkaW5nIG91ciBnYW1lXG5cbmNvbnN0IGluaXQgPSAoKSA9PiB7XG4gIC8vIGNyZWF0ZSBhIGNvbnRhaW5lciBmb3IgdGhlIHZpZXcgcG9ydCBhbmQgYXBwZW5kIGl0IHRvIHRoZSBwbGF5U2VjdGlvblxuICByZW5kZXJWaWV3UG9ydENvbnRhaW5lcigpO1xuXG4gIC8vIFJlbmRlciB2aWV3cG9ydFxuICB2aWV3cG9ydC5yZW5kZXIoKTtcblxuICAvLyBTZXQgdXAgcmVlbHNcbiAgcmVlbHMgPSBSZWVscygpO1xuICByZWVscy5idWlsZCgpO1xuICByZWVscy5yZW5kZXIoKTtcblxuICBsZXQgcmVlbENvbnRhaW5lcjtcbiAgbGV0IHJlZWxDb250YWluZXJYO1xuICBsZXQgcmVlbENvbnRhaW5lclk7XG4gIGxldCByZWVsQ29udGFpbmVyVztcbiAgbGV0IHJlZWxDb250YWluZXJIO1xuXG4gIHJlZWxzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcbiAgICAvLyBSZW5kZXIgb3V0ZXIgY29udGFpbmVyIGZvciBlYWNoIHJlZWwgaW4gdGhlIHZpZXdwb3J0IGNvbnRhaW5lclxuICAgIHJlZWxDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgcmVlbENvbnRhaW5lclggPVxuICAgICAgcmVlbC5yZWVsSXRlbXNbMF0ueCArXG4gICAgICBWSUVXUE9SVF9DT05UQUlORVJfUEFERElOR19YIC1cbiAgICAgIFJFRUxfQ09OVEFJTkVSX1BBRERJTkc7XG5cbiAgICByZWVsQ29udGFpbmVyWSA9XG4gICAgICByZWVsLnJlZWxJdGVtc1syXS55ICtcbiAgICAgIFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1kgLVxuICAgICAgUkVFTF9DT05UQUlORVJfUEFERElORztcblxuICAgIHJlZWxDb250YWluZXJXID0gUkVFTF9XSURUSCArIFJFRUxfQ09OVEFJTkVSX1BBRERJTkcgKiAyO1xuXG4gICAgcmVlbENvbnRhaW5lckggPSBWSUVXUE9SVF9IRUlHSFQgKyBSRUVMX0NPTlRBSU5FUl9QQURESU5HICogMjtcblxuICAgIHJlZWxDb250YWluZXIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgcmVlbENvbnRhaW5lci5zdHlsZS50b3AgPSByZWVsQ29udGFpbmVyWSArIFwicHhcIjtcbiAgICByZWVsQ29udGFpbmVyLnN0eWxlLmxlZnQgPSByZWVsQ29udGFpbmVyWCArIFwicHhcIjtcbiAgICByZWVsQ29udGFpbmVyLnN0eWxlLndpZHRoID0gcmVlbENvbnRhaW5lclcgKyBcInB4XCI7XG4gICAgcmVlbENvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSByZWVsQ29udGFpbmVySCArIFwicHhcIjtcbiAgICByZWVsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJyZWVsLWNvbnRhaW5lclwiKTtcbiAgICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZChyZWVsQ29udGFpbmVyKTtcbiAgfSk7XG5cbiAgLy90b2RvIGxvZ2ljIGZvciBIT0xEIGFuZCBOVURHRVxuXG4gIHJlbmRlcldpbkluZGljYXRvcnMoKTtcbiAgcmVuZGVyTnVkZ2VCdXR0b25Db250YWluZXIoKTtcblxuICAvLyBTZXQgdXAgbnVkZ2UgYnV0dG9uc1xuICBudWRnZUJ1dHRvbnMgPSBOdWRnZUJ1dHRvbnMoKTtcbiAgbnVkZ2VCdXR0b25zLmJ1aWxkKCk7XG4gIG51ZGdlQnV0dG9ucy5yZW5kZXIoKTtcblxuICBudWRnZUJ1dHRvbkxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibnVkZ2UtYnV0dG9uXCIpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbnVkZ2VCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgbnVkZ2VCdXR0b25MaXN0W2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGNhblNwaW4gJiZcbiAgICAgICAgY2FuTnVkZ2UgJiZcbiAgICAgICAgcmVlbHMucmVlbExpc3RbaV0uY2FuTnVkZ2UgPT09IHRydWUgJiZcbiAgICAgICAgbnVkZ2VzLm51ZGdlc1JlbWFpbmluZyA+IDBcbiAgICAgICkge1xuICAgICAgICBzcGluVHlwZSA9IFwibnVkZ2VcIjtcbiAgICAgICAgbnVkZ2VzLm51ZGdlc1JlbWFpbmluZyAtPSAxO1xuICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5pc051ZGdpbmcgPSB0cnVlO1xuICAgICAgICBnYW1lTG9vcCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgICAgZ2FtZVN0YXRlcy5jdXJyZW50U3RhdGUgPSBnYW1lU3RhdGVzLm51ZGdlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gU2V0IHVwIG51ZGdlc1xuICBudWRnZXMgPSBOdWRnZXMoKTtcbiAgbnVkZ2VzLnJlbmRlcigpO1xuXG4gIHJlbmRlckhvbGRCdXR0b25Db250YWluZXIoKTtcblxuICAvLyBTZXQgdXAgaG9sZCBidXR0b25zXG4gIGhvbGRCdXR0b25zID0gSG9sZEJ1dHRvbnMoKTtcbiAgaG9sZEJ1dHRvbnMuYnVpbGQoKTtcbiAgaG9sZEJ1dHRvbnMucmVuZGVyKCk7XG5cbiAgaG9sZEJ1dHRvbkxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaG9sZC1idXR0b25cIik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBob2xkQnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGhvbGRCdXR0b25MaXN0W2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChjYW5TcGluICYmIGNhbkhvbGQpIHtcbiAgICAgICAgLy8gVG9nZ2xlXG4gICAgICAgIGlmIChyZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQpIHtcbiAgICAgICAgICAvLyBUYWtlIGhvbGQgb2ZmXG4gICAgICAgICAgcmVlbHMucmVlbExpc3RbaV0uaXNIZWxkID0gZmFsc2U7XG4gICAgICAgICAgcmVlbHMucmVlbExpc3RbaV0ucmVzZXRSdW50aW1lKCk7XG4gICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJoZWxkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFB1dCBob2xkIG9uXG4gICAgICAgICAgcmVlbHMucmVlbExpc3RbaV0uaXNIZWxkID0gdHJ1ZTtcbiAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5ydW5UaW1lID0gMDtcbiAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImhlbGRcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNldCB1cCBjcmVkaXRzXG4gIGNyZWRpdHMgPSBDcmVkaXRzKCk7XG4gIGNyZWRpdHMucmVzZXQoKTtcbiAgY3JlZGl0cy5yZW5kZXIoKTtcblxuICAvLyBTZXQgdXAgd2luXG4gIHdpbiA9IFdpbigpO1xuICB3aW4ucmVzZXQoKTtcbiAgd2luLnJlbmRlcigpO1xuXG4gIHJlbmRlclNwaW5CdXR0b24oKTtcblxuICBjYW5TcGluID0gdHJ1ZTtcbiAgY2FuTnVkZ2UgPSBmYWxzZTtcbiAgY2FuSG9sZCA9IGZhbHNlO1xuXG4gIGVuYWJsZVNwaW4oKTtcblxuICBzcGluQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKGNhblNwaW4pIHtcbiAgICAgIGNyZWRpdHMudXNlQ3JlZGl0KCk7XG4gICAgICBjcmVkaXRzLnJlbmRlcigpO1xuXG4gICAgICBkaXNhYmxlTnVkZ2VzKCk7XG4gICAgICBkaXNhYmxlU3BpbigpO1xuXG4gICAgICAvLyAgIERpc2FibGUgaG9sZCBidXR0b25zIHRoYXQgYXJlbid0IGhlbGRcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVlbHMucmVlbExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFyZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQpIHtcbiAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5jYW5Ib2xkID0gZmFsc2U7XG4gICAgICAgICAgaG9sZEJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzcGluVHlwZSA9IFwic3BpblwiO1xuICAgICAgZ2FtZVN0YXRlcy5jdXJyZW50U3RhdGUgPSBnYW1lU3RhdGVzLnNwaW47XG4gICAgICBnYW1lTG9vcCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgIGdhbWVTdGF0ZXMuY3VycmVudFN0YXRlKCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHJlbmRlck51ZGdlQnV0dG9uQ29udGFpbmVyID0gKCkgPT4ge1xuICBudWRnZUJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG51ZGdlQnV0dG9uQ29udGFpbmVyLmlkID0gXCJudWRnZUJ1dHRvbnNcIjtcbiAgcGxheVNlY3Rpb24uYXBwZW5kQ2hpbGQobnVkZ2VCdXR0b25Db250YWluZXIpO1xufTtcblxuY29uc3QgcmVuZGVySG9sZEJ1dHRvbkNvbnRhaW5lciA9ICgpID0+IHtcbiAgaG9sZEJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGhvbGRCdXR0b25Db250YWluZXIuaWQgPSBcImhvbGRCdXR0b25zXCI7XG4gIHBsYXlTZWN0aW9uLmFwcGVuZENoaWxkKGhvbGRCdXR0b25Db250YWluZXIpO1xufTtcblxuY29uc3QgcmVuZGVyU3BpbkJ1dHRvbiA9ICgpID0+IHtcbiAgc3BpbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHNwaW5CdXR0b24uaWQgPSBcInNwaW5CdXR0b25cIjtcbiAgc3BpbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uXCIpO1xuICBzcGluQnV0dG9uLmlubmVySFRNTCA9IFwiU1BJTlwiO1xuICBwbGF5U2VjdGlvbi5hcHBlbmRDaGlsZChzcGluQnV0dG9uKTtcbn07XG5cbmNvbnN0IHJlbmRlclZpZXdQb3J0Q29udGFpbmVyID0gKCkgPT4ge1xuICB2aWV3cG9ydENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHZpZXdwb3J0Q29udGFpbmVyLmlkID0gXCJ2aWV3cG9ydENvbnRhaW5lclwiO1xuICB2aWV3cG9ydENvbnRhaW5lci5zdHlsZS5wYWRkaW5nTGVmdCA9IFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1ggKyBcInB4XCI7XG4gIHZpZXdwb3J0Q29udGFpbmVyLnN0eWxlLnBhZGRpbmdSaWdodCA9IFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1ggKyBcInB4XCI7XG4gIHZpZXdwb3J0Q29udGFpbmVyLnN0eWxlLnBhZGRpbmdUb3AgPSBWSUVXUE9SVF9DT05UQUlORVJfUEFERElOR19ZICsgXCJweFwiO1xuICB2aWV3cG9ydENvbnRhaW5lci5zdHlsZS5wYWRkaW5nQm90dG9tID0gVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWSArIFwicHhcIjtcbiAgcGxheVNlY3Rpb24uYXBwZW5kQ2hpbGQodmlld3BvcnRDb250YWluZXIpO1xufTtcblxuY29uc3QgcmVuZGVyV2luSW5kaWNhdG9ycyA9ICgpID0+IHtcbiAgLy8gTGVmdCBpbmRpY2F0b3JcbiAgd2luSW5kaWNhdG9yTGVmdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICB3aW5JbmRpY2F0b3JMZWZ0LmNsYXNzTGlzdC5hZGQoXCJ3aW4taW5kaWNhdG9yXCIsIFwibGVmdFwiKTtcbiAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQod2luSW5kaWNhdG9yTGVmdCk7XG4gIC8vIFJpZ2h0IGluZGljYXRvclxuICB3aW5JbmRpY2F0b3JSaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICB3aW5JbmRpY2F0b3JSaWdodC5jbGFzc0xpc3QuYWRkKFwid2luLWluZGljYXRvclwiLCBcInJpZ2h0XCIpO1xuICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZCh3aW5JbmRpY2F0b3JSaWdodCk7XG4gIC8vIENlbnRyZSBsaW5lXG4gIHdpbkluZGljYXRvckNlbnRyZUxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB3aW5JbmRpY2F0b3JDZW50cmVMaW5lLmNsYXNzTGlzdC5hZGQoXCJ3aW4taW5kaWNhdG9yLWNlbnRyZS1saW5lXCIpO1xuXG4gIHdpbkluZGljYXRvckNlbnRyZUxpbmUuc3R5bGUubGVmdCA9IHdpbkluZGljYXRvckxlZnQub2Zmc2V0V2lkdGggKyBcInB4XCI7XG5cbiAgd2luSW5kaWNhdG9yQ2VudHJlTGluZS5zdHlsZS53aWR0aCA9XG4gICAgdmlld3BvcnRDb250YWluZXIub2Zmc2V0V2lkdGggLVxuICAgIHdpbkluZGljYXRvckxlZnQub2Zmc2V0V2lkdGggLVxuICAgIHdpbkluZGljYXRvclJpZ2h0Lm9mZnNldFdpZHRoICtcbiAgICBcInB4XCI7XG5cbiAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQod2luSW5kaWNhdG9yQ2VudHJlTGluZSk7XG59O1xuXG5jb25zdCBsb29wID0gKGN1cnJlbnRUaW1lKSA9PiB7XG4gIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApOyAvLyBOZWVkcyB0byBnbyBiZWZvcmUgbGluZSBiZWxvdyB0byBrZWVwIGFuaW1hdGlvbmZyYW1laWQgdXAgdG8gZGF0ZVxuICBnYW1lU3RhdGVzLmN1cnJlbnRTdGF0ZShjdXJyZW50VGltZSk7XG59O1xuXG5jb25zdCBtb3ZlUmVlbHMgPSAoKSA9PiB7XG4gIHJlZWxzLm1vdmUoKTtcbn07XG5cbmNvbnN0IHJlbmRlciA9ICgpID0+IHtcbiAgdmlld3BvcnQuY2xlYXIoKTtcbiAgcmVlbHMucmVuZGVyKCk7XG5cbiAgLy8gRGlnaXRzXG4gIC8vICAgbnVkZ2VzLnJlbmRlcigpO1xuICBjcmVkaXRzLnJlbmRlcigpO1xuICB3aW4ucmVuZGVyKCk7XG59O1xuXG5jb25zdCBjaGVja1dpbiA9ICgpID0+IHtcbiAgbGV0IHNwaW5SZXN1bHQgPSBbXTsgLy8gQXJyYXkgb2YgcmVlbCByZXN1bHRzIGFmdGVyIHNwaW4gKGFsbCB0aHJlZSB2aXNpYmxlIG9iamVjdHMgb2YgZWFjaCByZWVsKVxuICBsZXQgc3BpblJlc3VsdEZpbHRlcmVkID0gW107IC8vIEFycmF5IG9mIHJlc3VsdHMgdGhhdCBkb24ndCBtYXRjaCBmaXJzdCByZWVsXG4gIGxldCByZWVsUmVzdWx0OyAvLyBJbmRpdmlkdWFsIHJlZWwgcmVzdWx0LCBtYWRlIG9mIHRocmVlIG9iamVjdHMgKHZpc2libGUpXG4gIGxldCBjb21wYXJlSXRlbTsgLy8gTWlkZGxlIGl0ZW0gb24gcmVlbCBvbmUgdG8gY29tcGFyZVxuXG4gIC8vIENoZWNrIGZvciB3aW5cbiAgcmVlbHMucmVlbExpc3QuZm9yRWFjaCgocmVlbCwgaW5kZXgpID0+IHtcbiAgICByZWVsUmVzdWx0ID0gW107IC8vIFJlc3VsdCBvZiBpbmRpdmlkdWFsIHJlZWxcblxuICAgIHJlZWxSZXN1bHQucHVzaChyZWVscy5yZWVsTGlzdFtpbmRleF0ucmVlbEl0ZW1zWzBdKTtcbiAgICByZWVsUmVzdWx0LnB1c2gocmVlbHMucmVlbExpc3RbaW5kZXhdLnJlZWxJdGVtc1sxXSk7XG4gICAgcmVlbFJlc3VsdC5wdXNoKHJlZWxzLnJlZWxMaXN0W2luZGV4XS5yZWVsSXRlbXNbMl0pO1xuXG4gICAgc3BpblJlc3VsdC5wdXNoKHJlZWxSZXN1bHQpO1xuICB9KTtcblxuICBjb25zb2xlLmxvZyhcIlNQSU4gUkVTVUxUXCIsIHNwaW5SZXN1bHQpO1xuICByZXR1cm4gZmFsc2U7XG59O1xuLy8gUmFuZG9tbHkgYXNzaWduIG51ZGdlc1xuY29uc3QgYXNzaWduTnVkZ2VzID0gKCkgPT4ge1xuICAvLyBSYW5kb21seSBhc3NpZ24gbnVkZ2VzXG4gIGNvbnN0IG51ZGdlUmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbnVkZ2VDaGFuY2UgKyAxKTtcblxuICAvLyBJZiByYW5kb20gY2hhbmNlIGlzIG1ldCB0aGVuIGFzc2lnbiBudWRnZXNcbiAgaWYgKG51ZGdlUmFuZG9tID09PSBudWRnZUNoYW5jZSkge1xuICAgIGNhbk51ZGdlID0gdHJ1ZTtcbiAgICBlbmFibGVOdWRnZXMoKTtcbiAgICBudWRnZXMubnVkZ2VzUmVtYWluaW5nID0gNTtcbiAgICBudWRnZXMucmVuZGVyKCk7XG4gIH0gZWxzZSBpZiAobnVkZ2VzLm51ZGdlc1JlbWFpbmluZyA8IDEpIHtcbiAgICAvLyBJZiBubyBudWRnZXMgbGVmdCBpbiBiYW5rXG4gICAgY2FuTnVkZ2UgPSBmYWxzZTtcbiAgICBkaXNhYmxlTnVkZ2VzKCk7XG4gIH1cbn07XG5cbi8vIFJhbmRvbWx5IGFzc2lnbiBob2xkc1xuY29uc3QgYXNzaWduSG9sZHMgPSAoKSA9PiB7XG4gIGNvbnN0IGhvbGRSYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBob2xkQ2hhbmNlICsgMSk7XG5cbiAgLy8gUmFuZG9tbHkgYXNzaWduIGhvbGRzIChpZiBubyBudWRnZXMgbGVmdCBpbiBiYW5rKVxuICAvLyBBc3NpZ24gaG9sZCBpZiByYW5kb20gbnVtYmVyIG1ldCBhbmQgbGFzdCBzcGluIHdhc24ndCBhIHdpblxuICBpZiAobnVkZ2VzLm51ZGdlc1JlbWFpbmluZyA8IDEpIHtcbiAgICBpZiAoaG9sZFJhbmRvbSA9PT0gaG9sZENoYW5jZSkge1xuICAgICAgLy8gQ2FuIGhvbGRcbiAgICAgIGNhbkhvbGQgPSB0cnVlO1xuICAgICAgYnV0dG9uU3R5bGVzKGhvbGRCdXR0b25MaXN0LCBcImFkZFwiLCBcImFjdGl2ZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FuSG9sZCA9IGZhbHNlO1xuICAgICAgYnV0dG9uU3R5bGVzKGhvbGRCdXR0b25MaXN0LCBcInJlbW92ZVwiLCBcImFjdGl2ZVwiKTtcbiAgICAgIGJ1dHRvblN0eWxlcyhob2xkQnV0dG9uTGlzdCwgXCJyZW1vdmVcIiwgXCJoZWxkXCIpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gRW5hYmxlIGFsbCBudWRnZXNcbmNvbnN0IGVuYWJsZU51ZGdlcyA9ICgpID0+IHtcbiAgcmVlbHMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgIC8vIElmIHRoZSByZWVsIGlzbid0IGhlbGRcbiAgICBpZiAoIXJlZWwuaXNIZWxkKSB7XG4gICAgICByZWVsLmNhbk51ZGdlID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbnVkZ2VCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gSWYgdGhlIHJlZWwgaXNuJ3QgaGVsZFxuICAgIGlmICghcmVlbHMucmVlbExpc3RbaV0uaXNIZWxkKSB7XG4gICAgICBudWRnZUJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICB9XG4gIH1cblxuICBudWRnZXNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbn07XG5cbi8vIEVuYmFsZSBhbGwgaG9sZHNcbmNvbnN0IGVuYWJsZUhvbGRzID0gKCkgPT4ge1xuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgcmVlbC5jYW5Ib2xkID0gdHJ1ZTtcbiAgfSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBob2xkQnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGhvbGRCdXR0b25MaXN0W2ldLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIH1cblxuICBjYW5ob2xkID0gdHJ1ZTtcbn07XG5cbi8vIERpc2FibGUgYWxsIG51ZGdlc1xuY29uc3QgZGlzYWJsZU51ZGdlcyA9ICgpID0+IHtcbiAgcmVlbHMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgIHJlZWwuY2FuTnVkZ2UgPSBmYWxzZTtcbiAgfSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudWRnZUJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBudWRnZUJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgfVxuXG4gIG51ZGdlcy5yZXNldCgpO1xuXG4gIGNhbk51ZGdlID0gZmFsc2U7XG5cbiAgbnVkZ2VzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG59O1xuXG4vLyBEaXNhYmxlIGFsbCBob2xkc1xuY29uc3QgZGlzYWJsZUhvbGRzID0gKCkgPT4ge1xuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgcmVlbC5jYW5Ib2xkID0gZmFsc2U7XG4gICAgcmVlbC5pc0hlbGQgPSBmYWxzZTtcbiAgICBpZiAocmVlbC5ydW5UaW1lIDwgMSkge1xuICAgICAgcmVlbC5yZXNldFJ1bnRpbWUoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaG9sZEJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBob2xkQnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIsIFwiaGVsZFwiKTtcbiAgfVxuXG4gIGNhbkhvbGQgPSBmYWxzZTtcbn07XG5cbi8vIEVuYWJsZSBzcGluXG5jb25zdCBlbmFibGVTcGluID0gKCkgPT4ge1xuICBzcGluQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIGNhblNwaW4gPSB0cnVlO1xufTtcblxuLy8gRGlzYmFsZSBzcGluXG5jb25zdCBkaXNhYmxlU3BpbiA9ICgpID0+IHtcbiAgc3BpbkJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICBjYW5TcGluID0gZmFsc2U7XG59O1xuXG4vLyBBZGQgb3IgcmVtb3ZlIGdyb3VwIGJ1dHRvbiBzdHlsZXNcbmNvbnN0IGJ1dHRvblN0eWxlcyA9IChidXR0b25MaXN0LCBhZGRSZW1vdmUsIGNsYXNzTmFtZSkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYWRkUmVtb3ZlID09PSBcImFkZFwiKSB7XG4gICAgICBidXR0b25MaXN0W2ldLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9IGVsc2UgaWYgKGFkZFJlbW92ZSA9PT0gXCJyZW1vdmVcIikge1xuICAgICAgYnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgfVxuICB9XG59O1xuLy8gR2FtZSBzdGF0ZVxuY29uc3QgZ2FtZVN0YXRlcyA9IHtcbiAgY3VycmVudFN0YXRlOiBudWxsLFxuICB3aW5BbW91bnQ6IDAsXG4gIG9sZFdpbkRpc3BsYXk6IDAsIC8vIFdoZW4gbG9vcGluZyB0aHJvdWdoIHdpbiBpbmNyZW1lbnQgLSB0aGlzIGlzIHRoZSBvcmlnaW5hbCBmaWd1cmVcbiAgY3VycmVudFdpbkRpc3BsYXk6IDAsIC8vIFdoZW4gbG9vcGluZyB0aHJvdWdoIHdpbiBhbW91bnQgLSB0aGlzIGlzIHRoZSBuZXcgZmlndXJlXG5cbiAgLy8gUmVndWxhciBzcGluXG4gIHNwaW46IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNwaW5UeXBlID0gXCJzcGluXCI7XG4gICAgZGlzYWJsZVNwaW4oKTtcbiAgICBtb3ZlUmVlbHMoKTtcbiAgICByZW5kZXIoKTtcblxuICAgIC8vIEZpbHRlciByZWVsIHJ1bnRpbWVzIC0gaWYgb25lIGlzIGFib3ZlIHplcm8gdGhlbiBjYXJyeSBvblxuICAgIHJlZWxzUnVubmluZyA9IHJlZWxzLnJlZWxMaXN0LmZpbHRlcigocmVlbCkgPT4ge1xuICAgICAgcmV0dXJuIHJlZWwucnVuVGltZSA+IDA7XG4gICAgfSk7XG5cbiAgICBpZiAoIXJlZWxzUnVubmluZy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5zcGluRmluaXNoZWQ7XG4gICAgfVxuICB9LFxuICAvLyBTcGluIGZpbmlzaGVkXG4gIHNwaW5GaW5pc2hlZDogZnVuY3Rpb24gKGN1cnJlbnRUaW1lKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuXG4gICAgaWYgKG51ZGdlcy5udWRnZXNSZW1haW5pbmcgPCAxKSB7XG4gICAgICBkaXNhYmxlTnVkZ2VzKCk7XG4gICAgICBpZiAoc3BpblR5cGUgIT09IFwibnVkZ2VcIikge1xuICAgICAgICBkaXNhYmxlSG9sZHMoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3Igd2luXG4gICAgY29uc3Qgd2luID0gY2hlY2tXaW4oKTtcblxuICAgIC8vIFdpblxuICAgIGlmICh3aW4pIHtcbiAgICAgIC8vIFJlc2V0IG51ZGdlc1xuICAgICAgbnVkZ2VzLnJlc2V0KCk7XG4gICAgICBjYW5OdWRnZSA9IGZhbHNlO1xuICAgICAgZGlzYWJsZU51ZGdlcygpO1xuICAgICAgZGlzYWJsZUhvbGRzKCk7XG4gICAgICBkaXNhYmxlU3BpbigpO1xuXG4gICAgICBub3cgPSBjdXJyZW50VGltZTtcbiAgICAgIHRoaXMud2luQW1vdW50ID0gd2luO1xuXG4gICAgICByZW5kZXIoKTtcbiAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy53aW47IC8vIFN3aXRjaCB0byB3aW4gYW5pbWF0aW9uIHN0YXRlXG4gICAgICBnYW1lTG9vcCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICB9XG4gICAgLy8gTm8gd2luXG4gICAgZWxzZSB7XG4gICAgICBpZiAoXG4gICAgICAgIG51ZGdlcy5udWRnZXNSZW1haW5pbmcgPCAxICYmXG4gICAgICAgIHNwaW5UeXBlICE9PSBcIm51ZGdlXCIgJiZcbiAgICAgICAgY3JlZGl0cy5jcmVkaXRzUmVtYWluaW5nID4gMFxuICAgICAgKSB7XG4gICAgICAgIC8vIElmIG5vIHdpbm5pbmcgbGluZSB0aGVuIGFzc2lnbiBob2xkcyBhbmQgbnVkZ2VzXG4gICAgICAgIGFzc2lnbkhvbGRzKCk7XG4gICAgICAgIGFzc2lnbk51ZGdlcygpO1xuICAgICAgfVxuXG4gICAgICAvLyBFbmFibGUgc3BpblxuICAgICAgZW5hYmxlU3BpbigpO1xuXG4gICAgICAvLyBDaGVjayBjcmVkaXRzXG4gICAgICBpZiAoY3JlZGl0cy5jcmVkaXRzUmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5nYW1lT3ZlcjtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIC8vIE51ZGdlXG4gIG51ZGdlOiBmdW5jdGlvbiAoY3VycmVudFRpbWUpIHtcbiAgICBsZXQgaXNOdWRnaW5nID0gW107XG4gICAgLy8gSWYgbnVkZ2luZyBzdG9wcGVkLCB0aGVuIGNoYW5nZSBnYW1lc3RhdGUgdG8gc3BpbmZpbmlzaGVkXG4gICAgaXNOdWRnaW5nID0gcmVlbHMucmVlbExpc3QuZmlsdGVyKChyZWVsKSA9PiB7XG4gICAgICByZXR1cm4gcmVlbC5pc051ZGdpbmcgPT09IHRydWU7XG4gICAgfSk7XG5cbiAgICBpZiAoIWlzTnVkZ2luZy5sZW5ndGgpIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcbiAgICAgIHRoaXMuc3BpbkZpbmlzaGVkKGN1cnJlbnRUaW1lKTtcbiAgICB9XG5cbiAgICBpc051ZGdpbmcuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgICAgcmVlbC5udWRnZSgpO1xuICAgICAgcmVuZGVyKCk7XG4gICAgfSk7XG4gIH0sXG4gIC8vIFdpbiBhbmltYXRpb25cbiAgd2luOiBmdW5jdGlvbiAoY3VycmVudFRpbWUpIHtcbiAgICB3aW5JbmRpY2F0b3JDZW50cmVMaW5lLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgd2luQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG5cbiAgICBkaXNhYmxlU3BpbigpO1xuICAgIGRpc2FibGVIb2xkcygpO1xuXG4gICAgaWYgKGN1cnJlbnRUaW1lIC0gbm93ID4gNTApIHtcbiAgICAgIG5vdyA9IGN1cnJlbnRUaW1lO1xuICAgICAgdGhpcy5jdXJyZW50V2luRGlzcGxheSArPSAxO1xuICAgICAgd2luLmN1cnJlbnRXaW4gPSB0aGlzLmN1cnJlbnRXaW5EaXNwbGF5O1xuICAgICAgd2luLnJlbmRlcigpO1xuXG4gICAgICBpZiAodGhpcy5jdXJyZW50V2luRGlzcGxheSAtIHRoaXMub2xkV2luRGlzcGxheSA9PT0gdGhpcy53aW5BbW91bnQpIHtcbiAgICAgICAgLy8gRmluaXNoZWQgbG9vcGluZ1xuICAgICAgICB0aGlzLm9sZFdpbkRpc3BsYXkgPSB0aGlzLmN1cnJlbnRXaW5EaXNwbGF5O1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG4gICAgICAgIGVuYWJsZVNwaW4oKTtcbiAgICAgICAgd2luQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIHZpZXdwb3J0Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIHdpbkluZGljYXRvckxlZnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgd2luSW5kaWNhdG9yUmlnaHQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgd2luSW5kaWNhdG9yQ2VudHJlTGluZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuXG4gICAgICAgIC8vIENoZWNrIGNyZWRpdHNcbiAgICAgICAgaWYgKGNyZWRpdHMuY3JlZGl0c1JlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5nYW1lT3ZlcjtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvLyBHYW1lIG92ZXIgLSBjcmVkaXRzIHJhbiBvdXRcbiAgZ2FtZU92ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG4gICAgZGlzYWJsZVNwaW4oKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChwbGF5U2VjdGlvbik7XG5cbiAgICAgIGRpc2FibGVOdWRnZXMoKTtcbiAgICAgIGRpc2FibGVIb2xkcygpO1xuXG4gICAgICByZW5kZXJHYW1lT3ZlclNlY3Rpb24oKTtcblxuICAgICAgdGhpcy53aW5BbW91bnQgPSAwO1xuICAgICAgdGhpcy5vbGRXaW5EaXNwbGF5ID0gMDtcbiAgICAgIHRoaXMuY3VycmVudFdpbkRpc3BsYXkgPSAwO1xuICAgIH0sIDEwMDApO1xuICB9LFxufTtcblxuLy8gUHJlbG9hZCBpbWFnZXMgdGhlbiBzdGFydCBnYW1lXG52YXIgbG9hZGVkID0gMDtcbnZhciBpbWFnZUxpc3QgPSBbXTtcbmxldCBpbWc7XG5cbklURU1fSU5GTy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gIGltZyA9IG5ldyBJbWFnZSgpO1xuICBpbWcuc3JjID0gXCIuL2ltZy9cIiArIGl0ZW0uaW1hZ2VTcmM7XG4gIGNvbnNvbGUubG9nKFwiSU1BR0VcIiwgaW1nKTtcbiAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICBsb2FkZWQrKztcbiAgICBpZiAobG9hZGVkID09PSBJVEVNX0lORk8ubGVuZ3RoKSBpbml0KCk7XG4gIH07XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc2Nzcy9hcHAuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHZpZXdwb3J0ID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld1ZpZXdwb3J0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgbmV3Vmlld3BvcnQud2lkdGggPSBWSUVXUE9SVF9XSURUSDtcbiAgICBuZXdWaWV3cG9ydC5oZWlnaHQgPSBWSUVXUE9SVF9IRUlHSFQ7XG4gICAgbmV3Vmlld3BvcnQuaWQgPSBcInZpZXdwb3J0XCI7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB2aWV3cG9ydDogbmV3Vmlld3BvcnQsXG4gICAgICAgIHdpZHRoOiBWSUVXUE9SVF9XSURUSCxcbiAgICAgICAgaGVpZ2h0OiBWSUVXUE9SVF9IRUlHSFQsXG4gICAgICAgIGN0eDogbmV3Vmlld3BvcnQuZ2V0Q29udGV4dCgnMmQnKSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCB2aWV3cG9ydENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3cG9ydENvbnRhaW5lcicpO1xuICAgICAgICAgICAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy52aWV3cG9ydCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpXG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdmlld3BvcnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL3ZpZXdwb3J0LmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHJlZWwgZnJvbSAnLi9yZWVsJztcblxuY29uc3QgcmVlbHMgPSAoKSA9PiB7XG4gICAgbGV0IG5ld1JlZWw7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVlbExpc3Q6IFtdLFxuICAgICAgICBidWlsZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOT19SRUVMUzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbmV3UmVlbCA9IHJlZWwoaSk7XG4gICAgICAgICAgICAgICAgbmV3UmVlbC5idWlsZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVlbExpc3QucHVzaChuZXdSZWVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlZWwucnVuVGltZSA+IDAgJiYgIXJlZWwuaXNIZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZWwubW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICByZXNldFJ1bnRpbWVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcbiAgICAgICAgICAgICAgICByZWVsLnJlc2V0UnVudGltZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVlbC5yZW5kZXIoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVlbHM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL3JlZWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCByZWVsSXRlbSBmcm9tICcuL3JlZWxJdGVtJztcblxuY29uc3QgcmVlbCA9IChyZWVsTm8pID0+IHtcbiAgICBsZXQgZmlyc3RJdGVtO1xuICAgIGxldCBsYXN0SXRlbTtcbiAgICBsZXQgbnVkZ2VDYWxsVGltZXM7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBub09mSXRlbXM6IE5PX0lURU1TLFxuICAgICAgICBpdGVtTGlzdDogSVRFTV9MSVNULFxuICAgICAgICByZWVsU3BlZWQ6IFJFRUxfU1BFRUQsXG4gICAgICAgIG51ZGdlU3BlZWQ6IDEwLFxuICAgICAgICBydW5UaW1lOiAoUkVFTF9TUEVFRCAqIDEwKSArICgyMCAqIHJlZWxObyksIC8vIEFyYml0cmFyeSB2YWx1ZXMgZm9yIHRlc3RpbmdcbiAgICAgICAgY2FuSG9sZDogZmFsc2UsXG4gICAgICAgIGlzSGVsZDogZmFsc2UsXG4gICAgICAgIGNhbk51ZGdlOiBmYWxzZSxcbiAgICAgICAgaXNOdWRnaW5nOiBmYWxzZSxcbiAgICAgICAgbnVkZ2VGcmFtZXM6IElURU1fSEVJR0hUIC8gTlVER0VfU1BFRUQsXG4gICAgICAgIG51ZGdlRnJhbWU6IDAsXG4gICAgICAgIHJlZWxJdGVtczogW10sXG4gICAgICAgIHJlZWxObyxcbiAgICAgICAgYnVpbGQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBpdGVtTm8gPSAwO1xuICAgICAgICAgICAgbGV0IHR5cGU7XG4gICAgICAgICAgICBsZXQgaW5zdGFuY2VzO1xuICAgICAgICAgICAgbGV0IGltYWdlU3JjO1xuICAgICAgICAgICAgbGV0IHdpbkFtb3VudDtcbiAgICAgICAgICAgIGxldCB4O1xuICAgICAgICAgICAgbGV0IHk7XG4gICAgICAgICAgICBsZXQgbmV3UmVlbEl0ZW07XG5cbiAgICAgICAgICAgIElURU1fSU5GTy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIHR5cGUgPSBpdGVtLnR5cGU7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VzID0gaXRlbS5pbnN0YW5jZXM7XG4gICAgICAgICAgICAgICAgaW1hZ2VTcmMgPSBpdGVtLmltYWdlU3JjO1xuICAgICAgICAgICAgICAgIHdpbkFtb3VudCA9IGl0ZW0ud2luQW1vdW50O1xuXG4gICAgICAgICAgICAgICAgLy8gQWRkIHJlcXVpcmVkIG5vIG9mIGluc3RhbmNlcyBvZiB0aGlzIGl0ZW0gdG8gdGhlIHJlZWxJdGVtcyBhcnJheVxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdGFuY2VzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgeCA9IFZJRVdQT1JUX1ggKyAodGhpcy5yZWVsTm8gKiBSRUVMX1dJRFRIKSArICh0aGlzLnJlZWxObyAqIFJFRUxfU1BBQ0lORyk7XG5cbiAgICAgICAgICAgICAgICAgICAgeSA9IChWSUVXUE9SVF9ZIC0gSVRFTV9IRUlHSFQpIC0gKElURU1fSEVJR0hUICogaXRlbU5vKSAtIDEwMDtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgaW1nLnNyYyA9ICcuL2ltZy8nICsgaXRlbS5pbWFnZVNyYztcblxuICAgICAgICAgICAgICAgICAgICBuZXdSZWVsSXRlbSA9IHJlZWxJdGVtKHR5cGUsIGl0ZW1ObywgaW1nLCB4LCB5LCB3aW5BbW91bnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZWxJdGVtcy5wdXNoKG5ld1JlZWxJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbU5vKys7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5zaHVmZmxlKCk7XG4gICAgICAgICAgICB0aGlzLnJlc2V0Q29vcmRzKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHNodWZmbGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBybmQ7XG4gICAgICAgICAgICBsZXQgdGVtcDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnJlZWxJdGVtcy5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgcm5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgICAgICAgICAgICAgdGVtcCA9IHRoaXMucmVlbEl0ZW1zW2ldO1xuICAgICAgICAgICAgICAgIHRoaXMucmVlbEl0ZW1zW2ldID0gdGhpcy5yZWVsSXRlbXNbcm5kXTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZWxJdGVtc1tybmRdID0gdGVtcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbnVkZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMucmVlbEl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLm51ZGdlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5zaGlmdCgpO1xuXG4gICAgICAgICAgICB0aGlzLm51ZGdlRnJhbWUrKztcblxuICAgICAgICAgICAgaWYgKHRoaXMubnVkZ2VGcmFtZSA+PSB0aGlzLm51ZGdlRnJhbWVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc051ZGdpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLm51ZGdlRnJhbWUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZXNldENvb3JkczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJlZWxJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVlbEl0ZW1zW2ldLnkgPSBWSUVXUE9SVF9ZICsgVklFV1BPUlRfSEVJR0hUIC0gSVRFTV9IRUlHSFQgLSAoSVRFTV9IRUlHSFQgKiBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVzZXRSdW50aW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNIZWxkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ydW5UaW1lID0gKFJFRUxfU1BFRUQgKiAxMCkgKyAoMjAgKiByZWVsTm8pOyAvLyBBcmJpdHJhcnkgdmFsdWVzIGZvciB0ZXN0aW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzaGlmdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gSWYgYm90dG9tIHJlZWwgaXRlbSBnZXRzIGJlbG93IGJvdHRvbSBvZiB2aWV3cG9ydCB0aGVuIG1vdmUgaXQgdG8gYmVnaW5uaW5nIG9mIGFycmF5XG4gICAgICAgICAgICBpZiAodGhpcy5yZWVsSXRlbXNbMF0ueSA+PSBWSUVXUE9SVF9ZICsgVklFV1BPUlRfSEVJR0hUKSB7XG4gICAgICAgICAgICAgICAgZmlyc3RJdGVtID0gdGhpcy5yZWVsSXRlbXNbMF07XG4gICAgICAgICAgICAgICAgbGFzdEl0ZW0gPSB0aGlzLnJlZWxJdGVtc1t0aGlzLnJlZWxJdGVtcy5sZW5ndGggLSAxXTtcblxuICAgICAgICAgICAgICAgIC8vIFJlc3QgeSBjb29yZHMgZm9yIGl0ZW0gdG8gc2hpZnQgdG8gdG9wIG9mIHJlZWxcbiAgICAgICAgICAgICAgICBmaXJzdEl0ZW0ueSA9IGxhc3RJdGVtLnkgLSBJVEVNX0hFSUdIVDtcblxuICAgICAgICAgICAgICAgIC8vIFNoaWZ0IGJvdHRvbSBpdGVtIHRvIHRvcFxuICAgICAgICAgICAgICAgIHRoaXMucmVlbEl0ZW1zLnB1c2godGhpcy5yZWVsSXRlbXMuc2hpZnQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMucmVlbEl0ZW1zLmZvckVhY2goKHJlZWxJdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVlbEl0ZW0ubW92ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnNoaWZ0KCk7XG4gICAgICAgICAgICAvLyBSZWR1Y2UgcmVlbCBydW50aW1lXG4gICAgICAgICAgICB0aGlzLnJ1blRpbWUtLTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZWxJdGVtcy5mb3JFYWNoKChyZWVsSXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlZWxJdGVtLnJlbmRlcigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVlbDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvbXBvbmVudHMvcmVlbC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHJlZWxJdGVtID0gKHR5cGUsIGl0ZW1ObywgaW1nLCB4LCB5LCB3aW5BbW91bnQpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlLFxuICAgIGl0ZW1ObyxcbiAgICBpbWcsXG4gICAgeCxcbiAgICB5LFxuICAgIHdpbkFtb3VudCxcbiAgICBzcGVlZDogUkVFTF9TUEVFRCxcbiAgICBudWRnZVNwZWVkOiBOVURHRV9TUEVFRCxcbiAgICBjdHg6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlld3BvcnRcIikuZ2V0Q29udGV4dChcIjJkXCIpLFxuICAgIG1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMueSArPSB0aGlzLnNwZWVkO1xuICAgIH0sXG4gICAgbnVkZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMueSArPSB0aGlzLm51ZGdlU3BlZWQ7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShcbiAgICAgICAgdGhpcy5pbWcsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIElURU1fV0lEVEgsXG4gICAgICAgIElURU1fSEVJR0hULFxuICAgICAgICB0aGlzLngsXG4gICAgICAgIHRoaXMueSxcbiAgICAgICAgSVRFTV9XSURUSCxcbiAgICAgICAgSVRFTV9IRUlHSFRcbiAgICAgICk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlZWxJdGVtO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL3JlZWxJdGVtLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGRpZ2l0cyA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBkaWdpdHNTdHJpbmc6IG51bGwsXG4gICAgICAgIGNvbnRhaW5lcjogbnVsbCwgLy8gQ29udGFpbmVyIHRoYXQgaG9sZHMgZGlnaXRDb250YWluZXJzXG4gICAgICAgIGRpZ2l0Q29udGFpbmVyczogbnVsbCwgLy8gTGlzdCBvZiBkaWdpdCBjb250YWluZXJzIHRoYXQgaG9sZCBzaW5nbGUgZGlnaXQgZWFjaFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIC8vIFNwbGl0IG51bWJlciBpbnRvIHNlcGVyYXRlIGNoYXJhY3RlcnNcbiAgICAgICAgICAgIHRoaXMuZGlnaXRDb250YWluZXJzID0gdGhpcy5jb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGlnaXQtbnVtYmVyJyk7IFxuICAgICAgICAgICAgbGV0IGRpZ2l0SW5kZXg7IC8vIFdoaWNoIGRpZ2l0IGNvbnRhaW5lciB0byBwdXQgbnVtYmVyIGluXG5cbiAgICAgICAgICAgIC8vIFdpcGUgdGhlIGRpZ2l0c1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRpZ2l0Q29udGFpbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlnaXRDb250YWluZXJzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlnaXRDb250YWluZXJzW2ldLmlubmVySFRNTCA9ICc4JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUG9wdWxhdGUgdGhlIGRpZ2l0c1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRpZ2l0c1N0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGRpZ2l0SW5kZXggPSAodGhpcy5kaWdpdENvbnRhaW5lcnMubGVuZ3RoKSAtICh0aGlzLmRpZ2l0c1N0cmluZy5sZW5ndGggLSBpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpZ2l0Q29udGFpbmVyc1tkaWdpdEluZGV4XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpZ2l0Q29udGFpbmVyc1tkaWdpdEluZGV4XS5pbm5lckhUTUwgPSB0aGlzLmRpZ2l0c1N0cmluZ1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBkaWdpdHM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL2RpZ2l0cy5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZGlnaXRzIGZyb20gJy4vZGlnaXRzJztcblxuY29uc3QgY3JlZGl0cyA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVkaXRzUmVtYWluaW5nOiBDUkVESVRTLFxuICAgICAgICBkaWdpdHM6IGRpZ2l0cygpLFxuICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVkaXRzJyksXG4gICAgICAgIHVzZUNyZWRpdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jcmVkaXRzUmVtYWluaW5nLS07XG4gICAgICAgIH0sXG4gICAgICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWRpdHNSZW1haW5pbmcgPSBDUkVESVRTO1xuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLmRpZ2l0c1N0cmluZyA9IHRoaXMuY3JlZGl0c1JlbWFpbmluZy50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5kaWdpdHMuY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgICAgICB0aGlzLmRpZ2l0cy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVkaXRzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy9jcmVkaXRzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBkaWdpdHMgZnJvbSAnLi9kaWdpdHMnO1xuXG5jb25zdCB3aW4gPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3VycmVudFdpbjogMCxcbiAgICAgICAgZGlnaXRzOiBkaWdpdHMoKSxcbiAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2luJyksXG4gICAgICAgIGFkZFdpbjogZnVuY3Rpb24od2luQW1vdW50KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRXaW4gKz0gd2luQW1vdW50O1xuICAgICAgICB9LFxuICAgICAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRXaW4gPSAwO1xuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5kaWdpdHMuZGlnaXRzU3RyaW5nID0gdGhpcy5jdXJyZW50V2luLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmRpZ2l0cy5jb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvbXBvbmVudHMvd2luLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBob2xkQnV0dG9uIGZyb20gJy4vaG9sZEJ1dHRvbic7XG5cbmNvbnN0IGhvbGRCdXR0b25zID0gKCkgPT4ge1xuICAgIGxldCBuZXdCdXR0b247XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBidXR0b25MaXN0OiBbXSxcbiAgICAgICAgYnVpbGQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTk9fUkVFTFM7IGkrKykge1xuICAgICAgICAgICAgICAgIG5ld0J1dHRvbiA9IGhvbGRCdXR0b24oaSk7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25MaXN0LnB1c2gobmV3QnV0dG9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbkxpc3QuZm9yRWFjaCgoYnRuLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGJ0bi5yZW5kZXIoaW5kZXgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaG9sZEJ1dHRvbnM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL2hvbGRCdXR0b25zLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGhvbGRCdXR0b24gPSAoaW5kZXgpID0+IHtcbiAgICBsZXQgaG9sZEJ1dHRvbjtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvbGRCdXR0b25zJyksXG4gICAgICAgIHJlZWxObzogaW5kZXgsXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaG9sZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgaG9sZEJ1dHRvbi5pbm5lckhUTUwgPSAnSE9MRCc7XG4gICAgICAgICAgICBob2xkQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hvbGQtYnV0dG9uJywgJ2J1dHRvbicpO1xuICAgICAgICAgICAgaG9sZEJ1dHRvbi5zdHlsZS53aWR0aCA9IEJVVFRPTl9XSURUSCArICdweCc7XG4gICAgICAgICAgICBob2xkQnV0dG9uLnN0eWxlLm1hcmdpbkxlZnQgPSAoUkVFTF9TUEFDSU5HIC8gMikgKyAoKFJFRUxfV0lEVEggLSBCVVRUT05fV0lEVEgpIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgaG9sZEJ1dHRvbi5zdHlsZS5tYXJnaW5SaWdodCA9IChSRUVMX1NQQUNJTkcgLyAyKSArICgoUkVFTF9XSURUSCAtIEJVVFRPTl9XSURUSCkgLyAyKSArICdweCc7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChob2xkQnV0dG9uKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBob2xkQnV0dG9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy9ob2xkQnV0dG9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBudWRnZUJ1dHRvbiBmcm9tICcuL251ZGdlQnV0dG9uJztcblxuY29uc3QgbnVkZ2VCdXR0b25zID0gKCkgPT4ge1xuICAgIGxldCBuZXdCdXR0b247XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBidXR0b25MaXN0OiBbXSxcbiAgICAgICAgYnVpbGQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOT19SRUVMUzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbmV3QnV0dG9uID0gbnVkZ2VCdXR0b24oaSk7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25MaXN0LnB1c2gobmV3QnV0dG9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uTGlzdC5mb3JFYWNoKChidG4sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgYnRuLnJlbmRlcihpbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBudWRnZUJ1dHRvbnM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL251ZGdlQnV0dG9ucy5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBudWRnZUJ1dHRvbiA9IChpbmRleCkgPT4ge1xuICAgIGxldCBudWRnZUJ1dHRvbjtcbiAgICBsZXQgbnVkZ2VCdXR0b25Db250YWluZXI7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdudWRnZUJ1dHRvbnMnKSxcbiAgICAgICAgcmVlbE5vOiBpbmRleCxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBudWRnZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgbnVkZ2VCdXR0b24uaW5uZXJIVE1MID0gJ05VREdFJztcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ251ZGdlLWJ1dHRvbicsICdidXR0b24nKTtcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uLnN0eWxlLndpZHRoID0gQlVUVE9OX1dJRFRIICsgJ3B4JztcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uLnN0eWxlLm1hcmdpbkxlZnQgPSAoUkVFTF9TUEFDSU5HIC8gMikgKyAoKFJFRUxfV0lEVEggLSBCVVRUT05fV0lEVEgpIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgbnVkZ2VCdXR0b24uc3R5bGUubWFyZ2luUmlnaHQgPSAoUkVFTF9TUEFDSU5HIC8gMikgKyAoKFJFRUxfV0lEVEggLSBCVVRUT05fV0lEVEgpIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQobnVkZ2VCdXR0b24pO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG51ZGdlQnV0dG9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy9udWRnZUJ1dHRvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZGlnaXRzIGZyb20gJy4vZGlnaXRzJztcblxuY29uc3QgbnVkZ2VzID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIG51ZGdlc1JlbWFpbmluZzogMCxcbiAgICAgICAgZGlnaXRzOiBkaWdpdHMoKSxcbiAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbnVkZ2VzJyksXG4gICAgICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMubnVkZ2VzUmVtYWluaW5nID0gMDtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmRpZ2l0cy5kaWdpdHNTdHJpbmcgPSB0aGlzLm51ZGdlc1JlbWFpbmluZy50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5kaWdpdHMuY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgICAgICB0aGlzLmRpZ2l0cy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBudWRnZXM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL251ZGdlcy5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==