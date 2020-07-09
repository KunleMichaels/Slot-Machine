"use strict";

import digits from "./digits";

const credits = () => {
  return {
    creditsRemaining: CREDITS,
    digits: digits(),
    container: document.getElementById("credits"),
    addCredit: function (amount) {
      this.creditsRemaining += amount;
      if (this.creditsRemaining > 5000) {
        alert(
          "You must checkout $5,000, your balance would be left in your wallet"
        );
        this.creditsRemaining = this.creditsRemaining - 5000;
      }
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

export default credits;
