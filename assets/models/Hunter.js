import { Traveler } from "./Traveler.js";

class Hunter extends Traveler {
  constructor(name) {
    super(name);
    this.food = 2;
    this.type = "hunter";
  }

  // methods
  hunt() {
    this.food += 5;
    return `Agora eu tenho ${this.food} de comida.`;
  }

  eat() {
    if (this.food >= 2) this.food -= 2;
    else if (this.food > 0) {
      this.food = 0;
      this.isHealthy = false;
    } else this.isHealthy = false;

    if (this.food === 0 && this.isHealthy === false)
      return `Minha comida acabou, e estou doente.`;
    else if (this.food === 0) return `Minha comida acabou.`;
    else return `Agora tenho ${this.food} de comida.`;
  }

  giveFood(traveler, amount) {
    if (this.food > amount) {
      this.food -= amount;
      traveler.food += amount;
      return `${traveler.name} agora tem ${traveler.food} de comida.\nE eu tenho ${this.food}`;
    } else {
      return `Não tenho comida suficiente para doar.`;
    }
  }
}

export { Hunter };
