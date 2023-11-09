import React from 'react';
import './App.css';

import NoResult from './views/Board/Review/Search';
import Detail from './views/Board/Review/Detail';
import Search from './views/Board/Review/Search';
import BoardItem from './components/BoardItem';
import BoardListItem from './components';
import { Route, Routes } from 'react-router-dom';
import Main from './views/Board/Main';

function App() {
  return (
    <div>
      <Main />
    </div>
  );
}

export default App;
