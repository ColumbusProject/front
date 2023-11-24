import React, { ChangeEvent, useEffect, useRef, useState, KeyboardEvent } from 'react'
import './style.css';
import { useCookies } from 'react-cookie';

import backgroundVideo from './assets/videoplayback.mp4';
import InputBox from 'components/InputBox-Signup';
import { useNavigate } from 'react-router-dom';
import { SignInResponseDto, SignUpResponseDto } from 'apis/dto/response/auth';
import ResponseDto from 'apis/dto/response';
import { SignInRequestDto, SignUpRequestDto } from 'apis/dto/request/auth';
import { MAIN_PATH } from 'constant';
import { signInRequest, signUpRequest } from 'apis';

//          component: 인증 페이지          //
export default function Authentication() {

  //          state: 화면 상태          //
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');
  //          state: 쿠키 상태          //
  const [cookies, setCookie] = useCookies();

  //          function: 네비게이트 함수         //
  const navigator = useNavigate();

  //          component: sign-in 카드 컴포넌트          //
  const SignInCard = () => {

    //          state: 아이디 입력 요소 참조 상태         //
    const userIdRef = useRef<HTMLInputElement | null>(null);
    //          state: 비밀번호 입력 요소 참조 상태         //
    const passwordRef = useRef<HTMLInputElement | null>(null);

    //          state: 입력한 아이디 상태         //
    const [userId, setUserId] = useState<string>('');
    //          state: 입력한 비밀번호 상태         //
    const [password, setPassword] = useState<string>('');
    //          state: 로그인 에러 상태         //
    const [error, setError] = useState<boolean>(false);

    //          function: sign in response 처리 함수          //
    const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code === 'SF' || code === 'VF') setError(true);
      if (code !== 'SU') return;

      const { token, expirationTime } = responseBody as SignInResponseDto;
      const now = new Date().getTime();
      const expires = new Date(now + expirationTime * 1000);

      setCookie('accessToken', token, { expires, path: MAIN_PATH() });
      navigator(MAIN_PATH());
    }

    //          event handler: 아이디 인풋 키 다운 이벤트 처리          //
    const onUserIdKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!passwordRef.current) return;
      passwordRef.current.focus();
    }

    //          event handler: 비밀번호 인풋 키 다운 이벤트 처리          //
    const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      onSignInButtonClick();
    }

    //          event handler: 아이디 변경 이벤트 처리          //
    const onUserIdChangeHanlder = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const {value} = event.target;
      setUserId(value);
    }

    //          event handler: 아이디 변경 이벤트 처리          //
    const onPasswordChangeHanlder = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const {value} = event.target;
      setPassword(value);
    }

    //          event handler: 로그인 버튼 클릭 이벤트 처리         //
    const onSignInButtonClick = () => {

      const hasUserId = userId.trim().length !== 0;
      if (!hasUserId) setError(true);
      
      const hasPassword = password.trim().length !== 0;
      if (!hasPassword) setError(true);

      const requestBody: SignInRequestDto = {userId, password};
      signInRequest(requestBody).then(signInResponse);
    }

    //          event handler: signUp-emphasis(회원가입) 버튼 클릭 이벤트 처리         //
    const onClickEmphasis = () => {
      setView('sign-up');
    }
  
    //          render: sign-in 카드 컴포넌트 렌더링          //
    return (
      <div id='sign-in-page'>
        <div className='sign-in-page-title-box'>
          <div className='sign-in-page-title'>{'Columbus'}</div>
        </div>
        <div className='sign-in-page-login-container'>
          <div className='sign-in-page-id-box'>
            <div className='sign-in-page-id-icon'></div>
            <input className='sign-in-page-id-input' ref={userIdRef} placeholder='아이디를 입력해주세요' onChange={onUserIdChangeHanlder} onKeyDown={onUserIdKeyDownHandler} />
          </div>
          <div className='sign-in-page-password-box'>
            <div className='sign-in-page-password-icon'></div>
            <input className='sign-in-page-password-input' ref={passwordRef} type='password' placeholder='비밀번호를 입력해주세요' onChange={onPasswordChangeHanlder} onKeyDown={onPasswordKeyDownHandler} />
          </div>
        </div>
        <div className='sign-in-bottom-box'>
            {error && <div className='sign-in-error-message'>{'아이디 또는 비밀번호가 일치하지 않습니다.'}</div>}
            <div className='sign-in-button-box' onClick={onSignInButtonClick} >
              <div className='sign-in-text'>{'로그인'}</div>
            </div>
        </div>
        <div className='sign-in-page-sign-up'>{'회원이 아니신가요?'}<span className='signUp-emphasis' onClick={onClickEmphasis} >{'회원가입'}</span></div>
      </div>
    )
  }

  //          component: sign-up 카드 컴포넌트          //
  const SignUpCard = () => {

    //          state: 아이디 상태          //
    const [userId, setUserId] = useState<string>('');
    //          state: 아이디 에러 상태         //
    const [userIdError, setUserIdError] = useState<boolean>(false);
    //          state: 아이디 에러 메세지 상태          //
    const [userIdErrorMessage, setUserIdErrorMessage] = useState<string>('');
    //          state: 아이디 입력 요소 참조 상태         //
    const userIdRef = useRef<HTMLInputElement | null>(null);

    //          state: 비밀번호 상태          //
    const [password, setPassword] = useState<string>('');
    //          state: 비밀번호 에러 상태         //
    const [passwordError, setPasswordError] = useState<boolean>(false);
    //          state: 비밀번호 에러 메세지 상태          //
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
    //          state: 비밀번호 입력 요소 참조 상태         //
    const passwordRef = useRef<HTMLInputElement | null>(null);

    //          state: 비밀번호 확인 상태         //
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    //          state: 비밀번호 확인 에러 상태          //
    const [passwordCheckError, setPasswordCheckError] = useState<boolean>(false);
    //          state: 비밀번호 확인 에러 메세지 상태         //
    const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState<string>('');
    //          state: 비밀번호 확인 입력 요소 참조 상태         //
    const passwordCheckRef = useRef<HTMLInputElement | null>(null);

    //          state: 닉네임 상태          //
    const [nickname, setNickname] = useState<string>('');
    //          state: 닉네임 에러 상태         //
    const [nicknameError, setNicknameError] = useState<boolean>(false);
    //          state: 닉네임 에러 메세지 상태          //
    const [nicknameErrorMessage, setNicknameErrorMessage] = useState<string>('');
    //          state: 닉네임 입력 요소 참조 상태         //
    const nicknameRef = useRef<HTMLInputElement | null>(null);

    //          state: 이메일 상태          //
    const [email, setEmail] = useState<string>('');
    //          state: 이메일 에러 상태         //
    const [emailError, setEmailError] = useState<boolean>(false);
    //          state: 이메일 에러 메세지 상태          //
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
    //          state: 이메일 입력 요소 참조 상태         //
    const emailRef = useRef<HTMLInputElement | null>(null);

    //          state: 전화번호 상태          //
    const [telNumber, setTelNumber] = useState<string>('');
    //          state: 전화번호 에러 상태          //
    const [telNumberError, setTelNumberError] = useState<boolean>(false);
    //          state: 전화번호 에러 메세지 상태          //
    const [telNumberErrorMessage, setTelNumberErrorMessage] = useState<string>('');
    //          state: 전화번호 입력 요소 참조 상태         //
    const telNumberRef = useRef<HTMLInputElement | null>(null);

    //          function: sign up response 처리 함수          //
    const signUpResponse = (responseBody: SignUpResponseDto | ResponseDto | null) => {
      if (!responseBody) return;
      const { code } = responseBody;

      if (code === 'VF') alert('입력하지 않은 정보가 있습니다');
      if (code === 'DI') {
        setUserIdError(true);
        setUserIdErrorMessage('중복되는 아이디입니다');
      }
      if (code === 'DN') {
        setNicknameError(true);
        setNicknameErrorMessage('중복되는 닉네임입니다')
      }
      if (code === 'DE') {
        setEmailError(true);
        setEmailErrorMessage('중복되는 이메일 주소입니다');
      }
      if (code === 'DT') {
        setTelNumberError(true);
        setTelNumberErrorMessage('중복되는 전화번호입니다');
      }
      if (code === 'DBE') alert('데이터베이스 오류입니다');

      if (code !== 'SU') return;

      setUserId('');
      setPassword('');
      setNickname('');
      setEmail('');
      setTelNumber('');
      setView('sign-in');
    }

    //          event handler: 회원가입 버튼 클릭 이벤트 처리         //
    const onSignUpButtonClick = () => {

      setUserIdError(false);
      setUserIdErrorMessage('');
      setPasswordError(false);
      setPasswordErrorMessage('');
      setPasswordCheckError(false);
      setPasswordCheckErrorMessage('');      
      setNicknameError(false);
      setNicknameErrorMessage('');
      setEmailError(false);
      setEmailErrorMessage('');
      setTelNumberError(false);
      setTelNumberErrorMessage('');

      // description: 아이디 입력 여부 확인 //
      const checkedUserId = userId.trim().length !== 0;
      if (!checkedUserId) {
        setUserIdError(true);
        setUserIdErrorMessage('아이디를 입력해주세요');
      }

      // description: 비밀번호 입력 여부 및 길이 확인 //
      const checkedPassword = password.trim().length !== 0;
      if (!checkedPassword) {
        setPasswordError(true);
        setPasswordErrorMessage('비밀번호를 입력해주세요');
      }

      const checkedPassword2 = password.trim().length >= 8;
      if (!checkedPassword2) {
        setPasswordError(true);
        setPasswordErrorMessage('비밀번호는 8자 이상 입력해주세요')
      }

      // description: 비밀번호 확인 입력 여부 및 일치 확인 //
      const checkedPasswordCheck = passwordCheck.trim().length !== 0;
      if (!checkedPasswordCheck) {
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage('비밀번호를 다시 입력해주세요');
      }

      const isEqualPassword = password === passwordCheck;
      if (!isEqualPassword) {
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다');
      }

      // description: 닉네임 입력 여부 확인 //
      const checkedNickname = nickname.trim().length !== 0;
      if (!checkedNickname) {
        setNicknameError(true);
        setNicknameErrorMessage('닉네임을 입력해주세요');
      }

      // description: 전화번호 패턴 및 입력 여부 확인 //
      const telNumberPattern = /^[0-9]{10,12}$/;
      const checkedTelNumber = telNumberPattern.test(telNumber);
      const checkedTelNumber2 = telNumber.trim().length !== 0;
      if (!checkedTelNumber) {
        setTelNumberError(true);
        setTelNumberErrorMessage('전화번호를 정확하게 입력해주세요');
      }

      if (!checkedTelNumber2) {
        setTelNumberError(true);
        setTelNumberErrorMessage('전화번호를 입력해주세요')
      }

      // description: 이메일 패턴 및 입력 여부 확인 //
      const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
      const checkedEmail = emailPattern.test(email);
      const checkedEmail2 = email.trim().length !== 0;
      if (!checkedEmail) {
        setEmailError(true);
        setEmailErrorMessage('이메일 주소를 정확하게 입력해주세요');
      }

      if (!checkedEmail2) {
        setEmailError(true);
        setEmailErrorMessage('이메일 주소를 입력해주세요');
      }

      if (!checkedUserId || !checkedPassword || !checkedPassword2 || !checkedNickname 
        || !checkedEmail || !checkedEmail2 || !checkedTelNumber || !checkedTelNumber2) return;

      //          function: 회원가입 처리 및 응답 처리          //
      const requestBody: SignUpRequestDto = {
        userId, password, nickname, email, telNumber
      };

      signUpRequest(requestBody).then(signUpResponse);
    }

    //          event handler: userId change 처리 함수          //
    const onUserIdChangeHanlder = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setUserIdErrorMessage('');
      setUserId(value);
    }

    //          event handler: password change 처리 함수          //
    const onPasswordChangeHanlder = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setPasswordErrorMessage('');
      setPassword(value);
    }

    //          event handler: password check change 처리 함수          //
    const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setPasswordCheckErrorMessage('');

      if (password === value) {
        setPasswordCheckError(false);
        setPasswordCheckErrorMessage('비밀번호가 일치합니다');
      }
      else {
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다');
      }
      setPasswordCheck(value);
    }
    
    //          event handler: nickname change 처리 함수          //
    const onNicknameChangeHanlder = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setNicknameErrorMessage('');
      setNickname(value);
    }

    //          event handler: email change 처리 함수         //
    const onEmailChangeHanlder = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setEmailErrorMessage('');
      setEmail(value);
    }

    //          event handler: telnumber change 처리 함수         //
    const onTelNumberChangeHanlder = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setTelNumberErrorMessage('');
      setTelNumber(value);
    }
    
    //          event handler: 아이디 키 다운 이벤트 처리         //
    const onUserIdKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!passwordRef.current) return;
      passwordRef.current.focus();
    }

    //          event handler: 비밀번호 키 다운 이벤트 처리         //
    const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!passwordCheckRef.current) return;
      passwordCheckRef.current.focus();
    }

    //          event handler: 비밀번호 확인 키 다운 이벤트 처리         //
    const onPasswordCheckKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!nicknameRef.current) return;
      nicknameRef.current.focus();
    }
    
    //          event handler: 닉네임 키 다운 이벤트 처리         //
    const onNicknameKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!emailRef.current) return;
      emailRef.current.focus();
    }
    
    //          event handler: 이메일 키 다운 이벤트 처리         //
    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!telNumberRef.current) return;
      telNumberRef.current.focus();
    }
    
    //          event handler: 전화번호 키 다운 이벤트 처리         //
    const onTelNumberKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      onSignUpButtonClick();
    }

    //          event handler: emphasis(로그인) 버튼 클릭 이벤트 처리         //
    const onClickEmphasis = () => {
      setView('sign-in');
    }

    //          render: sign up 카드 컴포넌트 렌더링          //
    return (
      <div id='sign-up-page'>
        <div className='sign-up-contents-box'>
          <div className='sign-up-contents-top'>
            <div className='sign-up-logo'>{'Columbus'}</div>
          </div>
          <div className='sign-up-contents-middle'>
            <InputBox ref={userIdRef} label='아이디' type='text' placeholder='사용하실 아이디를 입력해주세요' value={userId} onChange={onUserIdChangeHanlder} error={userIdError} errorMessage={userIdErrorMessage} onKeyDown={onUserIdKeyDownHandler} />
            <InputBox ref={passwordRef} label='비밀번호' type='password' placeholder='사용하실 비밀번호를 입력해주세요' value={password} onChange={onPasswordChangeHanlder} error={passwordError} errorMessage={passwordErrorMessage} onKeyDown={onPasswordKeyDownHandler} />
            <InputBox ref={passwordCheckRef} label='비밀번호 확인' type='password' placeholder='비밀번호를 다시 입력해주세요' value={passwordCheck} onChange={onPasswordCheckChangeHandler} error={passwordCheckError} errorMessage={passwordCheckErrorMessage} onKeyDown={onPasswordCheckKeyDownHandler}/>
            <InputBox ref={nicknameRef} label='닉네임' type='text' placeholder='사용하실 닉네임을 입력해주세요' value={nickname} onChange={onNicknameChangeHanlder} error={nicknameError} errorMessage={nicknameErrorMessage} onKeyDown={onNicknameKeyDownHandler}/>
            <InputBox ref={emailRef} label='이메일' type='text' placeholder='사용하실 이메일 주소를 입력해주세요' value={email} onChange={onEmailChangeHanlder} error={emailError} errorMessage={emailErrorMessage} onKeyDown={onEmailKeyDownHandler}/>
            <InputBox ref={telNumberRef} label='전화번호' type='text' placeholder='사용하실 전화번호를 입력해주세요' value={telNumber} onChange={onTelNumberChangeHanlder} error={telNumberError} errorMessage={telNumberErrorMessage} onKeyDown={onTelNumberKeyDownHandler} />
          </div>
          <div className='sign-up-contents-bottom'>
            <div className='sign-up-button-box' onClick={onSignUpButtonClick}>
              <div className='sign-up-button-text'>{'회원가입'}</div>
            </div>
            <div className='sign-up-page-sign-in'>{'계정이 있으신가요?'}<span className='signIn-emphasis' onClick={onClickEmphasis} >{'로그인'}</span></div>
          </div>
        </div>
      </div>
    )
  }

  //          render: 인증 페이지 렌더링          //
  return (
    <div>
      <video className='sign-in-background-video' muted autoPlay loop>
          <source src={backgroundVideo}></source>
      </video> 
      <div>
        { view == 'sign-in' && <SignInCard />}
        { view == 'sign-up' && <SignUpCard />}
      </div>
    </div>
  )
}
