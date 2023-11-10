import React from 'react';
import './App.css';
<<<<<<< HEAD
import ItineraryItem from './components/ItineraryItem';
import Authentication from './views/Authentication';
import Header from './layouts/Header';
import ItineraryBoardWrite from './views/Board/Itinerary/Write';
import { Route, Routes } from 'react-router-dom';
import { AUTH_PATH, MAIN_PATH } from './constant';
import Container from './layouts/Container';

function App() {
  return (
    <div className='test'>
      <Header />
      <ItineraryBoardWrite />
    </div>
  );
}

export default App;