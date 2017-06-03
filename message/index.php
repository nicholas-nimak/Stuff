<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Messages</title>
</head>
<body>

<form action="index.php" method="post">
  <pre>
    Author: <input type="text" name="author"><br>
    Message:<br>
    <textarea name="message" rows="8" cols="80"></textarea><br>
    <input type="submit" value="add">
</pre>
</form>

  <?php
  // date_default_timezone_set("Europe/Kiev");
  // $date = date("j F Y H:i:s");
  require_once "login.php";
  $conn = new mysqli($hn, $un, $pw, $db);
  if($conn->connect_error) die($conn->connect_error);

  if($_POST) {
    if($_POST['author'] && $_POST['message']) {
      $author = $_POST['author'];
      $message = $_POST['message'];
      $query = "SELECT message FROM messages ORDER BY id DESC LIMIT 1";
      $result = $conn->query($query);
      if(!$result) die($conn->error);
      $row = $result->fetch_array(MYSQLI_BOTH);
      if($row[0] !== $message) {
        $query = "INSERT INTO messages (author, message, date) VALUES ('$author', '$message', NOW())";
        $result = $conn->query($query);
        if(!$result) die($conn->error);
      }
    }    
  }

  $query = "SELECT * FROM messages";
  $result = $conn->query($query);
  if(!$result) die($conn->error);
  $rows = $result->num_rows;

  for($j = 0; $j < $rows; ++$j) {
    $result->data_seek($j);
    $row = $result->fetch_array(MYSQLI_BOTH);
    $author = $row[0];
    $message = $row[1];
    $sqldate = $row[2];
    echo <<<_END
    <div style="display: flex; font-family: arial, sans-serif">
    <p style="font-size: 14px; font-weight: bold; margin: 0; margin-right: 20px; margin-top: 5px;">$author</p>
    <div style="">
    <p style="font-size: 20px; margin: 0;">$message</p>
    <p style="font-size: 12px;">$sqldate</p>
    </div>
    </div>
_END;
}



  $result->close();
  $conn->close();
  ?>
</body>
</html>
