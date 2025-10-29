import React from 'react';
import { Outlet } from 'react-router-dom'; 

import '../App.css';

import Header from '../componentes/Header.jsx';
import Footer from '../componentes/Footer.jsx'; 

export default function StoreLayout() {
  return (
    <div className="tienda-layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}