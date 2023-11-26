import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import { AUTH_PATH, BOARD_ITINERARY_MAIN_PATH, BOARD_REVIEW_MAIN_PATH, BOARD_TRADE_MAIN_PATH, MAIN_PATH, MY_LOGBOOK_PATH, MY_PAGE_PATH, USER_PATH } from 'constant';
import { useLoginUserStore } from 'stores';

//          component: 보드 헤더 컴포넌트          //
export default function Header() {

    //          function: 네비게이트 함수          //
    const navigateor = useNavigate();

    //          state: 유저 전역 상태          //
    const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();
    //          state: 로그인 상태          //
    const [ isLogin, setLogin ] = useState<boolean>(true);
    //          state: userId, nickname variable 상태          //
    const { userId, nickname } = useParams();
    //          state: url 상태          //
    const [ boardState, setBoardState ] =useState<string>('');

    //          event handler: 로고 클릭 이벤트 처리          //
    const onLogoClick = () => {
        navigateor(MAIN_PATH());
    }
    //          event handler: 프로필아이콘 클릭 이벤트 처리          //
    const onProfileIconClick = () => {
        if (!loginUser) return;
        const { userId } = loginUser;
        navigateor(MY_PAGE_PATH(userId));
    }
    //          event handler: 로그인 버튼 클릭 이벤트 처리         //
    const onSignInClick = () => {
        navigateor(AUTH_PATH())
    }
    //          event handler: 마이페이지 버튼 클릭 이벤트 처리         //
    const onMypageClick = () => {
      if (!loginUser) return;
      const { userId } = loginUser;
      navigateor(MY_PAGE_PATH(userId));
    }
    //          event handler: 로그아웃 버튼 클릭 이벤트 처리         //
    const onLogOutClick = () => {
      if (userId === loginUser?.userId)
      resetLoginUser();
      navigateor(MAIN_PATH());
    }
    //          event handler: 헤더 div 클릭 이벤트 처리          //
    const onMyLogbookClick = () => {
        if (!loginUser) return;
        const { userId } = loginUser;
        navigateor(MY_LOGBOOK_PATH(userId));
    }
    const onItineraryClick = () => {
        navigateor(BOARD_ITINERARY_MAIN_PATH());
    }
    const onMyReviewClick = () => {
        navigateor(BOARD_REVIEW_MAIN_PATH());
    }
    const onMyTradeClick = () => {
        navigateor(BOARD_TRADE_MAIN_PATH());
    }
    //                  render: 헤더 컴포넌트 렌더링                    //
    return (
        <div className='header'>
            <div className='header-container'>
              <div className='columbus-text-box' onClick={onLogoClick}>
                  <div className='columbus-text'>{'Columbus'}</div>
              </div>
              <div className='navigate-box'>
                <div className={boardState === 'My-Logbook' ? 'active' : ''} onClick={() => {onMyLogbookClick(); setBoardState('My-Logbook')}}>{'나의 항해일지'}</div>
                <div className={boardState === 'Itinerary' ? 'active' : ''} onClick={() => {onItineraryClick(); setBoardState('Itinerary')}}>{'여행 일정'}</div>
                <div className={boardState === 'Review' ? 'active' : ''} onClick={() => {onMyReviewClick(); setBoardState('Review')}}>{'여행 후기'}</div>
                <div className={boardState === 'Trade' ? 'active' : ''} onClick={() => {onMyTradeClick(); setBoardState('Trade')}}>{'자유 거래'}</div>
              </div>
              {isLogin && (
              <div className='profile-menu-box2'>
                <div className='profile-icon' onClick={onProfileIconClick}></div>
                <div className='nickname-text'>{'nickname'}</div>
              </div>
              )}
              <div className="dropdown">
                <div className="icon-button">
                  <div className="hamburger2-icon"></div>
                </div>
                {isLogin && (
                <div className="dropdown-content">
                  <div><span className="inline-link3" onClick={onMypageClick}>마이페이지</span></div>              
                  <div><span className="inline-link4" onClick={onLogOutClick}>로그아웃</span></div>
                </div>
                )}
                <div className="dropdown-content">
                  <div><span className="inline-link3" onClick={onSignInClick}>로그인</span></div>              
                  <div><span className="inline-link4">회원가입</span></div>
                </div>
              </div>
            </div>
        </div>
    )
}