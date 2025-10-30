import React from 'react';
import { Outlet } from 'react-router-dom'; 

import '../App.css';

import Header from '../componentes/Header.jsx';
import Footer from '../componentes/Footer.jsx'; 

export default function StoreLayout() {
  return (
    <div className="store-layout-container">
      <Header />
      <main className="store-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}