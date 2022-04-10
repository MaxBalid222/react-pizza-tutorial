export const addPizzaCart = (pizzaObj) => ({
    type: "ADD_PIZZA_CART",
    payload: pizzaObj
})

export const clearCart = () => ({
    type: "CLEAR_CART",
})

export const removeCartItem = (id) => ({
    type: "REMOVE_CART_ITEM",
    payload: id
})

export const incrementCartItem = (id) => ({
    type: "INCREMENT_CART_ITEM",
    payload: id
})

export const decrementCartItem = (id) => ({
    type: "DECREMENT_CART_ITEM",
    payload: id
})