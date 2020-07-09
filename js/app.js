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
      this.currentWinDisplay += 10;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmY4N2JjMGUxM2MyZmY4OWY0MzciLCJ3ZWJwYWNrOi8vLy4vanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL3ZpZXdwb3J0LmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvcmVlbHMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9yZWVsLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvcmVlbEl0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9kaWdpdHMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9jcmVkaXRzLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvd2luLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvaG9sZEJ1dHRvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9ob2xkQnV0dG9uLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvbnVkZ2VCdXR0b25zLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvbnVkZ2VCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9udWRnZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUEr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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM3dCWTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSxpRUFBUSxF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SztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFZSw0REFBRyxFQUFDOzs7Ozs7OztBQ3ZCbkI7QUFBYTs7QUFFeUI7O0FBRXRDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGNBQWM7QUFDekMsNEJBQTRCLG9FQUFVO0FBQ3RDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFZSxvRUFBVyxFOzs7Ozs7O0FDdkJiOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSxtRUFBVSxFOzs7Ozs7O0FDcEJ6QjtBQUFhOztBQUUyQjs7QUFFeEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsY0FBYztBQUN6Qyw0QkFBNEIscUVBQVc7QUFDdkM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVlLHFFQUFZLEU7Ozs7Ozs7QUN2QmQ7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsb0VBQVcsRTs7Ozs7OztBQ3JCMUI7QUFBYTs7QUFFaUI7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixnRUFBTTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSwrREFBTSxFIiwiZmlsZSI6Ii4vanMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZmY4N2JjMGUxM2MyZmY4OWY0MzciLCJpbXBvcnQgVmlld3BvcnQgZnJvbSBcIi4vY29tcG9uZW50cy92aWV3cG9ydFwiO1xuaW1wb3J0IFJlZWxzIGZyb20gXCIuL2NvbXBvbmVudHMvcmVlbHNcIjtcbmltcG9ydCBOdWRnZUJ1dHRvbnMgZnJvbSBcIi4vY29tcG9uZW50cy9udWRnZUJ1dHRvbnNcIjtcbmltcG9ydCBIb2xkQnV0dG9ucyBmcm9tIFwiLi9jb21wb25lbnRzL2hvbGRCdXR0b25zXCI7XG5pbXBvcnQgQ3JlZGl0cyBmcm9tIFwiLi9jb21wb25lbnRzL2NyZWRpdHNcIjtcbmltcG9ydCBXaW4gZnJvbSBcIi4vY29tcG9uZW50cy93aW5cIjtcbmltcG9ydCBOdWRnZXMgZnJvbSBcIi4vY29tcG9uZW50cy9udWRnZXNcIjtcblxuLy8gU2Fzc1xuaW1wb3J0IFwiLi4vc2Nzcy9hcHAuc2Nzc1wiO1xuXG4vLyBjcmVhdGVzIHRoZSBjYW52YXMgd2hpY2ggd2UgbmVlZCB0byBkcmF3IHVwb24gYW5kIGFzc2lnbnMgdG8gYSB2aWV3cG9ydCB2YXJpYWJsZVxuY29uc3Qgdmlld3BvcnQgPSBWaWV3cG9ydCgpO1xuLy8gY29uc3Qgc3BpbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcGluQnV0dG9uJyk7XG5jb25zdCB3aW5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpblwiKTtcbmNvbnN0IG51ZGdlc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibnVkZ2VzXCIpO1xubGV0IHBsYXlTZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5U2VjdGlvblwiKTtcbmNvbnN0IHNlbGVjdF9nYW1lTW9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZS1tb2RlXCIpO1xuY29uc3QgZGl2X2ZpeGVkTW9kZU9wdGlvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpeGVkLW1vZGUtb3B0aW9uc1wiKTtcblxubGV0IHZpZXdwb3J0Q29udGFpbmVyO1xubGV0IG51ZGdlQnV0dG9uQ29udGFpbmVyO1xubGV0IGhvbGRCdXR0b25Db250YWluZXI7XG5sZXQgd2luSW5kaWNhdG9yTGVmdDtcbmxldCB3aW5JbmRpY2F0b3JSaWdodDtcbmxldCB3aW5JbmRpY2F0b3JUb3BMaW5lO1xubGV0IHdpbkluZGljYXRvckNlbnRyZUxpbmU7XG5sZXQgd2luSW5kaWNhdG9yQm90dG9tTGluZTtcbmxldCBzcGluQnV0dG9uO1xubGV0IHJlZWxzO1xubGV0IG51ZGdlcztcbmxldCBudWRnZUJ1dHRvbnM7XG5sZXQgaG9sZEJ1dHRvbnM7XG5sZXQgbnVkZ2VCdXR0b25MaXN0O1xubGV0IGhvbGRCdXR0b25MaXN0O1xubGV0IGNyZWRpdHM7XG5sZXQgd2luO1xubGV0IHdpbm5pbmdSb3dzID0gW107XG5sZXQgZ2FtZUxvb3A7XG5sZXQgbnVkZ2VDaGFuY2UgPSAyOyAvLyBDaGFuY2Ugb2YgZ2V0dGluZyBudWRnZXMgYWZ0ZXIgc3BpbiAoMSBpbiBudWRnZUNoYW5jZSlcbmxldCBob2xkQ2hhbmNlID0gMjsgLy8gQ2hhbmNlIG9mIGdldHRpbmcgaG9sZHMgYWZ0ZXIgc3BpbiAoMSBpbiBob2xkQ2hhbmNlKVxubGV0IGNhblNwaW47XG5sZXQgY2FuTnVkZ2U7XG5sZXQgY2FuSG9sZDtcbmxldCBub3c7IC8vIEN1cnJlbnQgdGltZSB0byBjb21wYXJlIGFnYWluc3RcbmxldCByZWVsc1J1bm5pbmcgPSBbXTsgLy8gS2VlcHMgdHJhY2sgb2YgYW55IHJlZWxzIHdpdGggcnVudGltZSBsZWZ0IG9uIHRoZW0gdG8gZXN0Ymxpc2ggd2hldGhlciB0byByZXNldC9zdG9wIHNwaW4gZXRjLlxubGV0IHNwaW5UeXBlID0gXCJzcGluXCI7IC8vIEtlZXBzIHRyYWNrIG9mIHdoZXRoZXIgbGFzdCBzcGluIHdhcyByZWd1bGFyIHNwaW4gb3IgbnVkZ2VcblxuY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgcmVuZGVyVmlld3BvcnRDb250YWluZXIoKTtcblxuICAvLyBSZW5kZXIgdmlld3BvcnRcbiAgdmlld3BvcnQucmVuZGVyKCk7XG5cbiAgLy8gU2V0IHVwIHJlZWxzXG4gIHJlZWxzID0gUmVlbHMoKTtcbiAgcmVlbHMuYnVpbGQoKTtcbiAgcmVlbHMucmVuZGVyKCk7XG5cbiAgbGV0IHJlZWxDb250YWluZXI7XG4gIGxldCByZWVsQ29udGFpbmVyWDtcbiAgbGV0IHJlZWxDb250YWluZXJZO1xuICBsZXQgcmVlbENvbnRhaW5lclc7XG4gIGxldCByZWVsQ29udGFpbmVySDtcblxuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgLy8gUmVuZGVyIG91dGVyIGNvbnRhaW5lciBmb3IgZWFjaCByZWVsIGluIHRoZSB2aWV3cG9ydCBjb250YWluZXJcbiAgICByZWVsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgIHJlZWxDb250YWluZXJYID1cbiAgICAgIHJlZWwucmVlbEl0ZW1zWzBdLnggK1xuICAgICAgVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWCAtXG4gICAgICBSRUVMX0NPTlRBSU5FUl9QQURESU5HO1xuXG4gICAgcmVlbENvbnRhaW5lclkgPVxuICAgICAgcmVlbC5yZWVsSXRlbXNbMl0ueSArXG4gICAgICBWSUVXUE9SVF9DT05UQUlORVJfUEFERElOR19ZIC1cbiAgICAgIFJFRUxfQ09OVEFJTkVSX1BBRERJTkc7XG5cbiAgICByZWVsQ29udGFpbmVyVyA9IFJFRUxfV0lEVEggKyBSRUVMX0NPTlRBSU5FUl9QQURESU5HICogMjtcblxuICAgIHJlZWxDb250YWluZXJIID0gVklFV1BPUlRfSEVJR0hUICsgUkVFTF9DT05UQUlORVJfUEFERElORyAqIDI7XG5cbiAgICByZWVsQ29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIHJlZWxDb250YWluZXIuc3R5bGUudG9wID0gcmVlbENvbnRhaW5lclkgKyBcInB4XCI7XG4gICAgcmVlbENvbnRhaW5lci5zdHlsZS5sZWZ0ID0gcmVlbENvbnRhaW5lclggKyBcInB4XCI7XG4gICAgcmVlbENvbnRhaW5lci5zdHlsZS53aWR0aCA9IHJlZWxDb250YWluZXJXICsgXCJweFwiO1xuICAgIHJlZWxDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gcmVlbENvbnRhaW5lckggKyBcInB4XCI7XG4gICAgcmVlbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicmVlbC1jb250YWluZXJcIik7XG4gICAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQocmVlbENvbnRhaW5lcik7XG4gIH0pO1xuXG4gIHJlbmRlcldpbkluZGljYXRvcnMoKTtcblxuICByZW5kZXJOdWRnZUJ1dHRvbkNvbnRhaW5lcigpO1xuXG4gIC8vIFNldCB1cCBudWRnZSBidXR0b25zXG4gIG51ZGdlQnV0dG9ucyA9IE51ZGdlQnV0dG9ucygpO1xuICBudWRnZUJ1dHRvbnMuYnVpbGQoKTtcbiAgbnVkZ2VCdXR0b25zLnJlbmRlcigpO1xuXG4gIG51ZGdlQnV0dG9uTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJudWRnZS1idXR0b25cIik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudWRnZUJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBudWRnZUJ1dHRvbkxpc3RbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgY2FuU3BpbiAmJlxuICAgICAgICBjYW5OdWRnZSAmJlxuICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5jYW5OdWRnZSA9PT0gdHJ1ZSAmJlxuICAgICAgICBudWRnZXMubnVkZ2VzUmVtYWluaW5nID4gMFxuICAgICAgKSB7XG4gICAgICAgIHNwaW5UeXBlID0gXCJudWRnZVwiO1xuICAgICAgICBudWRnZXMubnVkZ2VzUmVtYWluaW5nIC09IDE7XG4gICAgICAgIHJlZWxzLnJlZWxMaXN0W2ldLmlzTnVkZ2luZyA9IHRydWU7XG4gICAgICAgIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgICBnYW1lU3RhdGVzLmN1cnJlbnRTdGF0ZSA9IGdhbWVTdGF0ZXMubnVkZ2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBTZXQgdXAgbnVkZ2VzXG4gIG51ZGdlcyA9IE51ZGdlcygpO1xuICBudWRnZXMucmVuZGVyKCk7XG5cbiAgcmVuZGVySG9sZEJ1dHRvbkNvbnRhaW5lcigpO1xuXG4gIC8vIFNldCB1cCBob2xkIGJ1dHRvbnNcbiAgaG9sZEJ1dHRvbnMgPSBIb2xkQnV0dG9ucygpO1xuICBob2xkQnV0dG9ucy5idWlsZCgpO1xuICBob2xkQnV0dG9ucy5yZW5kZXIoKTtcblxuICBob2xkQnV0dG9uTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJob2xkLWJ1dHRvblwiKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGhvbGRCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaG9sZEJ1dHRvbkxpc3RbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgaWYgKGNhblNwaW4gJiYgY2FuSG9sZCkge1xuICAgICAgICAvLyBUb2dnbGVcbiAgICAgICAgaWYgKHJlZWxzLnJlZWxMaXN0W2ldLmlzSGVsZCkge1xuICAgICAgICAgIC8vIFRha2UgaG9sZCBvZmZcbiAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQgPSBmYWxzZTtcbiAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5yZXNldFJ1bnRpbWUoKTtcbiAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImhlbGRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUHV0IGhvbGQgb25cbiAgICAgICAgICByZWVscy5yZWVsTGlzdFtpXS5pc0hlbGQgPSB0cnVlO1xuICAgICAgICAgIHJlZWxzLnJlZWxMaXN0W2ldLnJ1blRpbWUgPSAwO1xuICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGVsZFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gU2V0IHVwIGNyZWRpdHNcbiAgY3JlZGl0cyA9IENyZWRpdHMoKTtcbiAgY3JlZGl0cy5yZXNldCgpO1xuICBjcmVkaXRzLnJlbmRlcigpO1xuXG4gIC8vIFNldCB1cCB3aW5cbiAgd2luID0gV2luKCk7XG4gIHdpbi5yZXNldCgpO1xuICB3aW4ucmVuZGVyKCk7XG5cbiAgcmVuZGVyU3BpbkJ1dHRvbigpO1xuXG4gIGNhblNwaW4gPSB0cnVlO1xuICBjYW5OdWRnZSA9IGZhbHNlO1xuICBjYW5Ib2xkID0gZmFsc2U7XG5cbiAgZW5hYmxlU3BpbigpO1xuXG4gIHNwaW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAoY2FuU3Bpbikge1xuICAgICAgY3JlZGl0cy51c2VDcmVkaXQoKTtcbiAgICAgIGNyZWRpdHMucmVuZGVyKCk7XG4gICAgICB3aW5uaW5nUm93cyA9IFtdO1xuICAgICAgZGlzYWJsZU51ZGdlcygpO1xuICAgICAgZGlzYWJsZVNwaW4oKTtcblxuICAgICAgLy8gRGlzYWJsZSBob2xkIGJ1dHRvbnMgdGhhdCBhcmVuJ3QgaGVsZFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWVscy5yZWVsTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIXJlZWxzLnJlZWxMaXN0W2ldLmlzSGVsZCkge1xuICAgICAgICAgIHJlZWxzLnJlZWxMaXN0W2ldLmNhbkhvbGQgPSBmYWxzZTtcbiAgICAgICAgICBob2xkQnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNwaW5UeXBlID0gXCJzcGluXCI7XG4gICAgICBnYW1lU3RhdGVzLmN1cnJlbnRTdGF0ZSA9IGdhbWVTdGF0ZXMuc3BpbjtcbiAgICAgIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgZ2FtZVN0YXRlcy5jdXJyZW50U3RhdGUoKTtcbiAgICB9XG4gIH0pO1xuICBzZWxlY3RfZ2FtZU1vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGlmICh0aGlzLnZhbHVlID09PSBcImZpeGVkXCIpIHtcbiAgICAgIGRpdl9maXhlZE1vZGVPcHRpb25zLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgfSBlbHNlIGlmICh0aGlzLnZhbHVlID09PSBcInJhbmRvbVwiKSB7XG4gICAgICBkaXZfZml4ZWRNb2RlT3B0aW9ucy5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCByZW5kZXJOdWRnZUJ1dHRvbkNvbnRhaW5lciA9ICgpID0+IHtcbiAgbnVkZ2VCdXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBudWRnZUJ1dHRvbkNvbnRhaW5lci5pZCA9IFwibnVkZ2VCdXR0b25zXCI7XG4gIHBsYXlTZWN0aW9uLmFwcGVuZENoaWxkKG51ZGdlQnV0dG9uQ29udGFpbmVyKTtcbn07XG5cbmNvbnN0IHJlbmRlckhvbGRCdXR0b25Db250YWluZXIgPSAoKSA9PiB7XG4gIGhvbGRCdXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBob2xkQnV0dG9uQ29udGFpbmVyLmlkID0gXCJob2xkQnV0dG9uc1wiO1xuICBwbGF5U2VjdGlvbi5hcHBlbmRDaGlsZChob2xkQnV0dG9uQ29udGFpbmVyKTtcbn07XG5cbmNvbnN0IHJlbmRlclNwaW5CdXR0b24gPSAoKSA9PiB7XG4gIHNwaW5CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBzcGluQnV0dG9uLmlkID0gXCJzcGluQnV0dG9uXCI7XG4gIHNwaW5CdXR0b24uY2xhc3NMaXN0LmFkZChcImJ1dHRvblwiKTtcbiAgc3BpbkJ1dHRvbi5pbm5lckhUTUwgPSBcIlNQSU5cIjtcbiAgcGxheVNlY3Rpb24uYXBwZW5kQ2hpbGQoc3BpbkJ1dHRvbik7XG59O1xuXG5jb25zdCByZW5kZXJWaWV3cG9ydENvbnRhaW5lciA9ICgpID0+IHtcbiAgLy8gUmVuZGVyIHZpZXdwb3J0IGNvbnRhaW5lclxuICB2aWV3cG9ydENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHZpZXdwb3J0Q29udGFpbmVyLmlkID0gXCJ2aWV3cG9ydENvbnRhaW5lclwiO1xuICB2aWV3cG9ydENvbnRhaW5lci5zdHlsZS5wYWRkaW5nTGVmdCA9IFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1ggKyBcInB4XCI7XG4gIHZpZXdwb3J0Q29udGFpbmVyLnN0eWxlLnBhZGRpbmdSaWdodCA9IFZJRVdQT1JUX0NPTlRBSU5FUl9QQURESU5HX1ggKyBcInB4XCI7XG4gIHZpZXdwb3J0Q29udGFpbmVyLnN0eWxlLnBhZGRpbmdUb3AgPSBWSUVXUE9SVF9DT05UQUlORVJfUEFERElOR19ZICsgXCJweFwiO1xuICB2aWV3cG9ydENvbnRhaW5lci5zdHlsZS5wYWRkaW5nQm90dG9tID0gVklFV1BPUlRfQ09OVEFJTkVSX1BBRERJTkdfWSArIFwicHhcIjtcbiAgcGxheVNlY3Rpb24uYXBwZW5kQ2hpbGQodmlld3BvcnRDb250YWluZXIpO1xufTtcblxuY29uc3QgcmVuZGVyV2luSW5kaWNhdG9ycyA9ICgpID0+IHtcbiAgLy8gTGVmdCBpbmRpY2F0b3JcbiAgd2luSW5kaWNhdG9yTGVmdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICB3aW5JbmRpY2F0b3JMZWZ0LmNsYXNzTGlzdC5hZGQoXCJ3aW4taW5kaWNhdG9yXCIsIFwibGVmdFwiKTtcbiAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQod2luSW5kaWNhdG9yTGVmdCk7XG4gIC8vIFJpZ2h0IGluZGljYXRvclxuICB3aW5JbmRpY2F0b3JSaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICB3aW5JbmRpY2F0b3JSaWdodC5jbGFzc0xpc3QuYWRkKFwid2luLWluZGljYXRvclwiLCBcInJpZ2h0XCIpO1xuICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZCh3aW5JbmRpY2F0b3JSaWdodCk7XG5cbiAgLy8gQ2VudHJlIGxpbmVcbiAgd2luSW5kaWNhdG9yQ2VudHJlTGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHdpbkluZGljYXRvckNlbnRyZUxpbmUuY2xhc3NMaXN0LmFkZChcIndpbi1pbmRpY2F0b3ItY2VudHJlLWxpbmVcIik7XG5cbiAgd2luSW5kaWNhdG9yQ2VudHJlTGluZS5zdHlsZS5sZWZ0ID0gd2luSW5kaWNhdG9yTGVmdC5vZmZzZXRXaWR0aCArIFwicHhcIjtcblxuICB3aW5JbmRpY2F0b3JDZW50cmVMaW5lLnN0eWxlLndpZHRoID1cbiAgICB2aWV3cG9ydENvbnRhaW5lci5vZmZzZXRXaWR0aCAtXG4gICAgd2luSW5kaWNhdG9yTGVmdC5vZmZzZXRXaWR0aCAtXG4gICAgd2luSW5kaWNhdG9yUmlnaHQub2Zmc2V0V2lkdGggK1xuICAgIFwicHhcIjtcblxuICB2aWV3cG9ydENvbnRhaW5lci5hcHBlbmRDaGlsZCh3aW5JbmRpY2F0b3JDZW50cmVMaW5lKTtcblxuICAvLyBUb3AgbGluZVxuICB3aW5JbmRpY2F0b3JUb3BMaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgd2luSW5kaWNhdG9yVG9wTGluZS5jbGFzc0xpc3QuYWRkKFwid2luLWluZGljYXRvci10b3AtbGluZVwiKTtcblxuICB3aW5JbmRpY2F0b3JUb3BMaW5lLnN0eWxlLmxlZnQgPSB3aW5JbmRpY2F0b3JMZWZ0Lm9mZnNldFdpZHRoICsgXCJweFwiO1xuXG4gIHdpbkluZGljYXRvclRvcExpbmUuc3R5bGUud2lkdGggPVxuICAgIHZpZXdwb3J0Q29udGFpbmVyLm9mZnNldFdpZHRoIC1cbiAgICB3aW5JbmRpY2F0b3JMZWZ0Lm9mZnNldFdpZHRoIC1cbiAgICB3aW5JbmRpY2F0b3JSaWdodC5vZmZzZXRXaWR0aCArXG4gICAgXCJweFwiO1xuXG4gIHZpZXdwb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHdpbkluZGljYXRvclRvcExpbmUpO1xuXG4gIC8vIEJvdHRvbSBsaW5lXG4gIHdpbkluZGljYXRvckJvdHRvbUxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB3aW5JbmRpY2F0b3JCb3R0b21MaW5lLmNsYXNzTGlzdC5hZGQoXCJ3aW4taW5kaWNhdG9yLWJvdHRvbS1saW5lXCIpO1xuXG4gIHdpbkluZGljYXRvckJvdHRvbUxpbmUuc3R5bGUubGVmdCA9IHdpbkluZGljYXRvckxlZnQub2Zmc2V0V2lkdGggKyBcInB4XCI7XG5cbiAgd2luSW5kaWNhdG9yQm90dG9tTGluZS5zdHlsZS53aWR0aCA9XG4gICAgdmlld3BvcnRDb250YWluZXIub2Zmc2V0V2lkdGggLVxuICAgIHdpbkluZGljYXRvckxlZnQub2Zmc2V0V2lkdGggLVxuICAgIHdpbkluZGljYXRvclJpZ2h0Lm9mZnNldFdpZHRoICtcbiAgICBcInB4XCI7XG5cbiAgdmlld3BvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQod2luSW5kaWNhdG9yQm90dG9tTGluZSk7XG59O1xuXG5jb25zdCBsb29wID0gKGN1cnJlbnRUaW1lKSA9PiB7XG4gIGdhbWVMb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApOyAvLyBOZWVkcyB0byBnbyBiZWZvcmUgbGluZSBiZWxvdyB0byBrZWVwIGFuaW1hdGlvbmZyYW1laWQgdXAgdG8gZGF0ZVxuICBnYW1lU3RhdGVzLmN1cnJlbnRTdGF0ZShjdXJyZW50VGltZSk7XG59O1xuXG5jb25zdCBtb3ZlUmVlbHMgPSAoKSA9PiB7XG4gIHJlZWxzLm1vdmUoKTtcbn07XG5cbmNvbnN0IHJlbmRlciA9ICgpID0+IHtcbiAgdmlld3BvcnQuY2xlYXIoKTtcbiAgcmVlbHMucmVuZGVyKCk7XG5cbiAgLy8gRGlnaXRzXG4gIG51ZGdlcy5yZW5kZXIoKTtcbiAgY3JlZGl0cy5yZW5kZXIoKTtcbiAgd2luLnJlbmRlcigpO1xufTtcblxuLy8gQ2FsY3VsYXRlcyB3aW4gYW1vdW50LCBpZiB3aW5uaW5nIGxpbmVcbmNvbnN0IGNoZWNrV2luID0gKCkgPT4ge1xuICBsZXQgc3BpblJlc3VsdCA9IFtdOyAvLyBBcnJheSBvZiByZWVsIHJlc3VsdHMgYWZ0ZXIgc3BpbiAoYWxsIHRocmVlIHZpc2libGUgb2JqZWN0cyBvZiBlYWNoIHJlZWwpXG4gIGxldCByZWVsUmVzdWx0OyAvLyBJbmRpdmlkdWFsIHJlZWwgcmVzdWx0LCBtYWRlIG9mIHRocmVlIG9iamVjdHMgKHZpc2libGUpXG5cbiAgLy8gQ2hlY2sgZm9yIHdpblxuICByZWVscy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsLCBpbmRleCkgPT4ge1xuICAgIHJlZWxSZXN1bHQgPSBbXTsgLy8gUmVzdWx0IG9mIGluZGl2aWR1YWwgcmVlbFxuXG4gICAgcmVlbFJlc3VsdC5wdXNoKHJlZWxzLnJlZWxMaXN0W2luZGV4XS5yZWVsSXRlbXNbMF0pO1xuICAgIHJlZWxSZXN1bHQucHVzaChyZWVscy5yZWVsTGlzdFtpbmRleF0ucmVlbEl0ZW1zWzFdKTtcbiAgICByZWVsUmVzdWx0LnB1c2gocmVlbHMucmVlbExpc3RbaW5kZXhdLnJlZWxJdGVtc1syXSk7XG5cbiAgICBzcGluUmVzdWx0LnB1c2gocmVlbFJlc3VsdCk7XG4gIH0pO1xuICBjb25zb2xlLmxvZyhcIlNQSU5SRVNVTFRcIiwgc3BpblJlc3VsdCk7XG4gIGxldCByZXN1bHQgPSBnZXRBbGxSb3dSZXN1bHRzKHNwaW5SZXN1bHQpO1xuICBsZXQgY3VycmVudFdpbkFtb3VudCA9IDA7XG5cbiAgLy8gQWxsIHRoZSBwb3NzaWJsZSB3aW5uaW5nIHBvc3NpYmlsaXRpZXMgYW5kIGl0cyBwcml6ZXNcbiAgdmFyIHdpbm5pbmdDYXNlID0ge1xuICAgIHRvcDoge1xuICAgICAgY2hlcnJ5OiB7XG4gICAgICAgIHZhbGlkYXRlOiAvNHszfS8udGVzdChyZXN1bHRbXCJ0b3BcIl0pLFxuICAgICAgICB2YWx1ZTogMjAwMCxcbiAgICAgIH0sXG4gICAgICBcIjdcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzN7M30vLnRlc3QocmVzdWx0W1widG9wXCJdKSxcbiAgICAgICAgdmFsdWU6IDE1MCxcbiAgICAgIH0sXG4gICAgICBjaGVycnlPcjc6IHtcbiAgICAgICAgdmFsaWRhdGU6IC9bNC8zXXszfS8udGVzdChyZXN1bHRbXCJ0b3BcIl0pLFxuICAgICAgICB2YWx1ZTogNzUsXG4gICAgICB9LFxuICAgICAgXCIzeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMHszfS8udGVzdChyZXN1bHRbXCJ0b3BcIl0pLFxuICAgICAgICB2YWx1ZTogNTAsXG4gICAgICB9LFxuICAgICAgXCIyeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMnszfS8udGVzdChyZXN1bHRbXCJ0b3BcIl0pLFxuICAgICAgICB2YWx1ZTogMjAsXG4gICAgICB9LFxuICAgICAgXCIxeEJhclwiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvMXszfS8udGVzdChyZXN1bHRbXCJ0b3BcIl0pLFxuICAgICAgICB2YWx1ZTogMTAsXG4gICAgICB9LFxuICAgICAgYW55QmFyOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvWzAxMl17M30vLnRlc3QocmVzdWx0W1widG9wXCJdKSxcbiAgICAgICAgdmFsdWU6IDUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgbWlkZGxlOiB7XG4gICAgICBjaGVycnk6IHtcbiAgICAgICAgdmFsaWRhdGU6IC80ezN9Ly50ZXN0KHJlc3VsdFtcIm1pZGRsZVwiXSksXG4gICAgICAgIHZhbHVlOiAxMDAwLFxuICAgICAgfSxcbiAgICAgIFwiN1wiOiB7XG4gICAgICAgIHZhbGlkYXRlOiAvM3szfS8udGVzdChyZXN1bHRbXCJtaWRkbGVcIl0pLFxuICAgICAgICB2YWx1ZTogMTUwLFxuICAgICAgfSxcbiAgICAgIGNoZXJyeU9yNzoge1xuICAgICAgICB2YWxpZGF0ZTogL1s0LzNdezN9Ly50ZXN0KHJlc3VsdFtcIm1pZGRsZVwiXSksXG4gICAgICAgIHZhbHVlOiA3NSxcbiAgICAgIH0sXG4gICAgICBcIjN4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8wezN9Ly50ZXN0KHJlc3VsdFtcIm1pZGRsZVwiXSksXG4gICAgICAgIHZhbHVlOiA1MCxcbiAgICAgIH0sXG4gICAgICBcIjJ4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8yezN9Ly50ZXN0KHJlc3VsdFtcIm1pZGRsZVwiXSksXG4gICAgICAgIHZhbHVlOiAyMCxcbiAgICAgIH0sXG4gICAgICBcIjF4QmFyXCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8xezN9Ly50ZXN0KHJlc3VsdFtcIm1pZGRsZVwiXSksXG4gICAgICAgIHZhbHVlOiAxMCxcbiAgICAgIH0sXG4gICAgICBhbnlCYXI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC9bMDEyXXszfS8udGVzdChyZXN1bHRbXCJtaWRkbGVcIl0pLFxuICAgICAgICB2YWx1ZTogNSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBib3R0b206IHtcbiAgICAgIGNoZXJyeToge1xuICAgICAgICB2YWxpZGF0ZTogLzR7M30vLnRlc3QocmVzdWx0W1wiYm90dG9tXCJdKSxcbiAgICAgICAgdmFsdWU6IDQwMDAsXG4gICAgICB9LFxuICAgICAgXCI3XCI6IHtcbiAgICAgICAgdmFsaWRhdGU6IC8zezN9Ly50ZXN0KHJlc3VsdFtcImJvdHRvbVwiXSksXG4gICAgICAgIHZhbHVlOiAxNTAsXG4gICAgICB9LFxuICAgICAgY2hlcnJ5T3I3OiB7XG4gICAgICAgIHZhbGlkYXRlOiAvWzQvM117M30vLnRlc3QocmVzdWx0W1wiYm90dG9tXCJdKSxcbiAgICAgICAgdmFsdWU6IDc1LFxuICAgICAgfSxcbiAgICAgIFwiM3hCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzB7M30vLnRlc3QocmVzdWx0W1wiYm90dG9tXCJdKSxcbiAgICAgICAgdmFsdWU6IDUwLFxuICAgICAgfSxcbiAgICAgIFwiMnhCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzJ7M30vLnRlc3QocmVzdWx0W1wiYm90dG9tXCJdKSxcbiAgICAgICAgdmFsdWU6IDIwLFxuICAgICAgfSxcbiAgICAgIFwiMXhCYXJcIjoge1xuICAgICAgICB2YWxpZGF0ZTogLzF7M30vLnRlc3QocmVzdWx0W1wiYm90dG9tXCJdKSxcbiAgICAgICAgdmFsdWU6IDEwLFxuICAgICAgfSxcbiAgICAgIGFueUJhcjoge1xuICAgICAgICB2YWxpZGF0ZTogL1swMTJdezN9Ly50ZXN0KHJlc3VsdFtcImJvdHRvbVwiXSksXG4gICAgICAgIHZhbHVlOiA1LFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIC8vIExvb3AgdGhyb3VnaCB0aGUgd2lubmluZyBwb3NzaWJpbGl0aWVzXG4gIC8vIGNhc2Ugd2lubmluZyBkcmF3IHRoZSBsaW5lIGluIHRoZSB3aW5uaW5nIHJvd1xuICAvLyB1cGRhdGUgdGhlIHZpZXcgd2l0aCB0aGUgcHJpemUgdmFsdWVcbiAgZm9yIChsZXQgcm93IGluIHdpbm5pbmdDYXNlKSB7XG4gICAgZm9yIChsZXQgaXRlbSBpbiB3aW5uaW5nQ2FzZVtyb3ddKSB7XG4gICAgICBpZiAod2lubmluZ0Nhc2Vbcm93XVtpdGVtXS52YWxpZGF0ZSkge1xuICAgICAgICBjdXJyZW50V2luQW1vdW50ICs9IHdpbm5pbmdDYXNlW3Jvd11baXRlbV0udmFsdWU7XG5cbiAgICAgICAgd2lubmluZ1Jvd3MucHVzaChyb3cpO1xuICAgICAgICAvLyBCcmVhayBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChjdXJyZW50V2luQW1vdW50KSByZXR1cm4gY3VycmVudFdpbkFtb3VudDtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgZ2V0QWxsUm93UmVzdWx0cyA9IChzcGluUmVzdWx0KSA9PiB7XG4gIGxldCB0b3AgPSBcIlwiLFxuICAgIG1pZGRsZSA9IFwiXCIsXG4gICAgYm90dG9tID0gXCJcIjtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGluUmVzdWx0Lmxlbmd0aCAmJiBzcGluUmVzdWx0Lmxlbmd0aCA9PT0gMzsgaSsrKSB7XG4gICAgdG9wICs9IHNwaW5SZXN1bHRbaV1bMl0uaXRlbU5vLnRvU3RyaW5nKCk7XG4gICAgbWlkZGxlICs9IHNwaW5SZXN1bHRbaV1bMV0uaXRlbU5vLnRvU3RyaW5nKCk7XG4gICAgYm90dG9tICs9IHNwaW5SZXN1bHRbaV1bMF0uaXRlbU5vLnRvU3RyaW5nKCk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICB0b3AsXG4gICAgbWlkZGxlLFxuICAgIGJvdHRvbSxcbiAgfTtcbn07XG5cbi8vIFJhbmRvbWx5IGFzc2lnbiBudWRnZXNcbmNvbnN0IGFzc2lnbk51ZGdlcyA9ICgpID0+IHtcbiAgLy8gUmFuZG9tbHkgYXNzaWduIG51ZGdlc1xuICBjb25zdCBudWRnZVJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51ZGdlQ2hhbmNlICsgMSk7XG5cbiAgLy8gSWYgcmFuZG9tIGNoYW5jZSBpcyBtZXQgdGhlbiBhc3NpZ24gbnVkZ2VzXG4gIGlmIChudWRnZVJhbmRvbSA9PT0gbnVkZ2VDaGFuY2UpIHtcbiAgICBjYW5OdWRnZSA9IHRydWU7XG4gICAgZW5hYmxlTnVkZ2VzKCk7XG4gICAgbnVkZ2VzLm51ZGdlc1JlbWFpbmluZyA9IDU7XG4gICAgbnVkZ2VzLnJlbmRlcigpO1xuICB9IGVsc2UgaWYgKG51ZGdlcy5udWRnZXNSZW1haW5pbmcgPCAxKSB7XG4gICAgLy8gSWYgbm8gbnVkZ2VzIGxlZnQgaW4gYmFua1xuICAgIGNhbk51ZGdlID0gZmFsc2U7XG4gICAgZGlzYWJsZU51ZGdlcygpO1xuICB9XG59O1xuXG4vLyBSYW5kb21seSBhc3NpZ24gaG9sZHNcbmNvbnN0IGFzc2lnbkhvbGRzID0gKCkgPT4ge1xuICBjb25zdCBob2xkUmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaG9sZENoYW5jZSArIDEpO1xuXG4gIC8vIFJhbmRvbWx5IGFzc2lnbiBob2xkcyAoaWYgbm8gbnVkZ2VzIGxlZnQgaW4gYmFuaylcbiAgLy8gQXNzaWduIGhvbGQgaWYgcmFuZG9tIG51bWJlciBtZXQgYW5kIGxhc3Qgc3BpbiB3YXNuJ3QgYSB3aW5cbiAgaWYgKG51ZGdlcy5udWRnZXNSZW1haW5pbmcgPCAxKSB7XG4gICAgaWYgKGhvbGRSYW5kb20gPT09IGhvbGRDaGFuY2UpIHtcbiAgICAgIC8vIENhbiBob2xkXG4gICAgICBjYW5Ib2xkID0gdHJ1ZTtcbiAgICAgIGJ1dHRvblN0eWxlcyhob2xkQnV0dG9uTGlzdCwgXCJhZGRcIiwgXCJhY3RpdmVcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbkhvbGQgPSBmYWxzZTtcbiAgICAgIGJ1dHRvblN0eWxlcyhob2xkQnV0dG9uTGlzdCwgXCJyZW1vdmVcIiwgXCJhY3RpdmVcIik7XG4gICAgICBidXR0b25TdHlsZXMoaG9sZEJ1dHRvbkxpc3QsIFwicmVtb3ZlXCIsIFwiaGVsZFwiKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIEVuYWJsZSBhbGwgbnVkZ2VzXG5jb25zdCBlbmFibGVOdWRnZXMgPSAoKSA9PiB7XG4gIHJlZWxzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcbiAgICAvLyBJZiB0aGUgcmVlbCBpc24ndCBoZWxkXG4gICAgaWYgKCFyZWVsLmlzSGVsZCkge1xuICAgICAgcmVlbC5jYW5OdWRnZSA9IHRydWU7XG4gICAgfVxuICB9KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IG51ZGdlQnV0dG9uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIC8vIElmIHRoZSByZWVsIGlzbid0IGhlbGRcbiAgICBpZiAoIXJlZWxzLnJlZWxMaXN0W2ldLmlzSGVsZCkge1xuICAgICAgbnVkZ2VCdXR0b25MaXN0W2ldLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgfVxuICB9XG5cbiAgbnVkZ2VzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG59O1xuXG4vLyBFbmJhbGUgYWxsIGhvbGRzXG5jb25zdCBlbmFibGVIb2xkcyA9ICgpID0+IHtcbiAgcmVlbHMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgIHJlZWwuY2FuSG9sZCA9IHRydWU7XG4gIH0pO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaG9sZEJ1dHRvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBob2xkQnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICB9XG5cbiAgY2FuaG9sZCA9IHRydWU7XG59O1xuXG4vLyBEaXNhYmxlIGFsbCBudWRnZXNcbmNvbnN0IGRpc2FibGVOdWRnZXMgPSAoKSA9PiB7XG4gIHJlZWxzLnJlZWxMaXN0LmZvckVhY2goKHJlZWwpID0+IHtcbiAgICByZWVsLmNhbk51ZGdlID0gZmFsc2U7XG4gIH0pO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbnVkZ2VCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgbnVkZ2VCdXR0b25MaXN0W2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gIH1cblxuICBudWRnZXMucmVzZXQoKTtcblxuICBjYW5OdWRnZSA9IGZhbHNlO1xuXG4gIG51ZGdlc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xufTtcblxuLy8gRGlzYWJsZSBhbGwgaG9sZHNcbmNvbnN0IGRpc2FibGVIb2xkcyA9ICgpID0+IHtcbiAgcmVlbHMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgIHJlZWwuY2FuSG9sZCA9IGZhbHNlO1xuICAgIHJlZWwuaXNIZWxkID0gZmFsc2U7XG4gICAgaWYgKHJlZWwucnVuVGltZSA8IDEpIHtcbiAgICAgIHJlZWwucmVzZXRSdW50aW1lKCk7XG4gICAgfVxuICB9KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGhvbGRCdXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaG9sZEJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiLCBcImhlbGRcIik7XG4gIH1cblxuICBjYW5Ib2xkID0gZmFsc2U7XG59O1xuXG4vLyBFbmFibGUgc3BpblxuY29uc3QgZW5hYmxlU3BpbiA9ICgpID0+IHtcbiAgc3BpbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICBjYW5TcGluID0gdHJ1ZTtcbn07XG5cbi8vIERpc2JhbGUgc3BpblxuY29uc3QgZGlzYWJsZVNwaW4gPSAoKSA9PiB7XG4gIHNwaW5CdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgY2FuU3BpbiA9IGZhbHNlO1xufTtcblxuLy8gQWRkIG9yIHJlbW92ZSBncm91cCBidXR0b24gc3R5bGVzXG5jb25zdCBidXR0b25TdHlsZXMgPSAoYnV0dG9uTGlzdCwgYWRkUmVtb3ZlLCBjbGFzc05hbWUpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBidXR0b25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFkZFJlbW92ZSA9PT0gXCJhZGRcIikge1xuICAgICAgYnV0dG9uTGlzdFtpXS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIGlmIChhZGRSZW1vdmUgPT09IFwicmVtb3ZlXCIpIHtcbiAgICAgIGJ1dHRvbkxpc3RbaV0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gR2FtZSBzdGF0ZVxuY29uc3QgZ2FtZVN0YXRlcyA9IHtcbiAgY3VycmVudFN0YXRlOiBudWxsLFxuICB3aW5BbW91bnQ6IDAsXG4gIG9sZFdpbkRpc3BsYXk6IDAsIC8vIFdoZW4gbG9vcGluZyB0aHJvdWdoIHdpbiBpbmNyZW1lbnQgLSB0aGlzIGlzIHRoZSBvcmlnaW5hbCBmaWd1cmVcbiAgY3VycmVudFdpbkRpc3BsYXk6IDAsIC8vIFdoZW4gbG9vcGluZyB0aHJvdWdoIHdpbiBhbW91bnQgLSB0aGlzIGlzIHRoZSBuZXcgZmlndXJlXG5cbiAgLy8gUmVndWxhciBzcGluXG4gIHNwaW46IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNwaW5UeXBlID0gXCJzcGluXCI7XG4gICAgZGlzYWJsZVNwaW4oKTtcbiAgICBtb3ZlUmVlbHMoKTtcbiAgICByZW5kZXIoKTtcblxuICAgIC8vIEZpbHRlciByZWVsIHJ1bnRpbWVzIC0gaWYgb25lIGlzIGFib3ZlIHplcm8gdGhlbiBjYXJyeSBvblxuICAgIHJlZWxzUnVubmluZyA9IHJlZWxzLnJlZWxMaXN0LmZpbHRlcigocmVlbCkgPT4ge1xuICAgICAgcmV0dXJuIHJlZWwucnVuVGltZSA+IDA7XG4gICAgfSk7XG5cbiAgICBpZiAoIXJlZWxzUnVubmluZy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5zcGluRmluaXNoZWQ7XG4gICAgfVxuICB9LFxuICAvLyBTcGluIGZpbmlzaGVkXG4gIHNwaW5GaW5pc2hlZDogZnVuY3Rpb24gKGN1cnJlbnRUaW1lKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuXG4gICAgaWYgKG51ZGdlcy5udWRnZXNSZW1haW5pbmcgPCAxKSB7XG4gICAgICBkaXNhYmxlTnVkZ2VzKCk7XG4gICAgICBpZiAoc3BpblR5cGUgIT09IFwibnVkZ2VcIikge1xuICAgICAgICBkaXNhYmxlSG9sZHMoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3Igd2luXG4gICAgY29uc3Qgd2luID0gY2hlY2tXaW4oKTtcblxuICAgIC8vIFdpblxuICAgIGlmICh3aW4pIHtcbiAgICAgIC8vIFJlc2V0IG51ZGdlc1xuICAgICAgbnVkZ2VzLnJlc2V0KCk7XG4gICAgICBjYW5OdWRnZSA9IGZhbHNlO1xuICAgICAgZGlzYWJsZU51ZGdlcygpO1xuICAgICAgZGlzYWJsZUhvbGRzKCk7XG4gICAgICBkaXNhYmxlU3BpbigpO1xuXG4gICAgICBub3cgPSBjdXJyZW50VGltZTtcbiAgICAgIHRoaXMud2luQW1vdW50ID0gd2luO1xuXG4gICAgICByZW5kZXIoKTtcbiAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy53aW47IC8vIFN3aXRjaCB0byB3aW4gYW5pbWF0aW9uIHN0YXRlXG4gICAgICBnYW1lTG9vcCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICB9XG4gICAgLy8gTm8gd2luXG4gICAgZWxzZSB7XG4gICAgICBpZiAoXG4gICAgICAgIG51ZGdlcy5udWRnZXNSZW1haW5pbmcgPCAxICYmXG4gICAgICAgIHNwaW5UeXBlICE9PSBcIm51ZGdlXCIgJiZcbiAgICAgICAgY3JlZGl0cy5jcmVkaXRzUmVtYWluaW5nID4gMFxuICAgICAgKSB7XG4gICAgICAgIC8vIElmIG5vIHdpbm5pbmcgbGluZSB0aGVuIGFzc2lnbiBob2xkcyBhbmQgbnVkZ2VzXG4gICAgICAgIGFzc2lnbkhvbGRzKCk7XG4gICAgICAgIGFzc2lnbk51ZGdlcygpO1xuICAgICAgfVxuXG4gICAgICAvLyBFbmFibGUgc3BpblxuICAgICAgZW5hYmxlU3BpbigpO1xuXG4gICAgICAvLyBDaGVjayBjcmVkaXRzXG4gICAgICBpZiAoY3JlZGl0cy5jcmVkaXRzUmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5nYW1lT3ZlcjtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIC8vIE51ZGdlXG4gIG51ZGdlOiBmdW5jdGlvbiAoY3VycmVudFRpbWUpIHtcbiAgICBsZXQgaXNOdWRnaW5nID0gW107XG4gICAgLy8gSWYgbnVkZ2luZyBzdG9wcGVkLCB0aGVuIGNoYW5nZSBnYW1lc3RhdGUgdG8gc3BpbmZpbmlzaGVkXG4gICAgaXNOdWRnaW5nID0gcmVlbHMucmVlbExpc3QuZmlsdGVyKChyZWVsKSA9PiB7XG4gICAgICByZXR1cm4gcmVlbC5pc051ZGdpbmcgPT09IHRydWU7XG4gICAgfSk7XG5cbiAgICBpZiAoIWlzTnVkZ2luZy5sZW5ndGgpIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcbiAgICAgIHRoaXMuc3BpbkZpbmlzaGVkKGN1cnJlbnRUaW1lKTtcbiAgICB9XG5cbiAgICBpc051ZGdpbmcuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgICAgcmVlbC5udWRnZSgpO1xuICAgICAgcmVuZGVyKCk7XG4gICAgfSk7XG4gIH0sXG4gIC8vIFdpbiBhbmltYXRpb25cbiAgd2luOiBmdW5jdGlvbiAoY3VycmVudFRpbWUpIHtcbiAgICBpZiAod2lubmluZ1Jvd3MuaW5jbHVkZXMoXCJ0b3BcIikpXG4gICAgICB3aW5JbmRpY2F0b3JUb3BMaW5lLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgaWYgKHdpbm5pbmdSb3dzLmluY2x1ZGVzKFwibWlkZGxlXCIpKVxuICAgICAgd2luSW5kaWNhdG9yQ2VudHJlTGluZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGlmICh3aW5uaW5nUm93cy5pbmNsdWRlcyhcImJvdHRvbVwiKSlcbiAgICAgIHdpbkluZGljYXRvckJvdHRvbUxpbmUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICB3aW5Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcblxuICAgIGRpc2FibGVTcGluKCk7XG4gICAgZGlzYWJsZUhvbGRzKCk7XG5cbiAgICBpZiAoY3VycmVudFRpbWUgLSBub3cgPiAxKSB7XG4gICAgICBub3cgPSBjdXJyZW50VGltZTtcbiAgICAgIHRoaXMuY3VycmVudFdpbkRpc3BsYXkgKz0gMTA7XG4gICAgICB3aW4uY3VycmVudFdpbiA9IHRoaXMud2luQW1vdW50O1xuICAgICAgd2luLnJlbmRlcigpO1xuXG4gICAgICBpZiAodGhpcy5jdXJyZW50V2luRGlzcGxheSAtIHRoaXMub2xkV2luRGlzcGxheSA+PSB0aGlzLndpbkFtb3VudCkge1xuICAgICAgICAvLyBGaW5pc2hlZCBsb29waW5nXG4gICAgICAgIGNyZWRpdHMuYWRkQ3JlZGl0KHRoaXMud2luQW1vdW50KTtcbiAgICAgICAgY3JlZGl0cy5yZW5kZXIoKTtcbiAgICAgICAgdGhpcy5vbGRXaW5EaXNwbGF5ID0gdGhpcy5jdXJyZW50V2luRGlzcGxheTtcbiAgICAgICAgd2luLnJlc2V0KCk7XG4gICAgICAgIHdpbi5yZW5kZXIoKTtcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuICAgICAgICBlbmFibGVTcGluKCk7XG4gICAgICAgIHdpbkNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICB2aWV3cG9ydENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICB3aW5JbmRpY2F0b3JMZWZ0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIHdpbkluZGljYXRvclJpZ2h0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgIHdpbkluZGljYXRvclRvcExpbmUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgd2luSW5kaWNhdG9yQ2VudHJlTGluZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICB3aW5JbmRpY2F0b3JCb3R0b21MaW5lLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG5cbiAgICAgICAgLy8gQ2hlY2sgY3JlZGl0c1xuICAgICAgICBpZiAoY3JlZGl0cy5jcmVkaXRzUmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLmdhbWVPdmVyO1xuICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIC8vIEdhbWUgb3ZlciAtIGNyZWRpdHMgcmFuIG91dFxuICBnYW1lT3ZlcjogZnVuY3Rpb24gKCkge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcbiAgICBkaXNhYmxlU3BpbigpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHBsYXlTZWN0aW9uKTtcblxuICAgICAgZGlzYWJsZU51ZGdlcygpO1xuICAgICAgZGlzYWJsZUhvbGRzKCk7XG5cbiAgICAgIHJlbmRlckdhbWVPdmVyU2VjdGlvbigpO1xuXG4gICAgICB0aGlzLndpbkFtb3VudCA9IDA7XG4gICAgICB0aGlzLm9sZFdpbkRpc3BsYXkgPSAwO1xuICAgICAgdGhpcy5jdXJyZW50V2luRGlzcGxheSA9IDA7XG4gICAgfSwgMTAwMCk7XG4gIH0sXG59O1xuXG5jb25zdCByZW5kZXJHYW1lT3ZlclNlY3Rpb24gPSAoKSA9PiB7XG4gIGNvbnN0IGdhbWVPdmVyU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGdhbWVPdmVyU2VjdGlvbi5pZCA9IFwiZ2FtZU92ZXJTZWN0aW9uXCI7XG5cbiAgZ2FtZU92ZXJTZWN0aW9uLmlubmVySFRNTCA9IFwiPGRpdj5cIjtcbiAgZ2FtZU92ZXJTZWN0aW9uLmlubmVySFRNTCArPSBcIjxwPkdhbWUgb3ZlcjwvcD5cIjtcbiAgZ2FtZU92ZXJTZWN0aW9uLmlubmVySFRNTCArPSBcIjxwPllvdSB3b24gXCIgKyB3aW4uY3VycmVudFdpbiArIFwiIGNyZWRpdHNcIjtcbiAgZ2FtZU92ZXJTZWN0aW9uLmlubmVySFRNTCArPSBcIjxwPlByZXNzIHN0YXJ0IHRvIHBsYXkgYWdhaW48L3A+XCI7XG4gIGdhbWVPdmVyU2VjdGlvbi5pbm5lckhUTUwgKz0gXCI8L2Rpdj5cIjtcblxuICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHN0YXJ0QnV0dG9uLmlkID0gXCJzdGFydEJ1dHRvblwiO1xuICBzdGFydEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uXCIpO1xuICBzdGFydEJ1dHRvbi5pbm5lclRleHQgPSBcIlNUQVJUXCI7XG5cbiAgZ2FtZU92ZXJTZWN0aW9uLmFwcGVuZENoaWxkKHN0YXJ0QnV0dG9uKTtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGdhbWVPdmVyU2VjdGlvbik7XG5cbiAgc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGdhbWVPdmVyU2VjdGlvbik7XG5cbiAgICBwbGF5U2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcGxheVNlY3Rpb24uaWQgPSBcInBsYXlTZWN0aW9uXCI7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwbGF5U2VjdGlvbik7XG5cbiAgICBpbml0KCk7XG4gIH0pO1xufTtcblxuLy8gUHJlbG9hZCBpbWFnZXMgdGhlbiBzdGFydCBnYW1lXG52YXIgbG9hZGVkID0gMDtcbnZhciBpbWFnZUxpc3QgPSBbXTtcbmxldCBpbWc7XG5cbklURU1fSU5GTy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gIGltZyA9IG5ldyBJbWFnZSgpO1xuICBpbWcuc3JjID0gXCIuL2ltZy9cIiArIGl0ZW0uaW1hZ2VTcmM7XG4gIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgbG9hZGVkKys7XG4gICAgaWYgKGxvYWRlZCA9PT0gSVRFTV9JTkZPLmxlbmd0aCkgaW5pdCgpO1xuICB9O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB2aWV3cG9ydCA9ICgpID0+IHtcbiAgICBjb25zdCBuZXdWaWV3cG9ydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIG5ld1ZpZXdwb3J0LndpZHRoID0gVklFV1BPUlRfV0lEVEg7XG4gICAgbmV3Vmlld3BvcnQuaGVpZ2h0ID0gVklFV1BPUlRfSEVJR0hUO1xuICAgIG5ld1ZpZXdwb3J0LmlkID0gXCJ2aWV3cG9ydFwiO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdmlld3BvcnQ6IG5ld1ZpZXdwb3J0LFxuICAgICAgICB3aWR0aDogVklFV1BPUlRfV0lEVEgsXG4gICAgICAgIGhlaWdodDogVklFV1BPUlRfSEVJR0hULFxuICAgICAgICBjdHg6IG5ld1ZpZXdwb3J0LmdldENvbnRleHQoJzJkJyksXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3Qgdmlld3BvcnRDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld3BvcnRDb250YWluZXInKTtcbiAgICAgICAgICAgIHZpZXdwb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMudmlld3BvcnQpO1xuICAgICAgICB9LFxuICAgICAgICBjbGVhcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHZpZXdwb3J0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy92aWV3cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHJlZWwgZnJvbSBcIi4vcmVlbFwiO1xuXG5jb25zdCByZWVscyA9ICgpID0+IHtcbiAgbGV0IG5ld1JlZWw7XG4gIHJldHVybiB7XG4gICAgcmVlbExpc3Q6IFtdLFxuICAgIGJ1aWxkOiBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5PX1JFRUxTOyBpKyspIHtcbiAgICAgICAgbmV3UmVlbCA9IHJlZWwoaSk7XG4gICAgICAgIG5ld1JlZWwuYnVpbGQoKTtcbiAgICAgICAgdGhpcy5yZWVsTGlzdC5wdXNoKG5ld1JlZWwpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5yZWVsTGlzdC5mb3JFYWNoKChyZWVsKSA9PiB7XG4gICAgICAgIGlmIChyZWVsLnJ1blRpbWUgPiAwICYmICFyZWVsLmlzSGVsZCkge1xuICAgICAgICAgIHJlZWwubW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHJlc2V0UnVudGltZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgICAgICByZWVsLnJlc2V0UnVudGltZSgpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucmVlbExpc3QuZm9yRWFjaCgocmVlbCkgPT4ge1xuICAgICAgICByZWVsLnJlbmRlcigpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlZWxzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL3JlZWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHJlZWxJdGVtIGZyb20gXCIuL3JlZWxJdGVtXCI7XG5cbmNvbnN0IG1vdmVBcnJheUl0ZW1Ub05ld0luZGV4ID0gKGFyciwgb2xkX2luZGV4LCBuZXdfaW5kZXgpID0+IHtcbiAgd2hpbGUgKG9sZF9pbmRleCA8IDApIHtcbiAgICBvbGRfaW5kZXggKz0gYXJyLmxlbmd0aDtcbiAgfVxuICB3aGlsZSAobmV3X2luZGV4IDwgMCkge1xuICAgIG5ld19pbmRleCArPSBhcnIubGVuZ3RoO1xuICB9XG4gIGlmIChuZXdfaW5kZXggPj0gYXJyLmxlbmd0aCkge1xuICAgIHZhciBrID0gbmV3X2luZGV4IC0gYXJyLmxlbmd0aCArIDE7XG4gICAgd2hpbGUgKGstLSkge1xuICAgICAgYXJyLnB1c2godW5kZWZpbmVkKTtcbiAgICB9XG4gIH1cbiAgYXJyLnNwbGljZShuZXdfaW5kZXgsIDAsIGFyci5zcGxpY2Uob2xkX2luZGV4LCAxKVswXSk7XG4gIGNvbnNvbGUubG9nKFwiTkVXIEFSUlwiLCBhcnIpO1xufTtcblxuY29uc3QgcmVlbCA9IChyZWVsTm8pID0+IHtcbiAgbGV0IGZpcnN0SXRlbTtcbiAgbGV0IGxhc3RJdGVtO1xuICBsZXQgbnVkZ2VDYWxsVGltZXM7XG5cbiAgY29uc3QgU0VMRUNUX0dBTUVfTU9ERSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZS1tb2RlXCIpO1xuICBjb25zdCBTRUxFQ1RfSVRFTV9TRUxFQ1RPUiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXRlbS1zZWxlY3RvclwiKTtcbiAgY29uc3QgU0VMRUNUX1JPV19TRUxFQ1RPUiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm93LXNlbGVjdG9yXCIpO1xuXG4gIHJldHVybiB7XG4gICAgbm9PZkl0ZW1zOiBOT19JVEVNUyxcbiAgICBpdGVtTGlzdDogSVRFTV9MSVNULFxuICAgIHJlZWxTcGVlZDogUkVFTF9TUEVFRCxcbiAgICBudWRnZVNwZWVkOiAxMCxcbiAgICBydW5UaW1lOiBSRUVMX1NQRUVEICogMTAgKyAyMCAqIHJlZWxObywgLy8gQXJiaXRyYXJ5IHZhbHVlcyBmb3IgdGVzdGluZ1xuICAgIGNhbkhvbGQ6IGZhbHNlLFxuICAgIGlzSGVsZDogZmFsc2UsXG4gICAgY2FuTnVkZ2U6IGZhbHNlLFxuICAgIGlzTnVkZ2luZzogZmFsc2UsXG4gICAgbnVkZ2VGcmFtZXM6IElURU1fSEVJR0hUIC8gTlVER0VfU1BFRUQsXG4gICAgbnVkZ2VGcmFtZTogMCxcbiAgICByZWVsSXRlbXM6IFtdLFxuICAgIHJlZWxObyxcbiAgICBidWlsZDogZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGl0ZW1ObyA9IDA7XG4gICAgICBsZXQgdHlwZTtcbiAgICAgIGxldCBpbnN0YW5jZXM7XG4gICAgICBsZXQgaW1hZ2VTcmM7XG4gICAgICBsZXQgd2luQW1vdW50O1xuICAgICAgbGV0IHg7XG4gICAgICBsZXQgeTtcbiAgICAgIGxldCBuZXdSZWVsSXRlbTtcblxuICAgICAgSVRFTV9JTkZPLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIHR5cGUgPSBpdGVtLnR5cGU7XG4gICAgICAgIGluc3RhbmNlcyA9IGl0ZW0uaW5zdGFuY2VzO1xuICAgICAgICBpbWFnZVNyYyA9IGl0ZW0uaW1hZ2VTcmM7XG4gICAgICAgIHdpbkFtb3VudCA9IGl0ZW0ud2luQW1vdW50O1xuXG4gICAgICAgIC8vIEFkZCByZXF1aXJlZCBubyBvZiBpbnN0YW5jZXMgb2YgdGhpcyBpdGVtIHRvIHRoZSByZWVsSXRlbXMgYXJyYXlcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnN0YW5jZXM7IGkrKykge1xuICAgICAgICAgIHggPVxuICAgICAgICAgICAgVklFV1BPUlRfWCArIHRoaXMucmVlbE5vICogUkVFTF9XSURUSCArIHRoaXMucmVlbE5vICogUkVFTF9TUEFDSU5HO1xuXG4gICAgICAgICAgeSA9IFZJRVdQT1JUX1kgLSBJVEVNX0hFSUdIVCAtIElURU1fSEVJR0hUICogaXRlbU5vIC0gMTAwO1xuXG4gICAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgaW1nLnNyYyA9IFwiLi9pbWcvXCIgKyBpdGVtLmltYWdlU3JjO1xuXG4gICAgICAgICAgbmV3UmVlbEl0ZW0gPSByZWVsSXRlbSh0eXBlLCBpdGVtTm8sIGltZywgeCwgeSwgd2luQW1vdW50KTtcbiAgICAgICAgICB0aGlzLnJlZWxJdGVtcy5wdXNoKG5ld1JlZWxJdGVtKTtcbiAgICAgICAgICBpdGVtTm8rKztcbiAgICAgICAgICAvLyB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNodWZmbGUoKTtcbiAgICAgIHRoaXMucmVzZXRDb29yZHMoKTtcbiAgICB9LFxuICAgIHNodWZmbGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBybmQ7XG4gICAgICBsZXQgdGVtcDtcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLnJlZWxJdGVtcy5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIHJuZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgICB0ZW1wID0gdGhpcy5yZWVsSXRlbXNbaV07XG4gICAgICAgIHRoaXMucmVlbEl0ZW1zW2ldID0gdGhpcy5yZWVsSXRlbXNbcm5kXTtcbiAgICAgICAgdGhpcy5yZWVsSXRlbXNbcm5kXSA9IHRlbXA7XG4gICAgICB9XG4gICAgfSxcbiAgICBudWRnZTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5yZWVsSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLm51ZGdlKCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zaGlmdCgpO1xuXG4gICAgICB0aGlzLm51ZGdlRnJhbWUrKztcblxuICAgICAgaWYgKHRoaXMubnVkZ2VGcmFtZSA+PSB0aGlzLm51ZGdlRnJhbWVzKSB7XG4gICAgICAgIHRoaXMuaXNOdWRnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubnVkZ2VGcmFtZSA9IDA7XG4gICAgICB9XG4gICAgfSxcbiAgICByZXNldENvb3JkczogZnVuY3Rpb24gKCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJlZWxJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnJlZWxJdGVtc1tpXS55ID1cbiAgICAgICAgICBWSUVXUE9SVF9ZICsgVklFV1BPUlRfSEVJR0hUIC0gSVRFTV9IRUlHSFQgLSBJVEVNX0hFSUdIVCAqIGk7XG4gICAgICB9XG4gICAgfSxcbiAgICByZXNldFJ1bnRpbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghdGhpcy5pc0hlbGQpIHtcbiAgICAgICAgdGhpcy5ydW5UaW1lID0gUkVFTF9TUEVFRCAqIDEwICsgMjAgKiByZWVsTm87IC8vIEFyYml0cmFyeSB2YWx1ZXMgZm9yIHRlc3Rpbmc7XG4gICAgICB9XG4gICAgfSxcbiAgICBzaGlmdDogZnVuY3Rpb24gKCkge1xuICAgICAgLy8gSWYgYm90dG9tIHJlZWwgaXRlbSBnZXRzIGJlbG93IGJvdHRvbSBvZiB2aWV3cG9ydCB0aGVuIG1vdmUgaXQgdG8gYmVnaW5uaW5nIG9mIGFycmF5XG4gICAgICBpZiAodGhpcy5yZWVsSXRlbXNbMF0ueSA+PSBWSUVXUE9SVF9ZICsgVklFV1BPUlRfSEVJR0hUKSB7XG4gICAgICAgIGZpcnN0SXRlbSA9IHRoaXMucmVlbEl0ZW1zWzBdO1xuICAgICAgICBsYXN0SXRlbSA9IHRoaXMucmVlbEl0ZW1zW3RoaXMucmVlbEl0ZW1zLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIC8vIFJlc3QgeSBjb29yZHMgZm9yIGl0ZW0gdG8gc2hpZnQgdG8gdG9wIG9mIHJlZWxcbiAgICAgICAgZmlyc3RJdGVtLnkgPSBsYXN0SXRlbS55IC0gSVRFTV9IRUlHSFQ7XG5cbiAgICAgICAgLy8gU2hpZnQgYm90dG9tIGl0ZW0gdG8gdG9wXG4gICAgICAgIHRoaXMucmVlbEl0ZW1zLnB1c2godGhpcy5yZWVsSXRlbXMuc2hpZnQoKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnJlZWxJdGVtcy5mb3JFYWNoKChyZWVsSXRlbSkgPT4ge1xuICAgICAgICByZWVsSXRlbS5tb3ZlKCk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2hpZnQoKTtcbiAgICAgIC8vIFJlZHVjZSByZWVsIHJ1bnRpbWVcbiAgICAgIHRoaXMucnVuVGltZS0tO1xuICAgICAgaWYgKFNFTEVDVF9HQU1FX01PREUudmFsdWUgPT09IFwiZml4ZWRcIiAmJiB0aGlzLnJ1blRpbWUgPT09IDApIHtcbiAgICAgICAgbGV0IHByZXZJbmRleCA9IHRoaXMucmVlbEl0ZW1zLmZpbmRJbmRleChcbiAgICAgICAgICAoaXRlbSkgPT5cbiAgICAgICAgICAgIHBhcnNlSW50KGl0ZW0uaXRlbU5vKSA9PT0gcGFyc2VJbnQoU0VMRUNUX0lURU1fU0VMRUNUT1IudmFsdWUpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG1hcFJvd1RvU3RyaW5nID0ge1xuICAgICAgICAgIHRvcDogMixcbiAgICAgICAgICBtaWRkbGU6IDEsXG4gICAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICB9O1xuICAgICAgICBsZXQgbmV4dEluZGV4ID0gbWFwUm93VG9TdHJpbmdbU0VMRUNUX1JPV19TRUxFQ1RPUi52YWx1ZV07XG4gICAgICAgIGlmIChwcmV2SW5kZXggIT09IG5leHRJbmRleCkge1xuICAgICAgICAgIG1vdmVBcnJheUl0ZW1Ub05ld0luZGV4KHRoaXMucmVlbEl0ZW1zLCBwcmV2SW5kZXgsIG5leHRJbmRleCk7XG4gICAgICAgICAgdGhpcy5yZXNldENvb3JkcygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucmVlbEl0ZW1zLmZvckVhY2goKHJlZWxJdGVtKSA9PiB7XG4gICAgICAgIHJlZWxJdGVtLnJlbmRlcigpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlZWw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvbXBvbmVudHMvcmVlbC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHJlZWxJdGVtID0gKHR5cGUsIGl0ZW1ObywgaW1nLCB4LCB5LCB3aW5BbW91bnQpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlLFxuICAgIGl0ZW1ObyxcbiAgICBpbWcsXG4gICAgeCxcbiAgICB5LFxuICAgIHdpbkFtb3VudCxcbiAgICBzcGVlZDogUkVFTF9TUEVFRCxcbiAgICBudWRnZVNwZWVkOiBOVURHRV9TUEVFRCxcbiAgICBjdHg6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlld3BvcnRcIikuZ2V0Q29udGV4dChcIjJkXCIpLFxuICAgIG1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMueSArPSB0aGlzLnNwZWVkO1xuICAgIH0sXG4gICAgbnVkZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMueSArPSB0aGlzLm51ZGdlU3BlZWQ7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShcbiAgICAgICAgdGhpcy5pbWcsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIElURU1fV0lEVEgsXG4gICAgICAgIElURU1fSEVJR0hULFxuICAgICAgICB0aGlzLngsXG4gICAgICAgIHRoaXMueSxcbiAgICAgICAgSVRFTV9XSURUSCxcbiAgICAgICAgSVRFTV9IRUlHSFRcbiAgICAgICk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHJlZWxJdGVtO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL3JlZWxJdGVtLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGRpZ2l0cyA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBkaWdpdHNTdHJpbmc6IG51bGwsXG4gICAgICAgIGNvbnRhaW5lcjogbnVsbCwgLy8gQ29udGFpbmVyIHRoYXQgaG9sZHMgZGlnaXRDb250YWluZXJzXG4gICAgICAgIGRpZ2l0Q29udGFpbmVyczogbnVsbCwgLy8gTGlzdCBvZiBkaWdpdCBjb250YWluZXJzIHRoYXQgaG9sZCBzaW5nbGUgZGlnaXQgZWFjaFxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIC8vIFNwbGl0IG51bWJlciBpbnRvIHNlcGVyYXRlIGNoYXJhY3RlcnNcbiAgICAgICAgICAgIHRoaXMuZGlnaXRDb250YWluZXJzID0gdGhpcy5jb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGlnaXQtbnVtYmVyJyk7IFxuICAgICAgICAgICAgbGV0IGRpZ2l0SW5kZXg7IC8vIFdoaWNoIGRpZ2l0IGNvbnRhaW5lciB0byBwdXQgbnVtYmVyIGluXG5cbiAgICAgICAgICAgIC8vIFdpcGUgdGhlIGRpZ2l0c1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRpZ2l0Q29udGFpbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlnaXRDb250YWluZXJzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlnaXRDb250YWluZXJzW2ldLmlubmVySFRNTCA9ICc4JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUG9wdWxhdGUgdGhlIGRpZ2l0c1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRpZ2l0c1N0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGRpZ2l0SW5kZXggPSAodGhpcy5kaWdpdENvbnRhaW5lcnMubGVuZ3RoKSAtICh0aGlzLmRpZ2l0c1N0cmluZy5sZW5ndGggLSBpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpZ2l0Q29udGFpbmVyc1tkaWdpdEluZGV4XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpZ2l0Q29udGFpbmVyc1tkaWdpdEluZGV4XS5pbm5lckhUTUwgPSB0aGlzLmRpZ2l0c1N0cmluZ1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBkaWdpdHM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL2RpZ2l0cy5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBkaWdpdHMgZnJvbSBcIi4vZGlnaXRzXCI7XG5cbmNvbnN0IGNyZWRpdHMgPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgY3JlZGl0c1JlbWFpbmluZzogQ1JFRElUUyxcbiAgICBkaWdpdHM6IGRpZ2l0cygpLFxuICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcmVkaXRzXCIpLFxuICAgIGFkZENyZWRpdDogZnVuY3Rpb24gKGFtb3VudCkge1xuICAgICAgdGhpcy5jcmVkaXRzUmVtYWluaW5nICs9IGFtb3VudDtcbiAgICB9LFxuICAgIHVzZUNyZWRpdDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5jcmVkaXRzUmVtYWluaW5nLS07XG4gICAgfSxcbiAgICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5jcmVkaXRzUmVtYWluaW5nID0gQ1JFRElUUztcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5kaWdpdHMuZGlnaXRzU3RyaW5nID0gdGhpcy5jcmVkaXRzUmVtYWluaW5nLnRvU3RyaW5nKCk7XG4gICAgICB0aGlzLmRpZ2l0cy5jb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgIHRoaXMuZGlnaXRzLnJlbmRlcigpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVkaXRzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL2NyZWRpdHMuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgZGlnaXRzIGZyb20gXCIuL2RpZ2l0c1wiO1xuXG5jb25zdCB3aW4gPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgY3VycmVudFdpbjogMCxcbiAgICBkaWdpdHM6IGRpZ2l0cygpLFxuICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5cIiksXG4gICAgYWRkV2luOiBmdW5jdGlvbiAod2luQW1vdW50KSB7XG4gICAgICB0aGlzLmN1cnJlbnRXaW4gPSB3aW5BbW91bnQ7XG4gICAgfSxcbiAgICByZXNldDogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5jdXJyZW50V2luID0gMDtcbiAgICB9LFxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5kaWdpdHMuZGlnaXRzU3RyaW5nID0gdGhpcy5jdXJyZW50V2luLnRvU3RyaW5nKCk7XG4gICAgICB0aGlzLmRpZ2l0cy5jb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgIHRoaXMuZGlnaXRzLnJlbmRlcigpO1xuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCB3aW47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvbXBvbmVudHMvd2luLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBob2xkQnV0dG9uIGZyb20gJy4vaG9sZEJ1dHRvbic7XG5cbmNvbnN0IGhvbGRCdXR0b25zID0gKCkgPT4ge1xuICAgIGxldCBuZXdCdXR0b247XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBidXR0b25MaXN0OiBbXSxcbiAgICAgICAgYnVpbGQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTk9fUkVFTFM7IGkrKykge1xuICAgICAgICAgICAgICAgIG5ld0J1dHRvbiA9IGhvbGRCdXR0b24oaSk7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25MaXN0LnB1c2gobmV3QnV0dG9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbkxpc3QuZm9yRWFjaCgoYnRuLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGJ0bi5yZW5kZXIoaW5kZXgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaG9sZEJ1dHRvbnM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL2hvbGRCdXR0b25zLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGhvbGRCdXR0b24gPSAoaW5kZXgpID0+IHtcbiAgICBsZXQgaG9sZEJ1dHRvbjtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvbGRCdXR0b25zJyksXG4gICAgICAgIHJlZWxObzogaW5kZXgsXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaG9sZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgaG9sZEJ1dHRvbi5pbm5lckhUTUwgPSAnSE9MRCc7XG4gICAgICAgICAgICBob2xkQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hvbGQtYnV0dG9uJywgJ2J1dHRvbicpO1xuICAgICAgICAgICAgaG9sZEJ1dHRvbi5zdHlsZS53aWR0aCA9IEJVVFRPTl9XSURUSCArICdweCc7XG4gICAgICAgICAgICBob2xkQnV0dG9uLnN0eWxlLm1hcmdpbkxlZnQgPSAoUkVFTF9TUEFDSU5HIC8gMikgKyAoKFJFRUxfV0lEVEggLSBCVVRUT05fV0lEVEgpIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgaG9sZEJ1dHRvbi5zdHlsZS5tYXJnaW5SaWdodCA9IChSRUVMX1NQQUNJTkcgLyAyKSArICgoUkVFTF9XSURUSCAtIEJVVFRPTl9XSURUSCkgLyAyKSArICdweCc7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChob2xkQnV0dG9uKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBob2xkQnV0dG9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy9ob2xkQnV0dG9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBudWRnZUJ1dHRvbiBmcm9tICcuL251ZGdlQnV0dG9uJztcblxuY29uc3QgbnVkZ2VCdXR0b25zID0gKCkgPT4ge1xuICAgIGxldCBuZXdCdXR0b247XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBidXR0b25MaXN0OiBbXSxcbiAgICAgICAgYnVpbGQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOT19SRUVMUzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbmV3QnV0dG9uID0gbnVkZ2VCdXR0b24oaSk7XG4gICAgICAgICAgICAgICAgdGhpcy5idXR0b25MaXN0LnB1c2gobmV3QnV0dG9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uTGlzdC5mb3JFYWNoKChidG4sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgYnRuLnJlbmRlcihpbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBudWRnZUJ1dHRvbnM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL251ZGdlQnV0dG9ucy5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBudWRnZUJ1dHRvbiA9IChpbmRleCkgPT4ge1xuICAgIGxldCBudWRnZUJ1dHRvbjtcbiAgICBsZXQgbnVkZ2VCdXR0b25Db250YWluZXI7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdudWRnZUJ1dHRvbnMnKSxcbiAgICAgICAgcmVlbE5vOiBpbmRleCxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBudWRnZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgbnVkZ2VCdXR0b24uaW5uZXJIVE1MID0gJ05VREdFJztcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ251ZGdlLWJ1dHRvbicsICdidXR0b24nKTtcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uLnN0eWxlLndpZHRoID0gQlVUVE9OX1dJRFRIICsgJ3B4JztcbiAgICAgICAgICAgIG51ZGdlQnV0dG9uLnN0eWxlLm1hcmdpbkxlZnQgPSAoUkVFTF9TUEFDSU5HIC8gMikgKyAoKFJFRUxfV0lEVEggLSBCVVRUT05fV0lEVEgpIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgbnVkZ2VCdXR0b24uc3R5bGUubWFyZ2luUmlnaHQgPSAoUkVFTF9TUEFDSU5HIC8gMikgKyAoKFJFRUxfV0lEVEggLSBCVVRUT05fV0lEVEgpIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQobnVkZ2VCdXR0b24pO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG51ZGdlQnV0dG9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvY29tcG9uZW50cy9udWRnZUJ1dHRvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZGlnaXRzIGZyb20gJy4vZGlnaXRzJztcblxuY29uc3QgbnVkZ2VzID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIG51ZGdlc1JlbWFpbmluZzogMCxcbiAgICAgICAgZGlnaXRzOiBkaWdpdHMoKSxcbiAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbnVkZ2VzJyksXG4gICAgICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMubnVkZ2VzUmVtYWluaW5nID0gMDtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmRpZ2l0cy5kaWdpdHNTdHJpbmcgPSB0aGlzLm51ZGdlc1JlbWFpbmluZy50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5kaWdpdHMuY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgICAgICAgICB0aGlzLmRpZ2l0cy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBudWRnZXM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9jb21wb25lbnRzL251ZGdlcy5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==