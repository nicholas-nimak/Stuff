<?php
require_once 'login.php';
$conn = new mysqli($hn, $un, $pw, $db);
if($conn->connect_error) die($conn->connect_error);
$conn->set_charset('utf8');

$query = 'SELECT * FROM goods';
$result = $conn->query($query);
if(!$result) die($conn->error);
$goods = array();
$j = $result->num_rows - 1;
while($j >= 0) {
  $result->data_seek($j);
  $row = $result->fetch_array(MYSQLI_BOTH);

  $id = $row['id'];
  settype($id, "int");

  $price = $row['price'];
  settype($price, "int");

  $quantity = $row['quantity'];
  settype($quantity, "int");

  $good = array(

    "id" => $id
    ,"price" => $price
    ,"quantity" => $quantity

    ,"title" => "$row[title]"
    ,"unit" => $row['unit']

  );
  array_push($goods, $good);
  $j--;
};
echo json_encode(array_reverse($goods));

$result->close();
$conn->close();
?>
