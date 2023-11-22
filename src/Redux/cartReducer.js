

const initialState = {
   cartItems: [],
 };
 
 const cartReducer = (state = initialState, action) => {
   switch (action.type) {
     case 'ADD_TO_CART':
       return {
         ...state,
         cartItems: [...state.cartItems, action.payload],
       };
     case 'REMOVE_FROM_CART':
       return {
         ...state,
         cartItems: state.cartItems.filter(item => item.itemId !== action.payload),
       };
     case 'INCREASE_QUANTITY':
       return {
         ...state,
         cartItems: state.cartItems.map(item =>
           item.itemId === action.payload.itemId
             ? { ...item, quantity: item.quantity + 1 }
             : item
         ),
       };
     case 'DECREASE_QUANTITY':
       return {
         ...state,
         cartItems: state.cartItems.map(item =>
           item.itemId === action.payload.itemId
             ? { ...item, quantity: item.quantity - 1 }
             : item
         ),
       };
     default:
       return state;
   }
 };
 
 export default cartReducer;
 