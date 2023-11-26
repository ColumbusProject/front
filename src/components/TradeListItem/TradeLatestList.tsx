import React from "react";
import { TradeListItem } from "types";

//          interface: Props          //
interface Props extends TradeListItem {

}
//          component: Card 상자 컴포넌트         //
const Card = (props: Props) => {

  //                state: properties            //
  const { boardNumber, boardCount, title, itemType} = props;
  const { tradeImage, writeDatetime, country} = props;
  const { state, city, address, code} = props;
  const { currencyType, price, viewCount, viewNumber } = props;

  //          event handler: 북마크 클릭 이벤트 처리          //
  const onBookMarkClick = () => {

  }

  //          render: Card 상자 렌더링          //
  return (

    <div className="cards">
      <div className="card">
        <div className="imagecard">{tradeImage} </div>
        <div className="bookmark"></div>
        <div className="info-card"></div>
        <div className="title">{title}
        <div className="boardcount">{boardCount}</div>
        <div className="boardnumber">{boardNumber}</div>
        </div>
        <div className="itemtype">{itemType}</div>

        {/* 가격 */}
        <div className="price-container">
          <div className="currencytype">{currencyType} |</div>
          <div className="price">{price}</div>
        </div>

        {/* 주소 */}
        <div className="address-container">
          <div className="country">{country}</div>
          <div className="state">{state}</div>
          <div className="city">{city}</div>
          <div className="address">{address}</div>
          <div className="code">{code}</div>
          <div className="mapicon"></div>
        </div>

        {/* 조회수 & 작성일자 */}
        <div className="viewcount-container">
          <div className="viewcount">{viewCount}</div>
          <div className="viewnumber">{viewNumber}</div>
          <div className="writedatetime">{writeDatetime}</div>
        </div>
      </div>
    </div>
  )};

export default Card;