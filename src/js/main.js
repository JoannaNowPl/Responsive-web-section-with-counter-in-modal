const popup = document.querySelector(".popup");

const showPopup=() => {
    popup.style.visibility="visible";

}

const sectionButton = document.querySelector("#section1-button");
sectionButton.addEventListener("click", showPopup);

