import axios from 'axios'
import { useDispatch } from 'react-redux';
import { tokenConfig } from './authReducer';
// Action types
const GET_ITEMS = 'GET_ITEMS'
const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';


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

export const addItem = (item) =>{
    return async(dispatch,getState)=>{
      
        try {
            const response = await axios.post('/api/items',item,tokenConfig(getState));
            console.log(response.data)
            dispatch({
                type: ADD_ITEM,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteItem = (id)=>{
    return async(dispatch,getState)=>{
      
        try {
            const response = await axios.delete(`/api/items/${id}`,tokenConfig(getState));
            console.log('deleted')
            dispatch({
                type: DELETE_ITEM,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }
}


const initialState = {
    items: []
}
//reducer
const itemReducer = (state = initialState , action) =>{
    switch(action.type){
        case GET_ITEMS:
            return{
                ...state,
                items:action.payload,
            }
        case ADD_ITEM:
            return{
               ...state,
               items:[...state.items,action.payload]
            };
        case DELETE_ITEM:
           
            return{
                ...state,
                items: state.items.filter(item =>item._id!==action.payload)
            } ;
       
        default:
            return state;       
    }
}

export default itemReducer;