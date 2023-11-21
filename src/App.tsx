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
import { AUTH_PATH, MAIN_PATH } from './constant';
import Container from './layouts/Container';

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
    <div className='test'>
      <Header />
      <ItineraryBoardWrite />
    </div>
  );
}

export default App;