import React, { useEffect } from 'react';
import './App.css';
import ItineraryDetail from './views/Board/Itinerary/Detail';
import ItineraryBoardWrite from './views/Board/Itinerary/Write';
import Detail from './views/Board/Review/Detail/Me';
import Search from './views/Board/Review/Search';
import { Route, Routes } from 'react-router-dom';
import Main from 'views/Main';
import Write from 'views/Board/Review/Write';
import MyPage from 'views/User/MyPage';
import LogBook from 'views/User/LogBook';
import Profile from 'views/User/Profile';
import Container from 'layouts/Container';
import Header from 'layouts/Header';

//          component: Application 컴포넌트         //
function App() {

  //          render: Application 컴포넌트 렌더링         //
  // description: 메인 화면 : '/columbus' - Main //
  // description: 로그인 + 회원가입 : '/auth' - Authentication //
  // description: 검색 화면 : '/board/*/search-list/:searchWord' - Search //
  // description: 게시물 상세보기 : '/board/*/:boardNumber'- BoardDetail //
  // description: 게시물 작성하기 : '/board/*/write' - BoardWrite //
  // description: 게시물 수정하기 : '/board/*/update/:boardNumber' - BoardUpdate //
  // description: 유저 마이페이지 : '/user/my-page' - MyPage //
  // description: 유저 항해 일지 : '/user/my-logbook' - LogBook //
  // description: 유저 프로필 수정 : '/user/profile' - Profile //

  return (
    <Routes>
      {/* <Route element={<Container />}> */}
        <Route path='/columbus' element={<Main />} />
        <Route path='/auth' element={<></>} />
        <Route path='/user'>
          <Route path='my-page' element={<MyPage />}/>
          <Route path='my-logbook' element={<LogBook />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/board'>
          <Route path='itinerary'>
            <Route path='search-list/:searchWord' element={<></>} />
            <Route path='write' element={<ItineraryBoardWrite />} />
            <Route path='update/:boardNumber' element={<></>} />
            <Route path=':boardNumber' element={<ItineraryDetail />} />
          </Route>
          <Route path='review'>
            <Route path='search-list/:searchWord' element={<Search />} />
            <Route path='write' element={<Write />} />
            <Route path='update/:boardNumber' element={<></>} />
            <Route path=':boardNumber' element={<Detail/>} /> 
          </Route>
          <Route path='store'>
            <Route path='search-list/:searchWord' element={<></>} />
            <Route path='write' element={<></>} />
            <Route path='update/:boardNumber' element={<></>} />
            <Route path=':boardNumber' element={<></>} /> 
          </Route>
        </Route>
      {/* </Route> */}
    </Routes>
  );
}

export default App;