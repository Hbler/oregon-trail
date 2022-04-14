//// Imports
import { Main } from "./display.js";
import { Wagon } from "./models/Wagon.js";
import { Traveler } from "./models/Traveler.js";
import { Hunter } from "./models/Hunter.js";
import { Doctor } from "./models/Doctor.js";

//// Database
const onScreen = [];

//// Functions
function createWagonSection() {
  const section = document.createElement("section");
  const wagonInput = createWagonInput();
  const foodCounter = creteFoodCounter();
  const seatCounter = createSeatCounter();

  section.classList.add("wagon__section");
  section.append(wagonInput, foodCounter, seatCounter);

  Main.appendChild(section);
}

function createWagonInput() {
  const container = document.createElement("div");
  const icon = document.createElement("img");
  const inputContainer = document.createElement("div");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const btn = document.createElement("button");
  const title = document.createElement("h2");

  icon.src = "./assets/img/covered-wagon.png";
  icon.alt = "covered wagon black icon";
  icon.classList.add("wagon__img");

  label.innerText = "Quantos lugares tem a Caravana? :";
  label.setAttribute("for", "wagon__input");

  input.type = "number";
  input.min = "1";
  input.id = "wagon__input";

  btn.innerText = "Criar";
  btn.id = "wagon__btn";
  btn.addEventListener("click", newWagon);

  inputContainer.append(label, input, btn);
  inputContainer.classList.add("wagon__input-container");

  title.innerText = "A Caravana";
  title.classList.add("wagon__title");
  title.classList.add("clear");

  container.classList.add("wagon__container");
  container.append(icon, inputContainer, title);
  return container;
}

function newWagon() {
  const input = document.getElementById("wagon__input");
  const inputContaniner = document.querySelector(".wagon__input-container");
  const title = document.querySelector(".wagon__title");

  if (input.value === "") {
    let WAGON = new Wagon(4);
    onScreen.push(WAGON);
  } else {
    let WAGON = new Wagon(+input.value);
    onScreen.push(WAGON);
  }

  inputContaniner.classList.toggle("clear");
  title.classList.toggle("clear");
  updateFoodCounter();
  updateSeatCounter();
}

function creteFoodCounter() {
  const container = document.createElement("div");
  const icon = document.createElement("img");
  const info = document.createElement("h3");

  icon.src = "./assets/img/fruits.png";
  icon.alt = "fruit crate black icon";
  icon.classList.add("food-counter__img");

  info.innerHTML =
    'A caravana tem <span id="wagon__food-total">0</span> de comida.';
  info.classList.add("food-counter__info");

  container.classList.add("food-counter__container");
  container.append(icon, info);
  return container;
}

function updateFoodCounter() {
  const number = document.getElementById("wagon__food-total");
  const wagon = onScreen[0];
  const value = wagon.totalFood();

  number.innerText = value;
}

function createSeatCounter() {
  const container = document.createElement("div");
  const number = document.createElement("h2");
  const info = document.createElement("h3");

  number.innerText = "0";
  number.id = "wagon__seat-counter";

  info.innerHTML = "Número de assentos disponíveis:";
  info.classList.add("seat-counter__info");

  container.classList.add("seat-counter__container");
  container.append(number, info);
  return container;
}

function updateSeatCounter() {
  const number = document.getElementById("wagon__seat-counter");
  const wagon = onScreen[0];
  const value = wagon.getAvailableSeatCount();

  number.innerText = value;
}

//// Export

export { createWagonSection };
