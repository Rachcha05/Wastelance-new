import { categoryConstants } from "../actions/constants";

const initState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (categories, category) => {
  return [
    ...categories,
    {
      _id: category._id,
      name: category.name,
      slug: category.slug,
      description: category.description,
    },
  ];
};

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
        loading: false,
      };
      
    case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
      return{
        ...state,
        loading: true,
      };
    
    case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
      const category = action.payload.category;
      const updatedCategories = buildNewCategories(state.categories, category);
      console.log("updatedCategories", updatedCategories);

      return {
        ...state,
        categories: updatedCategories,
        loading: false,
      };
      
    case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
      return {
        ...initState,
        loading: false,
        error: action.payload.error,
      };
      
    case categoryConstants.UPDATE_CATEGORY_REQUEST:
      return { ...state, loading: true };
      
    case categoryConstants.UPDATE_CATEGORY_SUCCESS:
      return { ...state, loading: false };
     
    case categoryConstants.UPDATE_CATEGORY_FAILURE:
      return { ...state, error: action.payload.error, loading: false };
      
    case categoryConstants.DELETE_CATEGORY_REQUEST:
      return { ...state, loading: true };
      
    case categoryConstants.DELETE_CATEGORY_SUCCESS:
      return{ ...state, loading: false };
    
    case categoryConstants.DELETE_CATEGORY_FAILURE:
      return { ...state, error: action.payload.error, loading: false };
      
  default:
  return state;
    }
};

export default categoryReducer;


/* import { categoryConstansts } from "../actions/constants";

const initState = {
    categories: [],
    loading: false,
    error: null
};


const buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];

    if(parentId === undefined){
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type: category.type,
                children: []
            }
        ];
    }
   
    for(let cat of categories){

        if(cat._id === parentId){
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                type: category.type,
                children: []
            };
            myCategories.push({
                ...cat,
                children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
            })
        }else{
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
            });
        }

        
    }


    return myCategories;
}


const categoryReducer = (state = initState, action) => {
    switch(action.type){
        case categoryConstansts.GET_ALL_CATEGORIES_SUCCESS:
            return{
                ...state,
                categories: action.payload.categories
            }
           
        case categoryConstansts.ADD_NEW_CATEGORY_REQUEST:
           return {
                ...state,
                loading: true
            }
            
        case categoryConstansts.ADD_NEW_CATEGORY_SUCCESS:
           const category = action.payload.category;
           const updatedCategories = buildNewCategories(category.parentId, state.categories, category);
           console.log('updated categoires', updatedCategories);
            
            return {
                ...state,
                categories: updatedCategories,
                loading: false,
            }
           
        case categoryConstansts.ADD_NEW_CATEGORY_FAILURE:
           return {
                ...initState,
                loading: false,
                //error: action.payload.error
            }
            
        case categoryConstansts.UPDATE_CATEGORIES_REQUEST:
          return {
                ...state,
                loading: true
            }
           
        case categoryConstansts.UPDATE_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false
            }
            
        case categoryConstansts.UPDATE_CATEGORIES_FAILURE:
           return{
                ...state,
                error: action.payload.error,
                loading: false
            }
            
        case categoryConstansts.DELETE_CATEGORIES_REQUEST:
           return{
                ...state,
                loading: true
            }
            
        case categoryConstansts.DELETE_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false
            }
            
        case categoryConstansts.DELETE_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
            
    
    default:
    return state;
}
};
export default categoryReducer; */