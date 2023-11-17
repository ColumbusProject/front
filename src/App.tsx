import React, { useEffect } from 'react';
import './App.css';
import ItineraryDetail from './views/Board/Itinerary/Detail';
import Authentication from './views/Authentication';
import Header from './layouts/Header';
import ItineraryBoardWrite from './views/Board/Itinerary/Write';
import ItineraryMemoAcountBook from './components/MemoAcountBook';

import NoResult from './views/Board/Review/Search';
import Detail from './views/Board/Review/Detail/Me';
import Search from './views/Board/Review/Search';
import BoardItem from './components/BoardItem';
import { Route, Routes } from 'react-router-dom';
import Main from './views/Board/Main';
import { useUserStore } from 'stores';
import { loginUserMock } from 'mocks';
import ItineraryAdd from 'components/ItineraryAdd';

function App() {

  const { setUser } = useUserStore();

  useEffect(() => {
    setUser(loginUserMock);
  }, [])

  return (
    <div>
      <ItineraryMemoAcountBook />
    </div>
  );
}

export default App;