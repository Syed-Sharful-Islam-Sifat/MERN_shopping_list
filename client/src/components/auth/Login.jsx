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
    const dispatch = useDispatch();
    const statereg = useSelector(state=>state.auth);
    const stateerr = useSelector(state=>state.error)

    
    const {isAuthenticated} = statereg;
    const {id} = stateerr;
   
    useEffect(()=>{
        if(id==='LOGIN_FAIL'){
            setMsg(stateerr.msg.error)
        }else{
            setMsg(null);
        }
    })
   
  const handleSubmit = (e) =>{
    e.preventDefault();
    const user = {
        email,
        password
    }
    
    dispatch(login(user));

  }  
  return (
    <div>
     <form onSubmit={handleSubmit}>
    <div className='input-fields'>
         <div>
            <label>Email:</label>
            <input type = 'text' placeholder='Email...' value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </div>

        <div>
            <label>Password:</label>
            <input type = 'text' placeholder='Password...' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
       
        <button type = 'submit'>Login</button>

    </div>
 </form> 
    </div>
  )
}

export default Login