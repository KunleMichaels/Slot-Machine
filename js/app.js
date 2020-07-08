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
// const spinButton = document.getElementById('spinButton');
const winContainer = document.getElementById("win");
const nudgesContainer = document.getElementById("nudges");
let playSection = document.getElementById("playSection");

let viewportContainer;
let nudgeButtonContainer;
let holdButtonContainer;
let winIndicatorLeft;
let winIndicatorRight;
let winIndicatorTopLine;
let winIndicatorCentreLine;
let winIndicatorBottomLine;
let spinButton;
let reels;
let nudges;
let nudgeButtons;
let holdButtons;
let nudgeButtonList;
let holdButtonList;
let credits;
let win;
let winningRows = [];
let gameLoop;
let nudgeChance = 2; // Chance of getting nudges after spin (1 in nudgeChance)
let holdChance = 2; // Chance of getting holds after spin (1 in holdChance)
let canSpin;
let canNudge;
let canHold;
let now; // Current time to compare against
let reelsRunning = []; // Keeps track of any reels with runtime left on them to estblish whether to reset/stop spin etc.
let spinType = "spin"; // Keeps track of whether last spin was regular spin or nudge

const init = () => {
  renderViewportContainer();

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

      // Disable hold buttons that aren't held
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

const renderViewportContainer = () => {
  // Render viewport container
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

  // Top line
  winIndicatorTopLine = document.createElement("div");
  winIndicatorTopLine.classList.add("win-indicator-top-line");

  winIndicatorTopLine.style.left = winIndicatorLeft.offsetWidth + "px";

  winIndicatorTopLine.style.width =
    viewportContainer.offsetWidth -
    winIndicatorLeft.offsetWidth -
    winIndicatorRight.offsetWidth +
    "px";

  viewportContainer.appendChild(winIndicatorTopLine);

  // Bottom line
  winIndicatorBottomLine = document.createElement("div");
  winIndicatorBottomLine.classList.add("win-indicator-bottom-line");

  winIndicatorBottomLine.style.left = winIndicatorLeft.offsetWidth + "px";

  winIndicatorBottomLine.style.width =
    viewportContainer.offsetWidth -
    winIndicatorLeft.offsetWidth -
    winIndicatorRight.offsetWidth +
    "px";

  viewportContainer.appendChild(winIndicatorBottomLine);
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
  nudges.render();
  credits.render();
  win.render();
};

// Calculates win amount, if winning line
const checkWin = () => {
  let spinResult = []; // Array of reel results after spin (all three visible objects of each reel)
  let reelResult; // Individual reel result, made of three objects (visible)

  // Check for win
  reels.reelList.forEach((reel, index) => {
    reelResult = []; // Result of individual reel

    reelResult.push(reels.reelList[index].reelItems[0]);
    reelResult.push(reels.reelList[index].reelItems[1]);
    reelResult.push(reels.reelList[index].reelItems[2]);

    spinResult.push(reelResult);
  });

  let result = getAllRowResults(spinResult);
  let currentWinAmount = 0;

  // All the possible winning possibilities and its prizes
  var winningCase = {
    top: {
      cherry: {
        validate: /4{3}/.test(result["top"]),
        value: 2000,
      },
      "7": {
        validate: /3{3}/.test(result["top"]),
        value: 150,
      },
      cherryOr7: {
        validate: /[4/3]{3}/.test(result["top"]),
        value: 75,
      },
      "3xBar": {
        validate: /0{3}/.test(result["top"]),
        value: 50,
      },
      "2xBar": {
        validate: /2{3}/.test(result["top"]),
        value: 20,
      },
      "1xBar": {
        validate: /1{3}/.test(result["top"]),
        value: 10,
      },
      anyBar: {
        validate: /[012]{3}/.test(result["top"]),
        value: 5,
      },
    },
    middle: {
      cherry: {
        validate: /4{3}/.test(result["middle"]),
        value: 1000,
      },
      "7": {
        validate: /3{3}/.test(result["middle"]),
        value: 150,
      },
      cherryOr7: {
        validate: /[4/3]{3}/.test(result["middle"]),
        value: 75,
      },
      "3xBar": {
        validate: /0{3}/.test(result["middle"]),
        value: 50,
      },
      "2xBar": {
        validate: /2{3}/.test(result["middle"]),
        value: 20,
      },
      "1xBar": {
        validate: /1{3}/.test(result["middle"]),
        value: 10,
      },
      anyBar: {
        validate: /[012]{3}/.test(result["middle"]),
        value: 5,
      },
    },
    bottom: {
      cherry: {
        validate: /4{3}/.test(result["bottom"]),
        value: 4000,
      },
      "7": {
        validate: /3{3}/.test(result["bottom"]),
        value: 150,
      },
      cherryOr7: {
        validate: /[4/3]{3}/.test(result["bottom"]),
        value: 75,
      },
      "3xBar": {
        validate: /0{3}/.test(result["bottom"]),
        value: 50,
      },
      "2xBar": {
        validate: /2{3}/.test(result["bottom"]),
        value: 20,
      },
      "1xBar": {
        validate: /1{3}/.test(result["bottom"]),
        value: 10,
      },
      anyBar: {
        validate: /[012]{3}/.test(result["bottom"]),
        value: 5,
      },
    },
  };

  // Loop through the winning possibilities
  // case winning draw the line in the winning row
  // update the view with the prize value
  for (let row in winningCase) {
    for (let item in winningCase[row]) {
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

const getAllRowResults = (spinResult) => {
  let top = "",
    middle = "",
    bottom = "";
  for (let i = 0; i < spinResult.length && spinResult.length === 3; i++) {
    top += spinResult[i][2].itemNo.toString();
    middle += spinResult[i][1].itemNo.toString();
    bottom += spinResult[i][0].itemNo.toString();
  }
  return {
    top,
    middle,
    bottom,
  };
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
    if (winningRows.includes("top"))
      winIndicatorTopLine.classList.add("active");
    if (winningRows.includes("middle"))
      winIndicatorCentreLine.classList.add("active");
    if (winningRows.includes("bottom"))
      winIndicatorBottomLine.classList.add("active");
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

const renderGameOverSection = () => {
  const gameOverSection = document.createElement("div");
  gameOverSection.id = "gameOverSection";

  gameOverSection.innerHTML = "<div>";
  gameOverSection.innerHTML += "<p>Game over</p>";
  gameOverSection.innerHTML += "<p>You won " + win.currentWin + " credits";
  gameOverSection.innerHTML += "<p>Press start to play again</p>";
  gameOverSection.innerHTML += "</div>";

  const startButton = document.createElement("button");
  startButton.id = "startButton";
  startButton.classList.add("button");
  startButton.innerText = "START";

  gameOverSection.appendChild(startButton);

  document.body.appendChild(gameOverSection);

  startButton.addEventListener("click", () => {
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
let img;

ITEM_INFO.forEach((item) => {
  img = new Image();
  img.src = "./img/" + item.imageSrc;
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
    runTime: REEL_SPEED * 10 + 20 * reelNo, // Arbitrary values for testing
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
          x =
            VIEWPORT_X + this.reelNo * REEL_WIDTH + this.reelNo * REEL_SPACING;

          y = VIEWPORT_Y - ITEM_HEIGHT - ITEM_HEIGHT * itemNo - 100;

          const img = new Image();
          img.src = "./img/" + item.imageSrc;

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
        this.reelItems[i].y =
          VIEWPORT_Y + VIEWPORT_HEIGHT - ITEM_HEIGHT - ITEM_HEIGHT * i;
      }
    },
    resetRuntime: function () {
      if (!this.isHeld) {
        this.runTime = REEL_SPEED * 10 + 20 * reelNo; // Arbitrary values for testing;
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
    },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDAyMDQxOTAwNDNmNDNiNWI0YzkiLCJ3ZWJwYWNrOi8vLy4vanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zY3NzL2FwcC5zY3NzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvdmlld3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9yZWVscy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL3JlZWwuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9yZWVsSXRlbS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2RpZ2l0cy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2NyZWRpdHMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy93aW4uanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9ob2xkQnV0dG9ucy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2hvbGRCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9udWRnZUJ1dHRvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9udWRnZUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL251ZGdlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNB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Q0E7O0FBRUE7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztBQzl2QkQseUM7Ozs7Ozs7Ozs7Ozs7O0FDQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsaUVBQVEsRTs7Ozs7OztBQ3ZCdkI7QUFBYTs7QUFFYTs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSxtRUFBVSxFOzs7Ozs7O0FDcEJ6QjtBQUFhOztBQUUyQjs7QUFFeEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsY0FBYztBQUN6Qyw0QkFBNEIscUVBQVc7QUFDdkM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVlLHFFQUFZLEU7Ozs7Ozs7QUN2QmQ7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsb0VBQVcsRTs7Ozs7OztBQ3JCMUI7QUFBYTs7QUFFaUI7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixnRUFBTTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSwrREFBTSxFIiwiZmlsZSI6Ii4vanMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDAyMDQxOTAwNDNmNDNiNWI0YzkiLCJpbXBvcnQgVmlld3BvcnQgZnJvbSBcIi4vY29tcG9uZW50cy92aWV3cG9ydFwiO1xuaW1wb3J0IFJlZWxzIGZyb20gXCIuL2NvbXBvbmVudHMvcmVlbHNcIjtcbmltcG9ydCBOdWRnZUJ1dHRvbnMgZnJvbSBcIi4vY29tcG9uZW50cy9udWRnZUJ1dHRvbnNcIjtcbmltcG9ydCBIb2xkQnV0dG9ucyBmcm9tIFwiLi9jb21wb25lbnRzL2hvbGRCdXR0b25zXCI7XG5pbXBvcnQgQ3JlZGl0cyBmcm9tIFwiLi9jb21wb25lbnRzL2NyZWRpdHNcIjtcbmltcG9ydCBXaW4gZnJvbSBcIi4vY29tcG9uZW50cy93aW5cIjtcbmltcG9ydCBOdWRnZXMgZnJvbSBcIi4vY29tcG9uZW50cy9udWRnZXNcIjtcblxuLy8gU2Fzc1xuaW1wb3J0IFwiLi4vc2Nzcy9hcHAuc2Nzc1wiO1xuXG4vLyBjcmVhdGVzIHRoZSBjYW52YXMgd2hpY2ggd2UgbmVlZCB0byBkcmF3IHVwb24gYW5kIGFzc2lnbnMgdG8gYSB2aWV3cG9ydCB2YXJpYWJsZVxuY29uc3Qgdmlld3BvcnQgPSBWaWV3cG9ydCgpO1xuLy8gY29uc3Qgc3BpbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcGluQnV0dG9uJyk7XG5jb25zdCB3aW5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpblwiKTtcbmNvbnN0IG51ZGdlc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibnVkZ2VzXCIpO1xubGV0IHBsYXlTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5U2VjdGlvblwiKTtcblxubGV0IHZpZXdwb3J0Q29udGFpbmVyO1xubGV0IG51ZGdlQnV0dG9uQ29udGFpbmVyO1xubGV0IGhvbGRCdXR0b25Db250YWluZXI7XG5sZXQgd2luSW5kaWNhdG9yTGVmdDtcbmxldCB3aW5JbmRpY2F0b3JSaWdodDtcbmxldCB3aW5JbmRpY2F0b3JUb3BMaW5lO1xubGV0IHdpbkluZGljYXRvckNlbnRyZUxpbmU7XG5sZXQgd2luSW5kaWNhdG9yQm90dG9tTGluZTtcbmxldCBzcGluQnV0dG9uO1xubGV0IHJlZWxzO1xubGV0IG51ZGdlcztcbmxldCBudWRnZUJ1dHRvbnM7XG5sZXQgaG9sZEJ1dHRvbnM7XG5sZXQgbnVkZ2VCdXR0b25MaXN0O1xubGV0IGhvbGRCdXR0b25MaXN0O1xubGV0IGNyZWRpdHM7XG5sZXQgd2luO1xubGV0IHdpbm5pbmdSb3dzID0gW107XG5sZXQgZ2FtZUxvb3A7XG5sZXQgbnVkZ2VDaGFuY2UgPSAyOyAvLyBDaGFuY2Ugb2YgZ2V0dGluZyBudWRnZXMgYWZ0ZXIgc3BpbiAoMSBpbiBudWRnZUNoYW5jZSlcbmxldCBob2xkQ2hhbmNlID0gMjsgLy8gQ2hhbmNlIG9mIGdldHRpbmcgaG9sZHMgYWZ0ZXIgc3BpbiAoMSBpbiBob2xkQ2hhbmNlKVxubGV0IGNhblNwaW47XG5sZXQgY2FuTnVkZ2U7XG5sZXQgY2FuSG9sZDtcbmxldCBub3c7IC8vIEN1cnJlbnQgdGltZSB0byBjb21wYXJlIGFnYWluc3RcbmxldCByZWVsc1J1bm5pbmcgPSBbXTsgLy8gS2VlcHMgdHJhY2sgb2YgYW55IHJlZWxzIHdpdGggcnVudGltZSBsZWZ0IG9uIHRoZW0gdG8gZXN0Ymxpc2ggd2hldGhlciB0byByZXNldC9zdG9wIHNwaW4gZXRjLlxubGV0IHNwaW5UeXBlID0gXCJzcGluXCI7IC8vIEtlZXBzIHRyYWNrIG9mIHdoZXRoZXIgbGFzdCBzcGluIHdhcyByZWd1bGFyIHNwaW4gb3IgbnVkZ2VcblxuY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgcmVuZGVyVmlld3BvcnRDb250YWluZXIoKTtcblxuICAvLyBSZW5kZXIgdmlld3BvcnRcbiAgdmlld3BvcnQucmVuZGVyKCk7XG5cbiAgLy8gU2V0IHVwIHJlZWxzXG4gIHJlZWxzID0gUmVlbHMoKTtcbiAgcmVlbHMuYnVpbGQoKTtcbiAgcmVlbHMucmVuZGVyKCk7XG5cbiAgbGV0IHJlZWxDb250YWluZXI7XG4gIGxldCByZWVsQ29udGFpbmVyWDtcbiAgbGV0IHJlZWxDb250YWluZXJZO1xuICBsZXQgcmVlbENvbnRhaW5lclc7XG4gIGxldCByZWVsQ29udGFpbmVySDtcblxuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgLy8gUmVuZGVyIG91dGVyIGNvbnRhaW5lciBmb3IgZWFjaCByZWVsIGluIHRoZSB2aWV3cG9ydCBjb250YWluZXJcbiAgICByZWVsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgIHJlZWxDb250YWluZXJYID1cbiAgICAgIHJlZWwucmVlbEl0ZW1zWzBdLnggK1xuICAgICAgVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWCAtXG4gICAgICBSRUVMX0NPTlRBSU5FUl9QQURESU5HO1xuXG4gICAgcmVlbENvbnRhaW5lclkgPVxuICAgICAgcmVlbC5yZWVsSXRlbXNbMl0ueSArXG4gICAgICBWSUVXUE9SVF9DT05UQUlORVJfUEFERElOR19ZIC1cbiAgICAgIFJFRUxfQ09OVEFJTkVSX1BBRERJTkc7XG5cbiAgICByZWVsQ29udGFpbmVyVyA9IFJFRUxfV0lEVEggKyBSRUVMX0NPTlRBSU5FUl9QQURESU5HICogMjtcblxuICAgIHJlZWxDb250YWluZXJIID0gVklFV1BPUlRfSEVJR0hUICsgUkVFTF9DT05UQUlORVJfUEFERElORyAqIDI7XG5cbiAgICByZWVsQ29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIHJlZWxDb250YWluZXIuc3R5bGUudG9wID0gcmVlbENvbnRhaW5lclkgKyBcInB4XCI7XG4gICAgcmVlbENvbnRhaW5lci5zdHlsZS5sZWZ0ID0gcmVlbENvbnRhaW5lclggKyBcInB4XCI7XG4gICAgcmVlbENvbnRhaW5lci5zdHlsZS53aWR0aCA9IHJlZWxDb250YWluZXJXICsgXCJweFwiO1xuICAgIHJlZWxDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gcmVlbENvbnRhaW5lckggKyBcInB4XCI7XG4gICAgcmVlbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicmVlbC1jb250YWluZXJcIik7XG4gICAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQocmVlbENvbnRhaW5lcik7XG4gIH0pO1xuXG4gIHJlbmRlcldpbkluZGljYXRvcnMoKTtcblxuICByZW5kZXJOdWRnZUJ1dHRvbkNvbnRhaW5lcigpO1xuXG4gIC8vIFNldCB1cCBudWRnZSBidXR0b25zXG4gIG51ZGdlQnV0dG9ucyA9IE51ZGdlQnV0dG9ucygpO1xuICBudWRnZUJ1dHRvbnMuYnVpbGQoKTtcbiAgbnVkZ2VCdXR0b25zLnJlbmRlcigpO1xuXG4gIG51ZGdlQnV0dG9uTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJudWRnZS1idXR0b25cIik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudWRnZUJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBudWRnZUJ1dHRvbkxpc3RbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgY2FuU3BpbiAmJlxuICAgICAgICBjYW5OdWRnZSAmJlxuICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5jYW5OdWRnZSA9PT0gdHJ1ZSAmJlxuICAgICAgICBudWRnZXMubnVkZ2VzUmVtYWluaW5nID4gMFxuICAgICAgKSB7XG4gICAgICAgIHNwaW5UeXBlID0gXCJudWRnZVwiO1xuICAgICAgICBudWRnZXMubnVkZ2VzUmVtYWluaW5nIC09IDE7XG4gICAgICAgIHJlZWxzLnJlZWxMaXN0W2ldLmlzTnVkZ2luZyA9IHRydWU7XG4gICAgICAgIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgICBnYW1lU3RhdGVzLmN1cnJlbnRTdGF0ZSA9IGdhbWVTdGF0ZXMubnVkZ2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBTZXQgdXAgbnVkZ2VzXG4gIG51ZGdlcyA9IE51ZGdlcygpO1xuICBudWRnZXMucmVuZGVyKCk7XG5cbiAgcmVuZGVySG9sZEJ1dHRvbkNvbnRhaW5lcigpO1xuXG4gIC8vIFNldCB1cCBob2xkIGJ1dHRvbnNcbiAgaG9sZEJ1dHRvbnMgPSBIb2xkQnV0dG9ucygpO1xuICBob2xkQnV0dG9ucy5idWlsZCgpO1xuICBob2xkQnV0dG9ucy5yZW5kZXIoKTtcblxuICBob2xkQnV0dG9uTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJob2xkLWJ1dHRvblwiKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGhvbGRCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaG9sZEJ1dHRvbkxpc3RbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgaWYgKGNhblNwaW4gJiYgY2FuSG9sZCkge1xuICAgICAgICAvLyBUb2dnbGVcbiAgICAgICAgaWYgKHJlZWxzLnJlZWxMaXN0W2ldLmlzSGVsZCkge1xuICAgICAgICAgIC8vIFRha2UgaG9sZCBvZmZcbiAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQgPSBmYWxzZTtcbiAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5yZXNldFJ1bnRpbWUoKTtcbiAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImhlbGRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUHV0IGhvbGQgb25cbiAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQgPSB0cnVlO1xuICAgICAgICAgIHJlZWxzLnJlZWxMaXN0W2ldLnJ1blRpbWUgPSAwO1xuICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGVsZFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gU2V0IHVwIGNyZWRpdHNcbiAgY3JlZGl0cyA9IENyZWRpdHMoKTtcbiAgY3JlZGl0cy5yZXNldCgpO1xuICBjcmVkaXRzLnJlbmRlcigpO1xuXG4gIC8vIFNldCB1cCB3aW5cbiAgd2luID0gV2luKCk7XG4gIHdpbi5yZXNldCgpO1xuICB3aW4ucmVuZGVyKCk7XG5cbiAgcmVuZGVyU3BpbkJ1dHRvbigpO1xuXG4gIGNhblNwaW4gPSB0cnVlO1xuICBjYW5OdWRnZSA9IGZhbHNlO1xuICBjYW5Ib2xkID0gZmFsc2U7XG5cbiAgZW5hYmxlU3BpbigpO1xuXG4gIHNwaW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAoY2FuU3Bpbikge1xuICAgICAgY3JlZGl0cy51c2VDcmVkaXQoKTtcbiAgICAgIGNyZWRpdHMucmVuZGVyKCk7XG5cbiAgICAgIGRpc2FibGVOdWRnZXMoKTtcbiAgICAgIGRpc2FibGVTcGluKCk7XG5cbiAgICAgIC8vIERpc2FibGUgaG9sZCBidXR0b25zIHRoYXQgYXJlbid0IGhlbGRcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVlbHMucmVlbExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFyZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQpIHtcbiAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5jYW5Ib2xkID0gZmFsc2U7XG4gICAgICAgICAgaG9sZEJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzcGluVHlwZSA9IFwic3BpblwiO1xuICAgICAgZ2FtZVN0YXRlcy5jdXJyZW50U3RhdGUgPSBnYW1lU3RhdGVzLnNwaW47XG4gICAgICBnYW1lTG9vcCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgIGdhbWVTdGF0ZXMuY3VycmVudFN0YXRlKCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHJlbmRlck51ZGdlQnV0dG9uQ29udGFpbmVyID0gKCkgPT4ge1xuICBudWRnZUJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG51ZGdlQnV0dG9uQ29udGFpbmVyLmlkID0gXCJudWRnZUJ1dHRvbnNcIjtcbiAgcGxheVNlY3Rpb24uYXBwZW5kQ2hpbGQobnVkZ2VCdXR0b25Db250YWluZXIpO1xufTtcblxuY29uc3QgcmVuZGVySG9sZEJ1dHRvbkNvbnRhaW5lciA9ICgpID0+IHtcbiAgaG9sZEJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGhvbGRCdXR0b25Db250YWluZXIuaWQgPSBcImhvbGRCdXR0b25zXCI7XG4gIHBsYXlTZWN0aW9uLmFwcGVuZENoaWxkKGhvbGRCdXR0b25Db250YWluZXIpO1xufTtcblxuY29uc3QgcmVuZGVyU3BpbkJ1dHRvbiA9ICgpID0+IHtcbiAgc3BpbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHNwaW5CdXR0b24uaWQgPSBcInNwaW5CdXR0b25cIjtcbiAgc3BpbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uXCIpO1xuICBzcGluQnV0dG9uLmlubmVySFRNTCA9IFwiU1BJTlwiO1xuICBwbGF5U2VjdGlvbi5hcHBlbmRDaGlsZChzcGluQnV0dG9uKTtcbn07XG5cbmNvbnN0IHJlbmRlclZpZXdwb3J0Q29udGFpbmVyID0gKCkgPT4ge1xuICAvLyBSZW5kZXIgdmlld3BvcnQgY29udGFpbmVyXG4gIHZpZXdwb3J0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdmlld3BvcnRDb250YWluZXIuaWQgPSBcInZpZXdwb3J0Q29udGFpbmVyXCI7XG4gIHZpZXdwb3J0Q29udGFpbmVyLnN0eWxlLnBhZGRpbmdMZWZ0ID0gVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWCArIFwicHhcIjtcbiAgdmlld3BvcnRDb250YWluZXIuc3R5bGUucGFkZGluZ1JpZ2h0ID0gVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWCArIFwicHhcIjtcbiAgdmlld3BvcnRDb250YWluZXIuc3R5bGUucGFkZGluZ1RvcCA9IFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1kgKyBcInB4XCI7XG4gIHZpZXdwb3J0Q29udGFpbmVyLnN0eWxlLnBhZGRpbmdCb3R0b20gPSBWSUVXUE9SVF9DT05UQUlORVJfUEFERElOR19ZICsgXCJweFwiO1xuICBwbGF5U2VjdGlvbi5hcHBlbmRDaGlsZCh2aWV3cG9ydENvbnRhaW5lcik7XG59O1xuXG5jb25zdCByZW5kZXJXaW5JbmRpY2F0b3JzID0gKCkgPT4ge1xuICAvLyBMZWZ0IGluZGljYXRvclxuICB3aW5JbmRpY2F0b3JMZWZ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIHdpbkluZGljYXRvckxlZnQuY2xhc3NMaXN0LmFkZChcIndpbi1pbmRpY2F0b3JcIiwgXCJsZWZ0XCIpO1xuICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZCh3aW5JbmRpY2F0b3JMZWZ0KTtcbiAgLy8gUmlnaHQgaW5kaWNhdG9yXG4gIHdpbkluZGljYXRvclJpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIHdpbkluZGljYXRvclJpZ2h0LmNsYXNzTGlzdC5hZGQoXCJ3aW4taW5kaWNhdG9yXCIsIFwicmlnaHRcIik7XG4gIHZpZXdwb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHdpbkluZGljYXRvclJpZ2h0KTtcblxuICAvLyBDZW50cmUgbGluZVxuICB3aW5JbmRpY2F0b3JDZW50cmVMaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgd2luSW5kaWNhdG9yQ2VudHJlTGluZS5jbGFzc0xpc3QuYWRkKFwid2luLWluZGljYXRvci1jZW50cmUtbGluZVwiKTtcblxuICB3aW5JbmRpY2F0b3JDZW50cmVMaW5lLnN0eWxlLmxlZnQgPSB3aW5JbmRpY2F0b3JMZWZ0Lm9mZnNldFdpZHRoICsgXCJweFwiO1xuXG4gIHdpbkluZGljYXRvckNlbnRyZUxpbmUuc3R5bGUud2lkdGggPVxuICAgIHZpZXdwb3J0Q29udGFpbmVyLm9mZnNldFdpZHRoIC1cbiAgICB3aW5JbmRpY2F0b3JMZWZ0Lm9mZnNldFdpZHRoIC1cbiAgICB3aW5JbmRpY2F0b3JSaWdodC5vZmZzZXRXaWR0aCArXG4gICAgXCJweFwiO1xuXG4gIHZpZXdwb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHdpbkluZGljYXRvckNlbnRyZUxpbmUpO1xuXG4gIC8vIFRvcCBsaW5lXG4gIHdpbkluZGljYXRvclRvcExpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB3aW5JbmRpY2F0b3JUb3BMaW5lLmNsYXNzTGlzdC5hZGQoXCJ3aW4taW5kaWNhdG9yLXRvcC1saW5lXCIpO1xuXG4gIHdpbkluZGljYXRvclRvcExpbmUuc3R5bGUubGVmdCA9IHdpbkluZGljYXRvckxlZnQub2Zmc2V0V2lkdGggKyBcInB4XCI7XG5cbiAgd2luSW5kaWNhdG9yVG9wTGluZS5zdHlsZS53aWR0aCA9XG4gICAgdmlld3BvcnRDb250YWluZXIub2Zmc2V0V2lkdGggLVxuICAgIHdpbkluZGljYXRvckxlZnQub2Zmc2V0V2lkdGggLVxuICAgIHdpbkluZGljYXRvclJpZ2h0Lm9mZnNldFdpZHRoICtcbiAgICBcInB4XCI7XG5cbiAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQod2luSW5kaWNhdG9yVG9wTGluZSk7XG5cbiAgLy8gQm90dG9tIGxpbmVcbiAgd2luSW5kaWNhdG9yQm90dG9tTGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHdpbkluZGljYXRvckJvdHRvbUxpbmUuY2xhc3NMaXN0LmFkZChcIndpbi1pbmRpY2F0b3ItYm90dG9tLWxpbmVcIik7XG5cbiAgd2luSW5kaWNhdG9yQm90dG9tTGluZS5zdHlsZS5sZWZ0ID0gd2luSW5kaWNhdG9yTGVmdC5vZmZzZXRXaWR0aCArIFwicHhcIjtcblxuICB3aW5JbmRpY2F0b3JCb3R0b21MaW5lLnN0eWxlLndpZHRoID1cbiAgICB2aWV3cG9ydENvbnRhaW5lci5vZmZzZXRXaWR0aCAtXG4gICAgd2luSW5kaWNhdG9yTGVmdC5vZmZzZXRXaWR0aCAtXG4gICAgd2luSW5kaWNhdG9yUmlnaHQub2Zmc2V0V2lkdGggK1xuICAgIFwicHhcIjtcblxuICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZCh3aW5JbmRpY2F0b3JCb3R0b21MaW5lKTtcbn07XG5cbmNvbnN0IGxvb3AgPSAoY3VycmVudFRpbWUpID0+IHtcbiAgZ2FtZUxvb3AgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7IC8vIE5lZWRzIHRvIGdvIGJlZm9yZSBsaW5lIGJlbG93IHRvIGtlZXAgYW5pbWF0aW9uZnJhbWVpZCB1cCB0byBkYXRlXG4gIGdhbWVTdGF0ZXMuY3VycmVudFN0YXRlKGN1cnJlbnRUaW1lKTtcbn07XG5cbmNvbnN0IG1vdmVSZWVscyA9ICgpID0+IHtcbiAgcmVlbHMubW92ZSgpO1xufTtcblxuY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuICB2aWV3cG9ydC5jbGVhcigpO1xuICByZWVscy5yZW5kZXIoKTtcblxuICAvLyBEaWdpdHNcbiAgbnVkZ2VzLnJlbmRlcigpO1xuICBjcmVkaXRzLnJlbmRlcigpO1xuICB3aW4ucmVuZGVyKCk7XG59O1xuXG4vLyBDYWxjdWxhdGVzIHdpbiBhbW91bnQsIGlmIHdpbm5pbmcgbGluZVxuY29uc3QgY2hlY2tXaW4gPSAoKSA9PiB7XG4gIGxldCBzcGluUmVzdWx0ID0gW107IC8vIEFycmF5IG9mIHJlZWwgcmVzdWx0cyBhZnRlciBzcGluIChhbGwgdGhyZWUgdmlzaWJsZSBvYmplY3RzIG9mIGVhY2ggcmVlbClcbiAgbGV0IHJlZWxSZXN1bHQ7IC8vIEluZGl2aWR1YWwgcmVlbCByZXN1bHQsIG1hZGUgb2YgdGhyZWUgb2JqZWN0cyAodmlzaWJsZSlcblxuICAvLyBDaGVjayBmb3Igd2luXG4gIHJlZWxzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwsIGluZGV4KSA9PiB7XG4gICAgcmVlbFJlc3VsdCA9IFtdOyAvLyBSZXN1bHQgb2YgaW5kaXZpZHVhbCByZWVsXG5cbiAgICByZWVsUmVzdWx0LnB1c2gocmVlbHMucmVlbExpc3RbaW5kZXhdLnJlZWxJdGVtc1swXSk7XG4gICAgcmVlbFJlc3VsdC5wdXNoKHJlZWxzLnJlZWxMaXN0W2luZGV4XS5yZWVsSXRlbXNbMV0pO1xuICAgIHJlZWxSZXN1bHQucHVzaChyZWVscy5yZWVsTGlzdFtpbmRleF0ucmVlbEl0ZW1zWzJdKTtcblxuICAgIHNwaW5SZXN1bHQucHVzaChyZWVsUmVzdWx0KTtcbiAgfSk7XG5cbiAgbGV0IHJlc3VsdCA9IGdldEFsbFJvd1Jlc3VsdHMoc3BpblJlc3VsdCk7XG4gIGxldCBjdXJyZW50V2luQW1vdW50ID0gMDtcblxuICAvLyBBbGwgdGhlIHBvc3NpYmxlIHdpbm5pbmcgcG9zc2liaWxpdGllcyBhbmQgaXRzIHByaXplc1xuICB2YXIgd2lubmluZ0Nhc2UgPSB7XG4gICAgdG9wOiB7XG4gICAgICBjaGVycnk6IHtcbiAgICAgICAgdmFsaWRhdGU6IC80ezN9Ly50ZXN0KHJlc3VsdFtcInRvcFwiXSksXG4gICAgICAgIHZhbHVlOiAyMDAwLFxuICAgICAgfSxcbiAgICAgIFwiN1wiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvM3szfS8udGVzdChyZXN1bHRbXCJ0b3BcIl0pLFxuICAgICAgICB2YWx1ZTogMTUwLFxuICAgICAgfSxcbiAgICAgIGNoZXJyeU9yNzoge1xuICAgICAgICB2YWxpZGF0ZTogL1s0LzNdezN9Ly50ZXN0KHJlc3VsdFtcInRvcFwiXSksXG4gICAgICAgIHZhbHVlOiA3NSxcbiAgICAgIH0sXG4gICAgICBcIjN4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8wezN9Ly50ZXN0KHJlc3VsdFtcInRvcFwiXSksXG4gICAgICAgIHZhbHVlOiA1MCxcbiAgICAgIH0sXG4gICAgICBcIjJ4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8yezN9Ly50ZXN0KHJlc3VsdFtcInRvcFwiXSksXG4gICAgICAgIHZhbHVlOiAyMCxcbiAgICAgIH0sXG4gICAgICBcIjF4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8xezN9Ly50ZXN0KHJlc3VsdFtcInRvcFwiXSksXG4gICAgICAgIHZhbHVlOiAxMCxcbiAgICAgIH0sXG4gICAgICBhbnlCYXI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC9bMDEyXXszfS8udGVzdChyZXN1bHRbXCJ0b3BcIl0pLFxuICAgICAgICB2YWx1ZTogNSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBtaWRkbGU6IHtcbiAgICAgIGNoZXJyeToge1xuICAgICAgICB2YWxpZGF0ZTogLzR7M30vLnRlc3QocmVzdWx0W1wibWlkZGxlXCJdKSxcbiAgICAgICAgdmFsdWU6IDEwMDAsXG4gICAgICB9LFxuICAgICAgXCI3XCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8zezN9Ly50ZXN0KHJlc3VsdFtcIm1pZGRsZVwiXSksXG4gICAgICAgIHZhbHVlOiAxNTAsXG4gICAgICB9LFxuICAgICAgY2hlcnJ5T3I3OiB7XG4gICAgICAgIHZhbGlkYXRlOiAvWzQvM117M30vLnRlc3QocmVzdWx0W1wibWlkZGxlXCJdKSxcbiAgICAgICAgdmFsdWU6IDc1LFxuICAgICAgfSxcbiAgICAgIFwiM3hCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzB7M30vLnRlc3QocmVzdWx0W1wibWlkZGxlXCJdKSxcbiAgICAgICAgdmFsdWU6IDUwLFxuICAgICAgfSxcbiAgICAgIFwiMnhCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzJ7M30vLnRlc3QocmVzdWx0W1wibWlkZGxlXCJdKSxcbiAgICAgICAgdmFsdWU6IDIwLFxuICAgICAgfSxcbiAgICAgIFwiMXhCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzF7M30vLnRlc3QocmVzdWx0W1wibWlkZGxlXCJdKSxcbiAgICAgICAgdmFsdWU6IDEwLFxuICAgICAgfSxcbiAgICAgIGFueUJhcjoge1xuICAgICAgICB2YWxpZGF0ZTogL1swMTJdezN9Ly50ZXN0KHJlc3VsdFtcIm1pZGRsZVwiXSksXG4gICAgICAgIHZhbHVlOiA1LFxuICAgICAgfSxcbiAgICB9LFxuICAgIGJvdHRvbToge1xuICAgICAgY2hlcnJ5OiB7XG4gICAgICAgIHZhbGlkYXRlOiAvNHszfS8udGVzdChyZXN1bHRbXCJib3R0b21cIl0pLFxuICAgICAgICB2YWx1ZTogNDAwMCxcbiAgICAgIH0sXG4gICAgICBcIjdcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzN7M30vLnRlc3QocmVzdWx0W1wiYm90dG9tXCJdKSxcbiAgICAgICAgdmFsdWU6IDE1MCxcbiAgICAgIH0sXG4gICAgICBjaGVycnlPcjc6IHtcbiAgICAgICAgdmFsaWRhdGU6IC9bNC8zXXszfS8udGVzdChyZXN1bHRbXCJib3R0b21cIl0pLFxuICAgICAgICB2YWx1ZTogNzUsXG4gICAgICB9LFxuICAgICAgXCIzeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMHszfS8udGVzdChyZXN1bHRbXCJib3R0b21cIl0pLFxuICAgICAgICB2YWx1ZTogNTAsXG4gICAgICB9LFxuICAgICAgXCIyeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMnszfS8udGVzdChyZXN1bHRbXCJib3R0b21cIl0pLFxuICAgICAgICB2YWx1ZTogMjAsXG4gICAgICB9LFxuICAgICAgXCIxeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMXszfS8udGVzdChyZXN1bHRbXCJib3R0b21cIl0pLFxuICAgICAgICB2YWx1ZTogMTAsXG4gICAgICB9LFxuICAgICAgYW55QmFyOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvWzAxMl17M30vLnRlc3QocmVzdWx0W1wiYm90dG9tXCJdKSxcbiAgICAgICAgdmFsdWU6IDUsXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgLy8gTG9vcCB0aHJvdWdoIHRoZSB3aW5uaW5nIHBvc3NpYmlsaXRpZXNcbiAgLy8gY2FzZSB3aW5uaW5nIGRyYXcgdGhlIGxpbmUgaW4gdGhlIHdpbm5pbmcgcm93XG4gIC8vIHVwZGF0ZSB0aGUgdmlldyB3aXRoIHRoZSBwcml6ZSB2YWx1ZVxuICBmb3IgKGxldCByb3cgaW4gd2lubmluZ0Nhc2UpIHtcbiAgICBmb3IgKGxldCBpdGVtIGluIHdpbm5pbmdDYXNlW3Jvd10pIHtcbiAgICAgIGlmICh3aW5uaW5nQ2FzZVtyb3ddW2l0ZW1dLnZhbGlkYXRlKSB7XG4gICAgICAgIGN1cnJlbnRXaW5BbW91bnQgKz0gd2lubmluZ0Nhc2Vbcm93XVtpdGVtXS52YWx1ZTtcblxuICAgICAgICB3aW5uaW5nUm93cy5wdXNoKHJvdyk7XG4gICAgICAgIC8vIEJyZWFrIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGN1cnJlbnRXaW5BbW91bnQpIHJldHVybiBjdXJyZW50V2luQW1vdW50O1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBnZXRBbGxSb3dSZXN1bHRzID0gKHNwaW5SZXN1bHQpID0+IHtcbiAgbGV0IHRvcCA9IFwiXCIsXG4gICAgbWlkZGxlID0gXCJcIixcbiAgICBib3R0b20gPSBcIlwiO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNwaW5SZXN1bHQubGVuZ3RoICYmIHNwaW5SZXN1bHQubGVuZ3RoID09PSAzOyBpKyspIHtcbiAgICB0b3AgKz0gc3BpblJlc3VsdFtpXVsyXS5pdGVtTm8udG9TdHJpbmcoKTtcbiAgICBtaWRkbGUgKz0gc3BpblJlc3VsdFtpXVsxXS5pdGVtTm8udG9TdHJpbmcoKTtcbiAgICBib3R0b20gKz0gc3BpblJlc3VsdFtpXVswXS5pdGVtTm8udG9TdHJpbmcoKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIHRvcCxcbiAgICBtaWRkbGUsXG4gICAgYm90dG9tLFxuICB9O1xufTtcblxuLy8gUmFuZG9tbHkgYXNzaWduIG51ZGdlc1xuY29uc3QgYXNzaWduTnVkZ2VzID0gKCkgPT4ge1xuICAvLyBSYW5kb21seSBhc3NpZ24gbnVkZ2VzXG4gIGNvbnN0IG51ZGdlUmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbnVkZ2VDaGFuY2UgKyAxKTtcblxuICAvLyBJZiByYW5kb20gY2hhbmNlIGlzIG1ldCB0aGVuIGFzc2lnbiBudWRnZXNcbiAgaWYgKG51ZGdlUmFuZG9tID09PSBudWRnZUNoYW5jZSkge1xuICAgIGNhbk51ZGdlID0gdHJ1ZTtcbiAgICBlbmFibGVOdWRnZXMoKTtcbiAgICBudWRnZXMubnVkZ2VzUmVtYWluaW5nID0gNTtcbiAgICBudWRnZXMucmVuZGVyKCk7XG4gIH0gZWxzZSBpZiAobnVkZ2VzLm51ZGdlc1JlbWFpbmluZyA8IDEpIHtcbiAgICAvLyBJZiBubyBudWRnZXMgbGVmdCBpbiBiYW5rXG4gICAgY2FuTnVkZ2UgPSBmYWxzZTtcbiAgICBkaXNhYmxlTnVkZ2VzKCk7XG4gIH1cbn07XG5cbi8vIFJhbmRvbWx5IGFzc2lnbiBob2xkc1xuY29uc3QgYXNzaWduSG9sZHMgPSAoKSA9PiB7XG4gIGNvbnN0IGhvbGRSYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBob2xkQ2hhbmNlICsgMSk7XG5cbiAgLy8gUmFuZG9tbHkgYXNzaWduIGhvbGRzIChpZiBubyBudWRnZXMgbGVmdCBpbiBiYW5rKVxuICAvLyBBc3NpZ24gaG9sZCBpZiByYW5kb20gbnVtYmVyIG1ldCBhbmQgbGFzdCBzcGluIHdhc24ndCBhIHdpblxuICBpZiAobnVkZ2VzLm51ZGdlc1JlbWFpbmluZyA8IDEpIHtcbiAgICBpZiAoaG9sZFJhbmRvbSA9PT0gaG9sZENoYW5jZSkge1xuICAgICAgLy8gQ2FuIGhvbGRcbiAgICAgIGNhbkhvbGQgPSB0cnVlO1xuICAgICAgYnV0dG9uU3R5bGVzKGhvbGRCdXR0b25MaXN0LCBcImFkZFwiLCBcImFjdGl2ZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FuSG9sZCA9IGZhbHNlO1xuICAgICAgYnV0dG9uU3R5bGVzKGhvbGRCdXR0b25MaXN0LCBcInJlbW92ZVwiLCBcImFjdGl2ZVwiKTtcbiAgICAgIGJ1dHRvblN0eWxlcyhob2xkQnV0dG9uTGlzdCwgXCJyZW1vdmVcIiwgXCJoZWxkXCIpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gRW5hYmxlIGFsbCBudWRnZXNcbmNvbnN0IGVuYWJsZU51ZGdlcyA9ICgpID0+IHtcbiAgcmVlbHMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgIC8vIElmIHRoZSByZWVsIGlzbid0IGhlbGRcbiAgICBpZiAoIXJlZWwuaXNIZWxkKSB7XG4gICAgICByZWVsLmNhbk51ZGdlID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbnVkZ2VCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gSWYgdGhlIHJlZWwgaXNuJ3QgaGVsZFxuICAgIGlmICghcmVlbHMucmVlbExpc3RbaV0uaXNIZWxkKSB7XG4gICAgICBudWRnZUJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICB9XG4gIH1cblxuICBudWRnZXNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbn07XG5cbi8vIEVuYmFsZSBhbGwgaG9sZHNcbmNvbnN0IGVuYWJsZUhvbGRzID0gKCkgPT4ge1xuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgcmVlbC5jYW5Ib2xkID0gdHJ1ZTtcbiAgfSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBob2xkQnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGhvbGRCdXR0b25MaXN0W2ldLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIH1cblxuICBjYW5ob2xkID0gdHJ1ZTtcbn07XG5cbi8vIERpc2FibGUgYWxsIG51ZGdlc1xuY29uc3QgZGlzYWJsZU51ZGdlcyA9ICgpID0+IHtcbiAgcmVlbHMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgIHJlZWwuY2FuTnVkZ2UgPSBmYWxzZTtcbiAgfSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudWRnZUJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBudWRnZUJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgfVxuXG4gIG51ZGdlcy5yZXNldCgpO1xuXG4gIGNhbk51ZGdlID0gZmFsc2U7XG5cbiAgbnVkZ2VzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG59O1xuXG4vLyBEaXNhYmxlIGFsbCBob2xkc1xuY29uc3QgZGlzYWJsZUhvbGRzID0gKCkgPT4ge1xuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgcmVlbC5jYW5Ib2xkID0gZmFsc2U7XG4gICAgcmVlbC5pc0hlbGQgPSBmYWxzZTtcbiAgICBpZiAocmVlbC5ydW5UaW1lIDwgMSkge1xuICAgICAgcmVlbC5yZXNldFJ1bnRpbWUoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaG9sZEJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBob2xkQnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIsIFwiaGVsZFwiKTtcbiAgfVxuXG4gIGNhbkhvbGQgPSBmYWxzZTtcbn07XG5cbi8vIEVuYWJsZSBzcGluXG5jb25zdCBlbmFibGVTcGluID0gKCkgPT4ge1xuICBzcGluQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIGNhblNwaW4gPSB0cnVlO1xufTtcblxuLy8gRGlzYmFsZSBzcGluXG5jb25zdCBkaXNhYmxlU3BpbiA9ICgpID0+IHtcbiAgc3BpbkJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICBjYW5TcGluID0gZmFsc2U7XG59O1xuXG4vLyBBZGQgb3IgcmVtb3ZlIGdyb3VwIGJ1dHRvbiBzdHlsZXNcbmNvbnN0IGJ1dHRvblN0eWxlcyA9IChidXR0b25MaXN0LCBhZGRSZW1vdmUsIGNsYXNzTmFtZSkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYWRkUmVtb3ZlID09PSBcImFkZFwiKSB7XG4gICAgICBidXR0b25MaXN0W2ldLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9IGVsc2UgaWYgKGFkZFJlbW92ZSA9PT0gXCJyZW1vdmVcIikge1xuICAgICAgYnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgfVxuICB9XG59O1xuXG4vLyBHYW1lIHN0YXRlXG5jb25zdCBnYW1lU3RhdGVzID0ge1xuICBjdXJyZW50U3RhdGU6IG51bGwsXG4gIHdpbkFtb3VudDogMCxcbiAgb2xkV2luRGlzcGxheTogMCwgLy8gV2hlbiBsb29waW5nIHRocm91Z2ggd2luIGluY3JlbWVudCAtIHRoaXMgaXMgdGhlIG9yaWdpbmFsIGZpZ3VyZVxuICBjdXJyZW50V2luRGlzcGxheTogMCwgLy8gV2hlbiBsb29waW5nIHRocm91Z2ggd2luIGFtb3VudCAtIHRoaXMgaXMgdGhlIG5ldyBmaWd1cmVcblxuICAvLyBSZWd1bGFyIHNwaW5cbiAgc3BpbjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3BpblR5cGUgPSBcInNwaW5cIjtcbiAgICBkaXNhYmxlU3BpbigpO1xuICAgIG1vdmVSZWVscygpO1xuICAgIHJlbmRlcigpO1xuXG4gICAgLy8gRmlsdGVyIHJlZWwgcnVudGltZXMgLSBpZiBvbmUgaXMgYWJvdmUgemVybyB0aGVuIGNhcnJ5IG9uXG4gICAgcmVlbHNSdW5uaW5nID0gcmVlbHMucmVlbExpc3QuZmlsdGVyKChyZWVsKSA9PiB7XG4gICAgICByZXR1cm4gcmVlbC5ydW5UaW1lID4gMDtcbiAgICB9KTtcblxuICAgIGlmICghcmVlbHNSdW5uaW5nLmxlbmd0aCkge1xuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLnNwaW5GaW5pc2hlZDtcbiAgICB9XG4gIH0sXG4gIC8vIFNwaW4gZmluaXNoZWRcbiAgc3BpbkZpbmlzaGVkOiBmdW5jdGlvbiAoY3VycmVudFRpbWUpIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG5cbiAgICBpZiAobnVkZ2VzLm51ZGdlc1JlbWFpbmluZyA8IDEpIHtcbiAgICAgIGRpc2FibGVOdWRnZXMoKTtcbiAgICAgIGlmIChzcGluVHlwZSAhPT0gXCJudWRnZVwiKSB7XG4gICAgICAgIGRpc2FibGVIb2xkcygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciB3aW5cbiAgICBjb25zdCB3aW4gPSBjaGVja1dpbigpO1xuXG4gICAgLy8gV2luXG4gICAgaWYgKHdpbikge1xuICAgICAgLy8gUmVzZXQgbnVkZ2VzXG4gICAgICBudWRnZXMucmVzZXQoKTtcbiAgICAgIGNhbk51ZGdlID0gZmFsc2U7XG4gICAgICBkaXNhYmxlTnVkZ2VzKCk7XG4gICAgICBkaXNhYmxlSG9sZHMoKTtcbiAgICAgIGRpc2FibGVTcGluKCk7XG5cbiAgICAgIG5vdyA9IGN1cnJlbnRUaW1lO1xuICAgICAgdGhpcy53aW5BbW91bnQgPSB3aW47XG5cbiAgICAgIHJlbmRlcigpO1xuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLndpbjsgLy8gU3dpdGNoIHRvIHdpbiBhbmltYXRpb24gc3RhdGVcbiAgICAgIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgIH1cbiAgICAvLyBObyB3aW5cbiAgICBlbHNlIHtcbiAgICAgIGlmIChcbiAgICAgICAgbnVkZ2VzLm51ZGdlc1JlbWFpbmluZyA8IDEgJiZcbiAgICAgICAgc3BpblR5cGUgIT09IFwibnVkZ2VcIiAmJlxuICAgICAgICBjcmVkaXRzLmNyZWRpdHNSZW1haW5pbmcgPiAwXG4gICAgICApIHtcbiAgICAgICAgLy8gSWYgbm8gd2lubmluZyBsaW5lIHRoZW4gYXNzaWduIGhvbGRzIGFuZCBudWRnZXNcbiAgICAgICAgYXNzaWduSG9sZHMoKTtcbiAgICAgICAgYXNzaWduTnVkZ2VzKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEVuYWJsZSBzcGluXG4gICAgICBlbmFibGVTcGluKCk7XG5cbiAgICAgIC8vIENoZWNrIGNyZWRpdHNcbiAgICAgIGlmIChjcmVkaXRzLmNyZWRpdHNSZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLmdhbWVPdmVyO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgLy8gTnVkZ2VcbiAgbnVkZ2U6IGZ1bmN0aW9uIChjdXJyZW50VGltZSkge1xuICAgIGxldCBpc051ZGdpbmcgPSBbXTtcbiAgICAvLyBJZiBudWRnaW5nIHN0b3BwZWQsIHRoZW4gY2hhbmdlIGdhbWVzdGF0ZSB0byBzcGluZmluaXNoZWRcbiAgICBpc051ZGdpbmcgPSByZWVscy5yZWVsTGlzdC5maWx0ZXIoKHJlZWwpID0+IHtcbiAgICAgIHJldHVybiByZWVsLmlzTnVkZ2luZyA9PT0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIGlmICghaXNOdWRnaW5nLmxlbmd0aCkge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuICAgICAgdGhpcy5zcGluRmluaXNoZWQoY3VycmVudFRpbWUpO1xuICAgIH1cblxuICAgIGlzTnVkZ2luZy5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgICByZWVsLm51ZGdlKCk7XG4gICAgICByZW5kZXIoKTtcbiAgICB9KTtcbiAgfSxcbiAgLy8gV2luIGFuaW1hdGlvblxuICB3aW46IGZ1bmN0aW9uIChjdXJyZW50VGltZSkge1xuICAgIGlmICh3aW5uaW5nUm93cy5pbmNsdWRlcyhcInRvcFwiKSlcbiAgICAgIHdpbkluZGljYXRvclRvcExpbmUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICBpZiAod2lubmluZ1Jvd3MuaW5jbHVkZXMoXCJtaWRkbGVcIikpXG4gICAgICB3aW5JbmRpY2F0b3JDZW50cmVMaW5lLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgaWYgKHdpbm5pbmdSb3dzLmluY2x1ZGVzKFwiYm90dG9tXCIpKVxuICAgICAgd2luSW5kaWNhdG9yQm90dG9tTGluZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIHdpbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuXG4gICAgZGlzYWJsZVNwaW4oKTtcbiAgICBkaXNhYmxlSG9sZHMoKTtcblxuICAgIGlmIChjdXJyZW50VGltZSAtIG5vdyA+IDUwKSB7XG4gICAgICBub3cgPSBjdXJyZW50VGltZTtcbiAgICAgIHRoaXMuY3VycmVudFdpbkRpc3BsYXkgKz0gMTtcbiAgICAgIHdpbi5jdXJyZW50V2luID0gdGhpcy5jdXJyZW50V2luRGlzcGxheTtcbiAgICAgIHdpbi5yZW5kZXIoKTtcblxuICAgICAgaWYgKHRoaXMuY3VycmVudFdpbkRpc3BsYXkgLSB0aGlzLm9sZFdpbkRpc3BsYXkgPT09IHRoaXMud2luQW1vdW50KSB7XG4gICAgICAgIC8vIEZpbmlzaGVkIGxvb3BpbmdcbiAgICAgICAgdGhpcy5vbGRXaW5EaXNwbGF5ID0gdGhpcy5jdXJyZW50V2luRGlzcGxheTtcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuICAgICAgICBlbmFibGVTcGluKCk7XG4gICAgICAgIHdpbkNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICB2aWV3cG9ydENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICB3aW5JbmRpY2F0b3JMZWZ0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIHdpbkluZGljYXRvclJpZ2h0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIHdpbkluZGljYXRvclRvcExpbmUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgd2luSW5kaWNhdG9yQ2VudHJlTGluZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICB3aW5JbmRpY2F0b3JCb3R0b21MaW5lLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG5cbiAgICAgICAgLy8gQ2hlY2sgY3JlZGl0c1xuICAgICAgICBpZiAoY3JlZGl0cy5jcmVkaXRzUmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLmdhbWVPdmVyO1xuICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIC8vIEdhbWUgb3ZlciAtIGNyZWRpdHMgcmFuIG91dFxuICBnYW1lT3ZlcjogZnVuY3Rpb24gKCkge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcbiAgICBkaXNhYmxlU3BpbigpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHBsYXlTZWN0aW9uKTtcblxuICAgICAgZGlzYWJsZU51ZGdlcygpO1xuICAgICAgZGlzYWJsZUhvbGRzKCk7XG5cbiAgICAgIHJlbmRlckdhbWVPdmVyU2VjdGlvbigpO1xuXG4gICAgICB0aGlzLndpbkFtb3VudCA9IDA7XG4gICAgICB0aGlzLm9sZFdpbkRpc3BsYXkgPSAwO1xuICAgICAgdGhpcy5jdXJyZW50V2luRGlzcGxheSA9IDA7XG4gICAgfSwgMTAwMCk7XG4gIH0sXG59O1xuXG5jb25zdCByZW5kZXJHYW1lT3ZlclNlY3Rpb24gPSAoKSA9PiB7XG4gIGNvbnN0IGdhbWVPdmVyU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGdhbWVPdmVyU2VjdGlvbi5pZCA9IFwiZ2FtZU92ZXJTZWN0aW9uXCI7XG5cbiAgZ2FtZU92ZXJTZWN0aW9uLmlubmVySFRNTCA9IFwiPGRpdj5cIjtcbiAgZ2FtZU92ZXJTZWN0aW9uLmlubmVySFRNTCArPSBcIjxwPkdhbWUgb3ZlcjwvcD5cIjtcbiAgZ2FtZU92ZXJTZWN0aW9uLmlubmVySFRNTCArPSBcIjxwPllvdSB3b24gXCIgKyB3aW4uY3VycmVudFdpbiArIFwiIGNyZWRpdHNcIjtcbiAgZ2FtZU92ZXJTZWN0aW9uLmlubmVySFRNTCArPSBcIjxwPlByZXNzIHN0YXJ0IHRvIHBsYXkgYWdhaW48L3A+XCI7XG4gIGdhbWVPdmVyU2VjdGlvbi5pbm5lckhUTUwgKz0gXCI8L2Rpdj5cIjtcblxuICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHN0YXJ0QnV0dG9uLmlkID0gXCJzdGFydEJ1dHRvblwiO1xuICBzdGFydEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uXCIpO1xuICBzdGFydEJ1dHRvbi5pbm5lclRleHQgPSBcIlNUQVJUXCI7XG5cbiAgZ2FtZU92ZXJTZWN0aW9uLmFwcGVuZENoaWxkKHN0YXJ0QnV0dG9uKTtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGdhbWVPdmVyU2VjdGlvbik7XG5cbiAgc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGdhbWVPdmVyU2VjdGlvbik7XG5cbiAgICBwbGF5U2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcGxheVNlY3Rpb24uaWQgPSBcInBsYXlTZWN0aW9uXCI7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwbGF5U2VjdGlvbik7XG5cbiAgICBpbml0KCk7XG4gIH0pO1xufTtcblxuLy8gUHJlbG9hZCBpbWFnZXMgdGhlbiBzdGFydCBnYW1lXG52YXIgbG9hZGVkID0gMDtcbnZhciBpbWFnZUxpc3QgPSBbXTtcbmxldCBpbWc7XG5cbklURU1fSU5GTy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gIGltZyA9IG5ldyBJbWFnZSgpO1xuICBpbWcuc3JjID0gXCIuL2ltZy9cIiArIGl0ZW0uaW1hZ2VTcmM7XG4gIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgbG9hZGVkKys7XG4gICAgaWYgKGxvYWRlZCA9PT0gSVRFTV9JTkZPLmxlbmd0aCkgaW5pdCgpO1xuICB9O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Njc3MvYXBwLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB2aWV3cG9ydCA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdWaWV3cG9ydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIG5ld1ZpZXdwb3J0LndpZHRoID0gVklFV1BPUlRfV0lEVEg7XG4gICAgbmV3Vmlld3BvcnQuaGVpZ2h0ID0gVklFV1BPUlRfSEVJR0hUO1xuICAgIG5ld1ZpZXdwb3J0LmlkID0gXCJ2aWV3cG9ydFwiO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdmlld3BvcnQ6IG5ld1ZpZXdwb3J0LFxuICAgICAgICB3aWR0aDogVklFV1BPUlRfV0lEVEgsXG4gICAgICAgIGhlaWdodDogVklFV1BPUlRfSEVJR0hULFxuICAgICAgICBjdHg6IG5ld1ZpZXdwb3J0LmdldENvbnRleHQoJzJkJyksXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3Qgdmlld3BvcnRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld3BvcnRDb250YWluZXInKTtcbiAgICAgICAgICAgIHZpZXdwb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMudmlld3BvcnQpO1xuICAgICAgICB9LFxuICAgICAgICBjbGVhcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHZpZXdwb3J0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy92aWV3cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCByZWVsIGZyb20gJy4vcmVlbCc7XG5cbmNvbnN0IHJlZWxzID0gKCkgPT4ge1xuICAgIGxldCBuZXdSZWVsO1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlZWxMaXN0OiBbXSxcbiAgICAgICAgYnVpbGQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTk9fUkVFTFM7IGkrKykge1xuICAgICAgICAgICAgICAgIG5ld1JlZWwgPSByZWVsKGkpO1xuICAgICAgICAgICAgICAgIG5ld1JlZWwuYnVpbGQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZWxMaXN0LnB1c2gobmV3UmVlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZWVsLnJ1blRpbWUgPiAwICYmICFyZWVsLmlzSGVsZCkge1xuICAgICAgICAgICAgICAgICAgICByZWVsLm1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVzZXRSdW50aW1lczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVlbC5yZXNldFJ1bnRpbWUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlZWwucmVuZGVyKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlZWxzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy9yZWVscy5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCByZWVsSXRlbSBmcm9tIFwiLi9yZWVsSXRlbVwiO1xuXG5jb25zdCByZWVsID0gKHJlZWxObykgPT4ge1xuICBsZXQgZmlyc3RJdGVtO1xuICBsZXQgbGFzdEl0ZW07XG4gIGxldCBudWRnZUNhbGxUaW1lcztcblxuICByZXR1cm4ge1xuICAgIG5vT2ZJdGVtczogTk9fSVRFTVMsXG4gICAgaXRlbUxpc3Q6IElURU1fTElTVCxcbiAgICByZWVsU3BlZWQ6IFJFRUxfU1BFRUQsXG4gICAgbnVkZ2VTcGVlZDogMTAsXG4gICAgcnVuVGltZTogUkVFTF9TUEVFRCAqIDEwICsgMjAgKiByZWVsTm8sIC8vIEFyYml0cmFyeSB2YWx1ZXMgZm9yIHRlc3RpbmdcbiAgICBjYW5Ib2xkOiBmYWxzZSxcbiAgICBpc0hlbGQ6IGZhbHNlLFxuICAgIGNhbk51ZGdlOiBmYWxzZSxcbiAgICBpc051ZGdpbmc6IGZhbHNlLFxuICAgIG51ZGdlRnJhbWVzOiBJVEVNX0hFSUdIVCAvIE5VREdFX1NQRUVELFxuICAgIG51ZGdlRnJhbWU6IDAsXG4gICAgcmVlbEl0ZW1zOiBbXSxcbiAgICByZWVsTm8sXG4gICAgYnVpbGQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBpdGVtTm8gPSAwO1xuICAgICAgbGV0IHR5cGU7XG4gICAgICBsZXQgaW5zdGFuY2VzO1xuICAgICAgbGV0IGltYWdlU3JjO1xuICAgICAgbGV0IHdpbkFtb3VudDtcbiAgICAgIGxldCB4O1xuICAgICAgbGV0IHk7XG4gICAgICBsZXQgbmV3UmVlbEl0ZW07XG5cbiAgICAgIElURU1fSU5GTy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICB0eXBlID0gaXRlbS50eXBlO1xuICAgICAgICBpbnN0YW5jZXMgPSBpdGVtLmluc3RhbmNlcztcbiAgICAgICAgaW1hZ2VTcmMgPSBpdGVtLmltYWdlU3JjO1xuICAgICAgICB3aW5BbW91bnQgPSBpdGVtLndpbkFtb3VudDtcblxuICAgICAgICAvLyBBZGQgcmVxdWlyZWQgbm8gb2YgaW5zdGFuY2VzIG9mIHRoaXMgaXRlbSB0byB0aGUgcmVlbEl0ZW1zIGFycmF5XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdGFuY2VzOyBpKyspIHtcbiAgICAgICAgICB4ID1cbiAgICAgICAgICAgIFZJRVdQT1JUX1ggKyB0aGlzLnJlZWxObyAqIFJFRUxfV0lEVEggKyB0aGlzLnJlZWxObyAqIFJFRUxfU1BBQ0lORztcblxuICAgICAgICAgIHkgPSBWSUVXUE9SVF9ZIC0gSVRFTV9IRUlHSFQgLSBJVEVNX0hFSUdIVCAqIGl0ZW1ObyAtIDEwMDtcblxuICAgICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgIGltZy5zcmMgPSBcIi4vaW1nL1wiICsgaXRlbS5pbWFnZVNyYztcblxuICAgICAgICAgIG5ld1JlZWxJdGVtID0gcmVlbEl0ZW0odHlwZSwgaXRlbU5vLCBpbWcsIHgsIHksIHdpbkFtb3VudCk7XG4gICAgICAgICAgdGhpcy5yZWVsSXRlbXMucHVzaChuZXdSZWVsSXRlbSk7XG4gICAgICAgICAgaXRlbU5vKys7XG4gICAgICAgICAgLy8gfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zaHVmZmxlKCk7XG4gICAgICB0aGlzLnJlc2V0Q29vcmRzKCk7XG4gICAgfSxcbiAgICBzaHVmZmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgcm5kO1xuICAgICAgbGV0IHRlbXA7XG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5yZWVsSXRlbXMubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICBybmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICAgICAgdGVtcCA9IHRoaXMucmVlbEl0ZW1zW2ldO1xuICAgICAgICB0aGlzLnJlZWxJdGVtc1tpXSA9IHRoaXMucmVlbEl0ZW1zW3JuZF07XG4gICAgICAgIHRoaXMucmVlbEl0ZW1zW3JuZF0gPSB0ZW1wO1xuICAgICAgfVxuICAgIH0sXG4gICAgbnVkZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucmVlbEl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5udWRnZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc2hpZnQoKTtcblxuICAgICAgdGhpcy5udWRnZUZyYW1lKys7XG5cbiAgICAgIGlmICh0aGlzLm51ZGdlRnJhbWUgPj0gdGhpcy5udWRnZUZyYW1lcykge1xuICAgICAgICB0aGlzLmlzTnVkZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm51ZGdlRnJhbWUgPSAwO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVzZXRDb29yZHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yZWVsSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5yZWVsSXRlbXNbaV0ueSA9XG4gICAgICAgICAgVklFV1BPUlRfWSArIFZJRVdQT1JUX0hFSUdIVCAtIElURU1fSEVJR0hUIC0gSVRFTV9IRUlHSFQgKiBpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVzZXRSdW50aW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNIZWxkKSB7XG4gICAgICAgIHRoaXMucnVuVGltZSA9IFJFRUxfU1BFRUQgKiAxMCArIDIwICogcmVlbE5vOyAvLyBBcmJpdHJhcnkgdmFsdWVzIGZvciB0ZXN0aW5nO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2hpZnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIElmIGJvdHRvbSByZWVsIGl0ZW0gZ2V0cyBiZWxvdyBib3R0b20gb2Ygdmlld3BvcnQgdGhlbiBtb3ZlIGl0IHRvIGJlZ2lubmluZyBvZiBhcnJheVxuICAgICAgaWYgKHRoaXMucmVlbEl0ZW1zWzBdLnkgPj0gVklFV1BPUlRfWSArIFZJRVdQT1JUX0hFSUdIVCkge1xuICAgICAgICBmaXJzdEl0ZW0gPSB0aGlzLnJlZWxJdGVtc1swXTtcbiAgICAgICAgbGFzdEl0ZW0gPSB0aGlzLnJlZWxJdGVtc1t0aGlzLnJlZWxJdGVtcy5sZW5ndGggLSAxXTtcblxuICAgICAgICAvLyBSZXN0IHkgY29vcmRzIGZvciBpdGVtIHRvIHNoaWZ0IHRvIHRvcCBvZiByZWVsXG4gICAgICAgIGZpcnN0SXRlbS55ID0gbGFzdEl0ZW0ueSAtIElURU1fSEVJR0hUO1xuXG4gICAgICAgIC8vIFNoaWZ0IGJvdHRvbSBpdGVtIHRvIHRvcFxuICAgICAgICB0aGlzLnJlZWxJdGVtcy5wdXNoKHRoaXMucmVlbEl0ZW1zLnNoaWZ0KCkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5yZWVsSXRlbXMuZm9yRWFjaCgocmVlbEl0ZW0pID0+IHtcbiAgICAgICAgcmVlbEl0ZW0ubW92ZSgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnNoaWZ0KCk7XG4gICAgICAvLyBSZWR1Y2UgcmVlbCBydW50aW1lXG4gICAgICB0aGlzLnJ1blRpbWUtLTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5yZWVsSXRlbXMuZm9yRWFjaCgocmVlbEl0ZW0pID0+IHtcbiAgICAgICAgcmVlbEl0ZW0ucmVuZGVyKCk7XG4gICAgICB9KTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVlbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy9yZWVsLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgcmVlbEl0ZW0gPSAodHlwZSwgaXRlbU5vLCBpbWcsIHgsIHksIHdpbkFtb3VudCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGUsXG4gICAgaXRlbU5vLFxuICAgIGltZyxcbiAgICB4LFxuICAgIHksXG4gICAgd2luQW1vdW50LFxuICAgIHNwZWVkOiBSRUVMX1NQRUVELFxuICAgIG51ZGdlU3BlZWQ6IE5VREdFX1NQRUVELFxuICAgIGN0eDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWV3cG9ydFwiKS5nZXRDb250ZXh0KFwiMmRcIiksXG4gICAgbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy55ICs9IHRoaXMuc3BlZWQ7XG4gICAgfSxcbiAgICBudWRnZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy55ICs9IHRoaXMubnVkZ2VTcGVlZDtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKFxuICAgICAgICB0aGlzLmltZyxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgSVRFTV9XSURUSCxcbiAgICAgICAgSVRFTV9IRUlHSFQsXG4gICAgICAgIHRoaXMueCxcbiAgICAgICAgdGhpcy55LFxuICAgICAgICBJVEVNX1dJRFRILFxuICAgICAgICBJVEVNX0hFSUdIVFxuICAgICAgKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVlbEl0ZW07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvbXBvbmVudHMvcmVlbEl0ZW0uanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZGlnaXRzID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGRpZ2l0c1N0cmluZzogbnVsbCxcbiAgICAgICAgY29udGFpbmVyOiBudWxsLCAvLyBDb250YWluZXIgdGhhdCBob2xkcyBkaWdpdENvbnRhaW5lcnNcbiAgICAgICAgZGlnaXRDb250YWluZXJzOiBudWxsLCAvLyBMaXN0IG9mIGRpZ2l0IGNvbnRhaW5lcnMgdGhhdCBob2xkIHNpbmdsZSBkaWdpdCBlYWNoXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gLy8gU3BsaXQgbnVtYmVyIGludG8gc2VwZXJhdGUgY2hhcmFjdGVyc1xuICAgICAgICAgICAgdGhpcy5kaWdpdENvbnRhaW5lcnMgPSB0aGlzLmNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkaWdpdC1udW1iZXInKTsgXG4gICAgICAgICAgICBsZXQgZGlnaXRJbmRleDsgLy8gV2hpY2ggZGlnaXQgY29udGFpbmVyIHRvIHB1dCBudW1iZXIgaW5cblxuICAgICAgICAgICAgLy8gV2lwZSB0aGUgZGlnaXRzXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGlnaXRDb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWdpdENvbnRhaW5lcnNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWdpdENvbnRhaW5lcnNbaV0uaW5uZXJIVE1MID0gJzgnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBQb3B1bGF0ZSB0aGUgZGlnaXRzXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGlnaXRzU3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZGlnaXRJbmRleCA9ICh0aGlzLmRpZ2l0Q29udGFpbmVycy5sZW5ndGgpIC0gKHRoaXMuZGlnaXRzU3RyaW5nLmxlbmd0aCAtIGkpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlnaXRDb250YWluZXJzW2RpZ2l0SW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlnaXRDb250YWluZXJzW2RpZ2l0SW5kZXhdLmlubmVySFRNTCA9IHRoaXMuZGlnaXRzU3RyaW5nW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRpZ2l0cztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvbXBvbmVudHMvZGlnaXRzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBkaWdpdHMgZnJvbSAnLi9kaWdpdHMnO1xuXG5jb25zdCBjcmVkaXRzID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWRpdHNSZW1haW5pbmc6IENSRURJVFMsXG4gICAgICAgIGRpZ2l0czogZGlnaXRzKCksXG4gICAgICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWRpdHMnKSxcbiAgICAgICAgdXNlQ3JlZGl0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWRpdHNSZW1haW5pbmctLTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlZGl0c1JlbWFpbmluZyA9IENSRURJVFM7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5kaWdpdHMuZGlnaXRzU3RyaW5nID0gdGhpcy5jcmVkaXRzUmVtYWluaW5nLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmRpZ2l0cy5jb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWRpdHM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL2NyZWRpdHMuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGRpZ2l0cyBmcm9tICcuL2RpZ2l0cyc7XG5cbmNvbnN0IHdpbiA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjdXJyZW50V2luOiAwLFxuICAgICAgICBkaWdpdHM6IGRpZ2l0cygpLFxuICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW4nKSxcbiAgICAgICAgYWRkV2luOiBmdW5jdGlvbih3aW5BbW91bnQpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFdpbiArPSB3aW5BbW91bnQ7XG4gICAgICAgIH0sXG4gICAgICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFdpbiA9IDA7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmRpZ2l0cy5kaWdpdHNTdHJpbmcgPSB0aGlzLmN1cnJlbnRXaW4udG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLmNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICAgICAgdGhpcy5kaWdpdHMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgd2luO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy93aW4uanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGhvbGRCdXR0b24gZnJvbSAnLi9ob2xkQnV0dG9uJztcblxuY29uc3QgaG9sZEJ1dHRvbnMgPSAoKSA9PiB7XG4gICAgbGV0IG5ld0J1dHRvbjtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGJ1dHRvbkxpc3Q6IFtdLFxuICAgICAgICBidWlsZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOT19SRUVMUzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbmV3QnV0dG9uID0gaG9sZEJ1dHRvbihpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbkxpc3QucHVzaChuZXdCdXR0b24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uTGlzdC5mb3JFYWNoKChidG4sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgYnRuLnJlbmRlcihpbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBob2xkQnV0dG9ucztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvbXBvbmVudHMvaG9sZEJ1dHRvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgaG9sZEJ1dHRvbiA9IChpbmRleCkgPT4ge1xuICAgIGxldCBob2xkQnV0dG9uO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG9sZEJ1dHRvbnMnKSxcbiAgICAgICAgcmVlbE5vOiBpbmRleCxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBob2xkQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBob2xkQnV0dG9uLmlubmVySFRNTCA9ICdIT0xEJztcbiAgICAgICAgICAgIGhvbGRCdXR0b24uY2xhc3NMaXN0LmFkZCgnaG9sZC1idXR0b24nLCAnYnV0dG9uJyk7XG4gICAgICAgICAgICBob2xkQnV0dG9uLnN0eWxlLndpZHRoID0gQlVUVE9OX1dJRFRIICsgJ3B4JztcbiAgICAgICAgICAgIGhvbGRCdXR0b24uc3R5bGUubWFyZ2luTGVmdCA9IChSRUVMX1NQQUNJTkcgLyAyKSArICgoUkVFTF9XSURUSCAtIEJVVFRPTl9XSURUSCkgLyAyKSArICdweCc7XG4gICAgICAgICAgICBob2xkQnV0dG9uLnN0eWxlLm1hcmdpblJpZ2h0ID0gKFJFRUxfU1BBQ0lORyAvIDIpICsgKChSRUVMX1dJRFRIIC0gQlVUVE9OX1dJRFRIKSAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKGhvbGRCdXR0b24pO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGhvbGRCdXR0b247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL2hvbGRCdXR0b24uanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IG51ZGdlQnV0dG9uIGZyb20gJy4vbnVkZ2VCdXR0b24nO1xuXG5jb25zdCBudWRnZUJ1dHRvbnMgPSAoKSA9PiB7XG4gICAgbGV0IG5ld0J1dHRvbjtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGJ1dHRvbkxpc3Q6IFtdLFxuICAgICAgICBidWlsZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5PX1JFRUxTOyBpKyspIHtcbiAgICAgICAgICAgICAgICBuZXdCdXR0b24gPSBudWRnZUJ1dHRvbihpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbkxpc3QucHVzaChuZXdCdXR0b24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5idXR0b25MaXN0LmZvckVhY2goKGJ0biwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBidG4ucmVuZGVyKGluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG51ZGdlQnV0dG9ucztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvbXBvbmVudHMvbnVkZ2VCdXR0b25zLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG51ZGdlQnV0dG9uID0gKGluZGV4KSA9PiB7XG4gICAgbGV0IG51ZGdlQnV0dG9uO1xuICAgIGxldCBudWRnZUJ1dHRvbkNvbnRhaW5lcjtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ251ZGdlQnV0dG9ucycpLFxuICAgICAgICByZWVsTm86IGluZGV4LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBudWRnZUJ1dHRvbi5pbm5lckhUTUwgPSAnTlVER0UnO1xuICAgICAgICAgICAgbnVkZ2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnbnVkZ2UtYnV0dG9uJywgJ2J1dHRvbicpO1xuICAgICAgICAgICAgbnVkZ2VCdXR0b24uc3R5bGUud2lkdGggPSBCVVRUT05fV0lEVEggKyAncHgnO1xuICAgICAgICAgICAgbnVkZ2VCdXR0b24uc3R5bGUubWFyZ2luTGVmdCA9IChSRUVMX1NQQUNJTkcgLyAyKSArICgoUkVFTF9XSURUSCAtIEJVVFRPTl9XSURUSCkgLyAyKSArICdweCc7XG4gICAgICAgICAgICBudWRnZUJ1dHRvbi5zdHlsZS5tYXJnaW5SaWdodCA9IChSRUVMX1NQQUNJTkcgLyAyKSArICgoUkVFTF9XSURUSCAtIEJVVFRPTl9XSURUSCkgLyAyKSArICdweCc7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChudWRnZUJ1dHRvbik7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbnVkZ2VCdXR0b247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL251ZGdlQnV0dG9uLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBkaWdpdHMgZnJvbSAnLi9kaWdpdHMnO1xuXG5jb25zdCBudWRnZXMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbnVkZ2VzUmVtYWluaW5nOiAwLFxuICAgICAgICBkaWdpdHM6IGRpZ2l0cygpLFxuICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdudWRnZXMnKSxcbiAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5udWRnZXNSZW1haW5pbmcgPSAwO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLmRpZ2l0c1N0cmluZyA9IHRoaXMubnVkZ2VzUmVtYWluaW5nLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmRpZ2l0cy5jb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG51ZGdlcztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvbXBvbmVudHMvbnVkZ2VzLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9