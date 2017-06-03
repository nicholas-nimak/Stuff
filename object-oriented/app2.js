

let button = {create, append, insertText};

function create() {
  console.log(this);
  return document.createElement(this.elementName);
};
function append() {
  this.parent.appendChild(this.element);
};
function insertText() {
  this.element.innerText = this.text;
};

let myAwesomeButton = {
  parent: document.querySelector('main'),
  elementName: "button",
  text: "HAFSAD Button"
};

Object.setPrototypeOf(myAwesomeButton, button)

myAwesomeButton.element = myAwesomeButton.create();
myAwesomeButton.insertText();
myAwesomeButton.append();
