import './App.css'
import AppNavbar from './components/Appnavbar'
import ItemFrom from './components/ItemFrom'
import ItemList from './components/ItemList'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
 import { getItems } from './reducers/itemReducer'
 import { loadUser } from './reducers/authReducer'
 import Register from './components/auth/Register'
import Login from './components/auth/Login'

function App() {
  const dispatch = useDispatch();

    useEffect(()=>{
    dispatch((getItems()));

  },[dispatch])
  
 useEffect(()=>{
  dispatch(loadUser());
  console.log('app.jsx useEffect rendered')
 },[])
  return (
    <div>
      <AppNavbar/>
       <ItemFrom/>
       <ItemList/>
       <Login/>
       <Register/>
    </div>
  )
}

export default App
