import React from 'react';
import './Landingpage.css';
import backgroundVideo from 'assets/videoplayback.mp4';
import Footer from 'layouts/Footer';
import MainHeader from 'layouts/Header/MainHeader';

//          component:  메인화면 컴포넌트          //
export default function Landingpage() {

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
      <Footer />
     </div>
    )
  }

