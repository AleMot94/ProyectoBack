const socket = io();

function mostrarMensajes(mensajes) {
  const chatMensajes = mensajes.map(({ fecha, usuario, texto }) => {
    return `<p>${fecha} - ${usuario}: ${texto}</p>`;
  });

  const mensajesHtml = `
<ul>
${chatMensajes.join("\n")}
</ul>`;

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
