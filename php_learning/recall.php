<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Recall</title>
  </head>
  <body>
    <?php
    require_once "login.php";
    $conn = new mysqli($hn, $un, $pw, $db);
    if($conn->connect_error) die($conn->connect_error);

    $query = "SELECT * FROM classics";
    $result = $conn->query($query);
    if(!$result) die($conn->error);

    $rows = $result->num_rows;
    $result->data_seek(4);
    $row = $result->fetch_array(MYSQLI_NUM);
    echo $row[0];

    $result->close();
    $conn->close();
    ?>
  </body>
</html>
