document.addEventListener('DOMContentLoaded', () => {
  // Referencias
  const boton = document.forms["formulario"];
  const mensaje = document.getElementById("mensaje");
  

  // Al hacer click incrementamos el índice y actualizamos el texto
  boton.addEventListener('submit', (event) => {
    event.preventDefault();
    const nombre = document.forms["formulario"]["nombre"].value;
    mensaje.textContent = nombre + " bienvenido a mi página";
  });
});