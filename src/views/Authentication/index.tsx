import React from 'react'
import './style.css';

export default function Authentication() {

  return (
    <div className='sign-up-page'>
      <div className='sign-up-page-container-01'>
        <div className='sign-up-page-title'>{'Columbus'}</div>
      </div>
      <div className='sign-up-page-container-02'>
        <div className='sign-up-page-box-01'>
          <div className='sign-up-page-id-icon'></div>
          <div className='sign-up-page-id-input'></div>
        </div>
        <div className='sign-up-page-box-02'>
          <div className='sign-up-page-password-icon'></div>
          <div className='sign-up-page-password-input'></div>
        </div>
        <div className='sign-up-page-box-03'>
          <div className='sign-up-page-login-button'>{'로그인'}</div>
        </div>
      </div>
      <div className='sign-up-page-sign-up'>{'회원이 아니신가요? 회원가입'} </div>
    </div>
  )
}
