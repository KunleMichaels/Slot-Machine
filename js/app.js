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
const select_gameMode = document.getElementById("game-mode");
const div_fixedModeOptions = document.getElementById("fixed-mode-options");

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
  select_gameMode.addEventListener("change", function (element) {
    if (this.value === "fixed") {
      div_fixedModeOptions.classList.remove("hidden");
    } else if (this.value === "random") {
      div_fixedModeOptions.classList.add("hidden");
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

    if (currentTime - now > 1) {
      now = currentTime;
      let skip = this.winAmount > 500 ? 10 : 1;
      this.currentWinDisplay += skip;
      win.currentWin = this.winAmount;
      win.render();

      if (this.currentWinDisplay - this.oldWinDisplay >= this.winAmount) {
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

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/Users/michaelkolawole 1/Documents/Workspace/KunleMichaels/2020/JS Test Task Source/Slot-Machine/node_modules/css-loader/lib/css-base.js'\n    at /Users/michaelkolawole 1/Documents/Workspace/KunleMichaels/2020/JS Test Task Source/Slot-Machine/node_modules/webpack/lib/NormalModule.js:195:19\n    at /Users/michaelkolawole 1/Documents/Workspace/KunleMichaels/2020/JS Test Task Source/Slot-Machine/node_modules/loader-runner/lib/LoaderRunner.js:367:11\n    at /Users/michaelkolawole 1/Documents/Workspace/KunleMichaels/2020/JS Test Task Source/Slot-Machine/node_modules/loader-runner/lib/LoaderRunner.js:203:19\n    at /Users/michaelkolawole 1/Documents/Workspace/KunleMichaels/2020/JS Test Task Source/Slot-Machine/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at processTicksAndRejections (internal/process/task_queues.js:75:11)");

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
      });
    },
  };
};

/* harmony default export */ __webpack_exports__["a"] = (reels);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reelItem__ = __webpack_require__(12);




