


const seller = {
  goods: [],
  section_id: 'seller_goods'
};



const consumer = {};

consumer.cart = {
  goods: []
  ,section_id: 'cart_goods'
};

consumer.data = {
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
};



////////////////////////////////////////////////////
//////////////    USER_DATA_FORM    ////////////////
////////////////////////////////////////////////////



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






function result() {
  let parent = document.querySelector('main');


  let consumer_data = document.createElement('section');
  consumer_data.id = 'consumer_data';

  let div = document.createElement('div');
  div.id = 'change_consumer_data';

  let p = document.createElement('span');
  p.innerText = `${this.data.name} ${this.data.last_name} from ${this.data.city} ordered `;
  div.appendChild(p);

  consumer_data.appendChild(div);




  let ul = document.createElement('ul');
  this.cart.goods.filter(good => good.quantity > 0).forEach(good => {
    let li = document.createElement('li');
    li.innerText = `${good.quantity} ${good.unit} товару ${good.title}(${good.price})`;
    ul.appendChild(li);
  });
  consumer_data.appendChild(ul);


  let cost = document.createElement('h4');
  cost.id = 'cost';
  cost.innerText = `Сума: $${this.cart.cost} `;

  consumer_data.appendChild(cost);

  parent.innerHTML = "";
  parent.appendChild(consumer_data);

};



function showConsumerDataForm() {

  let section = document.createElement('section');
  section.id = "consumer_data_form";

  let form = document.createElement('form');
  form.name = "consumer_data_form";
  form.onsubmit = () => {return false};

  form.innerHTML += `
    <p>Name:            <input type="text" name="name" maxlength="20" value="${this.name || ""}" required></p>

    <p>Last name:       <input type="text" name="last_name" maxlength="20" value="${this.last_name || ""}" required></p>

    <p>City:            <input type="text" name="city" maxlength="20" value="${this.city || ""}" required></p>

    <p>Region:          <input type="text" name="region" maxlength="20" value="${this.region || ""}"></p>

    <p>District:        <input type="text" name="district" maxlength="20" value="${this.district || ""}"></p>

    <p>Street:          <input type="text" name="street" maxlength="20" value="${this.street || ""}"></p>

    <p>House:           <input type="text" name="house" maxlength="20" max="10000" min="1" value="${this.house || ""}"></p>

    <p>Flat:            <input type="text" name="flat" maxlength="20" max="10000" min="1" value="${this.flat || ""}"></p>

    <p>Phone:           <input type="phone" name="phone" maxlength="20" min="1" value="${this.phone || ""}"></p>

    <p>Post department: <input type="number" name="post_department" maxlength="20" min="1" value="${this.post_department || ""}"></p>
  `;

  section.appendChild(form);

  document.querySelector('main').innerHTML = "";
  document.querySelector('main').appendChild(section);
};


function consumerDataForm() {
  return new Promise(resolve => {

    showConsumerDataForm.bind(consumer.data)();
    resolve();

  }).then(() => {

    createButton_Back_to_Cart(document.forms['consumer_data_form']).addEventListener('click', () => {

      consumer.data = saveData(document.forms['consumer_data_form']);

      // this functions returns to previous state with goods and cart
      document.querySelector('main').innerHTML = "";
      showGoods.bind(seller)();
      showGoodsInCart.bind(consumer.cart)();
      //
    }, false);

    createButton_Send_Order(document.forms['consumer_data_form']).addEventListener('click', sendOrder, false);

  });
};




function sendOrder() {

  if(
    this.parentNode['name'].value.length > 20 ||
    this.parentNode['name'].value.length < 1 ||

    this.parentNode['last_name'].value.length > 20 ||
    this.parentNode['name'].value.length < 1 ||

    this.parentNode['city'].value.length > 20 ||
    this.parentNode['name'].value.length < 1 ||

    this.parentNode['region'].value.length > 20 ||
    this.parentNode['district'].value.length > 20 ||
    this.parentNode['street'].value.length > 20 ||

    this.parentNode['house'].value.length > 20 ||
    parseInt(this.parentNode['house'].value) > 10000 ||
    parseInt(this.parentNode['house'].value) < 0 ||

    this.parentNode['flat'].value.length > 20 ||
    this.parentNode['flat'].value > 10000 ||
    this.parentNode['flat'].value < 0 ||

    this.parentNode['phone'].value.length > 20 ||
    this.parentNode['phone'].value < 0 ||

    this.parentNode['post_department'].value.length > 20 ||
    this.parentNode['post_department'].value < 0

  ) {
    alert("Недопустимое значение");
  } else {


    let sendData = (() => {
      return new Promise(resolve => {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
          if(this.readyState === 4 && this.status === 200) {
            resolve();
          };
        };
        request.open('POST', './send_order.php', true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
        request.send(`x=${JSON.stringify(seller.goods)}`);
      }).then(() => {

        return new Promise(resolve => {
          result.bind(consumer)();
          resolve();
        }).then(() => {

          let createReloadButton = (() => {
            let reload_button = document.createElement('button');
            reload_button.innerText = "Купляти ще";
            return document.querySelector('main').appendChild(reload_button);
          })().addEventListener('click', () => {
            // location = "./index.php";
            document.querySelector('main').innerHTML = "";
            getGoods();
          }, false);

        });

      });
    })();

  };

};



////////////////////////////////////////////////////
//////////////    USER_DATA_FORM    ////////////////
////////////////////////////////////////////////////



