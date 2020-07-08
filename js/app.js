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
      winningRows = [];
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

  console.log("WININIG", winningRows);

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
      win.currentWin = this.winAmount;
      win.render();

      if (this.currentWinDisplay - this.oldWinDisplay === this.winAmount) {
        // Finished looping
        credits.addCredit(this.winAmount);
        credits.render();
        this.oldWinDisplay = this.currentWinDisplay;
        win.reset();
        win.render();
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
    container: document.getElementById("credits"),
    addCredit: function (amount) {
      this.creditsRemaining += amount;
    },
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
    },
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
    container: document.getElementById("win"),
    addWin: function (winAmount) {
      this.currentWin = winAmount;
    },
    reset: function () {
      this.currentWin = 0;
    },
    render: function () {
      this.digits.digitsString = this.currentWin.toString();
      this.digits.container = this.container;
      this.digits.render();
    },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWI1MGNjZTA4ZWJiOGQ4ZmEwOTgiLCJ3ZWJwYWNrOi8vLy4vanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zY3NzL2FwcC5zY3NzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvdmlld3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9yZWVscy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL3JlZWwuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9yZWVsSXRlbS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2RpZ2l0cy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2NyZWRpdHMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy93aW4uanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9ob2xkQnV0dG9ucy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2hvbGRCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9udWRnZUJ1dHRvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9udWRnZUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL251ZGdlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNB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QTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztBQ3B3QkQseUM7Ozs7Ozs7Ozs7Ozs7O0FDQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsaUVBQVEsRTs7Ozs7OztBQ3ZCdkI7QUFB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QTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRWUsb0VBQVcsRTs7Ozs7OztBQ3ZCYjs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsbUVBQVUsRTs7Ozs7OztBQ3BCekI7QUFBYTs7QUFFMkI7O0FBRXhDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGNBQWM7QUFDekMsNEJBQTRCLHFFQUFXO0FBQ3ZDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFZSxxRUFBWSxFOzs7Ozs7O0FDdkJkOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLG9FQUFXLEU7Ozs7Ozs7QUNyQjFCO0FBQWE7O0FBRWlCOztBQUU5QjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsZ0VBQU07QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsK0RBQU0sRSIsImZpbGUiOiIuL2pzL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDFiNTBjY2UwOGViYjhkOGZhMDk4IiwiaW1wb3J0IFZpZXdwb3J0IGZyb20gXCIuL2NvbXBvbmVudHMvdmlld3BvcnRcIjtcbmltcG9ydCBSZWVscyBmcm9tIFwiLi9jb21wb25lbnRzL3JlZWxzXCI7XG5pbXBvcnQgTnVkZ2VCdXR0b25zIGZyb20gXCIuL2NvbXBvbmVudHMvbnVkZ2VCdXR0b25zXCI7XG5pbXBvcnQgSG9sZEJ1dHRvbnMgZnJvbSBcIi4vY29tcG9uZW50cy9ob2xkQnV0dG9uc1wiO1xuaW1wb3J0IENyZWRpdHMgZnJvbSBcIi4vY29tcG9uZW50cy9jcmVkaXRzXCI7XG5pbXBvcnQgV2luIGZyb20gXCIuL2NvbXBvbmVudHMvd2luXCI7XG5pbXBvcnQgTnVkZ2VzIGZyb20gXCIuL2NvbXBvbmVudHMvbnVkZ2VzXCI7XG5cbi8vIFNhc3NcbmltcG9ydCBcIi4uL3Njc3MvYXBwLnNjc3NcIjtcblxuLy8gY3JlYXRlcyB0aGUgY2FudmFzIHdoaWNoIHdlIG5lZWQgdG8gZHJhdyB1cG9uIGFuZCBhc3NpZ25zIHRvIGEgdmlld3BvcnQgdmFyaWFibGVcbmNvbnN0IHZpZXdwb3J0ID0gVmlld3BvcnQoKTtcbi8vIGNvbnN0IHNwaW5CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3BpbkJ1dHRvbicpO1xuY29uc3Qgd2luQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5cIik7XG5jb25zdCBudWRnZXNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm51ZGdlc1wiKTtcbmxldCBwbGF5U2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheVNlY3Rpb25cIik7XG5cbmxldCB2aWV3cG9ydENvbnRhaW5lcjtcbmxldCBudWRnZUJ1dHRvbkNvbnRhaW5lcjtcbmxldCBob2xkQnV0dG9uQ29udGFpbmVyO1xubGV0IHdpbkluZGljYXRvckxlZnQ7XG5sZXQgd2luSW5kaWNhdG9yUmlnaHQ7XG5sZXQgd2luSW5kaWNhdG9yVG9wTGluZTtcbmxldCB3aW5JbmRpY2F0b3JDZW50cmVMaW5lO1xubGV0IHdpbkluZGljYXRvckJvdHRvbUxpbmU7XG5sZXQgc3BpbkJ1dHRvbjtcbmxldCByZWVscztcbmxldCBudWRnZXM7XG5sZXQgbnVkZ2VCdXR0b25zO1xubGV0IGhvbGRCdXR0b25zO1xubGV0IG51ZGdlQnV0dG9uTGlzdDtcbmxldCBob2xkQnV0dG9uTGlzdDtcbmxldCBjcmVkaXRzO1xubGV0IHdpbjtcbmxldCB3aW5uaW5nUm93cyA9IFtdO1xubGV0IGdhbWVMb29wO1xubGV0IG51ZGdlQ2hhbmNlID0gMjsgLy8gQ2hhbmNlIG9mIGdldHRpbmcgbnVkZ2VzIGFmdGVyIHNwaW4gKDEgaW4gbnVkZ2VDaGFuY2UpXG5sZXQgaG9sZENoYW5jZSA9IDI7IC8vIENoYW5jZSBvZiBnZXR0aW5nIGhvbGRzIGFmdGVyIHNwaW4gKDEgaW4gaG9sZENoYW5jZSlcbmxldCBjYW5TcGluO1xubGV0IGNhbk51ZGdlO1xubGV0IGNhbkhvbGQ7XG5sZXQgbm93OyAvLyBDdXJyZW50IHRpbWUgdG8gY29tcGFyZSBhZ2FpbnN0XG5sZXQgcmVlbHNSdW5uaW5nID0gW107IC8vIEtlZXBzIHRyYWNrIG9mIGFueSByZWVscyB3aXRoIHJ1bnRpbWUgbGVmdCBvbiB0aGVtIHRvIGVzdGJsaXNoIHdoZXRoZXIgdG8gcmVzZXQvc3RvcCBzcGluIGV0Yy5cbmxldCBzcGluVHlwZSA9IFwic3BpblwiOyAvLyBLZWVwcyB0cmFjayBvZiB3aGV0aGVyIGxhc3Qgc3BpbiB3YXMgcmVndWxhciBzcGluIG9yIG51ZGdlXG5cbmNvbnN0IGluaXQgPSAoKSA9PiB7XG4gIHJlbmRlclZpZXdwb3J0Q29udGFpbmVyKCk7XG5cbiAgLy8gUmVuZGVyIHZpZXdwb3J0XG4gIHZpZXdwb3J0LnJlbmRlcigpO1xuXG4gIC8vIFNldCB1cCByZWVsc1xuICByZWVscyA9IFJlZWxzKCk7XG4gIHJlZWxzLmJ1aWxkKCk7XG4gIHJlZWxzLnJlbmRlcigpO1xuXG4gIGxldCByZWVsQ29udGFpbmVyO1xuICBsZXQgcmVlbENvbnRhaW5lclg7XG4gIGxldCByZWVsQ29udGFpbmVyWTtcbiAgbGV0IHJlZWxDb250YWluZXJXO1xuICBsZXQgcmVlbENvbnRhaW5lckg7XG5cbiAgcmVlbHMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgIC8vIFJlbmRlciBvdXRlciBjb250YWluZXIgZm9yIGVhY2ggcmVlbCBpbiB0aGUgdmlld3BvcnQgY29udGFpbmVyXG4gICAgcmVlbENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICByZWVsQ29udGFpbmVyWCA9XG4gICAgICByZWVsLnJlZWxJdGVtc1swXS54ICtcbiAgICAgIFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1ggLVxuICAgICAgUkVFTF9DT05UQUlORVJfUEFERElORztcblxuICAgIHJlZWxDb250YWluZXJZID1cbiAgICAgIHJlZWwucmVlbEl0ZW1zWzJdLnkgK1xuICAgICAgVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWSAtXG4gICAgICBSRUVMX0NPTlRBSU5FUl9QQURESU5HO1xuXG4gICAgcmVlbENvbnRhaW5lclcgPSBSRUVMX1dJRFRIICsgUkVFTF9DT05UQUlORVJfUEFERElORyAqIDI7XG5cbiAgICByZWVsQ29udGFpbmVySCA9IFZJRVdQT1JUX0hFSUdIVCArIFJFRUxfQ09OVEFJTkVSX1BBRERJTkcgKiAyO1xuXG4gICAgcmVlbENvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICByZWVsQ29udGFpbmVyLnN0eWxlLnRvcCA9IHJlZWxDb250YWluZXJZICsgXCJweFwiO1xuICAgIHJlZWxDb250YWluZXIuc3R5bGUubGVmdCA9IHJlZWxDb250YWluZXJYICsgXCJweFwiO1xuICAgIHJlZWxDb250YWluZXIuc3R5bGUud2lkdGggPSByZWVsQ29udGFpbmVyVyArIFwicHhcIjtcbiAgICByZWVsQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IHJlZWxDb250YWluZXJIICsgXCJweFwiO1xuICAgIHJlZWxDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInJlZWwtY29udGFpbmVyXCIpO1xuICAgIHZpZXdwb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHJlZWxDb250YWluZXIpO1xuICB9KTtcblxuICByZW5kZXJXaW5JbmRpY2F0b3JzKCk7XG5cbiAgcmVuZGVyTnVkZ2VCdXR0b25Db250YWluZXIoKTtcblxuICAvLyBTZXQgdXAgbnVkZ2UgYnV0dG9uc1xuICBudWRnZUJ1dHRvbnMgPSBOdWRnZUJ1dHRvbnMoKTtcbiAgbnVkZ2VCdXR0b25zLmJ1aWxkKCk7XG4gIG51ZGdlQnV0dG9ucy5yZW5kZXIoKTtcblxuICBudWRnZUJ1dHRvbkxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibnVkZ2UtYnV0dG9uXCIpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbnVkZ2VCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgbnVkZ2VCdXR0b25MaXN0W2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGNhblNwaW4gJiZcbiAgICAgICAgY2FuTnVkZ2UgJiZcbiAgICAgICAgcmVlbHMucmVlbExpc3RbaV0uY2FuTnVkZ2UgPT09IHRydWUgJiZcbiAgICAgICAgbnVkZ2VzLm51ZGdlc1JlbWFpbmluZyA+IDBcbiAgICAgICkge1xuICAgICAgICBzcGluVHlwZSA9IFwibnVkZ2VcIjtcbiAgICAgICAgbnVkZ2VzLm51ZGdlc1JlbWFpbmluZyAtPSAxO1xuICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5pc051ZGdpbmcgPSB0cnVlO1xuICAgICAgICBnYW1lTG9vcCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgICAgZ2FtZVN0YXRlcy5jdXJyZW50U3RhdGUgPSBnYW1lU3RhdGVzLm51ZGdlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gU2V0IHVwIG51ZGdlc1xuICBudWRnZXMgPSBOdWRnZXMoKTtcbiAgbnVkZ2VzLnJlbmRlcigpO1xuXG4gIHJlbmRlckhvbGRCdXR0b25Db250YWluZXIoKTtcblxuICAvLyBTZXQgdXAgaG9sZCBidXR0b25zXG4gIGhvbGRCdXR0b25zID0gSG9sZEJ1dHRvbnMoKTtcbiAgaG9sZEJ1dHRvbnMuYnVpbGQoKTtcbiAgaG9sZEJ1dHRvbnMucmVuZGVyKCk7XG5cbiAgaG9sZEJ1dHRvbkxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaG9sZC1idXR0b25cIik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBob2xkQnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGhvbGRCdXR0b25MaXN0W2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChjYW5TcGluICYmIGNhbkhvbGQpIHtcbiAgICAgICAgLy8gVG9nZ2xlXG4gICAgICAgIGlmIChyZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQpIHtcbiAgICAgICAgICAvLyBUYWtlIGhvbGQgb2ZmXG4gICAgICAgICAgcmVlbHMucmVlbExpc3RbaV0uaXNIZWxkID0gZmFsc2U7XG4gICAgICAgICAgcmVlbHMucmVlbExpc3RbaV0ucmVzZXRSdW50aW1lKCk7XG4gICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJoZWxkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFB1dCBob2xkIG9uXG4gICAgICAgICAgcmVlbHMucmVlbExpc3RbaV0uaXNIZWxkID0gdHJ1ZTtcbiAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5ydW5UaW1lID0gMDtcbiAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImhlbGRcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNldCB1cCBjcmVkaXRzXG4gIGNyZWRpdHMgPSBDcmVkaXRzKCk7XG4gIGNyZWRpdHMucmVzZXQoKTtcbiAgY3JlZGl0cy5yZW5kZXIoKTtcblxuICAvLyBTZXQgdXAgd2luXG4gIHdpbiA9IFdpbigpO1xuICB3aW4ucmVzZXQoKTtcbiAgd2luLnJlbmRlcigpO1xuXG4gIHJlbmRlclNwaW5CdXR0b24oKTtcblxuICBjYW5TcGluID0gdHJ1ZTtcbiAgY2FuTnVkZ2UgPSBmYWxzZTtcbiAgY2FuSG9sZCA9IGZhbHNlO1xuXG4gIGVuYWJsZVNwaW4oKTtcblxuICBzcGluQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgaWYgKGNhblNwaW4pIHtcbiAgICAgIGNyZWRpdHMudXNlQ3JlZGl0KCk7XG4gICAgICBjcmVkaXRzLnJlbmRlcigpO1xuICAgICAgd2lubmluZ1Jvd3MgPSBbXTtcbiAgICAgIGRpc2FibGVOdWRnZXMoKTtcbiAgICAgIGRpc2FibGVTcGluKCk7XG5cbiAgICAgIC8vIERpc2FibGUgaG9sZCBidXR0b25zIHRoYXQgYXJlbid0IGhlbGRcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVlbHMucmVlbExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFyZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQpIHtcbiAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5jYW5Ib2xkID0gZmFsc2U7XG4gICAgICAgICAgaG9sZEJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzcGluVHlwZSA9IFwic3BpblwiO1xuICAgICAgZ2FtZVN0YXRlcy5jdXJyZW50U3RhdGUgPSBnYW1lU3RhdGVzLnNwaW47XG4gICAgICBnYW1lTG9vcCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgIGdhbWVTdGF0ZXMuY3VycmVudFN0YXRlKCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHJlbmRlck51ZGdlQnV0dG9uQ29udGFpbmVyID0gKCkgPT4ge1xuICBudWRnZUJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG51ZGdlQnV0dG9uQ29udGFpbmVyLmlkID0gXCJudWRnZUJ1dHRvbnNcIjtcbiAgcGxheVNlY3Rpb24uYXBwZW5kQ2hpbGQobnVkZ2VCdXR0b25Db250YWluZXIpO1xufTtcblxuY29uc3QgcmVuZGVySG9sZEJ1dHRvbkNvbnRhaW5lciA9ICgpID0+IHtcbiAgaG9sZEJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGhvbGRCdXR0b25Db250YWluZXIuaWQgPSBcImhvbGRCdXR0b25zXCI7XG4gIHBsYXlTZWN0aW9uLmFwcGVuZENoaWxkKGhvbGRCdXR0b25Db250YWluZXIpO1xufTtcblxuY29uc3QgcmVuZGVyU3BpbkJ1dHRvbiA9ICgpID0+IHtcbiAgc3BpbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHNwaW5CdXR0b24uaWQgPSBcInNwaW5CdXR0b25cIjtcbiAgc3BpbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uXCIpO1xuICBzcGluQnV0dG9uLmlubmVySFRNTCA9IFwiU1BJTlwiO1xuICBwbGF5U2VjdGlvbi5hcHBlbmRDaGlsZChzcGluQnV0dG9uKTtcbn07XG5cbmNvbnN0IHJlbmRlclZpZXdwb3J0Q29udGFpbmVyID0gKCkgPT4ge1xuICAvLyBSZW5kZXIgdmlld3BvcnQgY29udGFpbmVyXG4gIHZpZXdwb3J0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdmlld3BvcnRDb250YWluZXIuaWQgPSBcInZpZXdwb3J0Q29udGFpbmVyXCI7XG4gIHZpZXdwb3J0Q29udGFpbmVyLnN0eWxlLnBhZGRpbmdMZWZ0ID0gVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWCArIFwicHhcIjtcbiAgdmlld3BvcnRDb250YWluZXIuc3R5bGUucGFkZGluZ1JpZ2h0ID0gVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWCArIFwicHhcIjtcbiAgdmlld3BvcnRDb250YWluZXIuc3R5bGUucGFkZGluZ1RvcCA9IFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1kgKyBcInB4XCI7XG4gIHZpZXdwb3J0Q29udGFpbmVyLnN0eWxlLnBhZGRpbmdCb3R0b20gPSBWSUVXUE9SVF9DT05UQUlORVJfUEFERElOR19ZICsgXCJweFwiO1xuICBwbGF5U2VjdGlvbi5hcHBlbmRDaGlsZCh2aWV3cG9ydENvbnRhaW5lcik7XG59O1xuXG5jb25zdCByZW5kZXJXaW5JbmRpY2F0b3JzID0gKCkgPT4ge1xuICAvLyBMZWZ0IGluZGljYXRvclxuICB3aW5JbmRpY2F0b3JMZWZ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIHdpbkluZGljYXRvckxlZnQuY2xhc3NMaXN0LmFkZChcIndpbi1pbmRpY2F0b3JcIiwgXCJsZWZ0XCIpO1xuICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZCh3aW5JbmRpY2F0b3JMZWZ0KTtcbiAgLy8gUmlnaHQgaW5kaWNhdG9yXG4gIHdpbkluZGljYXRvclJpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIHdpbkluZGljYXRvclJpZ2h0LmNsYXNzTGlzdC5hZGQoXCJ3aW4taW5kaWNhdG9yXCIsIFwicmlnaHRcIik7XG4gIHZpZXdwb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHdpbkluZGljYXRvclJpZ2h0KTtcblxuICAvLyBDZW50cmUgbGluZVxuICB3aW5JbmRpY2F0b3JDZW50cmVMaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgd2luSW5kaWNhdG9yQ2VudHJlTGluZS5jbGFzc0xpc3QuYWRkKFwid2luLWluZGljYXRvci1jZW50cmUtbGluZVwiKTtcblxuICB3aW5JbmRpY2F0b3JDZW50cmVMaW5lLnN0eWxlLmxlZnQgPSB3aW5JbmRpY2F0b3JMZWZ0Lm9mZnNldFdpZHRoICsgXCJweFwiO1xuXG4gIHdpbkluZGljYXRvckNlbnRyZUxpbmUuc3R5bGUud2lkdGggPVxuICAgIHZpZXdwb3J0Q29udGFpbmVyLm9mZnNldFdpZHRoIC1cbiAgICB3aW5JbmRpY2F0b3JMZWZ0Lm9mZnNldFdpZHRoIC1cbiAgICB3aW5JbmRpY2F0b3JSaWdodC5vZmZzZXRXaWR0aCArXG4gICAgXCJweFwiO1xuXG4gIHZpZXdwb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHdpbkluZGljYXRvckNlbnRyZUxpbmUpO1xuXG4gIC8vIFRvcCBsaW5lXG4gIHdpbkluZGljYXRvclRvcExpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB3aW5JbmRpY2F0b3JUb3BMaW5lLmNsYXNzTGlzdC5hZGQoXCJ3aW4taW5kaWNhdG9yLXRvcC1saW5lXCIpO1xuXG4gIHdpbkluZGljYXRvclRvcExpbmUuc3R5bGUubGVmdCA9IHdpbkluZGljYXRvckxlZnQub2Zmc2V0V2lkdGggKyBcInB4XCI7XG5cbiAgd2luSW5kaWNhdG9yVG9wTGluZS5zdHlsZS53aWR0aCA9XG4gICAgdmlld3BvcnRDb250YWluZXIub2Zmc2V0V2lkdGggLVxuICAgIHdpbkluZGljYXRvckxlZnQub2Zmc2V0V2lkdGggLVxuICAgIHdpbkluZGljYXRvclJpZ2h0Lm9mZnNldFdpZHRoICtcbiAgICBcInB4XCI7XG5cbiAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQod2luSW5kaWNhdG9yVG9wTGluZSk7XG5cbiAgLy8gQm90dG9tIGxpbmVcbiAgd2luSW5kaWNhdG9yQm90dG9tTGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHdpbkluZGljYXRvckJvdHRvbUxpbmUuY2xhc3NMaXN0LmFkZChcIndpbi1pbmRpY2F0b3ItYm90dG9tLWxpbmVcIik7XG5cbiAgd2luSW5kaWNhdG9yQm90dG9tTGluZS5zdHlsZS5sZWZ0ID0gd2luSW5kaWNhdG9yTGVmdC5vZmZzZXRXaWR0aCArIFwicHhcIjtcblxuICB3aW5JbmRpY2F0b3JCb3R0b21MaW5lLnN0eWxlLndpZHRoID1cbiAgICB2aWV3cG9ydENvbnRhaW5lci5vZmZzZXRXaWR0aCAtXG4gICAgd2luSW5kaWNhdG9yTGVmdC5vZmZzZXRXaWR0aCAtXG4gICAgd2luSW5kaWNhdG9yUmlnaHQub2Zmc2V0V2lkdGggK1xuICAgIFwicHhcIjtcblxuICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZCh3aW5JbmRpY2F0b3JCb3R0b21MaW5lKTtcbn07XG5cbmNvbnN0IGxvb3AgPSAoY3VycmVudFRpbWUpID0+IHtcbiAgZ2FtZUxvb3AgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7IC8vIE5lZWRzIHRvIGdvIGJlZm9yZSBsaW5lIGJlbG93IHRvIGtlZXAgYW5pbWF0aW9uZnJhbWVpZCB1cCB0byBkYXRlXG4gIGdhbWVTdGF0ZXMuY3VycmVudFN0YXRlKGN1cnJlbnRUaW1lKTtcbn07XG5cbmNvbnN0IG1vdmVSZWVscyA9ICgpID0+IHtcbiAgcmVlbHMubW92ZSgpO1xufTtcblxuY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuICB2aWV3cG9ydC5jbGVhcigpO1xuICByZWVscy5yZW5kZXIoKTtcblxuICAvLyBEaWdpdHNcbiAgbnVkZ2VzLnJlbmRlcigpO1xuICBjcmVkaXRzLnJlbmRlcigpO1xuICB3aW4ucmVuZGVyKCk7XG59O1xuXG4vLyBDYWxjdWxhdGVzIHdpbiBhbW91bnQsIGlmIHdpbm5pbmcgbGluZVxuY29uc3QgY2hlY2tXaW4gPSAoKSA9PiB7XG4gIGxldCBzcGluUmVzdWx0ID0gW107IC8vIEFycmF5IG9mIHJlZWwgcmVzdWx0cyBhZnRlciBzcGluIChhbGwgdGhyZWUgdmlzaWJsZSBvYmplY3RzIG9mIGVhY2ggcmVlbClcbiAgbGV0IHJlZWxSZXN1bHQ7IC8vIEluZGl2aWR1YWwgcmVlbCByZXN1bHQsIG1hZGUgb2YgdGhyZWUgb2JqZWN0cyAodmlzaWJsZSlcblxuICAvLyBDaGVjayBmb3Igd2luXG4gIHJlZWxzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwsIGluZGV4KSA9PiB7XG4gICAgcmVlbFJlc3VsdCA9IFtdOyAvLyBSZXN1bHQgb2YgaW5kaXZpZHVhbCByZWVsXG5cbiAgICByZWVsUmVzdWx0LnB1c2gocmVlbHMucmVlbExpc3RbaW5kZXhdLnJlZWxJdGVtc1swXSk7XG4gICAgcmVlbFJlc3VsdC5wdXNoKHJlZWxzLnJlZWxMaXN0W2luZGV4XS5yZWVsSXRlbXNbMV0pO1xuICAgIHJlZWxSZXN1bHQucHVzaChyZWVscy5yZWVsTGlzdFtpbmRleF0ucmVlbEl0ZW1zWzJdKTtcblxuICAgIHNwaW5SZXN1bHQucHVzaChyZWVsUmVzdWx0KTtcbiAgfSk7XG5cbiAgbGV0IHJlc3VsdCA9IGdldEFsbFJvd1Jlc3VsdHMoc3BpblJlc3VsdCk7XG4gIGxldCBjdXJyZW50V2luQW1vdW50ID0gMDtcblxuICAvLyBBbGwgdGhlIHBvc3NpYmxlIHdpbm5pbmcgcG9zc2liaWxpdGllcyBhbmQgaXRzIHByaXplc1xuICB2YXIgd2lubmluZ0Nhc2UgPSB7XG4gICAgdG9wOiB7XG4gICAgICBjaGVycnk6IHtcbiAgICAgICAgdmFsaWRhdGU6IC80ezN9Ly50ZXN0KHJlc3VsdFtcInRvcFwiXSksXG4gICAgICAgIHZhbHVlOiAyMDAwLFxuICAgICAgfSxcbiAgICAgIFwiN1wiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvM3szfS8udGVzdChyZXN1bHRbXCJ0b3BcIl0pLFxuICAgICAgICB2YWx1ZTogMTUwLFxuICAgICAgfSxcbiAgICAgIGNoZXJyeU9yNzoge1xuICAgICAgICB2YWxpZGF0ZTogL1s0LzNdezN9Ly50ZXN0KHJlc3VsdFtcInRvcFwiXSksXG4gICAgICAgIHZhbHVlOiA3NSxcbiAgICAgIH0sXG4gICAgICBcIjN4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8wezN9Ly50ZXN0KHJlc3VsdFtcInRvcFwiXSksXG4gICAgICAgIHZhbHVlOiA1MCxcbiAgICAgIH0sXG4gICAgICBcIjJ4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8yezN9Ly50ZXN0KHJlc3VsdFtcInRvcFwiXSksXG4gICAgICAgIHZhbHVlOiAyMCxcbiAgICAgIH0sXG4gICAgICBcIjF4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8xezN9Ly50ZXN0KHJlc3VsdFtcInRvcFwiXSksXG4gICAgICAgIHZhbHVlOiAxMCxcbiAgICAgIH0sXG4gICAgICBhbnlCYXI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC9bMDEyXXszfS8udGVzdChyZXN1bHRbXCJ0b3BcIl0pLFxuICAgICAgICB2YWx1ZTogNSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBtaWRkbGU6IHtcbiAgICAgIGNoZXJyeToge1xuICAgICAgICB2YWxpZGF0ZTogLzR7M30vLnRlc3QocmVzdWx0W1wibWlkZGxlXCJdKSxcbiAgICAgICAgdmFsdWU6IDEwMDAsXG4gICAgICB9LFxuICAgICAgXCI3XCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8zezN9Ly50ZXN0KHJlc3VsdFtcIm1pZGRsZVwiXSksXG4gICAgICAgIHZhbHVlOiAxNTAsXG4gICAgICB9LFxuICAgICAgY2hlcnJ5T3I3OiB7XG4gICAgICAgIHZhbGlkYXRlOiAvWzQvM117M30vLnRlc3QocmVzdWx0W1wibWlkZGxlXCJdKSxcbiAgICAgICAgdmFsdWU6IDc1LFxuICAgICAgfSxcbiAgICAgIFwiM3hCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzB7M30vLnRlc3QocmVzdWx0W1wibWlkZGxlXCJdKSxcbiAgICAgICAgdmFsdWU6IDUwLFxuICAgICAgfSxcbiAgICAgIFwiMnhCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzJ7M30vLnRlc3QocmVzdWx0W1wibWlkZGxlXCJdKSxcbiAgICAgICAgdmFsdWU6IDIwLFxuICAgICAgfSxcbiAgICAgIFwiMXhCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzF7M30vLnRlc3QocmVzdWx0W1wibWlkZGxlXCJdKSxcbiAgICAgICAgdmFsdWU6IDEwLFxuICAgICAgfSxcbiAgICAgIGFueUJhcjoge1xuICAgICAgICB2YWxpZGF0ZTogL1swMTJdezN9Ly50ZXN0KHJlc3VsdFtcIm1pZGRsZVwiXSksXG4gICAgICAgIHZhbHVlOiA1LFxuICAgICAgfSxcbiAgICB9LFxuICAgIGJvdHRvbToge1xuICAgICAgY2hlcnJ5OiB7XG4gICAgICAgIHZhbGlkYXRlOiAvNHszfS8udGVzdChyZXN1bHRbXCJib3R0b21cIl0pLFxuICAgICAgICB2YWx1ZTogNDAwMCxcbiAgICAgIH0sXG4gICAgICBcIjdcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzN7M30vLnRlc3QocmVzdWx0W1wiYm90dG9tXCJdKSxcbiAgICAgICAgdmFsdWU6IDE1MCxcbiAgICAgIH0sXG4gICAgICBjaGVycnlPcjc6IHtcbiAgICAgICAgdmFsaWRhdGU6IC9bNC8zXXszfS8udGVzdChyZXN1bHRbXCJib3R0b21cIl0pLFxuICAgICAgICB2YWx1ZTogNzUsXG4gICAgICB9LFxuICAgICAgXCIzeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMHszfS8udGVzdChyZXN1bHRbXCJib3R0b21cIl0pLFxuICAgICAgICB2YWx1ZTogNTAsXG4gICAgICB9LFxuICAgICAgXCIyeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMnszfS8udGVzdChyZXN1bHRbXCJib3R0b21cIl0pLFxuICAgICAgICB2YWx1ZTogMjAsXG4gICAgICB9LFxuICAgICAgXCIxeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMXszfS8udGVzdChyZXN1bHRbXCJib3R0b21cIl0pLFxuICAgICAgICB2YWx1ZTogMTAsXG4gICAgICB9LFxuICAgICAgYW55QmFyOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvWzAxMl17M30vLnRlc3QocmVzdWx0W1wiYm90dG9tXCJdKSxcbiAgICAgICAgdmFsdWU6IDUsXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgLy8gTG9vcCB0aHJvdWdoIHRoZSB3aW5uaW5nIHBvc3NpYmlsaXRpZXNcbiAgLy8gY2FzZSB3aW5uaW5nIGRyYXcgdGhlIGxpbmUgaW4gdGhlIHdpbm5pbmcgcm93XG4gIC8vIHVwZGF0ZSB0aGUgdmlldyB3aXRoIHRoZSBwcml6ZSB2YWx1ZVxuICBmb3IgKGxldCByb3cgaW4gd2lubmluZ0Nhc2UpIHtcbiAgICBmb3IgKGxldCBpdGVtIGluIHdpbm5pbmdDYXNlW3Jvd10pIHtcbiAgICAgIGlmICh3aW5uaW5nQ2FzZVtyb3ddW2l0ZW1dLnZhbGlkYXRlKSB7XG4gICAgICAgIGN1cnJlbnRXaW5BbW91bnQgKz0gd2lubmluZ0Nhc2Vbcm93XVtpdGVtXS52YWx1ZTtcblxuICAgICAgICB3aW5uaW5nUm93cy5wdXNoKHJvdyk7XG4gICAgICAgIC8vIEJyZWFrIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc29sZS5sb2coXCJXSU5JTklHXCIsIHdpbm5pbmdSb3dzKTtcblxuICBpZiAoY3VycmVudFdpbkFtb3VudCkgcmV0dXJuIGN1cnJlbnRXaW5BbW91bnQ7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGdldEFsbFJvd1Jlc3VsdHMgPSAoc3BpblJlc3VsdCkgPT4ge1xuICBsZXQgdG9wID0gXCJcIixcbiAgICBtaWRkbGUgPSBcIlwiLFxuICAgIGJvdHRvbSA9IFwiXCI7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3BpblJlc3VsdC5sZW5ndGggJiYgc3BpblJlc3VsdC5sZW5ndGggPT09IDM7IGkrKykge1xuICAgIHRvcCArPSBzcGluUmVzdWx0W2ldWzJdLml0ZW1Oby50b1N0cmluZygpO1xuICAgIG1pZGRsZSArPSBzcGluUmVzdWx0W2ldWzFdLml0ZW1Oby50b1N0cmluZygpO1xuICAgIGJvdHRvbSArPSBzcGluUmVzdWx0W2ldWzBdLml0ZW1Oby50b1N0cmluZygpO1xuICB9XG4gIHJldHVybiB7XG4gICAgdG9wLFxuICAgIG1pZGRsZSxcbiAgICBib3R0b20sXG4gIH07XG59O1xuXG4vLyBSYW5kb21seSBhc3NpZ24gbnVkZ2VzXG5jb25zdCBhc3NpZ25OdWRnZXMgPSAoKSA9PiB7XG4gIC8vIFJhbmRvbWx5IGFzc2lnbiBudWRnZXNcbiAgY29uc3QgbnVkZ2VSYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBudWRnZUNoYW5jZSArIDEpO1xuXG4gIC8vIElmIHJhbmRvbSBjaGFuY2UgaXMgbWV0IHRoZW4gYXNzaWduIG51ZGdlc1xuICBpZiAobnVkZ2VSYW5kb20gPT09IG51ZGdlQ2hhbmNlKSB7XG4gICAgY2FuTnVkZ2UgPSB0cnVlO1xuICAgIGVuYWJsZU51ZGdlcygpO1xuICAgIG51ZGdlcy5udWRnZXNSZW1haW5pbmcgPSA1O1xuICAgIG51ZGdlcy5yZW5kZXIoKTtcbiAgfSBlbHNlIGlmIChudWRnZXMubnVkZ2VzUmVtYWluaW5nIDwgMSkge1xuICAgIC8vIElmIG5vIG51ZGdlcyBsZWZ0IGluIGJhbmtcbiAgICBjYW5OdWRnZSA9IGZhbHNlO1xuICAgIGRpc2FibGVOdWRnZXMoKTtcbiAgfVxufTtcblxuLy8gUmFuZG9tbHkgYXNzaWduIGhvbGRzXG5jb25zdCBhc3NpZ25Ib2xkcyA9ICgpID0+IHtcbiAgY29uc3QgaG9sZFJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGhvbGRDaGFuY2UgKyAxKTtcblxuICAvLyBSYW5kb21seSBhc3NpZ24gaG9sZHMgKGlmIG5vIG51ZGdlcyBsZWZ0IGluIGJhbmspXG4gIC8vIEFzc2lnbiBob2xkIGlmIHJhbmRvbSBudW1iZXIgbWV0IGFuZCBsYXN0IHNwaW4gd2Fzbid0IGEgd2luXG4gIGlmIChudWRnZXMubnVkZ2VzUmVtYWluaW5nIDwgMSkge1xuICAgIGlmIChob2xkUmFuZG9tID09PSBob2xkQ2hhbmNlKSB7XG4gICAgICAvLyBDYW4gaG9sZFxuICAgICAgY2FuSG9sZCA9IHRydWU7XG4gICAgICBidXR0b25TdHlsZXMoaG9sZEJ1dHRvbkxpc3QsIFwiYWRkXCIsIFwiYWN0aXZlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYW5Ib2xkID0gZmFsc2U7XG4gICAgICBidXR0b25TdHlsZXMoaG9sZEJ1dHRvbkxpc3QsIFwicmVtb3ZlXCIsIFwiYWN0aXZlXCIpO1xuICAgICAgYnV0dG9uU3R5bGVzKGhvbGRCdXR0b25MaXN0LCBcInJlbW92ZVwiLCBcImhlbGRcIik7XG4gICAgfVxuICB9XG59O1xuXG4vLyBFbmFibGUgYWxsIG51ZGdlc1xuY29uc3QgZW5hYmxlTnVkZ2VzID0gKCkgPT4ge1xuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgLy8gSWYgdGhlIHJlZWwgaXNuJ3QgaGVsZFxuICAgIGlmICghcmVlbC5pc0hlbGQpIHtcbiAgICAgIHJlZWwuY2FuTnVkZ2UgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudWRnZUJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBJZiB0aGUgcmVlbCBpc24ndCBoZWxkXG4gICAgaWYgKCFyZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQpIHtcbiAgICAgIG51ZGdlQnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIH1cbiAgfVxuXG4gIG51ZGdlc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xufTtcblxuLy8gRW5iYWxlIGFsbCBob2xkc1xuY29uc3QgZW5hYmxlSG9sZHMgPSAoKSA9PiB7XG4gIHJlZWxzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcbiAgICByZWVsLmNhbkhvbGQgPSB0cnVlO1xuICB9KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGhvbGRCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaG9sZEJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgfVxuXG4gIGNhbmhvbGQgPSB0cnVlO1xufTtcblxuLy8gRGlzYWJsZSBhbGwgbnVkZ2VzXG5jb25zdCBkaXNhYmxlTnVkZ2VzID0gKCkgPT4ge1xuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgcmVlbC5jYW5OdWRnZSA9IGZhbHNlO1xuICB9KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG51ZGdlQnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIG51ZGdlQnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICB9XG5cbiAgbnVkZ2VzLnJlc2V0KCk7XG5cbiAgY2FuTnVkZ2UgPSBmYWxzZTtcblxuICBudWRnZXNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbn07XG5cbi8vIERpc2FibGUgYWxsIGhvbGRzXG5jb25zdCBkaXNhYmxlSG9sZHMgPSAoKSA9PiB7XG4gIHJlZWxzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcbiAgICByZWVsLmNhbkhvbGQgPSBmYWxzZTtcbiAgICByZWVsLmlzSGVsZCA9IGZhbHNlO1xuICAgIGlmIChyZWVsLnJ1blRpbWUgPCAxKSB7XG4gICAgICByZWVsLnJlc2V0UnVudGltZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBob2xkQnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGhvbGRCdXR0b25MaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIiwgXCJoZWxkXCIpO1xuICB9XG5cbiAgY2FuSG9sZCA9IGZhbHNlO1xufTtcblxuLy8gRW5hYmxlIHNwaW5cbmNvbnN0IGVuYWJsZVNwaW4gPSAoKSA9PiB7XG4gIHNwaW5CdXR0b24uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgY2FuU3BpbiA9IHRydWU7XG59O1xuXG4vLyBEaXNiYWxlIHNwaW5cbmNvbnN0IGRpc2FibGVTcGluID0gKCkgPT4ge1xuICBzcGluQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gIGNhblNwaW4gPSBmYWxzZTtcbn07XG5cbi8vIEFkZCBvciByZW1vdmUgZ3JvdXAgYnV0dG9uIHN0eWxlc1xuY29uc3QgYnV0dG9uU3R5bGVzID0gKGJ1dHRvbkxpc3QsIGFkZFJlbW92ZSwgY2xhc3NOYW1lKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhZGRSZW1vdmUgPT09IFwiYWRkXCIpIHtcbiAgICAgIGJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH0gZWxzZSBpZiAoYWRkUmVtb3ZlID09PSBcInJlbW92ZVwiKSB7XG4gICAgICBidXR0b25MaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIEdhbWUgc3RhdGVcbmNvbnN0IGdhbWVTdGF0ZXMgPSB7XG4gIGN1cnJlbnRTdGF0ZTogbnVsbCxcbiAgd2luQW1vdW50OiAwLFxuICBvbGRXaW5EaXNwbGF5OiAwLCAvLyBXaGVuIGxvb3BpbmcgdGhyb3VnaCB3aW4gaW5jcmVtZW50IC0gdGhpcyBpcyB0aGUgb3JpZ2luYWwgZmlndXJlXG4gIGN1cnJlbnRXaW5EaXNwbGF5OiAwLCAvLyBXaGVuIGxvb3BpbmcgdGhyb3VnaCB3aW4gYW1vdW50IC0gdGhpcyBpcyB0aGUgbmV3IGZpZ3VyZVxuXG4gIC8vIFJlZ3VsYXIgc3BpblxuICBzcGluOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zcGluVHlwZSA9IFwic3BpblwiO1xuICAgIGRpc2FibGVTcGluKCk7XG4gICAgbW92ZVJlZWxzKCk7XG4gICAgcmVuZGVyKCk7XG5cbiAgICAvLyBGaWx0ZXIgcmVlbCBydW50aW1lcyAtIGlmIG9uZSBpcyBhYm92ZSB6ZXJvIHRoZW4gY2Fycnkgb25cbiAgICByZWVsc1J1bm5pbmcgPSByZWVscy5yZWVsTGlzdC5maWx0ZXIoKHJlZWwpID0+IHtcbiAgICAgIHJldHVybiByZWVsLnJ1blRpbWUgPiAwO1xuICAgIH0pO1xuXG4gICAgaWYgKCFyZWVsc1J1bm5pbmcubGVuZ3RoKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuc3BpbkZpbmlzaGVkO1xuICAgIH1cbiAgfSxcbiAgLy8gU3BpbiBmaW5pc2hlZFxuICBzcGluRmluaXNoZWQ6IGZ1bmN0aW9uIChjdXJyZW50VGltZSkge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcblxuICAgIGlmIChudWRnZXMubnVkZ2VzUmVtYWluaW5nIDwgMSkge1xuICAgICAgZGlzYWJsZU51ZGdlcygpO1xuICAgICAgaWYgKHNwaW5UeXBlICE9PSBcIm51ZGdlXCIpIHtcbiAgICAgICAgZGlzYWJsZUhvbGRzKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIHdpblxuICAgIGNvbnN0IHdpbiA9IGNoZWNrV2luKCk7XG5cbiAgICAvLyBXaW5cbiAgICBpZiAod2luKSB7XG4gICAgICAvLyBSZXNldCBudWRnZXNcbiAgICAgIG51ZGdlcy5yZXNldCgpO1xuICAgICAgY2FuTnVkZ2UgPSBmYWxzZTtcbiAgICAgIGRpc2FibGVOdWRnZXMoKTtcbiAgICAgIGRpc2FibGVIb2xkcygpO1xuICAgICAgZGlzYWJsZVNwaW4oKTtcblxuICAgICAgbm93ID0gY3VycmVudFRpbWU7XG4gICAgICB0aGlzLndpbkFtb3VudCA9IHdpbjtcblxuICAgICAgcmVuZGVyKCk7XG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMud2luOyAvLyBTd2l0Y2ggdG8gd2luIGFuaW1hdGlvbiBzdGF0ZVxuICAgICAgZ2FtZUxvb3AgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgfVxuICAgIC8vIE5vIHdpblxuICAgIGVsc2Uge1xuICAgICAgaWYgKFxuICAgICAgICBudWRnZXMubnVkZ2VzUmVtYWluaW5nIDwgMSAmJlxuICAgICAgICBzcGluVHlwZSAhPT0gXCJudWRnZVwiICYmXG4gICAgICAgIGNyZWRpdHMuY3JlZGl0c1JlbWFpbmluZyA+IDBcbiAgICAgICkge1xuICAgICAgICAvLyBJZiBubyB3aW5uaW5nIGxpbmUgdGhlbiBhc3NpZ24gaG9sZHMgYW5kIG51ZGdlc1xuICAgICAgICBhc3NpZ25Ib2xkcygpO1xuICAgICAgICBhc3NpZ25OdWRnZXMoKTtcbiAgICAgIH1cblxuICAgICAgLy8gRW5hYmxlIHNwaW5cbiAgICAgIGVuYWJsZVNwaW4oKTtcblxuICAgICAgLy8gQ2hlY2sgY3JlZGl0c1xuICAgICAgaWYgKGNyZWRpdHMuY3JlZGl0c1JlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuZ2FtZU92ZXI7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvLyBOdWRnZVxuICBudWRnZTogZnVuY3Rpb24gKGN1cnJlbnRUaW1lKSB7XG4gICAgbGV0IGlzTnVkZ2luZyA9IFtdO1xuICAgIC8vIElmIG51ZGdpbmcgc3RvcHBlZCwgdGhlbiBjaGFuZ2UgZ2FtZXN0YXRlIHRvIHNwaW5maW5pc2hlZFxuICAgIGlzTnVkZ2luZyA9IHJlZWxzLnJlZWxMaXN0LmZpbHRlcigocmVlbCkgPT4ge1xuICAgICAgcmV0dXJuIHJlZWwuaXNOdWRnaW5nID09PSB0cnVlO1xuICAgIH0pO1xuXG4gICAgaWYgKCFpc051ZGdpbmcubGVuZ3RoKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG4gICAgICB0aGlzLnNwaW5GaW5pc2hlZChjdXJyZW50VGltZSk7XG4gICAgfVxuXG4gICAgaXNOdWRnaW5nLmZvckVhY2goKHJlZWwpID0+IHtcbiAgICAgIHJlZWwubnVkZ2UoKTtcbiAgICAgIHJlbmRlcigpO1xuICAgIH0pO1xuICB9LFxuICAvLyBXaW4gYW5pbWF0aW9uXG4gIHdpbjogZnVuY3Rpb24gKGN1cnJlbnRUaW1lKSB7XG4gICAgaWYgKHdpbm5pbmdSb3dzLmluY2x1ZGVzKFwidG9wXCIpKVxuICAgICAgd2luSW5kaWNhdG9yVG9wTGluZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGlmICh3aW5uaW5nUm93cy5pbmNsdWRlcyhcIm1pZGRsZVwiKSlcbiAgICAgIHdpbkluZGljYXRvckNlbnRyZUxpbmUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICBpZiAod2lubmluZ1Jvd3MuaW5jbHVkZXMoXCJib3R0b21cIikpXG4gICAgICB3aW5JbmRpY2F0b3JCb3R0b21MaW5lLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgd2luQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG5cbiAgICBkaXNhYmxlU3BpbigpO1xuICAgIGRpc2FibGVIb2xkcygpO1xuXG4gICAgaWYgKGN1cnJlbnRUaW1lIC0gbm93ID4gNTApIHtcbiAgICAgIG5vdyA9IGN1cnJlbnRUaW1lO1xuICAgICAgdGhpcy5jdXJyZW50V2luRGlzcGxheSArPSAxO1xuICAgICAgd2luLmN1cnJlbnRXaW4gPSB0aGlzLndpbkFtb3VudDtcbiAgICAgIHdpbi5yZW5kZXIoKTtcblxuICAgICAgaWYgKHRoaXMuY3VycmVudFdpbkRpc3BsYXkgLSB0aGlzLm9sZFdpbkRpc3BsYXkgPT09IHRoaXMud2luQW1vdW50KSB7XG4gICAgICAgIC8vIEZpbmlzaGVkIGxvb3BpbmdcbiAgICAgICAgY3JlZGl0cy5hZGRDcmVkaXQodGhpcy53aW5BbW91bnQpO1xuICAgICAgICBjcmVkaXRzLnJlbmRlcigpO1xuICAgICAgICB0aGlzLm9sZFdpbkRpc3BsYXkgPSB0aGlzLmN1cnJlbnRXaW5EaXNwbGF5O1xuICAgICAgICB3aW4ucmVzZXQoKTtcbiAgICAgICAgd2luLnJlbmRlcigpO1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG4gICAgICAgIGVuYWJsZVNwaW4oKTtcbiAgICAgICAgd2luQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIHZpZXdwb3J0Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIHdpbkluZGljYXRvckxlZnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgd2luSW5kaWNhdG9yUmlnaHQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgd2luSW5kaWNhdG9yVG9wTGluZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICB3aW5JbmRpY2F0b3JDZW50cmVMaW5lLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIHdpbkluZGljYXRvckJvdHRvbUxpbmUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcblxuICAgICAgICAvLyBDaGVjayBjcmVkaXRzXG4gICAgICAgIGlmIChjcmVkaXRzLmNyZWRpdHNSZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuZ2FtZU92ZXI7XG4gICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgLy8gR2FtZSBvdmVyIC0gY3JlZGl0cyByYW4gb3V0XG4gIGdhbWVPdmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuICAgIGRpc2FibGVTcGluKCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocGxheVNlY3Rpb24pO1xuXG4gICAgICBkaXNhYmxlTnVkZ2VzKCk7XG4gICAgICBkaXNhYmxlSG9sZHMoKTtcblxuICAgICAgcmVuZGVyR2FtZU92ZXJTZWN0aW9uKCk7XG5cbiAgICAgIHRoaXMud2luQW1vdW50ID0gMDtcbiAgICAgIHRoaXMub2xkV2luRGlzcGxheSA9IDA7XG4gICAgICB0aGlzLmN1cnJlbnRXaW5EaXNwbGF5ID0gMDtcbiAgICB9LCAxMDAwKTtcbiAgfSxcbn07XG5cbmNvbnN0IHJlbmRlckdhbWVPdmVyU2VjdGlvbiA9ICgpID0+IHtcbiAgY29uc3QgZ2FtZU92ZXJTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZ2FtZU92ZXJTZWN0aW9uLmlkID0gXCJnYW1lT3ZlclNlY3Rpb25cIjtcblxuICBnYW1lT3ZlclNlY3Rpb24uaW5uZXJIVE1MID0gXCI8ZGl2PlwiO1xuICBnYW1lT3ZlclNlY3Rpb24uaW5uZXJIVE1MICs9IFwiPHA+R2FtZSBvdmVyPC9wPlwiO1xuICBnYW1lT3ZlclNlY3Rpb24uaW5uZXJIVE1MICs9IFwiPHA+WW91IHdvbiBcIiArIHdpbi5jdXJyZW50V2luICsgXCIgY3JlZGl0c1wiO1xuICBnYW1lT3ZlclNlY3Rpb24uaW5uZXJIVE1MICs9IFwiPHA+UHJlc3Mgc3RhcnQgdG8gcGxheSBhZ2FpbjwvcD5cIjtcbiAgZ2FtZU92ZXJTZWN0aW9uLmlubmVySFRNTCArPSBcIjwvZGl2PlwiO1xuXG4gIGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgc3RhcnRCdXR0b24uaWQgPSBcInN0YXJ0QnV0dG9uXCI7XG4gIHN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidXR0b25cIik7XG4gIHN0YXJ0QnV0dG9uLmlubmVyVGV4dCA9IFwiU1RBUlRcIjtcblxuICBnYW1lT3ZlclNlY3Rpb24uYXBwZW5kQ2hpbGQoc3RhcnRCdXR0b24pO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZ2FtZU92ZXJTZWN0aW9uKTtcblxuICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZ2FtZU92ZXJTZWN0aW9uKTtcblxuICAgIHBsYXlTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwbGF5U2VjdGlvbi5pZCA9IFwicGxheVNlY3Rpb25cIjtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBsYXlTZWN0aW9uKTtcblxuICAgIGluaXQoKTtcbiAgfSk7XG59O1xuXG4vLyBQcmVsb2FkIGltYWdlcyB0aGVuIHN0YXJ0IGdhbWVcbnZhciBsb2FkZWQgPSAwO1xudmFyIGltYWdlTGlzdCA9IFtdO1xubGV0IGltZztcblxuSVRFTV9JTkZPLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgaW1nID0gbmV3IEltYWdlKCk7XG4gIGltZy5zcmMgPSBcIi4vaW1nL1wiICsgaXRlbS5pbWFnZVNyYztcbiAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICBsb2FkZWQrKztcbiAgICBpZiAobG9hZGVkID09PSBJVEVNX0lORk8ubGVuZ3RoKSBpbml0KCk7XG4gIH07XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc2Nzcy9hcHAuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHZpZXdwb3J0ID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld1ZpZXdwb3J0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgbmV3Vmlld3BvcnQud2lkdGggPSBWSUVXUE9SVF9XSURUSDtcbiAgICBuZXdWaWV3cG9ydC5oZWlnaHQgPSBWSUVXUE9SVF9IRUlHSFQ7XG4gICAgbmV3Vmlld3BvcnQuaWQgPSBcInZpZXdwb3J0XCI7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB2aWV3cG9ydDogbmV3Vmlld3BvcnQsXG4gICAgICAgIHdpZHRoOiBWSUVXUE9SVF9XSURUSCxcbiAgICAgICAgaGVpZ2h0OiBWSUVXUE9SVF9IRUlHSFQsXG4gICAgICAgIGN0eDogbmV3Vmlld3BvcnQuZ2V0Q29udGV4dCgnMmQnKSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCB2aWV3cG9ydENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3cG9ydENvbnRhaW5lcicpO1xuICAgICAgICAgICAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy52aWV3cG9ydCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpXG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdmlld3BvcnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL3ZpZXdwb3J0LmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHJlZWwgZnJvbSAnLi9yZWVsJztcblxuY29uc3QgcmVlbHMgPSAoKSA9PiB7XG4gICAgbGV0IG5ld1JlZWw7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVlbExpc3Q6IFtdLFxuICAgICAgICBidWlsZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOT19SRUVMUzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbmV3UmVlbCA9IHJlZWwoaSk7XG4gICAgICAgICAgICAgICAgbmV3UmVlbC5idWlsZCgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVlbExpc3QucHVzaChuZXdSZWVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlZWwucnVuVGltZSA+IDAgJiYgIXJlZWwuaXNIZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZWwubW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICByZXNldFJ1bnRpbWVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcbiAgICAgICAgICAgICAgICByZWVsLnJlc2V0UnVudGltZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVlbC5yZW5kZXIoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVlbHM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL3JlZWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHJlZWxJdGVtIGZyb20gXCIuL3JlZWxJdGVtXCI7XG5cbmNvbnN0IHJlZWwgPSAocmVlbE5vKSA9PiB7XG4gIGxldCBmaXJzdEl0ZW07XG4gIGxldCBsYXN0SXRlbTtcbiAgbGV0IG51ZGdlQ2FsbFRpbWVzO1xuXG4gIHJldHVybiB7XG4gICAgbm9PZkl0ZW1zOiBOT19JVEVNUyxcbiAgICBpdGVtTGlzdDogSVRFTV9MSVNULFxuICAgIHJlZWxTcGVlZDogUkVFTF9TUEVFRCxcbiAgICBudWRnZVNwZWVkOiAxMCxcbiAgICBydW5UaW1lOiBSRUVMX1NQRUVEICogMTAgKyAyMCAqIHJlZWxObywgLy8gQXJiaXRyYXJ5IHZhbHVlcyBmb3IgdGVzdGluZ1xuICAgIGNhbkhvbGQ6IGZhbHNlLFxuICAgIGlzSGVsZDogZmFsc2UsXG4gICAgY2FuTnVkZ2U6IGZhbHNlLFxuICAgIGlzTnVkZ2luZzogZmFsc2UsXG4gICAgbnVkZ2VGcmFtZXM6IElURU1fSEVJR0hUIC8gTlVER0VfU1BFRUQsXG4gICAgbnVkZ2VGcmFtZTogMCxcbiAgICByZWVsSXRlbXM6IFtdLFxuICAgIHJlZWxObyxcbiAgICBidWlsZDogZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGl0ZW1ObyA9IDA7XG4gICAgICBsZXQgdHlwZTtcbiAgICAgIGxldCBpbnN0YW5jZXM7XG4gICAgICBsZXQgaW1hZ2VTcmM7XG4gICAgICBsZXQgd2luQW1vdW50O1xuICAgICAgbGV0IHg7XG4gICAgICBsZXQgeTtcbiAgICAgIGxldCBuZXdSZWVsSXRlbTtcblxuICAgICAgSVRFTV9JTkZPLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIHR5cGUgPSBpdGVtLnR5cGU7XG4gICAgICAgIGluc3RhbmNlcyA9IGl0ZW0uaW5zdGFuY2VzO1xuICAgICAgICBpbWFnZVNyYyA9IGl0ZW0uaW1hZ2VTcmM7XG4gICAgICAgIHdpbkFtb3VudCA9IGl0ZW0ud2luQW1vdW50O1xuXG4gICAgICAgIC8vIEFkZCByZXF1aXJlZCBubyBvZiBpbnN0YW5jZXMgb2YgdGhpcyBpdGVtIHRvIHRoZSByZWVsSXRlbXMgYXJyYXlcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnN0YW5jZXM7IGkrKykge1xuICAgICAgICAgIHggPVxuICAgICAgICAgICAgVklFV1BPUlRfWCArIHRoaXMucmVlbE5vICogUkVFTF9XSURUSCArIHRoaXMucmVlbE5vICogUkVFTF9TUEFDSU5HO1xuXG4gICAgICAgICAgeSA9IFZJRVdQT1JUX1kgLSBJVEVNX0hFSUdIVCAtIElURU1fSEVJR0hUICogaXRlbU5vIC0gMTAwO1xuXG4gICAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgaW1nLnNyYyA9IFwiLi9pbWcvXCIgKyBpdGVtLmltYWdlU3JjO1xuXG4gICAgICAgICAgbmV3UmVlbEl0ZW0gPSByZWVsSXRlbSh0eXBlLCBpdGVtTm8sIGltZywgeCwgeSwgd2luQW1vdW50KTtcbiAgICAgICAgICB0aGlzLnJlZWxJdGVtcy5wdXNoKG5ld1JlZWxJdGVtKTtcbiAgICAgICAgICBpdGVtTm8rKztcbiAgICAgICAgICAvLyB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNodWZmbGUoKTtcbiAgICAgIHRoaXMucmVzZXRDb29yZHMoKTtcbiAgICB9LFxuICAgIHNodWZmbGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBybmQ7XG4gICAgICBsZXQgdGVtcDtcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLnJlZWxJdGVtcy5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIHJuZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgICB0ZW1wID0gdGhpcy5yZWVsSXRlbXNbaV07XG4gICAgICAgIHRoaXMucmVlbEl0ZW1zW2ldID0gdGhpcy5yZWVsSXRlbXNbcm5kXTtcbiAgICAgICAgdGhpcy5yZWVsSXRlbXNbcm5kXSA9IHRlbXA7XG4gICAgICB9XG4gICAgfSxcbiAgICBudWRnZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5yZWVsSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLm51ZGdlKCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zaGlmdCgpO1xuXG4gICAgICB0aGlzLm51ZGdlRnJhbWUrKztcblxuICAgICAgaWYgKHRoaXMubnVkZ2VGcmFtZSA+PSB0aGlzLm51ZGdlRnJhbWVzKSB7XG4gICAgICAgIHRoaXMuaXNOdWRnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubnVkZ2VGcmFtZSA9IDA7XG4gICAgICB9XG4gICAgfSxcbiAgICByZXNldENvb3JkczogZnVuY3Rpb24gKCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJlZWxJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnJlZWxJdGVtc1tpXS55ID1cbiAgICAgICAgICBWSUVXUE9SVF9ZICsgVklFV1BPUlRfSEVJR0hUIC0gSVRFTV9IRUlHSFQgLSBJVEVNX0hFSUdIVCAqIGk7XG4gICAgICB9XG4gICAgfSxcbiAgICByZXNldFJ1bnRpbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghdGhpcy5pc0hlbGQpIHtcbiAgICAgICAgdGhpcy5ydW5UaW1lID0gUkVFTF9TUEVFRCAqIDEwICsgMjAgKiByZWVsTm87IC8vIEFyYml0cmFyeSB2YWx1ZXMgZm9yIHRlc3Rpbmc7XG4gICAgICB9XG4gICAgfSxcbiAgICBzaGlmdDogZnVuY3Rpb24gKCkge1xuICAgICAgLy8gSWYgYm90dG9tIHJlZWwgaXRlbSBnZXRzIGJlbG93IGJvdHRvbSBvZiB2aWV3cG9ydCB0aGVuIG1vdmUgaXQgdG8gYmVnaW5uaW5nIG9mIGFycmF5XG4gICAgICBpZiAodGhpcy5yZWVsSXRlbXNbMF0ueSA+PSBWSUVXUE9SVF9ZICsgVklFV1BPUlRfSEVJR0hUKSB7XG4gICAgICAgIGZpcnN0SXRlbSA9IHRoaXMucmVlbEl0ZW1zWzBdO1xuICAgICAgICBsYXN0SXRlbSA9IHRoaXMucmVlbEl0ZW1zW3RoaXMucmVlbEl0ZW1zLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIC8vIFJlc3QgeSBjb29yZHMgZm9yIGl0ZW0gdG8gc2hpZnQgdG8gdG9wIG9mIHJlZWxcbiAgICAgICAgZmlyc3RJdGVtLnkgPSBsYXN0SXRlbS55IC0gSVRFTV9IRUlHSFQ7XG5cbiAgICAgICAgLy8gU2hpZnQgYm90dG9tIGl0ZW0gdG8gdG9wXG4gICAgICAgIHRoaXMucmVlbEl0ZW1zLnB1c2godGhpcy5yZWVsSXRlbXMuc2hpZnQoKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnJlZWxJdGVtcy5mb3JFYWNoKChyZWVsSXRlbSkgPT4ge1xuICAgICAgICByZWVsSXRlbS5tb3ZlKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2hpZnQoKTtcbiAgICAgIC8vIFJlZHVjZSByZWVsIHJ1bnRpbWVcbiAgICAgIHRoaXMucnVuVGltZS0tO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnJlZWxJdGVtcy5mb3JFYWNoKChyZWVsSXRlbSkgPT4ge1xuICAgICAgICByZWVsSXRlbS5yZW5kZXIoKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZWVsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL3JlZWwuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCByZWVsSXRlbSA9ICh0eXBlLCBpdGVtTm8sIGltZywgeCwgeSwgd2luQW1vdW50KSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZSxcbiAgICBpdGVtTm8sXG4gICAgaW1nLFxuICAgIHgsXG4gICAgeSxcbiAgICB3aW5BbW91bnQsXG4gICAgc3BlZWQ6IFJFRUxfU1BFRUQsXG4gICAgbnVkZ2VTcGVlZDogTlVER0VfU1BFRUQsXG4gICAgY3R4OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZXdwb3J0XCIpLmdldENvbnRleHQoXCIyZFwiKSxcbiAgICBtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnkgKz0gdGhpcy5zcGVlZDtcbiAgICB9LFxuICAgIG51ZGdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnkgKz0gdGhpcy5udWRnZVNwZWVkO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoXG4gICAgICAgIHRoaXMuaW1nLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBJVEVNX1dJRFRILFxuICAgICAgICBJVEVNX0hFSUdIVCxcbiAgICAgICAgdGhpcy54LFxuICAgICAgICB0aGlzLnksXG4gICAgICAgIElURU1fV0lEVEgsXG4gICAgICAgIElURU1fSEVJR0hUXG4gICAgICApO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZWVsSXRlbTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy9yZWVsSXRlbS5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBkaWdpdHMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGlnaXRzU3RyaW5nOiBudWxsLFxuICAgICAgICBjb250YWluZXI6IG51bGwsIC8vIENvbnRhaW5lciB0aGF0IGhvbGRzIGRpZ2l0Q29udGFpbmVyc1xuICAgICAgICBkaWdpdENvbnRhaW5lcnM6IG51bGwsIC8vIExpc3Qgb2YgZGlnaXQgY29udGFpbmVycyB0aGF0IGhvbGQgc2luZ2xlIGRpZ2l0IGVhY2hcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyAvLyBTcGxpdCBudW1iZXIgaW50byBzZXBlcmF0ZSBjaGFyYWN0ZXJzXG4gICAgICAgICAgICB0aGlzLmRpZ2l0Q29udGFpbmVycyA9IHRoaXMuY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RpZ2l0LW51bWJlcicpOyBcbiAgICAgICAgICAgIGxldCBkaWdpdEluZGV4OyAvLyBXaGljaCBkaWdpdCBjb250YWluZXIgdG8gcHV0IG51bWJlciBpblxuXG4gICAgICAgICAgICAvLyBXaXBlIHRoZSBkaWdpdHNcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kaWdpdENvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpZ2l0Q29udGFpbmVyc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpZ2l0Q29udGFpbmVyc1tpXS5pbm5lckhUTUwgPSAnOCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFBvcHVsYXRlIHRoZSBkaWdpdHNcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kaWdpdHNTdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBkaWdpdEluZGV4ID0gKHRoaXMuZGlnaXRDb250YWluZXJzLmxlbmd0aCkgLSAodGhpcy5kaWdpdHNTdHJpbmcubGVuZ3RoIC0gaSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWdpdENvbnRhaW5lcnNbZGlnaXRJbmRleF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWdpdENvbnRhaW5lcnNbZGlnaXRJbmRleF0uaW5uZXJIVE1MID0gdGhpcy5kaWdpdHNTdHJpbmdbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGlnaXRzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy9kaWdpdHMuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgZGlnaXRzIGZyb20gXCIuL2RpZ2l0c1wiO1xuXG5jb25zdCBjcmVkaXRzID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGNyZWRpdHNSZW1haW5pbmc6IENSRURJVFMsXG4gICAgZGlnaXRzOiBkaWdpdHMoKSxcbiAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3JlZGl0c1wiKSxcbiAgICBhZGRDcmVkaXQ6IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgIHRoaXMuY3JlZGl0c1JlbWFpbmluZyArPSBhbW91bnQ7XG4gICAgfSxcbiAgICB1c2VDcmVkaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuY3JlZGl0c1JlbWFpbmluZy0tO1xuICAgIH0sXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuY3JlZGl0c1JlbWFpbmluZyA9IENSRURJVFM7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZGlnaXRzLmRpZ2l0c1N0cmluZyA9IHRoaXMuY3JlZGl0c1JlbWFpbmluZy50b1N0cmluZygpO1xuICAgICAgdGhpcy5kaWdpdHMuY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICB0aGlzLmRpZ2l0cy5yZW5kZXIoKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlZGl0cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy9jcmVkaXRzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGRpZ2l0cyBmcm9tIFwiLi9kaWdpdHNcIjtcblxuY29uc3Qgd2luID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGN1cnJlbnRXaW46IDAsXG4gICAgZGlnaXRzOiBkaWdpdHMoKSxcbiAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luXCIpLFxuICAgIGFkZFdpbjogZnVuY3Rpb24gKHdpbkFtb3VudCkge1xuICAgICAgdGhpcy5jdXJyZW50V2luID0gd2luQW1vdW50O1xuICAgIH0sXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuY3VycmVudFdpbiA9IDA7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZGlnaXRzLmRpZ2l0c1N0cmluZyA9IHRoaXMuY3VycmVudFdpbi50b1N0cmluZygpO1xuICAgICAgdGhpcy5kaWdpdHMuY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICB0aGlzLmRpZ2l0cy5yZW5kZXIoKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgd2luO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL3dpbi5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgaG9sZEJ1dHRvbiBmcm9tICcuL2hvbGRCdXR0b24nO1xuXG5jb25zdCBob2xkQnV0dG9ucyA9ICgpID0+IHtcbiAgICBsZXQgbmV3QnV0dG9uO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYnV0dG9uTGlzdDogW10sXG4gICAgICAgIGJ1aWxkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5PX1JFRUxTOyBpKyspIHtcbiAgICAgICAgICAgICAgICBuZXdCdXR0b24gPSBob2xkQnV0dG9uKGkpO1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uTGlzdC5wdXNoKG5ld0J1dHRvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5idXR0b25MaXN0LmZvckVhY2goKGJ0biwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBidG4ucmVuZGVyKGluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGhvbGRCdXR0b25zO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy9ob2xkQnV0dG9ucy5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBob2xkQnV0dG9uID0gKGluZGV4KSA9PiB7XG4gICAgbGV0IGhvbGRCdXR0b247XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob2xkQnV0dG9ucycpLFxuICAgICAgICByZWVsTm86IGluZGV4LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGhvbGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGhvbGRCdXR0b24uaW5uZXJIVE1MID0gJ0hPTEQnO1xuICAgICAgICAgICAgaG9sZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdob2xkLWJ1dHRvbicsICdidXR0b24nKTtcbiAgICAgICAgICAgIGhvbGRCdXR0b24uc3R5bGUud2lkdGggPSBCVVRUT05fV0lEVEggKyAncHgnO1xuICAgICAgICAgICAgaG9sZEJ1dHRvbi5zdHlsZS5tYXJnaW5MZWZ0ID0gKFJFRUxfU1BBQ0lORyAvIDIpICsgKChSRUVMX1dJRFRIIC0gQlVUVE9OX1dJRFRIKSAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIGhvbGRCdXR0b24uc3R5bGUubWFyZ2luUmlnaHQgPSAoUkVFTF9TUEFDSU5HIC8gMikgKyAoKFJFRUxfV0lEVEggLSBCVVRUT05fV0lEVEgpIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoaG9sZEJ1dHRvbik7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaG9sZEJ1dHRvbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvbXBvbmVudHMvaG9sZEJ1dHRvbi5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgbnVkZ2VCdXR0b24gZnJvbSAnLi9udWRnZUJ1dHRvbic7XG5cbmNvbnN0IG51ZGdlQnV0dG9ucyA9ICgpID0+IHtcbiAgICBsZXQgbmV3QnV0dG9uO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYnV0dG9uTGlzdDogW10sXG4gICAgICAgIGJ1aWxkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTk9fUkVFTFM7IGkrKykge1xuICAgICAgICAgICAgICAgIG5ld0J1dHRvbiA9IG51ZGdlQnV0dG9uKGkpO1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uTGlzdC5wdXNoKG5ld0J1dHRvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbkxpc3QuZm9yRWFjaCgoYnRuLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGJ0bi5yZW5kZXIoaW5kZXgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbnVkZ2VCdXR0b25zO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy9udWRnZUJ1dHRvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbnVkZ2VCdXR0b24gPSAoaW5kZXgpID0+IHtcbiAgICBsZXQgbnVkZ2VCdXR0b247XG4gICAgbGV0IG51ZGdlQnV0dG9uQ29udGFpbmVyO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbnVkZ2VCdXR0b25zJyksXG4gICAgICAgIHJlZWxObzogaW5kZXgsXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbnVkZ2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uLmlubmVySFRNTCA9ICdOVURHRSc7XG4gICAgICAgICAgICBudWRnZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdudWRnZS1idXR0b24nLCAnYnV0dG9uJyk7XG4gICAgICAgICAgICBudWRnZUJ1dHRvbi5zdHlsZS53aWR0aCA9IEJVVFRPTl9XSURUSCArICdweCc7XG4gICAgICAgICAgICBudWRnZUJ1dHRvbi5zdHlsZS5tYXJnaW5MZWZ0ID0gKFJFRUxfU1BBQ0lORyAvIDIpICsgKChSRUVMX1dJRFRIIC0gQlVUVE9OX1dJRFRIKSAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uLnN0eWxlLm1hcmdpblJpZ2h0ID0gKFJFRUxfU1BBQ0lORyAvIDIpICsgKChSRUVMX1dJRFRIIC0gQlVUVE9OX1dJRFRIKSAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKG51ZGdlQnV0dG9uKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBudWRnZUJ1dHRvbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvbXBvbmVudHMvbnVkZ2VCdXR0b24uanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGRpZ2l0cyBmcm9tICcuL2RpZ2l0cyc7XG5cbmNvbnN0IG51ZGdlcyA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBudWRnZXNSZW1haW5pbmc6IDAsXG4gICAgICAgIGRpZ2l0czogZGlnaXRzKCksXG4gICAgICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ251ZGdlcycpLFxuICAgICAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLm51ZGdlc1JlbWFpbmluZyA9IDA7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5kaWdpdHMuZGlnaXRzU3RyaW5nID0gdGhpcy5udWRnZXNSZW1haW5pbmcudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLmNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICAgICAgdGhpcy5kaWdpdHMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbnVkZ2VzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy9udWRnZXMuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=