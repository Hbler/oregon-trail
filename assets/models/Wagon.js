class Wagon {
  capacity;
  passengers;
  constructor(capacity) {
    this.capacity = capacity;
    this.passengers = [];
  }

  // methods
  getAvailableSeatCount() {
    return this.capacity - this.passengers.length;
  }

  join = (traveler) => {
    if (this.passengers.length < this.capacity) {
      this.passengers.push(traveler);
      return `${traveler.name} entrou n'A Caravana.`;
    } else {
      console.log(
        `${this.passengers.map(
          (obj) => " " + obj.name
        )} estão n'A Caravana, acabaram os assentos.`
      );
      return `
      ${traveler.name} diz:${this.passengers.map(
        (obj) => obj.name
      )} estão n'A Caravana, acabaram os assentos.`;
    }
  };

  shouldQuarantine() {
    let should = false;

    this.passengers.forEach((obj) => {
      if (!obj.isHealthy) should = true;
    });

    return should;
  }

  totalFood() {
    return this.passengers.reduce((total, obj) => {
      total += obj.food;
      return total;
    }, 0);
  }
}

export { Wagon };
