import React, { useState } from "react";
import './style.css';
import Header from "layouts/Header";
import backgroundVideo from './assets/videoplayback.mp4';

//          component: 나의 항해 일지 페이지          //
export default function LogBook() {

  //          state: 화면 상태          //
  const [view, setView] = useState<'itinerary' | 'review' | 'trade'>('itinerary');

  //          render: 나의 항해 일지 컴포넌트 렌더링          //
  return (
    <div>
      <video className='my-logbook-background-video' muted autoPlay loop>
      <source src={backgroundVideo}></source>
      </video>
      {}
    </div>
  )
  
}