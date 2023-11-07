import React from 'react';
import './App.css';
import Authentication from './views/Authentication';
import Header from './layouts/Header';
import ItineraryBoardWrite from './views/Board/Itinerary/Write';
import ItineraryMemoAcountBook from './components/MemoAcountBook';

function App() {
  return (
    <div className='test'>
      <ItineraryMemoAcountBook />
    </div>
  );
}

export default App;