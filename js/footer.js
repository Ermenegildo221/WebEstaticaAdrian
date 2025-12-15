// footer.js
fetch("pages/footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  })
  .catch(error => console.error("No se pudo cargar el footer:", error));
