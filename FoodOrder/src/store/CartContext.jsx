import { createContext, useReducer } from 'react';

 const  CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart: () => {},
});

function cartReducer(state, action) {
    // console.log('state', state);
    if (action.type === 'ADD_ITEM') {
        //return index of the item in the cart if it already exists, otherwise -1
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

       console.log('entered the cart reducer function')
        //copy the prev items 
        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex];
            console.log('add existing to cart')
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            };
            
            //update the prev item with new updated item with {+1 quantity}
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
            console.log('add new item')
        }

        return { ...state, items: updatedItems };
    }
    

    if (action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingCartItem = state.items[existingCartItemIndex];

        const updatedItems = [...state.items];

        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return { ...state, items: updatedItems };
    }

    if(action.type === 'CLEAR_CART'){
        return {...state, items:[]}
    }
    return state;

}


export  function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });
  
     function addItem(item){
         console.log('additem')
        dispatchCartAction({type: 'ADD_ITEM', item})
     }

     function removeItem(id){
        dispatchCartAction({type: 'REMOVE_ITEM', id})
     }
    
     function clearCart() {
        dispatchCartAction({type: 'CLEAR_CART'})
     }
     const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart,
     }
    return (
            <CartContext value={cartContext}>{children}</CartContext>
        );
}

export default CartContext;