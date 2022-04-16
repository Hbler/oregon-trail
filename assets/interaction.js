//// Imports
import { onScreen } from "./display.js";

//// Functions
/// Verifications + Updates
function updateFoodCounter() {
  const number = document.getElementById("wagon__food-total");
  const hasCapacity = (obj) => obj.capacity;
  const wagon = onScreen[onScreen.findIndex(hasCapacity)];
  const value = wagon.totalFood();

  number.innerText = value;
}

function updateSeatCounter() {
  const number = document.getElementById("wagon__seat-counter");
  const hasCapacity = (obj) => obj.capacity;
  const wagon = onScreen[onScreen.findIndex(hasCapacity)];
  const value = wagon.getAvailableSeatCount();

  number.innerText = value;
}

function updateCurrentPassengers() {
  const list = document.querySelectorAll(".current-passengers");

  list.forEach((e) => {
    const choose = document.createElement("option");
    choose.innerText = "-- Escolha --";
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

function postLog(node, str) {
  const log = node.parentElement.parentElement.childNodes[1];
  const txt = document.createElement("small");

  txt.innerText = str;
  log.appendChild(txt);
}

/// Actions

function boardWagon() {
  const hasCapacity = (obj) => obj.capacity;
  const wagon = onScreen[onScreen.findIndex(hasCapacity)];

  const name = this.parentElement.parentElement.childNodes[0].innerText;
  const nameMatch = (obj) => obj.name === name;
  const instance = onScreen[onScreen.findIndex(nameMatch)];

  if (wagon === undefined) {
    alert("\nCrie uma Caravana primeiro!");
  } else {
    postLog(this, wagon.join(instance));
    updateSeatCounter();
    updateFoodCounter();
    this.disabled = true;
    this.classList.add("disabled");
    console.log(wagon, instance);
  }
}

function eatMyFood() {
  const hasCapacity = (obj) => obj.capacity;
  const wagon = onScreen[onScreen.findIndex(hasCapacity)];

  const name = this.parentElement.parentElement.childNodes[0].innerText;
  const nameMatch = (obj) => obj.name === name;
  const instance = onScreen[onScreen.findIndex(nameMatch)];

  if (wagon === undefined) {
    alert("\nA comida é para a viagem!\nCrie uma Caravana.");
  } else if (
    wagon.passengers.length === 0 ||
    wagon.passengers.findIndex(nameMatch) < 0
  ) {
    alert("\nA comida é para a viagem!\nEmbarque primeiro.");
  } else {
    postLog(this, instance.eat());
    updateFoodCounter();
  }
}

function huntForFood() {
  const hasCapacity = (obj) => obj.capacity;
  const wagon = onScreen[onScreen.findIndex(hasCapacity)];

  const name = this.parentElement.parentElement.childNodes[0].innerText;
  const nameMatch = (obj) => obj.name === name;
  const instance = onScreen[onScreen.findIndex(nameMatch)];

  if (wagon === undefined) {
    alert("\nTemos que sair do vilarejo.\nCrie uma Caravana.");
  } else if (
    wagon.passengers.length === 0 ||
    wagon.passengers.findIndex(nameMatch) < 0
  ) {
    alert("\nTemos que sair do vilarejo.\nEmbarque primeiro.");
  } else {
    postLog(this, instance.hunt());
    updateFoodCounter();
  }
}

function donateFood() {
  const hasCapacity = (obj) => obj.capacity;
  const wagon = onScreen[onScreen.findIndex(hasCapacity)];

  const parent = this.parentElement;
  const donation = document.getElementById("food-qtty").value;
  const select = parent.childNodes[2];
  const who = select.options[select.selectedIndex].text;
  const name = parent.parentElement.parentElement.childNodes[0].innerText;
  const nameMatch = (obj) => obj.name === name;
  const instance = onScreen[onScreen.findIndex(nameMatch)];
  console.log(donation, who);

  if (wagon === undefined) {
    alert("\nA comida é para a viagem!\nCrie uma Caravana.");
  } else if (
    wagon.passengers.length === 0 ||
    wagon.passengers.findIndex(nameMatch) < 0
  ) {
    alert("\nA comida é para a viagem!\nEmbarque primeiro.");
  } else if (donation === "" || who === "-- Escolha --") {
    alert("\nFaltam informações");
  } else {
    const travelerName = (obj) => obj.name === who;
    const traveler = onScreen[onScreen.findIndex(travelerName)];

    if (wagon.passengers.findIndex(travelerName) < 0) {
      postLog(parent, `${who} não embarcou.`);
    } else {
      postLog(parent, instance.giveFood(traveler, +donation));
    }
  }
}

function healTraveler() {
  const hasCapacity = (obj) => obj.capacity;
  const wagon = onScreen[onScreen.findIndex(hasCapacity)];

  const parent = this.parentElement;
  const select = parent.childNodes[1];
  const who = select.options[select.selectedIndex].text;
  const name = parent.parentElement.parentElement.childNodes[0].innerText;
  const nameMatch = (obj) => obj.name === name;
  const instance = onScreen[onScreen.findIndex(nameMatch)];
  console.log(who);

  if (wagon === undefined) {
    alert("\nPrecisamos partir!\nCrie uma Caravana.");
  } else if (
    wagon.passengers.length === 0 ||
    wagon.passengers.findIndex(nameMatch) < 0
  ) {
    alert("\nPrecisamos partir!\nEmbarque primeiro.");
  } else if (who === "-- Escolha --") {
    alert("\nFaltam informações");
  } else {
    const travelerName = (obj) => obj.name === who;
    const traveler = onScreen[onScreen.findIndex(travelerName)];

    if (wagon.passengers.findIndex(travelerName) < 0) {
      postLog(parent, `${who} não embarcou.`);
    } else {
      postLog(parent, instance.heal(traveler));
    }
  }
}
/// Other
function conditionStr(str) {
  const nStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return nStr.toLowerCase();
}

//// Export

export {
  updateFoodCounter,
  updateSeatCounter,
  updateCurrentPassengers,
  boardWagon,
  eatMyFood,
  huntForFood,
  donateFood,
  healTraveler,
  conditionStr,
};
