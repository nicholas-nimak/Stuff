
let seller = {
  goods: [
    {
      title: "A"
      ,price: 10
      ,id: 1
      ,quantity: 100
    }
    ,{
      title: "B"
      ,price: 20
      ,id: 2
      ,quantity: 100
    }
  ]
};

let consumer = {
  cart: {
    goods: []
  }
};


function initGoodsInCart() {
  // most simple way
  // consumer.cart.goods = seller.goods;

  // less simple, but more flexible
  // seller.goods.forEach(good => {
  //   consumer.cart.goods.push(good);
  // });

  // least simple, very flexible

  console.log('\n\nforEach');

  seller.goods.forEach(good => {

    consumer.cart.goods.push(
      {
        title: good.title
        ,price: good.price
        ,id: good.id
        ,quantity: 0
      }
    );

  });

};



function removeGoodFromCart(id, quantity_diff) {
  let good = consumer.cart.goods.find(good => good.id === id);
  if(quantity_diff > good.quantity) {
    alert("There are not so much in your cart.");
  } else {
    good.quantity -= quantity_diff;
    seller.goods.find(good => good.id === id).quantity += quantity_diff;
  };
};


function putGoodInCart(id, quantity_diff) {
  let good = seller.goods.find(good => good.id === id);
  if(quantity_diff > good.quantity) {
    alert("We don't have so much.");
  } else {
    good.quantity -= quantity_diff;
    consumer.cart.goods.find(good => good.id === id).quantity += quantity_diff;
  };
};




window.onload = () => {
  // console.log(`\n\n\nThis is GOODS in CONSUMER CART`);
  // console.log(consumer.cart.goods);
  initGoodsInCart();
  // console.log(`\n\n\nThis is GOODS in SELLER`);
  // console.log(seller.goods);
  // console.log(`\n\n\nThis is GOODS in CONSUMER CART`);
  // console.log(consumer.cart.goods[0]);
  console.log(putGoodInCart(1, 10));
  // console.log(consumer.cart.goods[0]);
};




//
