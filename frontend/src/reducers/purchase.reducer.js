import { purchaseConstants } from "../actions/constants";

const initState = {
  purchase: [],
  loading: false,
  error: null,
};

const buildNewPurchases = (purchase, purchaseOne) => {
  return [
    ...purchase,
    {
      _id: purchaseOne._id,
      title: purchaseOne.title,
      qty: purchaseOne.qty,
      unitPrice: purchaseOne.unitPrice,
      description: purchaseOne.description,
    },
  ];
};

const purchaseReducer = (state = initState, action) => {
  switch (action.type) {
    case purchaseConstants.ADD_PURCHASE_REQUEST:
      return {
        ...state,
        loading: true,
      };
     
    case purchaseConstants.ADD_PURCHASE_SUCCESS:
      const purchaseOne = action.payload.purchase;
      const updatedPurchases = buildNewPurchases(state.purchase, purchaseOne);
      console.log("updatedPurchases", updatedPurchases);
      return  {
        ...state,
        purchase: updatedPurchases,
        loading: false,
      };
    
    case purchaseConstants.ADD_PURCHASE_FAILURE:
      return  {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      
    case purchaseConstants.DELETE_PURCHASE_REQUEST:
      state = { ...state, loading: true };
      break;
    case purchaseConstants.DELETE_PURCHASE_SUCCESS:
      return  { ...state, loading: false };
      
    case purchaseConstants.DELETE_PURCHASE_FAILURE:
      return { ...state, error: action.payload.error, loading: false };
      
    case purchaseConstants.GET_PURCHASE_SUCCESS:
      return {
        ...state,
        purchase: action.payload.purchase,
        loading: false,
      };
      

    case purchaseConstants.GET_PURCHASE_REQUEST:
      return  {
        ...state,
        loading: true,
      };
      

    case purchaseConstants.GET_PURCHASE_FAILURE:
      return  {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      
  default:
  return state;
}
};

export default purchaseReducer;