////////////////////////////////////////////////////
//////////////    GOOD_EXCHANGE    ////////////////
////////////////////////////////////////////////////



function initGoodsInCart() {

  consumer.cart.goods = [];

  seller.goods.forEach(good => {

    consumer.cart.goods.push(
      {
        title: good.title
        ,price: good.price
        ,id: good.id
        ,quantity: 0
        ,unit : good.unit
      }
    );

  });

};



function removeGoodFromCart(id, quantity_diff) {
  let good = consumer.cart.goods.find(good => good.id === id);
  if(quantity_diff > good.quantity || quantity_diff < 0) {
    alert("There are not so much in your cart.");
  } else {
    good.quantity -= quantity_diff;
    seller.goods.find(good => good.id === id).quantity += quantity_diff;
  };
};


function putGoodInCart(id, quantity_diff) {
  let good = seller.goods.find(good => good.id === id);
  if(quantity_diff > good.quantity || quantity_diff < 0) {
    alert("We don't have so much.");
  } else {
    good.quantity -= quantity_diff;
    consumer.cart.goods.find(good => good.id === id).quantity += quantity_diff;
  };
};



////////////////////////////////////////////////////
//////////////    GOOD_EXCHANGE    ////////////////
////////////////////////////////////////////////////



////////////////////////////////////////////////
/////////////////     PAGE     /////////////////
////////////////////////////////////////////////



function getGoods() {
  return new Promise(resolve => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if(this.readyState === 4 && this.status === 200) {

        seller.goods = JSON.parse(this.responseText);
        resolve();

      };
    };
    request.open('GET', './goods.php', true);
    request.send();
  }).then(() => {
    initGoodsInCart();
    showGoods.bind(seller)();
  });
};



function showGood(parent) {
  let form = document.createElement('form');
  form.name = this.id;
  form.onsubmit = () => {return false};
  form.innerHTML = `
    <h3>${this.title}</h3>
    <p>коштують <b>${this.price}</b> гривень</p>
    <p>в наявності ${this.unit}: <b>${this.quantity}</b></p>
    <input type="number" name="add_to_cart_input" min="1" max="${this.quantity}" value="1"></input>
    ${this.unit}
  `;
  return parent.appendChild(form);
};



function createButtonAddToCart(parent) {
  let button = document.createElement('button');
  button.name = "add_to_cart_button";
  button.innerText = "додати в кошик";
  return parent.appendChild(button);
};



function showGoods() {
  let section = document.createElement('section');
  section.id = this.section_id;
  this.goods.forEach(good => {

    return new Promise(resolve => {
      resolve(showGood.bind(good)(section));
    }).then(parent => {

      createButtonAddToCart(parent).addEventListener('click', () => {

        putGoodInCart(parseInt(parent.name), parseInt(parent['add_to_cart_input'].value));

        showGoods.bind(seller)();

        showGoodsInCart.bind(consumer.cart)();

      }, false);
    });

  });
  if(document.querySelector(`section#${this.section_id}`)) {
    return document.querySelector('main').replaceChild(section, document.querySelector(`section#${this.section_id}`));
  } else {
    return document.querySelector('main').appendChild(section);
  };
};



function showGoodInCart(parent) {
  let form = document.createElement('form');
  form.name = this.id;
  form.onsubmit = () => {return false};
  form.innerHTML = `
    <form name="${this.id}" onsubmit="return false;">
      <p>${this.quantity} ${this.unit} товару ${this.title} <b>${this.quantity * this.price}</b></p>
      <input type="number" name="remove_from_cart_input" min="1" max="${this.ordered}" value="1">
    </form>
  `;
  return parent.appendChild(form);
};



function createButtonRemoveFromCart(parent) {
  let button = document.createElement('button');
  button.name = "remove_from_cart_button";
  button.innerText = "забрати з кошику";
  return parent.appendChild(button);
};



function showGoodsInCart() {

  let goods = this.goods.filter(good => good.quantity > 0);


  let section = document.createElement('section');
  section.id = this.section_id;

  this.cost = 0;

  if(goods.length > 0) {

    goods.forEach(good => {

      this.cost += (good.price * good.quantity);

      return new Promise(resolve => {

        resolve(showGoodInCart.bind(good)(section));
      }).then((parent) => {

        createButtonRemoveFromCart(parent).addEventListener('click', function() {


          removeGoodFromCart(parseInt(parent.name), parseInt(parent['remove_from_cart_input'].value));
          showGoodsInCart.bind(consumer.cart)();

        }, false);

      });

    });


    let elem = document.createElement('div');
    elem.innerHTML = `
    <p><b>${this.cost > 0 ? this.cost : "You have not choose any good"}</b></p>
    `;
    createButton_getConsumerForm(elem).addEventListener('click', consumerDataForm, false);
    section.appendChild(elem);

  };


  if(document.querySelector(`section#${this.section_id}`)) {
    return document.querySelector('main').replaceChild(section, document.querySelector(`section#${this.section_id}`));
  } else {
    return document.querySelector('main').insertBefore(section, document.querySelector('section#seller_goods'));
  };


};



function createButton_getConsumerForm(parent) {
  let button = document.createElement('button');
  button.name = `get_consumer_form`;
  button.innerText = `заповніть анкету`;
  return parent.appendChild(button);
};



window.onload = function() {
  getGoods();
};



////////////////////////////////////////////////
/////////////////     PAGE     /////////////////
////////////////////////////////////////////////



//
