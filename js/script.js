document.addEventListener('DOMContentLoaded', () => {
  // Referencias
  const boton = document.forms["formulario"];
  const mensaje = document.getElementById("mensaje");
  

  // Al hacer click llamamos a la API para obtener el saludo
  boton.addEventListener('submit', (event) => {
    event.preventDefault();
    const nombre = document.forms["formulario"]["nombre"].value;
    
    // Llamada a la API REST
    fetch(`http://localhost:8080/api/saludos?nombre=${encodeURIComponent(nombre)}`)
      .then(response => response.json())
      .then(data => {
        if (data.estado === 'success') {
          mensaje.textContent = data.mensaje;
        } else {
          mensaje.textContent = 'Error al obtener el saludo';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        mensaje.textContent = 'Error al conectar con la API';
      });
  });
});