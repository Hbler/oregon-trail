//// Imports
import { createInputs, pickImg } from "../display.js";
import { conditionStr } from "../interaction.js";
class Traveler {
  name;
  food;
  isHealthy;
  constructor(name) {
    this.name = name;
    this.food = 1;
    this.isHealthy = true;
    this.type = "traveler";
  }

  // methods
  hunt() {
    this.food += 2;
    return `Agora tenho ${this.food} de comida.`;
  }

  eat() {
    this.food > 0 ? this.food-- : (this.isHealthy = false);

    if (this.food === 0 && this.isHealthy === false)
      return `Minha comida acabou, e estou doente.`;
    else if (this.food === 0) return `Minha comida acabou.`;
    else return `Agora tenho ${this.food} de comida.`;
  }

  showMe(parent) {
    const container = document.createElement("div");
    const img = pickImg(this.type);
    const name = document.createElement("h3");
    const log = document.createElement("article");
    const btns = createInputs(this.type);

    name.innerText = this.name;

    log.classList.add(`instance__traveler--log`);

    container.id = conditionStr(this.name).split(" ").join("-");
    container.classList.add("card");
    container.classList.add("instance");
    container.classList.add("instance__traveler");
    container.classList.add(`instance__traveler--${this.type}`);
    container.append(name, log, img, btns);

    parent.append(container);
  }
}

export { Traveler };
