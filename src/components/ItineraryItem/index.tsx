import './style.css';

export default function ItineraryItem() {
    return(
        <div className='itinerary-item-wrapper'>
            <div className='itinerary-item-top-box'>
                <div className='itinerary-item-title'>{'태종대 나들이'}</div>
                <div className='profile-image'></div>
                <div className='nickname-datetime'>{'봉봉야끼 | 2023.08.31'}</div>
                <div className='view-count'>{'조회수 0'}</div>
                <div className='favorite-check'></div>
            </div>
            <div className='itinerary-item-content'>
                <div className='itinerary-item'>
                    <div className='day-count'></div>
                    <div className='location-text'></div>
                </div>
            </div>
        </div>
    )
}