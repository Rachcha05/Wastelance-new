import { userConstants } from "../actions/constants";

const initState = {
  error: null,
  message: "",
  loading: false,
  errormsg: null,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case userConstants.USER_SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
      
    case userConstants.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      
    case userConstants.USER_SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errormsg: action.payload.errormsg,
      };
      
      default:
        return state;
    }
    };
    export default userReducer;





/* import { userContants } from "../actions/constants"

const initState = {
    error: null,
    message: '',
    loading: false
}

const userReducer = (state = initState, action) => {
    switch(action.type){
        case userContants.USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true
            }
            
        case userContants.USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message
            }
            
        case userContants.USER_REGISTER_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload.error
            };
            
    
    default:
    return state;
}
};
export default userReducer; */