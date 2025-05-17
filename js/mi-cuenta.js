document.addEventListener('DOMContentLoaded', () => {
  const miCuentaBtn = document.getElementById('miCuentaBtn');
  const menuOpciones = document.getElementById('menuOpciones');
  const cerrarSesion = document.getElementById('cerrarSesion');

  // Alterna visibilidad del menú al hacer clic en "Mi cuenta"
  miCuentaBtn.addEventListener('click', () => {
    menuOpciones.classList.toggle('oculto');
  });

  // Al cerrar sesión, limpiamos sessionStorage y redirigimos al inicio
  cerrarSesion.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('usuarioLogueado');
    window.location.href = '../index.html';
  });

  // Verificación de sesión (por seguridad)
  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
  if (!usuario || usuario.tipo !== 'administrador') {
    // Si no hay sesión válida, redirigimos al login
    window.location.href = '../login.html';
  }
});