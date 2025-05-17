document.addEventListener('DOMContentLoaded', function () {
    const loginDiv = document.querySelector('.login');
  
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (!usuarioGuardado || !loginDiv) return;
  
    const usuario = JSON.parse(usuarioGuardado);
    const nombreUsuario = usuario.usuario;
    const rol = usuario.rol;
  
    loginDiv.innerHTML = ''; // Limpia el botón anterior
  
    const contenedorUsuario = document.createElement('div');
    contenedorUsuario.classList.add('contenedor-usuario');
  
    const usuarioBtn = document.createElement('button');
    usuarioBtn.textContent = nombreUsuario;
    usuarioBtn.classList.add('btn-usuario');
  
    const menu = document.createElement('ul');
    menu.classList.add('menu-desplegable');
    menu.style.display = 'none';
  
    if (rol === 'administrador') {
      const opcionNoticias = document.createElement('li');
      opcionNoticias.textContent = 'Noticias pendientes';
      opcionNoticias.addEventListener('click', () => {
        window.location.href = 'admin/noticias-pendientes.html';
      });
  
      const opcionPreguntas = document.createElement('li');
      opcionPreguntas.textContent = 'Preguntas pendientes';
      opcionPreguntas.addEventListener('click', () => {
        window.location.href = 'admin/preguntas-pendientes.html';
      });
  
      menu.appendChild(opcionNoticias);
      menu.appendChild(opcionPreguntas);
    } else if (rol == 'vecino'){
      const opcionPerfil = document.createElement('li');
      opcionPerfil.textContent = 'Mi perfil';
      opcionPerfil.addEventListener('click', () => {
        window.location.href = '/usuario/perfil.html';
      });
      menu.appendChild(opcionPerfil);
    }
  
    const opcionCerrarSesion = document.createElement('li');
    opcionCerrarSesion.textContent = 'Cerrar sesión';
    opcionCerrarSesion.addEventListener('click', () => {
      localStorage.removeItem('usuarioLogueado');
      location.href = '../index.html';
    });
  
    menu.appendChild(opcionCerrarSesion);
  
    usuarioBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    });
  
    document.addEventListener('click', () => {
      menu.style.display = 'none';
    });
  
    contenedorUsuario.appendChild(usuarioBtn);
    contenedorUsuario.appendChild(menu);
    loginDiv.appendChild(contenedorUsuario);
  });
  