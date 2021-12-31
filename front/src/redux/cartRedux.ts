import axios from 'axios';
import { AnyAction } from 'redux';
import { ICartLine } from '../components/views/Home/Home';
import { API_URL } from '../config';
import { IAppState, initialState } from './initialState';

type Cart = IAppState['cart'];

/* selectors */
//export const getRequest = ({cart}, type) => cart.requests[type];
export const getCartLines = ({cart}: IAppState) => cart.lines;

/* action name creator */
const reducerName = 'cart';
const createActionName = (name: string) => `app/${reducerName}/${name}`;

/* action types */
const REQUEST_START = createActionName('REQUEST_START');
const REQUEST_SUCCESS = createActionName('REQUEST_SUCCESS');
const REQUEST_ERROR = createActionName('REQUEST_ERROR');

const ADD_LINE = createActionName('ADD_LINE');
const REMOVE_LINE = createActionName('REMOVE_LINE');

/* action creators */
export const requestStart = (payload: string) => ({ payload, type: REQUEST_START });
export const requestSuccess = (payload: string) => ({ payload, type: REQUEST_SUCCESS });
export const requestError = (payload: string) => ({ payload, type: REQUEST_ERROR });

export const addLine = (payload: ICartLine) => ({ payload, type: ADD_LINE });
export const removeLine = (payload: number) => ({ payload, type: REMOVE_LINE }); // payload = book.id


/* thunk creators */
/*
export const sendOrderRequest = (order) => {
  
  return async (dispatch) => {
    console.log('order.lines: ', order.lines);
    const {lines, name, email, userId} = order;
    const data = {lines, name, email, userId};
    dispatch(requestStart('SEND_ORDER'));
    try {
      const response = await axios.post(API_URL + '/orders', data);
      dispatch(requestSuccess('SEND_ORDER'));
      console.log('response.data: ', response.data);

      // mark agent as active
      localStorage.setItem(`TF_activeAgent`, JSON.stringify(true));
      dispatch(markAgent(true));

      // cancel cart
      localStorage.setItem(`TF_cartLines`, JSON.stringify([]));
      dispatch(loadCart([]));


    } catch(err) {      
      console.log('err: ', err);
      dispatch(requestError('SEND_ORDER'));
    }
        
  };
};
*/
/* reducer */
export const reducer = (statePart: Cart = initialState.cart, action: AnyAction) => {
  switch (action.type) {    
    case ADD_LINE: {
      return {
        ...statePart,
        lines: [...statePart.lines, action.payload],
      };
    }    
    case REMOVE_LINE :
      return {
        ...statePart,
        lines: statePart.lines.filter(l => l.id !== action.payload),
      };    
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