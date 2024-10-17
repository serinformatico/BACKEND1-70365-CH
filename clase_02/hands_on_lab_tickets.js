/*
    HANDS ON LAB: Registrador de tickets de eventos

    ¿Cómo lo hacemos?

    Se creará una clase que permitirá llevar una gestión completa de usuarios
    que deseen acceder a dichos eventos.

    1. Definir clase TicketManager, el cual tendrá un arreglo de eventos que
       iniciará vacío
    2. La clase debe contar con una variable privada “precioBaseDeGanancia”, la
       cual añadirá un costo adicional al precio de cada evento.
    3. Debe contar con el método “getEventos” El cual mostrará los eventos guardados.
    4. Debe contar con el método “agregarEvento” El cual recibirá los siguientes
       parámetros:
        - nombre
        - lugar
        - precio (deberá agregarse un 0.15 del valor original)
        - capacidad (50 por defecto)
        - fecha (hoy por defecto)
       El método deberá crear además el campo id auto-incrementable y el campo
       “participantes” que siempre iniciará con un arreglo vacío.
    5. Debe contar con un método “agregarUsuario” El cual recibirá:
        - id del evento (debe existir, agregar validaciones)
        - id del usuario
       El método debe evaluar que el evento exista y que el usuario no haya estado
       registrado previamente (validación de fecha y capacidad se evitará para no
       alargar el reto). Si todo está en orden, debe agregar el id del usuario en
       el arreglo “participantes” de ese evento.
    6. Debe contar con un método “ponerEventoEnGira” El cual recibirá:
        - id del evento
        - nueva localidad
        - nueva fecha
       El método debe copiar el evento existente, con una nueva localidad, nueva
       fecha, nuevo id y sus participantes vacíos (Usar spread operator para el
       resto de las propiedades).
*/

class TicketManager {

    // Propiedades privadas
    #precioBaseDeGanancia;
    #eventos;

    // Constructor de instancia
    constructor() {
        this.#precioBaseDeGanancia = 0.15;
        this.#eventos = [];
    }

    // Método privado: Genera unívocamente y de forma segura un nuevo ID.
    #generarId = () => {
        let idMayor = 0;

        this.#eventos.forEach((evento) => {
            if (evento.id > idMayor) {
                idMayor = evento.id;
            }
        });

        return idMayor + 1;
    };

    // Método público que crea un "evento" y lo agrega al array de "eventos"
    agregarEvento = (nombre, lugar, precio, capacidad = 50, fecha = new Date().toLocaleDateString()) => {
        // Define la estructura del "evento"
        const evento = {
            id: this.#generarId(),
            nombre,
            lugar,
            precio: precio + (precio * this.#precioBaseDeGanancia),
            capacidad,
            fecha,
            participantes: []
        };

        // Agrega el "evento" creado al array de "eventos"
        this.#eventos.push(evento);
    };

    // Método público que agrega un "usuario" al array de "participantes"
    agregarUsuario = (idEvento, idUsuario) => {
        const indiceDelEvento = this.#eventos.findIndex((e) => e.id === idEvento);

        // Verifica que exista el "evento", caso contrario, termina la ejecución del método.
        if (indiceDelEvento < 0) {
            console.log("Evento no encontrado");
            return;
        }

        const usuarioRegistrado = this.#eventos[indiceDelEvento].participantes.includes(idUsuario);

        // Verifica que el "usuario" no esté registrado, caso contrario, termina la ejecución del método.
        if (usuarioRegistrado) {
            console.log("Usuario ya registrado");
            return;
        }

        // Agrega el "usuario" creado al array de "participantes"
        this.#eventos[indiceDelEvento].participantes.push(idUsuario);
   };

    // Método público que clona un "evento" y lo agrega al array de "eventos"
    ponerEventoEnGira = (idEvento, nuevaLocalidad, nuevaFecha) => {
        const indiceDelEvento = this.#eventos.findIndex((e) => e.id === idEvento);

        // Verifica que exista el "evento", caso contrario, termina la ejecución del método.
        if (indiceDelEvento < 0) {
            console.log("Evento no encontrado");
            return;
        }

        const evento = this.#eventos[indiceDelEvento];

        // Define la estructura del nuevo "evento" a partir de un "evento" ya creado.
        const nuevoEvento = {
            ...evento,
            id: this.#generarId(),
            lugar: nuevaLocalidad,
            fecha: nuevaFecha,
            participantes: []
        };

        // Agrega el "evento" creado al array de "eventos"
        this.#eventos.push(nuevoEvento);
    };

    // Método público (getter) retorna los "eventos"
    getEventos = () => {
        return this.#eventos;
    };
}

const ticketManager = new TicketManager();

ticketManager.agregarEvento('Evento Coder A', 'Buenos Aires', 1500.0);
ticketManager.agregarUsuario(1, 10);
ticketManager.agregarUsuario(1, 12);

ticketManager.agregarEvento('Mega Evento Coder B', 'Santa Fe', 1800.0, 100);
ticketManager.agregarUsuario(2, 10);
ticketManager.agregarUsuario(2, 15);

ticketManager.ponerEventoEnGira(1, 'Córdoba', '30/11/2024');

console.log(ticketManager.getEventos());