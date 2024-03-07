import { employeeConstants } from "../actions/constants";

const initState = {
  employees: [],
  loading: false,
  error: null,
};

const employeeReducer = (state = initState, action) => {
  switch (action.type) {
    case employeeConstants.GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: action.payload.employees,
        loading: false,
      };
      

    case employeeConstants.GET_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    

    case employeeConstants.GET_EMPLOYEE_FAILURE:
      return {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
     
  

  default:
  return state;
    }
};
export default employeeReducer;
