


function sayHello() {
  console.log("hello");
};


const consumer = {
  data: {
    name: "Anthony"
    ,last_name: "Joshua"
    ,city: "London"
    ,street: "Some street"
    ,house: 1
    ,phone: "0983228100"
    ,region: null
    ,district: null
    ,flat: null
    ,post_department: 0
  }
}

function saveData(form) {
  let obj = {};
  for (let entry of new FormData(form).entries()) {
    obj[entry[0]] = entry[1];
  };
  return obj;
};




function createButton_Back_to_Cart(parent) {
  let button = document.createElement('button');
  button.name = "back_to_cart";
  button.innerText = "Back to Cart";
  return parent.appendChild(button);
};

function createButton_Send_Order(parent) {
  let button = document.createElement('button');
  button.name = "send_order";
  button.innerText = "Send Order";
  return parent.appendChild(button);
};



function showConsumerDataForm() {

  let section = document.createElement('section');
  section.id = "consumer_data_form";

  let form = document.createElement('form');
  form.name = "consumer_data_form";
  form.onsubmit = () => {return false};

  form.innerHTML += `
    <p>Name:            <input type="text" name="name" value="${this.name || ""}"></p>

    <p>Last name:       <input type="text" name="last_name" value="${this.last_name || ""}"></p>

    <p>City:            <input type="text" name="city" value="${this.city || ""}"></p>

    <p>Region:          <input type="text" name="region" value="${this.region || ""}"></p>

    <p>District:        <input type="text" name="district" value="${this.district || ""}"></p>

    <p>Street:          <input type="text" name="street" value="${this.street || ""}"></p>

    <p>House:           <input type="text" name="house" value="${this.house || ""}"></p>

    <p>Flat:            <input type="text" name="flat" value="${this.flat || ""}"></p>

    <p>Phone:           <input type="phone" name="phone" value="${this.phone || ""}"></p>

    <p>Post department: <input type="number" name="post_department" value="${this.post_department || ""}"></p>
  `;

  section.appendChild(form);

  document.querySelector('main').innerHTML = "";
  document.querySelector('main').appendChild(section);
};




// createSpecialButton

function createSpecialButton(parent) {
  let button = document.createElement('button');
  button.name = "special_button";
  button.innerText = "Special Button";
  parent.innerHTML = "";
  return parent.appendChild(button);
};

// createSpecialButton







function consumerDataForm() {
  return new Promise(resolve => {

    showConsumerDataForm.bind(consumer.data)();
    resolve();

  }).then(() => {

    createButton_Back_to_Cart(document.forms['consumer_data_form']).addEventListener('click', () => {

      consumer.data = saveData(document.forms['consumer_data_form']);
      console.log(consumer.data);

      createSpecialButton(document.querySelector('main')).addEventListener('click', consumerDataForm, false);
      // this function should be replaced later to function that show goods and cart

    }, false);

    createButton_Send_Order(document.forms['consumer_data_form']).addEventListener('click', sayHello, false);

  });
};




window.onload = consumerDataForm;














//
