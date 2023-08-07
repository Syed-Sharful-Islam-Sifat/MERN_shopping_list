import './App.css'
import AppNavbar from './components/Appnavbar'
import ItemFrom from './components/ItemFrom'
import ItemList from './components/ItemList'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getItems } from './reducers/itemReducer'
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch((getItems()));
  },[dispatch])

  return (
    <div>
       <AppNavbar/>
       <ItemFrom/>
       <ItemList/>
    </div>
  )
}

export default App
