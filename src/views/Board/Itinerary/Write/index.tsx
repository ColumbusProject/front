import './style.css';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import dayjs from 'dayjs';

declare global {
    interface Window {
    kakao: any
    }
}

//          component: 일정 관리 카드          //
function ItineraryCard({ index }: { index: number }) {
    return ( 
        <div className='itinerary-card-wrapper'>
            <div className='day-count-box'>
                <div className='day-count-text'>{`DAY ${index + 1}`}</div>
                <div className='day-text'>{'todo: 해당날짜 표시'}</div>
            </div>
            <div className='itinerary-text-box'>
                <div className='itinerary-add-text'>{'+ 일정 추가'}</div>
            </div>
        </div>
    )
}

//          component: 메모/가계부 카드          //
function ItineraryMemoAcountBook() {
    const [select, setSelect] = useState<string>('memo');

    //          effect: 메모 메뉴 클릭 이벤트         //
    const onMemoMenuClickHandler = () => {
        setSelect('memo');
    }
    //          effect: 가계부 메뉴 클릭 이벤트         //
    const onAcountBookMenuClickHandler = () => {
        setSelect('acountbook');
    }

    return (
        <div className='memo-acountbook-wrapper'>
            <div className='memo-acountbook-card'>
                <div className='memo-acountbook-close-box'>
                    <div className='memo-acountbook-close-icon'>{'x'}</div>
                </div>
                <div className='memo-acountbook-text-box'>
                    <div className='memo-acountbook-text'>{'메모/가계부 보기'}</div>
                </div>
                {select === 'memo' && (
                    <>
                        <div className='memo-acountbook-divide-box'>
                            <div className='focus-menu'>{'메모'}</div>
                            <div className='out-focus-menu' onClick={onAcountBookMenuClickHandler}>{'가계부'}</div>
                        </div>
                        <div className='memo-text-area-box'>
                            <text className='memo-text-area' />
                        </div>
                        <div className='confirm-box'>
                            <div className='confirm-text'>{'확인'}</div>
                        </div>
                    </>
                )}
                {select === 'acountbook' && (
                    <>
                        <div className='memo-acountbook-divide-box'>
                            <div className='out-focus-menu' onClick={onMemoMenuClickHandler}>{'메모'}</div>
                            <div className='focus-menu'>{'가계부'}</div>
                        </div>
                        <div className='acountbook-box'>
                            <div className='total-cost-text-box'>
                                <div className='total-cost-text'>{'여행 총비용'}</div>
                            </div>
                            <div className='cost-type-box'>
                                <div className='krw-box'>
                                    <div className='type-text'>{'KRW'}</div>
                                    <div className='cost-text'>{'0'}</div>
                                </div>
                                <div className='usd-box'>
                                    <div className='type-text'>{'USD'}</div>
                                    <div className='cost-text'>{'0'}</div>
                                </div>
                                <div className='eur-box'>
                                    <div className='type-text'>{'EUR'}</div>
                                    <div className='cost-text'>{'0'}</div>
                                </div>
                            </div>
                            <div className='itinerary-cost-add-box'>
                                <div className='itinerary-cost-text'>{'여행 경비'}</div>
                                <div className='itinerary-cost-add-button'>{'추가'}</div>
                            </div>
                            <div className='add-cost-input-box'>
                                <input className='item-name' />
                                <select className='select-cost-type'>
                                    <option value={"KRW"}>{'KRW'}</option>
                                    <option value={"USD"}>{'USD'}</option>
                                    <option value={"EUR"}>{'EUR'}</option>
                                </select>
                                <input className='cost-text' />
                                <div className='delete-button'>{'삭제'}</div>
                            </div>
                        </div>
                        <div className='confirm-box'>
                            <div className='confirm-text'>{'확인'}</div>
                        </div>
                    </>
                )}
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

    //          state: 메모/가계부 표시 상태          //
    const [showMemoAcountBook, setShowMemoAcountBook] = useState<boolean>(false);

    //          state: 여행시작일 상태          //
    const [startDate, setStartDate] = useState<string>('');
    //          state: 여행종료일 상태          //
    const [endDate, setEndDate] = useState<string>('');
    //          state: 여행일 개수 상태          //
    const [schedules, setSchedules] = useState<any[]>([]);
    //          state: 일정카드 인덱스 상태          //
    const [currentIndex, setCurrentIndex] = useState(0);

    //          effect: 여행시작일 설정 이벤트         //
    const onStartDateChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setStartDate(value);
    }
    //          effect: 여행종료일 설정 이벤트         //
    const onEndDateChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!startDate) return;
        const { value } = event.target;

        const startDay = dayjs(startDate);
        const endDay = dayjs(value);

        const result = endDay.diff(startDay, "day", true) + 1;
        const gap = Math.floor(result);

        if (gap > 10) return;
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

    //          effect: 메모/가계부 표시 설정 이벤트         //
    const onMemoAcountBookClickHandler = () => {
        setShowMemoAcountBook(!showMemoAcountBook);
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
                        <div className='board-write-notepad-accountbook-text' onClick={onMemoAcountBookClickHandler}>{'메모 / 가계부 보기'}</div>
                    </div>
                </div>
                <Kakaomap />
                <div className='itinerary-card-container'>
                    <div className='left-arrow-icon'>{'<'}</div>
                    <div className='itinerary-card-box'>
                        {schedules.map((item, index) => <ItineraryCard index={index} />)}
                    </div>
                    <div className='right-arrow-icon'>{'>'}</div>
                </div>
                <div className='save-cancel-box'>
                    <div className='save-text'>{'저장'}</div>
                    <div className='cancel-text'>{'취소'}</div>
                </div>
            </div>
            {showMemoAcountBook && (
                <ItineraryMemoAcountBook />
            )}
        </div>
    )
}