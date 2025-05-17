// Este script se encarga de manejar la interacción desde la página principal (index.html)

document.addEventListener('DOMContentLoaded', function () {
  const loginBtn = document.getElementById('loginBtn');

  // Verificar si hay un usuario logueado
  const usuarioGuardado = sessionStorage.getItem('usuarioLogueado');
  if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);
    const nombreUsuario = usuario.usuario;
    const rol = usuario.rol;

    // Ocultar botón de login
    if (loginBtn) {
      loginBtn.style.display = 'none';
    }

    const loginDiv = document.querySelector('.login');

    // Contenedor para el botón del usuario y el menú desplegable
    const contenedorUsuario = document.createElement('div');
    contenedorUsuario.classList.add('contenedor-usuario'); // se posiciona relativo

    // Crear botón con el nombre del usuario
    const usuarioBtn = document.createElement('button');
    usuarioBtn.textContent = nombreUsuario;
    usuarioBtn.classList.add('btn-usuario');

    // Crear el menú desplegable (solo si es administrador)
    let menu = null;
    if (rol === 'administrador') {
      menu = document.createElement('ul');
      menu.classList.add('menu-desplegable');
      menu.style.display = 'none'; // Oculto inicialmente

      // Crear opciones del menú
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

      const opcionCerrarSesion = document.createElement('li');
      opcionCerrarSesion.textContent = 'Cerrar sesión';
      opcionCerrarSesion.addEventListener('click', () => {
        sessionStorage.removeItem('usuarioLogueado');
        location.reload(); // Recargar página para restaurar botón de login
      });

      // Agregar ítems al menú
      menu.appendChild(opcionNoticias);
      menu.appendChild(opcionPreguntas);
      menu.appendChild(opcionCerrarSesion);

      // Mostrar u ocultar el menú al hacer clic en el botón
      usuarioBtn.addEventListener('click', function (e) {
        e.stopPropagation(); // Evita que el evento se propague y lo cierre inmediatamente

        // Toggle de clase animada
        if (menu.classList.contains('menu-visible')) {
          menu.classList.remove('menu-visible');
          setTimeout(() => {
            if (!menu.classList.contains('menu-visible')) {
              menu.style.display = 'none';
            }
          }, 300); // Espera a que termine la animación
        } else {
          menu.style.display = 'block';
          void menu.offsetHeight; // Forzar reflujo para que se apliquen las transiciones
          menu.classList.add('menu-visible');
        }
      });

      // Cerrar menú si se hace clic fuera
      document.addEventListener('click', () => {
        if (menu && menu.classList.contains('menu-visible')) {
          menu.classList.remove('menu-visible');
          setTimeout(() => {
            if (!menu.classList.contains('menu-visible')) {
              menu.style.display = 'none';
            }
          }, 300);
        }
      });

      contenedorUsuario.appendChild(menu); // Agregamos el menú si es admin
    } else {
      // Si no es administrador, botón permite cerrar sesión
      usuarioBtn.addEventListener('click', function () {
        const cerrar = confirm('¿Querés cerrar sesión?');
        if (cerrar) {
          sessionStorage.removeItem('usuarioLogueado');
          location.reload();
        }
      });
    }

    // Agregamos el botón al contenedor y luego al header
    contenedorUsuario.appendChild(usuarioBtn);
    loginDiv.appendChild(contenedorUsuario);
  } else {
    // Redirección si el usuario no está logueado y toca login
    loginBtn.addEventListener('click', function () {
      window.location.href = 'login.html';
    });
  }

  // Cargar y mostrar noticias públicas
  cargarNoticiasPublicas();



});
/*
// Cargar y mostrar solo noticias públicas (estado = "publica")
function cargarNoticiasPublicas() {
  fetch('datos/noticias.json')
    .then(response => response.json())
    .then(data => {
      const noticiasPublicas = data.filter(noticia => noticia.estado === 'publica');
      mostrarNoticias(noticiasPublicas);
    })
    .catch(error => {
      console.error('Error al cargar las noticias:', error);
    });
}
*/
//Para el filtro de fecha y categoria
let todasLasNoticias = [];

