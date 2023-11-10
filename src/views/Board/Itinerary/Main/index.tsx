import './style.css';

export default function ItineraryMain() {
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
                <div className='itinerary-create-button'>{'여행 일정 만들기 '}</div>
            </div>
            <div className='itinerary-main-contents-box'>
                
            </div>
        </div>
    )
}