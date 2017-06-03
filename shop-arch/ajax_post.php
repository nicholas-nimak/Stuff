<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "login.php";
$conn = new mysqli($hn, $un, $pw, $db);
if($conn->connect_error) die($conn->connect_error);
$conn->set_charset('utf8');
if($_SERVER["REQUEST_METHOD"] == "POST") {
  $x_array = json_decode($_POST['x']);
  foreach ($x_array as $value) {
    $query = "INSERT INTO `formtest` (`name`) VALUES ('{$value->title}')";
    $result = $conn->query($query);
    if(!$result) die($conn->error);
  };
};
$conn->close();
?>
