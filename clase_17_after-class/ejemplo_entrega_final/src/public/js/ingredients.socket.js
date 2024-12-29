const socket = io();

const ingredientsList = document.getElementById("ingredients-list");
const ingredientsForm = document.getElementById("ingredients-form");
const inputIngredientId = document.getElementById("input-ingredient-id");
const btnDeleteIngredient = document.getElementById("btn-delete-ingredient");
const errorMessage = document.getElementById("error-message");

socket.on("ingredients-list", (data) => {
    const ingredients = data.ingredients.docs ?? [];
    ingredientsList.innerText = "";

    ingredients.forEach((ingredient) => {
        ingredientsList.innerHTML += `<li class='ingredients__box__list__item'>Id: ${ingredient.id} - Nombre: ${ingredient.title}</li>`;
    });
});

ingredientsForm.onsubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    errorMessage.innerText = "";

    form.reset();

    socket.emit("insert-ingredient", {
        title: formData.get("title"),
        status: formData.get("status") || "off",
        stock: formData.get("stock"),
    });
};

btnDeleteIngredient.onclick = () => {
    const id = Number(inputIngredientId.value);
    inputIngredientId.value = "";
    errorMessage.innerText = "";

    if (id > 0) {
        socket.emit("delete-ingredient", { id });
    }
};

socket.on("error-message", (data) => {
    errorMessage.innerText = data.message;
});