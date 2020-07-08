"use strict";

import reelItem from "./reelItem";

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

          newReelItem = reelItem(type, itemNo, img, x, y, winAmount);
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
          this.reelItems.forEach((reelItem) => {
            reelItem.render();
          });
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

export default reel;
