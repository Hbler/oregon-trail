//// Imports
import { pickImg, createInputs, conditionStr } from "../interaction.js";
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
    return `${this.name} diz: Agora eu tenho ${this.food} de comida.`;
  }

  eat() {
    this.food > 0 ? this.food-- : (this.isHealthy = false);
    if (this.food === 0) return `${this.name} diz: Minha comida acabou.`;
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
