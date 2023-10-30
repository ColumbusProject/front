import './style.css';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import dayjs from 'dayjs';

declare global {
    interface Window {
    kakao: any
    }
}

//          component: 일정 관리 카드          //
function ItineraryCard({ index, startDate }: { index: number, startDate: string }) {
    return (
        <div className='itinerary-card-wrapper'>
            <div className='day-count-box'>
                <div className='day-count-text'>{`DAY ${index + 1}`}</div>
                <div className='day-text'>{`${startDate}`}</div>
            </div>
            <div className='itinerary-text-box'>
                {'to do: 일정 추가 기능'}
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

    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const [schedules, setSchedules] = useState<any[]>([]);

    const onStartDateChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        console.log(value);
        setStartDate(value);
    }
    const onEndDateChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!startDate) return;
        const { value } = event.target;

        const startDay = dayjs(startDate);
        const endDay = dayjs(value);

        const result = endDay.diff(startDay, "day", true);
        const gap = Math.floor(result);

        if (gap > 9) return;
        if (gap < 0) return;

        setEndDate(value);

        let newSchedules = [];

        const different = gap - schedules.length;
        if (different > 0) {
            newSchedules = schedules.map(item => item);
            for (let index = 0; index < different; index++) newSchedules.push({});
        }
        if (different < 0) {
            const lastIndex = schedules.length - 1 + different;
            newSchedules = schedules.filter((item, index) => index <= lastIndex);
        }

        setSchedules(newSchedules);

    }

    //          render: 게시물 작성 화면 렌더링          //
    return (
        <div className='board-write-wrapper'>
            <div className='board-write-container'>
                <div className='board-write-box'>
                    <div className='board-write-title-box'>
                        <input className='board-write-title-input' type='text' placeholder='일정 제목' />
                    </div>
                    <div className='board-write-calendar-notepad-box'>
                        <div className='board-write-calendar-start-text'>{'여행 시작일'}</div>
                        <div className='board-write-calendar-start-input-box'>
                            <input className='board-write-calendar-input' type='date' value={startDate} onChange={onStartDateChangeHandler} />
                        </div>
                        <div className='board-write-calendar-end-text'>{'여행 종료일'}</div>
                        <div className='board-write-calendar-end-input-box'>
                            <input className='board-write-calendar-input' type='date' value={endDate} onChange={onEndDateChangeHandler} />
                        </div>
                        <div className='board-write-calendar-limit-day-text'>{'최대 여행 일수 : 10일 제한'}</div>
                        <div className='board-write-notepad-accountbook-text'>{'메모 / 가계부 보기'}</div>
                    </div>
                </div>
                <Kakaomap />
                <div className='itinerary-card-container'>
                    <div className='left-arrow-icon'>{'<'}</div>
                    <div className='itinerary-card-box'>
                        {schedules.map((item, index) => <ItineraryCard index={index} startDate={startDate} />)}
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