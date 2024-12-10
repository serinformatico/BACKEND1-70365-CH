const ingredientsList = document.getElementById("ingredients-list");
const btnRefreshIngredientsList = document.getElementById("btn-refresh-ingredients-list");

const loadIngredientsList = async () => {
    const response = await fetch("/api/ingredients", { method: "GET" });
    const data = await response.json();
    const ingredients = data.payload.docs ?? [];

    ingredientsList.innerText = "";

    ingredients.forEach((ingredient) => {
        ingredientsList.innerHTML += `<li>Id: ${ingredient.id} - Nombre: ${ingredient.title}</li>`;
    });
};

btnRefreshIngredientsList.addEventListener("click", () => {
    loadIngredientsList();
    console.log("¡Lista recargada!");
});

// Se ejecuta para cargar la lista de ingredientes al ingresar o refrescar
loadIngredientsList();