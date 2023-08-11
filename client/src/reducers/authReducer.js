
import { returnErrors } from "./errorReducer"
import axios from "axios"
// Action Types
const USER_LOADED = 'USER_LOADED'
const USER_LOADING = 'USER_LOADING'
const AUTH_ERROR = 'AUTH_ERROR'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_FAIL = 'REGISTER_FAIL'


// action creator
// check token and load user
export const loadUser = ()=>{
     
    return async (dispatch,getState)=>{
      
      try{
       const response = await axios.get('/api/auth/user',tokenConfig(getState));
       console.log('loaduser response data',response.data)
        dispatch({
            type: USER_LOADED,
            payload: response.data
        })
      }catch(err){
        dispatch(returnErrors(err.data,err.status))
        dispatch({type: AUTH_ERROR})
      }

    }
}

export const register = ({name,email,password}) =>{
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({name,email,password});

  
    return async (dispatch)=>{
      try{  
      console.log(body)  
      const response = await axios.post('/api/auth/register',body,config);
      console.log(response.data)
      dispatch({
        type: REGISTER_SUCCESS,
        payload:response.data
      })}catch(err){
        dispatch(returnErrors(err.response.data,err.response.status,'REGISTER_FAIL'))
        dispatch({type: REGISTER_FAIL})
      }
    }
}

export const login = ({email,password}) =>{
  const config = {
      headers:{
          'Content-Type': 'application/json'
      }
  }

  const body = JSON.stringify({email,password});


  return async (dispatch)=>{
    try{  
    const response = await axios.post('/api/auth/login',body,config);
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload:response.data
    })}catch(err){
      dispatch(returnErrors(err.response.data,err.response.status,'LOGIN_FAIL'))
      dispatch({type: LOGIN_FAIL})
    }
  }
}

export const logout = () =>{
  return{
    type: LOGOUT_SUCCESS
  }
} 

export const tokenConfig = (getState)=>{
  const token = getState().auth.token
  const config = {
    headers:{
        "Content-type": "application/json"
    }
  }

  if(token){
    config.headers['x-auth-token'] = token
  }

  return config
}




const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: null
}

//authReducer
const authReducer = (state = initialState,action) =>{
    switch(action.type){
        case USER_LOADING:
            return{
                ...state,
                isLoading:true
            }
        case USER_LOADED:
            return{
              ...state,
              isAuthenticated: true,
              isLoading: false,
              user: action.payload
            }
        case LOGIN_SUCCESS:    
        case REGISTER_SUCCESS:
            localStorage.setItem('token',action.payload.token)
        return{
          ...state,
          ...action.payload,
          isAuthenticated:true,
          isLoading: false
        }
        
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }

       default:
        return state     

    }
}

export default authReducer

