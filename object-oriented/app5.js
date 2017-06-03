//
//композиция — это когда один объект предоставляет другому свою функциональность частично или полностью
//



// const dog = {}
// dog.age = 12
// dog.getName = function(){return this.age}
// console.log(dog.getName())
// const fun = dog.getName
// console.log(fun())


///////////////////////////////////////////
///////////////////////////////////////////



// const Person = function(name) {
//   // const that = {};
//   const that = Object.create(Person.prototype);
//   that.name = name;
//   return that;
// };
// Person.prototype.say = function() {return this.name};
// console.log(Person('Bob').say(), Person('Bill').say());


////////////////////////////////////////////
////////////////////////////////////////////


// // "use strict"
// const someObject = {name: 'Sam'};
// function Person(name) {
//   this.name = name;
//   console.log(this);
//   // return someObject;
// };
// console.log(Person('Billy'))


////////////////////////////////////////////
////////////////////////////////////////////



// function Person( name ) {
  // if( !(this instanceof Person) ) {
  //   return new Person(name);
  // };
//   this.name = name;
// };
// Person.prototype.age = 23;
// console.log( Person( 'Will' ).age );



/////////////////////////////////////////
/////////////////////////////////////////



// function Parent() {
//   if( !(this instanceof Parent) ) {
//     return new Parent();
//   };
//   this.age = 34;
// };
// // i'll not use this constructor to create objects
// function Child(name, age) {
//   if( !(this instanceof Child) ) {
//     return new Child(name);
//   };
//   this.name = name;
// };
// // i'll use this constructor to create objects
// Child.prototype = Parent();
// console.log(Child('Bill'));




//
function Parent() {
  this.age = 34;
};
Parent.prototype.say = function() {
  return this.age;
};
function Child(name) {
  Parent.apply(this, arguments);
  this.name = name;
};
Child.prototype = Parent.prototype;
const obj = new Child('Bill', 34);
console.log(obj.say());
obj.__proto__.say = function() {
  return this.age + 5;
}
console.log(obj.say());






///////////////////////////////////////////
///////////////////////////////////////////

//
// function Parent(name) {
//   this.name = name;
// };
// Parent.prototype.say = function() {
//   return this.name;
// };
// function Child(name, age) {
//   // Parent.bind(this)(arguments[0]);
//   Parent.apply(this, arguments);
//   this.age = age;
// };
// const obj = new Child('Bill', 45);
// console.log(obj);
// console.log(new Parent('Bill').say)







//
// function Parent(name) {
//   this.name = name;
// };
// Parent.prototype.say = function() {
//   return this.name;
// };
// function Child(name, age) {
//   Parent.apply(this, arguments);
//   this.age = age;
// };
// Child.prototype = new Parent();
// const obj = new Child('Bill', 45);
// console.log(obj.say());





//
// function Parent() {
//   this.num = 2;
// };
//
// const child1 = new Parent();
// const child2 = {};
// child2.__proto__ = child1;
// child1.num = 3;
// console.log(child1.num, child2.num);



//
// const Parent = {
//   say: function() {
//     return this.name;
//   }
// };
// function MakeChild(name) {
//   Object.setPrototypeOf(this, Parent);
//   this.name = name;
// };
// console.log(new MakeChild('Bill'));




//
// const Parent = {
//   init: function(name) {
//     this.name = name;
//     return this;
//   },
//   say: function() {
//     return this.name;
//   }
// };
// console.log(Object.create(Parent).init('Bob').say());




//
