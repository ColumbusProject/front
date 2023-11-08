import React from 'react';
import './App.css';
import Authentication from './views/Authentication';
import Header from './layouts/Header';
import ItineraryBoardWrite from './views/Board/Itinerary/Write';

function App() {
  return (
    <div className='test'>
      {/* <Header /> */}
      {/* <ItineraryBoardWrite /> */}
      <Authentication />
    </div>
  );
}

export default App;