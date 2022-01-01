import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import Home from './components/views/Home/HomeContainer';
import Cart from './components/views/Cart/CartContainer';
import OrderForm from './components/views/OrderForm/OrderFormContainer';
import MainLayout from './components/layout/MainLayout/MainLayout';

function App() {
  return (
    <Provider store={store}>
       <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<OrderForm />} />      
          </Routes>
        </MainLayout>
      </BrowserRouter>      
    </Provider>
  )
};

export default App;

