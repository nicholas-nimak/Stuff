<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "login.php";
$conn = new mysqli($hn, $un, $pw, $db);
if($conn->connect_error) die($conn->connect_error);
$conn->set_charset('utf8');
if($_SERVER["REQUEST_METHOD"] == "POST") {
  $goods = json_decode($_POST['x']);
  foreach($goods as $good) {
    $query = "UPDATE `goods` SET `quantity` = $good->quantity WHERE `id` = $good->id";
    $result = $conn->query($query);
    if(!$result) die($conn->error);
  };
  echo "hi";
};
$conn->close();
?>
