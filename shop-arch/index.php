<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <title>Catalog</title>
  </head>
  <body>
    <?php
    if($_SERVER['REQUEST_URI'] === '/shop-arch/') {
      header("location: /shop-arch/index.php");
    };
    ?>
    <main>
    </main>
    <footer><p>2017 - <?php echo date("Y"); ?></p></footer>
    <script src="./lib.js" charset="utf-8"></script>
    <script src="./app.js" charset="utf-8"></script>
  </body>
</html>
