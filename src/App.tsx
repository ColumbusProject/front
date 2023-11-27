import React, { useEffect } from 'react';
import './App.css';
import ItineraryDetail from './views/Board/Itinerary/Detail';
import ItineraryBoardWrite from './views/Board/Itinerary/Write';
import Detail from './views/Board/Review/Detail/Me';
import Search from './views/Board/Review/Search';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Landingpage from 'components/Main/Landingpage';
import Write from 'views/Board/Review/Write';
import MyPage from 'views/User/MyPage';
import LogBook from 'views/User/LogBook';
import Container from 'layouts/Container';
import { AUTH_PATH, BOARD_ITINERARY_MAIN_PATH, BOARD_PATH, BOARD_REVIEW_DETAIL_PATH, BOARD_REVIEW_MAIN_PATH, BOARD_REVIEW_UPDATE_PATH, BOARD_TRADE_MAIN_PATH, MAIN_PATH, MY_LOGBOOK_PATH, MY_PAGE_PATH, USER_PATH } from 'constant';
import Authentication from 'views/Authentication';
import ItineraryMain from 'views/Board/Itinerary/Main';
import ReviewMain from 'views/Board/Review/Main';
import { useCookies } from 'react-cookie';
import { useLoginUserStore, useUserStore } from 'stores';
import { getSignInUserRequest } from 'apis';
import { GetSignInUserResponseDto } from 'apis/dto/response/user';
import ResponseDto from 'apis/dto/response';
import { User } from 'types';
import Cards from 'components/Trade(willbefinal)/cards';

//          component: Application 컴포넌트         //
function App() {
  
  const { pathname } = useLocation();
  const navigator = useNavigate();

  //          state: 로그인 유저 전역 상태          //
  const { setLoginUser, resetLoginUser } = useLoginUserStore();
  //          state: cookie 상태          //
  const [cookies, setCookie] = useCookies();

  //          function: get sign in user response 처리 함수         //
  const getSignInUserResponse = (responseBody: GetSignInUserResponseDto | ResponseDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'AF' || code === 'NU' || code === 'DBE') {
      resetLoginUser();
      return;
    }
    const loginUser: User = { ...(responseBody as GetSignInUserResponseDto) };
    setLoginUser(loginUser);
  }

  //          effect: accessToken cookie 값이 변경될 때 마다 실행할 함수          //
  useEffect(() => {
    if (!cookies.accessToken) {
      resetLoginUser();
      return;
    }
    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);

  }, [cookies.accessToken]);

  //          render: Application 컴포넌트 렌더링         //
  // description: 메인 화면 : '/columbus' - Main //
  // description: 로그인 + 회원가입 : '/auth' - Authentication //
  // description: 검색 화면 : '/board/*/search-list/:searchWord' - Search //
  // description: 게시물 상세보기 : '/board/*/:boardNumber'- BoardDetail //
  // description: 게시물 작성하기 : '/board/*/write' - BoardWrite //
  // description: 게시물 수정하기 : '/board/*/update/:boardNumber' - BoardUpdate //
  // description: 유저 마이페이지 : '/user/my-page' - MyPage //
  // description: 유저 항해 일지 : '/user/my-logbook' - LogBook //

  useEffect(() => {
    if (pathname === "/") navigator(MAIN_PATH());
    
  }, [pathname]);

  return (
    <Routes>
      <Route path={MAIN_PATH()}>
        <Route index element={<Landingpage />} />
        <Route path={AUTH_PATH()} element={<Authentication />} />
        <Route path={USER_PATH()} >
          <Route path={MY_PAGE_PATH(':userId')} element={<MyPage />}/>
          <Route path={MY_LOGBOOK_PATH(':userId')} element={<LogBook />} />
        </Route>
        <Route path={BOARD_PATH()} element={<Container />}>
          <Route path={BOARD_ITINERARY_MAIN_PATH()}>
            <Route index element={<ItineraryMain />} />
            <Route path='search-list/:searchWord' element={<></>} />
            <Route path='write' element={<ItineraryBoardWrite />} />
            <Route path='update/:boardNumber' element={<></>} />
            <Route path=':boardNumber' element={<ItineraryDetail />} />
          </Route>
          <Route path={BOARD_REVIEW_MAIN_PATH()}>
            <Route index element={<ReviewMain />} />
            <Route path='search-list/:searchWord' element={<Search />} />
            <Route path='write' element={<Write />} />
            <Route path={BOARD_REVIEW_UPDATE_PATH(':boardNumber')} element={<></>} />
            <Route path={BOARD_REVIEW_DETAIL_PATH(':boardNumber')} element={<Detail/>} /> 
          </Route>
          <Route path={BOARD_TRADE_MAIN_PATH()}>
            <Route index element={<Cards/>} />
            <Route path='search-list/:searchWord' element={<></>} />
            <Route path='write' element={<></>} />
            <Route path='update/:boardNumber' element={<></>} />
            <Route path=':boardNumber' element={<></>} /> 
          </Route>
        </Route>
      </Route>
      <Route path='*' element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;