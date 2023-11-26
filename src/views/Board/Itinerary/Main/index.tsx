import { useNavigate } from 'react-router';
import './style.css';
import { BOARD_ITINERARY_WRITE_PATH } from 'constant';

export default function ItineraryMain() {

    //          function: 네비게이트 함수          //
    const navigator = useNavigate();

    //          event handler: 여행 일정 만들기 클릭 이벤트 처리          //
    const onItineraryWriteClick = () => {
        navigator(BOARD_ITINERARY_WRITE_PATH());
    }

    return(
        <div className='itinerary-main-wrapper'>
            <div className='itinerary-main-title-search-box'>
                <div className='itinerary-main-title-box'>{'여행 일정 게시판'}</div>
                <div className='search-box'>
                    <input className='search-input' />
                    <div className='search-icon'></div>
                </div>
            </div>
            <div className='itinerary-create-box'>
                <div className='itinerary-create-button' onClick={onItineraryWriteClick}>{'여행 일정 만들기 '}</div>
            </div>
            <div className='itinerary-main-contents-box'>
                
            </div>
        </div>
    )
}