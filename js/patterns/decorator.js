function Sale() {
  this.price = 100;
}
Sale.prototype.getPrice = function() {
  return this.price;
}
Sale.prototype.decorate = function(decorator) {
  console.log(this.constructor)
  let F = function() {}, overrides = this.constructor.decorators[decorator], i, newobj;
  F.prototype = this;
  newobj = new F();
  newobj.uber = F.prototype;
  for ( i in overrides ) {
    if ( overrides.hasOwnProperty(i) ) { newobj[i] = overrides[i] }
  }
  return newobj
};
Sale.decorators = {}
Sale.decorators.fedtax = {
  price: 200,
  getPrice: function() {
    return this.uber.getPrice() + this.uber.getPrice() * 5 / 100;
  }
}
Sale.decorators.localtax = {
  getPrice: function() {
    return this.uber.getPrice() + this.uber.getPrice() * 5 / 100;
  }
}
let sale = new Sale()
sale = sale.decorate('fedtax')
console.log(sale.getPrice())
sale = sale.decorate('localtax')
console.log(sale.getPrice())

//
// function Sale() {
//   this.price = 100
//   this.decorators_list = []
// }
// Sale.prototype.getPrice = function() {
//   let price = this.price
//   this.decorators_list.forEach(decorator => {
//     if(Sale.decorators[decorator].hasOwnProperty('getPrice')) {
//       price = Sale.decorators[decorator].getPrice(this.price)
//     }
//   })
//   return price
// }
// Sale.prototype.decorate = function(decorator) {
//   this.decorators_list.push(decorator)
// }
// Sale.decorators = {}
// Sale.decorators.fedtax = {
//   getPrice: function(price) {
//     return price + price * 25 / 100
//   }
// }
// Sale.decorators.localtax = {
//   getPrice: function(price) {
//     return price + price * 15 / 100
//   }
// }
// Sale.decorators.some = {
//   getMeasure: function() {
//     return 5
//   }
// }
// let sale = new Sale()
// sale.decorate('fedtax')
// sale.decorate('localtax')
// sale.decorate('some')
// console.log(sale.getPrice());
