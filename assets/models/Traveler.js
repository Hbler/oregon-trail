class Traveler {
  name;
  food;
  isHealthy;
  constructor(name) {
    this.name = name;
    this.food = 1;
    this.isHealthy = true;
  }

  // methods
  hunt() {
    this.food += 2;
  }

  eat() {
    this.food > 0 ? this.food-- : (this.isHealthy = false);
  }
}

export { Traveler };
