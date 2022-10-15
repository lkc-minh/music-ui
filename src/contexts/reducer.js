const reducer = (state, action) => {
    if (action.type === "CLEAR_CART") {
        return { ...state, cart: [] };
    }
    if (action.type === "REMOVE") {
        const newCart = state.cart.filter((item) => item.id !== action.payload);
        return { ...state, cart: newCart };
    }
    if (action.type === "INCREASE") {
        let tempCart = state.cart.map((item) =>
            item.id === action.payload ? { ...item, amount: item.amount + 1 } : item,
        );

        return { ...state, cart: tempCart };
    }

    if (action.type === "DECREASE") {
        let tempCart = state.cart
            .map((item) =>
                item.id === action.payload ? { ...item, amount: item.amount - 1 } : item,
            )
            .filter((item) => item.amount !== 0);

        return { ...state, cart: tempCart };
    }

    if (action.type === "GET_TOTAL") {
        let { total, amount } = state.cart.reduce(
            (cartTotal, cartItem) => {
                const { price, amount } = cartItem;
                const itemTotal = price * amount;

                cartTotal.total += itemTotal;
                cartTotal.amount += amount;

                return cartTotal;
            },
            { total: 0, amount: 0 },
        );
        total = Number(total.toFixed(2));

        return { ...state, total, amount };
    }

    if (action.type === "LOADING") {
        return { ...state, loading: true };
    }

    if (action.type === "DISPLAY_ITEMS") {
        return { ...state, cart: action.payload, loading: false };
    }

    throw new Error("no matching action type");
};

export default reducer;
