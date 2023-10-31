
import React from 'react';
import './style.css';
import { useNavigate } from "react-router-dom";


//            component:  메인화면 비디오 컴포넌트        //
export default function Main() {
    
//        render: 메인화면 컴포넌트 렌더링   // 
  return (
    <div>
      <div className='container'>
        <div className='jb-box'>
          <video muted autoPlay loop>
            <source src="/asset/videoplayback.mp4" type='video/mp4' />
            <strong>Your browser does not support the video tag.</strong>
          </video>
        </div>
      </div>
      
//            component:  드롭다운 메뉴 menue           //
      <div className='top-navigation'>
        <div className='navigation'>
          <div className="jb-text">Columbus</div>
          <div className="dropdown">
            <div className="icon-button">
              <div className="hamburger-icon"></div>
            </div>
            <div className="dropdown-content">
              <span className="inline-link">로그인</span>
              <span className="inline-link">회원가입</span>
            </div>
          </div>
        </div>
      </div>


 //            component:  카드 네비게이션            //
      <div className="comment">
        WHERE DO YOU WANT TO GO?
      </div>

      <div className="parent">
        <div className="text1">MY TRIP</div>
        <div className="text2">ITINERARY</div>
        <div className="text3">TRAVEL REVIEW</div>
        <div className="text4">TRAVEL TRADE</div>
      </div>
    </div>
  );
}


