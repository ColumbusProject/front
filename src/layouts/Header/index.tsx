import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import { BOARD_ITINERARY_MAIN_PATH, BOARD_REVIEW_MAIN_PATH, BOARD_TRADE_MAIN_PATH, MAIN_PATH, MY_LOGBOOK_PATH, MY_PAGE_PATH, USER_PATH } from 'constant';
import { useUserStore } from 'stores';
import { clickOptions } from '@testing-library/user-event/dist/click';

//          component: 헤더 컴포넌트          //
export default function Header() {

    //          function: 네비게이트 함수          //
    const navigateor = useNavigate();

    //          state: 유저 전역 상태          //
    const {setUser, resetUser} = useUserStore();

    //          state: 유저 닉네임 상태          //
    const [nickname, setNickname] = useState<string>('');

    //          state: url 상태          //
    const [boardState, setBoardState] =useState<string>('');

    //          event handler: 로고 클릭 이벤트 처리          //
    const onLogoClick = () => {
        navigateor(MAIN_PATH());
    }
    //          event handler: 프로필아이콘 클릭 이벤트 처리          //
    const onProfileIconClick = () => {
        navigateor(MY_PAGE_PATH('userId'))
    }
    //          event handler: 헤더 div 클릭 이벤트 처리          //
    const onMyLogbookClick = () => {
        navigateor(MY_LOGBOOK_PATH('userId'));
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
                <div className='columbus-text-box' onClick={onLogoClick}>
                    <div className='columbus-text'>{'Columbus'}</div>
                </div>
                <div className='navigate-box'>
                    <div className={boardState === 'My-Logbook' ? 'active' : ''} onClick={() => {onMyLogbookClick(); setBoardState('My-Logbook')}}>{'나의 항해일지'}</div>
                    <div className={boardState === 'Itinerary' ? 'active' : ''} onClick={() => {onItineraryClick(); setBoardState('Itinerary')}}>{'여행 일정'}</div>
                    <div className={boardState === 'Review' ? 'active' : ''} onClick={() => {onMyReviewClick(); setBoardState('Review')}}>{'여행 후기'}</div>
                    <div className={boardState === 'Trade' ? 'active' : ''} onClick={() => {onMyTradeClick(); setBoardState('Trade')}}>{'자유 거래'}</div>
                </div>
                <div className='profile-menu-box'>
                    <div className='profile-icon' onClick={onProfileIconClick}></div>
                    <div className='nickname-text'>{nickname}</div>
                    <div className='hamburger-icon'></div>
                </div>
            </div>
        </div>
    )
}