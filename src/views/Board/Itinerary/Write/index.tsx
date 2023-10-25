import { Wrapper, Status } from "@googlemaps/react-wrapper";
import './style.css';
import { useState, useRef, useEffect } from 'react';
import { Map } from "typescript";

//          component: 게시물 작성 화면          //
export default function ItineraryBoardWrite() {

    const GoogleMapComponent = ()=>{
        const [map, setMap] = useState<google.maps.Map | null>(null);
        const ref = useRef<HTMLDivElement | null>(null);
    
        useEffect(()=>{
            if (!ref.current) return;
            const newMap = new window.google.maps.Map(ref.current, {
                center : { lat: 37.569227, lng: 126.9777256},
                zoom : 16,
            });     
            
            setMap(newMap);
        },[])
    
        return (
            <div ref={ref} id="map" style={{width:"100%", height: "400px"}}></div>
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
                    <div className='board-write-calendar-box'>
                        <div className='board-write-calendar-text'>{'여행 시작일'}</div>
                        <div className='board-write-calendar-start-input-box'>
                            <input className='board-write-calendar-input' />
                            <div className='calendar-icon'></div>
                        </div>
                        <div className='board-write-calendar-text'>{'여행 종료일'}</div>
                        <div className='board-write-calendar-end-input-box'>
                            <input className='board-write-calendar-input' />
                            <div className='calendar-icon'></div>
                        </div>
                        <div className='board-write-calendar-limit-day-text'>{'최대 여행 일수 : 10일 제한'}</div>
                    </div>
                    <div className='board-write-notepad-accountbook-text'>{'메모 / 가계부 보기'}</div>
                </div>
            </div>
            <Wrapper apiKey={"AIzaSyDWdQZ6d2u_u4gNN5CCCV25V8yZPNfXbek"} libraries={["places"]}>
                <GoogleMapComponent></GoogleMapComponent>
            </Wrapper>
        </div>
    )
}