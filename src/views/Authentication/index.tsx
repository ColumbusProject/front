import React, { useEffect, useRef, useState } from 'react'
import './style.css';
import { useCookies } from 'react-cookie';
import { SignInRequestDto } from '../../apis/dto/request/auth';
import { signInRequest } from '../../apis';
import { SignInResponseDto } from '../../apis/dto/response/auth';
import ResponseDto from '../../apis/dto/response';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH } from '../../constant';

import backgroundVideo from './assets/videoplayback.mp4';

//          component: 인증 페이지          //
export default function Authentication() {

  //          state: 화면 상태          //
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');
  //          state: 쿠키 상태          //
  const [cookies, setCookie] = useCookies();

  //          function: 네비게이트 함수         //
  // const navigator = useNavigate();

  //          component: sign-in 카드 컴포넌트          //
  const SignInCard = () => {

    //          state: 비밀번호 입력 요소 참조 상태         //
    const passwordRef = useRef<HTMLInputElement | null>(null);

    //          state: 입력한 아이디 상태         //
    const [id, setId] = useState<string>('');
    //          state: 입력한 비밀번호 상태         //
    const [password, setPassword] = useState<string>('');
    //          state: 로그인 에러 상태         //
    const [error, setError] = useState<boolean>(false);

    //          function: sign in response 처리 함수          //
    // const signInResponse = (responseBody: SignInResponseDto | ResponseDto) => {
    //   const { code } = responseBody;
    //   if (code === 'VF') alert('모두 입력해주세요.');
    //   if (code === 'SF') setError(true);
    //   if (code === 'DBE') alert('데이터베이스 오류입니다.');
    //   if (code !== 'SU') return;

    //   const { token, expirationTime } = responseBody as SignInResponseDto;

    //   const now = new Date().getTime();
    //   const expires = new Date(now + expirationTime * 3600);

    //   setCookie('accessToken', token, { expires, path: MAIN_PATH });
    //   navigator(MAIN_PATH);
    // }

    //          event handler: 로그인 버튼 클릭 이벤트 처리         //
    // const onSignInButtonClick = () => {
    //   const requestBody: SignInRequestDto = {id, password};
    //   signInRequest(requestBody).then(signInResponse);
    // }
  
    //          render: sign-in 카드 컴포넌트 렌더링          //
    return (
      <div className='sign-in-page'>
        <video className='sign-in-background-video' muted autoPlay loop>
          <source src={backgroundVideo}></source>
        </video>
        <div className='sign-in-page-title-box'>
          <div className='sign-in-page-title'>{'Columbus'}</div>
        </div>
        <div className='sign-in-page-login-container'>
          <div className='sign-in-page-id-box'>
            <div className='sign-in-page-id-icon'></div>
            <input className='sign-in-page-id-input' placeholder='아이디를 입력해주세요' />
          </div>
          <div className='sign-in-page-password-box'>
            <div className='sign-in-page-password-icon'></div>
            <input className='sign-in-page-password-input' ref={passwordRef} type='password' placeholder='비밀번호를 입력해주세요' />
          </div>
          <div className='sign-in-bottom-box'>
            {error && <div className='sign-in-error-message'>{'아이디 또는 비밀번호가 일치하지 않습니다.'}</div>}
            <div className='sign-in-page-login-button-box' >
              <div className='sign-in-page-login-text'>{'로그인'}</div>
            </div>
          </div>
        </div>
        <div className='sign-in-page-sign-up'>{'회원이 아니신가요?'}<span className='emphasis' >{'회원가입'}</span></div>
      </div>
    )
  }

  //          component: sign-up 카드 컴포넌트          //
  const SignUpCard = () => {

    //          state: 아이디 상태          //
    const [id, setId] = useState<string>('');
    //          state: 아이디 에러 상태         //
    const [idError, setIdError] = useState<boolean>(false);
    //          state: 아이디 에러 메세지 상태          //
    const [idErrorMessage, setIdErrorMessage] = useState<string>('');

    //          state: 비밀번호 상태          //
    const [password, setPassword] = useState<string>('');
    //          state: 비밀번호 에러 상태         //
    const [passwordError, setPasswordError] = useState<boolean>(false);
    //          state: 비밀번호 에러 메세지 상태          //
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

    //          state: 비밀번호 확인 상태         //
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    //          state: 비밀번호 확인 일치 메세지 상태         //
    const [passwordCheckMessage, setPasswordCheckMessage] = useState<boolean>(false);
    //          state: 비밀번호 확인 에러 상태          //
    const [passwordCheckError, setPasswordCheckError] = useState<boolean>(false);
    //          state: 비밀번호 확인 에러 메세지 상태         //
    const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState<string>('');

    //          state: 닉네임 상태          //
    const [nickname, setNickname] = useState<string>('');
    //          state: 닉네임 에러 상태         //
    const [nicknameError, setNicknameError] = useState<boolean>(false);
    //          state: 닉네임 에러 메세지 상태          //
    const [nicknameErrorMessage, setNicknameErrorMessage] = useState<string>('');

    //          state: 이메일 상태          //
    const [email, setEmail] = useState<string>('');
    //          state: 이메일 에러 상태         //
    const [emailError, setEmailError] = useState<boolean>(false);
    //          state: 이메일 에러 메세지 상태          //
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');

    //          state: 전화번호 상태          //
    const [telNumber, setTelNumber] = useState<string>('');
    //          state: 전화번호 에러 상태          //
    const [telNumberError, setTelNumberError] = useState<boolean>(false);
    //          state: 전화번호 에러 메세지 상태          //
    const [telNumberErrorMessage, setTelNumberErrorMessage] = useState<string>('');

    // description: 이메일 패턴 확인 //
    // const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
    // const checkedEmail = !emailPattern.test(email);
    // if (checkedEmail) {
    //   setEmailError(true);
    //   setEmailErrorMessage('이메일 주소 포맷이 맞지 않습니다.');
    // }

    //          render: sign up 카드 컴포넌트 렌더링          //
    return (
      <div className='sign-up-page'>
        <div className='sign-up-contents-box'>
          <div className='sign-up-contents-top'></div>
          <div className='sign-up-contents-middle'></div>
          <div className='sign-up-contents-bottom'></div>
        </div>
      </div>
    )
  }

  //          render: 인증 페이지 렌더링          //
  return (
    <div>
      { view == 'sign-in' && <SignInCard />}
      { view == 'sign-up' && <SignUpCard />}
    </div>
  )
}
