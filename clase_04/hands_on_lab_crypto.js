/*
    HANDS ON LAB: Práctica de módulo nativo: crypto

    ¿Cómo lo hacemos?

    Se creará una clase "UsersManager" que permitirá guardar usuarios en un
    atributo estático. El usuario se recibirá con una contraseña en string plano,
    y se deberá guardar la contraseña hasheada con crypto. Utilizar el módulo
    nativo crypto.

    El manager debe contar con los siguientes métodos:
        1. El método "Crear usuario" debe recibir un objeto con los campos:
            - Nombre
            - Apellido
            - Nombre de usuario
            - Contraseña
           El método debe guardar un usuario en un atributo estático llamado
           "Usuarios", recordando que la contraseña debe estar hasheada por
           seguridad.
        2. El método "Mostrar Usuarios" imprimirá en consola todos los usuarios
           almacenados.
        3. El método "Validar Usuario" recibirá el nombre de usuario que quiero
           validar, seguido de la contraseña,  debe poder leer el json previamente
           generado con el arreglo de usuarios y hacer la comparación de contraseñas,
           Si coinciden el usuario y la contraseña, devolver un mensaje "Logueado",
           caso contrario indicar error si el usuario no existe, o si la contraseña
           no coincide.

    Referencias de longitud de algoritmos:
        AES-128-CBC require una key de 16-bytes (128-bit).
        AES-192-CBC require una key de 24-bytes (192-bit).
        AES-256-CBC require una key de 32-bytes (256-bit).
*/

class UsersManager {
    static users = [];  // Atributo estático para almacenar usuarios

    #crypto;            // Módulo "crypto" de NodeJS
    #algorithm;         // Algoritmo de cifrado
    #key;               // Clave secreta para cifrar
    #iv;                // Vector de inicialización aleatorio

    constructor() {
        this.#crypto = require("crypto");
        this.#algorithm = "AES-256-CBC";
        this.#key = "miClaveSecretaDeEjemploUsada2024"; // Importante: Debe tener una longitud de 32 caracteres.
        this.#iv = this.#crypto.randomBytes(16);
    }

    // Método privado para encriptar texto
    #encryptText = (texto) => {
        // Crea un cifrador
        const cipher = this.#crypto.createCipheriv(this.#algorithm, this.#key, this.#iv);

        // Cifra el texto
        let encryptedText = cipher.update(texto, "utf8", "hex");
        encryptedText += cipher.final("hex");

        return encryptedText;
    }

    // Método privado para desencriptar texto
    #decryptText = (textoEncriptado) => {
        // Crea un descifrador
        const decipher = this.#crypto.createDecipheriv(this.#algorithm, this.#key, this.#iv);

        // Descifra el texto
        let decryptedText = decipher.update(textoEncriptado, "hex", "utf8");
        decryptedText += decipher.final("utf8");

        return decryptedText;
    }

    // Método para crear un nuevo usuario
    createUser = (firstName, lastName, username, password) => {
        const user = {
            firstName,
            lastName,
            username: username.trim(),
            password: this.#encryptText(password.trim()),
        };

        // Agrega el nuevo usuario al arreglo estático
        UsersManager.users.push(user);
    }

    // Método para mostrar todos los usuarios
    showUsers = () => {
        console.log(UsersManager.users);

        // Imprime la contraseña desencriptada de cada usuario
        UsersManager.users.forEach((user) => {
            console.log(`Contraseña desencriptada de ${user.nombre}: ${this.#decryptText(user.password)}`);
        });
    }

    // Método para validar un usuario y su contraseña
    validateUser = (username, password) => {
        // Busca el usuario por nombre de usuario
        const user = UsersManager.users.find((user) => user.username === username.trim());

        if (!user) {
            console.log("El usuario no existe");
        } else if (this.#decryptText(user.password) != password.trim()) {
            console.log("La contraseña no coincide");
        } else {
            console.log("Logueado");
        }
    }
}

// Ejemplo de uso de la clase UsersManager
const usersManager = new UsersManager();
usersManager.createUser("Juan", "Perez", "juan2024", "123456");
usersManager.createUser("Lorena", "Medina", "lore2024", "654321");
usersManager.createUser("Maria", "Torres", "mt2024", "maria1");

usersManager.showUsers();

usersManager.validateUser("lore2024", "654321");