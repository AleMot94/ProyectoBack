const socket = io();

// PRODUCTOS --------------------------------------------------------------------
const productos = [];
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const producto = {
    producto: formulario[0].value,
    precio: formulario[1].value,
    thumbnail: formulario[2].value,
  };

  socket.emit("actualizacionProductos", producto);

  formulario.reset();
});

socket.on("productos", eventoProductos);

async function eventoProductos(productos) {
  const plantillaProductos = await fetch(
    "plantillas/tablaProductos.handlebars"
  );

  const textoPlantilla = await plantillaProductos.text();

  const funcionPlantilla = Handlebars.compile(textoPlantilla);

  const html = funcionPlantilla({ productos });

  const idProductos = document.getElementById("productos");

  idProductos.innerHTML = html;
}

// CHAT -------------------------------------------------------------------------
function mostrarMensajes(mensajes) {
  const chatMensajes = mensajes.map(({ fecha, usuario, texto }) => {
    return `<p>${fecha} - ${usuario}: ${texto}</p>`;
  });

  const mensajesHtml = `
<div>
${chatMensajes.join("\n")}
</div>`;

  const chat = document.getElementById("chat");
  chat.innerHTML = mensajesHtml;
}

socket.on("mensajesActualizados", (mensajes) => {
  mostrarMensajes(mensajes);
});

const btnEnviar = document.getElementById("btnEnviar");

btnEnviar.addEventListener("click", (e) => {
  const inputUsuario = document.getElementById("inputUsuario");
  const inputTexto = document.getElementById("inputTexto");
  if (inputUsuario.value && inputTexto.value) {
    const mensaje = {
      usuario: inputUsuario.value,
      texto: inputTexto.value,
    };
    socket.emit("eventoMensaje", mensaje);
  } else {
    alert("complete los 2 campos");
  }
});
