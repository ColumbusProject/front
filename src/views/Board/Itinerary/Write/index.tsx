import './style.css';
import { useState, useRef, useEffect, ChangeEvent, useCallback } from 'react';
import dayjs from 'dayjs';
import LandingPage from 'components/KakaoMapAPI';

declare global {
    interface Window {
    kakao: any
    }
}

//          component: 게시물 작성 화면          //
export default function ItineraryBoardWrite() {

    //          state: 메모/가계부 표시 상태          //
    const [showMemoAcountBook, setShowMemoAcountBook] = useState<boolean>(false);
    //          state: 일정 추가 카드 표시 상태          //
    const [showItineraryAdd, setShowItineraryAdd] = useState<boolean>(false);
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

    //          event handler: 여행시작일 설정 이벤트         //
    const onStartDateChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setStartDate(value);
    }
    
    //          event handler: 여행종료일 설정 이벤트         //
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

        // todo: 날짜 변경시 날짜 표시 오류 수정
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

    //          event handler: 메모/가계부 표시 설정 이벤트         //
    const onMemoAcountBookClickHandler = () => {
        setShowMemoAcountBook(!showMemoAcountBook);
    }

    //          event handler: 메모/가계부 표시 설정 이벤트         //
    const onItineraryAddClickHandler = () => {
        setShowItineraryAdd(!showItineraryAdd);
    }

    //          component: 카카오맵          //
    const { kakao } = window;
    const Kakaomap = () => {
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
                height: '540px'
            }}></div>
        )
    }

    //          component: 일정 추가 카드           //
    const ItineraryAdd = () => {

        return(
            <div className='itinerary-add-warpper'>
                <div className='itinerary-add-card'>
                    <div className='day-select-close-box'>
                        <div className='day-select-box'>
                            <select className='day-select'>
                                {schedules.map((item, index) => <option>{'DAY '}{index + 1}{' ('}{item.date}{')'}</option>)}
                            </select>
                        </div>
                        <div className='close-box' onClick={onItineraryAddClickHandler}></div>
                    </div>
                    <div className='location-search-box'>
                        <input className='loaction-input' placeholder='가고 싶은 장소를 검색해 보세요' />
                        <div className='search-button'></div>
                    </div>
                    <div className='kakao-map-box'><LandingPage  /></div>
                    <div className='search-result-box'>
                        <div className='search-result'></div>
                    </div>
                </div>
            </div>
        )
    }

    //          component: 일정 관리 카드          //
    const ItineraryCard = ({ item, index }: { item: any, index: number }) => {

        return ( 
            <div className='itinerary-card-wrapper'>
                <div className='day-count-box'>
                    <div className='day-count-text'>{`DAY ${index + 1}`}</div>
                    <div className='day-text'>{item.date}</div>
                </div>
                <div className='itinerary-text-box'>
                    <div className='itinerary-add-text' onClick={onItineraryAddClickHandler}>{'+ 일정 추가'}</div>
                </div>
            </div>
        )
    }

    //          component: 메모/가계부 카드          //
    const ItineraryMemoAcountBook = () => {
        const [select, setSelect] = useState<string>('memo');

        //          event handler: 메모 메뉴 클릭 이벤트         //
        const onMemoMenuClickHandler = () => {
            setSelect('memo');
        }
        //          event handler: 가계부 메뉴 클릭 이벤트         //
        const onAcountBookMenuClickHandler = () => {
            setSelect('acountbook');
        }

        return (
            <div className='memo-acountbook-wrapper'>
                {select === 'memo' && (
                        <div className='memo-card'>
                            <div className='memo-acountbook-close-box' onClick={onMemoAcountBookClickHandler}>
                                <div className='memo-acountbook-close-icon'></div>
                            </div>
                            <div className='memo-acountbook-text-box'>
                                <div className='memo-acountbook-text'>{'메모/가계부 보기'}</div>
                            </div>
                            <div className='memo-acountbook-divide-box'>
                                <div className='focus-menu'>{'메모'}</div>
                                <div className='out-focus-menu' onClick={onAcountBookMenuClickHandler}>{'가계부'}</div>
                            </div>
                            <div className='memo-text-area-box'>
                                <textarea className='memo-text-area' />
                            </div>
                            <div className='confirm-box'>
                                <div className='confirm-text'>{'확인'}</div>
                            </div>
                        </div>
                )}
                {select === 'acountbook' && (
                        <div className='acountbook-card'>
                            <div className='memo-acountbook-close-box' onClick={onMemoAcountBookClickHandler}>
                                <div className='memo-acountbook-close-icon'></div>
                            </div>
                            <div className='memo-acountbook-text-box'>
                                <div className='memo-acountbook-text'>{'메모/가계부 보기'}</div>
                            </div>
                            <div className='memo-acountbook-divide-box'>
                                <div className='out-focus-menu' onClick={onMemoMenuClickHandler}>{'메모'}</div>
                                <div className='focus-menu'>{'가계부'}</div>
                            </div>
                            <div className='acountbook-box'>
                                <div className='total-cost-text-box'>
                                    <div className='total-cost-text'>{'여행 총비용'}</div>
                                </div>
                                <div className='cost-type-box'>
                                    <div className='money-box'>
                                        <div className='type-text'>{'KRW'}</div>
                                        <div className='cost-text'>{'0'}</div>
                                    </div>
                                    <div className='money-box'>
                                        <div className='type-text'>{'USD'}</div>
                                        <div className='cost-text'>{'0'}</div>
                                    </div>
                                    <div className='money-box'>
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
                                    <input className='cost-input' />
                                    <div className='delete-button'>{'삭제'}</div>
                                </div>
                            </div>
                            <div className='confirm-box'>
                                <div className='confirm-text'>{'확인'}</div>
                            </div>
                        </div>
                )}
            </div>
        )
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
                <div className='kakaomap-box'>
                { !showItineraryAdd && <Kakaomap /> }
                </div>
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
            { showItineraryAdd && <ItineraryAdd /> }
            { showMemoAcountBook && <ItineraryMemoAcountBook /> }
        </div>
    )
}