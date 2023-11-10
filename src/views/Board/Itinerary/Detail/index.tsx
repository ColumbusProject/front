import './style.css';

export default function ItineraryDetail() {
    return(
        <div className='itinerary-detail-wrapper'>
            <div className='detail-top-box'>
                <div className='title'>{'태종대 나들이'}</div>
                <div className='profile-nickname-date-viewcount-more-box'>
                    <div className='profile-image-box'>
                        <div className='profile-image'></div>
                    </div>
                    <div className='nickname-date'>{'봉봉야끼 | 2023.08.31'}</div>
                    <div className='view-count'>{'조회수 0'}</div>
                    <div className='more-box'>
                        <div className='more'></div>
                    </div>
                </div>
            </div>
            <div className='detail-bottom-box'>
                <div className='content-card'>
                    {'mock 데이터 때려박아야됨 위에 타이틀 프로필 이미지 등등 도'}
                </div>
                <div className='favorite-comment-acountbook-box'>
                    <div className='favorite-box'>
                        <div className='favorite-icon'></div>
                        <div className='favorite-count'>{'0'}</div>
                        <div className='down-icon'></div>
                    </div>
                    <div className='comment-box'>
                        <div className='comment-icon'></div>
                        <div className='comment-count'>{'0'}</div>
                        <div className='down-icon'></div>
                    </div>
                    <div className='acountbook-box'></div>
                </div>
            </div>
        </div>
    )
}