<?php
$mensaje = "";

$host = "localhost";
$usuario = "usuario_remoto";
$password = "Adripro38#221";
$bd = "saludos_db";

$conn = new mysqli($host, $usuario, $password, $bd);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST" && !empty($_POST["Nombre"])) {
    $nombre = htmlspecialchars($_POST["Nombre"]);
    $mensaje = $nombre . " Bienvenido a mi página";

    $stmt = $conn->prepare("INSERT INTO saludos (saludo) VALUES (?)");
    $stmt->bind_param("s", $mensaje);
    $stmt->execute();
    $stmt->close();
}

$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/matrix.css">
    <title>Página Adrián Fraile</title>
    <link rel="icon" href="favicon.ico" sizes="32x32">
</head>
<body>

<canvas id="matrix"></canvas>

<div class="contenido"> 
  <div class="card" role="main">
    <h1>Página de Adrián Fraile Morales en práctica 4.5</h1>

    <div id="mensaje" class="mensajes">
        <?php echo $mensaje; ?>
    </div>

    <form method="post" action="" name="formulario">
        <input type="text" name="Nombre" id="nombre" placeholder="Nombre" class="input"><br><br>
        <input class="boton" type="submit" id="enviar" value="Enviar"><br><br>
    </form>

    <img src="images/imagen.png"><br>
  </div>
</div>

<script src="js/matrix.js" type="text/javascript"></script>
</body>
</html>
