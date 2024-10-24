/*
    HANDS ON LAB: Manager de usuarios

    ¿Cómo lo hacemos?

    Se creará una clase que permita gestionar usuarios usando fs.promises, éste
    deberá contar sólo con dos métodos: Crear un usuario y consultar los usuarios
    guardados.

        1. El Manager debe vivir en una clase en un archivo externo llamado
           UsersManager.js (Como el realizado en la clase pasada).
        2. El método “Crear usuario” debe recibir un objeto con los campos:
            - Nombre
            - Apellido
            - Edad
            - Curso
            El método debe guardar un usuario en un archivo “Usuarios.json”, deben
            guardarlos dentro de un arreglo, ya que se trabajarán con múltiples
            usuarios.
        3. El método “ConsultarUsuarios” debe poder leer un archivo Usuarios.json
           y devolver el arreglo correspondiente a esos usuarios.
*/

import UsersManager from "./UsersManager.js";

const usersManager = new UsersManager();

async function execute() {
    await usersManager.crearUsuario("Juan", "Perez", 24, "Programación Backend");
    await usersManager.crearUsuario("Lorena", "Medina", 18, "Programación Backend");
    await usersManager.crearUsuario("Maria", "Pereyra", 21, "Programación Frontend");
    await usersManager.consultarUsuarios();
}

execute();