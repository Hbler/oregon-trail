import { Traveler } from "./Traveler.js";

class Doctor extends Traveler {
  constructor(name) {
    super(name);
    this.type = "doctor";
  }

  // methods
  heal(traveler) {
    if (!traveler.isHealthy) {
      traveler.isHealthy = true;
      return `${traveler.name} agora está saudável.`;
    } else {
      return `${traveler.name} não está doente.`;
    }
  }
}

export { Doctor };
