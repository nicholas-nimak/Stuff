<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>SQLtest</title>
  </head>
  <body>

    <?php

    echo "<p><a href=\"index.php\">Home</a></p>";
    echo "<p><a href=\"create_table.php\">Create Table</a></p>";

    $myErrorMsg = '';
    require 'login.php';
    $conn = new mysqli($hn, $un, $pw, $db);
    if($conn->connect_error) die($conn->connect_error);


    if ( isset($_POST['delete']) && isset($_POST['isbn']) ) {
      $isbn = get_post($conn, 'isbn');
      $query = "DELETE FROM classics WHERE isbn='$isbn'";
      $result = $conn->query($query);
      if (!$result) echo "Сбой при удалении данных: $query<br>" . $conn->error . "<br><br>";
    }

    if ( isset($_POST['author']) &&
    isset($_POST['title']) &&
    isset($_POST['category']) &&
    isset($_POST['year']) &&
    isset($_POST['isbn']) ) {
      $author   = get_post($conn, 'author');
      $title    = get_post($conn, 'title');
      $category = get_post($conn, 'category');
      $year     = get_post($conn, 'year');
      $isbn     = get_post($conn, 'isbn');
      $query = "SELECT * FROM classics WHERE isbn = '$isbn'";
      $result = $conn->query($query);
      $row = $result->fetch_array(MYSQLI_BOTH);
      if (!$row) {
        $query    = "INSERT INTO classics VALUES ('$author', '$title', '$category', '$year', '$isbn')";
        $result   = $conn->query($query);
        if (!$result) echo "Сбой при вставке данных: $query<br>" . $conn->error . "<br><br>";
      } else {
        $myErrorMsg = "Книга $isbn уже есть в базе данных";
      }
    }


     echo <<<_END
      <form action="sqltest.php" method="post">
        <pre>
            Author <input type="text" name="author">

             Title <input type="text" name="title">

          Category <input type="text" name="category">

              Year <input type="text" name="year">

              ISBN <input type="text" name="isbn">

                   <input type="submit" value="ADD RECORD"></pre>
       </form>
_END;

    if ($myErrorMsg) {
      echo $myErrorMsg;
    }

    $query = "SELECT * FROM classics";
    $result = $conn->query($query);

    if (!$result) die ("Сбой при доступе к базе данных: " . $conn->error);
    $rows = $result->num_rows;
    for ($j = 0 ; $j < $rows ; ++$j) {
      $result->data_seek($j);
      $row = $result->fetch_array(MYSQLI_BOTH);
      echo <<<_END
      <pre>
            Author $row[0]
             Title $row[1]
          Category $row[2]
              Year $row[3]
              ISBN $row[4]
                   <form action="sqltest.php" method="post">
                   <input type="hidden" name="delete" value="yes">
                   <input type="hidden" name="isbn"   value="$row[4]">
                   <input type="submit" value="DELETE RECORD">
                   </form>
      </pre>
_END;
    }

    $result->close();
    $conn->close();


    function get_post($conn, $var) {
      return $conn->real_escape_string($_POST[$var]);
    }

    ?>

  </body>
</html>
