const buttonMan = document.querySelector(".header__button-gender_man");
const buttonWoman = document.querySelector(".header__button-gender_woman");
const svgAll = document.querySelectorAll("svg");
const bodyMy = document.body;
const cardImage = document.querySelector(".card__image");
const cardText = document.querySelector(".card__text");
const buttonText = document.querySelector(".header__button-change_text");
const buttonImage = document.querySelector(".header__button-change_image");

const state = {
  gender: bodyMy.classList.contains("woman") ? "woman" : "man",
};

const getRandomForArr = (arr) => {
  const randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
};

const getData = () => {
  return fetch("db.json").then((response) => response.json());
};

const changeDOM = () => {
  if (state.photo.includes("black")) {
    cardText.style.color = "#fff";
  } else {
    cardText.style.color = "";
  }
  cardImage.src = `img/${state.photo}`;
  cardText.innerHTML = state.text.replaceAll("\n", "<br>");
};

const getDataToCard = () => {
  getData().then((data) => {
    state.text = getRandomForArr(data.text[state.gender]);
    state.photo = getRandomForArr(data.photo[state.gender]);
    changeDOM();
  });
};

const changeToMan = () => {
  if (state.gender !== "man") {
    for (let i = 0; i < svgAll.length; i++) {
      svgAll[i].style.fill = "#1178B2";
    }
    bodyMy.classList.add("man");
    bodyMy.classList.remove("woman");
    state.gender = "man";
    getDataToCard();
  }
};
const changeToWoman = () => {
  if (state.gender !== "woman") {
    for (let i = 0; i < svgAll.length; i++) {
      svgAll[i].style.fill = "#C300C7";
    }
    bodyMy.classList.add("woman");
    bodyMy.classList.remove("man");
    state.gender = "woman";
    getDataToCard();
  }
};

const changeText = () => {
  getData().then((data) => {
    state.text = getRandomForArr(data.text[state.gender]);
    changeDOM();
  });
};

const changeImage = () => {
  getData().then((data) => {
    state.photo = getRandomForArr(data.photo[state.gender]);
    changeDOM();
  });
};

buttonMan.addEventListener("click", changeToMan);
buttonWoman.addEventListener("click", changeToWoman);
buttonText.addEventListener("click", changeText);
buttonImage.addEventListener("click", changeImage);
getDataToCard();
