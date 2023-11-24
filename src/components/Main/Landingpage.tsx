import React, { Component } from 'react';
import './Landingpage.css';
// player 설치 명령어: npm i react-player;

//            component:  메인화면 비디오 컴포넌트      //
export default function Main() {       
  

//        render: 메인화면 컴포넌트 렌더링 (이하 상동)  // 
  return (
    <div>
     <div className='container'>
         <div className='jb-box'>
           <video muted autoPlay loop>
           <source src="videoplayback.mp4" type="video/mp4"></source>
             <strong>Your browser does not support the video tag.</strong>
           </video>
         </div>
       </div>
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