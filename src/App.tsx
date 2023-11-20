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
import Write from 'views/Board/Review/Write';

function App() {

  const { setUser } = useUserStore();

  useEffect(() => {
    setUser(loginUserMock);
  }, [])

  // 로그인 되어있는 사용자와 게시글을 쓴 사용자를 비교하여 게시글을 쓴 사용자가 본인인지 알 수 있다.

  return (
    <div>
      <Search />
    </div>
  );
}

export default App;