const loaddataCart = () => JSON.parse(localStorage.getItem("dataCart")) || {}

const initialState = {
    items: loaddataCart(),
  };

const hobbyReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_TO_CART': {
            const { id } = action.payload;
            const updatedItems = { ...state.items, [id]: (state.items[id] || 0) + 1 };
            localStorage.setItem('dataCart', JSON.stringify(updatedItems));
            return {
                ...state,
                items: {
                  ...state.items,
                  [id]: (state.items[id] || 0) + 1,
                },
              };
        }

        case 'UP_TO_CART': {
            const {id} = action.payload
            const updatedItems = {...state.items}
            if(updatedItems[id]){
                updatedItems[id] += 1
                localStorage.setItem('dataCart',JSON.stringify(updatedItems))
            }
            return{
                ...state,
                items: updatedItems,
            }
        }

        case 'DOWN_TO_CART': {
            const {id} = action.payload
            const updatedItems = {...state.items}
            if(updatedItems[id] && updatedItems[id] > 1){
                updatedItems[id] -= 1
                localStorage.setItem('dataCart',JSON.stringify(updatedItems))
            }
            return{
                ...state,
                items: updatedItems,
            }
        }

        case 'REMOVE_TO_CART': {
            const {id} = action.payload
            const updatedItems = {...state.items}
            delete updatedItems[id]
            localStorage.setItem('dataCart',JSON.stringify(updatedItems))

            return{
                ...state,
                items: updatedItems,
            }
        }

        default:
            return state
    }
}

export const addToCart = (id) => ({
    type: "ADD_TO_CART",
    payload: { id },
});
export const upToCart = (id) => ({
    type: "UP_TO_CART",
    payload: { id },
});
export const downToCart = (id) => ({
    type: "DOWN_TO_CART",
    payload: { id },
});
export const removeToCart = (id) => ({
    type: "REMOVE_TO_CART",
    payload: { id },
});

export default hobbyReducer