import React from 'react'
import { useState } from 'react'
import { login } from '../../reducers/authReducer';
import './Register.css'
import { useDispatch , useSelector } from 'react-redux';
import { useEffect } from 'react';
import { clearErrors } from '../../reducers/errorReducer';

const Login = () => {

   
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [msg,setMsg] = useState(null)
    const [pressed,setPressed] = useState(0);
    const dispatch = useDispatch();
    const statelog = useSelector(state=>state.auth);
    const stateerr = useSelector(state=>state.error)

    
    
    const {isAuthenticated} = statelog;
    const {id} = stateerr;
    
    
    useEffect(()=>{
      
        if(id==='LOGIN_FAIL'){
            setMsg(stateerr.msg.msg);
            
        }else{
            setMsg(null);
        }
    },[id,isAuthenticated])
 
 function handleEmail(e){
    
  setEmail(e.target.value);
  dispatch(clearErrors());
 
 }
 function handlePassword(e)
 {
  setPassword(e.target.value);
  dispatch(clearErrors())
 }
const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    dispatch(login(user));

  };  
  return (
    <div>
      {(msg&&!isAuthenticated)?<h1>{msg}</h1>:null}
     <form onSubmit={handleSubmit}>
    <div className='input-fields'>
         <div>
            <label>Email:</label>
            <input type = 'text' placeholder='Email...' value={email} onChange={handleEmail}/>
        </div>

        <div>
            <label>Password:</label>
            <input type = 'text' placeholder='Password...' value={password} onChange={handlePassword}/>
        </div>
       
        <button type = 'submit'>Login</button>

    </div>
 </form> 
    </div>
  )
}

export default Login