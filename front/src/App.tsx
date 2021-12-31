import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import Home from './components/views/Home/HomeContainer';
import Cart from './components/views/Cart/CartContainer';
import MainLayout from './components/layout/MainLayout/MainLayout';
/*
export interface IAppState {
  products: {
    data: {
      id: number
      title: string
      author: string
      cover_url: string
      pages: number
      price: number
      currency: string
    }[],
    requests: {
      [key: string]: {
        active: boolean,
        error: boolean,
      },
    },    
  }
}
*/
function App() {
  return (
    <Provider store={store}>
       <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route  path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />      
          </Routes>
        </MainLayout>
      </BrowserRouter>      
    </Provider>
  )
};

export default App;

/*
<Route exact path='/orderform' component={OrderForm} />            
<Route exact path='/cart' component={Cart} />           
<Route path='*' component={NotFound} />
*/
