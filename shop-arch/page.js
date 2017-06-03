





const seller = {
  goods: [],
  section_id: 'seller_goods'
};

const consumer = {
  cart: {
    goods: [],
    section_id: 'cart_goods'
  }
  // data: {}
};

function getCost() {
  let sum = 0;
  this.goods.forEach(good => {
    sum += parseInt(good.price);
  });
  return this.cost = sum;
};


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
    getCost.bind(seller)(); // test for consumer.cart.goods
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
    <p>в наявності ${this.unit}: <b>${this.measure}</b></p>
    <input type="number" name="back_to_seller" min="1" max="${this.measure}" value="1"></input>
    ${this.unit}
  `;
  return parent.appendChild(form);
};

function createButtonAddToCart(parent) {
  let button = document.createElement('button');
  button.name = "add_to_cart";
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

        return new Promise(resolve => {

          let request = new XMLHttpRequest();
          request.onreadystatechange = function() {

            if(this.readyState === 4 && this.status === 200) {
              consumer.cart.goods = JSON.parse(this.responseText);
              resolve();
            };

          };
          request.open('GET', './goods.php', true);
          request.send();

        }).then(() => {
          showGoodsInCart.bind(consumer.cart)();
        });

        // here should be at least two functions:
        // 1. showGoodsInCart
        // 2. function that adds good to cart and remove it from seller goods array

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
      <p>${this.measure} ${this.unit} товару ${this.title} <b>${this.measure * this.price}</b></p>
      <input type="number" name="remove_from_cart" min="1" max="${this.ordered}" value="1">
    </form>
  `;
  // <button name="remove_from_cart">забрати з кошику</button>
  return parent.appendChild(form);
};

function createButtonRemoveFromCart(parent) {
  let button = document.createElement('button');
  button.name = "remove_from_cart";
  button.innerText = "забрати з кошику";
  return parent.appendChild(button);
};

function showGoodsInCart() {

  let section = document.createElement('section');
  section.id = this.section_id;

  this.goods.forEach(good => {

    return new Promise(resolve => {

      resolve(showGoodInCart.bind(good)(section));
    }).then((parent) => {

      createButtonRemoveFromCart(parent).addEventListener('click', function() {
        console.log(`You've clicked on`, this);
      }, false);

    });

  });

  let elem = document.createElement('div');
  elem.innerHTML = `
    <p><b>${this.cost > 0 ? this.cost : "You have not choose any good"}</b></p>
  `;
  createButton_getConsumerForm(elem).addEventListener('click', imitate, false);

  section.appendChild(elem);
  if(document.querySelector(`section#${this.section_id}`)) {
    return document.querySelector('main').replaceChild(section, document.querySelector(`section#${this.section_id}`));
  } else {
    return document.querySelector('main').insertBefore(section, document.querySelector('section#seller_goods'));
  };
};


function createButton_Back_to_Cart(parent) {
  let button = document.createElement('button');
  button.name = "back_to_cart";
  button.innerText = "Back to Cart";
  return parent.appendChild(button);
};


function imitate() {

  document.querySelector('main').innerHTML = "";
  createButton_Back_to_Cart(document.querySelector('main')).addEventListener('click', () => {
    document.querySelector('main').innerHTML = "";
    showGoods.bind(seller)();
    showGoodsInCart.bind(consumer.cart)();
  }, false);

};


function createButton_getConsumerForm(parent) {
  let button = document.createElement('button');
  button.name = `get_consumer_form`;
  button.innerText = `Заполнить анкету`;
  return parent.appendChild(button);
};

window.onload = function() {
  getGoods();
};

















//
