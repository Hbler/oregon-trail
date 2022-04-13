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
    this.passengers.length < this.capacity
      ? this.passengers.push(traveler)
      : console.log("Sem espaço");
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
