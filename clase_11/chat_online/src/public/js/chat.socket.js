// Documentación de SweetAlert2: https://sweetalert2.github.io/#download

// Establece la conexión con el servidor usando Socket.IO
const socket = io();

const chatText = document.getElementById("chat-text");
const messageLog = document.getElementById("message-log");
let user = null;

// Modal que solicita el nombre para ingresar al chat.
// También, es quien disparar el evento "authenticated"
Swal.fire({
    title: "Identifícate",
    input: "text",
    confirmButtonText: "Ingresar",
    allowOutsideClick: false,
    inputValidator: (value) => {
        return !value && "¡Ingresa tu nombre de usuario para comenzar a chatear!";
    },
}).then((response) => {
    if (response.isConfirmed) {
        user = response.value;
        socket.emit("authenticated", { user });
    }
});

// Evento que se dispara al oprimir la tecla "Enter" (envía el
// mensaje al servidor)
chatText.onkeyup = (event) => {
    if (event.key === "Enter") {
        if (chatText.value.trim().length > 0) {
            socket.emit("message", { user, message: chatText.value });
            chatText.value = "";
        }
    }
};

// Alerta que muestra cuando se ha conectado un nuevo usuario
socket.on("message-log", (data) => {
    if (!user) return;

    messageLog.innerText = "";

    data.messages.forEach((item) => {
        messageLog.innerHTML += `<li>${item.user} dice: <b>${item.message}</b></li>`;
    });
});

// Alerta que muestra cuando se ha conectado un nuevo usuario
socket.on("new-user-connected", (data) => {
    if (!user) return;

    Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: `${data.user} se ha unido al chat`,
        icon: "success",
    });
});