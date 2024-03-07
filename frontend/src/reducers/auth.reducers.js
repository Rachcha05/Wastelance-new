import { authConstants } from "../actions/constants";

//initial state of user object
const initState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    nic: "",
    gender: "",
    email: "",
    fullName: "",
    contactNumber: "",
    address: "",
    username: "",
    role: "",
    picture: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  errormsg: null,
  message: "",
};

//check what is the request and returning suitable state for the request
const authReducer = (state = initState, action) => {
  console.log(action);

  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return{
        ...state,
        authenticating: true,
      };
     
    case authConstants.LOGIN_SUCCESS:
      return{
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
     
    case authConstants.LOGIN_FAILURE:
      return{
        ...state,
        errormsg: action.payload.errormsg,
        authenticate: false,
        authenticating: false,
      };
     
    case authConstants.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
      
    case authConstants.LOGOUT_SUCCESS:
      return{
        ...initState,
        loading: false,
      };
     
    case authConstants.LOGOUT_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    
      default:
        return state;
    }
    };
    export default authReducer; 

