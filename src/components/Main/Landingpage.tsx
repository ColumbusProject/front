import React from 'react';
import './Landingpage.css';
import backgroundVideo from 'assets/videoplayback.mp4';
import Footer from 'layouts/Footer';
import MainHeader from 'layouts/Header/MainHeader';
import { useNavigate } from 'react-router-dom';
import { useLoginUserStore } from 'stores';
import { AUTH_PATH, BOARD_ITINERARY_MAIN_PATH, BOARD_REVIEW_MAIN_PATH, BOARD_TRADE_MAIN_PATH, MY_LOGBOOK_PATH } from 'constant';

//          component:  메인화면 컴포넌트          //
export default function Landingpage() {

  //          state: 로그인 유저 상태         //
  const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();

  //          function: navigator 함수          //
  const navigator = useNavigate();

  //          event handler: 네비게이션 클릭 이벤트 처리          //
  const onMyTripClick = () => {
    if (!loginUser) {
      alert('로그인이 필요한 서비스입니다');
      navigator(AUTH_PATH());
      return;
    } 
    const { userId } = loginUser;
    navigator(MY_LOGBOOK_PATH(userId));
  }

  const onItineraryClick = () => {
    navigator(BOARD_ITINERARY_MAIN_PATH());
  }
  
  const onReviewClick = () => {
    navigator(BOARD_REVIEW_MAIN_PATH());
  }

  const onTradeClick = () => {
    navigator(BOARD_TRADE_MAIN_PATH());
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
        <div className="text1" onClick={onMyTripClick}>MY TRIP</div>
        <div className="text2" onClick={onItineraryClick}>ITINERARY</div>
        <div className="text3" onClick={onReviewClick}>TRAVEL REVIEW</div>
        <div className="text4" onClick={onTradeClick}>TRAVEL TRADE</div>
      </div>
      <Footer />
     </div>
    )
  }

