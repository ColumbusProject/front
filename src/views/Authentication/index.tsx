import React, { useRef, useState } from 'react'
import './style.css';

//          component: 인증 페이지          //
export default function Authentication() {

  //          state: 화면 상태          //
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');


  //          component: sign-in 카드 컴포넌트          //
  const SignInCard = () => {

    //          state: 비밀번호 입력 요소 참조 상태         //
    const passwordRef = useRef<HTMLInputElement | null>(null);

    //          state: 입력한 아이디 상태         //
    const [id, setId] = useState<string>('');
    //          state: 입력한 비밀번호 상태         //
    const [password, setPassword] = useState<string>('');
  
    //          render: sign-in 카드 컴포넌트 렌더링          //
    return (
      <div className='sign-in-page'>
        <div className='sign-in-page-title-box'>
          <div className='sign-in-page-title'>{'Columbus'}</div>
        </div>
        <div className='sign-in-page-login-container'>
          <div className='sign-in-page-id-box'>
            <div className='sign-in-page-id-icon'></div>
            <input className='sign-in-page-id-input' placeholder='아이디를 입력해주세요'/>
          </div>
          <div className='sign-in-page-password-box'>
            <div className='sign-in-page-password-icon'></div>
            <input className='sign-in-page-password-input' ref={passwordRef} type='password' placeholder='비밀번호를 입력해주세요' />
          </div>
          <div className='sign-in-page-login-button-box'>
            <div className='sign-in-page-login-text'>{'로그인'}</div>
          </div>
        </div>
        <div className='sign-in-page-sign-up'>{'회원이 아니신가요?'}<span className='emphasis' >{'회원가입'}</span></div>
      </div>
    )
  }

  //          render: 인증 페이지 렌더링          //
  return (
    <div>
      { view == 'sign-in' && <SignInCard />}
    </div>
  )
}
