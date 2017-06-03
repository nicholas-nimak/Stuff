let person = (arg) => {
  let name = arg;
  return {talk: () => {console.log(name)}}
};

let person1 = person("Nick");
person1.talk();
