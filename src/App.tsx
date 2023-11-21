import React from 'react';
import './App.css';
import ItineraryItem from './components/ItineraryItem';
import Authentication from './views/Authentication';
import Header from './layouts/Header';
import ItineraryBoardWrite from './views/Board/Itinerary/Write';
import { Route, Routes } from 'react-router-dom';
import Container from './layouts/Container';
import Main from 'views/Main';

//          component: Application 컴포넌트         //
function App() {

  //          render: Application 컴포넌트 렌더링         //
  // description: 메인 화면 : '/columbus' - Main //
  // description: 로그인 + 회원가입 : '/auth' - Authentication //
  // description: 검색 화면 : 'board/*/search-list/:searchWord' - Search //
  // description: 게시물 상세보기 : '/board/*/:boardNumber'- BoardDetail //
  // description: 게시물 작성하기 : '/board/*/write' - BoardWrite //
  // description: 게시물 수정하기 : '/board/*/:boardNumber' - BoardUpdate //
  // description: 유저 페이지 : '/user' - User //
  return (
    <Routes>
      <Route path='/columbus' element={<Main />} />
      <Route path='/auth' element={<Authentication />} />
    </Routes>
  );
}

export default App;