import { Traveler } from "./Traveler.js";

class Doctor extends Traveler {
  constructor(name) {
    super(name);
  }

  // methods
  heal(traveler) {
    if (!traveler.isHealthy) traveler.isHealthy = true;
  }
}

export { Doctor };
