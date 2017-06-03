
// elements in document
let but = document.getElementById("plusOne"),
    output = document.getElementById("output"),
    input = document.getElementById("input"),
    main = document.getElementById("main"),
    alert_node = document.getElementById("alert"),
    style = window.getComputedStyle(alert_node),
    display = style.getPropertyValue("display");
let plusOne = () => {
  // 1 & 2
  let input_value = parseInt(input.value),
      item_node,
      item_text,
      check = document.getElementsByClassName("check");
  // 3
  if(isNaN(input_value)) {
    if(display === "none" && alert_node.style.display !== "block") {
      alert_node.style.display = "block";
    }
    // without else
  } else {
    // 4.1
    cashRegister.total += input_value;
    // 4.2 insertBefore or appendChild
    item_node = document.createElement("p");
    item_node.className = "check";
    item_node.style.color = "#3eff26"
    item_text = document.createTextNode("+ " + input_value);
    item_node.appendChild(item_text);
    if(check) {
      main.insertBefore(item_node, check[0]);
    } else {
      main.appendChild(item_node);
    }
    // 5
    output.innerHTML = "TOTAL: " + cashRegister.total;
  }
  input.value = "";
}
let hideAlert = () => {
  if(alert_node.style.display === "block") {
    alert_node.style.display = "none";
  }
  // without else
}

// this is the main object
let cashRegister = {
  total: 0,
  add: plusOne
};

input.addEventListener("mousedown", hideAlert, false);
but.addEventListener("mousedown", cashRegister.add, false);





//
