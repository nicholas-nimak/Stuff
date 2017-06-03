<?php
header("Content-Type: application/json; charset=UTF-8");
require_once "login.php";
$conn = new mysqli($hn, $un, $pw, $db);
if($conn->connect_error) die($conn->connect_error);
$conn->set_charset('utf8');

if($_SERVER["REQUEST_METHOD"] == "POST") {
  $x = json_decode($_POST['x']);
  $query = "INSERT INTO `delivery` (
    `name`,
    `last_name`,
    `city`,
    `region`,
    `district`,
    `street`,
    `house`,
    `flat`,
    `phone`,
    `post_department`) VALUES (
    '{$x->name}',
    '{$x->last_name}',
    '{$x->city}',
    '{$x->region}',
    '{$x->district}',
    '{$x->street}',
    '{$x->house}',
    '{$x->flat}',
    '{$x->phone}',
    '{$x->post_department}')";
  $result = $conn->query($query);
  if(!$result) die($conn->error);
};
$conn->close();
?>
