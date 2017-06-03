<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Create Table</title>
  </head>
  <body>
    <?php
    echo "<p><a href=\"index.php\">Home</a></p>";
    echo "<p><a href=\"sqltest.php\">SQLtest</a></p>";

    require_once "login.php";
    $conn = new mysqli($hn, $un, $pw, $db);
    if($conn->connect_error) die($conn->connect_error);

    $query = "CREATE TABLE cats (
      id SMALLINT NOT NULL AUTO_INCREMENT,
      family VARCHAR(32) NOT NULL,
      name VARCHAR(32) NOT NULL,
      age TINYINT NOT NULL,
      PRIMARY KEY (id)
    )";
    $result = $conn->query($query);
    if(!$result) die($conn->error);

    $result->close();
    $conn->close();
    ?>
  </body>
</html>
