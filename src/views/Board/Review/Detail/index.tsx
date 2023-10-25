import React from 'react'
import './style.css';

export default function Detail() {
  return (
      <div className='board-detail-page'>
        <div className='board-detail-page-title'>{'부산 여행 후기'}</div>
        <div className='board-detail-page-container'>
          <div className='board-detail-page-container-profile-image'></div>
          <div className='board-detail-page-container-info-box'>
            <div className='board-detail-page-container-info-box-nickname'>{'봉봉야끼'}</div>
            <div className='board-detail-page-container-info-box-divider'>{'|'}</div>
            <div className='board-detail-page-container-info-box-write-datetime'>{'2023.08.31'}</div>
          </div>
          <div className='board-detail-page-container-view-count'>{'조회수 1'}</div>
          <div className='board-detail-page-container-more'></div>
        </div>
      <div className='board-detail-page-location'></div>
      </div>
  )
}
