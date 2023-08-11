import React, { useState } from 'react'
import {useDispatch , useSelector}  from 'react-redux'
import { deleteItem } from '../reducers/itemReducer';
import './ItemList.css'
const ItemList = () => {

   const dispatch = useDispatch();
   const state = useSelector(state=>state.items.items);
   const [deleteItemId,setDeleteItemId] = useState(null);
    

   const handleDelete = (id) =>{
     dispatch(deleteItem(id));
     setDeleteItemId(null);
   }
  return (
      <div>
         <ul>
            {state.map(item=>(
               <div className='item-list' key = {item._id}>
                  <li >{item.name}</li>
                  <button onClick={()=> handleDelete(item._id)}>Delete</button>
               </div> 
            ))}
         </ul>
      </div>
    
  )
}

export default ItemList