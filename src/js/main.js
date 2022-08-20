const articleButton = document.querySelector(".article__button");
const closeButton = document.querySelector("#popup-close-button");
const overlay = document.querySelector(".overlay");
const counterSpan = document.querySelector("#counter");


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
    overlay.style.display = "block";
    const howManyTimesPopupWasRendered = getItemFromLS("popup-rendering-counter");
    if (!howManyTimesPopupWasRendered) {
      setItemInLS("popup-rendering-counter", JSON.stringify({ counter: 1 }));
    } else {
      let counter = JSON.parse(howManyTimesPopupWasRendered).counter;
      setItemInLS(
        "popup-rendering-counter",
        JSON.stringify({ counter: ++counter })
      );
  
      if (counter === 5) {
        console.log("Popup renders 5 times");
      }
    }
  };

const handleClickCloseButton = () => {
  overlay.style.display = "none";
};

articleButton.addEventListener("click", showPopup);

closeButton.addEventListener("click", handleClickCloseButton);