const moveArrayItemToNewIndex = (arr, old_index, new_index) => {
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

const reel = (reelNo) => {
  let firstItem;
  let lastItem;
  let nudgeCallTimes;

  const SELECT_GAME_MODE = document.getElementById("game-mode");
  const SELECT_ITEM_SELECTOR = document.getElementById("item-selector");
  const SELECT_ROW_SELECTOR = document.getElementById("row-selector");

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
      if (SELECT_GAME_MODE.value === "fixed" && this.runTime === 0) {
        let prevIndex = this.reelItems.findIndex(
          (item) =>
            parseInt(item.itemNo) === parseInt(SELECT_ITEM_SELECTOR.value)
        );
        const mapRowToString = {
          top: 2,
          middle: 1,
          bottom: 0,
        };
        let nextIndex = mapRowToString[SELECT_ROW_SELECTOR.value];
        if (prevIndex !== nextIndex) {
          moveArrayItemToNewIndex(this.reelItems, prevIndex, nextIndex);
          this.resetCoords();
        }
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTA0NjEzN2UwNmUwMDExZGM3ZTkiLCJ3ZWJwYWNrOi8vLy4vanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL3ZpZXdwb3J0LmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvcmVlbHMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9yZWVsLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvcmVlbEl0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9kaWdpdHMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9jcmVkaXRzLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvd2luLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvaG9sZEJ1dHRvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9ob2xkQnV0dG9uLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvbnVkZ2VCdXR0b25zLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvbnVkZ2VCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9udWRnZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUEr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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM3dCWTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSxpRUFBUSxF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SztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFZSw0REFBRyxFQUFDOzs7Ozs7OztBQ3ZCbkI7QUFBYTs7QUFFeUI7O0FBRXRDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGNBQWM7QUFDekMsNEJBQTRCLG9FQUFVO0FBQ3RDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFZSxvRUFBVyxFOzs7Ozs7O0FDdkJiOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSxtRUFBVSxFOzs7Ozs7O0FDcEJ6QjtBQUFhOztBQUUyQjs7QUFFeEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsY0FBYztBQUN6Qyw0QkFBNEIscUVBQVc7QUFDdkM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVlLHFFQUFZLEU7Ozs7Ozs7QUN2QmQ7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsb0VBQVcsRTs7Ozs7OztBQ3JCMUI7QUFBYTs7QUFFaUI7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixnRUFBTTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSwrREFBTSxFIiwiZmlsZSI6Ii4vanMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYTA0NjEzN2UwNmUwMDExZGM3ZTkiLCJpbXBvcnQgVmlld3BvcnQgZnJvbSBcIi4vY29tcG9uZW50cy92aWV3cG9ydFwiO1xuaW1wb3J0IFJlZWxzIGZyb20gXCIuL2NvbXBvbmVudHMvcmVlbHNcIjtcbmltcG9ydCBOdWRnZUJ1dHRvbnMgZnJvbSBcIi4vY29tcG9uZW50cy9udWRnZUJ1dHRvbnNcIjtcbmltcG9ydCBIb2xkQnV0dG9ucyBmcm9tIFwiLi9jb21wb25lbnRzL2hvbGRCdXR0b25zXCI7XG5pbXBvcnQgQ3JlZGl0cyBmcm9tIFwiLi9jb21wb25lbnRzL2NyZWRpdHNcIjtcbmltcG9ydCBXaW4gZnJvbSBcIi4vY29tcG9uZW50cy93aW5cIjtcbmltcG9ydCBOdWRnZXMgZnJvbSBcIi4vY29tcG9uZW50cy9udWRnZXNcIjtcblxuLy8gU2Fzc1xuaW1wb3J0IFwiLi4vc2Nzcy9hcHAuc2Nzc1wiO1xuXG4vLyBjcmVhdGVzIHRoZSBjYW52YXMgd2hpY2ggd2UgbmVlZCB0byBkcmF3IHVwb24gYW5kIGFzc2lnbnMgdG8gYSB2aWV3cG9ydCB2YXJpYWJsZVxuY29uc3Qgdmlld3BvcnQgPSBWaWV3cG9ydCgpO1xuLy8gY29uc3Qgc3BpbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcGluQnV0dG9uJyk7XG5jb25zdCB3aW5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpblwiKTtcbmNvbnN0IG51ZGdlc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibnVkZ2VzXCIpO1xubGV0IHBsYXlTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5U2VjdGlvblwiKTtcbmNvbnN0IHNlbGVjdF9nYW1lTW9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZS1tb2RlXCIpO1xuY29uc3QgZGl2X2ZpeGVkTW9kZU9wdGlvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpeGVkLW1vZGUtb3B0aW9uc1wiKTtcblxubGV0IHZpZXdwb3J0Q29udGFpbmVyO1xubGV0IG51ZGdlQnV0dG9uQ29udGFpbmVyO1xubGV0IGhvbGRCdXR0b25Db250YWluZXI7XG5sZXQgd2luSW5kaWNhdG9yTGVmdDtcbmxldCB3aW5JbmRpY2F0b3JSaWdodDtcbmxldCB3aW5JbmRpY2F0b3JUb3BMaW5lO1xubGV0IHdpbkluZGljYXRvckNlbnRyZUxpbmU7XG5sZXQgd2luSW5kaWNhdG9yQm90dG9tTGluZTtcbmxldCBzcGluQnV0dG9uO1xubGV0IHJlZWxzO1xubGV0IG51ZGdlcztcbmxldCBudWRnZUJ1dHRvbnM7XG5sZXQgaG9sZEJ1dHRvbnM7XG5sZXQgbnVkZ2VCdXR0b25MaXN0O1xubGV0IGhvbGRCdXR0b25MaXN0O1xubGV0IGNyZWRpdHM7XG5sZXQgd2luO1xubGV0IHdpbm5pbmdSb3dzID0gW107XG5sZXQgZ2FtZUxvb3A7XG5sZXQgbnVkZ2VDaGFuY2UgPSAyOyAvLyBDaGFuY2Ugb2YgZ2V0dGluZyBudWRnZXMgYWZ0ZXIgc3BpbiAoMSBpbiBudWRnZUNoYW5jZSlcbmxldCBob2xkQ2hhbmNlID0gMjsgLy8gQ2hhbmNlIG9mIGdldHRpbmcgaG9sZHMgYWZ0ZXIgc3BpbiAoMSBpbiBob2xkQ2hhbmNlKVxubGV0IGNhblNwaW47XG5sZXQgY2FuTnVkZ2U7XG5sZXQgY2FuSG9sZDtcbmxldCBub3c7IC8vIEN1cnJlbnQgdGltZSB0byBjb21wYXJlIGFnYWluc3RcbmxldCByZWVsc1J1bm5pbmcgPSBbXTsgLy8gS2VlcHMgdHJhY2sgb2YgYW55IHJlZWxzIHdpdGggcnVudGltZSBsZWZ0IG9uIHRoZW0gdG8gZXN0Ymxpc2ggd2hldGhlciB0byByZXNldC9zdG9wIHNwaW4gZXRjLlxubGV0IHNwaW5UeXBlID0gXCJzcGluXCI7IC8vIEtlZXBzIHRyYWNrIG9mIHdoZXRoZXIgbGFzdCBzcGluIHdhcyByZWd1bGFyIHNwaW4gb3IgbnVkZ2VcblxuY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgcmVuZGVyVmlld3BvcnRDb250YWluZXIoKTtcblxuICAvLyBSZW5kZXIgdmlld3BvcnRcbiAgdmlld3BvcnQucmVuZGVyKCk7XG5cbiAgLy8gU2V0IHVwIHJlZWxzXG4gIHJlZWxzID0gUmVlbHMoKTtcbiAgcmVlbHMuYnVpbGQoKTtcbiAgcmVlbHMucmVuZGVyKCk7XG5cbiAgbGV0IHJlZWxDb250YWluZXI7XG4gIGxldCByZWVsQ29udGFpbmVyWDtcbiAgbGV0IHJlZWxDb250YWluZXJZO1xuICBsZXQgcmVlbENvbnRhaW5lclc7XG4gIGxldCByZWVsQ29udGFpbmVySDtcblxuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgLy8gUmVuZGVyIG91dGVyIGNvbnRhaW5lciBmb3IgZWFjaCByZWVsIGluIHRoZSB2aWV3cG9ydCBjb250YWluZXJcbiAgICByZWVsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgIHJlZWxDb250YWluZXJYID1cbiAgICAgIHJlZWwucmVlbEl0ZW1zWzBdLnggK1xuICAgICAgVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWCAtXG4gICAgICBSRUVMX0NPTlRBSU5FUl9QQURESU5HO1xuXG4gICAgcmVlbENvbnRhaW5lclkgPVxuICAgICAgcmVlbC5yZWVsSXRlbXNbMl0ueSArXG4gICAgICBWSUVXUE9SVF9DT05UQUlORVJfUEFERElOR19ZIC1cbiAgICAgIFJFRUxfQ09OVEFJTkVSX1BBRERJTkc7XG5cbiAgICByZWVsQ29udGFpbmVyVyA9IFJFRUxfV0lEVEggKyBSRUVMX0NPTlRBSU5FUl9QQURESU5HICogMjtcblxuICAgIHJlZWxDb250YWluZXJIID0gVklFV1BPUlRfSEVJR0hUICsgUkVFTF9DT05UQUlORVJfUEFERElORyAqIDI7XG5cbiAgICByZWVsQ29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIHJlZWxDb250YWluZXIuc3R5bGUudG9wID0gcmVlbENvbnRhaW5lclkgKyBcInB4XCI7XG4gICAgcmVlbENvbnRhaW5lci5zdHlsZS5sZWZ0ID0gcmVlbENvbnRhaW5lclggKyBcInB4XCI7XG4gICAgcmVlbENvbnRhaW5lci5zdHlsZS53aWR0aCA9IHJlZWxDb250YWluZXJXICsgXCJweFwiO1xuICAgIHJlZWxDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gcmVlbENvbnRhaW5lckggKyBcInB4XCI7XG4gICAgcmVlbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicmVlbC1jb250YWluZXJcIik7XG4gICAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQocmVlbENvbnRhaW5lcik7XG4gIH0pO1xuXG4gIHJlbmRlcldpbkluZGljYXRvcnMoKTtcblxuICByZW5kZXJOdWRnZUJ1dHRvbkNvbnRhaW5lcigpO1xuXG4gIC8vIFNldCB1cCBudWRnZSBidXR0b25zXG4gIG51ZGdlQnV0dG9ucyA9IE51ZGdlQnV0dG9ucygpO1xuICBudWRnZUJ1dHRvbnMuYnVpbGQoKTtcbiAgbnVkZ2VCdXR0b25zLnJlbmRlcigpO1xuXG4gIG51ZGdlQnV0dG9uTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJudWRnZS1idXR0b25cIik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudWRnZUJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBudWRnZUJ1dHRvbkxpc3RbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgY2FuU3BpbiAmJlxuICAgICAgICBjYW5OdWRnZSAmJlxuICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5jYW5OdWRnZSA9PT0gdHJ1ZSAmJlxuICAgICAgICBudWRnZXMubnVkZ2VzUmVtYWluaW5nID4gMFxuICAgICAgKSB7XG4gICAgICAgIHNwaW5UeXBlID0gXCJudWRnZVwiO1xuICAgICAgICBudWRnZXMubnVkZ2VzUmVtYWluaW5nIC09IDE7XG4gICAgICAgIHJlZWxzLnJlZWxMaXN0W2ldLmlzTnVkZ2luZyA9IHRydWU7XG4gICAgICAgIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgICBnYW1lU3RhdGVzLmN1cnJlbnRTdGF0ZSA9IGdhbWVTdGF0ZXMubnVkZ2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBTZXQgdXAgbnVkZ2VzXG4gIG51ZGdlcyA9IE51ZGdlcygpO1xuICBudWRnZXMucmVuZGVyKCk7XG5cbiAgcmVuZGVySG9sZEJ1dHRvbkNvbnRhaW5lcigpO1xuXG4gIC8vIFNldCB1cCBob2xkIGJ1dHRvbnNcbiAgaG9sZEJ1dHRvbnMgPSBIb2xkQnV0dG9ucygpO1xuICBob2xkQnV0dG9ucy5idWlsZCgpO1xuICBob2xkQnV0dG9ucy5yZW5kZXIoKTtcblxuICBob2xkQnV0dG9uTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJob2xkLWJ1dHRvblwiKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGhvbGRCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaG9sZEJ1dHRvbkxpc3RbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgaWYgKGNhblNwaW4gJiYgY2FuSG9sZCkge1xuICAgICAgICAvLyBUb2dnbGVcbiAgICAgICAgaWYgKHJlZWxzLnJlZWxMaXN0W2ldLmlzSGVsZCkge1xuICAgICAgICAgIC8vIFRha2UgaG9sZCBvZmZcbiAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQgPSBmYWxzZTtcbiAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5yZXNldFJ1bnRpbWUoKTtcbiAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImhlbGRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUHV0IGhvbGQgb25cbiAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQgPSB0cnVlO1xuICAgICAgICAgIHJlZWxzLnJlZWxMaXN0W2ldLnJ1blRpbWUgPSAwO1xuICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGVsZFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gU2V0IHVwIGNyZWRpdHNcbiAgY3JlZGl0cyA9IENyZWRpdHMoKTtcbiAgY3JlZGl0cy5yZXNldCgpO1xuICBjcmVkaXRzLnJlbmRlcigpO1xuXG4gIC8vIFNldCB1cCB3aW5cbiAgd2luID0gV2luKCk7XG4gIHdpbi5yZXNldCgpO1xuICB3aW4ucmVuZGVyKCk7XG5cbiAgcmVuZGVyU3BpbkJ1dHRvbigpO1xuXG4gIGNhblNwaW4gPSB0cnVlO1xuICBjYW5OdWRnZSA9IGZhbHNlO1xuICBjYW5Ib2xkID0gZmFsc2U7XG5cbiAgZW5hYmxlU3BpbigpO1xuXG4gIHNwaW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAoY2FuU3Bpbikge1xuICAgICAgY3JlZGl0cy51c2VDcmVkaXQoKTtcbiAgICAgIGNyZWRpdHMucmVuZGVyKCk7XG4gICAgICB3aW5uaW5nUm93cyA9IFtdO1xuICAgICAgZGlzYWJsZU51ZGdlcygpO1xuICAgICAgZGlzYWJsZVNwaW4oKTtcblxuICAgICAgLy8gRGlzYWJsZSBob2xkIGJ1dHRvbnMgdGhhdCBhcmVuJ3QgaGVsZFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWVscy5yZWVsTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIXJlZWxzLnJlZWxMaXN0W2ldLmlzSGVsZCkge1xuICAgICAgICAgIHJlZWxzLnJlZWxMaXN0W2ldLmNhbkhvbGQgPSBmYWxzZTtcbiAgICAgICAgICBob2xkQnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNwaW5UeXBlID0gXCJzcGluXCI7XG4gICAgICBnYW1lU3RhdGVzLmN1cnJlbnRTdGF0ZSA9IGdhbWVTdGF0ZXMuc3BpbjtcbiAgICAgIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgZ2FtZVN0YXRlcy5jdXJyZW50U3RhdGUoKTtcbiAgICB9XG4gIH0pO1xuICBzZWxlY3RfZ2FtZU1vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGlmICh0aGlzLnZhbHVlID09PSBcImZpeGVkXCIpIHtcbiAgICAgIGRpdl9maXhlZE1vZGVPcHRpb25zLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgfSBlbHNlIGlmICh0aGlzLnZhbHVlID09PSBcInJhbmRvbVwiKSB7XG4gICAgICBkaXZfZml4ZWRNb2RlT3B0aW9ucy5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCByZW5kZXJOdWRnZUJ1dHRvbkNvbnRhaW5lciA9ICgpID0+IHtcbiAgbnVkZ2VCdXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBudWRnZUJ1dHRvbkNvbnRhaW5lci5pZCA9IFwibnVkZ2VCdXR0b25zXCI7XG4gIHBsYXlTZWN0aW9uLmFwcGVuZENoaWxkKG51ZGdlQnV0dG9uQ29udGFpbmVyKTtcbn07XG5cbmNvbnN0IHJlbmRlckhvbGRCdXR0b25Db250YWluZXIgPSAoKSA9PiB7XG4gIGhvbGRCdXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBob2xkQnV0dG9uQ29udGFpbmVyLmlkID0gXCJob2xkQnV0dG9uc1wiO1xuICBwbGF5U2VjdGlvbi5hcHBlbmRDaGlsZChob2xkQnV0dG9uQ29udGFpbmVyKTtcbn07XG5cbmNvbnN0IHJlbmRlclNwaW5CdXR0b24gPSAoKSA9PiB7XG4gIHNwaW5CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBzcGluQnV0dG9uLmlkID0gXCJzcGluQnV0dG9uXCI7XG4gIHNwaW5CdXR0b24uY2xhc3NMaXN0LmFkZChcImJ1dHRvblwiKTtcbiAgc3BpbkJ1dHRvbi5pbm5lckhUTUwgPSBcIlNQSU5cIjtcbiAgcGxheVNlY3Rpb24uYXBwZW5kQ2hpbGQoc3BpbkJ1dHRvbik7XG59O1xuXG5jb25zdCByZW5kZXJWaWV3cG9ydENvbnRhaW5lciA9ICgpID0+IHtcbiAgLy8gUmVuZGVyIHZpZXdwb3J0IGNvbnRhaW5lclxuICB2aWV3cG9ydENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHZpZXdwb3J0Q29udGFpbmVyLmlkID0gXCJ2aWV3cG9ydENvbnRhaW5lclwiO1xuICB2aWV3cG9ydENvbnRhaW5lci5zdHlsZS5wYWRkaW5nTGVmdCA9IFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1ggKyBcInB4XCI7XG4gIHZpZXdwb3J0Q29udGFpbmVyLnN0eWxlLnBhZGRpbmdSaWdodCA9IFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1ggKyBcInB4XCI7XG4gIHZpZXdwb3J0Q29udGFpbmVyLnN0eWxlLnBhZGRpbmdUb3AgPSBWSUVXUE9SVF9DT05UQUlORVJfUEFERElOR19ZICsgXCJweFwiO1xuICB2aWV3cG9ydENvbnRhaW5lci5zdHlsZS5wYWRkaW5nQm90dG9tID0gVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWSArIFwicHhcIjtcbiAgcGxheVNlY3Rpb24uYXBwZW5kQ2hpbGQodmlld3BvcnRDb250YWluZXIpO1xufTtcblxuY29uc3QgcmVuZGVyV2luSW5kaWNhdG9ycyA9ICgpID0+IHtcbiAgLy8gTGVmdCBpbmRpY2F0b3JcbiAgd2luSW5kaWNhdG9yTGVmdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICB3aW5JbmRpY2F0b3JMZWZ0LmNsYXNzTGlzdC5hZGQoXCJ3aW4taW5kaWNhdG9yXCIsIFwibGVmdFwiKTtcbiAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQod2luSW5kaWNhdG9yTGVmdCk7XG4gIC8vIFJpZ2h0IGluZGljYXRvclxuICB3aW5JbmRpY2F0b3JSaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICB3aW5JbmRpY2F0b3JSaWdodC5jbGFzc0xpc3QuYWRkKFwid2luLWluZGljYXRvclwiLCBcInJpZ2h0XCIpO1xuICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZCh3aW5JbmRpY2F0b3JSaWdodCk7XG5cbiAgLy8gQ2VudHJlIGxpbmVcbiAgd2luSW5kaWNhdG9yQ2VudHJlTGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHdpbkluZGljYXRvckNlbnRyZUxpbmUuY2xhc3NMaXN0LmFkZChcIndpbi1pbmRpY2F0b3ItY2VudHJlLWxpbmVcIik7XG5cbiAgd2luSW5kaWNhdG9yQ2VudHJlTGluZS5zdHlsZS5sZWZ0ID0gd2luSW5kaWNhdG9yTGVmdC5vZmZzZXRXaWR0aCArIFwicHhcIjtcblxuICB3aW5JbmRpY2F0b3JDZW50cmVMaW5lLnN0eWxlLndpZHRoID1cbiAgICB2aWV3cG9ydENvbnRhaW5lci5vZmZzZXRXaWR0aCAtXG4gICAgd2luSW5kaWNhdG9yTGVmdC5vZmZzZXRXaWR0aCAtXG4gICAgd2luSW5kaWNhdG9yUmlnaHQub2Zmc2V0V2lkdGggK1xuICAgIFwicHhcIjtcblxuICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZCh3aW5JbmRpY2F0b3JDZW50cmVMaW5lKTtcblxuICAvLyBUb3AgbGluZVxuICB3aW5JbmRpY2F0b3JUb3BMaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgd2luSW5kaWNhdG9yVG9wTGluZS5jbGFzc0xpc3QuYWRkKFwid2luLWluZGljYXRvci10b3AtbGluZVwiKTtcblxuICB3aW5JbmRpY2F0b3JUb3BMaW5lLnN0eWxlLmxlZnQgPSB3aW5JbmRpY2F0b3JMZWZ0Lm9mZnNldFdpZHRoICsgXCJweFwiO1xuXG4gIHdpbkluZGljYXRvclRvcExpbmUuc3R5bGUud2lkdGggPVxuICAgIHZpZXdwb3J0Q29udGFpbmVyLm9mZnNldFdpZHRoIC1cbiAgICB3aW5JbmRpY2F0b3JMZWZ0Lm9mZnNldFdpZHRoIC1cbiAgICB3aW5JbmRpY2F0b3JSaWdodC5vZmZzZXRXaWR0aCArXG4gICAgXCJweFwiO1xuXG4gIHZpZXdwb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHdpbkluZGljYXRvclRvcExpbmUpO1xuXG4gIC8vIEJvdHRvbSBsaW5lXG4gIHdpbkluZGljYXRvckJvdHRvbUxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB3aW5JbmRpY2F0b3JCb3R0b21MaW5lLmNsYXNzTGlzdC5hZGQoXCJ3aW4taW5kaWNhdG9yLWJvdHRvbS1saW5lXCIpO1xuXG4gIHdpbkluZGljYXRvckJvdHRvbUxpbmUuc3R5bGUubGVmdCA9IHdpbkluZGljYXRvckxlZnQub2Zmc2V0V2lkdGggKyBcInB4XCI7XG5cbiAgd2luSW5kaWNhdG9yQm90dG9tTGluZS5zdHlsZS53aWR0aCA9XG4gICAgdmlld3BvcnRDb250YWluZXIub2Zmc2V0V2lkdGggLVxuICAgIHdpbkluZGljYXRvckxlZnQub2Zmc2V0V2lkdGggLVxuICAgIHdpbkluZGljYXRvclJpZ2h0Lm9mZnNldFdpZHRoICtcbiAgICBcInB4XCI7XG5cbiAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQod2luSW5kaWNhdG9yQm90dG9tTGluZSk7XG59O1xuXG5jb25zdCBsb29wID0gKGN1cnJlbnRUaW1lKSA9PiB7XG4gIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApOyAvLyBOZWVkcyB0byBnbyBiZWZvcmUgbGluZSBiZWxvdyB0byBrZWVwIGFuaW1hdGlvbmZyYW1laWQgdXAgdG8gZGF0ZVxuICBnYW1lU3RhdGVzLmN1cnJlbnRTdGF0ZShjdXJyZW50VGltZSk7XG59O1xuXG5jb25zdCBtb3ZlUmVlbHMgPSAoKSA9PiB7XG4gIHJlZWxzLm1vdmUoKTtcbn07XG5cbmNvbnN0IHJlbmRlciA9ICgpID0+IHtcbiAgdmlld3BvcnQuY2xlYXIoKTtcbiAgcmVlbHMucmVuZGVyKCk7XG5cbiAgLy8gRGlnaXRzXG4gIG51ZGdlcy5yZW5kZXIoKTtcbiAgY3JlZGl0cy5yZW5kZXIoKTtcbiAgd2luLnJlbmRlcigpO1xufTtcblxuLy8gQ2FsY3VsYXRlcyB3aW4gYW1vdW50LCBpZiB3aW5uaW5nIGxpbmVcbmNvbnN0IGNoZWNrV2luID0gKCkgPT4ge1xuICBsZXQgc3BpblJlc3VsdCA9IFtdOyAvLyBBcnJheSBvZiByZWVsIHJlc3VsdHMgYWZ0ZXIgc3BpbiAoYWxsIHRocmVlIHZpc2libGUgb2JqZWN0cyBvZiBlYWNoIHJlZWwpXG4gIGxldCByZWVsUmVzdWx0OyAvLyBJbmRpdmlkdWFsIHJlZWwgcmVzdWx0LCBtYWRlIG9mIHRocmVlIG9iamVjdHMgKHZpc2libGUpXG5cbiAgLy8gQ2hlY2sgZm9yIHdpblxuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsLCBpbmRleCkgPT4ge1xuICAgIHJlZWxSZXN1bHQgPSBbXTsgLy8gUmVzdWx0IG9mIGluZGl2aWR1YWwgcmVlbFxuXG4gICAgcmVlbFJlc3VsdC5wdXNoKHJlZWxzLnJlZWxMaXN0W2luZGV4XS5yZWVsSXRlbXNbMF0pO1xuICAgIHJlZWxSZXN1bHQucHVzaChyZWVscy5yZWVsTGlzdFtpbmRleF0ucmVlbEl0ZW1zWzFdKTtcbiAgICByZWVsUmVzdWx0LnB1c2gocmVlbHMucmVlbExpc3RbaW5kZXhdLnJlZWxJdGVtc1syXSk7XG5cbiAgICBzcGluUmVzdWx0LnB1c2gocmVlbFJlc3VsdCk7XG4gIH0pO1xuICBsZXQgcmVzdWx0ID0gZ2V0QWxsUm93UmVzdWx0cyhzcGluUmVzdWx0KTtcbiAgbGV0IGN1cnJlbnRXaW5BbW91bnQgPSAwO1xuXG4gIC8vIEFsbCB0aGUgcG9zc2libGUgd2lubmluZyBwb3NzaWJpbGl0aWVzIGFuZCBpdHMgcHJpemVzXG4gIHZhciB3aW5uaW5nQ2FzZSA9IHtcbiAgICB0b3A6IHtcbiAgICAgIGNoZXJyeToge1xuICAgICAgICB2YWxpZGF0ZTogLzR7M30vLnRlc3QocmVzdWx0W1widG9wXCJdKSxcbiAgICAgICAgdmFsdWU6IDIwMDAsXG4gICAgICB9LFxuICAgICAgXCI3XCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8zezN9Ly50ZXN0KHJlc3VsdFtcInRvcFwiXSksXG4gICAgICAgIHZhbHVlOiAxNTAsXG4gICAgICB9LFxuICAgICAgY2hlcnJ5T3I3OiB7XG4gICAgICAgIHZhbGlkYXRlOiAvWzQvM117M30vLnRlc3QocmVzdWx0W1widG9wXCJdKSxcbiAgICAgICAgdmFsdWU6IDc1LFxuICAgICAgfSxcbiAgICAgIFwiM3hCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzB7M30vLnRlc3QocmVzdWx0W1widG9wXCJdKSxcbiAgICAgICAgdmFsdWU6IDUwLFxuICAgICAgfSxcbiAgICAgIFwiMnhCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzJ7M30vLnRlc3QocmVzdWx0W1widG9wXCJdKSxcbiAgICAgICAgdmFsdWU6IDIwLFxuICAgICAgfSxcbiAgICAgIFwiMXhCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzF7M30vLnRlc3QocmVzdWx0W1widG9wXCJdKSxcbiAgICAgICAgdmFsdWU6IDEwLFxuICAgICAgfSxcbiAgICAgIGFueUJhcjoge1xuICAgICAgICB2YWxpZGF0ZTogL1swMTJdezN9Ly50ZXN0KHJlc3VsdFtcInRvcFwiXSksXG4gICAgICAgIHZhbHVlOiA1LFxuICAgICAgfSxcbiAgICB9LFxuICAgIG1pZGRsZToge1xuICAgICAgY2hlcnJ5OiB7XG4gICAgICAgIHZhbGlkYXRlOiAvNHszfS8udGVzdChyZXN1bHRbXCJtaWRkbGVcIl0pLFxuICAgICAgICB2YWx1ZTogMTAwMCxcbiAgICAgIH0sXG4gICAgICBcIjdcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzN7M30vLnRlc3QocmVzdWx0W1wibWlkZGxlXCJdKSxcbiAgICAgICAgdmFsdWU6IDE1MCxcbiAgICAgIH0sXG4gICAgICBjaGVycnlPcjc6IHtcbiAgICAgICAgdmFsaWRhdGU6IC9bNC8zXXszfS8udGVzdChyZXN1bHRbXCJtaWRkbGVcIl0pLFxuICAgICAgICB2YWx1ZTogNzUsXG4gICAgICB9LFxuICAgICAgXCIzeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMHszfS8udGVzdChyZXN1bHRbXCJtaWRkbGVcIl0pLFxuICAgICAgICB2YWx1ZTogNTAsXG4gICAgICB9LFxuICAgICAgXCIyeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMnszfS8udGVzdChyZXN1bHRbXCJtaWRkbGVcIl0pLFxuICAgICAgICB2YWx1ZTogMjAsXG4gICAgICB9LFxuICAgICAgXCIxeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMXszfS8udGVzdChyZXN1bHRbXCJtaWRkbGVcIl0pLFxuICAgICAgICB2YWx1ZTogMTAsXG4gICAgICB9LFxuICAgICAgYW55QmFyOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvWzAxMl17M30vLnRlc3QocmVzdWx0W1wibWlkZGxlXCJdKSxcbiAgICAgICAgdmFsdWU6IDUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgYm90dG9tOiB7XG4gICAgICBjaGVycnk6IHtcbiAgICAgICAgdmFsaWRhdGU6IC80ezN9Ly50ZXN0KHJlc3VsdFtcImJvdHRvbVwiXSksXG4gICAgICAgIHZhbHVlOiA0MDAwLFxuICAgICAgfSxcbiAgICAgIFwiN1wiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvM3szfS8udGVzdChyZXN1bHRbXCJib3R0b21cIl0pLFxuICAgICAgICB2YWx1ZTogMTUwLFxuICAgICAgfSxcbiAgICAgIGNoZXJyeU9yNzoge1xuICAgICAgICB2YWxpZGF0ZTogL1s0LzNdezN9Ly50ZXN0KHJlc3VsdFtcImJvdHRvbVwiXSksXG4gICAgICAgIHZhbHVlOiA3NSxcbiAgICAgIH0sXG4gICAgICBcIjN4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8wezN9Ly50ZXN0KHJlc3VsdFtcImJvdHRvbVwiXSksXG4gICAgICAgIHZhbHVlOiA1MCxcbiAgICAgIH0sXG4gICAgICBcIjJ4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8yezN9Ly50ZXN0KHJlc3VsdFtcImJvdHRvbVwiXSksXG4gICAgICAgIHZhbHVlOiAyMCxcbiAgICAgIH0sXG4gICAgICBcIjF4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8xezN9Ly50ZXN0KHJlc3VsdFtcImJvdHRvbVwiXSksXG4gICAgICAgIHZhbHVlOiAxMCxcbiAgICAgIH0sXG4gICAgICBhbnlCYXI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC9bMDEyXXszfS8udGVzdChyZXN1bHRbXCJib3R0b21cIl0pLFxuICAgICAgICB2YWx1ZTogNSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICAvLyBMb29wIHRocm91Z2ggdGhlIHdpbm5pbmcgcG9zc2liaWxpdGllc1xuICAvLyBjYXNlIHdpbm5pbmcgZHJhdyB0aGUgbGluZSBpbiB0aGUgd2lubmluZyByb3dcbiAgLy8gdXBkYXRlIHRoZSB2aWV3IHdpdGggdGhlIHByaXplIHZhbHVlXG4gIGZvciAobGV0IHJvdyBpbiB3aW5uaW5nQ2FzZSkge1xuICAgIGZvciAobGV0IGl0ZW0gaW4gd2lubmluZ0Nhc2Vbcm93XSkge1xuICAgICAgaWYgKHdpbm5pbmdDYXNlW3Jvd11baXRlbV0udmFsaWRhdGUpIHtcbiAgICAgICAgY3VycmVudFdpbkFtb3VudCArPSB3aW5uaW5nQ2FzZVtyb3ddW2l0ZW1dLnZhbHVlO1xuXG4gICAgICAgIHdpbm5pbmdSb3dzLnB1c2gocm93KTtcbiAgICAgICAgLy8gQnJlYWsgZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoY3VycmVudFdpbkFtb3VudCkgcmV0dXJuIGN1cnJlbnRXaW5BbW91bnQ7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGdldEFsbFJvd1Jlc3VsdHMgPSAoc3BpblJlc3VsdCkgPT4ge1xuICBsZXQgdG9wID0gXCJcIixcbiAgICBtaWRkbGUgPSBcIlwiLFxuICAgIGJvdHRvbSA9IFwiXCI7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3BpblJlc3VsdC5sZW5ndGggJiYgc3BpblJlc3VsdC5sZW5ndGggPT09IDM7IGkrKykge1xuICAgIHRvcCArPSBzcGluUmVzdWx0W2ldWzJdLml0ZW1Oby50b1N0cmluZygpO1xuICAgIG1pZGRsZSArPSBzcGluUmVzdWx0W2ldWzFdLml0ZW1Oby50b1N0cmluZygpO1xuICAgIGJvdHRvbSArPSBzcGluUmVzdWx0W2ldWzBdLml0ZW1Oby50b1N0cmluZygpO1xuICB9XG4gIHJldHVybiB7XG4gICAgdG9wLFxuICAgIG1pZGRsZSxcbiAgICBib3R0b20sXG4gIH07XG59O1xuXG4vLyBSYW5kb21seSBhc3NpZ24gbnVkZ2VzXG5jb25zdCBhc3NpZ25OdWRnZXMgPSAoKSA9PiB7XG4gIC8vIFJhbmRvbWx5IGFzc2lnbiBudWRnZXNcbiAgY29uc3QgbnVkZ2VSYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBudWRnZUNoYW5jZSArIDEpO1xuXG4gIC8vIElmIHJhbmRvbSBjaGFuY2UgaXMgbWV0IHRoZW4gYXNzaWduIG51ZGdlc1xuICBpZiAobnVkZ2VSYW5kb20gPT09IG51ZGdlQ2hhbmNlKSB7XG4gICAgY2FuTnVkZ2UgPSB0cnVlO1xuICAgIGVuYWJsZU51ZGdlcygpO1xuICAgIG51ZGdlcy5udWRnZXNSZW1haW5pbmcgPSA1O1xuICAgIG51ZGdlcy5yZW5kZXIoKTtcbiAgfSBlbHNlIGlmIChudWRnZXMubnVkZ2VzUmVtYWluaW5nIDwgMSkge1xuICAgIC8vIElmIG5vIG51ZGdlcyBsZWZ0IGluIGJhbmtcbiAgICBjYW5OdWRnZSA9IGZhbHNlO1xuICAgIGRpc2FibGVOdWRnZXMoKTtcbiAgfVxufTtcblxuLy8gUmFuZG9tbHkgYXNzaWduIGhvbGRzXG5jb25zdCBhc3NpZ25Ib2xkcyA9ICgpID0+IHtcbiAgY29uc3QgaG9sZFJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGhvbGRDaGFuY2UgKyAxKTtcblxuICAvLyBSYW5kb21seSBhc3NpZ24gaG9sZHMgKGlmIG5vIG51ZGdlcyBsZWZ0IGluIGJhbmspXG4gIC8vIEFzc2lnbiBob2xkIGlmIHJhbmRvbSBudW1iZXIgbWV0IGFuZCBsYXN0IHNwaW4gd2Fzbid0IGEgd2luXG4gIGlmIChudWRnZXMubnVkZ2VzUmVtYWluaW5nIDwgMSkge1xuICAgIGlmIChob2xkUmFuZG9tID09PSBob2xkQ2hhbmNlKSB7XG4gICAgICAvLyBDYW4gaG9sZFxuICAgICAgY2FuSG9sZCA9IHRydWU7XG4gICAgICBidXR0b25TdHlsZXMoaG9sZEJ1dHRvbkxpc3QsIFwiYWRkXCIsIFwiYWN0aXZlXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYW5Ib2xkID0gZmFsc2U7XG4gICAgICBidXR0b25TdHlsZXMoaG9sZEJ1dHRvbkxpc3QsIFwicmVtb3ZlXCIsIFwiYWN0aXZlXCIpO1xuICAgICAgYnV0dG9uU3R5bGVzKGhvbGRCdXR0b25MaXN0LCBcInJlbW92ZVwiLCBcImhlbGRcIik7XG4gICAgfVxuICB9XG59O1xuXG4vLyBFbmFibGUgYWxsIG51ZGdlc1xuY29uc3QgZW5hYmxlTnVkZ2VzID0gKCkgPT4ge1xuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgLy8gSWYgdGhlIHJlZWwgaXNuJ3QgaGVsZFxuICAgIGlmICghcmVlbC5pc0hlbGQpIHtcbiAgICAgIHJlZWwuY2FuTnVkZ2UgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudWRnZUJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBJZiB0aGUgcmVlbCBpc24ndCBoZWxkXG4gICAgaWYgKCFyZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQpIHtcbiAgICAgIG51ZGdlQnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIH1cbiAgfVxuXG4gIG51ZGdlc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xufTtcblxuLy8gRW5iYWxlIGFsbCBob2xkc1xuY29uc3QgZW5hYmxlSG9sZHMgPSAoKSA9PiB7XG4gIHJlZWxzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcbiAgICByZWVsLmNhbkhvbGQgPSB0cnVlO1xuICB9KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGhvbGRCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaG9sZEJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgfVxuXG4gIGNhbmhvbGQgPSB0cnVlO1xufTtcblxuLy8gRGlzYWJsZSBhbGwgbnVkZ2VzXG5jb25zdCBkaXNhYmxlTnVkZ2VzID0gKCkgPT4ge1xuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgcmVlbC5jYW5OdWRnZSA9IGZhbHNlO1xuICB9KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG51ZGdlQnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIG51ZGdlQnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICB9XG5cbiAgbnVkZ2VzLnJlc2V0KCk7XG5cbiAgY2FuTnVkZ2UgPSBmYWxzZTtcblxuICBudWRnZXNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbn07XG5cbi8vIERpc2FibGUgYWxsIGhvbGRzXG5jb25zdCBkaXNhYmxlSG9sZHMgPSAoKSA9PiB7XG4gIHJlZWxzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcbiAgICByZWVsLmNhbkhvbGQgPSBmYWxzZTtcbiAgICByZWVsLmlzSGVsZCA9IGZhbHNlO1xuICAgIGlmIChyZWVsLnJ1blRpbWUgPCAxKSB7XG4gICAgICByZWVsLnJlc2V0UnVudGltZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBob2xkQnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGhvbGRCdXR0b25MaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIiwgXCJoZWxkXCIpO1xuICB9XG5cbiAgY2FuSG9sZCA9IGZhbHNlO1xufTtcblxuLy8gRW5hYmxlIHNwaW5cbmNvbnN0IGVuYWJsZVNwaW4gPSAoKSA9PiB7XG4gIHNwaW5CdXR0b24uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgY2FuU3BpbiA9IHRydWU7XG59O1xuXG4vLyBEaXNiYWxlIHNwaW5cbmNvbnN0IGRpc2FibGVTcGluID0gKCkgPT4ge1xuICBzcGluQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gIGNhblNwaW4gPSBmYWxzZTtcbn07XG5cbi8vIEFkZCBvciByZW1vdmUgZ3JvdXAgYnV0dG9uIHN0eWxlc1xuY29uc3QgYnV0dG9uU3R5bGVzID0gKGJ1dHRvbkxpc3QsIGFkZFJlbW92ZSwgY2xhc3NOYW1lKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhZGRSZW1vdmUgPT09IFwiYWRkXCIpIHtcbiAgICAgIGJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH0gZWxzZSBpZiAoYWRkUmVtb3ZlID09PSBcInJlbW92ZVwiKSB7XG4gICAgICBidXR0b25MaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIEdhbWUgc3RhdGVcbmNvbnN0IGdhbWVTdGF0ZXMgPSB7XG4gIGN1cnJlbnRTdGF0ZTogbnVsbCxcbiAgd2luQW1vdW50OiAwLFxuICBvbGRXaW5EaXNwbGF5OiAwLCAvLyBXaGVuIGxvb3BpbmcgdGhyb3VnaCB3aW4gaW5jcmVtZW50IC0gdGhpcyBpcyB0aGUgb3JpZ2luYWwgZmlndXJlXG4gIGN1cnJlbnRXaW5EaXNwbGF5OiAwLCAvLyBXaGVuIGxvb3BpbmcgdGhyb3VnaCB3aW4gYW1vdW50IC0gdGhpcyBpcyB0aGUgbmV3IGZpZ3VyZVxuXG4gIC8vIFJlZ3VsYXIgc3BpblxuICBzcGluOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zcGluVHlwZSA9IFwic3BpblwiO1xuICAgIGRpc2FibGVTcGluKCk7XG4gICAgbW92ZVJlZWxzKCk7XG4gICAgcmVuZGVyKCk7XG5cbiAgICAvLyBGaWx0ZXIgcmVlbCBydW50aW1lcyAtIGlmIG9uZSBpcyBhYm92ZSB6ZXJvIHRoZW4gY2Fycnkgb25cbiAgICByZWVsc1J1bm5pbmcgPSByZWVscy5yZWVsTGlzdC5maWx0ZXIoKHJlZWwpID0+IHtcbiAgICAgIHJldHVybiByZWVsLnJ1blRpbWUgPiAwO1xuICAgIH0pO1xuXG4gICAgaWYgKCFyZWVsc1J1bm5pbmcubGVuZ3RoKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuc3BpbkZpbmlzaGVkO1xuICAgIH1cbiAgfSxcbiAgLy8gU3BpbiBmaW5pc2hlZFxuICBzcGluRmluaXNoZWQ6IGZ1bmN0aW9uIChjdXJyZW50VGltZSkge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcblxuICAgIGlmIChudWRnZXMubnVkZ2VzUmVtYWluaW5nIDwgMSkge1xuICAgICAgZGlzYWJsZU51ZGdlcygpO1xuICAgICAgaWYgKHNwaW5UeXBlICE9PSBcIm51ZGdlXCIpIHtcbiAgICAgICAgZGlzYWJsZUhvbGRzKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIHdpblxuICAgIGNvbnN0IHdpbiA9IGNoZWNrV2luKCk7XG5cbiAgICAvLyBXaW5cbiAgICBpZiAod2luKSB7XG4gICAgICAvLyBSZXNldCBudWRnZXNcbiAgICAgIG51ZGdlcy5yZXNldCgpO1xuICAgICAgY2FuTnVkZ2UgPSBmYWxzZTtcbiAgICAgIGRpc2FibGVOdWRnZXMoKTtcbiAgICAgIGRpc2FibGVIb2xkcygpO1xuICAgICAgZGlzYWJsZVNwaW4oKTtcblxuICAgICAgbm93ID0gY3VycmVudFRpbWU7XG4gICAgICB0aGlzLndpbkFtb3VudCA9IHdpbjtcblxuICAgICAgcmVuZGVyKCk7XG4gICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMud2luOyAvLyBTd2l0Y2ggdG8gd2luIGFuaW1hdGlvbiBzdGF0ZVxuICAgICAgZ2FtZUxvb3AgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgfVxuICAgIC8vIE5vIHdpblxuICAgIGVsc2Uge1xuICAgICAgaWYgKFxuICAgICAgICBudWRnZXMubnVkZ2VzUmVtYWluaW5nIDwgMSAmJlxuICAgICAgICBzcGluVHlwZSAhPT0gXCJudWRnZVwiICYmXG4gICAgICAgIGNyZWRpdHMuY3JlZGl0c1JlbWFpbmluZyA+IDBcbiAgICAgICkge1xuICAgICAgICAvLyBJZiBubyB3aW5uaW5nIGxpbmUgdGhlbiBhc3NpZ24gaG9sZHMgYW5kIG51ZGdlc1xuICAgICAgICBhc3NpZ25Ib2xkcygpO1xuICAgICAgICBhc3NpZ25OdWRnZXMoKTtcbiAgICAgIH1cblxuICAgICAgLy8gRW5hYmxlIHNwaW5cbiAgICAgIGVuYWJsZVNwaW4oKTtcblxuICAgICAgLy8gQ2hlY2sgY3JlZGl0c1xuICAgICAgaWYgKGNyZWRpdHMuY3JlZGl0c1JlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuZ2FtZU92ZXI7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlKCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvLyBOdWRnZVxuICBudWRnZTogZnVuY3Rpb24gKGN1cnJlbnRUaW1lKSB7XG4gICAgbGV0IGlzTnVkZ2luZyA9IFtdO1xuICAgIC8vIElmIG51ZGdpbmcgc3RvcHBlZCwgdGhlbiBjaGFuZ2UgZ2FtZXN0YXRlIHRvIHNwaW5maW5pc2hlZFxuICAgIGlzTnVkZ2luZyA9IHJlZWxzLnJlZWxMaXN0LmZpbHRlcigocmVlbCkgPT4ge1xuICAgICAgcmV0dXJuIHJlZWwuaXNOdWRnaW5nID09PSB0cnVlO1xuICAgIH0pO1xuXG4gICAgaWYgKCFpc051ZGdpbmcubGVuZ3RoKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG4gICAgICB0aGlzLnNwaW5GaW5pc2hlZChjdXJyZW50VGltZSk7XG4gICAgfVxuXG4gICAgaXNOdWRnaW5nLmZvckVhY2goKHJlZWwpID0+IHtcbiAgICAgIHJlZWwubnVkZ2UoKTtcbiAgICAgIHJlbmRlcigpO1xuICAgIH0pO1xuICB9LFxuICAvLyBXaW4gYW5pbWF0aW9uXG4gIHdpbjogZnVuY3Rpb24gKGN1cnJlbnRUaW1lKSB7XG4gICAgaWYgKHdpbm5pbmdSb3dzLmluY2x1ZGVzKFwidG9wXCIpKVxuICAgICAgd2luSW5kaWNhdG9yVG9wTGluZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGlmICh3aW5uaW5nUm93cy5pbmNsdWRlcyhcIm1pZGRsZVwiKSlcbiAgICAgIHdpbkluZGljYXRvckNlbnRyZUxpbmUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICBpZiAod2lubmluZ1Jvd3MuaW5jbHVkZXMoXCJib3R0b21cIikpXG4gICAgICB3aW5JbmRpY2F0b3JCb3R0b21MaW5lLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgd2luQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG5cbiAgICBkaXNhYmxlU3BpbigpO1xuICAgIGRpc2FibGVIb2xkcygpO1xuXG4gICAgaWYgKGN1cnJlbnRUaW1lIC0gbm93ID4gMSkge1xuICAgICAgbm93ID0gY3VycmVudFRpbWU7XG4gICAgICBsZXQgc2tpcCA9IHRoaXMud2luQW1vdW50ID4gNTAwID8gMTAgOiAxO1xuICAgICAgdGhpcy5jdXJyZW50V2luRGlzcGxheSArPSBza2lwO1xuICAgICAgd2luLmN1cnJlbnRXaW4gPSB0aGlzLndpbkFtb3VudDtcbiAgICAgIHdpbi5yZW5kZXIoKTtcblxuICAgICAgaWYgKHRoaXMuY3VycmVudFdpbkRpc3BsYXkgLSB0aGlzLm9sZFdpbkRpc3BsYXkgPj0gdGhpcy53aW5BbW91bnQpIHtcbiAgICAgICAgLy8gRmluaXNoZWQgbG9vcGluZ1xuICAgICAgICBjcmVkaXRzLmFkZENyZWRpdCh0aGlzLndpbkFtb3VudCk7XG4gICAgICAgIGNyZWRpdHMucmVuZGVyKCk7XG4gICAgICAgIHRoaXMub2xkV2luRGlzcGxheSA9IHRoaXMuY3VycmVudFdpbkRpc3BsYXk7XG4gICAgICAgIHdpbi5yZXNldCgpO1xuICAgICAgICB3aW4ucmVuZGVyKCk7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcbiAgICAgICAgZW5hYmxlU3BpbigpO1xuICAgICAgICB3aW5Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgdmlld3BvcnRDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgd2luSW5kaWNhdG9yTGVmdC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICB3aW5JbmRpY2F0b3JSaWdodC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICB3aW5JbmRpY2F0b3JUb3BMaW5lLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIHdpbkluZGljYXRvckNlbnRyZUxpbmUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgd2luSW5kaWNhdG9yQm90dG9tTGluZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuXG4gICAgICAgIC8vIENoZWNrIGNyZWRpdHNcbiAgICAgICAgaWYgKGNyZWRpdHMuY3JlZGl0c1JlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5nYW1lT3ZlcjtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvLyBHYW1lIG92ZXIgLSBjcmVkaXRzIHJhbiBvdXRcbiAgZ2FtZU92ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG4gICAgZGlzYWJsZVNwaW4oKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChwbGF5U2VjdGlvbik7XG5cbiAgICAgIGRpc2FibGVOdWRnZXMoKTtcbiAgICAgIGRpc2FibGVIb2xkcygpO1xuXG4gICAgICByZW5kZXJHYW1lT3ZlclNlY3Rpb24oKTtcblxuICAgICAgdGhpcy53aW5BbW91bnQgPSAwO1xuICAgICAgdGhpcy5vbGRXaW5EaXNwbGF5ID0gMDtcbiAgICAgIHRoaXMuY3VycmVudFdpbkRpc3BsYXkgPSAwO1xuICAgIH0sIDEwMDApO1xuICB9LFxufTtcblxuY29uc3QgcmVuZGVyR2FtZU92ZXJTZWN0aW9uID0gKCkgPT4ge1xuICBjb25zdCBnYW1lT3ZlclNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBnYW1lT3ZlclNlY3Rpb24uaWQgPSBcImdhbWVPdmVyU2VjdGlvblwiO1xuXG4gIGdhbWVPdmVyU2VjdGlvbi5pbm5lckhUTUwgPSBcIjxkaXY+XCI7XG4gIGdhbWVPdmVyU2VjdGlvbi5pbm5lckhUTUwgKz0gXCI8cD5HYW1lIG92ZXI8L3A+XCI7XG4gIGdhbWVPdmVyU2VjdGlvbi5pbm5lckhUTUwgKz0gXCI8cD5Zb3Ugd29uIFwiICsgd2luLmN1cnJlbnRXaW4gKyBcIiBjcmVkaXRzXCI7XG4gIGdhbWVPdmVyU2VjdGlvbi5pbm5lckhUTUwgKz0gXCI8cD5QcmVzcyBzdGFydCB0byBwbGF5IGFnYWluPC9wPlwiO1xuICBnYW1lT3ZlclNlY3Rpb24uaW5uZXJIVE1MICs9IFwiPC9kaXY+XCI7XG5cbiAgY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBzdGFydEJ1dHRvbi5pZCA9IFwic3RhcnRCdXR0b25cIjtcbiAgc3RhcnRCdXR0b24uY2xhc3NMaXN0LmFkZChcImJ1dHRvblwiKTtcbiAgc3RhcnRCdXR0b24uaW5uZXJUZXh0ID0gXCJTVEFSVFwiO1xuXG4gIGdhbWVPdmVyU2VjdGlvbi5hcHBlbmRDaGlsZChzdGFydEJ1dHRvbik7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChnYW1lT3ZlclNlY3Rpb24pO1xuXG4gIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChnYW1lT3ZlclNlY3Rpb24pO1xuXG4gICAgcGxheVNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHBsYXlTZWN0aW9uLmlkID0gXCJwbGF5U2VjdGlvblwiO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocGxheVNlY3Rpb24pO1xuXG4gICAgaW5pdCgpO1xuICB9KTtcbn07XG5cbi8vIFByZWxvYWQgaW1hZ2VzIHRoZW4gc3RhcnQgZ2FtZVxudmFyIGxvYWRlZCA9IDA7XG52YXIgaW1hZ2VMaXN0ID0gW107XG5sZXQgaW1nO1xuXG5JVEVNX0lORk8uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgaW1nLnNyYyA9IFwiLi9pbWcvXCIgKyBpdGVtLmltYWdlU3JjO1xuICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgIGxvYWRlZCsrO1xuICAgIGlmIChsb2FkZWQgPT09IElURU1fSU5GTy5sZW5ndGgpIGluaXQoKTtcbiAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgdmlld3BvcnQgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3Vmlld3BvcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBuZXdWaWV3cG9ydC53aWR0aCA9IFZJRVdQT1JUX1dJRFRIO1xuICAgIG5ld1ZpZXdwb3J0LmhlaWdodCA9IFZJRVdQT1JUX0hFSUdIVDtcbiAgICBuZXdWaWV3cG9ydC5pZCA9IFwidmlld3BvcnRcIjtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHZpZXdwb3J0OiBuZXdWaWV3cG9ydCxcbiAgICAgICAgd2lkdGg6IFZJRVdQT1JUX1dJRFRILFxuICAgICAgICBoZWlnaHQ6IFZJRVdQT1JUX0hFSUdIVCxcbiAgICAgICAgY3R4OiBuZXdWaWV3cG9ydC5nZXRDb250ZXh0KCcyZCcpLFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHZpZXdwb3J0Q29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXdwb3J0Q29udGFpbmVyJyk7XG4gICAgICAgICAgICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnZpZXdwb3J0KTtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCB2aWV3cG9ydDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvbXBvbmVudHMvdmlld3BvcnQuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCByZWVsIGZyb20gXCIuL3JlZWxcIjtcblxuY29uc3QgcmVlbHMgPSAoKSA9PiB7XG4gIGxldCBuZXdSZWVsO1xuICByZXR1cm4ge1xuICAgIHJlZWxMaXN0OiBbXSxcbiAgICBidWlsZDogZnVuY3Rpb24gKCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOT19SRUVMUzsgaSsrKSB7XG4gICAgICAgIG5ld1JlZWwgPSByZWVsKGkpO1xuICAgICAgICBuZXdSZWVsLmJ1aWxkKCk7XG4gICAgICAgIHRoaXMucmVlbExpc3QucHVzaChuZXdSZWVsKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgICAgICBpZiAocmVlbC5ydW5UaW1lID4gMCAmJiAhcmVlbC5pc0hlbGQpIHtcbiAgICAgICAgICByZWVsLm1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgICByZXNldFJ1bnRpbWVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcbiAgICAgICAgcmVlbC5yZXNldFJ1bnRpbWUoKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcbiAgICAgICAgcmVlbC5yZW5kZXIoKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZWVscztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy9yZWVscy5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCByZWVsSXRlbSBmcm9tIFwiLi9yZWVsSXRlbVwiO1xuXG5jb25zdCBtb3ZlQXJyYXlJdGVtVG9OZXdJbmRleCA9IChhcnIsIG9sZF9pbmRleCwgbmV3X2luZGV4KSA9PiB7XG4gIHdoaWxlIChvbGRfaW5kZXggPCAwKSB7XG4gICAgb2xkX2luZGV4ICs9IGFyci5sZW5ndGg7XG4gIH1cbiAgd2hpbGUgKG5ld19pbmRleCA8IDApIHtcbiAgICBuZXdfaW5kZXggKz0gYXJyLmxlbmd0aDtcbiAgfVxuICBpZiAobmV3X2luZGV4ID49IGFyci5sZW5ndGgpIHtcbiAgICB2YXIgayA9IG5ld19pbmRleCAtIGFyci5sZW5ndGggKyAxO1xuICAgIHdoaWxlIChrLS0pIHtcbiAgICAgIGFyci5wdXNoKHVuZGVmaW5lZCk7XG4gICAgfVxuICB9XG4gIGFyci5zcGxpY2UobmV3X2luZGV4LCAwLCBhcnIuc3BsaWNlKG9sZF9pbmRleCwgMSlbMF0pO1xuICBjb25zb2xlLmxvZyhcIk5FVyBBUlJcIiwgYXJyKTtcbn07XG5cbmNvbnN0IHJlZWwgPSAocmVlbE5vKSA9PiB7XG4gIGxldCBmaXJzdEl0ZW07XG4gIGxldCBsYXN0SXRlbTtcbiAgbGV0IG51ZGdlQ2FsbFRpbWVzO1xuXG4gIGNvbnN0IFNFTEVDVF9HQU1FX01PREUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWUtbW9kZVwiKTtcbiAgY29uc3QgU0VMRUNUX0lURU1fU0VMRUNUT1IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIml0ZW0tc2VsZWN0b3JcIik7XG4gIGNvbnN0IFNFTEVDVF9ST1dfU0VMRUNUT1IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvdy1zZWxlY3RvclwiKTtcblxuICByZXR1cm4ge1xuICAgIG5vT2ZJdGVtczogTk9fSVRFTVMsXG4gICAgaXRlbUxpc3Q6IElURU1fTElTVCxcbiAgICByZWVsU3BlZWQ6IFJFRUxfU1BFRUQsXG4gICAgbnVkZ2VTcGVlZDogMTAsXG4gICAgcnVuVGltZTogUkVFTF9TUEVFRCAqIDEwICsgMjAgKiByZWVsTm8sIC8vIEFyYml0cmFyeSB2YWx1ZXMgZm9yIHRlc3RpbmdcbiAgICBjYW5Ib2xkOiBmYWxzZSxcbiAgICBpc0hlbGQ6IGZhbHNlLFxuICAgIGNhbk51ZGdlOiBmYWxzZSxcbiAgICBpc051ZGdpbmc6IGZhbHNlLFxuICAgIG51ZGdlRnJhbWVzOiBJVEVNX0hFSUdIVCAvIE5VREdFX1NQRUVELFxuICAgIG51ZGdlRnJhbWU6IDAsXG4gICAgcmVlbEl0ZW1zOiBbXSxcbiAgICByZWVsTm8sXG4gICAgYnVpbGQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBpdGVtTm8gPSAwO1xuICAgICAgbGV0IHR5cGU7XG4gICAgICBsZXQgaW5zdGFuY2VzO1xuICAgICAgbGV0IGltYWdlU3JjO1xuICAgICAgbGV0IHdpbkFtb3VudDtcbiAgICAgIGxldCB4O1xuICAgICAgbGV0IHk7XG4gICAgICBsZXQgbmV3UmVlbEl0ZW07XG5cbiAgICAgIElURU1fSU5GTy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICB0eXBlID0gaXRlbS50eXBlO1xuICAgICAgICBpbnN0YW5jZXMgPSBpdGVtLmluc3RhbmNlcztcbiAgICAgICAgaW1hZ2VTcmMgPSBpdGVtLmltYWdlU3JjO1xuICAgICAgICB3aW5BbW91bnQgPSBpdGVtLndpbkFtb3VudDtcblxuICAgICAgICAvLyBBZGQgcmVxdWlyZWQgbm8gb2YgaW5zdGFuY2VzIG9mIHRoaXMgaXRlbSB0byB0aGUgcmVlbEl0ZW1zIGFycmF5XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdGFuY2VzOyBpKyspIHtcbiAgICAgICAgICB4ID1cbiAgICAgICAgICAgIFZJRVdQT1JUX1ggKyB0aGlzLnJlZWxObyAqIFJFRUxfV0lEVEggKyB0aGlzLnJlZWxObyAqIFJFRUxfU1BBQ0lORztcblxuICAgICAgICAgIHkgPSBWSUVXUE9SVF9ZIC0gSVRFTV9IRUlHSFQgLSBJVEVNX0hFSUdIVCAqIGl0ZW1ObyAtIDEwMDtcblxuICAgICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgIGltZy5zcmMgPSBcIi4vaW1nL1wiICsgaXRlbS5pbWFnZVNyYztcblxuICAgICAgICAgIG5ld1JlZWxJdGVtID0gcmVlbEl0ZW0odHlwZSwgaXRlbU5vLCBpbWcsIHgsIHksIHdpbkFtb3VudCk7XG4gICAgICAgICAgdGhpcy5yZWVsSXRlbXMucHVzaChuZXdSZWVsSXRlbSk7XG4gICAgICAgICAgaXRlbU5vKys7XG4gICAgICAgICAgLy8gfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zaHVmZmxlKCk7XG4gICAgICB0aGlzLnJlc2V0Q29vcmRzKCk7XG4gICAgfSxcbiAgICBzaHVmZmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgcm5kO1xuICAgICAgbGV0IHRlbXA7XG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5yZWVsSXRlbXMubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICBybmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICAgICAgdGVtcCA9IHRoaXMucmVlbEl0ZW1zW2ldO1xuICAgICAgICB0aGlzLnJlZWxJdGVtc1tpXSA9IHRoaXMucmVlbEl0ZW1zW3JuZF07XG4gICAgICAgIHRoaXMucmVlbEl0ZW1zW3JuZF0gPSB0ZW1wO1xuICAgICAgfVxuICAgIH0sXG4gICAgbnVkZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucmVlbEl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5udWRnZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc2hpZnQoKTtcblxuICAgICAgdGhpcy5udWRnZUZyYW1lKys7XG5cbiAgICAgIGlmICh0aGlzLm51ZGdlRnJhbWUgPj0gdGhpcy5udWRnZUZyYW1lcykge1xuICAgICAgICB0aGlzLmlzTnVkZ2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm51ZGdlRnJhbWUgPSAwO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVzZXRDb29yZHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yZWVsSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5yZWVsSXRlbXNbaV0ueSA9XG4gICAgICAgICAgVklFV1BPUlRfWSArIFZJRVdQT1JUX0hFSUdIVCAtIElURU1fSEVJR0hUIC0gSVRFTV9IRUlHSFQgKiBpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVzZXRSdW50aW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNIZWxkKSB7XG4gICAgICAgIHRoaXMucnVuVGltZSA9IFJFRUxfU1BFRUQgKiAxMCArIDIwICogcmVlbE5vOyAvLyBBcmJpdHJhcnkgdmFsdWVzIGZvciB0ZXN0aW5nO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2hpZnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIElmIGJvdHRvbSByZWVsIGl0ZW0gZ2V0cyBiZWxvdyBib3R0b20gb2Ygdmlld3BvcnQgdGhlbiBtb3ZlIGl0IHRvIGJlZ2lubmluZyBvZiBhcnJheVxuICAgICAgaWYgKHRoaXMucmVlbEl0ZW1zWzBdLnkgPj0gVklFV1BPUlRfWSArIFZJRVdQT1JUX0hFSUdIVCkge1xuICAgICAgICBmaXJzdEl0ZW0gPSB0aGlzLnJlZWxJdGVtc1swXTtcbiAgICAgICAgbGFzdEl0ZW0gPSB0aGlzLnJlZWxJdGVtc1t0aGlzLnJlZWxJdGVtcy5sZW5ndGggLSAxXTtcblxuICAgICAgICAvLyBSZXN0IHkgY29vcmRzIGZvciBpdGVtIHRvIHNoaWZ0IHRvIHRvcCBvZiByZWVsXG4gICAgICAgIGZpcnN0SXRlbS55ID0gbGFzdEl0ZW0ueSAtIElURU1fSEVJR0hUO1xuXG4gICAgICAgIC8vIFNoaWZ0IGJvdHRvbSBpdGVtIHRvIHRvcFxuICAgICAgICB0aGlzLnJlZWxJdGVtcy5wdXNoKHRoaXMucmVlbEl0ZW1zLnNoaWZ0KCkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5yZWVsSXRlbXMuZm9yRWFjaCgocmVlbEl0ZW0pID0+IHtcbiAgICAgICAgcmVlbEl0ZW0ubW92ZSgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnNoaWZ0KCk7XG4gICAgICAvLyBSZWR1Y2UgcmVlbCBydW50aW1lXG4gICAgICB0aGlzLnJ1blRpbWUtLTtcbiAgICAgIGlmIChTRUxFQ1RfR0FNRV9NT0RFLnZhbHVlID09PSBcImZpeGVkXCIgJiYgdGhpcy5ydW5UaW1lID09PSAwKSB7XG4gICAgICAgIGxldCBwcmV2SW5kZXggPSB0aGlzLnJlZWxJdGVtcy5maW5kSW5kZXgoXG4gICAgICAgICAgKGl0ZW0pID0+XG4gICAgICAgICAgICBwYXJzZUludChpdGVtLml0ZW1ObykgPT09IHBhcnNlSW50KFNFTEVDVF9JVEVNX1NFTEVDVE9SLnZhbHVlKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBtYXBSb3dUb1N0cmluZyA9IHtcbiAgICAgICAgICB0b3A6IDIsXG4gICAgICAgICAgbWlkZGxlOiAxLFxuICAgICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IG5leHRJbmRleCA9IG1hcFJvd1RvU3RyaW5nW1NFTEVDVF9ST1dfU0VMRUNUT1IudmFsdWVdO1xuICAgICAgICBpZiAocHJldkluZGV4ICE9PSBuZXh0SW5kZXgpIHtcbiAgICAgICAgICBtb3ZlQXJyYXlJdGVtVG9OZXdJbmRleCh0aGlzLnJlZWxJdGVtcywgcHJldkluZGV4LCBuZXh0SW5kZXgpO1xuICAgICAgICAgIHRoaXMucmVzZXRDb29yZHMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnJlZWxJdGVtcy5mb3JFYWNoKChyZWVsSXRlbSkgPT4ge1xuICAgICAgICByZWVsSXRlbS5yZW5kZXIoKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZWVsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL3JlZWwuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCByZWVsSXRlbSA9ICh0eXBlLCBpdGVtTm8sIGltZywgeCwgeSwgd2luQW1vdW50KSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZSxcbiAgICBpdGVtTm8sXG4gICAgaW1nLFxuICAgIHgsXG4gICAgeSxcbiAgICB3aW5BbW91bnQsXG4gICAgc3BlZWQ6IFJFRUxfU1BFRUQsXG4gICAgbnVkZ2VTcGVlZDogTlVER0VfU1BFRUQsXG4gICAgY3R4OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZXdwb3J0XCIpLmdldENvbnRleHQoXCIyZFwiKSxcbiAgICBtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnkgKz0gdGhpcy5zcGVlZDtcbiAgICB9LFxuICAgIG51ZGdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnkgKz0gdGhpcy5udWRnZVNwZWVkO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoXG4gICAgICAgIHRoaXMuaW1nLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBJVEVNX1dJRFRILFxuICAgICAgICBJVEVNX0hFSUdIVCxcbiAgICAgICAgdGhpcy54LFxuICAgICAgICB0aGlzLnksXG4gICAgICAgIElURU1fV0lEVEgsXG4gICAgICAgIElURU1fSEVJR0hUXG4gICAgICApO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZWVsSXRlbTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy9yZWVsSXRlbS5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBkaWdpdHMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGlnaXRzU3RyaW5nOiBudWxsLFxuICAgICAgICBjb250YWluZXI6IG51bGwsIC8vIENvbnRhaW5lciB0aGF0IGhvbGRzIGRpZ2l0Q29udGFpbmVyc1xuICAgICAgICBkaWdpdENvbnRhaW5lcnM6IG51bGwsIC8vIExpc3Qgb2YgZGlnaXQgY29udGFpbmVycyB0aGF0IGhvbGQgc2luZ2xlIGRpZ2l0IGVhY2hcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyAvLyBTcGxpdCBudW1iZXIgaW50byBzZXBlcmF0ZSBjaGFyYWN0ZXJzXG4gICAgICAgICAgICB0aGlzLmRpZ2l0Q29udGFpbmVycyA9IHRoaXMuY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RpZ2l0LW51bWJlcicpOyBcbiAgICAgICAgICAgIGxldCBkaWdpdEluZGV4OyAvLyBXaGljaCBkaWdpdCBjb250YWluZXIgdG8gcHV0IG51bWJlciBpblxuXG4gICAgICAgICAgICAvLyBXaXBlIHRoZSBkaWdpdHNcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kaWdpdENvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpZ2l0Q29udGFpbmVyc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpZ2l0Q29udGFpbmVyc1tpXS5pbm5lckhUTUwgPSAnOCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFBvcHVsYXRlIHRoZSBkaWdpdHNcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kaWdpdHNTdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBkaWdpdEluZGV4ID0gKHRoaXMuZGlnaXRDb250YWluZXJzLmxlbmd0aCkgLSAodGhpcy5kaWdpdHNTdHJpbmcubGVuZ3RoIC0gaSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWdpdENvbnRhaW5lcnNbZGlnaXRJbmRleF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWdpdENvbnRhaW5lcnNbZGlnaXRJbmRleF0uaW5uZXJIVE1MID0gdGhpcy5kaWdpdHNTdHJpbmdbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGlnaXRzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy9kaWdpdHMuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgZGlnaXRzIGZyb20gXCIuL2RpZ2l0c1wiO1xuXG5jb25zdCBjcmVkaXRzID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGNyZWRpdHNSZW1haW5pbmc6IENSRURJVFMsXG4gICAgZGlnaXRzOiBkaWdpdHMoKSxcbiAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3JlZGl0c1wiKSxcbiAgICBhZGRDcmVkaXQ6IGZ1bmN0aW9uIChhbW91bnQpIHtcbiAgICAgIHRoaXMuY3JlZGl0c1JlbWFpbmluZyArPSBhbW91bnQ7XG4gICAgfSxcbiAgICB1c2VDcmVkaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuY3JlZGl0c1JlbWFpbmluZy0tO1xuICAgIH0sXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuY3JlZGl0c1JlbWFpbmluZyA9IENSRURJVFM7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZGlnaXRzLmRpZ2l0c1N0cmluZyA9IHRoaXMuY3JlZGl0c1JlbWFpbmluZy50b1N0cmluZygpO1xuICAgICAgdGhpcy5kaWdpdHMuY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICB0aGlzLmRpZ2l0cy5yZW5kZXIoKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlZGl0cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy9jcmVkaXRzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGRpZ2l0cyBmcm9tIFwiLi9kaWdpdHNcIjtcblxuY29uc3Qgd2luID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGN1cnJlbnRXaW46IDAsXG4gICAgZGlnaXRzOiBkaWdpdHMoKSxcbiAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luXCIpLFxuICAgIGFkZFdpbjogZnVuY3Rpb24gKHdpbkFtb3VudCkge1xuICAgICAgdGhpcy5jdXJyZW50V2luID0gd2luQW1vdW50O1xuICAgIH0sXG4gICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuY3VycmVudFdpbiA9IDA7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZGlnaXRzLmRpZ2l0c1N0cmluZyA9IHRoaXMuY3VycmVudFdpbi50b1N0cmluZygpO1xuICAgICAgdGhpcy5kaWdpdHMuY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICB0aGlzLmRpZ2l0cy5yZW5kZXIoKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgd2luO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL3dpbi5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgaG9sZEJ1dHRvbiBmcm9tICcuL2hvbGRCdXR0b24nO1xuXG5jb25zdCBob2xkQnV0dG9ucyA9ICgpID0+IHtcbiAgICBsZXQgbmV3QnV0dG9uO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYnV0dG9uTGlzdDogW10sXG4gICAgICAgIGJ1aWxkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5PX1JFRUxTOyBpKyspIHtcbiAgICAgICAgICAgICAgICBuZXdCdXR0b24gPSBob2xkQnV0dG9uKGkpO1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uTGlzdC5wdXNoKG5ld0J1dHRvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5idXR0b25MaXN0LmZvckVhY2goKGJ0biwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBidG4ucmVuZGVyKGluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGhvbGRCdXR0b25zO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy9ob2xkQnV0dG9ucy5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBob2xkQnV0dG9uID0gKGluZGV4KSA9PiB7XG4gICAgbGV0IGhvbGRCdXR0b247XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob2xkQnV0dG9ucycpLFxuICAgICAgICByZWVsTm86IGluZGV4LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGhvbGRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGhvbGRCdXR0b24uaW5uZXJIVE1MID0gJ0hPTEQnO1xuICAgICAgICAgICAgaG9sZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdob2xkLWJ1dHRvbicsICdidXR0b24nKTtcbiAgICAgICAgICAgIGhvbGRCdXR0b24uc3R5bGUud2lkdGggPSBCVVRUT05fV0lEVEggKyAncHgnO1xuICAgICAgICAgICAgaG9sZEJ1dHRvbi5zdHlsZS5tYXJnaW5MZWZ0ID0gKFJFRUxfU1BBQ0lORyAvIDIpICsgKChSRUVMX1dJRFRIIC0gQlVUVE9OX1dJRFRIKSAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIGhvbGRCdXR0b24uc3R5bGUubWFyZ2luUmlnaHQgPSAoUkVFTF9TUEFDSU5HIC8gMikgKyAoKFJFRUxfV0lEVEggLSBCVVRUT05fV0lEVEgpIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoaG9sZEJ1dHRvbik7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaG9sZEJ1dHRvbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvbXBvbmVudHMvaG9sZEJ1dHRvbi5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgbnVkZ2VCdXR0b24gZnJvbSAnLi9udWRnZUJ1dHRvbic7XG5cbmNvbnN0IG51ZGdlQnV0dG9ucyA9ICgpID0+IHtcbiAgICBsZXQgbmV3QnV0dG9uO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYnV0dG9uTGlzdDogW10sXG4gICAgICAgIGJ1aWxkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTk9fUkVFTFM7IGkrKykge1xuICAgICAgICAgICAgICAgIG5ld0J1dHRvbiA9IG51ZGdlQnV0dG9uKGkpO1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uTGlzdC5wdXNoKG5ld0J1dHRvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbkxpc3QuZm9yRWFjaCgoYnRuLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGJ0bi5yZW5kZXIoaW5kZXgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbnVkZ2VCdXR0b25zO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy9udWRnZUJ1dHRvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbnVkZ2VCdXR0b24gPSAoaW5kZXgpID0+IHtcbiAgICBsZXQgbnVkZ2VCdXR0b247XG4gICAgbGV0IG51ZGdlQnV0dG9uQ29udGFpbmVyO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbnVkZ2VCdXR0b25zJyksXG4gICAgICAgIHJlZWxObzogaW5kZXgsXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbnVkZ2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uLmlubmVySFRNTCA9ICdOVURHRSc7XG4gICAgICAgICAgICBudWRnZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdudWRnZS1idXR0b24nLCAnYnV0dG9uJyk7XG4gICAgICAgICAgICBudWRnZUJ1dHRvbi5zdHlsZS53aWR0aCA9IEJVVFRPTl9XSURUSCArICdweCc7XG4gICAgICAgICAgICBudWRnZUJ1dHRvbi5zdHlsZS5tYXJnaW5MZWZ0ID0gKFJFRUxfU1BBQ0lORyAvIDIpICsgKChSRUVMX1dJRFRIIC0gQlVUVE9OX1dJRFRIKSAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uLnN0eWxlLm1hcmdpblJpZ2h0ID0gKFJFRUxfU1BBQ0lORyAvIDIpICsgKChSRUVMX1dJRFRIIC0gQlVUVE9OX1dJRFRIKSAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKG51ZGdlQnV0dG9uKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBudWRnZUJ1dHRvbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvbXBvbmVudHMvbnVkZ2VCdXR0b24uanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGRpZ2l0cyBmcm9tICcuL2RpZ2l0cyc7XG5cbmNvbnN0IG51ZGdlcyA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBudWRnZXNSZW1haW5pbmc6IDAsXG4gICAgICAgIGRpZ2l0czogZGlnaXRzKCksXG4gICAgICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ251ZGdlcycpLFxuICAgICAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLm51ZGdlc1JlbWFpbmluZyA9IDA7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5kaWdpdHMuZGlnaXRzU3RyaW5nID0gdGhpcy5udWRnZXNSZW1haW5pbmcudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLmNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgICAgICAgdGhpcy5kaWdpdHMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbnVkZ2VzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy9udWRnZXMuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=