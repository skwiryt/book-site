import axios from 'axios';
import { API_URL } from '../config';
import { IAppState } from '../App';
import { AnyAction } from 'redux';
import { initialState } from './initialState';
import { AppDispatch } from './store';

type Products = IAppState['products'];

/* selectors */
export const getBooks = ({products}: IAppState) => products.data;
// export const getProduct = ({products}: IAppState, id) => products.data.find(p => p.id === id);
export const getRequest = ({products}: IAppState, type: string) => products.requests[type];

/* action name creator */
const reducerName = 'products';
const createActionName = (name: string) => `app/${reducerName}/${name}`;

/* action types */
const REQUEST_START = createActionName('REQUEST_START');
const REQUEST_SUCCESS = createActionName('REQUEST_SUCCESS');
const REQUEST_ERROR = createActionName('REQUEST_ERROR');
const LOAD_PRODUCTS = createActionName('LOAD_PRODUCTS');


/* action creators */
export const requestStart = (payload: string) => ({ payload, type: REQUEST_START });
export const requestSuccess = (payload: string) => ({ payload, type: REQUEST_SUCCESS });
export const requestError = (payload: string) => ({ payload, type: REQUEST_ERROR });
export const loadProducts = (payload: Products['data']) => ({ payload, type: LOAD_PRODUCTS });

/* thunk creators */
export const loadProductsRequest = () => {
  console.log('loadProductsRequest thunk is called');  
  return async (dispatch: AppDispatch) => {    
    console.log('dispatch for fetch fired by Thunk');
    dispatch(requestStart('LOAD_PRODUCTS'));
    try {
      const response = await axios.get(API_URL + '/book');
      dispatch(loadProducts(response.data.data));
      dispatch(requestSuccess('LOAD_PRODUCTS'));
      console.log('response.data: ', response.data);
    } catch(err) {
      dispatch(requestError('LOAD_PRODUCTS'));
    }
         
  };
};

/* reducer */
export const reducer = (statePart: Products = initialState.products, action: AnyAction) => {
  switch (action.type) {   
    case LOAD_PRODUCTS: {
      return {
        ...statePart,
        data: action.payload,
      };
    }
    case REQUEST_START : {
      return {
        ...statePart, requests: {...statePart.requests, [action.payload]: {active: true, error: false}},
      };  
    }
    case REQUEST_SUCCESS : {
      return {
        ...statePart, requests: {...statePart.requests, [action.payload]: {active: false, error: false}},
      };
    }
    case REQUEST_ERROR : {
      return {
        ...statePart, requests: {...statePart.requests, [action.payload]: {active: false, error: true}},
      };
    }
    default:
      return statePart;
  }
};