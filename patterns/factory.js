function CarMaker() {}

CarMaker.prototype.drive = function () {
  return `Vroom, I have ${this.doors} doors`
}

CarMaker.factory = function(type) {

  if (typeof CarMaker[type] !== 'function') {
    throw {
      name: 'Error',
      message: type + ' doesn’t exist'
    };
  }

  if(typeof CarMaker[type].prototype.drive !== 'function') {
    CarMaker[type].prototype = new CarMaker();
  }

 return new CarMaker[type]();
}



CarMaker.Compact = function() {
  this.doors = 4
}
CarMaker.Convertible = function() {
  this.doors = 2
}
CarMaker.SUV = function() {
  this.doors = 6
}

let corolla = CarMaker.factory('Convertible')
console.log(corolla.drive())
