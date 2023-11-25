import React, { Component, useState } from 'react';
import './Landingpage.css';
import backgroundVideo from 'assets/videoplayback.mp4';
import { AUTH_PATH, MAIN_PATH, MY_PAGE_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';
// player 설치 명령어: npm i react-player;

//          component:  메인화면 컴포넌트          //
export default function Landingpage() {

  //          function: 네비게이트 함수         //
  const navigator = useNavigate();

  //          state: 로그인 상태          //
  const [isLogin, setLogin] = useState<boolean>(false);

  //          state: 닉네임 상태          //
  const [nickname, setNickname] = useState<string>('')
  
  //          component: 메인 헤더 컴포넌트         //
  const MainHeader = () => {

    //          event handler: 로그인 버튼 클릭 이벤트 처리         //
    const onSignInClick = () => {
      navigator(AUTH_PATH())
    }

    //          event handler: 마이페이지 버튼 클릭 이벤트 처리         //
    const onMypageClick = () => {
      navigator(MY_PAGE_PATH('userId'))
    }

    //          event handler: 로그아웃 버튼 클릭 이벤트 처리         //
    const onLogOutClick = () => {
      setLogin(false);
      navigator(MAIN_PATH());
    }

  
    //          render: 회원 유저 헤더 렌더링         //
    if (isLogin)
    return (
      <div className='navigation'>
        <div className="jb-text">Columbus</div>
        <div className='profile-menu-box'>
          <div className='profile-icon'></div>
          <div className='nickname-text'>{'닉네임'}</div>
          <div className="dropdown">
            <div className="icon-button">
              <div className="hamburger-icon"></div>
            </div>
            <div className="dropdown-content">
              <div><span className="inline-link1" onClick={onMypageClick}>마이페이지</span></div>              
              <div><span className="inline-link2" onClick={onLogOutClick}>로그아웃</span></div>
            </div>
          </div>
        </div>
      </div>
    )
    
    //          render: 비회원 유저 헤더 렌더링         //
    return (
      <div className='navigation'>
        <div className="jb-text">Columbus</div>
        <div className="dropdown">
          <div className="icon-button">
            <div className="hamburger-icon"></div>
          </div>
          <div className="dropdown-content">
            <div><span className="inline-link1" onClick={onSignInClick}>로그인</span></div>              
            <div><span className="inline-link2">회원가입</span></div>
          </div>
        </div>
      </div>
    )
  }

  //          render: 메인화면 컴포넌트 렌더링          // 
  return (
    <div>
      {/* top component */}
      <div className='container'>
        <div className='jb-box'>
          <div className='top-navigation'>
          <MainHeader />
          </div>
          <video className='jb-video' muted autoPlay loop>
            <source src={backgroundVideo}></source>
            <strong>Your browser does not support the video tag.</strong>
          </video>
        </div>
      </div>
      {/* bottom component */}
      <div className="comment">
         Come live out your ideal vacation with us
       </div>
       <div className="parent">
         <div className="text1">MY TRIP</div>
         <div className="text2">ITINERARY</div>
         <div className="text3">TRAVEL REVIEW</div>
         <div className="text4">TRAVEL TRADE</div>
       </div>
     </div>
    )
  }

