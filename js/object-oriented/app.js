

let proto_obj = {};
proto_obj.sayWord = function() {
  console.log(this.word);
}

let instance_obj = {};
instance_obj.word = "Hey!"

Object.setPrototypeOf(instance_obj, proto_obj);

instance_obj.sayWord();


// function talk() {
//   console.log(this.word);
// };
//
// let animal = {
//   talk
// }
//
// let cat = {
//   word: "Hello"
// }
//
// Object.setPrototypeOf(cat, animal);
//
// cat.talk();
