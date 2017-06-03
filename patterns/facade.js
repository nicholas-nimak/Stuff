
const obj = {
  a: 2,
  b: 3,
  plus: function() {return this.a += this.b},
  multiply: function() {return this.a *= this.b},
  facadeFunction: function() {
    this.plus()
    this.multiply()
    return this.a
  },
}

console.log(obj.facadeFunction())
