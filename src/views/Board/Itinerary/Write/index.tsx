import './style.css';
import { useState, useRef, useEffect } from 'react';

declare global {
    interface Window {
    kakao: any
    }
}
//          component: 하단 일정 카드          //
function ItineraryCard() {
    return (
        <div className='itinerary-card-wrapper'>
            <div className='day-count-box'>
                <div className='day-count-text'>{'DAY 1'}</div>
            </div>
            <div className='itinerary-text-box'>

            </div>
        </div>
    )
}

//          component: 카카오맵          //
const { kakao } = window;
function Kakaomap() {
    useEffect(() => {
        const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
            level: 3
        };
        const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    }, [])

    return (
        <div id="map" style={{
            width: '1200px',
            height: '540px',
            marginLeft: '120px',
            marginTop: '60px'
        }}></div>
    )
}

//          component: 게시물 작성 화면          //
export default function ItineraryBoardWrite() {

    //          render: 게시물 작성 화면 렌더링          //
    return (
        <div id='board-write-wrapper'>
            <div className='board-write-container'>
                <div className='board-write-box'>
                    <div className='board-write-title-box'>
                        <input className='board-write-title-input' type='text' placeholder='일정 제목' />
                    </div>
                    <div className='board-write-calendar-notepad-box'>
                        <div className='board-write-calendar-start-text'>{'여행 시작일'}</div>
                        <div className='board-write-calendar-start-input-box'>
                            <input className='board-write-calendar-input' />
                            {/* <div className='calendar-icon'></div> */}
                        </div>
                        <div className='board-write-calendar-end-text'>{'여행 종료일'}</div>
                        <div className='board-write-calendar-end-input-box'>
                            <input className='board-write-calendar-input' />
                            {/* <div className='calendar-icon'></div> */}
                        </div>
                        <div className='board-write-calendar-limit-day-text'>{'최대 여행 일수 : 10일 제한'}</div>
                        <div className='board-write-notepad-accountbook-text'>{'메모 / 가계부 보기'}</div>
                    </div>
                </div>
                <Kakaomap />
                <div className='itinerary-card-container'>
                    <div className='left-arrow-icon'>{'<'}</div>
                    <div className='itinerary-card-box'>
                        <ItineraryCard />
                        <ItineraryCard />
                    </div>
                    <div className='right-arrow-icon'>{'>'}</div>
                </div>
                <div className='save-cancel-box'>
                    <div className='save-text'>{'저장'}</div>
                    <div className='cancel-text'>{'취소'}</div>
                </div>

            </div>
        </div>
    )
}