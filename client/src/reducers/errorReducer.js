// Action Types
const GET_ERRORS = 'GET_ERRORS'
const CLEAR_ERRORS = 'CLEAR_ERROR'

const initialState = {
    msg:{},
    status: null,
    id: null
}

// Action creators
export const returnErrors = (msg,status,id = null)=>{
    return{
        type: GET_ERRORS,
        payload: {msg,status,id}
    }
}

export const clearErrors = () =>{
    return{
        type: CLEAR_ERRORS
    }
}
//error reducers
const errorReducer = (state=initialState,action) =>{
    switch(action.type){
        
        case GET_ERRORS:
            return{
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id
            }
        case CLEAR_ERRORS:
            return{
                msg:{},
                status: null,
                id: null
            }
            
        default:
            return state    

    }
}

export default errorReducer