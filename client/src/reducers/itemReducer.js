import axios from 'axios'
import { useDispatch } from 'react-redux';
// Action types
const GET_ITEMS = 'GET_ITEMS'
const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const ITEMS_LOADING = 'ITEMS_LOADING'

//Action Creator
export const getItems = () =>{
  
    return async(dispatch)=>{
      
        try {
            const response = await axios.get('/api/items');
            console.log(response.data)
            dispatch({
                type: GET_ITEMS,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const addItem = (item) =>({
    type: ADD_ITEM,
    payload: item,
})

export const deleteItem = (id)=>({
    type: DELETE_ITEM,
    payload: id,
})

export const setItemsLoading = () =>({
    type: ITEMS_LOADING
})

const initialState = {
    items: []
}

const itemReducer = (state = initialState , action) =>{
    switch(action.type){
        case GET_ITEMS:
            return{
                ...state,
                items:action.payload,
                loading: false
            }
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