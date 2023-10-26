import { Wrapper, Status } from "@googlemaps/react-wrapper";
import './style.css';
import { useState, useRef, useEffect } from 'react';
import { Map } from "typescript";

//          component: 게시물 작성 화면          //
export default function ItineraryBoardWrite() {

    // const GoogleMapComponent = ()=>{
    //     const [map, setMap] = useState<google.maps.Map | null>(null);
    //     const ref = useRef<HTMLDivElement | null>(null);
    
    //     useEffect(()=>{
    //         if (!ref.current) return;
    //         const newMap = new window.google.maps.Map(ref.current, {
    //             center : { lat: 37.569227, lng: 126.9777256},
    //             zoom : 16,
    //         });     
            
    //         setMap(newMap);
    //     },[])
    
    //     return (
    //         <div ref={ref} id="map" style={{width:"100%", height: "400px"}}></div>
    //     )
    // }

    const { kakao } = window;

    function Kakao() {

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
                <Kakao />
            </div>
            
        </div>
    )
}