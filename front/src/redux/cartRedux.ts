import axios from 'axios';
import { AnyAction } from 'redux';
import { ICartLine } from '../components/views/Home/Home';
import { IOrder } from '../components/views/OrderForm/OrderForm';
import { API_URL } from '../config';
import { IAppState, initialState } from './initialState';
import { AppDispatch } from './store';

type Cart = IAppState['cart'];

/* selectors */
export const getRequest = ({cart}: IAppState, type: string) => cart.requests[type];
export const getCartLines = ({cart}: IAppState) => cart.lines;

/* action name creator */
const reducerName = 'cart';
const createActionName = (name: string) => `app/${reducerName}/${name}`;

/* action types */
const REQUEST_START = createActionName('REQUEST_START');
const REQUEST_SUCCESS = createActionName('REQUEST_SUCCESS');
const REQUEST_ERROR = createActionName('REQUEST_ERROR');

const ADD_LINE = createActionName('ADD_LINE');
const EMPTY_CART = createActionName('EMPTY_CART');

/* action creators */
export const requestStart = (payload: string) => ({ payload, type: REQUEST_START });
export const requestSuccess = (payload: string) => ({ payload, type: REQUEST_SUCCESS });
export const requestError = (payload: string) => ({ payload, type: REQUEST_ERROR });

export const addLine = (payload: ICartLine) => ({ payload, type: ADD_LINE });
export const emptyCart = () => ({type: EMPTY_CART});

/* thunk creators */

export const sendOrderRequest = (order: IOrder) => {
  
  return async (dispatch: AppDispatch) => {
    dispatch(requestStart('SEND_ORDER'));
    try {
      const response = await axios.post(API_URL + '/order', order);
      dispatch(requestSuccess('SEND_ORDER'));
      console.log('response.data: ', response.data);
      // cancel cart
      dispatch(emptyCart());

    } catch(err) {      
      console.log('err: ', err);
      dispatch(requestError('SEND_ORDER'));
    }        
  };
};

/* reducer */
export const reducer = (statePart: Cart = initialState.cart, action: AnyAction) => {
  switch (action.type) {    
    case ADD_LINE: {
      return {
        ...statePart,
        lines: [...statePart.lines, action.payload],
      };
    }    
    case EMPTY_CART :
      return initialState.cart;
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