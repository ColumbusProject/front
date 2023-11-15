import React, { useEffect } from 'react';
import './App.css';

import NoResult from './views/Board/Review/Search';
import Detail from './views/Board/Review/Detail/Me';
import Search from './views/Board/Review/Search';
import BoardItem from './components/BoardItem';
import { Route, Routes } from 'react-router-dom';
import Main from './views/Board/Main';
import { useUserStore } from 'stores';
import { loginUserMock } from 'mocks';

function App() {

  const { setUser } = useUserStore();

  useEffect(() => {
    setUser(loginUserMock);
  }, [])

  return (
    <div>
      <Detail />
    </div>
  );
}

export default App;