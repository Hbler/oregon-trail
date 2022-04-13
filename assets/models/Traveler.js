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
    return `${this.name} diz: Agora eu tenho ${this.food} de comida.`;
  }

  eat() {
    this.food > 0 ? this.food-- : (this.isHealthy = false);
    if (this.food === 0) return `${this.name} diz: Minha comida acabou.`;
  }
}

export { Traveler };
