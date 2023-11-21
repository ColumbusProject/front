import { useLocation } from "react-router-dom";
// import Header from "../Header";
// import { AUTH_PATH } from 'constants';

//          component: 메인 레이아웃          //
export default function Container() {

  //          state: 현재 페이지 path name 상태         //
  const { pathname } = useLocation();

  //          render: 메인 레이아웃 렌더링          //
  return (
    <>
      {/* { pathname !== AUTH_PATH && <Header /> } */}
    </>
  )
}