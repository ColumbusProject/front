import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css';
import { useCookies } from 'react-cookie';
import { SignInRequestDto, SignUpRequestDto } from '../../apis/dto/request/auth';
import { signInRequest } from '../../apis';
import { SignInResponseDto } from '../../apis/dto/response/auth';
import ResponseDto from '../../apis/dto/response';
import { useNavigate } from 'react-router-dom';
import { AUTH_PATH, MAIN_PATH } from '../../constant';

import backgroundVideo from './assets/videoplayback.mp4';
import InputBox from '../../components/InputBox';
import { error } from 'console';

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
    const signInResponse = (responseBody: SignInResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'VF') alert('모두 입력해주세요.');
      if (code === 'SF') setError(true);
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { token, expirationTime } = responseBody as SignInResponseDto;

      const now = new Date().getTime();
      const expires = new Date(now + expirationTime * 3600);

      // setCookie('accessToken', token, { expires, path: MAIN_PATH });
      // navigator(MAIN_PATH);
    }

    //          event handler: 로그인 버튼 클릭 이벤트 처리         //
    const onSignInButtonClick = () => {
      const requestBody: SignInRequestDto = {id, password};
      signInRequest(requestBody).then(signInResponse);
    }

    //          event handler: emphasis(회원가입) 버튼 클릭 이벤트 처리         //
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
            <input className='sign-in-page-id-input' placeholder='아이디를 입력해주세요' />
          </div>
          <div className='sign-in-page-password-box'>
            <div className='sign-in-page-password-icon'></div>
            <input className='sign-in-page-password-input' ref={passwordRef} type='password' placeholder='비밀번호를 입력해주세요' />
          </div>
          <div className='sign-in-bottom-box'>
            {error && <div className='sign-in-error-message'>{'아이디 또는 비밀번호가 일치하지 않습니다.'}</div>}
            <div className='sign-in-button-box' onClick={onSignInButtonClick} >
              <div className='sign-in-text'>{'로그인'}</div>
            </div>
          </div>
        </div>
        <div className='sign-in-page-sign-up'>{'회원이 아니신가요?'}<span className='emphasis' onClick={onClickEmphasis} >{'회원가입'}</span></div>
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

    //          function: sign up response 처리 함수          //
    const signUpResponse = (code: string) => {
      if (code === 'VF') alert('입력하지 않은 정보가 있습니다');
      if (code === 'DI') {
        setIdError(true);
        setIdErrorMessage('중복되는 아이디입니다');
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

      setId('');
      setPassword('');
      setNickname('');
      setEmail('');
      setTelNumber('');
      setView('sign-in');
    }
    //          event handler: 회원가입 버튼 클릭 이벤트 처리         //
    const onSignUpButtonClick = () => {

      setIdError(false);
      setIdErrorMessage('');
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
      const checkedId = id.trim().length === 0;
      if (checkedId) {
        setIdError(true);
        setIdErrorMessage('아이디를 입력해주세요');
      }

      // description: 비밀번호 입력 여부 확인 //
      const checkedPassword = password.trim().length === 0;
      if (checkedPassword) {
        setPasswordError(true);
        setPasswordErrorMessage('비밀번호를 입력해주세요');
      }

      // description: 비밀번호 확인 입력 여부 확인 //
      const checkedPasswordCheck = passwordCheck.trim().length === 0;
      if (checkedPasswordCheck) {
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage('비밀번호를 다시 입력해주세요');
      }

      // description: 닉네임 입력 여부 확인 //
      const checkedNickname = nickname.trim().length === 0;
      if (checkedNickname) {
        setNicknameError(true);
        setNicknameErrorMessage('닉네임을 입력해주세요');
      }

      // description: 전화번호 패턴 및 입력 여부 확인 //
      const telNumberPattern = /^[0-9]{10,12}$/;
      const checkedTelNumber = !telNumberPattern.test(telNumber);
      const checkedTelNumber2 = telNumber.trim().length === 0;
      if (checkedTelNumber) {
        setTelNumberError(true);
        setTelNumberErrorMessage('전화번호를 정확하게 입력해주세요');
      }

      if (checkedTelNumber2) {
        setTelNumberError(true);
        setTelNumberErrorMessage('전화번호를 입력해주세요')
      }

      // description: 이메일 패턴 및 입력 여부 확인 //
      const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
      const checkedEmail = !emailPattern.test(email);
      const checkedEmail2 = email.trim().length === 0;
      if (checkedEmail) {
        setEmailError(true);
        setEmailErrorMessage('이메일 주소를 정확하게 입력해주세요');
      }

      if (checkedEmail2) {
        setEmailError(true);
        setEmailErrorMessage('이메일 주소를 입력해주세요');
      }

      //          function: 회원가입 처리 및 응답 처리          //
      const requestBody: SignUpRequestDto = {
        id: id,
        password: password,
        nickname: nickname,
        email: email,
        telNumber: telNumber
      };
      // signUpRequest(requestBody).then(signUpResponse);
    }

    //          event handler: id change 처리 함수          //
    const onIdChangeHanlder = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setIdErrorMessage('');
      setId(value);
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
            <InputBox label='아이디' type='text' placeholder='사용하실 아이디를 입력해주세요' value={id} onChange={onIdChangeHanlder} error={idError} errorMessage={idErrorMessage} />
            <InputBox label='비밀번호' type='password' placeholder='사용하실 비밀번호를 입력해주세요' value={password} onChange={onPasswordChangeHanlder} icon='password_icon' error={passwordError} errorMessage={passwordErrorMessage} />
            <InputBox label='비밀번호 확인' type='password' placeholder='비밀번호를 다시 입력해주세요' value={passwordCheck} onChange={onPasswordCheckChangeHandler} icon='password_icon' error={passwordCheckError} errorMessage={passwordCheckErrorMessage} />
            <InputBox label='닉네임' type='text' placeholder='사용하실 닉네임을 입력해주세요' value={nickname} onChange={onNicknameChangeHanlder} error={nicknameError} errorMessage={nicknameErrorMessage} />
            <InputBox label='이메일' type='text' placeholder='사용하실 이메일 주소를 입력해주세요' value={email} onChange={onEmailChangeHanlder} error={emailError} errorMessage={emailErrorMessage} />
            <InputBox label='전화번호' type='text' placeholder='사용하실 전화번호를 입력해주세요' value={telNumber} onChange={onTelNumberChangeHanlder} error={telNumberError} errorMessage={telNumberErrorMessage} />
          </div>
          <div className='sign-up-contents-bottom'>
            <div className='sign-up-button-box' onClick={onSignUpButtonClick}>
              <div className='sign-up-button-text'>{'회원가입'}</div>
            </div>
            <div className='sign-up-page-sign-in'>{'계정이 있으신가요?'}<span className='emphasis' onClick={onClickEmphasis} >{'로그인'}</span></div>
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