function cargarNoticiasPublicas() {
  fetch('datos/noticias.json')
    .then(response => response.json())
    .then(data => {
      todasLasNoticias = data.filter(noticia => noticia.estado === 'publica');
      mostrarNoticias(todasLasNoticias);
    })
    .catch(error => {
      console.error('Error al cargar las noticias:', error);
    });
}


function mostrarNoticias(noticias) {
  const contenedor = document.querySelector('.grid-noticias');
  contenedor.innerHTML = ''; // Limpiar anteriores

  noticias.forEach(noticia => {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('tarjeta-noticia'); // ← Agregá esta clase
    tarjeta.classList.add('noticia'); // (podés mantener esta también si la usás para estilos)

    const imagen = document.createElement('img');
    const rutaPrincipal = (noticia.imagen && noticia.imagen.trim() !== '') ? noticia.imagen : 'imagenes/logoMuni.jpg';
    imagen.src = rutaPrincipal;
    imagen.alt = `Imagen de ${noticia.titulo}`;
    imagen.classList.add('imagen-noticia');
    imagen.onerror = () => imagen.src = 'imagenes/imagenEnCasoDeError.jpg';

    const titulo = document.createElement('h2');
    titulo.textContent = noticia.titulo;

    const resumen = document.createElement('p');
    resumen.textContent = noticia.resumen;

    tarjeta.appendChild(imagen);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(resumen);

    tarjeta.addEventListener('click', () => {
      window.location.href = `noticia.html?id=${noticia.id}`;
    });

    contenedor.appendChild(tarjeta);
  });
}



// Permitir que el logo redirija al inicio
document.addEventListener('DOMContentLoaded', () => {
  const logoTarjeta = document.getElementById('logo-tarjeta');
  if (logoTarjeta) {
    logoTarjeta.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
});

//Logina para el que el boton de busqueda de noticias funcione
document.addEventListener('DOMContentLoaded', () => {
  const btnBuscar = document.getElementById('btn-buscar');
  const campoBusqueda = document.getElementById('campo-busqueda');

  btnBuscar.addEventListener('click', () => {
    campoBusqueda.style.display = campoBusqueda.style.display === 'none' ? 'block' : 'none';
    campoBusqueda.focus();
  });

  campoBusqueda.addEventListener('input', () => {
    const query = campoBusqueda.value.toLowerCase();
    const tarjetas = document.querySelectorAll('.tarjeta-noticia');

    tarjetas.forEach(tarjeta => {
      const titulo = tarjeta.querySelector('h2').textContent.toLowerCase();
      const descripcion = tarjeta.querySelector('p').textContent.toLowerCase();

      if (titulo.includes(query) || descripcion.includes(query)) {
        tarjeta.style.display = 'block';
      } else {
        tarjeta.style.display = 'none';
      }
    });
  });
});

//logica para el filtro
document.addEventListener('DOMContentLoaded', () => {
  const filtroFecha = document.getElementById('filtro-fecha');
  const filtroCategoria = document.getElementById('filtro-categoria');
  const btnAplicarFiltros = document.getElementById('btn-aplicar-filtros');

  if (btnAplicarFiltros) {
    btnAplicarFiltros.addEventListener('click', () => {
      const fechaSeleccionada = filtroFecha.value;
      const categoriaSeleccionada = filtroCategoria.value.toLowerCase();

      const filtradas = todasLasNoticias.filter(noticia => {
        const coincideFecha = !fechaSeleccionada || noticia.fecha === fechaSeleccionada;
        const coincideCategoria = !categoriaSeleccionada || noticia.categoria.toLowerCase() === categoriaSeleccionada;

        return coincideFecha && coincideCategoria;
      });

      mostrarNoticias(filtradas);
    });
  }
});