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
  console.log("SPINRESULT", spinResult);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2FhMzc4OWEzYzY2MzU1ZThmNTkiLCJ3ZWJwYWNrOi8vLy4vanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL3ZpZXdwb3J0LmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvcmVlbHMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9yZWVsLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvcmVlbEl0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9kaWdpdHMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9jcmVkaXRzLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvd2luLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvaG9sZEJ1dHRvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9ob2xkQnV0dG9uLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvbnVkZ2VCdXR0b25zLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvbnVkZ2VCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9udWRnZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUEr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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1d0JZOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLGlF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QSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVlLDREQUFHLEVBQUM7Ozs7Ozs7O0FDdkJuQjtBQUFhOztBQUV5Qjs7QUFFdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsY0FBYztBQUN6Qyw0QkFBNEIsb0VBQVU7QUFDdEM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVlLG9FQUFXLEU7Ozs7Ozs7QUN2QmI7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLG1FQUFVLEU7Ozs7Ozs7QUNwQnpCO0FBQWE7O0FBRTJCOztBQUV4QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixjQUFjO0FBQ3pDLDRCQUE0QixxRUFBVztBQUN2QztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRWUscUVBQVksRTs7Ozs7OztBQ3ZCZDs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSxvRUFBVyxFOzs7Ozs7O0FDckIxQjtBQUFhOztBQUVpQjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGdFQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLCtEQUFNLEUiLCJmaWxlIjoiLi9qcy9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3YWEzNzg5YTNjNjYzNTVlOGY1OSIsImltcG9ydCBWaWV3cG9ydCBmcm9tIFwiLi9jb21wb25lbnRzL3ZpZXdwb3J0XCI7XG5pbXBvcnQgUmVlbHMgZnJvbSBcIi4vY29tcG9uZW50cy9yZWVsc1wiO1xuaW1wb3J0IE51ZGdlQnV0dG9ucyBmcm9tIFwiLi9jb21wb25lbnRzL251ZGdlQnV0dG9uc1wiO1xuaW1wb3J0IEhvbGRCdXR0b25zIGZyb20gXCIuL2NvbXBvbmVudHMvaG9sZEJ1dHRvbnNcIjtcbmltcG9ydCBDcmVkaXRzIGZyb20gXCIuL2NvbXBvbmVudHMvY3JlZGl0c1wiO1xuaW1wb3J0IFdpbiBmcm9tIFwiLi9jb21wb25lbnRzL3dpblwiO1xuaW1wb3J0IE51ZGdlcyBmcm9tIFwiLi9jb21wb25lbnRzL251ZGdlc1wiO1xuXG4vLyBTYXNzXG5pbXBvcnQgXCIuLi9zY3NzL2FwcC5zY3NzXCI7XG5cbi8vIGNyZWF0ZXMgdGhlIGNhbnZhcyB3aGljaCB3ZSBuZWVkIHRvIGRyYXcgdXBvbiBhbmQgYXNzaWducyB0byBhIHZpZXdwb3J0IHZhcmlhYmxlXG5jb25zdCB2aWV3cG9ydCA9IFZpZXdwb3J0KCk7XG4vLyBjb25zdCBzcGluQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwaW5CdXR0b24nKTtcbmNvbnN0IHdpbkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2luXCIpO1xuY29uc3QgbnVkZ2VzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJudWRnZXNcIik7XG5sZXQgcGxheVNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlTZWN0aW9uXCIpO1xuY29uc3Qgc2VsZWN0X2dhbWVNb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lLW1vZGVcIik7XG5jb25zdCBkaXZfZml4ZWRNb2RlT3B0aW9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZml4ZWQtbW9kZS1vcHRpb25zXCIpO1xuXG5sZXQgdmlld3BvcnRDb250YWluZXI7XG5sZXQgbnVkZ2VCdXR0b25Db250YWluZXI7XG5sZXQgaG9sZEJ1dHRvbkNvbnRhaW5lcjtcbmxldCB3aW5JbmRpY2F0b3JMZWZ0O1xubGV0IHdpbkluZGljYXRvclJpZ2h0O1xubGV0IHdpbkluZGljYXRvclRvcExpbmU7XG5sZXQgd2luSW5kaWNhdG9yQ2VudHJlTGluZTtcbmxldCB3aW5JbmRpY2F0b3JCb3R0b21MaW5lO1xubGV0IHNwaW5CdXR0b247XG5sZXQgcmVlbHM7XG5sZXQgbnVkZ2VzO1xubGV0IG51ZGdlQnV0dG9ucztcbmxldCBob2xkQnV0dG9ucztcbmxldCBudWRnZUJ1dHRvbkxpc3Q7XG5sZXQgaG9sZEJ1dHRvbkxpc3Q7XG5sZXQgY3JlZGl0cztcbmxldCB3aW47XG5sZXQgd2lubmluZ1Jvd3MgPSBbXTtcbmxldCBnYW1lTG9vcDtcbmxldCBudWRnZUNoYW5jZSA9IDI7IC8vIENoYW5jZSBvZiBnZXR0aW5nIG51ZGdlcyBhZnRlciBzcGluICgxIGluIG51ZGdlQ2hhbmNlKVxubGV0IGhvbGRDaGFuY2UgPSAyOyAvLyBDaGFuY2Ugb2YgZ2V0dGluZyBob2xkcyBhZnRlciBzcGluICgxIGluIGhvbGRDaGFuY2UpXG5sZXQgY2FuU3BpbjtcbmxldCBjYW5OdWRnZTtcbmxldCBjYW5Ib2xkO1xubGV0IG5vdzsgLy8gQ3VycmVudCB0aW1lIHRvIGNvbXBhcmUgYWdhaW5zdFxubGV0IHJlZWxzUnVubmluZyA9IFtdOyAvLyBLZWVwcyB0cmFjayBvZiBhbnkgcmVlbHMgd2l0aCBydW50aW1lIGxlZnQgb24gdGhlbSB0byBlc3RibGlzaCB3aGV0aGVyIHRvIHJlc2V0L3N0b3Agc3BpbiBldGMuXG5sZXQgc3BpblR5cGUgPSBcInNwaW5cIjsgLy8gS2VlcHMgdHJhY2sgb2Ygd2hldGhlciBsYXN0IHNwaW4gd2FzIHJlZ3VsYXIgc3BpbiBvciBudWRnZVxuXG5jb25zdCBpbml0ID0gKCkgPT4ge1xuICByZW5kZXJWaWV3cG9ydENvbnRhaW5lcigpO1xuXG4gIC8vIFJlbmRlciB2aWV3cG9ydFxuICB2aWV3cG9ydC5yZW5kZXIoKTtcblxuICAvLyBTZXQgdXAgcmVlbHNcbiAgcmVlbHMgPSBSZWVscygpO1xuICByZWVscy5idWlsZCgpO1xuICByZWVscy5yZW5kZXIoKTtcblxuICBsZXQgcmVlbENvbnRhaW5lcjtcbiAgbGV0IHJlZWxDb250YWluZXJYO1xuICBsZXQgcmVlbENvbnRhaW5lclk7XG4gIGxldCByZWVsQ29udGFpbmVyVztcbiAgbGV0IHJlZWxDb250YWluZXJIO1xuXG4gIHJlZWxzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcbiAgICAvLyBSZW5kZXIgb3V0ZXIgY29udGFpbmVyIGZvciBlYWNoIHJlZWwgaW4gdGhlIHZpZXdwb3J0IGNvbnRhaW5lclxuICAgIHJlZWxDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgcmVlbENvbnRhaW5lclggPVxuICAgICAgcmVlbC5yZWVsSXRlbXNbMF0ueCArXG4gICAgICBWSUVXUE9SVF9DT05UQUlORVJfUEFERElOR19YIC1cbiAgICAgIFJFRUxfQ09OVEFJTkVSX1BBRERJTkc7XG5cbiAgICByZWVsQ29udGFpbmVyWSA9XG4gICAgICByZWVsLnJlZWxJdGVtc1syXS55ICtcbiAgICAgIFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1kgLVxuICAgICAgUkVFTF9DT05UQUlORVJfUEFERElORztcblxuICAgIHJlZWxDb250YWluZXJXID0gUkVFTF9XSURUSCArIFJFRUxfQ09OVEFJTkVSX1BBRERJTkcgKiAyO1xuXG4gICAgcmVlbENvbnRhaW5lckggPSBWSUVXUE9SVF9IRUlHSFQgKyBSRUVMX0NPTlRBSU5FUl9QQURESU5HICogMjtcblxuICAgIHJlZWxDb250YWluZXIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgcmVlbENvbnRhaW5lci5zdHlsZS50b3AgPSByZWVsQ29udGFpbmVyWSArIFwicHhcIjtcbiAgICByZWVsQ29udGFpbmVyLnN0eWxlLmxlZnQgPSByZWVsQ29udGFpbmVyWCArIFwicHhcIjtcbiAgICByZWVsQ29udGFpbmVyLnN0eWxlLndpZHRoID0gcmVlbENvbnRhaW5lclcgKyBcInB4XCI7XG4gICAgcmVlbENvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSByZWVsQ29udGFpbmVySCArIFwicHhcIjtcbiAgICByZWVsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJyZWVsLWNvbnRhaW5lclwiKTtcbiAgICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZChyZWVsQ29udGFpbmVyKTtcbiAgfSk7XG5cbiAgcmVuZGVyV2luSW5kaWNhdG9ycygpO1xuXG4gIHJlbmRlck51ZGdlQnV0dG9uQ29udGFpbmVyKCk7XG5cbiAgLy8gU2V0IHVwIG51ZGdlIGJ1dHRvbnNcbiAgbnVkZ2VCdXR0b25zID0gTnVkZ2VCdXR0b25zKCk7XG4gIG51ZGdlQnV0dG9ucy5idWlsZCgpO1xuICBudWRnZUJ1dHRvbnMucmVuZGVyKCk7XG5cbiAgbnVkZ2VCdXR0b25MaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm51ZGdlLWJ1dHRvblwiKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG51ZGdlQnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIG51ZGdlQnV0dG9uTGlzdFtpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBjYW5TcGluICYmXG4gICAgICAgIGNhbk51ZGdlICYmXG4gICAgICAgIHJlZWxzLnJlZWxMaXN0W2ldLmNhbk51ZGdlID09PSB0cnVlICYmXG4gICAgICAgIG51ZGdlcy5udWRnZXNSZW1haW5pbmcgPiAwXG4gICAgICApIHtcbiAgICAgICAgc3BpblR5cGUgPSBcIm51ZGdlXCI7XG4gICAgICAgIG51ZGdlcy5udWRnZXNSZW1haW5pbmcgLT0gMTtcbiAgICAgICAgcmVlbHMucmVlbExpc3RbaV0uaXNOdWRnaW5nID0gdHJ1ZTtcbiAgICAgICAgZ2FtZUxvb3AgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgICAgIGdhbWVTdGF0ZXMuY3VycmVudFN0YXRlID0gZ2FtZVN0YXRlcy5udWRnZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNldCB1cCBudWRnZXNcbiAgbnVkZ2VzID0gTnVkZ2VzKCk7XG4gIG51ZGdlcy5yZW5kZXIoKTtcblxuICByZW5kZXJIb2xkQnV0dG9uQ29udGFpbmVyKCk7XG5cbiAgLy8gU2V0IHVwIGhvbGQgYnV0dG9uc1xuICBob2xkQnV0dG9ucyA9IEhvbGRCdXR0b25zKCk7XG4gIGhvbGRCdXR0b25zLmJ1aWxkKCk7XG4gIGhvbGRCdXR0b25zLnJlbmRlcigpO1xuXG4gIGhvbGRCdXR0b25MaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImhvbGQtYnV0dG9uXCIpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaG9sZEJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBob2xkQnV0dG9uTGlzdFtpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoY2FuU3BpbiAmJiBjYW5Ib2xkKSB7XG4gICAgICAgIC8vIFRvZ2dsZVxuICAgICAgICBpZiAocmVlbHMucmVlbExpc3RbaV0uaXNIZWxkKSB7XG4gICAgICAgICAgLy8gVGFrZSBob2xkIG9mZlxuICAgICAgICAgIHJlZWxzLnJlZWxMaXN0W2ldLmlzSGVsZCA9IGZhbHNlO1xuICAgICAgICAgIHJlZWxzLnJlZWxMaXN0W2ldLnJlc2V0UnVudGltZSgpO1xuICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiaGVsZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBQdXQgaG9sZCBvblxuICAgICAgICAgIHJlZWxzLnJlZWxMaXN0W2ldLmlzSGVsZCA9IHRydWU7XG4gICAgICAgICAgcmVlbHMucmVlbExpc3RbaV0ucnVuVGltZSA9IDA7XG4gICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJoZWxkXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBTZXQgdXAgY3JlZGl0c1xuICBjcmVkaXRzID0gQ3JlZGl0cygpO1xuICBjcmVkaXRzLnJlc2V0KCk7XG4gIGNyZWRpdHMucmVuZGVyKCk7XG5cbiAgLy8gU2V0IHVwIHdpblxuICB3aW4gPSBXaW4oKTtcbiAgd2luLnJlc2V0KCk7XG4gIHdpbi5yZW5kZXIoKTtcblxuICByZW5kZXJTcGluQnV0dG9uKCk7XG5cbiAgY2FuU3BpbiA9IHRydWU7XG4gIGNhbk51ZGdlID0gZmFsc2U7XG4gIGNhbkhvbGQgPSBmYWxzZTtcblxuICBlbmFibGVTcGluKCk7XG5cbiAgc3BpbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGlmIChjYW5TcGluKSB7XG4gICAgICBjcmVkaXRzLnVzZUNyZWRpdCgpO1xuICAgICAgY3JlZGl0cy5yZW5kZXIoKTtcbiAgICAgIHdpbm5pbmdSb3dzID0gW107XG4gICAgICBkaXNhYmxlTnVkZ2VzKCk7XG4gICAgICBkaXNhYmxlU3BpbigpO1xuXG4gICAgICAvLyBEaXNhYmxlIGhvbGQgYnV0dG9ucyB0aGF0IGFyZW4ndCBoZWxkXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlZWxzLnJlZWxMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghcmVlbHMucmVlbExpc3RbaV0uaXNIZWxkKSB7XG4gICAgICAgICAgcmVlbHMucmVlbExpc3RbaV0uY2FuSG9sZCA9IGZhbHNlO1xuICAgICAgICAgIGhvbGRCdXR0b25MaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3BpblR5cGUgPSBcInNwaW5cIjtcbiAgICAgIGdhbWVTdGF0ZXMuY3VycmVudFN0YXRlID0gZ2FtZVN0YXRlcy5zcGluO1xuICAgICAgZ2FtZUxvb3AgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgICBnYW1lU3RhdGVzLmN1cnJlbnRTdGF0ZSgpO1xuICAgIH1cbiAgfSk7XG4gIHNlbGVjdF9nYW1lTW9kZS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgaWYgKHRoaXMudmFsdWUgPT09IFwiZml4ZWRcIikge1xuICAgICAgZGl2X2ZpeGVkTW9kZU9wdGlvbnMuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudmFsdWUgPT09IFwicmFuZG9tXCIpIHtcbiAgICAgIGRpdl9maXhlZE1vZGVPcHRpb25zLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHJlbmRlck51ZGdlQnV0dG9uQ29udGFpbmVyID0gKCkgPT4ge1xuICBudWRnZUJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG51ZGdlQnV0dG9uQ29udGFpbmVyLmlkID0gXCJudWRnZUJ1dHRvbnNcIjtcbiAgcGxheVNlY3Rpb24uYXBwZW5kQ2hpbGQobnVkZ2VCdXR0b25Db250YWluZXIpO1xufTtcblxuY29uc3QgcmVuZGVySG9sZEJ1dHRvbkNvbnRhaW5lciA9ICgpID0+IHtcbiAgaG9sZEJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGhvbGRCdXR0b25Db250YWluZXIuaWQgPSBcImhvbGRCdXR0b25zXCI7XG4gIHBsYXlTZWN0aW9uLmFwcGVuZENoaWxkKGhvbGRCdXR0b25Db250YWluZXIpO1xufTtcblxuY29uc3QgcmVuZGVyU3BpbkJ1dHRvbiA9ICgpID0+IHtcbiAgc3BpbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHNwaW5CdXR0b24uaWQgPSBcInNwaW5CdXR0b25cIjtcbiAgc3BpbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uXCIpO1xuICBzcGluQnV0dG9uLmlubmVySFRNTCA9IFwiU1BJTlwiO1xuICBwbGF5U2VjdGlvbi5hcHBlbmRDaGlsZChzcGluQnV0dG9uKTtcbn07XG5cbmNvbnN0IHJlbmRlclZpZXdwb3J0Q29udGFpbmVyID0gKCkgPT4ge1xuICAvLyBSZW5kZXIgdmlld3BvcnQgY29udGFpbmVyXG4gIHZpZXdwb3J0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdmlld3BvcnRDb250YWluZXIuaWQgPSBcInZpZXdwb3J0Q29udGFpbmVyXCI7XG4gIHZpZXdwb3J0Q29udGFpbmVyLnN0eWxlLnBhZGRpbmdMZWZ0ID0gVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWCArIFwicHhcIjtcbiAgdmlld3BvcnRDb250YWluZXIuc3R5bGUucGFkZGluZ1JpZ2h0ID0gVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWCArIFwicHhcIjtcbiAgdmlld3BvcnRDb250YWluZXIuc3R5bGUucGFkZGluZ1RvcCA9IFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1kgKyBcInB4XCI7XG4gIHZpZXdwb3J0Q29udGFpbmVyLnN0eWxlLnBhZGRpbmdCb3R0b20gPSBWSUVXUE9SVF9DT05UQUlORVJfUEFERElOR19ZICsgXCJweFwiO1xuICBwbGF5U2VjdGlvbi5hcHBlbmRDaGlsZCh2aWV3cG9ydENvbnRhaW5lcik7XG59O1xuXG5jb25zdCByZW5kZXJXaW5JbmRpY2F0b3JzID0gKCkgPT4ge1xuICAvLyBMZWZ0IGluZGljYXRvclxuICB3aW5JbmRpY2F0b3JMZWZ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIHdpbkluZGljYXRvckxlZnQuY2xhc3NMaXN0LmFkZChcIndpbi1pbmRpY2F0b3JcIiwgXCJsZWZ0XCIpO1xuICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZCh3aW5JbmRpY2F0b3JMZWZ0KTtcbiAgLy8gUmlnaHQgaW5kaWNhdG9yXG4gIHdpbkluZGljYXRvclJpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIHdpbkluZGljYXRvclJpZ2h0LmNsYXNzTGlzdC5hZGQoXCJ3aW4taW5kaWNhdG9yXCIsIFwicmlnaHRcIik7XG4gIHZpZXdwb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHdpbkluZGljYXRvclJpZ2h0KTtcblxuICAvLyBDZW50cmUgbGluZVxuICB3aW5JbmRpY2F0b3JDZW50cmVMaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgd2luSW5kaWNhdG9yQ2VudHJlTGluZS5jbGFzc0xpc3QuYWRkKFwid2luLWluZGljYXRvci1jZW50cmUtbGluZVwiKTtcblxuICB3aW5JbmRpY2F0b3JDZW50cmVMaW5lLnN0eWxlLmxlZnQgPSB3aW5JbmRpY2F0b3JMZWZ0Lm9mZnNldFdpZHRoICsgXCJweFwiO1xuXG4gIHdpbkluZGljYXRvckNlbnRyZUxpbmUuc3R5bGUud2lkdGggPVxuICAgIHZpZXdwb3J0Q29udGFpbmVyLm9mZnNldFdpZHRoIC1cbiAgICB3aW5JbmRpY2F0b3JMZWZ0Lm9mZnNldFdpZHRoIC1cbiAgICB3aW5JbmRpY2F0b3JSaWdodC5vZmZzZXRXaWR0aCArXG4gICAgXCJweFwiO1xuXG4gIHZpZXdwb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHdpbkluZGljYXRvckNlbnRyZUxpbmUpO1xuXG4gIC8vIFRvcCBsaW5lXG4gIHdpbkluZGljYXRvclRvcExpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB3aW5JbmRpY2F0b3JUb3BMaW5lLmNsYXNzTGlzdC5hZGQoXCJ3aW4taW5kaWNhdG9yLXRvcC1saW5lXCIpO1xuXG4gIHdpbkluZGljYXRvclRvcExpbmUuc3R5bGUubGVmdCA9IHdpbkluZGljYXRvckxlZnQub2Zmc2V0V2lkdGggKyBcInB4XCI7XG5cbiAgd2luSW5kaWNhdG9yVG9wTGluZS5zdHlsZS53aWR0aCA9XG4gICAgdmlld3BvcnRDb250YWluZXIub2Zmc2V0V2lkdGggLVxuICAgIHdpbkluZGljYXRvckxlZnQub2Zmc2V0V2lkdGggLVxuICAgIHdpbkluZGljYXRvclJpZ2h0Lm9mZnNldFdpZHRoICtcbiAgICBcInB4XCI7XG5cbiAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQod2luSW5kaWNhdG9yVG9wTGluZSk7XG5cbiAgLy8gQm90dG9tIGxpbmVcbiAgd2luSW5kaWNhdG9yQm90dG9tTGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHdpbkluZGljYXRvckJvdHRvbUxpbmUuY2xhc3NMaXN0LmFkZChcIndpbi1pbmRpY2F0b3ItYm90dG9tLWxpbmVcIik7XG5cbiAgd2luSW5kaWNhdG9yQm90dG9tTGluZS5zdHlsZS5sZWZ0ID0gd2luSW5kaWNhdG9yTGVmdC5vZmZzZXRXaWR0aCArIFwicHhcIjtcblxuICB3aW5JbmRpY2F0b3JCb3R0b21MaW5lLnN0eWxlLndpZHRoID1cbiAgICB2aWV3cG9ydENvbnRhaW5lci5vZmZzZXRXaWR0aCAtXG4gICAgd2luSW5kaWNhdG9yTGVmdC5vZmZzZXRXaWR0aCAtXG4gICAgd2luSW5kaWNhdG9yUmlnaHQub2Zmc2V0V2lkdGggK1xuICAgIFwicHhcIjtcblxuICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZCh3aW5JbmRpY2F0b3JCb3R0b21MaW5lKTtcbn07XG5cbmNvbnN0IGxvb3AgPSAoY3VycmVudFRpbWUpID0+IHtcbiAgZ2FtZUxvb3AgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7IC8vIE5lZWRzIHRvIGdvIGJlZm9yZSBsaW5lIGJlbG93IHRvIGtlZXAgYW5pbWF0aW9uZnJhbWVpZCB1cCB0byBkYXRlXG4gIGdhbWVTdGF0ZXMuY3VycmVudFN0YXRlKGN1cnJlbnRUaW1lKTtcbn07XG5cbmNvbnN0IG1vdmVSZWVscyA9ICgpID0+IHtcbiAgcmVlbHMubW92ZSgpO1xufTtcblxuY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuICB2aWV3cG9ydC5jbGVhcigpO1xuICByZWVscy5yZW5kZXIoKTtcblxuICAvLyBEaWdpdHNcbiAgbnVkZ2VzLnJlbmRlcigpO1xuICBjcmVkaXRzLnJlbmRlcigpO1xuICB3aW4ucmVuZGVyKCk7XG59O1xuXG4vLyBDYWxjdWxhdGVzIHdpbiBhbW91bnQsIGlmIHdpbm5pbmcgbGluZVxuY29uc3QgY2hlY2tXaW4gPSAoKSA9PiB7XG4gIGxldCBzcGluUmVzdWx0ID0gW107IC8vIEFycmF5IG9mIHJlZWwgcmVzdWx0cyBhZnRlciBzcGluIChhbGwgdGhyZWUgdmlzaWJsZSBvYmplY3RzIG9mIGVhY2ggcmVlbClcbiAgbGV0IHJlZWxSZXN1bHQ7IC8vIEluZGl2aWR1YWwgcmVlbCByZXN1bHQsIG1hZGUgb2YgdGhyZWUgb2JqZWN0cyAodmlzaWJsZSlcblxuICAvLyBDaGVjayBmb3Igd2luXG4gIHJlZWxzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwsIGluZGV4KSA9PiB7XG4gICAgcmVlbFJlc3VsdCA9IFtdOyAvLyBSZXN1bHQgb2YgaW5kaXZpZHVhbCByZWVsXG5cbiAgICByZWVsUmVzdWx0LnB1c2gocmVlbHMucmVlbExpc3RbaW5kZXhdLnJlZWxJdGVtc1swXSk7XG4gICAgcmVlbFJlc3VsdC5wdXNoKHJlZWxzLnJlZWxMaXN0W2luZGV4XS5yZWVsSXRlbXNbMV0pO1xuICAgIHJlZWxSZXN1bHQucHVzaChyZWVscy5yZWVsTGlzdFtpbmRleF0ucmVlbEl0ZW1zWzJdKTtcblxuICAgIHNwaW5SZXN1bHQucHVzaChyZWVsUmVzdWx0KTtcbiAgfSk7XG4gIGNvbnNvbGUubG9nKFwiU1BJTlJFU1VMVFwiLCBzcGluUmVzdWx0KTtcbiAgbGV0IHJlc3VsdCA9IGdldEFsbFJvd1Jlc3VsdHMoc3BpblJlc3VsdCk7XG4gIGxldCBjdXJyZW50V2luQW1vdW50ID0gMDtcblxuICAvLyBBbGwgdGhlIHBvc3NpYmxlIHdpbm5pbmcgcG9zc2liaWxpdGllcyBhbmQgaXRzIHByaXplc1xuICB2YXIgd2lubmluZ0Nhc2UgPSB7XG4gICAgdG9wOiB7XG4gICAgICBjaGVycnk6IHtcbiAgICAgICAgdmFsaWRhdGU6IC80ezN9Ly50ZXN0KHJlc3VsdFtcInRvcFwiXSksXG4gICAgICAgIHZhbHVlOiAyMDAwLFxuICAgICAgfSxcbiAgICAgIFwiN1wiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvM3szfS8udGVzdChyZXN1bHRbXCJ0b3BcIl0pLFxuICAgICAgICB2YWx1ZTogMTUwLFxuICAgICAgfSxcbiAgICAgIGNoZXJyeU9yNzoge1xuICAgICAgICB2YWxpZGF0ZTogL1s0LzNdezN9Ly50ZXN0KHJlc3VsdFtcInRvcFwiXSksXG4gICAgICAgIHZhbHVlOiA3NSxcbiAgICAgIH0sXG4gICAgICBcIjN4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8wezN9Ly50ZXN0KHJlc3VsdFtcInRvcFwiXSksXG4gICAgICAgIHZhbHVlOiA1MCxcbiAgICAgIH0sXG4gICAgICBcIjJ4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8yezN9Ly50ZXN0KHJlc3VsdFtcInRvcFwiXSksXG4gICAgICAgIHZhbHVlOiAyMCxcbiAgICAgIH0sXG4gICAgICBcIjF4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8xezN9Ly50ZXN0KHJlc3VsdFtcInRvcFwiXSksXG4gICAgICAgIHZhbHVlOiAxMCxcbiAgICAgIH0sXG4gICAgICBhbnlCYXI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC9bMDEyXXszfS8udGVzdChyZXN1bHRbXCJ0b3BcIl0pLFxuICAgICAgICB2YWx1ZTogNSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBtaWRkbGU6IHtcbiAgICAgIGNoZXJyeToge1xuICAgICAgICB2YWxpZGF0ZTogLzR7M30vLnRlc3QocmVzdWx0W1wibWlkZGxlXCJdKSxcbiAgICAgICAgdmFsdWU6IDEwMDAsXG4gICAgICB9LFxuICAgICAgXCI3XCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8zezN9Ly50ZXN0KHJlc3VsdFtcIm1pZGRsZVwiXSksXG4gICAgICAgIHZhbHVlOiAxNTAsXG4gICAgICB9LFxuICAgICAgY2hlcnJ5T3I3OiB7XG4gICAgICAgIHZhbGlkYXRlOiAvWzQvM117M30vLnRlc3QocmVzdWx0W1wibWlkZGxlXCJdKSxcbiAgICAgICAgdmFsdWU6IDc1LFxuICAgICAgfSxcbiAgICAgIFwiM3hCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzB7M30vLnRlc3QocmVzdWx0W1wibWlkZGxlXCJdKSxcbiAgICAgICAgdmFsdWU6IDUwLFxuICAgICAgfSxcbiAgICAgIFwiMnhCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzJ7M30vLnRlc3QocmVzdWx0W1wibWlkZGxlXCJdKSxcbiAgICAgICAgdmFsdWU6IDIwLFxuICAgICAgfSxcbiAgICAgIFwiMXhCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzF7M30vLnRlc3QocmVzdWx0W1wibWlkZGxlXCJdKSxcbiAgICAgICAgdmFsdWU6IDEwLFxuICAgICAgfSxcbiAgICAgIGFueUJhcjoge1xuICAgICAgICB2YWxpZGF0ZTogL1swMTJdezN9Ly50ZXN0KHJlc3VsdFtcIm1pZGRsZVwiXSksXG4gICAgICAgIHZhbHVlOiA1LFxuICAgICAgfSxcbiAgICB9LFxuICAgIGJvdHRvbToge1xuICAgICAgY2hlcnJ5OiB7XG4gICAgICAgIHZhbGlkYXRlOiAvNHszfS8udGVzdChyZXN1bHRbXCJib3R0b21cIl0pLFxuICAgICAgICB2YWx1ZTogNDAwMCxcbiAgICAgIH0sXG4gICAgICBcIjdcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzN7M30vLnRlc3QocmVzdWx0W1wiYm90dG9tXCJdKSxcbiAgICAgICAgdmFsdWU6IDE1MCxcbiAgICAgIH0sXG4gICAgICBjaGVycnlPcjc6IHtcbiAgICAgICAgdmFsaWRhdGU6IC9bNC8zXXszfS8udGVzdChyZXN1bHRbXCJib3R0b21cIl0pLFxuICAgICAgICB2YWx1ZTogNzUsXG4gICAgICB9LFxuICAgICAgXCIzeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMHszfS8udGVzdChyZXN1bHRbXCJib3R0b21cIl0pLFxuICAgICAgICB2YWx1ZTogNTAsXG4gICAgICB9LFxuICAgICAgXCIyeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMnszfS8udGVzdChyZXN1bHRbXCJib3R0b21cIl0pLFxuICAgICAgICB2YWx1ZTogMjAsXG4gICAgICB9LFxuICAgICAgXCIxeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMXszfS8udGVzdChyZXN1bHRbXCJib3R0b21cIl0pLFxuICAgICAgICB2YWx1ZTogMTAsXG4gICAgICB9LFxuICAgICAgYW55QmFyOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvWzAxMl17M30vLnRlc3QocmVzdWx0W1wiYm90dG9tXCJdKSxcbiAgICAgICAgdmFsdWU6IDUsXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgLy8gTG9vcCB0aHJvdWdoIHRoZSB3aW5uaW5nIHBvc3NpYmlsaXRpZXNcbiAgLy8gY2FzZSB3aW5uaW5nIGRyYXcgdGhlIGxpbmUgaW4gdGhlIHdpbm5pbmcgcm93XG4gIC8vIHVwZGF0ZSB0aGUgdmlldyB3aXRoIHRoZSBwcml6ZSB2YWx1ZVxuICBmb3IgKGxldCByb3cgaW4gd2lubmluZ0Nhc2UpIHtcbiAgICBmb3IgKGxldCBpdGVtIGluIHdpbm5pbmdDYXNlW3Jvd10pIHtcbiAgICAgIGlmICh3aW5uaW5nQ2FzZVtyb3ddW2l0ZW1dLnZhbGlkYXRlKSB7XG4gICAgICAgIGN1cnJlbnRXaW5BbW91bnQgKz0gd2lubmluZ0Nhc2Vbcm93XVtpdGVtXS52YWx1ZTtcblxuICAgICAgICB3aW5uaW5nUm93cy5wdXNoKHJvdyk7XG4gICAgICAgIC8vIEJyZWFrIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGN1cnJlbnRXaW5BbW91bnQpIHJldHVybiBjdXJyZW50V2luQW1vdW50O1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBnZXRBbGxSb3dSZXN1bHRzID0gKHNwaW5SZXN1bHQpID0+IHtcbiAgbGV0IHRvcCA9IFwiXCIsXG4gICAgbWlkZGxlID0gXCJcIixcbiAgICBib3R0b20gPSBcIlwiO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNwaW5SZXN1bHQubGVuZ3RoICYmIHNwaW5SZXN1bHQubGVuZ3RoID09PSAzOyBpKyspIHtcbiAgICB0b3AgKz0gc3BpblJlc3VsdFtpXVsyXS5pdGVtTm8udG9TdHJpbmcoKTtcbiAgICBtaWRkbGUgKz0gc3BpblJlc3VsdFtpXVsxXS5pdGVtTm8udG9TdHJpbmcoKTtcbiAgICBib3R0b20gKz0gc3BpblJlc3VsdFtpXVswXS5pdGVtTm8udG9TdHJpbmcoKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIHRvcCxcbiAgICBtaWRkbGUsXG4gICAgYm90dG9tLFxuICB9O1xufTtcblxuLy8gUmFuZG9tbHkgYXNzaWduIG51ZGdlc1xuY29uc3QgYXNzaWduTnVkZ2VzID0gKCkgPT4ge1xuICAvLyBSYW5kb21seSBhc3NpZ24gbnVkZ2VzXG4gIGNvbnN0IG51ZGdlUmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbnVkZ2VDaGFuY2UgKyAxKTtcblxuICAvLyBJZiByYW5kb20gY2hhbmNlIGlzIG1ldCB0aGVuIGFzc2lnbiBudWRnZXNcbiAgaWYgKG51ZGdlUmFuZG9tID09PSBudWRnZUNoYW5jZSkge1xuICAgIGNhbk51ZGdlID0gdHJ1ZTtcbiAgICBlbmFibGVOdWRnZXMoKTtcbiAgICBudWRnZXMubnVkZ2VzUmVtYWluaW5nID0gNTtcbiAgICBudWRnZXMucmVuZGVyKCk7XG4gIH0gZWxzZSBpZiAobnVkZ2VzLm51ZGdlc1JlbWFpbmluZyA8IDEpIHtcbiAgICAvLyBJZiBubyBudWRnZXMgbGVmdCBpbiBiYW5rXG4gICAgY2FuTnVkZ2UgPSBmYWxzZTtcbiAgICBkaXNhYmxlTnVkZ2VzKCk7XG4gIH1cbn07XG5cbi8vIFJhbmRvbWx5IGFzc2lnbiBob2xkc1xuY29uc3QgYXNzaWduSG9sZHMgPSAoKSA9PiB7XG4gIGNvbnN0IGhvbGRSYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBob2xkQ2hhbmNlICsgMSk7XG5cbiAgLy8gUmFuZG9tbHkgYXNzaWduIGhvbGRzIChpZiBubyBudWRnZXMgbGVmdCBpbiBiYW5rKVxuICAvLyBBc3NpZ24gaG9sZCBpZiByYW5kb20gbnVtYmVyIG1ldCBhbmQgbGFzdCBzcGluIHdhc24ndCBhIHdpblxuICBpZiAobnVkZ2VzLm51ZGdlc1JlbWFpbmluZyA8IDEpIHtcbiAgICBpZiAoaG9sZFJhbmRvbSA9PT0gaG9sZENoYW5jZSkge1xuICAgICAgLy8gQ2FuIGhvbGRcbiAgICAgIGNhbkhvbGQgPSB0cnVlO1xuICAgICAgYnV0dG9uU3R5bGVzKGhvbGRCdXR0b25MaXN0LCBcImFkZFwiLCBcImFjdGl2ZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FuSG9sZCA9IGZhbHNlO1xuICAgICAgYnV0dG9uU3R5bGVzKGhvbGRCdXR0b25MaXN0LCBcInJlbW92ZVwiLCBcImFjdGl2ZVwiKTtcbiAgICAgIGJ1dHRvblN0eWxlcyhob2xkQnV0dG9uTGlzdCwgXCJyZW1vdmVcIiwgXCJoZWxkXCIpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gRW5hYmxlIGFsbCBudWRnZXNcbmNvbnN0IGVuYWJsZU51ZGdlcyA9ICgpID0+IHtcbiAgcmVlbHMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgIC8vIElmIHRoZSByZWVsIGlzbid0IGhlbGRcbiAgICBpZiAoIXJlZWwuaXNIZWxkKSB7XG4gICAgICByZWVsLmNhbk51ZGdlID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbnVkZ2VCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gSWYgdGhlIHJlZWwgaXNuJ3QgaGVsZFxuICAgIGlmICghcmVlbHMucmVlbExpc3RbaV0uaXNIZWxkKSB7XG4gICAgICBudWRnZUJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICB9XG4gIH1cblxuICBudWRnZXNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbn07XG5cbi8vIEVuYmFsZSBhbGwgaG9sZHNcbmNvbnN0IGVuYWJsZUhvbGRzID0gKCkgPT4ge1xuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgcmVlbC5jYW5Ib2xkID0gdHJ1ZTtcbiAgfSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBob2xkQnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGhvbGRCdXR0b25MaXN0W2ldLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIH1cblxuICBjYW5ob2xkID0gdHJ1ZTtcbn07XG5cbi8vIERpc2FibGUgYWxsIG51ZGdlc1xuY29uc3QgZGlzYWJsZU51ZGdlcyA9ICgpID0+IHtcbiAgcmVlbHMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgIHJlZWwuY2FuTnVkZ2UgPSBmYWxzZTtcbiAgfSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudWRnZUJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBudWRnZUJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgfVxuXG4gIG51ZGdlcy5yZXNldCgpO1xuXG4gIGNhbk51ZGdlID0gZmFsc2U7XG5cbiAgbnVkZ2VzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG59O1xuXG4vLyBEaXNhYmxlIGFsbCBob2xkc1xuY29uc3QgZGlzYWJsZUhvbGRzID0gKCkgPT4ge1xuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgcmVlbC5jYW5Ib2xkID0gZmFsc2U7XG4gICAgcmVlbC5pc0hlbGQgPSBmYWxzZTtcbiAgICBpZiAocmVlbC5ydW5UaW1lIDwgMSkge1xuICAgICAgcmVlbC5yZXNldFJ1bnRpbWUoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaG9sZEJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBob2xkQnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIsIFwiaGVsZFwiKTtcbiAgfVxuXG4gIGNhbkhvbGQgPSBmYWxzZTtcbn07XG5cbi8vIEVuYWJsZSBzcGluXG5jb25zdCBlbmFibGVTcGluID0gKCkgPT4ge1xuICBzcGluQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIGNhblNwaW4gPSB0cnVlO1xufTtcblxuLy8gRGlzYmFsZSBzcGluXG5jb25zdCBkaXNhYmxlU3BpbiA9ICgpID0+IHtcbiAgc3BpbkJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICBjYW5TcGluID0gZmFsc2U7XG59O1xuXG4vLyBBZGQgb3IgcmVtb3ZlIGdyb3VwIGJ1dHRvbiBzdHlsZXNcbmNvbnN0IGJ1dHRvblN0eWxlcyA9IChidXR0b25MaXN0LCBhZGRSZW1vdmUsIGNsYXNzTmFtZSkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYWRkUmVtb3ZlID09PSBcImFkZFwiKSB7XG4gICAgICBidXR0b25MaXN0W2ldLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICB9IGVsc2UgaWYgKGFkZFJlbW92ZSA9PT0gXCJyZW1vdmVcIikge1xuICAgICAgYnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgfVxuICB9XG59O1xuXG4vLyBHYW1lIHN0YXRlXG5jb25zdCBnYW1lU3RhdGVzID0ge1xuICBjdXJyZW50U3RhdGU6IG51bGwsXG4gIHdpbkFtb3VudDogMCxcbiAgb2xkV2luRGlzcGxheTogMCwgLy8gV2hlbiBsb29waW5nIHRocm91Z2ggd2luIGluY3JlbWVudCAtIHRoaXMgaXMgdGhlIG9yaWdpbmFsIGZpZ3VyZVxuICBjdXJyZW50V2luRGlzcGxheTogMCwgLy8gV2hlbiBsb29waW5nIHRocm91Z2ggd2luIGFtb3VudCAtIHRoaXMgaXMgdGhlIG5ldyBmaWd1cmVcblxuICAvLyBSZWd1bGFyIHNwaW5cbiAgc3BpbjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3BpblR5cGUgPSBcInNwaW5cIjtcbiAgICBkaXNhYmxlU3BpbigpO1xuICAgIG1vdmVSZWVscygpO1xuICAgIHJlbmRlcigpO1xuXG4gICAgLy8gRmlsdGVyIHJlZWwgcnVudGltZXMgLSBpZiBvbmUgaXMgYWJvdmUgemVybyB0aGVuIGNhcnJ5IG9uXG4gICAgcmVlbHNSdW5uaW5nID0gcmVlbHMucmVlbExpc3QuZmlsdGVyKChyZWVsKSA9PiB7XG4gICAgICByZXR1cm4gcmVlbC5ydW5UaW1lID4gMDtcbiAgICB9KTtcblxuICAgIGlmICghcmVlbHNSdW5uaW5nLmxlbmd0aCkge1xuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLnNwaW5GaW5pc2hlZDtcbiAgICB9XG4gIH0sXG4gIC8vIFNwaW4gZmluaXNoZWRcbiAgc3BpbkZpbmlzaGVkOiBmdW5jdGlvbiAoY3VycmVudFRpbWUpIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG5cbiAgICBpZiAobnVkZ2VzLm51ZGdlc1JlbWFpbmluZyA8IDEpIHtcbiAgICAgIGRpc2FibGVOdWRnZXMoKTtcbiAgICAgIGlmIChzcGluVHlwZSAhPT0gXCJudWRnZVwiKSB7XG4gICAgICAgIGRpc2FibGVIb2xkcygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciB3aW5cbiAgICBjb25zdCB3aW4gPSBjaGVja1dpbigpO1xuXG4gICAgLy8gV2luXG4gICAgaWYgKHdpbikge1xuICAgICAgLy8gUmVzZXQgbnVkZ2VzXG4gICAgICBudWRnZXMucmVzZXQoKTtcbiAgICAgIGNhbk51ZGdlID0gZmFsc2U7XG4gICAgICBkaXNhYmxlTnVkZ2VzKCk7XG4gICAgICBkaXNhYmxlSG9sZHMoKTtcbiAgICAgIGRpc2FibGVTcGluKCk7XG5cbiAgICAgIG5vdyA9IGN1cnJlbnRUaW1lO1xuICAgICAgdGhpcy53aW5BbW91bnQgPSB3aW47XG5cbiAgICAgIHJlbmRlcigpO1xuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLndpbjsgLy8gU3dpdGNoIHRvIHdpbiBhbmltYXRpb24gc3RhdGVcbiAgICAgIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgIH1cbiAgICAvLyBObyB3aW5cbiAgICBlbHNlIHtcbiAgICAgIGlmIChcbiAgICAgICAgbnVkZ2VzLm51ZGdlc1JlbWFpbmluZyA8IDEgJiZcbiAgICAgICAgc3BpblR5cGUgIT09IFwibnVkZ2VcIiAmJlxuICAgICAgICBjcmVkaXRzLmNyZWRpdHNSZW1haW5pbmcgPiAwXG4gICAgICApIHtcbiAgICAgICAgLy8gSWYgbm8gd2lubmluZyBsaW5lIHRoZW4gYXNzaWduIGhvbGRzIGFuZCBudWRnZXNcbiAgICAgICAgYXNzaWduSG9sZHMoKTtcbiAgICAgICAgYXNzaWduTnVkZ2VzKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEVuYWJsZSBzcGluXG4gICAgICBlbmFibGVTcGluKCk7XG5cbiAgICAgIC8vIENoZWNrIGNyZWRpdHNcbiAgICAgIGlmIChjcmVkaXRzLmNyZWRpdHNSZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLmdhbWVPdmVyO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgLy8gTnVkZ2VcbiAgbnVkZ2U6IGZ1bmN0aW9uIChjdXJyZW50VGltZSkge1xuICAgIGxldCBpc051ZGdpbmcgPSBbXTtcbiAgICAvLyBJZiBudWRnaW5nIHN0b3BwZWQsIHRoZW4gY2hhbmdlIGdhbWVzdGF0ZSB0byBzcGluZmluaXNoZWRcbiAgICBpc051ZGdpbmcgPSByZWVscy5yZWVsTGlzdC5maWx0ZXIoKHJlZWwpID0+IHtcbiAgICAgIHJldHVybiByZWVsLmlzTnVkZ2luZyA9PT0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIGlmICghaXNOdWRnaW5nLmxlbmd0aCkge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuICAgICAgdGhpcy5zcGluRmluaXNoZWQoY3VycmVudFRpbWUpO1xuICAgIH1cblxuICAgIGlzTnVkZ2luZy5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgICByZWVsLm51ZGdlKCk7XG4gICAgICByZW5kZXIoKTtcbiAgICB9KTtcbiAgfSxcbiAgLy8gV2luIGFuaW1hdGlvblxuICB3aW46IGZ1bmN0aW9uIChjdXJyZW50VGltZSkge1xuICAgIGlmICh3aW5uaW5nUm93cy5pbmNsdWRlcyhcInRvcFwiKSlcbiAgICAgIHdpbkluZGljYXRvclRvcExpbmUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICBpZiAod2lubmluZ1Jvd3MuaW5jbHVkZXMoXCJtaWRkbGVcIikpXG4gICAgICB3aW5JbmRpY2F0b3JDZW50cmVMaW5lLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgaWYgKHdpbm5pbmdSb3dzLmluY2x1ZGVzKFwiYm90dG9tXCIpKVxuICAgICAgd2luSW5kaWNhdG9yQm90dG9tTGluZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIHdpbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuXG4gICAgZGlzYWJsZVNwaW4oKTtcbiAgICBkaXNhYmxlSG9sZHMoKTtcblxuICAgIGlmIChjdXJyZW50VGltZSAtIG5vdyA+IDEpIHtcbiAgICAgIG5vdyA9IGN1cnJlbnRUaW1lO1xuICAgICAgbGV0IHNraXAgPSB0aGlzLndpbkFtb3VudCA+IDUwMCA/IDEwIDogMTtcbiAgICAgIHRoaXMuY3VycmVudFdpbkRpc3BsYXkgKz0gc2tpcDtcbiAgICAgIHdpbi5jdXJyZW50V2luID0gdGhpcy53aW5BbW91bnQ7XG4gICAgICB3aW4ucmVuZGVyKCk7XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRXaW5EaXNwbGF5IC0gdGhpcy5vbGRXaW5EaXNwbGF5ID49IHRoaXMud2luQW1vdW50KSB7XG4gICAgICAgIC8vIEZpbmlzaGVkIGxvb3BpbmdcbiAgICAgICAgY3JlZGl0cy5hZGRDcmVkaXQodGhpcy53aW5BbW91bnQpO1xuICAgICAgICBjcmVkaXRzLnJlbmRlcigpO1xuICAgICAgICB0aGlzLm9sZFdpbkRpc3BsYXkgPSB0aGlzLmN1cnJlbnRXaW5EaXNwbGF5O1xuICAgICAgICB3aW4ucmVzZXQoKTtcbiAgICAgICAgd2luLnJlbmRlcigpO1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG4gICAgICAgIGVuYWJsZVNwaW4oKTtcbiAgICAgICAgd2luQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIHZpZXdwb3J0Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIHdpbkluZGljYXRvckxlZnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgd2luSW5kaWNhdG9yUmlnaHQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgd2luSW5kaWNhdG9yVG9wTGluZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICB3aW5JbmRpY2F0b3JDZW50cmVMaW5lLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIHdpbkluZGljYXRvckJvdHRvbUxpbmUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcblxuICAgICAgICAvLyBDaGVjayBjcmVkaXRzXG4gICAgICAgIGlmIChjcmVkaXRzLmNyZWRpdHNSZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IHRoaXMuZ2FtZU92ZXI7XG4gICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgLy8gR2FtZSBvdmVyIC0gY3JlZGl0cyByYW4gb3V0XG4gIGdhbWVPdmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuICAgIGRpc2FibGVTcGluKCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocGxheVNlY3Rpb24pO1xuXG4gICAgICBkaXNhYmxlTnVkZ2VzKCk7XG4gICAgICBkaXNhYmxlSG9sZHMoKTtcblxuICAgICAgcmVuZGVyR2FtZU92ZXJTZWN0aW9uKCk7XG5cbiAgICAgIHRoaXMud2luQW1vdW50ID0gMDtcbiAgICAgIHRoaXMub2xkV2luRGlzcGxheSA9IDA7XG4gICAgICB0aGlzLmN1cnJlbnRXaW5EaXNwbGF5ID0gMDtcbiAgICB9LCAxMDAwKTtcbiAgfSxcbn07XG5cbmNvbnN0IHJlbmRlckdhbWVPdmVyU2VjdGlvbiA9ICgpID0+IHtcbiAgY29uc3QgZ2FtZU92ZXJTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZ2FtZU92ZXJTZWN0aW9uLmlkID0gXCJnYW1lT3ZlclNlY3Rpb25cIjtcblxuICBnYW1lT3ZlclNlY3Rpb24uaW5uZXJIVE1MID0gXCI8ZGl2PlwiO1xuICBnYW1lT3ZlclNlY3Rpb24uaW5uZXJIVE1MICs9IFwiPHA+R2FtZSBvdmVyPC9wPlwiO1xuICBnYW1lT3ZlclNlY3Rpb24uaW5uZXJIVE1MICs9IFwiPHA+WW91IHdvbiBcIiArIHdpbi5jdXJyZW50V2luICsgXCIgY3JlZGl0c1wiO1xuICBnYW1lT3ZlclNlY3Rpb24uaW5uZXJIVE1MICs9IFwiPHA+UHJlc3Mgc3RhcnQgdG8gcGxheSBhZ2FpbjwvcD5cIjtcbiAgZ2FtZU92ZXJTZWN0aW9uLmlubmVySFRNTCArPSBcIjwvZGl2PlwiO1xuXG4gIGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgc3RhcnRCdXR0b24uaWQgPSBcInN0YXJ0QnV0dG9uXCI7XG4gIHN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidXR0b25cIik7XG4gIHN0YXJ0QnV0dG9uLmlubmVyVGV4dCA9IFwiU1RBUlRcIjtcblxuICBnYW1lT3ZlclNlY3Rpb24uYXBwZW5kQ2hpbGQoc3RhcnRCdXR0b24pO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZ2FtZU92ZXJTZWN0aW9uKTtcblxuICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZ2FtZU92ZXJTZWN0aW9uKTtcblxuICAgIHBsYXlTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwbGF5U2VjdGlvbi5pZCA9IFwicGxheVNlY3Rpb25cIjtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBsYXlTZWN0aW9uKTtcblxuICAgIGluaXQoKTtcbiAgfSk7XG59O1xuXG4vLyBQcmVsb2FkIGltYWdlcyB0aGVuIHN0YXJ0IGdhbWVcbnZhciBsb2FkZWQgPSAwO1xudmFyIGltYWdlTGlzdCA9IFtdO1xubGV0IGltZztcblxuSVRFTV9JTkZPLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgaW1nID0gbmV3IEltYWdlKCk7XG4gIGltZy5zcmMgPSBcIi4vaW1nL1wiICsgaXRlbS5pbWFnZVNyYztcbiAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICBsb2FkZWQrKztcbiAgICBpZiAobG9hZGVkID09PSBJVEVNX0lORk8ubGVuZ3RoKSBpbml0KCk7XG4gIH07XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHZpZXdwb3J0ID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld1ZpZXdwb3J0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgbmV3Vmlld3BvcnQud2lkdGggPSBWSUVXUE9SVF9XSURUSDtcbiAgICBuZXdWaWV3cG9ydC5oZWlnaHQgPSBWSUVXUE9SVF9IRUlHSFQ7XG4gICAgbmV3Vmlld3BvcnQuaWQgPSBcInZpZXdwb3J0XCI7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB2aWV3cG9ydDogbmV3Vmlld3BvcnQsXG4gICAgICAgIHdpZHRoOiBWSUVXUE9SVF9XSURUSCxcbiAgICAgICAgaGVpZ2h0OiBWSUVXUE9SVF9IRUlHSFQsXG4gICAgICAgIGN0eDogbmV3Vmlld3BvcnQuZ2V0Q29udGV4dCgnMmQnKSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCB2aWV3cG9ydENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3cG9ydENvbnRhaW5lcicpO1xuICAgICAgICAgICAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy52aWV3cG9ydCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpXG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdmlld3BvcnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL3ZpZXdwb3J0LmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgcmVlbCBmcm9tIFwiLi9yZWVsXCI7XG5cbmNvbnN0IHJlZWxzID0gKCkgPT4ge1xuICBsZXQgbmV3UmVlbDtcbiAgcmV0dXJuIHtcbiAgICByZWVsTGlzdDogW10sXG4gICAgYnVpbGQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTk9fUkVFTFM7IGkrKykge1xuICAgICAgICBuZXdSZWVsID0gcmVlbChpKTtcbiAgICAgICAgbmV3UmVlbC5idWlsZCgpO1xuICAgICAgICB0aGlzLnJlZWxMaXN0LnB1c2gobmV3UmVlbCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcbiAgICAgICAgaWYgKHJlZWwucnVuVGltZSA+IDAgJiYgIXJlZWwuaXNIZWxkKSB7XG4gICAgICAgICAgcmVlbC5tb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVzZXRSdW50aW1lczogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgICAgIHJlZWwucmVzZXRSdW50aW1lKCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgICAgIHJlZWwucmVuZGVyKCk7XG4gICAgICB9KTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVlbHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvbXBvbmVudHMvcmVlbHMuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgcmVlbEl0ZW0gZnJvbSBcIi4vcmVlbEl0ZW1cIjtcblxuY29uc3QgbW92ZUFycmF5SXRlbVRvTmV3SW5kZXggPSAoYXJyLCBvbGRfaW5kZXgsIG5ld19pbmRleCkgPT4ge1xuICB3aGlsZSAob2xkX2luZGV4IDwgMCkge1xuICAgIG9sZF9pbmRleCArPSBhcnIubGVuZ3RoO1xuICB9XG4gIHdoaWxlIChuZXdfaW5kZXggPCAwKSB7XG4gICAgbmV3X2luZGV4ICs9IGFyci5sZW5ndGg7XG4gIH1cbiAgaWYgKG5ld19pbmRleCA+PSBhcnIubGVuZ3RoKSB7XG4gICAgdmFyIGsgPSBuZXdfaW5kZXggLSBhcnIubGVuZ3RoICsgMTtcbiAgICB3aGlsZSAoay0tKSB7XG4gICAgICBhcnIucHVzaCh1bmRlZmluZWQpO1xuICAgIH1cbiAgfVxuICBhcnIuc3BsaWNlKG5ld19pbmRleCwgMCwgYXJyLnNwbGljZShvbGRfaW5kZXgsIDEpWzBdKTtcbiAgY29uc29sZS5sb2coXCJORVcgQVJSXCIsIGFycik7XG59O1xuXG5jb25zdCByZWVsID0gKHJlZWxObykgPT4ge1xuICBsZXQgZmlyc3RJdGVtO1xuICBsZXQgbGFzdEl0ZW07XG4gIGxldCBudWRnZUNhbGxUaW1lcztcblxuICBjb25zdCBTRUxFQ1RfR0FNRV9NT0RFID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lLW1vZGVcIik7XG4gIGNvbnN0IFNFTEVDVF9JVEVNX1NFTEVDVE9SID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpdGVtLXNlbGVjdG9yXCIpO1xuICBjb25zdCBTRUxFQ1RfUk9XX1NFTEVDVE9SID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb3ctc2VsZWN0b3JcIik7XG5cbiAgcmV0dXJuIHtcbiAgICBub09mSXRlbXM6IE5PX0lURU1TLFxuICAgIGl0ZW1MaXN0OiBJVEVNX0xJU1QsXG4gICAgcmVlbFNwZWVkOiBSRUVMX1NQRUVELFxuICAgIG51ZGdlU3BlZWQ6IDEwLFxuICAgIHJ1blRpbWU6IFJFRUxfU1BFRUQgKiAxMCArIDIwICogcmVlbE5vLCAvLyBBcmJpdHJhcnkgdmFsdWVzIGZvciB0ZXN0aW5nXG4gICAgY2FuSG9sZDogZmFsc2UsXG4gICAgaXNIZWxkOiBmYWxzZSxcbiAgICBjYW5OdWRnZTogZmFsc2UsXG4gICAgaXNOdWRnaW5nOiBmYWxzZSxcbiAgICBudWRnZUZyYW1lczogSVRFTV9IRUlHSFQgLyBOVURHRV9TUEVFRCxcbiAgICBudWRnZUZyYW1lOiAwLFxuICAgIHJlZWxJdGVtczogW10sXG4gICAgcmVlbE5vLFxuICAgIGJ1aWxkOiBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgaXRlbU5vID0gMDtcbiAgICAgIGxldCB0eXBlO1xuICAgICAgbGV0IGluc3RhbmNlcztcbiAgICAgIGxldCBpbWFnZVNyYztcbiAgICAgIGxldCB3aW5BbW91bnQ7XG4gICAgICBsZXQgeDtcbiAgICAgIGxldCB5O1xuICAgICAgbGV0IG5ld1JlZWxJdGVtO1xuXG4gICAgICBJVEVNX0lORk8uZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgdHlwZSA9IGl0ZW0udHlwZTtcbiAgICAgICAgaW5zdGFuY2VzID0gaXRlbS5pbnN0YW5jZXM7XG4gICAgICAgIGltYWdlU3JjID0gaXRlbS5pbWFnZVNyYztcbiAgICAgICAgd2luQW1vdW50ID0gaXRlbS53aW5BbW91bnQ7XG5cbiAgICAgICAgLy8gQWRkIHJlcXVpcmVkIG5vIG9mIGluc3RhbmNlcyBvZiB0aGlzIGl0ZW0gdG8gdGhlIHJlZWxJdGVtcyBhcnJheVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluc3RhbmNlczsgaSsrKSB7XG4gICAgICAgICAgeCA9XG4gICAgICAgICAgICBWSUVXUE9SVF9YICsgdGhpcy5yZWVsTm8gKiBSRUVMX1dJRFRIICsgdGhpcy5yZWVsTm8gKiBSRUVMX1NQQUNJTkc7XG5cbiAgICAgICAgICB5ID0gVklFV1BPUlRfWSAtIElURU1fSEVJR0hUIC0gSVRFTV9IRUlHSFQgKiBpdGVtTm8gLSAxMDA7XG5cbiAgICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICBpbWcuc3JjID0gXCIuL2ltZy9cIiArIGl0ZW0uaW1hZ2VTcmM7XG5cbiAgICAgICAgICBuZXdSZWVsSXRlbSA9IHJlZWxJdGVtKHR5cGUsIGl0ZW1ObywgaW1nLCB4LCB5LCB3aW5BbW91bnQpO1xuICAgICAgICAgIHRoaXMucmVlbEl0ZW1zLnB1c2gobmV3UmVlbEl0ZW0pO1xuICAgICAgICAgIGl0ZW1ObysrO1xuICAgICAgICAgIC8vIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc2h1ZmZsZSgpO1xuICAgICAgdGhpcy5yZXNldENvb3JkcygpO1xuICAgIH0sXG4gICAgc2h1ZmZsZTogZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHJuZDtcbiAgICAgIGxldCB0ZW1wO1xuICAgICAgZm9yIChsZXQgaSA9IHRoaXMucmVlbEl0ZW1zLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgcm5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgICAgIHRlbXAgPSB0aGlzLnJlZWxJdGVtc1tpXTtcbiAgICAgICAgdGhpcy5yZWVsSXRlbXNbaV0gPSB0aGlzLnJlZWxJdGVtc1tybmRdO1xuICAgICAgICB0aGlzLnJlZWxJdGVtc1tybmRdID0gdGVtcDtcbiAgICAgIH1cbiAgICB9LFxuICAgIG51ZGdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnJlZWxJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGl0ZW0ubnVkZ2UoKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNoaWZ0KCk7XG5cbiAgICAgIHRoaXMubnVkZ2VGcmFtZSsrO1xuXG4gICAgICBpZiAodGhpcy5udWRnZUZyYW1lID49IHRoaXMubnVkZ2VGcmFtZXMpIHtcbiAgICAgICAgdGhpcy5pc051ZGdpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5udWRnZUZyYW1lID0gMDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlc2V0Q29vcmRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucmVlbEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMucmVlbEl0ZW1zW2ldLnkgPVxuICAgICAgICAgIFZJRVdQT1JUX1kgKyBWSUVXUE9SVF9IRUlHSFQgLSBJVEVNX0hFSUdIVCAtIElURU1fSEVJR0hUICogaTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlc2V0UnVudGltZTogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCF0aGlzLmlzSGVsZCkge1xuICAgICAgICB0aGlzLnJ1blRpbWUgPSBSRUVMX1NQRUVEICogMTAgKyAyMCAqIHJlZWxObzsgLy8gQXJiaXRyYXJ5IHZhbHVlcyBmb3IgdGVzdGluZztcbiAgICAgIH1cbiAgICB9LFxuICAgIHNoaWZ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBJZiBib3R0b20gcmVlbCBpdGVtIGdldHMgYmVsb3cgYm90dG9tIG9mIHZpZXdwb3J0IHRoZW4gbW92ZSBpdCB0byBiZWdpbm5pbmcgb2YgYXJyYXlcbiAgICAgIGlmICh0aGlzLnJlZWxJdGVtc1swXS55ID49IFZJRVdQT1JUX1kgKyBWSUVXUE9SVF9IRUlHSFQpIHtcbiAgICAgICAgZmlyc3RJdGVtID0gdGhpcy5yZWVsSXRlbXNbMF07XG4gICAgICAgIGxhc3RJdGVtID0gdGhpcy5yZWVsSXRlbXNbdGhpcy5yZWVsSXRlbXMubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgLy8gUmVzdCB5IGNvb3JkcyBmb3IgaXRlbSB0byBzaGlmdCB0byB0b3Agb2YgcmVlbFxuICAgICAgICBmaXJzdEl0ZW0ueSA9IGxhc3RJdGVtLnkgLSBJVEVNX0hFSUdIVDtcblxuICAgICAgICAvLyBTaGlmdCBib3R0b20gaXRlbSB0byB0b3BcbiAgICAgICAgdGhpcy5yZWVsSXRlbXMucHVzaCh0aGlzLnJlZWxJdGVtcy5zaGlmdCgpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucmVlbEl0ZW1zLmZvckVhY2goKHJlZWxJdGVtKSA9PiB7XG4gICAgICAgIHJlZWxJdGVtLm1vdmUoKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zaGlmdCgpO1xuICAgICAgLy8gUmVkdWNlIHJlZWwgcnVudGltZVxuICAgICAgdGhpcy5ydW5UaW1lLS07XG4gICAgICBpZiAoU0VMRUNUX0dBTUVfTU9ERS52YWx1ZSA9PT0gXCJmaXhlZFwiICYmIHRoaXMucnVuVGltZSA9PT0gMCkge1xuICAgICAgICBsZXQgcHJldkluZGV4ID0gdGhpcy5yZWVsSXRlbXMuZmluZEluZGV4KFxuICAgICAgICAgIChpdGVtKSA9PlxuICAgICAgICAgICAgcGFyc2VJbnQoaXRlbS5pdGVtTm8pID09PSBwYXJzZUludChTRUxFQ1RfSVRFTV9TRUxFQ1RPUi52YWx1ZSlcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgbWFwUm93VG9TdHJpbmcgPSB7XG4gICAgICAgICAgdG9wOiAyLFxuICAgICAgICAgIG1pZGRsZTogMSxcbiAgICAgICAgICBib3R0b206IDAsXG4gICAgICAgIH07XG4gICAgICAgIGxldCBuZXh0SW5kZXggPSBtYXBSb3dUb1N0cmluZ1tTRUxFQ1RfUk9XX1NFTEVDVE9SLnZhbHVlXTtcbiAgICAgICAgaWYgKHByZXZJbmRleCAhPT0gbmV4dEluZGV4KSB7XG4gICAgICAgICAgbW92ZUFycmF5SXRlbVRvTmV3SW5kZXgodGhpcy5yZWVsSXRlbXMsIHByZXZJbmRleCwgbmV4dEluZGV4KTtcbiAgICAgICAgICB0aGlzLnJlc2V0Q29vcmRzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5yZWVsSXRlbXMuZm9yRWFjaCgocmVlbEl0ZW0pID0+IHtcbiAgICAgICAgcmVlbEl0ZW0ucmVuZGVyKCk7XG4gICAgICB9KTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVlbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy9yZWVsLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgcmVlbEl0ZW0gPSAodHlwZSwgaXRlbU5vLCBpbWcsIHgsIHksIHdpbkFtb3VudCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGUsXG4gICAgaXRlbU5vLFxuICAgIGltZyxcbiAgICB4LFxuICAgIHksXG4gICAgd2luQW1vdW50LFxuICAgIHNwZWVkOiBSRUVMX1NQRUVELFxuICAgIG51ZGdlU3BlZWQ6IE5VREdFX1NQRUVELFxuICAgIGN0eDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWV3cG9ydFwiKS5nZXRDb250ZXh0KFwiMmRcIiksXG4gICAgbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy55ICs9IHRoaXMuc3BlZWQ7XG4gICAgfSxcbiAgICBudWRnZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy55ICs9IHRoaXMubnVkZ2VTcGVlZDtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKFxuICAgICAgICB0aGlzLmltZyxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgSVRFTV9XSURUSCxcbiAgICAgICAgSVRFTV9IRUlHSFQsXG4gICAgICAgIHRoaXMueCxcbiAgICAgICAgdGhpcy55LFxuICAgICAgICBJVEVNX1dJRFRILFxuICAgICAgICBJVEVNX0hFSUdIVFxuICAgICAgKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVlbEl0ZW07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvbXBvbmVudHMvcmVlbEl0ZW0uanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZGlnaXRzID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGRpZ2l0c1N0cmluZzogbnVsbCxcbiAgICAgICAgY29udGFpbmVyOiBudWxsLCAvLyBDb250YWluZXIgdGhhdCBob2xkcyBkaWdpdENvbnRhaW5lcnNcbiAgICAgICAgZGlnaXRDb250YWluZXJzOiBudWxsLCAvLyBMaXN0IG9mIGRpZ2l0IGNvbnRhaW5lcnMgdGhhdCBob2xkIHNpbmdsZSBkaWdpdCBlYWNoXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gLy8gU3BsaXQgbnVtYmVyIGludG8gc2VwZXJhdGUgY2hhcmFjdGVyc1xuICAgICAgICAgICAgdGhpcy5kaWdpdENvbnRhaW5lcnMgPSB0aGlzLmNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkaWdpdC1udW1iZXInKTsgXG4gICAgICAgICAgICBsZXQgZGlnaXRJbmRleDsgLy8gV2hpY2ggZGlnaXQgY29udGFpbmVyIHRvIHB1dCBudW1iZXIgaW5cblxuICAgICAgICAgICAgLy8gV2lwZSB0aGUgZGlnaXRzXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGlnaXRDb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWdpdENvbnRhaW5lcnNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWdpdENvbnRhaW5lcnNbaV0uaW5uZXJIVE1MID0gJzgnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBQb3B1bGF0ZSB0aGUgZGlnaXRzXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGlnaXRzU3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZGlnaXRJbmRleCA9ICh0aGlzLmRpZ2l0Q29udGFpbmVycy5sZW5ndGgpIC0gKHRoaXMuZGlnaXRzU3RyaW5nLmxlbmd0aCAtIGkpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlnaXRDb250YWluZXJzW2RpZ2l0SW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlnaXRDb250YWluZXJzW2RpZ2l0SW5kZXhdLmlubmVySFRNTCA9IHRoaXMuZGlnaXRzU3RyaW5nW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRpZ2l0cztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvbXBvbmVudHMvZGlnaXRzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGRpZ2l0cyBmcm9tIFwiLi9kaWdpdHNcIjtcblxuY29uc3QgY3JlZGl0cyA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBjcmVkaXRzUmVtYWluaW5nOiBDUkVESVRTLFxuICAgIGRpZ2l0czogZGlnaXRzKCksXG4gICAgY29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNyZWRpdHNcIiksXG4gICAgYWRkQ3JlZGl0OiBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICB0aGlzLmNyZWRpdHNSZW1haW5pbmcgKz0gYW1vdW50O1xuICAgIH0sXG4gICAgdXNlQ3JlZGl0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmNyZWRpdHNSZW1haW5pbmctLTtcbiAgICB9LFxuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmNyZWRpdHNSZW1haW5pbmcgPSBDUkVESVRTO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmRpZ2l0cy5kaWdpdHNTdHJpbmcgPSB0aGlzLmNyZWRpdHNSZW1haW5pbmcudG9TdHJpbmcoKTtcbiAgICAgIHRoaXMuZGlnaXRzLmNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgdGhpcy5kaWdpdHMucmVuZGVyKCk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWRpdHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvbXBvbmVudHMvY3JlZGl0cy5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBkaWdpdHMgZnJvbSBcIi4vZGlnaXRzXCI7XG5cbmNvbnN0IHdpbiA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBjdXJyZW50V2luOiAwLFxuICAgIGRpZ2l0czogZGlnaXRzKCksXG4gICAgY29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpblwiKSxcbiAgICBhZGRXaW46IGZ1bmN0aW9uICh3aW5BbW91bnQpIHtcbiAgICAgIHRoaXMuY3VycmVudFdpbiA9IHdpbkFtb3VudDtcbiAgICB9LFxuICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmN1cnJlbnRXaW4gPSAwO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmRpZ2l0cy5kaWdpdHNTdHJpbmcgPSB0aGlzLmN1cnJlbnRXaW4udG9TdHJpbmcoKTtcbiAgICAgIHRoaXMuZGlnaXRzLmNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgICAgdGhpcy5kaWdpdHMucmVuZGVyKCk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy93aW4uanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGhvbGRCdXR0b24gZnJvbSAnLi9ob2xkQnV0dG9uJztcblxuY29uc3QgaG9sZEJ1dHRvbnMgPSAoKSA9PiB7XG4gICAgbGV0IG5ld0J1dHRvbjtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGJ1dHRvbkxpc3Q6IFtdLFxuICAgICAgICBidWlsZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOT19SRUVMUzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbmV3QnV0dG9uID0gaG9sZEJ1dHRvbihpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbkxpc3QucHVzaChuZXdCdXR0b24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uTGlzdC5mb3JFYWNoKChidG4sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgYnRuLnJlbmRlcihpbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBob2xkQnV0dG9ucztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvbXBvbmVudHMvaG9sZEJ1dHRvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgaG9sZEJ1dHRvbiA9IChpbmRleCkgPT4ge1xuICAgIGxldCBob2xkQnV0dG9uO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG9sZEJ1dHRvbnMnKSxcbiAgICAgICAgcmVlbE5vOiBpbmRleCxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBob2xkQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBob2xkQnV0dG9uLmlubmVySFRNTCA9ICdIT0xEJztcbiAgICAgICAgICAgIGhvbGRCdXR0b24uY2xhc3NMaXN0LmFkZCgnaG9sZC1idXR0b24nLCAnYnV0dG9uJyk7XG4gICAgICAgICAgICBob2xkQnV0dG9uLnN0eWxlLndpZHRoID0gQlVUVE9OX1dJRFRIICsgJ3B4JztcbiAgICAgICAgICAgIGhvbGRCdXR0b24uc3R5bGUubWFyZ2luTGVmdCA9IChSRUVMX1NQQUNJTkcgLyAyKSArICgoUkVFTF9XSURUSCAtIEJVVFRPTl9XSURUSCkgLyAyKSArICdweCc7XG4gICAgICAgICAgICBob2xkQnV0dG9uLnN0eWxlLm1hcmdpblJpZ2h0ID0gKFJFRUxfU1BBQ0lORyAvIDIpICsgKChSRUVMX1dJRFRIIC0gQlVUVE9OX1dJRFRIKSAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKGhvbGRCdXR0b24pO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGhvbGRCdXR0b247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL2hvbGRCdXR0b24uanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IG51ZGdlQnV0dG9uIGZyb20gJy4vbnVkZ2VCdXR0b24nO1xuXG5jb25zdCBudWRnZUJ1dHRvbnMgPSAoKSA9PiB7XG4gICAgbGV0IG5ld0J1dHRvbjtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGJ1dHRvbkxpc3Q6IFtdLFxuICAgICAgICBidWlsZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5PX1JFRUxTOyBpKyspIHtcbiAgICAgICAgICAgICAgICBuZXdCdXR0b24gPSBudWRnZUJ1dHRvbihpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbkxpc3QucHVzaChuZXdCdXR0b24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5idXR0b25MaXN0LmZvckVhY2goKGJ0biwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBidG4ucmVuZGVyKGluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG51ZGdlQnV0dG9ucztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvbXBvbmVudHMvbnVkZ2VCdXR0b25zLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG51ZGdlQnV0dG9uID0gKGluZGV4KSA9PiB7XG4gICAgbGV0IG51ZGdlQnV0dG9uO1xuICAgIGxldCBudWRnZUJ1dHRvbkNvbnRhaW5lcjtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ251ZGdlQnV0dG9ucycpLFxuICAgICAgICByZWVsTm86IGluZGV4LFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBudWRnZUJ1dHRvbi5pbm5lckhUTUwgPSAnTlVER0UnO1xuICAgICAgICAgICAgbnVkZ2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnbnVkZ2UtYnV0dG9uJywgJ2J1dHRvbicpO1xuICAgICAgICAgICAgbnVkZ2VCdXR0b24uc3R5bGUud2lkdGggPSBCVVRUT05fV0lEVEggKyAncHgnO1xuICAgICAgICAgICAgbnVkZ2VCdXR0b24uc3R5bGUubWFyZ2luTGVmdCA9IChSRUVMX1NQQUNJTkcgLyAyKSArICgoUkVFTF9XSURUSCAtIEJVVFRPTl9XSURUSCkgLyAyKSArICdweCc7XG4gICAgICAgICAgICBudWRnZUJ1dHRvbi5zdHlsZS5tYXJnaW5SaWdodCA9IChSRUVMX1NQQUNJTkcgLyAyKSArICgoUkVFTF9XSURUSCAtIEJVVFRPTl9XSURUSCkgLyAyKSArICdweCc7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChudWRnZUJ1dHRvbik7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbnVkZ2VCdXR0b247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL251ZGdlQnV0dG9uLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBkaWdpdHMgZnJvbSAnLi9kaWdpdHMnO1xuXG5jb25zdCBudWRnZXMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbnVkZ2VzUmVtYWluaW5nOiAwLFxuICAgICAgICBkaWdpdHM6IGRpZ2l0cygpLFxuICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdudWRnZXMnKSxcbiAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5udWRnZXNSZW1haW5pbmcgPSAwO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLmRpZ2l0c1N0cmluZyA9IHRoaXMubnVkZ2VzUmVtYWluaW5nLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmRpZ2l0cy5jb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgICAgIHRoaXMuZGlnaXRzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG51ZGdlcztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvbXBvbmVudHMvbnVkZ2VzLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9