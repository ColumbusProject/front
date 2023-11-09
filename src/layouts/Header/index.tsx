import './style.css';

//          component: 헤더 컴포넌트          //
export default function Header() {

    //          render: 헤더 컴포넌트 렌더링          //
    return (
        <div className='header'>
            <div className='header-container'>
                <div className='columbus-text-box'>
                    <div className='columbus-text'>{'Columbus'}</div>
                </div>
                <div className='navigate-box'>
                    <div>{'나의 항해일지'}</div>
                    <div>{'여행 일정'}</div>
                    <div>{'여행 후기'}</div>
                    <div>{'자유 거래'}</div>
                </div>
                <div className='profile-menu-box'>
                    <div className='profile-icon'></div>
                    <div className='nickname-text'>{'닉네임'}</div>
                    <div className='hamburger-icon'></div>
                </div>
            </div>
        </div>
    )
}