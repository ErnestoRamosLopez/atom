import './App.css';
import React, { Fragment, useEffect, useState } from 'react';
import Home from './routes/home/home.component';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainLayout from './layouts/Main.layout';
import Carrito from './routes/carrito/carrito.component';
import Ordenes from './routes/ordenes/ordenes.component';
import OrdenDetalle from './routes/orden-detalle/orden-detalle.component';
import Tienda from './routes/tienda/tienda.component';
import Administracion from './routes/administracion/administracion.component';
import axios from 'axios';
import { logout } from './utils/login.utils';
import { useDispatch } from 'react-redux';
import { whitelistForbidden } from './utils/constantes.utils';
import Checkout from './routes/checkout/checkout.component';
import OrderSuccess from './routes/order-success/order-success.component';


const App: React.FC<any> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAxiosInitialized, setIsAxiosInitialized] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  useEffect(() => {
    initializeAxios(setIsLoggingOut);
    setIsAxiosInitialized(true);
  }, [dispatch, navigate]);

  useEffect(() => {
    if( isLoggingOut ){
      const controlledLogout = async () => {
        try{
          await logout(axios, navigate, dispatch);
        }finally{
          setTimeout(() => {
            setIsLoggingOut(false);
          }, 1000);
        }
      }
      controlledLogout();
    }
  }, [isLoggingOut]);

  return (
    <Fragment>
      {
        !isAxiosInitialized &&
        <div>Loading...</div>
      }
      {
        isAxiosInitialized &&
        <div className="App">
          <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Home />}></Route>
                    <Route path='home' element={<Home />}></Route>
                    <Route path='carrito' element={<Carrito />}></Route>
                    <Route path='ordenes' element={<Ordenes />}></Route>
                    <Route path='ordenes/:id' element={<OrdenDetalle />}></Route>
                    <Route path='tienda' element={<Tienda />}></Route>
                    <Route path='administracion' element={<Administracion />}></Route>
                    <Route path='checkout' element={<Checkout />}></Route>
                    <Route path='orderSuccess' element={<OrderSuccess />}></Route>
                </Route>
          </Routes>
        </div>
      }
    </Fragment>
  );
}

function initializeAxios(setIsLoggingOut: React.Dispatch<React.SetStateAction<boolean>>){
  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if( error.response && error.status === 403){
      const requestUrl = error.config.url;
      if (!isWhitelisted(requestUrl)) {
        setIsLoggingOut(true);
      }
    }
    return Promise.reject(error);
  });
}

const isWhitelisted = (url: string) => {
  return whitelistForbidden.some((whitelistedRoute) => url.includes(whitelistedRoute));
};

export default App;