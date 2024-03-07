import { inventoryConstants } from "../actions/constants";

const initState = {
  inventory: [],
  loading: false,
  error: null,
};

const buildNewInventory = (inventory, inventoryOne) => {
  return [
    ...inventory,
    {
      _id: inventoryOne._id,
      name: inventoryOne.name,
      qty: inventoryOne.qty,
      description: inventoryOne.description,
    },
  ];
};

const inventoryReducer = (state = initState, action) => {
  switch (action.type) {
    case inventoryConstants.ADD_INVENTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
  
    case inventoryConstants.ADD_INVENTORY_SUCCESS:
      const inventoryOne = action.payload.inventory;
      const updatedInventories = buildNewInventory(
        state.inventory,
        inventoryOne
      );

      return {
        ...state,
        inventory: updatedInventories,
        loading: false,
      };
     
    case inventoryConstants.ADD_INVENTORY_FAILURE:
      return {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
    
    case inventoryConstants.DELETE_INVENTORY_REQUEST:
      return { ...state, loading: true };
      
    case inventoryConstants.DELETE_INVENTORY_SUCCESS:
      return { ...state, loading: false };
      
    case inventoryConstants.DELETE_INVENTORY_FAILURE:
      state = { ...state, error: action.payload.error, loading: false };
      break;
    case inventoryConstants.GET_INVENTORY_SUCCESS:
      return {
        ...state,
        inventory: action.payload.inventory,
        loading: false,
      };
      

    case inventoryConstants.GET_INVENTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
     

    case inventoryConstants.GET_INVENTORY_FAILURE:
      return {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
     
  default:
  return state;
    }
};
export default inventoryReducer;