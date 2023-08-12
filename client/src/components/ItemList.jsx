import React, { useState } from 'react'
import {useDispatch , useSelector}  from 'react-redux'
import { deleteItem } from '../reducers/itemReducer';
import './ItemList.css'
const ItemList = () => {

   const dispatch = useDispatch();
   const state = useSelector(state=>state.items.items);
   const [deleteItemId,setDeleteItemId] = useState(null);
   const stateAuth = useSelector(state=>state.auth);

   const {isAuthenticated} = stateAuth

   const handleDelete = (id) =>{
     dispatch(deleteItem(id));
     setDeleteItemId(null);
   }
  return (
      <div>
         {!isAuthenticated?
         
        <div className='header'>
           <h2>Please Login or Register to add items</h2>
        </div>
          :
         <ul>
            {state.map(item=>(
               <div className='item-list' key = {item._id}>
                  <li >{item.name}</li>
                  <button onClick={()=> handleDelete(item._id)}>Delete</button>
               </div> 
            ))}
         </ul>
         }
      </div>
    
  )
}

export default ItemList