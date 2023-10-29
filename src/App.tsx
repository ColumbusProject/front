import React from 'react';
import './App.css';
import Authentication from './views/Authentication';
import Main from './views/Main';
import Detail from './views/Board/Review/Detail';
import ItineraryBoardWrite from './views/Board/Itinerary/Write';
import Header from './layouts/Header';


function App() {
  return (
    <div>
    <Header />
    <ItineraryBoardWrite />
  </div>
  );
}

export default App;
