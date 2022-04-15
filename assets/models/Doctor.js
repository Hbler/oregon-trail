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
      return `${this.name} diz: ${traveler} agora está saudável.`;
    } else {
      return `${this.name} diz: ${traveler} não está doente.`;
    }
  }
}

export { Doctor };
