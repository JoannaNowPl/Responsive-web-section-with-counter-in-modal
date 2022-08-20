const articleButton = document.querySelector(".article__button");
const closeButton = document.querySelector("#popup-close-button");
const overlay = document.querySelector(".overlay");
const counterSpan = document.querySelector("#counter");
const resetCounterButton = document.querySelector("#reset-counter-button");

const getItemFromLS = (key) => {
  if (window.localStorage) {
    return localStorage.getItem(key);
  } else {
    throw Error("Localstorage is not supported");
  }
};

const setItemInLS = (key, value) => {
  if (window.localStorage) {
    localStorage.setItem(key, value);
  } else {
    throw Error("Localstorage is not supported");
  }
};

const showPopup = () => {
  resetCounterButton.style.visibility = "hidden";
  resetCounterButton.innerHTML = "Reset counter";
  overlay.style.display = "block";

  const howManyTimesPopupWasRendered = getItemFromLS("popup-rendering-counter");
  if (!howManyTimesPopupWasRendered) {
    setItemInLS("popup-rendering-counter", JSON.stringify({ counter: 1 }));
    counterSpan.innerHTML = "1 time";
  } else {
    let counter = JSON.parse(howManyTimesPopupWasRendered).counter;
    setItemInLS(
      "popup-rendering-counter",
      JSON.stringify({ counter: ++counter })
    );
    counterSpan.innerHTML = `${counter} times`;

    if (counter > 5) {
      resetCounterButton.style.visibility = "visible";
    }
  }
};

const closePopup = () => {
  overlay.style.display = "none";
};

const resetCounter = () => {
  setItemInLS("popup-rendering-counter", JSON.stringify({ counter: 0 }));
  resetCounterButton.innerHTML = "Counter reseted";
};

articleButton.addEventListener("click", showPopup);

closeButton.addEventListener("click", closePopup);

overlay.addEventListener("click", (e) => {
  if (e.target.className === "overlay") closePopup();
});

resetCounterButton.addEventListener("click", resetCounter);
