import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import { BOARD_ITINERARY_MAIN_PATH, BOARD_REVIEW_MAIN_PATH, BOARD_TRADE_MAIN_PATH, MY_LOGBOOK_PATH } from 'constant';

//          component: 헤더 컴포넌트          //
export default function Header() {

    //                  function: 네비게이트 함수                   //
    const navigateor = useNavigate();

    //                  state: 유저 아이디 상태                 //
    const [userId, setUserId] = useState<string>('');

    //                  state: 유저 닉네임 상태                 //
    const [nickname, setNickname] = useState<string>('');

    //                  event handler: 헤더 클릭 이벤트 처리                 //
    const onMyLogbookClick = () => {
        navigateor(MY_LOGBOOK_PATH(userId));
    }

    const onItineraryClick = () => {
        navigateor(BOARD_ITINERARY_MAIN_PATH());
    }
 
    const onMyReviewClick = () => {
        navigateor(BOARD_REVIEW_MAIN_PATH());
    }

    const onMyTradeClick = () => {
        navigateor(BOARD_TRADE_MAIN_PATH());
    }

    //                  render: 헤더 컴포넌트 렌더링                    //
    return (
        <div className='header'>
            <div className='header-container'>
                <div className='columbus-text-box'>
                    <div className='columbus-text'>{'Columbus'}</div>
                </div>
                <div className='navigate-box'>
                    <div onClick={onMyLogbookClick}>{'나의 항해일지'}</div>
                    <div onClick={onItineraryClick}>{'여행 일정'}</div>
                    <div onClick={onMyReviewClick}>{'여행 후기'}</div>
                    <div onClick={onMyTradeClick}>{'자유 거래'}</div>
                </div>
                <div className='profile-menu-box'>
                    <div className='profile-icon'></div>
                    <div className='nickname-text'>{nickname}</div>
                    <div className='hamburger-icon'></div>
                </div>
            </div>
        </div>
    )
}