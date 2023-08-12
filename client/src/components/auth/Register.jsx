import React from 'react'
import { useState } from 'react'
import { register } from '../../reducers/authReducer';
import './Register.css'
import { useDispatch , useSelector } from 'react-redux';
import { useEffect } from 'react';
import { clearErrors } from '../../reducers/errorReducer';
const Register = () => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [msg,setMsg] = useState(null)
    const dispatch = useDispatch();
    const statereg = useSelector(state=>state.auth);
    const stateerr = useSelector(state=>state.error)
    
    console.log(stateerr);
    
    const {isAuthenticated} = statereg;
    const {id} = stateerr;
    
    useEffect(()=>{
        if(id==='REGISTER_FAIL'){
            setMsg(stateerr.msg.msg);
          
        }else{
            setMsg(null);
        }
    })

    function handleEmail(e){
    
        setEmail(e.target.value);
        dispatch(clearErrors());
       
    }
    function handleName(e){
    
        setName(e.target.value);
        dispatch(clearErrors());
       
    }
    function handlePassword(e)
    {
        setPassword(e.target.value);
        dispatch(clearErrors())
    }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const user = {
        name,
        email,
        password
    }
    
    dispatch(register(user));

  }  
  return (
    <div>
        {!isAuthenticated?
        <div className='input-container-reg'>
            {(msg&&!isAuthenticated)?
            <h3>{msg}</h3> : null
            }
            <form onSubmit={handleSubmit}>
                <div className='input-fields-reg'>
                    <div>
                    <label>Name:</label>
                    <input type = 'text' placeholder='Name...' value={name} onChange={handleName}/>
                    </div>
                    
                    <div>
                        <label>Email:</label>
                        <input type = 'text' placeholder='Email...' value={email} onChange={handleEmail}/>
                    </div>

                    <div>
                        <label>Password:</label>
                        <input type = 'text' placeholder='Password...' value={password} onChange={handlePassword}/>
                    </div>
                
                    <button type = 'submit'>Register</button>

                </div>
            </form> 
        </div>

        : null }
</div>
  )
}

export default Register