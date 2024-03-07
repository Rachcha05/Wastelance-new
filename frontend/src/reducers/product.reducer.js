/* eslint-disable import/no-anonymous-default-export */
import { productConstants } from "../actions/constants";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const buildNewProducts = (products, product) => {
  return [
    ...products,
    {
      _id: product._id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      offer: product.offer,
      category: product.category,
      productImages: product.productImages,
      feedbacks: product.feedbacks,
      ratings: product.ratings,
      updatedAt: product.updatedAt,
      createdBy: product.createdBy,
      createdAt: product.createdAt,
    },
  ];
};

//const initialState = { products: [] };

const productReducer =  (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        loading: false,
      };
      
    case productConstants.ADD_NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
      
    case productConstants.ADD_NEW_PRODUCT_SUCCESS:
      const product = action.payload.product;
      const updatedProducts = buildNewProducts(state.products, product);
      console.log("updatedProducts", updatedProducts);

      return{
        ...state,
        products: updatedProducts,
        loading: false,
      };
      
    case productConstants.UPDATE_PRODUCT_REQUEST:
      return { ...state, loading: true };
      
    case productConstants.UPDATE_PRODUCT_SUCCESS:
     return { ...state, loading: false };
      
    case productConstants.UPDATE_PRODUCT_FAILURE:
     return { ...state, error: action.payload.error, loading: false };
      
    case productConstants.DELETE_PRODUCT_REQUEST:
     return { ...state, loading: true };
      
    case productConstants.DELETE_PRODUCT_SUCCESS:
     return{ ...state, loading: false };
      
    case productConstants.DELETE_PRODUCT_FAILURE:
      return { ...state, error: action.payload.error, loading: false };
      
  
  default:
    return state;
}
};

export default productReducer;





/* import { productConstants } from "../actions/constants";

const initialState = {
    products: []
};

const productReducer = (state = initialState, action) => {
    switch(action.type){
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload.products
            };
            
    
    default:
    return state;
}
};

export default productReducer; */