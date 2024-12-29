/* eslint-disable no-unused-vars */

const inputCartId = document.getElementById("cart-id");

const addProduct = async (productId) => {
    const cartId = inputCartId.value;
    await fetch(`/api/carts/${cartId}/products/${productId}`, { method: "POST" });
};

const removeProduct = async (productId) => {
    const cartId = inputCartId.innerText;
    await fetch(`/api/carts/${cartId}/products/${productId}`, { method: "DELETE" });
    window.location.reload();
};