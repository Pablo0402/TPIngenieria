// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form'); // Formulario de login
  const inputUsuario = document.getElementById('usuario'); // Campo usuario
  const inputClave = document.getElementById('clave');     // Campo contraseña

  let usuarios = []; // Lista de usuarios cargados desde el JSON

  // 1. Cargar los usuarios desde usuarios.json
  fetch('datos/usuarios.json') // Asegurate que la ruta sea correcta desde login.html
    .then(response => response.json())
    .then(data => {
      usuarios = data;
    })
    .catch(error => {
      console.error('Error al cargar el archivo de usuarios:', error);
    });

  // 2. Cuando el usuario envía el formulario:
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Previene la recarga de página

    const usuarioIngresado = inputUsuario.value.trim();
    const claveIngresada = inputClave.value.trim();

    // 3. Buscar un usuario que coincida
    const usuarioEncontrado = usuarios.find(
      u => u.usuario === usuarioIngresado && u.clave === claveIngresada
    );

    if (usuarioEncontrado) {
      const rol = usuarioEncontrado.rol;

      // 4. Mensaje de bienvenida según el rol
      alert(`Bienvenido, ${usuarioIngresado}! Rol: ${rol}`);

      // 5. Guardar en localStorage si querés usarlo en otras partes
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioEncontrado));

      // 6. Redirigir al index siempre independientemente de que rol sea 

     window.location.href = 'index.html';


    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  });
});