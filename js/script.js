    document.addEventListener('DOMContentLoaded', () => {
      // Referencias
      const boton = document.getElementById('boton');
      const mensaje = document.getElementById('mensaje');

      // Textos que vamos rotando
      const textos = [
        'Bienvenido a la página de Adrián',
        '¡has pulsado el botón!',
        'A que ahora si se nota el gym',
        'Otro mensaje más',
        'Último mensaje'
      ];

      // Índice actual — sincronizado con el texto mostrado
      let indice = 0;
      // Inicializa la pantalla con el primer texto del array
      mensaje.textContent = textos[indice];

      // Al hacer click incrementamos el índice y actualizamos el texto
      boton.addEventListener('click', () => {
        indice = (indice + 1) % textos.length; // avanza y vuelve al principio
        mensaje.textContent = textos[indice];
      });
    });