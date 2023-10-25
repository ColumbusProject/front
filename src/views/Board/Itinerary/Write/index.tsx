import './style.css';

//          component: 게시물 작성 화면          //
export default function ItineraryBoardWrite() {

    //          render: 게시물 작성 화면 렌더링          //
    return (
        <div id='board-write-wrapper'>
            <div className='board-write-container'>
                <div className='board-write-box'>
                    <div className='board-write-title-box'>
                        <input className='board-write-title-input' type='text' placeholder='일정 제목' />
                    </div>
                    <div className='board-write-calendar-box'>
                        <div className='board-write-calendar-start-day-text'>{'여행 시작일'}</div>
                        <div className='board-write-calendar-start-input-box'>
                            <input className='board-write-calendar-start-input' />
                            <div className='calendar-icon'></div>
                        </div>
                        <div className='board-write-calendar-end-day-text'>{'여행 종료일'}</div>
                        <div className='board-write-calendar-end-input-box'>
                            <input className='board-write-calendar-end-input' />
                            <div className='calendar-icon'></div>
                        </div>
                        <div className='board-write-calendar-limit-day-text'>{'최대 여행 일수 : 10일 제한'}</div>
                    </div>
                    <div className='board-write-notepad-accountbook-text'>{'메모 / 가계부 보기'}</div>
                </div>
            </div>
        </div>
    )
}