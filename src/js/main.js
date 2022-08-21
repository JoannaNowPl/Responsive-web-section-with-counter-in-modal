const articleButtons = document.querySelectorAll(".article__button");
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

const removeItemFromLS = (key) => {
  if (window.localStorage) {
    localStorage.removeItem(key);
  } else {
    throw Error("Localstorage is not supported");
  }
};

const showPopup = (buttonKey) => {
  resetCounterButton.style.visibility = "hidden";
  resetCounterButton.innerHTML = "Reset counter";
  overlay.style.display = "flex";
  const howManyTimesPopupWasRendered = getItemFromLS(buttonKey);

  if (!howManyTimesPopupWasRendered) {
    setItemInLS(buttonKey, JSON.stringify({ counter: 1 }));
    counterSpan.innerHTML = "1 time";
  } else {
    let counter = JSON.parse(howManyTimesPopupWasRendered).counter;
    setItemInLS(buttonKey, JSON.stringify({ counter: ++counter }));
    counterSpan.innerHTML = `${counter} times`;

    if (counter > 5) {
      resetCounterButton.style.visibility = "visible";
      resetCounterButton.onclick = function () {
        removeItemFromLS(buttonKey);
        resetCounterButton.innerHTML = "Counter reseted";
      };
    }
  }
};

const closePopup = () => {
  overlay.style.display = "none";
};

articleButtons.forEach((el) =>
  el.addEventListener("click", (e) => {
    const buttonKey = e.target.id;
    showPopup(buttonKey);
  })
);

closeButton.addEventListener("click", closePopup);

overlay.addEventListener("click", (e) => {
  if (e.target.className === "overlay") closePopup();
});
