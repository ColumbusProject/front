import React from 'react'
import './style.css';

export default function Main() {
  return (
    <div className='board-review-page'>
        <div className='board-review-page-top'>
            <div className='board-review-page-top-container'>
                <div className='board-review-page-top-title'>{'여행 후기 게시판'}</div>
                <div className='board-review-page-top-search-box'>
                    <input className='board-review-page-top-search-input' />
                    <div className='board-review-page-top-search-icon'></div>
                </div>
            </div>
            <div className='board-review-page-top-write'>{'여행 후기 글쓰기'}</div>
        </div>
        <div className='board-review-page-divider'></div>
        <div className='board-review-page-bottom'>
            <div className='board-review-list'>
                <div className='board-review-page-bottom-content-box'></div>
                <div className='board-review-page-bottom-content-box'></div>
                <div className='board-review-page-bottom-content-box'></div>
                <div className='board-review-page-bottom-content-box'></div>
                <div className='board-review-page-bottom-content-box'></div>
            </div>
            
            <div className='board-review-page-bottom-pagination-box'></div>
        </div>
    </div>
  )
}
