import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AnyAction, Reducer } from 'redux';
import { initialState } from './initialState';
import { reducer as productsReducer } from './productsRedux';
import { reducer as cartReducer } from './cartRedux';

// define reducers

type Reducers = {
  [key: string]: Reducer<any, AnyAction>,
}
const reducers: Reducers = {
  products: productsReducer,
  cart: cartReducer,
  //cart: () => initialState.cart,
};

// add blank reducers for initial state properties without reducers

Object.keys(initialState).forEach((item:any) => {
  if (typeof reducers[item] == 'undefined') {
    reducers[item] = (statePart = null) => statePart;
  }
});

const combinedReducers = combineReducers(reducers);

// create store
export const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch