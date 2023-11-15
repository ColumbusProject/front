import './style.css';

//          component: 일정 추가 카드          //
export default function ItineraryAdd() {

    return(
        <div className='itinerary-add-warpper'>
            <div className='itinerary-add-card'>
                <div className='day-select-close-box'>
                    <div className='day-select-box'>
                        <select className='day-select'>
                            <option>{'DAY 1 23.11.09'}</option>
                        </select>
                    </div>
                    <div className='close-box'></div>
                </div>
                <div className='location-search-box'>
                    <input className='loaction-input' placeholder='가고 싶은 장소를 검색해 보세요' />
                    <div className='search-button'></div>
                </div>
                <div className='kakao-map-box'></div>
                <div className='search-result-box'>
                    <div className='search-result'></div>
                </div>
            </div>
        </div>
    )
}