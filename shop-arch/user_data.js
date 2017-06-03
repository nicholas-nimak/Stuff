




const consumer = {
  data: {
    name: "Anthony"
    ,last_name: "Joshua"
    ,city: "London"
    ,street: "Some street"
    ,house: 1
    ,phone: 0983228100
    ,region: null
    ,district: null
    ,flat: null
    ,post_department: 0
  }
}




function sendConsumerData() {

  let request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200) {
      // location =  "add_consumer_ajax.php";
      console.log(this.responseText);
    };
  };
  request.open('POST', 'add_consumer_ajax.php', true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
  request.send(`x=${JSON.stringify(consumer.data)}`);

};


sendConsumerData();











//
