import fs from "fs";

export default class UsersManager {
    #rutaDelArchivoDeUsuariosJSON;

    constructor() {
        this.#rutaDelArchivoDeUsuariosJSON = "files/usuarios.json";
    }

    #obtenerUsuarios = async () => {
        // Se valida que exista el archivo de usuarios.json
        // Caso contrario, se crea dicho archivo.
        if (!fs.existsSync(this.#rutaDelArchivoDeUsuariosJSON)) {
            await fs.promises.writeFile(this.#rutaDelArchivoDeUsuariosJSON, "[]");
        }

        // Se carga el contenido del archivo usuarios.json y se retorna en formato JSON
        const usuariosJSON = await fs.promises.readFile(this.#rutaDelArchivoDeUsuariosJSON, "utf8");

        // Se convierte de JSON a Array y se retorna el array de usuarios
        return JSON.parse(usuariosJSON);
    }

    #persistirUsuario = async (nuevoUsuario) => {
        const usuarios = await this.#obtenerUsuarios();

        // Se agrega el usuario al array de usuarios
        usuarios.push(nuevoUsuario);

        // Se vuelve a convertir a JSON y se sobrescribe el archivo usuarios.json
        const usuariosActualizadosJSON = JSON.stringify(usuarios, null, "\t");
        await fs.promises.writeFile(this.#rutaDelArchivoDeUsuariosJSON, usuariosActualizadosJSON);
    }

    crearUsuario = async (nombre, apellido, edad, curso) => {
        const nuevoUsuario = {
            nombre,
            apellido,
            edad,
            curso,
        };

        await this.#persistirUsuario(nuevoUsuario);
    }

    consultarUsuarios = async () => {
        const usuarios = await this.#obtenerUsuarios();
        console.log(usuarios);
    }
}