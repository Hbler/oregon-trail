//// Imports
import { Main } from "./display.js";
import { Wagon } from "./models/Wagon.js";
import { Traveler } from "./models/Traveler.js";
import { Hunter } from "./models/Hunter.js";
import { Doctor } from "./models/Doctor.js";

//// Database
const onScreen = [];
const Instances = [];

//// Functions
/// Wagon Section
function createWagonSection() {
  const section = document.createElement("section");
  const wagonInput = createWagonInput();
  const foodCounter = creteFoodCounter();
  const seatCounter = createSeatCounter();
  const instanceSetup = createInstanceSetup();

  section.classList.add("wagon__section");
  section.append(wagonInput, foodCounter, seatCounter, instanceSetup);

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

  icon.src = "./assets/img/covered-wagon.svg";
  icon.alt = "covered wagon black icon";
  icon.classList.add("wagon__img");

  label.innerText = "Quantos lugares tem a Caravana?";
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

  container.classList.add("card");
  container.classList.add("wagon__container");
  container.append(icon, inputContainer, title);

  return container;
}

function newWagon() {
  const input = document.getElementById("wagon__input");
  const inputContaniner = document.querySelector(".wagon__input-container");
  const title = document.querySelector(".wagon__title");

  if (input.value === "") {
    let wagon = new Wagon(4);
    onScreen.push(wagon);
  } else {
    let wagon = new Wagon(+input.value);
    onScreen.push(wagon);
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

  icon.src = "./assets/img/fruits.svg";
  icon.alt = "fruit crate black icon";
  icon.classList.add("food-counter__img");

  info.innerHTML =
    'A caravana tem <span id="wagon__food-total">0</span> de comida.';
  info.classList.add("food-counter__info");

  container.classList.add("card");
  container.classList.add("food-counter__container");
  container.append(icon, info);

  return container;
}

function updateFoodCounter() {
  const number = document.getElementById("wagon__food-total");
  const hasCapacity = (obj) => obj.capacity;
  const wagon = onScreen[onScreen.findIndex(hasCapacity)];
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

  container.classList.add("card");
  container.classList.add("seat-counter__container");
  container.append(number, info);

  return container;
}

function updateSeatCounter() {
  const number = document.getElementById("wagon__seat-counter");
  const hasCapacity = (obj) => obj.capacity;
  const wagon = onScreen[onScreen.findIndex(hasCapacity)];
  const value = wagon.getAvailableSeatCount();

  number.innerText = value;
}

/// Travelers+ Section
function createPassengersSection() {
  const section = document.createElement("section");

  section.classList.add("passengers__section");

  Main.appendChild(section);
}

function createInstanceSetup() {
  const container = document.createElement("div");
  const title = document.createElement("h3");
  const info = document.createElement("small");
  const options = createOptionsList();
  const name = createNameInput();
  const btn = document.createElement("button");

  title.innerText = "Criar viajante";
  info.innerText = "Selecione a seguir o tipo de viajante e digite o nome.";

  btn.innerText = "Criar";
  btn.id = "new-instance";
  btn.addEventListener("click", newTraveler);

  container.classList.add("card");
  //   container.classList.add("instance");
  container.classList.add("instance__setup");
  container.append(title, info, options, name, btn);

  return container;
}

function createOptionsList() {
  const container = document.createElement("select");
  const label = document.createElement("label");

  const optList = ["-- Escolha --", "Traveler", "Hunter", "Doctor"];
  optList.forEach((opt) => {
    const choose = document.createElement("option");

    choose.innerText = opt;
    choose.value = `${conditionStr(opt)}`;

    container.appendChild(choose);
  });

  label.innerText = "Tipo de viajante";
  label.setAttribute("for", "type-select");

  container.classList.add("instance-options__container");
  container.name = "travelers";
  container.id = "type-select";

  return container;
}

function createNameInput() {
  const container = document.createElement("div");
  const label = document.createElement("label");
  const input = document.createElement("input");

  label.innerText = "Nome do(a) Viajante";
  label.setAttribute("for", "traveler-name");

  input.type = "text";
  input.id = "traveler-name";
  input.name = "traveler-name";
  input.setAttribute("required", "");

  container.classList.add("instance-name__container");
  container.append(label, input);

  return container;
}

function newTraveler() {
  const section = document.querySelector(".passengers__section");
  const type = document.getElementById("type-select");
  const selectedType = type.options[type.selectedIndex].text;
  const input = document.getElementById("traveler-name");
  const name = input.value;

  if (selectedType === "-- Escolha --" || name === "") {
    alert("\nDados Incompletos");
  } else {
    switch (selectedType) {
      case "Hunter":
        let hunter = new Hunter(name);
        hunter.showMe(section);
        onScreen.push(hunter);
        break;
      case "Doctor":
        let doctor = new Doctor("Dr. " + name);
        doctor.showMe(section);
        onScreen.push(doctor);
        break;
      default:
        let traveler = new Traveler(name);
        traveler.showMe(section);
        onScreen.push(traveler);
        break;
    }
  }

  updateCurrentPassengers();
}

function pickImg(type) {
  const img = document.createElement("img");

  switch (type) {
    case "hunter":
      img.src = "./assets/img/rifle.svg";
      break;
    case "doctor":
      img.src = "./assets/img/medic-bag.svg";
      break;
    default:
      img.src = "./assets/img/luggage.svg";
      break;
  }

  return img;
}

function createInputs(type) {
  const container = document.createElement("div");
  const board = document.createElement("button");
  const eat = document.createElement("button");
  const hunt = document.createElement("button");

  board.innerText = "Embarcar";
  // board.addEventListener('click', boardWagon)

  eat.innerText = "Comer";
  // eat.addEventListener('click', eatMyFood)

  hunt.innerText = "Caçar";
  // hunt.addEventListener('click', huntForFood)

  container.append(board, eat, hunt);
  container.classList.add(`${type}__input`);

  if (type === "hunter") {
    const give = hunterInputs(type);
    container.appendChild(give);
  }

  if (type === "doctor") {
    const heal = doctorInputs(type);
    container.appendChild(heal);
  }
  return container;
}

function hunterInputs(type) {
  const container = document.createElement("div");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const choose = document.createElement("option");
  const who = document.createElement("select");
  const give = document.createElement("button");

  label.innerText = "Qtd. / Viajante";
  label.setAttribute("for", "food-qtty");

  input.type = "number";
  input.min = "1";
  input.id = "food-qtty";

  choose.innerText = "-- Escolher --";
  who.appendChild(choose);
  who.classList.add("current-passengers");
  who.id = `${type}-list`;

  give.innerText = "Doar comida";
  //   give.addEventListener('click', giveFood)

  container.append(label, input, who, give);
  container.classList.add(`${type}__input--give`);

  return container;
}

function doctorInputs(type) {
  const container = document.createElement("div");
  const label = document.createElement("label");
  const who = document.createElement("select");
  const choose = document.createElement("option");
  const heal = document.createElement("button");

  label.innerText = "Curar viajante";
  label.setAttribute("for", `${type}-list`);

  choose.innerText = "-- Escolher --";
  who.appendChild(choose);
  who.classList.add("current-passengers");
  who.id = `${type}-list`;

  heal.innerText = "Curar";
  //   give.addEventListener('click', giveFood)

  container.append(label, who, heal);
  container.classList.add(`${type}__input--heal`);

  return container;
}

function updateCurrentPassengers() {
  const list = document.querySelectorAll(".current-passengers");
  console.log(list);

  list.forEach((e) => {
    const choose = document.createElement("option");
    choose.innerText = "-- Escolha --";
    console.log(e);
    e.innerHTML = "";
    e.append(choose);
  });

  onScreen.forEach((obj) => {
    if (obj.name) {
      list.forEach((e) => {
        const option = document.createElement("option");

        option.innerText = obj.name;
        option.value = `${conditionStr(obj.name).split(" ").join("_")}`;
        e.appendChild(option);
      });
    }
  });
}

/// Other
function conditionStr(str) {
  const nStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return nStr.toLowerCase();
}

//// Export

export {
  createWagonSection,
  createPassengersSection,
  pickImg,
  createInputs,
  conditionStr,
};
