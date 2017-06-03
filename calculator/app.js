
// i = 14;
var ii = document.getElementById("amount");
// a = 88956;
var aa = document.getElementById("inter");
// y = 12;
var yy = document.getElementById("years");


function calculate() {

var i = ii.value;
var a = aa.value;
var y = yy.value;

var principal = parseFloat(a);
var payments = parseFloat(y) * 12;
var interest = parseFloat(i) / 100 / 12;

var x = Math.pow(1 + interest, payments);
var monthly = (principal * x * interest) / (x - 1);

var monpay = monthly * payments;

var payment = document.getElementById("payment");
var total = document.getElementById("total");
var totalInterest = document.getElementById("total-interest");


  payment.innerHTML = ("$" + " " + monthly.toFixed(2));
  total.innerHTML = ("$" + " " + (monpay).toFixed(2));
  totalInterest.innerHTML = ("$" + " " + ((monpay) - principal).toFixed(2));
}
var calc = document.getElementById("calc");
// ii.addEventListener("change", calculate, false);
// aa.addEventListener("change", calculate, false);
// yy.addEventListener("change", calculate, false);
calc.addEventListener("click", calculate, false);
