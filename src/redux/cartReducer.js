const initialState ={
    cartItems:['item']
}

export const cartReducer = (state=initialState, action)=>{

    switch (action.type)
    {
        case 'ADD TO CART':{
            return{
                ...state,
                cartItems : [...state.cartItems ,action.payload]
            }
        }
        case 'DELETE FROM CART':{
            return{
                ...state,
                cartItems :state.cartItems.filter(obj=>obj.id !==action.payload.id)
            }
        }
        default : return state
    }
}