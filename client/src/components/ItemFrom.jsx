
import React , {useState} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import './ItemForm.css'
import { addItem } from '../reducers/itemReducer';

const ItemFrom = () => {
  const [itemName,setItemName] = useState("");
  const[itemId,setItemId] = useState(1);
  const dispatch = useDispatch();

const handleSubmit = (e) =>{
    e.preventDefault();

    setItemId(itemId+1);

    dispatch(addItem({
      id:itemId,
      name: itemName
      
    }))
  }
  return (
    <form action="" onSubmit={handleSubmit} className='item-form'>
       <div className='item-details'>
          <input type = "text" placeholder='Enter an item' onChange={(e)=>setItemName(e.target.value)}/>
          <button type='submit'>Add Item</button>
       </div>
    </form>
  )
}

export default ItemFrom