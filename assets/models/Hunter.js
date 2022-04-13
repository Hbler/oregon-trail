import { Traveler } from "./Traveler.js";

class Hunter extends Traveler {
  constructor(name) {
    super(name);
    this.food = 2;
  }

  // methods
  hunt() {
    super.hunt();
    this.food += 3;
  }

  eat() {
    if (this.food >= 2) this.food -= 2;
    else if (this.food > 0) {
      this.food = 0;
      this.isHealthy = false;
    } else this.isHealthy = false;
  }

  giveFood(traveler, amount) {
    if (this.food > amount) {
      this.food -= amount;
      traveler.food += amount;
    }
  }
}

export { Hunter };
