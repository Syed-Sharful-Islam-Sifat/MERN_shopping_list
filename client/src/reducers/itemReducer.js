
// Action types
const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
//Action Creator
export const addItem = (item) =>({
    type: ADD_ITEM,
    payload: item,
})

export const deleteItem = (id)=>({
    type: DELETE_ITEM,
    payload: id,
})

const initialState = {
    items: []
}

const itemReducer = (state = initialState , action) =>{
    switch(action.type){
        case ADD_ITEM:
            return{
               ...state,
               items:[...state.items,action.payload]
            };
        case DELETE_ITEM:
           
            return{
                ...state,
                items: state.items.filter(item =>item.id!==action.payload)
            } ;
        default:
            return state;       
    }
}

export default itemReducer;