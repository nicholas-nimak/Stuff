
let person = {
  talk: function() {
    console.log(this.name)
  }
}

function Person(name) {
  Object.setPrototypeOf(this, person);
  this.name = name;
}

let person1 = new Person("Nick");
person1.talk();
