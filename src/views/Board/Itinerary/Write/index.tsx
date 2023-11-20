import './style.css';
import { useState, useRef, useEffect, ChangeEvent, useCallback } from 'react';
import dayjs from 'dayjs';

declare global {
    interface Window {
    kakao: any
    }
}

//          component: 일정 관리 카드          //
function ItineraryCard({ item, index }: { item: any, index: number }) {
    return ( 
        <div className='itinerary-card-wrapper'>
            <div className='day-count-box'>
                <div className='day-count-text'>{`DAY ${index + 1}`}</div>
                <div className='day-text'>{item.date}</div>
            </div>
            <div className='itinerary-text-box'>
                <div className='itinerary-add-text'>{'+ 일정 추가'}</div>
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
    //          state: 일정카드 표시 슬라이드 상태          //
    const [currentSlide, setCurrentSlide] = useState(0);
    //          state: 일정카드 표시 슬라이드 페이지 길이 상태          //
    const [slideLength, setSlideLength] = useState(0);

    // description: 참고 https://velog.io/@poiu0329/React-%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0feat.-styled-components //

    //          effect: 일정 카드 슬라이드 이펙트           //
    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!divRef.current) return;
        divRef.current.style.marginLeft = `${-currentSlide * 1200}px`;
    }, [currentSlide])

    const isCheckActivePrevbutton = useCallback(() => {
        return currentSlide >= 1
    }, [currentSlide])
    
    const isCheckActiveNextbutton= useCallback(() => {
        return currentSlide < slideLength - 1
    }, [currentSlide, slideLength])

    const prevButtonClick = useCallback(() => {
        if(!isCheckActivePrevbutton()) return;
        setCurrentSlide(prev => prev - 1)
    }, [isCheckActivePrevbutton])
        
    const nextButtonClick = useCallback(() => {
        if (!isCheckActiveNextbutton()) return;
        setCurrentSlide(prev => prev + 1)
    }, [isCheckActiveNextbutton])

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

        // description: 일정카드 길이 지정 함수 //
        const slideLength = Math.floor((result - 1)/2);
        setSlideLength(slideLength + 1);

        if (gap > 10) return;
        if (gap < 0) return;

        setEndDate(value);

        let newSchedules: any[] = [];
        
        // if (gap === 0) {
        //     newSchedules.push({})
        //     setSchedules(newSchedules);
        //     return;
        // }

        const different = gap - schedules.length;
        if (different > 0) {
            newSchedules = schedules.map(item => item);
            for (let index = 0; index < different; index++) { 
                const date = startDay.add(index, 'day');
                newSchedules.push({ date: date.format('YYYY.MM.DD') })
            };
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
                    <div className='left-arrow-icon' onClick={prevButtonClick}>{'<'}</div>
                    <div className='itinerary-card-slide-container'>
                        <div ref={divRef} className='itinerary-card-box'>
                            {schedules.map((item, index) => <ItineraryCard item={item} index={index} />)}
                        </div>
                    </div>
                    <div className='right-arrow-icon' onClick={nextButtonClick}>{'>'}</div>
                </div>
                <div className='save-cancel-box'>
                    <div className='save-text'>{'저장'}</div>
                    <div className='cancel-text'>{'취소'}</div>
                </div>
            </div>
        </div>
    )
}