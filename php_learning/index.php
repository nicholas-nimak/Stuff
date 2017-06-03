<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Php learning</title>
  </head>
  <body>
    <?php

    echo "<p><a href=\"sqltest.php\">SQLtest</a></p>";
    echo "<p><a href=\"create_table.php\">Create Table</a></p>";

    require_once 'login.php';
    $conn = new mysqli($hn, $un, $pw, $db);
    if ($conn->connect_error) die($conn->connect_error);

    $query = "SELECT * FROM classics";
    $result = $conn->query($query);
    if (!$result) die ($conn->error);

    $rows = $result->num_rows;
    for ($j = 0; $j < $rows; ++$j) {
      $result->data_seek($j);
      $row = $result->fetch_array(MYSQLI_BOTH);
      echo '<h3>' . $row['author'] . '</h3><p>' . $row['title'] . '</p><br>';
    }



    $result->close();
    $conn->close();
    ?>
  </body>
</html>
