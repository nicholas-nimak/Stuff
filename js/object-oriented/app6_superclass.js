

// function inherit(C, P) {
//   const F = function() {};
//   F.prototype = P.prototype;
//   C.prototype = new F();
//   C.uber = P.prototype;
//   C.prototype.constructor = C;
// };

const inherit = (function() {
  const F = function() {};
  return function(C, P) {
    F.prototype = P.prototype;
    C.prototype = new F();
    C.uber = P.prototype;
    C.prototype.constructor = C;
  };
})();


function Parent(name) {
  this.name = "Alex";
};
Parent.prototype.say = function() {
  return this.age;
};
function Child() {
  this.age = 23;
};
inherit(Child, Parent);

console.log(new Child().say());
