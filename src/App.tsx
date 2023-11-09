import React from 'react';
import './App.css';
import Authentication from './views/Authentication';
import Header from './layouts/Header';
import ItineraryBoardWrite from './views/Board/Itinerary/Write';
import { Route, Routes } from 'react-router-dom';
import { AUTH_PATH, MAIN_PATH } from './constant';
import Container from './layouts/Container';

function App() {
  return (
  // <Routes>
  //   <Route element={<Container />}>
  //     {/* <Route path={MAIN_PATH} element={<Main />} /> */}
  //     <Route path={AUTH_PATH} element={<Authentication />} />
  //   </Route>
  // </Routes>
  <div>
    <Authentication />
  </div>
  );
}

export default App;