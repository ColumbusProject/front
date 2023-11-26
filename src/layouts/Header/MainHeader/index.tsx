import './style.css';
import { AUTH_PATH, MAIN_PATH, MY_PAGE_PATH } from "constant";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLoginUserStore } from "stores";

  //          component: 메인 헤더 컴포넌트         //
  export default function MainHeader() {
    
    //          function: 네비게이트 함수         //
    const navigator = useNavigate();

    //          state: 로그인 유저 상태         //
    const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();
    //          state: 로그인 상태          //
    const [ isLogin, setLogin ] = useState<boolean>(true);
    //          state: userId, nickname variable 상태          //
    const { userId, nickname } = useParams();

    //          event handler: 로그인 버튼 클릭 이벤트 처리         //
    const onSignInClick = () => {
      navigator(AUTH_PATH())
    }
    //          event handler: 마이페이지 버튼 클릭 이벤트 처리         //
    const onMypageClick = () => {
      if (!loginUser) return;
      const { userId } = loginUser;
      navigator(MY_PAGE_PATH(userId));
    }
    //          event handler: 로그아웃 버튼 클릭 이벤트 처리         //
    const onLogOutClick = () => {
      if (userId === loginUser?.userId)
      resetLoginUser();
      navigator(MAIN_PATH());
    }
  
    //          render: 메인 투명 헤더 렌더링         //
    return (
      <div className='navigation'>
        <div className="jb-text">{'Columbus'}</div>
        {isLogin && (
        <div className='profile-menu-box'>
          <div className='profile-icon'></div>
          <div className='nickname-text'>{'nickname'}</div>
        </div>
        )}
        <div className="dropdown">
          <div className="icon-button">
            <div className="hamburger-icon"></div>
          </div>
          {isLogin && (
          <div className="dropdown-content">
            <div><span className="inline-link1" onClick={onMypageClick}>마이페이지</span></div>              
            <div><span className="inline-link2" onClick={onLogOutClick}>로그아웃</span></div>
          </div>
          )}
          <div className="dropdown-content">
            <div><span className="inline-link1" onClick={onSignInClick}>로그인</span></div>              
            <div><span className="inline-link2">회원가입</span></div>
          </div>
        </div>
      </div>
    )
  }