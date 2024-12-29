/* eslint-disable no-unused-vars */

const inputRecipeId = document.getElementById("recipe-id");

const addIngredient = async (ingredientId) => {
    const recipeId = inputRecipeId.value;
    await fetch(`/api/recipes/${recipeId}/ingredients/${ingredientId}`, { method: "POST" });
};

const removeIngredient = async (ingredientId) => {
    const recipeId = inputRecipeId.innerText;
    await fetch(`/api/recipes/${recipeId}/ingredients/${ingredientId}`, { method: "DELETE" });
    window.location.reload();
};