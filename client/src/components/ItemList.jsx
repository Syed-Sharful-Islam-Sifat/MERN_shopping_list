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
               <div key = {item.id} className='item-list'>
                  <li>{item.name}</li>
                  <button onClick={()=> handleDelete(item.id)}>Delete</button>
               </div> 
            ))}
         </ul>
      </div>
    
  )
}

export default ItemList