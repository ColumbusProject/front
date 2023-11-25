import React, { Component } from 'react';
import './Landingpage.css';
import backgroundVideo from 'assets/videoplayback.mp4';
// player 설치 명령어: npm i react-player;

//          component:  메인화면 비디오 컴포넌트          //
export default function Landingpage() {       

//          render: 메인화면 컴포넌트 렌더링          // 
  return (
    <div>
      {/* top component */}
      <div className='container'>
        <div className='top-navigation'>
          <div className='navigation'>
            <div className="jb-text">Columbus</div>
              <div className="dropdown">
                <div className="icon-button">
                  <div className="hamburger-icon"></div>
                </div>
                <div className="dropdown-content">
                  <div><span className="inline-link1">로그인</span></div>              
                  <div><span className="inline-link2">회원가입</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className='jb-box'>
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
     <Footer/>
      </div>
  )
 }

 