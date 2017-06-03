<!DOCTYPE html>
<head>
  <link rel="stylesheet" href="css/index.css">
</head>
<body>
  <header>
    <div class="logo">
      <a href="#"><span id="logo-span"></span></a>
    </div>
    <nav>
      <ul>
        <li>
          <a href="#">
          <span id="home"></span>
          <p class="nav-text">Home</p>
          </a>
        </li>
        <li>
          <a href="#">
            <span id="gallery"></span>
            <p class="nav-text">Gallery</p>
          </a>
        </li>
        <li>
          <a href="#">
            <span id="members"></span>
            <p class="nav-text">Members</p>
          </a>
        </li>
        <li>
          <a href="#">
            <span id="logout"></span>
            <p class="nav-text">Logout</p>
          </a>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <article id="form">
      <h3>Загрузите фото с компьютера</h3>
      <form action="index.php" method="post" enctype='multipart/form-data'>
        <input id="file" type="file" name="filename" multiple></input>
        <input id="upload" type="submit" name="button"></input>
      </form>
    </article>
    <article id="photos">
      <?php
      if($_FILES) {
        $name = $_FILES['filename']['name'];
        if($name) {
          switch($_FILES['filename']['type']) {
            case 'image/jpeg': $ext = 'jpg'; break;
            case 'image/gif':  $ext = 'gif'; break;
            case 'image/png':  $ext = 'gif'; break;
            case 'image/tiff': $ext = 'tif'; break;
            default:           $ext = '';
          }
          if($ext) {
            $n = "image.$ext";
            move_uploaded_file($_FILES['filename']['tmp_name'], "uploaded_images/$n");
            echo <<<END
            <figure class="photo">
            <img src="uploaded_images/$n">
            <figcaption>
            <p>$n<span class="star-icon"></span></p>
            <p>Share<span class="twitter-icon"></span><span class="facebook-icon"></span><span class="pinterest-icon"></span><span class="tumbler-icon"></span></p>
            </figcaption>
            </figure>
END;
          } else {
            echo "Неприемлемое расширение";
          }
        } else {
          echo "Не удалось загрузить";
        }
      }
      ?>
    </article>
    <footer>
      <p>© 2013 Photocage app powered by cssauthor.com</p>
    </footer>
  </main>
</body>
