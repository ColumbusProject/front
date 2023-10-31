import React, { useState } from 'react'
import './style.css';

export default function Write() {
  const [show, setShow] = useState<boolean>(false);

  const onButtonClickHandler = () => {
    setShow(!show);
    console.log(show);
  };

  return (
    <div className='board-write-page'>
        <div className='board-write-page-inside'>
            <div className='board-write-page-title-box'>
              <input className='board-write-page-title' placeholder='제목을 작성해 주세요.' />
            </div>
            <div className='divider'></div>
            <div className='board-write-page-container'>
              <div className='board-write-page-icon-box'>
                {show &&
                  <div className='board-write-page-location-box-container'>
                    <div className='board-write-page-location-icon'></div>
                    <input className='board-write-page-location-text'/>
                    <div className='board-write-page-location-close'></div>
                  </div>
                }
                <div className='board-write-page-location' onClick={onButtonClickHandler}></div>
                <div className='board-write-page-image'></div>
              </div>
              <div className='board-write-page-content-box'>
                <textarea className='board-write-page-content' placeholder='본문을 작성해주세요. todo: 내용이 늘어나면 텍스트 박스 높이도 늘어나게...'/>
              </div>
              <div className='board-write-page-container-save'>{'저장'}</div>
              <div className='board-write-page-container-cancel'>{'취소'}</div>
            </div>
        </div>
    </div>
  )
}
