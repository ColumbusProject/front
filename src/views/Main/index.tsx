import React from 'react';
import './style.css';
// player 설치 명령어: npm i react-player;
import { useNavigate } from "react-router-dom";

//            component:  메인화면 비디오 컴포넌트(비디오가 안떠서 비디오 라이브러리 찾는 중입니다.ㅠㅠ)        //
export default function Main() {

  {/* <ReactPlayer
      url={"https://youtu.be/UxpjpxLi-Qg"}
      width="100vw"
      height="100vh"
      loop={true}
      playing={true}
      muted={true}
      controls={false}
    />
 */}

//        render: 메인화면 컴포넌트 렌더링 (이하 상동)  // 
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

//  component:  드롭다운 메뉴 menue (똑디 안떠서 라이브러리 찾는 중입니다.ㅠㅠ)          */
      <div className='top-navigation'>
        <div className='navigation'>
          <div className="jb-text">Columbus</div>
          <div className="dropdown">
            <div className="icon-button">
              <div className="hamburger-icon"></div>
            </div>
            <div className="dropdown-content">
              <p className=''><span className="inline-link">로그인</span></p>
            </div>
            <div className="dropdown-content">
              <div><span className="inline-link">회원가입</span></div>
            </div>
          </div>
        </div>
      </div>

//    component:  카드 네비게이션         //
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
