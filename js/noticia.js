// noticia.js
document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const idNoticia = parseInt(params.get('id'), 10);

    fetch('datos/noticias.json')
        .then(response => response.json())
        .then(noticias => {
            const noticia = noticias.find(n => n.id === idNoticia && n.estado === 'publica');
            if (noticia) {
                document.getElementById('tituloNoticia').textContent = noticia.titulo;
                document.getElementById('fechaNoticia').textContent = `Fecha: ${noticia.fecha}`;
                document.getElementById('contenidoNoticia').textContent = noticia.contenido;
                document.getElementById('autorNoticia').textContent = noticia.autor;
                document.getElementById('categoriaNoticia').textContent = noticia.categoria;

                const imagen = document.getElementById('imagenNoticia');
                imagen.src = noticia.imagen && noticia.imagen.trim() !== ''
                    ? noticia.imagen
                    : 'imagenes/logoMuni.jpg';
                imagen.onerror = () => imagen.src = 'imagenes/imagenEnCasoDeError.jpg';

                if (noticia.direccion) {
                    const direccionContainer = document.getElementById('direccionNoticia');
                    direccionContainer.style.display = 'block';
                    direccionContainer.querySelector('span').textContent = noticia.direccion;
                }
            } else {
                document.querySelector('main').innerHTML = "<p>No se encontró la noticia.</p>";
            }
        })
        .catch(error => {
            console.error('Error al cargar la noticia:', error);
        });
});

document.addEventListener('DOMContentLoaded', () => {
    const logoTarjeta = document.getElementById('logo-tarjeta');
    if (logoTarjeta) {
        logoTarjeta.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.getElementById('loginBtn');

    // Verificar si hay un usuario logueado
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);
        const nombreUsuario = usuario.usuario;

        // Ocultar botón de login
        if (loginBtn) {
            loginBtn.style.display = 'none';
        }

        // Crear nuevo botón con el nombre del usuario
        const loginDiv = document.querySelector('.login');
        const usuarioBtn = document.createElement('button');
        usuarioBtn.textContent = nombreUsuario;
        usuarioBtn.classList.add('btn-usuario');

        // Agregar funcionalidad al botón (puede ser mostrar perfil o cerrar sesión)
        usuarioBtn.addEventListener('click', function () {
            const cerrar = confirm('¿Querés cerrar sesión?');
            if (cerrar) {
                localStorage.removeItem('usuarioLogueado');
                location.reload(); // Refrescar para mostrar el botón original
            }
        });

        loginDiv.appendChild(usuarioBtn);
    } else {
        // Redirección si el usuario no está logueado y toca login
        loginBtn.addEventListener('click', function () {
            window.location.href = 'login.html';
        });
    }

    // Lógica para mostrar u ocultar el área de comentarios
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    const mensajeLogin = document.getElementById('mensajeLogin');
    const formComentario = document.getElementById('formComentario');
    const confirmacionComentario = document.getElementById('confirmacionComentario');

    if (usuarioLogueado) {
        // Mostrar el formulario de comentarios
        mensajeLogin.style.display = 'none';
        formComentario.style.display = 'block';

        // Capturar envío del comentario
        const btnEnviar = document.getElementById('enviarComentario');
        btnEnviar.addEventListener('click', () => {
            const texto = document.getElementById('comentarioTexto').value.trim();

            if (texto !== '') {
                // Mostrar mensaje de publicación en revisión
                confirmacionComentario.style.display = 'block';
                document.getElementById('comentarioTexto').value = '';

                // Ocultar el mensaje después de 2 segundos sin animación
                setTimeout(() => {
                    confirmacionComentario.style.display = 'none';
                }, 2000);

            }
        });

    } else {
        // Usuario no logueado
        mensajeLogin.style.display = 'block';
        formComentario.style.display = 'none';
    }
});