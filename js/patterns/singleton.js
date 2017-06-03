// // let myGlobal;
// function Universe() {
//   // 1
//   // if(typeof Universe.instance === 'object') {
//   //   return Universe.instance
//   // }
//   // this.age = 'too much'
//   // Universe.instance = this
//   // 2
//   // if(typeof myGlobal === 'object') {
//   //   return myGlobal;
//   // }
//   // this.age = 23;
//   // myGlobal = this;
//   // 3
//   let singleton = this;
//   this.age = 12;
//   Universe = function() {
//     return singleton;
//   }
// }
//


// function Universe() {
//   let singleton = this;
//   this.age = 54;
//   Universe = function() {
//     return singleton;
//   }
// }

let Universe;
(() => {
  let singleton;
  Universe = function() {
    if(singleton) {
      return singleton;
    }
    singleton = this;

    this.age = 43;
  }
})();

let uni = new Universe()
Universe.prototype.some = "some";
let uni2 = new Universe()
console.log(uni === uni2)
