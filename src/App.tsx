import './App.css';
import React from 'react';
import Home from './routes/home/home.component';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/Main.layout';
import Carrito from './routes/carrito/carrito.component';
import Ordenes from './routes/ordenes/ordenes.component';
import OrdenDetalle from './routes/orden-detalle/orden-detalle.component';
import Tienda from './routes/tienda/tienda.component';


const App: React.FC<any> = () => {
  
  return (
    <div className="App">
      <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route index element={<Home />}></Route>
                <Route path='home' element={<Home />}></Route>
                <Route path='carrito' element={<Carrito />}></Route>
                <Route path='ordenes' element={<Ordenes />}></Route>
                <Route path='ordenes/:id' element={<OrdenDetalle />}></Route>
                <Route path='tienda' element={<Tienda />}></Route>
            </Route>
      </Routes>
    </div>
  );
}

export default App;