
import React , {useState} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import './ItemForm.css'
import { addItem } from '../reducers/itemReducer';

const ItemFrom = () => {
  const [itemName,setItemName] = useState("");
  const dispatch = useDispatch();
  const stateAuth = useSelector(state=>state.auth);
  const {isAuthenticated} = stateAuth;
const handleSubmit = (e) =>{
    e.preventDefault();
    if(itemName){
    dispatch(addItem({
      name: itemName
    }))}
  }
  return (
    <div>
      <form action="" onSubmit={handleSubmit} className='item-form'>
        <div className='item-details'>
            <input type = "text" placeholder='Enter an item' onChange={(e)=>setItemName(e.target.value)}/>
            <button type='submit'>Add Item</button>
        </div>
      </form>
    </div>
  )
}

export default ItemFrom