class UserManager {
    #users;

    constructor () {
        this.#users = [];
    }

    #generateId() {
        let idMax = 0

        this.#users.forEach((user) => {
            if (user.id > idMax) {
                idMax = user.id;
            }
        });

        return idMax + 1;
    }

    createUser(firstName, lastName, age) {
        const newUser = {
            id: this.#generateId(),
            firstName,
            lastName,
            age
        };

        this.#users.push(newUser);
    }

    deleteUser(id) {
        const index = this.#users.findIndex((user) => user.id === id);

        if (index < 0) {
            console.log("Usuario no encontrado");
            return;
        }

        this.#users.splice(index, 1);
    }

    getUsers() {
        return this.#users;
    }
}

const userManager = new UserManager();
userManager.createUser("Juan", "Medina", 21);
userManager.createUser("Lorena", "Perez", 30);
userManager.createUser("Maria", "Medina", 18);
userManager.createUser("Pablo", "Pereyra", 50);

console.log("Inicial", userManager.getUsers());

userManager.deleteUser(3);
console.log("Modificado", userManager.getUsers());


