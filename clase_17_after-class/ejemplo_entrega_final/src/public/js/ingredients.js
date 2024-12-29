/* eslint-disable no-unused-vars */

const inputRecipeId = document.getElementById("recipe-id");
const recipeId = inputRecipeId.value;

const addIngredient = async (ingredientId) => {
    await fetch(`/api/recipes/${recipeId}/ingredients/${ingredientId}`, { method: "POST" });
};

const removeIngredient = async (ingredientId) => {
    await fetch(`/api/recipes/${recipeId}/ingredients/${ingredientId}`, { method: "DELETE" });
};